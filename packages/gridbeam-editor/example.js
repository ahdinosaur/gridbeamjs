const React = require('react')
const ReactDom = require('react-dom')

const GridBeamEditor = require('./')

/*

http://localhost:9966/#W3sidHlwZSI6ImJlYW0iLCJkaXJlY3Rpb24iOiJ4Iiwib3JpZ2luIjpbMCwwLDBdLCJsZW5ndGgiOjJ9LHsidHlwZSI6ImJlYW0iLCJkaXJlY3Rpb24iOiJ5Iiwib3JpZ2luIjpbMCwwLDBdLCJsZW5ndGgiOjV9LHsidHlwZSI6ImJlYW0iLCJkaXJlY3Rpb24iOiJ6Iiwib3JpZ2luIjpbNiwwLDVdLCJsZW5ndGgiOjE0fSx7InR5cGUiOiJiZWFtIiwiZGlyZWN0aW9uIjoieCIsImxlbmd0aCI6NSwib3JpZ2luIjpbMywwLDRdfSx7InR5cGUiOiJiZWFtIiwiZGlyZWN0aW9uIjoieCIsImxlbmd0aCI6NSwib3JpZ2luIjpbMCwzLDNdfSx7InR5cGUiOiJiZWFtIiwiZGlyZWN0aW9uIjoieCIsImxlbmd0aCI6NSwib3JpZ2luIjpbMCwwLDddfV0
http://localhost:9966/#W3sidHlwZSI6ImJlYW0iLCJkaXJlY3Rpb24iOiJ4Iiwib3JpZ2luIjpbMCwwLDFdLCJsZW5ndGgiOjEwfSx7InR5cGUiOiJiZWFtIiwiZGlyZWN0aW9uIjoieSIsIm9yaWdpbiI6WzAsMCwwXSwibGVuZ3RoIjo1fSx7InR5cGUiOiJiZWFtIiwiZGlyZWN0aW9uIjoieiIsIm9yaWdpbiI6WzEsMSwwXSwibGVuZ3RoIjoyfV0

*/

var defaultParts = [
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

ReactDom.render(<GridBeamEditor defaultParts={defaultParts} />, element)
