import create from 'zustand'

const [useCameraStore] = create(set => ({
  controlEnabled: true,
  enableControl: () => set({ controlEnabled: true }),
  disableControl: () => set({ controlEnabled: false })
}))

export default useCameraStore
