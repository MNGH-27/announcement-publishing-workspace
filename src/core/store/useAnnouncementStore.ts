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
  setSelected: (selected: string) => void

  announcementList: IAnnouncement[]
  setAnnouncementList: (list: IAnnouncement[]) => void

  operations: PublicationOperation[]
  setOperations: (operations: PublicationOperation[]) => void
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
      setSelected: (selected) => set({ selected }),

      announcementList: [],
      setAnnouncementList: (announcementList) => set({ announcementList }),

      operations: [],
      setOperations: (incoming) =>
        set((state) => {
          //create map dataset with key of operationId
          const merged = new Map(
            state.operations.map((operation) => [operation.operationId, operation]),
          )

          //search in map list for operation
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
