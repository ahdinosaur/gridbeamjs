import produce from 'immer'
import create from 'zustand'

export default base

function base (config) {
  return create(log(immer(config)))
}

function log (config) {
  return function (set, get, api) {
    return config(nextSet, get, api)

    function nextSet (args) {
      console.log('  applying', args)
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
