const React = require('react')
const THREE = require('three')
const { useUpdate } = require('react-three-fiber')

module.exports = SimplicialComplexGeometry

function SimplicialComplexGeometry (props) {
  const { mesh, attach } = props
  const { positions, cells } = mesh

  const ref = useUpdate(
    geometry => {
      updatePositions(geometry, positions)
      updateCells(geometry, cells)
      // geometry.computeFaceNormals()
      // geometry.computeFlatVertexNormals()
    },
    [mesh]
  )

  return (
    <geometry
      attach={attach}
      ref={ref}
      vertices={positions.map(pos => new THREE.Vector3().fromArray(pos))}
      faces={cells.map(cell => new THREE.Face3(cell[0], cell[1], cell[2]))}
    />
  )
}

function updatePositions (geometry, positions) {
  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i]
    if (i > geometry.vertices.length - 1) {
      geometry.vertices.push(new THREE.Vector3().fromArray(pos))
    } else {
      geometry.vertices[i].fromArray(pos)
    }
  }
  geometry.vertices.length = positions.length
  geometry.verticesNeedUpdate = true
}

function updateCells (geometry, cells) {
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i]
    if (i > geometry.faces.length - 1) {
      geometry.faces.push(new THREE.Face3(cell[0], cell[1], cell[2]))
    } else {
      var face = geometry.faces[i]
      face.a = face[0]
      face.b = face[1]
      face.c = face[2]
    }
  }

  geometry.faces.length = cells.length
  geometry.elementsNeedUpdate = true
}
