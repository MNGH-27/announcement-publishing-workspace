import { getAnnouncementSummary } from '../utils'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useFeedback } from '../../../core/hooks/useFeedback.hooks'
import { useAnnouncementStore } from '../../../core/store/useAnnouncementStore'
import { announcementService } from '../../../core/api/announcementService'

import { LoadingState, ErrorState, Button } from '../../../shared/ui'

import { AnnouncementDetail } from './AnnouncementDetail'
import { AnnouncementHeader } from './AnnouncementHeader'
import { AnnouncementSelect } from './AnnouncementSelect'
import { AnnouncementSummary } from './AnnouncementSummary'

import { refreshOperations } from '../api'

export function AnnouncementWorkspace() {
  const [operationsError, setOperationsError] = useState('')

  const { selected, announcementList, operations, pending, setSelected, setAnnouncementList } =
    useAnnouncementStore()

  const { isLoading, isError, error, setIsLoading, setError, clearError } = useFeedback()

  const restored = useRef(false)
  const checking = useRef(false)

  const refreshStatus = useCallback(async () => {
    //check if there is ongoing request
    if (checking.current) return
    checking.current = true

    try {
      await refreshOperations()

      restored.current = true
      setOperationsError('')
    } catch {
      setOperationsError('Could not update publication status. Existing results are preserved.')
    } finally {
      checking.current = false
    }
  }, [])

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true)
    clearError()

    try {
      const announcements = await announcementService.getAnnouncements()
      setAnnouncementList(announcements)
    } catch (cause) {
      setError(cause)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, clearError, setError, setAnnouncementList])

  //Loading data of announcements
  useEffect(() => {
    fetchDataHandler()
  }, [fetchDataHandler])

  //loading data of operations with interval - 1500ms
  useEffect(() => {
    refreshStatus()
    const timer = window.setInterval(() => {
      const { operations, pending } = useAnnouncementStore.getState()
      if (
        !restored.current ||
        Object.keys(pending).length ||
        operations.some((item) => item.status === 'processing')
      ) {
        refreshStatus()
      }
    }, 1500)
    return () => window.clearInterval(timer)
  }, [refreshStatus])

  const summary = getAnnouncementSummary(announcementList, operations, pending)

  const announcement = announcementList.find((item) => item.id === selected)

  if (isLoading && !announcementList.length) return <LoadingState />
  if (isError) return <ErrorState message={error?.message} onRetry={fetchDataHandler} />

  return (
    <>
      <div className="mb-3 flex justify-end">
        <Button
          variant="secondary"
          title="Clear all simulated publications and restore the default scenario"
          onClick={() => {
            announcementService.reset()
            window.location.reload()
          }}
        >
          Reset publications
        </Button>
      </div>

      {operationsError && (
        <div className="mb-4">
          <ErrorState message={operationsError} onRetry={refreshStatus} />
        </div>
      )}

      <AnnouncementHeader
        selected={selected}
        setSelected={setSelected}
        announcementList={announcementList}
      />

      <AnnouncementSummary {...summary} />

      <div className="grid grid-cols-5 items-stretch gap-4 max-lg:grid-cols-1">
        <AnnouncementSelect />
        <AnnouncementDetail key={announcement?.id} announcement={announcement} />
      </div>

      <footer className="flex shrink-0 items-center gap-2 py-3 text-xs text-slate-500 max-lg:hidden [&>span:last-child]:ml-auto">
        <i className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400" /> A little clarity goes a
        long way.
        <span>Announcement workspace</span>
      </footer>
    </>
  )
}
