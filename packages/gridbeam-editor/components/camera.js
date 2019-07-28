const React = require('react')
const { useGesture, useDrag } = require('react-use-gesture')
const useViewportSizes = require('use-viewport-sizes').default
const identity = require('gl-mat4/identity')
const perspective = require('gl-mat4/perspective')
const lookAt = require('gl-mat4/lookAt')

const CameraContext = React.createContext([{}, () => {}])

function CameraProvider (props) {
  const {
    reglRef,
    _center = 3,
    _theta = 0,
    _phi = 0,
    _distance = 10.0,
    _up = [0, 1, 0],
    _minDistance = 0.1,
    _maxDistance = 1000,
    children
  } = props

  const [projection, setProjection] = React.useState(() =>
    identity(new Float32Array(16))
  )
  const [view, setView] = React.useState(() => identity(new Float32Array(16)))
  const [center, setCenter] = React.useState(() => new Float32Array(_center))
  const [theta, setTheta] = React.useState(_theta)
  const [phi, setPhi] = React.useState(_phi)
  const [distance, setDistance] = React.useState(() => Math.log(_distance))
  const [eye, setEye] = React.useState(() => new Float32Array(3))
  const [up, setUp] = React.useState(() => new Float32Array(_up))

  const right = React.useMemo(() => new Float32Array([1, 0, 0]), [])
  const front = React.useMemo(() => new Float32Array([0, 0, 1]), [])

  const minDistance = React.useMemo(() => Math.log(_minDistance), [
    _minDistance
  ])
  const maxDistance = React.useMemo(() => Math.log(_maxDistance), [
    _maxDistance
  ])

  const [deltaTheta, setDeltaTheta] = React.useState(0)
  const [deltaPhi, setDeltaPhi] = React.useState(0)
  const [deltaDistance, setDeltaDistance] = React.useState(0)
  const [prev, setPrev] = React.useState({ x: 0, y: 0 })

  React.useEffect(
    () => {
      setTheta(theta + deltaTheta)
      setPhi(clamp(phi + deltaPhi, -Math.PI / 2.0, Math.PI / 2.0))
      setDistance(clamp(distance + deltaDistance, minDistance, maxDistance))

      setDeltaTheta(damp(deltaTheta))
      setDeltaPhi(damp(deltaPhi))
      setDeltaDistance(damp(deltaDistance))

      var r = Math.exp(distance)

      var vf = r * Math.sin(theta) * Math.cos(phi)
      var vr = r * Math.cos(theta) * Math.cos(phi)
      var vu = r * Math.sin(phi)

      for (var i = 0; i < 3; ++i) {
        eye[i] = center[i] + vf * front[i] + vr * right[i] + vu * up[i]
      }
      setEye(eye)

      lookAt(view, eye, center, up)
      setView(view)
    },
    [theta, phi, distance, center, eye, up, deltaTheta, deltaPhi, deltaDistance]
  )

  const canvasElement =
    (reglRef && reglRef.current && reglRef.current.canvasRef) || null
  const bindDrag = useDrag(state => console.log(state), {
    domTarget: canvasElement
  })
  const bind = useGesture(
    {
      onDrag ({ buttons, xy: [x, y] }) {
        console.log('drag', buttons, x, y)
        if (buttons & 1) {
          var dx = (x - prev.x) / window.innerWidth
          var dy = (y - prev.y) / window.innerHeight
          var w = Math.max(distance, 0.5)

          setDeltaTheta(deltaTheta + w * dx)
          setDeltaPhi(deltaPhi + w * dy)
        }
        setPrev({ x, y })
      },
      onWheel ({ delta: d }) {
        setDeltaDistance(deltaDistance + d.y / window.innerHeight)
      }
    },
    {
      domTarget: window
    }
  )

  React.useEffect(
    () => {
      bindDrag()
    },
    [bindDrag]
  )

  React.useEffect(
    () => {
      bind()
    },
    [bind]
  )

  const [viewportWidth, viewportHeight] = useViewportSizes()

  React.useEffect(
    () => {
      perspective(
        projection,
        Math.PI / 4.0, // TODO: fovy
        viewportWidth / viewportHeight,
        0.01, // TODO: near
        1000.0 // TODO: far
      )
      setProjection(projection)
    },
    [viewportWidth, viewportHeight]
  )

  const value = {
    view,
    projection,
    center,
    theta,
    phi,
    distance,
    eye,
    up
  }

  console.log('reglRef', reglRef)

  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  )
}

module.exports = CameraProvider
module.exports.Context = CameraContext

function damp (x) {
  var xd = x * 0.9
  if (xd < 0.1) {
    return 0
  }
  return xd
}

function clamp (x, lo, hi) {
  return Math.min(Math.max(x, lo), hi)
}
