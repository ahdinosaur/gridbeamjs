const produce = require('immer')
const create = require('zustand').default
const { map, mapObjIndexed, mergeAll, nthArg, pipe, prop } = require('ramda')

module.exports = base

//  new store
//  - single zustand store
//  - many "dino" stores
//
//  - name
//  - state,
//  - do: {
//      action: (set) => (...args) => set(state => {
//        state.key = value
//      })
//    }
//  - select: {
//      selector: [
//        name,
//        (...values) => selection
//      ]
//  - react: {
//      reactor: [
//        name,
//        (...values) => action(...args) | null
//      ]
//    }

function base (config) {
  const { state = {}, exec = {}, select = {} } = config

  const storeConfig = (set, get, api) =>
    Object.values(exec).reduce(
      (sofar, [key, executor]) =>
        Object.assign(sofar, { [key]: executor(set, get, api) }),
      state
    )

  const [useStore, storeApi] = create(log(immer(storeConfig)))

  const selectState = mapObjIndexed(pipe(nthArg(1), prop), state)
  const selectExec = mapObjIndexed(pipe(nthArg(1), prop), exec)
  const useSelect = map(useStore, mergeAll([select, selectState, selectExec]))

  return {
    useStore,
    useSelect,
    api: storeApi
  }
}

function log (config) {
  return function (set, get, api) {
    return config(nextSet, get, api)

    function nextSet (args) {
      // console.log('  applying', args)
      set(args)
      console.log('  new state', get())
    }
  }
}

function immer (config) {
  return function (set, get, api) {
    return config(nextSet, get, api)

    function nextSet (fn) {
      set(produce(fn))
    }
  }
}
