const csg = require('@jscad/csg')
const csgToMesh = require('csg-to-mesh')

const GridBeam = require('./')(csg)

const beam = GridBeam.beam({
  position: [0, 0, 0],
  direction: 'z',
  length: 10
})
const mesh = csgToMesh(beam)

console.log(JSON.stringify(mesh, null, 2))
