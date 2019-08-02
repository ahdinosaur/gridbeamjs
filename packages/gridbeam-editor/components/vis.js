const React = require('react')
const { Canvas } = require('react-three-fiber')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { addIndex, map, prop } = require('ramda')

const useModelStore = require('../stores/model')

const Beam = require('./beam')
const Camera = require('./camera')

module.exports = Vis

function Vis (props) {
  const model = useModelStore(prop('model'))
  const uuids = useModelStore(prop('uuids'))
  const hoveredUuids = useModelStore(prop('hoveredUuids'))
  const hover = useModelStore(prop('hover'))
  const unhover = useModelStore(prop('unhover'))
  const selectedUuids = useModelStore(prop('selectedUuids'))
  const selects = useModelStore(prop('selects'))

  const mapParts = React.useMemo(
    () =>
      addIndex(map)((uuid, index) => {
        const beam = model.beams[index]
        return (
          <Beam
            key={uuid}
            uuid={uuid}
            beam={beam}
            isHovered={Boolean(uuid in hoveredUuids)}
            hover={() => hover(uuid)}
            unhover={() => unhover(uuid)}
            isSelected={Boolean(uuid in selectedUuids)}
            select={() => selects([uuid])}
          />
        )
      }),
    [model, hoveredUuids, selectedUuids]
  )

  return (
    <Canvas orthographic>
      <hemisphereLight args={[0xffffbb, 0x080820]} />
      <Camera />
      <axesHelper args={[100]} />
      <gridHelper args={[1000, 1000 / DEFAULT_BEAM_WIDTH]} />
      {mapParts(uuids)}
    </Canvas>
  )
}
