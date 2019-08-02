const React = require('react')
const { ThemeProvider } = require('styled-components')

const theme = require('../theme')

module.exports = Provider
module.exports.withProvider = withProvider

function Provider (props) {
  const { children } = props

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

function withProvider (Component) {
  return function WithProvider (props) {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    )
  }
}
