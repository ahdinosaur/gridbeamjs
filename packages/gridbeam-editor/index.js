const React = require('react')
const THREE = require('three')
const { Canvas } = require('react-three-fiber')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { assign, map, omit } = require('lodash')

console.log('DEFAULT_BEAM_WIDTH', DEFAULT_BEAM_WIDTH)

const Beam = require('./components/beam')
const Camera = require('./components/camera')

module.exports = GridBeamViewer

function GridBeamViewer ({ size, model }) {
  if (size == null) {
    size = [window.innerWidth, window.innerHeight]
  }

  const beamsByUuid = React.useMemo(
    () => {
      var result = {}
      model.beams.forEach(beam => {
        const uuid = THREE.Math.generateUUID()
        result[uuid] = beam
      })
      return result
    },
    [model]
  )

  const [cameraControlEnabled, setCameraControlEnabled] = React.useState(true)
  const enableCameraControl = React.useCallback(
    () => setCameraControlEnabled(true),
    []
  )
  const disableCameraControl = React.useCallback(
    () => setCameraControlEnabled(false),
    []
  )

  const [hoveredBeamByUuid, setHoveredBeamByUuid] = React.useState({})
  const [selectedBeamUuid, setSelectedBeamUuid] = React.useState(null)

  return (
    <Canvas orthographic>
      <hemisphereLight args={[0xffffbb, 0x080820]} />
      <Camera controlEnabled={cameraControlEnabled} />
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
            enableCameraControl={enableCameraControl}
            disableCameraControl={disableCameraControl}
          />
        )
      })}
    </Canvas>
  )
}
