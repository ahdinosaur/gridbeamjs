const React = require('react')
const { default: Regl } = require('react-regl')

const Beam = require('./components/beam')
const Camera = require('./components/camera')

module.exports = GridBeamViewer

function GridBeamViewer ({ size, model }) {
  const { beams } = model

  if (size == null) {
    size = [window.innerWidth, window.innerHeight]
  }

  const ref = React.useRef()

  return (
    <Regl ref={ref} width={size[0]} height={size[1]} forceRedrawOnTick>
      <Camera reglRef={ref}>
        {beams.map((beam, index) => <Beam key={index} beam={beam} />)}
      </Camera>
    </Regl>
  )
}
