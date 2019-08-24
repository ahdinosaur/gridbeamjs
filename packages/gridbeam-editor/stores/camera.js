const create = require('./')

module.exports = {
  controlEnabled: set => true,
  enableControl: set => () => set(state => (state.controlEnabled = true)),
  disableControl: set => () => set(state => (state.controlEnabled = false))
}
