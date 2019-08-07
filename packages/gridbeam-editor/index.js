const React = require('react')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { prop } = require('ramda')
const { default: styled } = require('styled-components')

console.log('DEFAULT_BEAM_WIDTH', DEFAULT_BEAM_WIDTH)

const useModelStore = require('./stores/model')

const { withProvider } = require('./components/provider')
const Sidebar = require('./components/sidebar')
const ActionButton = require('./components/action')
const Vis = require('./components/vis')
const Keyboard = require('./components/keyboard')

module.exports = withProvider(GridBeamEditor)

function GridBeamEditor ({ defaultParts }) {
  const parts = useModelStore(prop('parts'))
  const setParts = useModelStore(prop('setParts'))
  const isLoaded = useModelStore(prop('isLoaded'))
  const setLoaded = useModelStore(prop('setLoaded'))
  const loadParts = useModelStore(prop('loadParts'))
  const saveParts = useModelStore(prop('saveParts'))

  React.useEffect(
    () => {
      if (!isLoaded) loadParts(setParts, setLoaded)
      else if (parts == null) setParts(defaultParts)
      else saveParts(parts)
    },
    [isLoaded, loadParts, setParts, setLoaded, parts, defaultParts, saveParts]
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
