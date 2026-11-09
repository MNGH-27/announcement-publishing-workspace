import { AnnouncementSummary } from './AnnouncementSummary'
import { useEffect, useState } from 'react'
import { Card, EmptyState, Input } from '../../../shared/ui'
import { announcementService } from '../../../shared/api/announcementService'
import { type IAnnouncement } from '../../../mocks'
import { AnnouncementDetail } from './AnnouncementDetail'
import { AnnouncementHeader } from './AnnouncementHeader'
import { AnnouncementSelect } from './AnnouncementSelect'

export function AnnouncementWorkspace() {
  const [selected, setSelected] = useState<string | undefined>()
  const [query, setQuery] = useState('')
  const [announcementList, setAnnouncementList] = useState<IAnnouncement[]>([])

  useEffect(() => {
    // Simulate fetching announcements from the service
    const fetchAnnouncements = async () => {
      const data = await announcementService.getAnnouncements()
      setAnnouncementList(data)
    }
    fetchAnnouncements()
  }, [])

  const announcement = announcementList.find((item) => item.id === selected)
  const filtered = announcementList.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  )

  console.log(announcement)

  return (
    <>
      <AnnouncementHeader
        selected={selected}
        setSelected={setSelected}
        announcementList={announcementList}
      />

      <AnnouncementSummary
        total={announcementList.length}
        ready={announcementList.length}
        published={0}
      />

      <div className="grid grid-cols-5 items-stretch gap-4 max-lg:grid-cols-1">
        <AnnouncementSelect
          selected={selected}
          setSelected={setSelected}
          query={query}
          setQuery={setQuery}
          filtered={filtered}
        />
        <AnnouncementDetail announcement={announcement} />
      </div>

      <footer className="flex shrink-0 items-center gap-2 py-3 text-xs text-slate-500 max-lg:hidden [&>span:last-child]:ml-auto">
        <i className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400" /> A little clarity goes a
        long way.
        <span>Announcement workspace</span>
      </footer>
    </>
  )
}
