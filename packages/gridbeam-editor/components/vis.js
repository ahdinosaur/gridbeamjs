const React = require('react')
const { Canvas } = require('react-three-fiber')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { mapObjIndexed, pipe, prop, values } = require('ramda')

const useModelStore = require('../stores/model')

const Beam = require('./beam')
const Camera = require('./camera')

module.exports = Vis

function Vis (props) {
  const parts = useModelStore(prop('parts'))
  const hoveredUuids = useModelStore(prop('hoveredUuids'))
  const hover = useModelStore(prop('hover'))
  const unhover = useModelStore(prop('unhover'))
  const selectedUuids = useModelStore(prop('selectedUuids'))
  const selects = useModelStore(prop('selects'))

  const renderParts = React.useMemo(
    () =>
      pipe(
        mapObjIndexed((part, uuid) => {
          const Part = PART_TYPES[part.type]
          return (
            <Part
              key={uuid}
              uuid={uuid}
              value={part}
              isHovered={Boolean(uuid in hoveredUuids)}
              hover={() => hover(uuid)}
              unhover={() => unhover(uuid)}
              isSelected={Boolean(uuid in selectedUuids)}
              select={() => selects([uuid])}
            />
          )
        }),
        values
      ),
    [parts, hoveredUuids, selectedUuids]
  )

  return (
    <Canvas orthographic>
      <hemisphereLight args={[0xffffbb, 0x080820]} />
      <Camera />
      <axesHelper args={[100]} />
      <gridHelper args={[1000, 1000 / DEFAULT_BEAM_WIDTH]} />
      {renderParts(parts)}
    </Canvas>
  )
}

const PART_TYPES = {
  beam: Beam
}
