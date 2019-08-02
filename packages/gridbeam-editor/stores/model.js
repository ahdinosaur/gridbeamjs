const THREE = require('three')
const create = require('./').default
const { map, prop } = require('ramda')

console.log('THREE', THREE)

const generateUuids = map(() => THREE.Math.generateUUID())
// const generateUuids = map(() => 'arst')

const [useModelStore] = create(set => ({
  model: null,
  beamUuids: [],
  setModel: model =>
    set(state => {
      state.model = model
      state.beamUuids = generateUuids(model.beams)
    }),
  ...createBeamHappening('hover'),
  ...createBeamHappening('select'),
  updateBeam: (uuid, nextBeam) => ({ model, beamUuids }) => {
    const index = beamUuids.findIndex(uuid)
    const nextBeams = model.beams.splice(index, 1, nextBeam)
    const nextModel = Object.assign({}, model, { beams: nextBeams })
    return { model: nextModel }
  }
}))

module.exports = useModelStore

// what about a happen for any uuid?
function createBeamHappening (happen) {
  return {
    [`${happen}edBeamUuids`]: {},
    [`${happen}Beam`]: uuid => state =>
      console.log(happen, uuid) && {
        [`${happen}edBeamUuids`]: Object.assign(
          {},
          state[`${happen}edBeamUuids`],
          {
            [uuid]: true
          }
        )
      },
    //  hoverBeam: pipe(
    //    prop('hoveredBeamUuids'),
    //    assoc(uuid, true),
    //    assoc('hoveredBeamUuids', __, {})
    //  ),
    [`${happen}Beams`]: uuids => state => ({
      [`${happen}edBeamUuids`]: uuids
    }),
    [`un${happen}Beam`]: uuid => state => ({
      [`${happen}edBeamUuids`]: Object.assign(
        {},
        state[`${happen}edBeamUuids`],
        {
          [uuid]: false
        }
      )
    })
  }
}
