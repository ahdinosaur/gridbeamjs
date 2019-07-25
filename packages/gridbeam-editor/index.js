const React = require('react')
const { default: Regl, Draw } = require('react-regl')
const csg = require('@jscad/csg')
const GridBeamCsg = require('gridbeam-csg')(csg)
const csgToMesh = require('csg-to-mesh')
const mat4 = require('gl-mat4')
const meshNormals = require('angle-normals')

module.exports = GridBeamViewer

function GridBeamViewer ({ size, model }) {
  const { beams } = model
  if (size == null) {
    size = [window.innerWidth, window.innerHeight]
  }
  return (
    <Regl width={size[0]} height={size[1]} forceRedrawOnTick>
      {beams.map((beam, index) => <Beam key={index} beam={beam} />)}
    </Regl>
  )
}

function Beam ({ beam }) {
  const mesh = React.useMemo(() => beamToMesh(beam), [beam])
  const normal = React.useMemo(() => meshNormals(mesh.cells, mesh.positions), [
    mesh
  ])

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
        projection: ({ viewportWidth, viewportHeight }) => {
          return mat4.perspective(
            [],
            Math.PI / 4,
            viewportWidth / viewportHeight,
            0.01,
            1000
          )
        },
        view: ({ tick }) => {
          const t = 0.01 * tick
          return mat4.lookAt(
            [],
            [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
            [0, 2.5, 0],
            [0, 1, 0]
          )
        }
      }}
    />
  )
}

function beamToMesh (beam) {
  const csg = GridBeamCsg.Beam(beam)
  return csgToMesh(csg)
}
