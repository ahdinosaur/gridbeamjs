import produce from 'immer'
import create from 'zustand'

export default base

//  new store
//  - single zustand store
//  - many "dino" stores
//
//  - name
//  - actions: {
//      action: (set) => (...args) => set(state => {
//        state.key = value
//      })
//    }
//  - selectors: {
//      select: [
//        name,
//        (...values) => selection
//      ]
//  - effects: {
//      react: [
//        name,
//        (...values) => action(...args) | null
//      ]
//    }

function dino (config) {
  return function nextConfig(set, get, api) {
    const {
      actions,
      selectors,
      effects
    } = config

    var store = [
    ]

    forEach(actions, (action, name) => {
      store.actions = 
    })
    store.actions

    return store


    var connectedSelectors = mapValues(selectors, ([...deps, select], key) => (state) => {
      var depValues = map(deps, pipe(prop, useStore)) // name => useStore(prop(name))
    })
  }
}

function dino (configs) {
  var store = {}
  configs.forEach(config => {
    const {
      name,
      actions,
      selectors,
      effects
    } = config

    store[name] = create(actions)
    forEach((select, name) => {
      const [...args, handler] = select

    }, selectors)
    reactors[name] = 
    store[name][2].subscribe(

    ([...values(actions), ...values(selectors), ...values(effects)]).forEach(handler => handler(set, get, api))
      
    })
    var path = [name, type, name]
  })
  return create(log(immer(config)))

  function config(set, get, api) {
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
