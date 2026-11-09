import { useState } from 'react'
import { announcementService } from '../../../core/api/announcementService'
import { ANNOUNCEMENT_SCENARIOS, type AnnouncementScenario } from '../../../mocks'

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
      <select
        aria-label="Mock scenario for new publications"
        value={scenario}
        onChange={(event) => {
          const value = event.target.value as AnnouncementScenario
          announcementService.setScenario(value)
          setScenario(announcementService.getScenario())
        }}
        className="min-h-10 w-36 min-w-0 rounded-lg border border-slate-200 bg-surface px-2 text-xs text-slate-700 focus:border-brand-400 sm:w-44"
      >
        {ANNOUNCEMENT_SCENARIOS.map((value) => (
          <option key={value} value={value}>
            {labels[value]}
          </option>
        ))}
      </select>
    </label>
  )
}
