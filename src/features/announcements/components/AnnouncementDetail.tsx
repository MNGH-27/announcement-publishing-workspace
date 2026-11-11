import { type FC } from 'react'
import { Badge, Button, Card, EmptyState } from '../../../shared/ui'
import type { IAnnouncement } from '../../../mocks'

import { useFeedback } from '../../../core/hooks/useFeedback.hooks'
import { useAnnouncementStore } from '../../../core/store/useAnnouncementStore'

import { getAnnouncementStatus, findAnnouncementOperation } from '../utils'
import { checkOperation, publishAnnouncement } from '../api'

interface IAnnouncementDetailProps {
  announcement: IAnnouncement | undefined
}
export const AnnouncementDetail: FC<IAnnouncementDetailProps> = ({ announcement }) => {
  const { isLoading, setIsLoading, setError, clearError } = useFeedback()

  const { restored , pending , operations } = useAnnouncementStore()

  const latestOperation = findAnnouncementOperation(operations, announcement?.id)

  const status = getAnnouncementStatus(operations, pending, announcement?.id)

  const SubmitAnnouncement = async () => {
    if (!announcement || isLoading) return

    setIsLoading(true)
    clearError()

    try {
      await publishAnnouncement(announcement.id)
    } catch (cause) {
      setError(cause)
    } finally {
      setIsLoading(false)
    }
  }

  const checkStatus = async () => {
    const id = (announcement && pending[announcement.id]) ?? latestOperation?.operationId

    if (!id || isLoading) return

    setIsLoading(true)
    clearError()
    
    try {
      const operation = await checkOperation(id)
      if (!operation) setError('Operation is not recorded. Safely retry the existing attempt.')
    } catch (cause) {
      setError(cause)
    } finally {
      setIsLoading(false)
    }
  }

  if (!announcement) {
    return (
      <Card className="col-span-3 flex min-h-0 flex-col overflow-hidden max-lg:col-span-1">
        <EmptyState title="No announcement selected">
          Select an announcement from the list to view its details.
        </EmptyState>
      </Card>
    )
  }

  return (
    <Card className="col-span-3 flex min-h-0 flex-col overflow-hidden max-lg:col-span-1">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 sm:px-6">
        <span className="text-xs font-medium text-slate-500">ANNOUNCEMENT DETAILS</span>
        <Badge
          tone={
            status === 'published'
              ? 'success'
              : status === 'rejected'
                ? 'danger'
                : latestOperation
                  ? 'warning'
                  : 'neutral'
          }
        >
          {status}
        </Badge>
      </div>
      <div tabIndex={0} role="region" aria-label="Announcement content" className="p-4 sm:p-6">
        <h2 className="mt-3 mb-2 text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
          {announcement?.title}
        </h2>
        <p className="text-xs text-slate-500">{announcement?.id}</p>
        <div className="mt-5 mb-3 text-xs font-medium tracking-wider text-muted">
          PREPARED CONTENT
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 sm:p-5">
          {announcement?.body}
        </div>
        <div className="flex gap-2.5 text-slate-400 mt-5 [&_>_span]:text-sm [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-slate-500">
          <span aria-hidden="true">ⓘ</span>
          <p>
            This content is ready to publish. Once submitted, you’ll be able to follow its
            publication status here.
          </p>
        </div>
      </div>
      <div className="mt-auto flex shrink-0 flex-col items-stretch gap-2 border-t border-slate-100 bg-surface p-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>◇ Prepared content · Read only</span>
        {(pending[announcement.id] || latestOperation?.status === 'processing') && (
          <Button variant="secondary" disabled={isLoading} onClick={checkStatus}>
            Check status
          </Button>
        )}
        <Button
          className="min-h-11 w-full sm:w-auto"

          disabled={!restored || isLoading || status === 'published'}
          onClick={SubmitAnnouncement}
        >
          {isLoading
            ? 'Please wait…'
            : status === 'published'
              ? 'Published'
              : pending[announcement.id] || latestOperation?.status === 'processing'
                ? 'Retry same attempt'
                : status === 'rejected'
                  ? 'Start new attempt'
                  : 'Publish announcement ↗'}
        </Button>
      </div>
    </Card>
  )
}
