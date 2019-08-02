const React = require('react')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const { prop } = require('ramda')
const { default: styled } = require('styled-components')

console.log('DEFAULT_BEAM_WIDTH', DEFAULT_BEAM_WIDTH)

const useModelStore = require('./stores/model')

const { withProvider } = require('./components/provider')
const Sidebar = require('./components/sidebar')
const Vis = require('./components/vis')

module.exports = withProvider(GridBeamEditor)

function GridBeamEditor ({ initialModel }) {
  const setModel = useModelStore(prop('setModel'))
  React.useEffect(() => setModel(initialModel), [])

  return (
    <Container>
      <Sidebar />
      <Vis />
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
