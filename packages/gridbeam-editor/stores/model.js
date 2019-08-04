const THREE = require('three')
const create = require('./').default
const base64url = require('base64-url')
const { keys, map, values, zipObj } = require('ramda')

const [useModelStore] = create(set => ({
  parts: null,
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
  update: (uuid, updater) => set(state => updater(state.parts[uuid])),
  updateSelected: updater =>
    set(state => {
      const { selectedUuids } = state
      keys(selectedUuids).forEach(uuid => {
        updater(state.parts[uuid])
      })
    }),
  removeSelected: () => set(state => {
    const { selectedUuids } = state
    keys(selectedUuids).forEach(uuid => {
      delete state.parts[uuid]
    })
  }),
  loadParts: setParts => {
    const partsUriComponent = window.location.href.split('#')[1]
    if (partsUriComponent == null) return

    const partsBase64 = decodeURIComponent(partsUriComponent)

    try {
      var partsJson = base64url.decode(partsBase64)
    } catch (err) {
      throw new Error(
        'gridbeam-editor/stores/parts: could not parse parts from Base64 in Url'
      )
    }

    try {
      var parts = JSON.parse(partsJson)
    } catch (err) {
      throw new Error(
        'gridbeam-editor/stores/parts: could not parse parts from Json in Url'
      )
    }

    return setParts(parts)
  },
  saveParts: parts => {
    const partsOut = values(parts)

    try {
      var partsJson = JSON.stringify(partsOut)
    } catch (err) {
      throw new Error(
        'gridbeam-editor/stores/parts: could not stringify Json parts'
      )
    }
    try {
      var partsBase64 = base64url.encode(partsJson)
    } catch (err) {
      throw new Error(
        'gridbeam-editor/stores/parts: could not stringify Base64 parts'
      )
    }

    window.location.href =
      window.location.href.split('#')[0] + '#' + encodeURIComponent(partsBase64)
  }
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
