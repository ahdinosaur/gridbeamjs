const React = require('react')
const csg = require('@jscad/csg')
const GridBeamCsg = require('gridbeam-csg')(csg)
const csgToMesh = require('csg-to-mesh')

const Complex = require('./complex')

module.exports = Beam

function Beam ({ beam }) {
  const mesh = React.useMemo(() => beamToMesh(beam), [beam])

  return (
    <mesh>
      <Complex mesh={mesh} attach='geometry' />
      <meshNormalMaterial attach='material' />
    </mesh>
  )
}

function beamToMesh (beam) {
  const csg = GridBeamCsg.Beam(beam)
  return csgToMesh(csg)
}
