import type { IAnnouncement, PublicationOperation } from '../../../mocks'

import type { AnnouncementSummaryCountsType } from '../components/AnnouncementSummary'

/** Counts announcements, not attempts. Only unsubmitted or rejected items are ready. */
export function getAnnouncementSummary(
  announcements: readonly IAnnouncement[],
  operations: readonly PublicationOperation[],
  pending: Readonly<Record<string, string>> = {},
): AnnouncementSummaryCountsType {
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
