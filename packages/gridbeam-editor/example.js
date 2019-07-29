const React = require('react')
const ReactDom = require('react-dom')

const GridBeamEditor = require('./')

var model = {
  beams: [
    {
      direction: 'x',
      origin: [0, 0, 0],
      length: 2
    },
    {
      direction: 'y',
      origin: [0, 0, 0],
      length: 5
    },
    {
      direction: 'z',
      origin: [0, 0, 0],
      length: 10
    }
  ]
}

const element = document.createElement('main')
document.body.appendChild(element)

const style = document.createElement('style')
document.head.appendChild(style)
const { sheet } = style
sheet.insertRule(
  `
  html, body, main {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`,
  0
)

ReactDom.render(<GridBeamEditor model={model} />, element)
