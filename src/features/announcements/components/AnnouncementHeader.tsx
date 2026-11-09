import type { FC } from 'react'
import type { IAnnouncement } from '../../../mocks'
import { ScenarioSelect } from './ScenarioSelect'

interface IAnnouncementHeaderProps {
  selected: string | undefined
  setSelected: (value: string) => void
  announcementList: IAnnouncement[]
}

export const AnnouncementHeader: FC<IAnnouncementHeaderProps> = ({
  selected,
  setSelected,
  announcementList,
}) => {
  return (
    <>
      <div className="mb-4 flex shrink-0 flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <p className="hidden text-xs font-semibold tracking-wider text-muted sm:block">
            YOUR COMMUNICATIONS, IN ONE PLACE
          </p>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight sm:mt-2 sm:text-3xl">
            Announcements
          </h1>
          <p className="text-xs leading-relaxed text-muted sm:text-sm">
            Prepared content. Clear updates. Ready when you are.
          </p>
        </div>
        <ScenarioSelect />
      </div>
      <div className="mb-3 shrink-0 lg:hidden">
        <label htmlFor="selected-announcement" className="sr-only">
          Select announcement
        </label>
        <select
          id="selected-announcement"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-surface px-3 text-base text-slate-700 focus:border-brand-400 sm:text-sm"
        >
          {announcementList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
