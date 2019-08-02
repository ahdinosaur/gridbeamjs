const THREE = require('three')
const create = require('./').default
const { equals, map, prop } = require('ramda')

const generateUuids = map(() => THREE.Math.generateUUID())

// TODO model.beams -> model.parts
// current beam becomes a generic part with type 'beam'

const [useModelStore] = create(set => ({
  model: null,
  uuids: [],
  setModel: model =>
    set(state => {
      state.model = model
      state.uuids = generateUuids(model.beams)
    }),
  ...createBeamHappening(set, 'hover'),
  ...createBeamHappening(set, 'select'),
  update: (uuid, updater) =>
    set(state => {
      var { model, uuids } = state
      var index = uuids.findIndex(equals(uuid))
      var beam = model.beams[index]
      updater(beam)
    })
}))

module.exports = useModelStore

// what about a happen for any uuid?
function createBeamHappening (set, happen) {
  return {
    [`${happen}edUuids`]: {},
    [`${happen}`]: uuid => {
      return set(state => {
        state[`${happen}edUuids`][uuid] = true
      })
    },
    //  hoverBeam: pipe(
    //    prop('hoveredBeamUuids'),
    //    assoc(uuid, true),
    //    assoc('hoveredBeamUuids', __, {})
    //  ),
    [`${happen}s`]: uuids => {
      return set(state => {
        var nextHappenedUuids = {}
        uuids.forEach(uuid => {
          nextHappenedUuids[uuid] = true
        })
        state[`${happen}edUuids`] = nextHappenedUuids
      })
    },
    [`un${happen}`]: uuid =>
      set(state => {
        delete state[`${happen}edUuids`][uuid]
      })
  }
}
