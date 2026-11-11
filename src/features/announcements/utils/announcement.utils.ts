import type { IAnnouncement, PublicationOperation } from '../../../mocks'
import type { IAnnouncementSummaryCountsProps } from '../components/AnnouncementSummary'

/** Returns the newest attempt without changing the source array.
 * For equal timestamps the later array entry wins duplicate snapshots
 * of the same operation prefer the higher version.
 */
export function findAnnouncementOperation(
  operations: readonly PublicationOperation[],
  announcementId: string | undefined,
): PublicationOperation | undefined {
  if (!announcementId) return undefined

  return operations.reduce<PublicationOperation | undefined>((latest, operation) => {
    if (operation.announcementId !== announcementId) return latest

    if (!latest) return operation

    if (operation.operationId === latest.operationId) {
      return operation.version >= latest.version ? operation : latest
    }

    return Date.parse(operation.createdAt) >= Date.parse(latest.createdAt) ? operation : latest
  }, undefined)

}

export function getAnnouncementStatus(
  operations: readonly PublicationOperation[],
  pending: Readonly<Record<string, string>>,
  announcementId: string | undefined,
) {
  const latest = findAnnouncementOperation(operations, announcementId)

  const pendingId = announcementId ? pending[announcementId] : undefined

  if (pendingId && pendingId !== latest?.operationId) return 'pending'

  return latest?.status ?? (pendingId ? 'pending' : 'Not submitted')
}

/** Counts announcements, not attempts. Only unsubmitted or rejected items are ready. */
export function getAnnouncementSummary(
  announcements: readonly IAnnouncement[],
  operations: readonly PublicationOperation[],
  pending: Readonly<Record<string, string>> = {},
): IAnnouncementSummaryCountsProps {
  const published = new Set<string>()
  const processing = new Set<string>()
  // Prefer newer snapshots when an operation appears more than once.
  const snapshots = new Map<string, PublicationOperation>()
  for (const operation of operations) {
    const previous = snapshots.get(operation.operationId)
    if (!previous || operation.version > previous.version)
      snapshots.set(operation.operationId, operation)
  }
  for (const operation of snapshots.values()) {
    if (operation.status === 'published') published.add(operation.announcementId)
    if (operation.status === 'processing') processing.add(operation.announcementId)
  }
  const counts = { total: 0, ready: 0, published: 0 }
  for (const id of new Set(announcements.map((announcement) => announcement.id))) {
    counts.total += 1
    if (published.has(id)) counts.published += 1
    else if (!processing.has(id) && !pending[id]) counts.ready += 1
  }
  return counts
}
