const React = require('react')
const { useThree } = require('react-three-fiber')
const { createGlobalStyle } = require('styled-components')

const SelectionBox = require('../vendor/SelectionBox')
const SelectionHelper = require('../vendor/SelectionHelper')

const GlobalSelectionStyle = createGlobalStyle`
  .selectBox {
    border: 1px solid #55aaff;
    background-color: rgba(75, 160, 255, 0.3);
    position: fixed;
  }
`

module.exports = Selection

function Selection (props) {
  const { gl, camera, scene } = useThree()

  const selectionBox = React.useMemo(
    () => {
      console.log('selectionBox')
      return new SelectionBox(camera, scene)
    },
    [camera, scene]
  )
  const selectionHelper = React.useMemo(
    () => {
      console.log('selectionHelper', gl)
      return new SelectionHelper(selectionBox, gl, 'selectBox')
    },
    [selectionBox, gl]
  )

  React.useEffect(() => {
    var isDown = false

    document.addEventListener('mousedown', handleDown)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)

    return () => {
      document.removeEventListener('mousedown', handleDown)
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }

    function handleDown (ev) {
      if (!ev.shiftKey) return
      isDown = true
      start(ev)
    }
    function handleMove (ev) {
      if (isDown) {
        if (ev.shiftKey) {
          between(ev)
        } else {
          isDown = false
          end(ev)
        }
      }
    }
    function handleUp (ev) {
      if (ev.shiftKey) {
        isDown = false
        end(ev)
      }
    }
    function start (ev) {
      console.log('start')
      selectionBox.startPoint.set(
        ev.clientX / window.innerWidth * 2 - 1,
        -(ev.clientY / window.innerHeight) * 2 + 1,
        0.5
      )
    }
    function between (ev) {
      console.log('between')
      selectionBox.endPoint.set(
        ev.clientX / window.innerWidth * 2 - 1,
        -(ev.clientY / window.innerHeight) * 2 + 1,
        0.5
      )
      const selected = selectionBox.select()
      console.log('selected', selected)
    }
    function end (ev) {
      console.log('end')
      selectionBox.endPoint.set(
        ev.clientX / window.innerWidth * 2 - 1,
        -(ev.clientY / window.innerHeight) * 2 + 1,
        0.5
      )
      const selected = selectionBox.select()
      console.log('selected', selected)
    }
  }, [])

  return <GlobalSelectionStyle />
}
