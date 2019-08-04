const React = require('react')
const ReactDom = require('react-dom')

const GridBeamEditor = require('./')

// http://localhost:9966/#W3sidHlwZSI6ImJlYW0iLCJkaXJlY3Rpb24iOiJ4Iiwib3JpZ2luIjpbMCwwLDBdLCJsZW5ndGgiOjJ9LHsidHlwZSI6ImJlYW0iLCJkaXJlY3Rpb24iOiJ5Iiwib3JpZ2luIjpbMCwwLDBdLCJsZW5ndGgiOjV9LHsidHlwZSI6ImJlYW0iLCJkaXJlY3Rpb24iOiJ6Iiwib3JpZ2luIjpbMCwwLDBdLCJsZW5ndGgiOjEwfV0%3D

/*
var initialParts = [
  {
    type: 'beam',
    direction: 'x',
    origin: [0, 0, 0],
    length: 2
  },
  {
    type: 'beam',
    direction: 'y',
    origin: [0, 0, 0],
    length: 5
  },
  {
    type: 'beam',
    direction: 'z',
    origin: [0, 0, 0],
    length: 10
  }
]
*/

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

ReactDom.render(<GridBeamEditor />, element)
