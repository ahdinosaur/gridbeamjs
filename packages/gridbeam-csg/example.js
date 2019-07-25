const csg = require('@jscad/csg')
const csgToMesh = require('csg-to-mesh')

const { Beam } = require('./')(csg)

const beam = Beam({
  position: [0, 0, 0],
  direction: 'z',
  length: 10
})
const mesh = csgToMesh(beam)

console.log(JSON.stringify(mesh, null, 2))
