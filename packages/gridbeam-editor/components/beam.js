const React = require('react')
const { Draw } = require('react-regl')
const csg = require('@jscad/csg')
const GridBeamCsg = require('gridbeam-csg')(csg)
const csgToMesh = require('csg-to-mesh')
const meshNormals = require('angle-normals')
const mat4 = require('gl-mat4')

const { Context: CameraContext } = require('./camera')

module.exports = Beam

function Beam ({ beam }) {
  const mesh = React.useMemo(() => beamToMesh(beam), [beam])
  const normal = React.useMemo(() => meshNormals(mesh.cells, mesh.positions), [
    mesh
  ])

  const camera = React.useContext(CameraContext)

  return (
    <Draw
      vert={`
        precision mediump float;
        uniform mat4 model, projection, view;
        attribute vec3 position, normal;
        varying vec3 vnormal;
        void main () {
          vnormal = normal;
          gl_Position = projection * view * model * vec4(position, 1.0);
        }
      `}
      frag={`
        precision mediump float;
        varying vec3 vnormal;
        void main() {
          gl_FragColor = vec4(abs(vnormal), 1.0);
        }
      `}
      elements={mesh.cells}
      attributes={{
        position: mesh.positions,
        normal
      }}
      uniforms={{
        model: mat4.identity([]),
        projection: camera.projection,
        view: camera.view
      }}
    />
  )
}

function beamToMesh (beam) {
  const csg = GridBeamCsg.Beam(beam)
  return csgToMesh(csg)
}
