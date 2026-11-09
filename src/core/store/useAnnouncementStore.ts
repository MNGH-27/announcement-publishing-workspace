import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { encryptedStorage } from '../storage/encryptedStorage'
import type { IAnnouncement, PublicationOperation } from '../../mocks'

interface AnnouncementState {
  restored: boolean
  setRestored: (restored: boolean) => void
  pending: Record<string, string>
  setPending: (announcementId: string, operationId: string) => void
  selected: string | undefined
  announcementList: IAnnouncement[]
  setAnnouncementList: (list: IAnnouncement[]) => void
  operations: PublicationOperation[]
  setOperations: (operations: PublicationOperation[]) => void
  setSelected: (selected: string) => void
}
export const useAnnouncementStore = create<AnnouncementState>()(
  persist(
    (set) => ({
      restored: false,
      setRestored: (restored) => set({ restored }),
      pending: {},
      setPending: (announcementId, operationId) =>
        set((state) => ({ pending: { ...state.pending, [announcementId]: operationId } })),
      selected: undefined,
      announcementList: [],
      setSelected: (selected) => set({ selected }),
      setAnnouncementList: (announcementList) => set({ announcementList }),
      setOperations: (incoming) =>
        set((state) => {
          const merged = new Map(
            state.operations.map((operation) => [operation.operationId, operation]),
          )
          incoming.forEach((operation) => {
            const previous = merged.get(operation.operationId)
            if (!previous || previous.version <= operation.version)
              merged.set(operation.operationId, operation)
          })
          const pending = { ...state.pending }
          for (const operation of merged.values()) {
            if (
              operation.version === 2 &&
              pending[operation.announcementId] === operation.operationId
            )
              delete pending[operation.announcementId]
          }
          return { operations: [...merged.values()], pending }
        }),
      operations: [],
    }),
    {
      name: 'announcement-workspace:preferences',
      storage: createJSONStorage(() => encryptedStorage),
      partialize: (state) => ({ selected: state.selected }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) console.error('Could not restore encrypted preferences.', error)
      },
    },
  ),
)
