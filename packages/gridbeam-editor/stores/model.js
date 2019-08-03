const THREE = require('three')
const create = require('./').default
const { map, zipObj } = require('ramda')

const [useModelStore] = create(set => ({
  parts: {},
  setParts: parts =>
    set(state => {
      const uuids = parts.map(part => THREE.Math.generateUUID())
      state.parts = zipObj(uuids, parts)
    }),
  ...createBeamHappening(set, 'hover'),
  ...createBeamHappening(set, 'select'),
  addPart: newPart =>
    set(state => {
      const uuid = THREE.Math.generateUUID()
      state.parts[uuid] = newPart
    }),
  update: (uuid, updater) => set(state => updater(state.parts[uuid]))
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
