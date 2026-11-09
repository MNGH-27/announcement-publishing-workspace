import type { FC } from "react"
import { Card, EmptyState, Input } from "../../../shared/ui"
import type { IAnnouncement } from "../../../mocks"

interface IAnnouncementSelectProps {
  selected: string | undefined
  setSelected: (value: string) => void
  query: string
  setQuery: (value: string) => void
  filtered: IAnnouncement[]
}

export const AnnouncementSelect:FC<IAnnouncementSelectProps> = ({ selected, setSelected, query, setQuery, filtered }) => {
  return (
    <Card className="max-lg:hidden col-span-2 flex min-h-0 flex-col overflow-hidden max-lg:col-span-1 !h-fit">
      <div className="flex shrink-0 items-center gap-2 px-4 py-4 text-sm">
        <h2 className="font-semibold">Your announcements</h2>
        <span className="text-xs rounded-md bg-slate-100 text-slate-500 pt-0.5 pr-1.5 pb-0.5 pl-1.5">
          3
        </span>
      </div>
      <div className="shrink-0 px-4 pb-3">
        <Input
          id="announcement-search"
          label="Search announcements"
          placeholder="Search announcements…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div tabIndex={0} role="region" aria-label="Announcement list" className="px-2.5">
        {filtered.length ? (
          filtered.map((item) => (
            <button
              className={`w-full text-left flex gap-3 pt-3 pr-3 pb-3 pl-3 border border-transparent border-b-slate-100 rounded-lg items-center transition-colors motion-reduce:transition-none [&:hover]:bg-slate-50 ${selected === item.id ? 'bg-brand-50 border-brand-100 hover:bg-brand-50' : 'hover:bg-slate-50'}`}
              key={item.id}
              onClick={() => setSelected(item.id)}
              aria-pressed={selected === item.id}
            >
              <span className="flex flex-col gap-1.5 [&_strong]:text-xs [&_strong]:font-semibold [&_strong]:leading-snug">
                <strong>{item.title}</strong>
                <span className="text-xs text-slate-500">Not submitted · {item.id}</span>
              </span>
              <span className="ml-auto text-slate-500" aria-hidden="true">
                ›
              </span>
            </button>
          ))
        ) : (
          <EmptyState title="No announcements found">Try a different search.</EmptyState>
        )}
      </div>
      <div className="shrink-0 border-t border-slate-100 px-4 py-3 text-xs text-muted">
        All content is prepared and ready for review.
      </div>
    </Card>
  )
}
