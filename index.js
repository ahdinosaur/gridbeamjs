/*
 *  OpenJsCad BeatBeam Library (http://joostn.github.com/OpenJsCad/)
 *  Copyright (C) 2013 Michael Williams
 *
 *  License: LGPL 2.1 or later
*/

// zBeam(length) - create a vertical beatbeam strut 'length' long
// xBeam(length) - create a horizontal beatbeam strug along the X axis
// yBeam(length) - create a horizontal beatbeam strut along the Y axis
// translateBeam(beam, [x, y, z]) - translate beatbeam struts in X, Y, or Z axes in units 'beamWidth'

/*

config
  [
    {
      name: 'resolution',
      type: 'choice',
      caption: 'Quality',
      values: [16, 64],
      captions: ["Draft","High"],
      default: 16,
    },
    { name: 'beamWidth', caption: 'spacing between holes', type: 'float', default: 10 },
    { name: 'holeRadius', caption: 'radius of holes', type: 'float', default: 2.4 },
  ]

parameters
  [
    { name: 'length', caption: 'beam length', type: 'int', default: 10 },
    { name: 'direction': caption: 'x, y, or z axis' },
    { name: 'offset': caption: 'x, y, or z offset' }
  ]
*/

module.exports = GridBeam

const DEFAULT_CYLINDER_RESOLUTION = 16
const DEFAULT_BEAM_WIDTH = 10
const DEFAULT_HOLE_RADIUS = 2.4

function GridBeam (csg, options = {}) {
  const CSG = csg.CSG

  const {
    cylinderResolution = DEFAULT_CYLINDER_RESOLUTION,
    beamWidth = DEFAULT_BEAM_WIDTH,
    holeRadius = DEFAULT_HOLE_RADIUS
  } = options

  return {
    xBeam,
    yBeam,
    zBeam,
    translateBeam
  }

  function xHole (i) {
    return CSG.cylinder({
      start: [-1, beamWidth / 2, i * beamWidth + beamWidth / 2],
      end: [beamWidth + 1, beamWidth / 2, i * beamWidth + beamWidth / 2],
      radius: holeRadius,
      resolution: cylinderResolution
    })
  }

  function yHole (i) {
    return CSG.cylinder({
      start: [beamWidth / 2, -1, i * beamWidth + beamWidth / 2],
      end: [beamWidth / 2, beamWidth + 1, i * beamWidth + beamWidth / 2],
      radius: holeRadius,
      resolution: cylinderResolution
    })
  }

  function zBeam (length) {
    var cube = CSG.roundedCube({
      center: [beamWidth / 2, beamWidth / 2, length * beamWidth / 2],
      radius: [beamWidth / 2, beamWidth / 2, length * beamWidth / 2]
    })
    var holes = []
    for (var i = 0; i < length; i++) {
      holes.push(xHole(i))
      holes.push(yHole(i))
    }
    var beam = cube.subtract(holes)
    return beam
  }

  function yBeam (length) {
    return translateBeam(zBeam(length).rotateX(-90), [0, 0, 1])
  }

  function xBeam (length) {
    return translateBeam(zBeam(length).rotateY(90), [0, 0, 1])
  }

  function translateBeam (beam, vector) {
    return beam.translate(
      vector.map(function (n) {
        return beamWidth * n
      })
    )
  }
}
