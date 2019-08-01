const React = require('react')
const THREE = require('three')
const csg = require('@jscad/csg')
const GridBeamCsg = require('gridbeam-csg')(csg)
const csgToMesh = require('csg-to-mesh')

const useCameraStore = require('../stores/camera').default

const Complex = require('./complex')

module.exports = Beam

function Beam (props) {
  const { uuid, beam, isHovered, hover, unhover, isSelected, select } = props

  const enableCameraControl = useCameraStore(state => state.enableControl)
  const disableCameraControl = useCameraStore(state => state.disableControl)

  const mesh = React.useMemo(() => beamToMesh(beam), [beam])

  const handleMove = React.useCallback(ev => {
    ev.stopPropagation()
    if (ev.buttons > 0) {
      console.log('move', ev)
    }
  }, [])

  const handleHover = React.useCallback(ev => {
    ev.stopPropagation()
    hover()
    console.log('hover', ev)
  }, [])

  const handleUnhover = React.useCallback(ev => {
    ev.stopPropagation()
    unhover()
    console.log('unhover', ev)
  }, [])

  const handleClick = React.useCallback(ev => {
    ev.stopPropagation()
    console.log('click', ev)
    select()
  }, [])

  const color = React.useMemo(
    () => {
      const value = isSelected ? 'pink' : isHovered ? 'red' : 'green'
      return new THREE.Color(value)
    },
    [isSelected, isHovered]
  )

  return (
    <mesh
      uuid={uuid}
      onClick={handleClick}
      onPointerDown={ev => {
        ev.stopPropagation()
        ev.target.setPointerCapture(ev.pointerId)
        console.log('disable')
        disableCameraControl()
      }}
      onPointerUp={ev => {
        ev.stopPropagation()
        ev.target.releasePointerCapture(ev.pointerId)
        console.log('enable')
        enableCameraControl()
      }}
      onPointerMove={handleMove}
      onPointerOver={handleHover}
      onPointerOut={handleUnhover}
    >
      <Complex mesh={mesh} attach='geometry' />
      <meshLambertMaterial attach='material' color={color} />
    </mesh>
  )
}

function beamToMesh (beam) {
  const csg = GridBeamCsg.Beam(beam)
  return csgToMesh(csg)
}
