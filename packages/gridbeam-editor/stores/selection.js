const THREE = require('three')
const { useState, useEffect } = require('react')

const create = require('./').default

const [useSelectionStore] = create(set => ({
  isEnabled: true,
  enable: () => set(state => { state.isEnabled = true }),
  disable: () => set(state => { state.isEnabled = false }),
  isSelecting: false,
  startSelection: () =>
    set(state => {
      state.isSelecting = true
    }),
  endSelection: () =>
    set(state => {
      state.isSelecting = false
    }),
  startPoint: { x: 0, y: 0 },
  endPoint: { x: 0, y: 0 },
  setStartPoint: ({ x, y }) =>
    set(state => {
      state.startPoint.x = x
      state.startPoint.y = y
    }),
  setEndPoint: ({ x, y }) =>
    set(state => {
      state.endPoint.x = x
      state.endPoint.y = y
    }),
  selectableScreenBounds: {},
  updateSelectableScreenBounds: ({ scene, camera }) =>
    set(state => {
      forEachMesh(scene, mesh => {
        state.selectableScreenBounds[mesh.uuid] = computeScreenBounds({
          mesh,
          camera
        })
      })
    })
}))

module.exports = useSelectionStore

function forEachMesh (object, fn) {
  if (object.isMesh) {
    if (object.geometry !== undefined) {
      fn(object)
    }
  }

  if (object.children.length > 0) {
    for (var i = 0; i < object.children.length; i++) {
      forEachMesh(object.children[i], fn)
    }
  }
}

function computeScreenBounds ({ mesh, camera }) {
  var vertices = mesh.geometry.vertices
  var vertex = new THREE.Vector3()
  var min = new THREE.Vector3(1, 1, 1)
  var max = new THREE.Vector3(-1, -1, -1)

  for (var i = 0; i < vertices.length; i++) {
    var vertexWorldCoord = vertex
      .copy(vertices[i])
      .applyMatrix4(mesh.matrixWorld)
    var vertexScreenSpace = vertexWorldCoord.project(camera)
    min.min(vertexScreenSpace)
    max.max(vertexScreenSpace)
  }

  return new THREE.Box2(min, max)
}
