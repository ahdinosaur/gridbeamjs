const React = require('react')
const { Canvas } = require('react-three-fiber')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { assign, map, omit } = require('lodash')
const { prop } = require('ramda')

const useModelStore = require('../stores/model')

const Beam = require('./beam')
const Camera = require('./camera')

module.exports = Vis

function Vis (props) {
  const model = useModelStore(prop('model'))
  const beamUuids = useModelStore(prop('beamUuids'))
  const hoveredBeamUuids = useModelStore(prop('hoveredBeamUuids'))
  const hoverBeam = useModelStore(prop('hoverBeam'))
  const unhoverBeam = useModelStore(prop('unhoverBeam'))
  const selectedBeamUuids = useModelStore(prop('selectedBeamUuids'))
  const selectBeams = useModelStore(prop('selectBeams'))

  console.log('model', model)
  console.log('hoveredBeamUuids', hoveredBeamUuids)
  console.log('selectedBeamUuids', selectedBeamUuids)

  return (
    <Canvas orthographic>
      <hemisphereLight args={[0xffffbb, 0x080820]} />
      <Camera />
      <axesHelper args={[100]} />
      <gridHelper args={[1000, 1000 / DEFAULT_BEAM_WIDTH]} />
      {map(beamUuids, (uuid, index) => {
        const beam = model.beams[index]
        return (
          <Beam
            key={uuid}
            uuid={uuid}
            beam={beam}
            isHovered={Boolean(hoveredBeamUuids[uuid])}
            hover={() => hoverBeam(uuid)}
            unhover={() => unhoverBeam(uuid)}
            isSelected={Boolean(selectedBeamUuids[uuid])}
            select={() => selectBeams([uuid])}
          />
        )
      })}
    </Canvas>
  )
}
