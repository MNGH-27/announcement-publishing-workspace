import { toast } from 'sonner'
import type { PublicationOperation } from '../../../mocks'

export function notifyRejectedOperations(
  incoming: readonly PublicationOperation[],
  previous: readonly PublicationOperation[],
) {
  for (const operation of incoming) {
    if (operation.status !== 'rejected') continue
    if (
      previous.some(
        (item) => item.operationId === operation.operationId && item.status === 'rejected',
      )
    )
      continue
    toast.error('Publication rejected', {
      id: `rejected:${operation.operationId}`,
      description: operation.reason,
      duration: 6000,
    })
  }
}
