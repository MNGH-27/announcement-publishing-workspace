import { Select } from '../../../shared/ui'
import { type FC, useState } from 'react'

import {
  type IAnnouncement,
  ANNOUNCEMENT_SCENARIOS,
  type AnnouncementScenario,
} from '../../../mocks'
import { announcementService } from '../../../core/api/announcementService'

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

const labels: Record<AnnouncementScenario, string> = {
  success: 'Success',
  'explicit-rejection': 'Explicit rejection',
  'lost-response': 'Lost response',
  'status-check-failure': 'Status check failure',
  overlapping: 'Overlapping requests',
  'slow-response': 'Slow response',
}

export function ScenarioSelect() {
  const [scenario, setScenario] = useState(() => announcementService.getScenario())

  return (
    <label
      className="flex min-w-0 items-center gap-2"
      title="Mock scenario applies only to new publication attempts"
    >
      <span className="hidden whitespace-nowrap text-xs text-muted md:inline">Mock scenario</span>
      <Select
        aria-label="Mock scenario for new publications"
        value={scenario}
        onChange={(event) => {
          const value = event.target.value as AnnouncementScenario
          announcementService.setScenario(value)
          setScenario(announcementService.getScenario())
        }}
        className="w-36 sm:w-44"
      >
        {ANNOUNCEMENT_SCENARIOS.map((value) => (
          <option key={value} value={value}>
            {labels[value]}
          </option>
        ))}
      </Select>
    </label>
  )
}
