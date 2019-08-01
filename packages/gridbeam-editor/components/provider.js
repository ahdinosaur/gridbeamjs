const React = require('react')
const { ThemeProvider } = require('styled-components')

const theme = require('../theme')

module.exports = Provider

function Provider (props) {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
