const React = require('react')
const THREE = require('three')
const { Canvas } = require('react-three-fiber')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')

console.log('DEFAULT_BEAM_WIDTH', DEFAULT_BEAM_WIDTH)

const Beam = require('./components/beam')
const Camera = require('./components/camera')

module.exports = GridBeamViewer

function GridBeamViewer ({ size, model }) {
  const { beams } = model

  if (size == null) {
    size = [window.innerWidth, window.innerHeight]
  }

  return (
    <Canvas
      camera={{
        near: -1000,
        far: 1000
      }}
      orthographic
    >
      <hemisphereLight args={[0xffffbb, 0x080820]} />
      <Camera />
      <axesHelper args={[100]} />
      <gridHelper args={[1000, 1000 / DEFAULT_BEAM_WIDTH]} />
      {beams.map((beam, index) => <Beam key={index} beam={beam} />)}
    </Canvas>
  )
}
