const React = require('react')
const { Canvas } = require('react-three-fiber')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { assign, map, omit } = require('lodash')

const Beam = require('./beam')
const Camera = require('./camera')

module.exports = Vis

function Vis (props) {
  const {
    beamsByUuid,
    selectedBeamUuid,
    setSelectedBeamUuid,
    hoveredBeamByUuid,
    setHoveredBeamByUuid
  } = props

  return (
    <Canvas orthographic>
      <hemisphereLight args={[0xffffbb, 0x080820]} />
      <Camera />
      <axesHelper args={[100]} />
      <gridHelper args={[1000, 1000 / DEFAULT_BEAM_WIDTH]} />
      {map(beamsByUuid, (beam, uuid) => {
        return (
          <Beam
            key={uuid}
            uuid={uuid}
            beam={beam}
            isHovered={Boolean(hoveredBeamByUuid[uuid])}
            hover={() => {
              setHoveredBeamByUuid(hoveredBeamByUuid =>
                assign({}, hoveredBeamByUuid, { [uuid]: true })
              )
            }}
            unhover={() =>
              setHoveredBeamByUuid(hoveredBeamByUuid =>
                omit(hoveredBeamByUuid, uuid)
              )
            }
            isSelected={selectedBeamUuid === uuid}
            select={() => setSelectedBeamUuid(uuid)}
          />
        )
      })}
    </Canvas>
  )
}
