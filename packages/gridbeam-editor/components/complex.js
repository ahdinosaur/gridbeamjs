const React = require('react')
const THREE = require('three')
const Normals = require('normals')
const { useUpdate } = require('react-three-fiber')

module.exports = SimplicialComplexGeometry

function SimplicialComplexGeometry (props) {
  const { mesh, attach } = props
  var { positions, cells } = mesh

  console.log('mesh', mesh)

  const ref = useUpdate(
    geometry => {
      updateCells(geometry, cells)
      updatePositions(geometry, positions)
      updateNormals(geometry, cells, positions)
      console.log('geometry', geometry)
    },
    [mesh]
  )

  return <bufferGeometry attach={attach} ref={ref} />
}

function updateCells (geometry, cells) {
  geometry.setIndex(toBufferAttribute(cells, Uint32Array))
  geometry.index.needsUpdate = true
}

function updatePositions (geometry, positions) {
  geometry.addAttribute('position', toBufferAttribute(positions, Float32Array))
  geometry.attributes.position.needsUpdate = true
}

function updateNormals (geometry, cells, positions) {
  const faceNormals = Normals.vertexNormals(cells, positions)
  geometry.addAttribute('normal', toBufferAttribute(faceNormals, Float32Array))
  geometry.attributes.normal.needsUpdate = true
}

// TODO use flatten-vertex-data
function toBufferAttribute (items, TypedArray) {
  const itemSize = items[0].length
  const bufferLength = itemSize * items.length

  var bufferArray = new TypedArray(bufferLength)

  for (var i = 0, k = 0; i < items.length; i++) {
    for (var j = 0; j < itemSize; j++) {
      bufferArray[k++] = items[i][j]
    }
  }

  return new THREE.BufferAttribute(bufferArray, itemSize)
}
