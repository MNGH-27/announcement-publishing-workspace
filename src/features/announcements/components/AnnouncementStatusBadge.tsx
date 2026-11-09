import { Badge } from '../../../shared/ui'

export function AnnouncementStatusBadge({ status }: { status: string }) {
  const tone =
    status === 'published'
      ? 'success'
      : status === 'rejected'
        ? 'danger'
        : status === 'processing' || status === 'pending'
          ? 'warning'
          : 'neutral'
  const labels: Record<string, string> = {
    published: 'Published',
    rejected: 'Rejected',
    processing: 'Processing',
    pending: 'Pending',
  }
  return <Badge tone={tone}>{labels[status] ?? status}</Badge>
}
