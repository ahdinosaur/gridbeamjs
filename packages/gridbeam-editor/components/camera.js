const React = require('react')
const { extend, useThree, useRender } = require('react-three-fiber')
const OrbitControls = require('../vendor/OrbitControls')

extend({ OrbitControls })

module.exports = Camera

function Camera (props) {
  const controlsRef = React.useRef()
  const { camera } = useThree()

  React.useEffect(() => {
    const controls = controlsRef.current
    camera.position.set(0, 0, 1)
    controls.rotateLeft(-Math.PI / 32)
    controls.rotateUp(Math.PI / 64)
    camera.zoom = 2.5
    controls.update()
  }, [])

  useRender(() => {
    controlsRef.current.update()
  })

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.1}
    />
  )
}
