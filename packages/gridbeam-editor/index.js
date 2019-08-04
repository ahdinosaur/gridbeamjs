const React = require('react')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { prop } = require('ramda')
const { default: styled } = require('styled-components')

console.log('DEFAULT_BEAM_WIDTH', DEFAULT_BEAM_WIDTH)

const useModelStore = require('./stores/model')

const { withProvider } = require('./components/provider')
const Sidebar = require('./components/sidebar')
const Vis = require('./components/vis')
const Keyboard = require('./components/keyboard')

module.exports = withProvider(GridBeamEditor)

function GridBeamEditor ({ initialParts }) {
  const parts = useModelStore(prop('parts'))
  const setParts = useModelStore(prop('setParts'))
  const loadParts = useModelStore(prop('loadParts'))
  const saveParts = useModelStore(prop('saveParts'))

  React.useEffect(
    () => {
      if (initialParts) setParts(initialParts)
      else loadParts(setParts)
    },
    [initialParts]
  )
  React.useEffect(
    () => {
      if (parts != null) saveParts(parts)
    },
    [parts]
  )

  if (parts == null) return null

  return (
    <Container>
      <Sidebar />
      <ActionButton />
      <Vis />
      <Keyboard />
    </Container>
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

const { Button } = require('rebass')

function ActionButton (props) {
  const addPart = useModelStore(prop('addPart'))

  return (
    <Button
      ml={3}
      mb={3}
      css={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 1
      }}
      onClick={handleClick}
    >
      Add Beam
    </Button>
  )

  function handleClick (ev) {
    addPart({
      type: 'beam',
      direction: 'x',
      length: 5,
      origin: [0, 0, 0]
    })
  }
}
