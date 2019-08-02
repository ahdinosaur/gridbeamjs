const React = require('react')
const THREE = require('three')
const csg = require('@jscad/csg')
const { DEFAULT_BEAM_WIDTH } = require('gridbeam-csg')
const GridBeamCsg = require('gridbeam-csg')(csg)
const csgToMesh = require('csg-to-mesh')
const { pipe, map, multiply } = require('ramda')

const useCameraStore = require('../stores/camera').default

const Complex = require('./complex')

module.exports = Beam

function Beam (props) {
  const { uuid, value, isHovered, hover, unhover, isSelected, select } = props

  const enableCameraControl = useCameraStore(state => state.enableControl)
  const disableCameraControl = useCameraStore(state => state.disableControl)

  const mesh = React.useMemo(
    () => {
      const beam = {
        direction: 'x',
        length: value.length,
        origin: [0, 0, 0]
      }
      return beamToMesh(beam)
    },
    [value.length]
  )

  const position = React.useMemo(
    () =>
      pipe(map(multiply(DEFAULT_BEAM_WIDTH)), ary =>
        new THREE.Vector3().fromArray(ary)
      )(value.origin),
    [value.origin]
  )

  const handleMove = React.useCallback(ev => {
    ev.stopPropagation()
    if (ev.buttons > 0) {
      // console.log('move', uuid)
    }
  }, [])

  const handleHover = React.useCallback(ev => {
    ev.stopPropagation()
    // console.log('hover', uuid)
    hover()
  }, [])

  const handleUnhover = React.useCallback(ev => {
    ev.stopPropagation()
    // console.log('unhover', uuid)
    unhover()
  }, [])

  const handleClick = React.useCallback(ev => {
    ev.stopPropagation()
    // console.log('click', uuid)
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
      position={position}
      onClick={handleClick}
      onPointerDown={ev => {
        ev.stopPropagation()
        ev.target.setPointerCapture(ev.pointerId)
        disableCameraControl()
      }}
      onPointerUp={ev => {
        ev.stopPropagation()
        ev.target.releasePointerCapture(ev.pointerId)
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
