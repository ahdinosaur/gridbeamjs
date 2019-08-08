/**
 * @author HypnosNova / https://www.threejs.org.cn/gallery
 * This is a class to check whether objects are in a selection area in 3D space
 */

const { Frustum, Plane, Vector3 } = require('three')

var SelectionBox = (function () {
  var center = new Vector3()

  var topLeft = new Vector3()
  var topRight = new Vector3()
  var bottomLeft = new Vector3()
  var bottomRight = new Vector3()

  var topPlane = new Plane()
  var rightPlane = new Plane()
  var leftPlane = new Plane()
  var bottomPlane = new Plane()

  function SelectionBox (camera, scene, deep) {
    this.camera = camera
    this.scene = scene
    this.startPoint = new Vector3()
    this.endPoint = new Vector3()
    this.collection = []
  }

  SelectionBox.prototype.select = function (startPoint, endPoint) {
    this.startPoint = startPoint || this.startPoint
    this.endPoint = endPoint || this.endPoint
    this.collection = []

    this.updatePlanes(this.startPoint, this.endPoint)
    this.searchChild(this.scene)

    return this.collection
  }

  SelectionBox.prototype.updatePlanes = function (startPoint, endPoint) {
    startPoint = startPoint || this.startPoint
    endPoint = endPoint || this.endPoint

    this.camera.updateProjectionMatrix()
    this.camera.updateMatrixWorld()

    topLeft.set(
      Math.min(startPoint.x, endPoint.x),
      Math.max(startPoint.y, endPoint.y),
      0.5
    )
    topRight.set(
      Math.max(startPoint.x, endPoint.x),
      Math.max(startPoint.y, endPoint.y),
      0.5
    )
    bottomLeft.set(
      Math.min(startPoint.x, endPoint.x),
      Math.min(startPoint.y, endPoint.y),
      0.5
    )
    bottomRight.set(
      Math.max(startPoint.x, endPoint.x),
      Math.min(startPoint.y, endPoint.y),
      0.5
    )

    topLeft.unproject(this.camera)
    topRight.unproject(this.camera)
    bottomLeft.unproject(this.camera)
    bottomRight.unproject(this.camera)

    topPlane.setFromCoplanarPoints(this.camera.position, topLeft, topRight)
    rightPlane.setFromCoplanarPoints(
      this.camera.position,
      topRight,
      bottomRight
    )
    bottomPlane.setFromCoplanarPoints(
      this.camera.position,
      bottomRight,
      bottomLeft
    )
    leftPlane.setFromCoplanarPoints(this.camera.position, bottomLeft, topLeft)

    console.log('planes', topPlane, rightPlane, bottomPlane, leftPlane)
  }

  SelectionBox.prototype.searchChild = function (object) {
    if (object.isMesh) {
      if (object.material !== undefined) {
        // object.geometry.computeBoundingSphere()

        if (this.isInsideBounds(object)) {
          this.collection.push(object)
        }
      }
    }

    if (object.children.length > 0) {
      for (var x = 0; x < object.children.length; x++) {
        this.searchChild(object.children[x])
      }
    }
  }

  SelectionBox.prototype.isInsideBounds = function (object) {
    var sphere = object.geometry.boundingSphere
    var negRadius = -sphere.radius

    center.copy(sphere.center)
    center.applyMatrix4(object.matrixWorld)

    console.log('center', sphere)

    if (topPlane.distanceToPoint(center) < negRadius) return false
    if (bottomPlane.distanceToPoint(center) < negRadius) return false
    if (rightPlane.distanceToPoint(center) < negRadius) return false
    if (leftPlane.distanceToPoint(center) < negRadius) return false

    return true
  }

  return SelectionBox
})()

module.exports = SelectionBox

// - for each mesh, generate 2d screen box
//   - https://stackoverflow.com/a/45879073
// - generate selected bounds
//   - startPoint and Box2.expandByPoint(endPoint)
// - if selected bounds includes mesh box, it's in
//   - Box2.containsBox
//
