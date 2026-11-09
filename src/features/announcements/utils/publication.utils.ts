import { toast } from 'sonner'
import type { PublicationOperation } from '../../../mocks'

/** Null means the announcement already has a confirmed successful publication. */
export function resolvePublicationOperationId(
  operations: readonly PublicationOperation[],
  pending: Readonly<Record<string, string>>,
  announcementId: string,
  createId: () => string = () => crypto.randomUUID(),
): string | null {
  const history = operations.filter((operation) => operation.announcementId === announcementId)
  if (history.some((operation) => operation.status === 'published')) return null
  return (
    pending[announcementId] ??
    history.find((operation) => operation.status === 'processing')?.operationId ??
    createId()
  )
}

/** Shares an in-flight request per key; completed requests are never cached. */
export function createRequestDeduplicator<Key, Value>() {
  const requests = new Map<Key, Promise<Value>>()
  return (key: Key, request: () => Promise<Value>): Promise<Value> => {
    const existing = requests.get(key)
    if (existing) return existing
    const promise = Promise.resolve()
      .then(request)
      .finally(() => requests.delete(key))
    requests.set(key, promise)
    return promise
  }
}


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
