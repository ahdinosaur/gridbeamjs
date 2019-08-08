const React = require('react')
const { Box } = require('rebass')
const { prop } = require('ramda')

const useSelectionStore = require('../stores/selection')

module.exports = SelectionBox

function SelectionBox (props) {
  const isSelecting = useSelectionStore(prop('isSelecting'))
  const startSelection = useSelectionStore(prop('startSelection'))
  const endSelection = useSelectionStore(prop('endSelection'))
  const startPoint = useSelectionStore(prop('startPoint'))
  const endPoint = useSelectionStore(prop('endPoint'))
  const setStartPoint = useSelectionStore(prop('setStartPoint'))
  const setEndPoint = useSelectionStore(prop('setEndPoint'))

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    function handleMouseDown (ev) {
      if (!ev.shiftKey) return
      startSelection()
      handleStart(ev)
    }

    function handleMouseMove (ev) {
      handleEnd(ev)
    }

    function handleMouseUp (ev) {
      endSelection()
      handleEnd(ev)
    }

    function handleKeyUp (ev) {
      if (ev.code === 'ShiftLeft') {
        endSelection()
      }
    }

    function handleStart (ev) {
      setStartPoint({
        x: ev.clientX / window.innerWidth * 2 - 1,
        y: -(ev.clientY / window.innerHeight) * 2 + 1
      })
    }
    function handleEnd (ev) {
      setEndPoint({
        x: ev.clientX / window.innerWidth * 2 - 1,
        y: -(ev.clientY / window.innerHeight) * 2 + 1
      })
    }
  }, [])

  return (
    isSelecting && <SelectBox startPoint={startPoint} endPoint={endPoint} />
  )
}

function SelectBox (props) {
  const { startPoint, endPoint } = props

  const bottomRightPoint = React.useMemo(
    () => ({
      x: (Math.max(startPoint.x, endPoint.x) + 1) / 2 * window.innerWidth,
      y: -(Math.min(startPoint.y, endPoint.y) - 1) / 2 * window.innerHeight
    }),
    [startPoint, endPoint]
  )

  const topLeftPoint = React.useMemo(
    () => ({
      x: (Math.min(startPoint.x, endPoint.x) + 1) / 2 * window.innerWidth,
      y: -(Math.max(startPoint.y, endPoint.y) - 1) / 2 * window.innerHeight
    }),
    [startPoint, endPoint]
  )

  return (
    <Box
      css={{
        pointerEvents: 'none',
        border: '1px solid #55aaff',
        backgroundColor: 'rgba(75, 160, 255, 0.3)',
        position: 'fixed'
      }}
      style={{
        left: topLeftPoint.x,
        top: topLeftPoint.y,
        width: bottomRightPoint.x - topLeftPoint.x,
        height: bottomRightPoint.y - topLeftPoint.y
      }}
    />
  )
}
