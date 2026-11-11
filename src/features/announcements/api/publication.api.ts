
import { announcementService } from '../../../core/api/announcementService'
import { useAnnouncementStore } from '../../../core/store/useAnnouncementStore'

import { createRequestDeduplicator, notifyRejectedOperations, resolvePublicationOperationId } from '../utils'

const deduplicateRefresh = createRequestDeduplicator<string, void>()
export function refreshOperations(): Promise<void> {
  return deduplicateRefresh('operations', async () => {
    const operations = await announcementService.listOperations()
    const state = useAnnouncementStore.getState()

    notifyRejectedOperations(operations, state.operations)

    state.setOperations(operations)
    state.setRestored(true)
  })
}

export async function checkOperation(operationId: string) {
  const operation = await announcementService.getStatus(operationId)

  if (operation) {
    const state = useAnnouncementStore.getState()
    notifyRejectedOperations([operation], state.operations)
    state.setOperations([operation])
  }

  return operation
}

const deduplicatePublish = createRequestDeduplicator<string, void>()
export function publishAnnouncement(announcementId: string): Promise<void> {
  return deduplicatePublish(announcementId, () => submit(announcementId))
}

async function submit(announcementId: string) {
  if (!useAnnouncementStore.getState().restored) await refreshOperations()

  const state = useAnnouncementStore.getState()

  const operationId = resolvePublicationOperationId(state.operations, state.pending, announcementId)

  if (operationId === null) return

  state.setPending(announcementId, operationId)

  try {
    const operation = await announcementService.publish(announcementId, operationId)
    notifyRejectedOperations([operation], useAnnouncementStore.getState().operations)
    state.setOperations([operation])

  } catch (cause) {
    try {
      const recovered = await checkOperation(operationId)
      if (recovered) return
    } catch {
      /* Keep the ID for a safe retry. */
    }
    throw cause
  }
}
