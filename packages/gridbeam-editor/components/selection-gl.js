const React = require('react')
const THREE = require('three')
const { useThree } = require('react-three-fiber')
const { Box } = require('rebass')
const { prop, forEach } = require('ramda')
const produce = require('immer').default

const useSelectionStore = require('../stores/selection')
const useModelStore = require('../stores/model')

module.exports = SelectionBox

// - for each mesh, generate 2d screen box
//   - https://stackoverflow.com/a/45879073
// - generate selected bounds
//   - startPoint and Box2.expandByPoint(endPoint)
// - if selected bounds includes mesh box, it's in
//   - Box2.containsBox
//

function SelectionBox (props) {
  const isSelecting = useSelectionStore(prop('isSelecting'))
  const startPoint = useSelectionStore(prop('startPoint'))
  const endPoint = useSelectionStore(prop('endPoint'))
  const selectableScreenBounds = useSelectionStore(
    prop('selectableScreenBounds')
  )
  const select = useModelStore(prop('select'))

  const selectionScreenBounds = React.useMemo(
    () => {
      var box = new THREE.Box2()
      box.makeEmpty()
      box.expandByPoint(new THREE.Vector2(startPoint.x, startPoint.y))
      box.expandByPoint(new THREE.Vector2(endPoint.x, endPoint.y))
      return box
    },
    [startPoint, endPoint]
  )

  React.useEffect(
    () => {
      if (isSelecting) {
        Object.entries(selectableScreenBounds).forEach(
          ([uuid, selectableBox]) => {
            if (selectionScreenBounds.containsBox(selectableBox)) {
              select(uuid)
            }
          }
        )
      }
    },
    [isSelecting, selectionScreenBounds, selectableScreenBounds]
  )

  return null
}

module.exports = SelectionBox