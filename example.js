const csg = require('@jscad/csg')
const csgToMesh = require('csg-to-mesh')

const GridBeam = require('./')(csg)

const beam = GridBeam.zBeam(10)
const mesh = csgToMesh(beam)

console.log(JSON.stringify(mesh, null, 2))
