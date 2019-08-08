const React = require('react')
// const THREE = require('three')
const { useThree } = require('react-three-fiber')
const { Box } = require('rebass')

module.exports = Selection

function Selection (props) {
  //  const { gl, camera, scene } = useThree()

  const [isDown, setIsDown] = React.useState(false)
  const [startPoint, setStartPoint] = React.useState({ x: 0, y: 0 })
  const [endPoint, setEndPoint] = React.useState({ x: 0, y: 0 })

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
      setIsDown(true)
      handleStart(ev)
    }
    function handleMouseMove (ev) {
      handleEnd(ev)
    }
    function handleMouseUp (ev) {
      setIsDown(false)
      handleEnd(ev)
    }
    function handleKeyUp (ev) {
      console.log('ev.keyCode', ev.keyCode)
      if (ev.keyCode === 'ShiftKey') {
        setIsDown(false)
      }
    }

    function handleStart (ev) {
      console.log('start')
      setStartPoint({
        x: ev.clientX / window.innerWidth * 2 - 1,
        y: -(ev.clientY / window.innerHeight) * 2 + 1
      })
    }
    function handleEnd (ev) {
      console.log('between')
      setEndPoint({
        x: ev.clientX / window.innerWidth * 2 - 1,
        y: -(ev.clientY / window.innerHeight) * 2 + 1
      })
    }
  }, [])

  return isDown && <SelectBox startPoint={startPoint} endPoint={endPoint} />
}

function SelectBox (props) {
  const { startPoint, endPoint } = props

  const bottomRightPoint = React.useMemo(
    () => ({
      x: Math.max(startPoint.x, endPoint.x),
      y: Math.max(startPoint.y, endPoint.y)
    }),
    [startPoint, endPoint]
  )

  const topLeftPoint = React.useMemo(
    () => ({
      x: Math.min(startPoint.x, endPoint.x),
      y: Math.min(startPoint.y, endPoint.y)
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
