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
