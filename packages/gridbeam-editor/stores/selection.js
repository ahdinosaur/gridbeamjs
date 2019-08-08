const create = require('./').default

const [useSelectionStore] = create(set => ({
  isSelecting: false,
  startSelection: () =>
    set(state => {
      state.isSelecting = true
    }),
  endSelection: () =>
    set(state => {
      state.isSelecting = false
    }),
  startPoint: { x: 0, y: 0 },
  endPoint: { x: 0, y: 0 },
  setStartPoint: ({ x, y }) =>
    set(state => {
      state.startPoint.x = x
      state.startPoint.y = y
    }),
  setEndPoint: ({ x, y }) =>
    set(state => {
      state.endPoint.x = x
      state.endPoint.y = y
    })
}))

module.exports = useSelectionStore
