import type { PublicationOperation } from '../../../mocks'
import { findAnnouncementOperation } from './announcement.utils'

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
