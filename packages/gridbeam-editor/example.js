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

setInterval(() => {
  ReactDom.render(<GridBeamEditor model={model} />, element)
}, 1000)
