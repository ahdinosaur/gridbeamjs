const React = require('react')
const THREE = require('three')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { assign, map } = require('lodash')
const { default: styled } = require('styled-components')

console.log('DEFAULT_BEAM_WIDTH', DEFAULT_BEAM_WIDTH)

const Provider = require('./components/provider')
const Sidebar = require('./components/sidebar')
const Vis = require('./components/vis')

module.exports = GridBeamEditor

function GridBeamEditor ({ initialModel }) {
  const [model, setModel] = React.useState(initialModel)

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
  const [hoveredBeamByUuid, setHoveredBeamByUuid] = React.useState({})
  const [selectedBeamUuid, setSelectedBeamUuid] = React.useState(null)

  const selectedBeam = React.useMemo(() => beamsByUuid[selectedBeamUuid], [
    beamsByUuid,
    selectedBeamUuid
  ])

  const updateSelectedBeam = React.useCallback(
    nextBeam => {
      const nextBeams = map(model.beams, beam => {
        return beam === selectedBeam ? nextBeam : beam
      })
      const nextModel = assign({}, model, {
        beams: nextBeams
      })
      setModel(nextModel)
    },
    [model]
  )

  return (
    <Provider>
      <Container>
        <Sidebar
          selectedBeam={selectedBeam}
          updateSelectedBeam={updateSelectedBeam}
        />
        <Vis
          beamsByUuid={beamsByUuid}
          selectedBeamUuid={selectedBeamUuid}
          setSelectedBeamUuid={setSelectedBeamUuid}
          hoveredBeamByUuid={hoveredBeamByUuid}
          setHoveredBeamByUuid={setHoveredBeamByUuid}
        />
      </Container>
    </Provider>
  )
}

const Container = styled.div({
  margin: '0',
  padding: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
})
