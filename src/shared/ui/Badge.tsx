import type { ReactNode } from 'react'

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger'
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 pt-1 pr-2 pb-1 pl-2 rounded-md text-xs font-medium whitespace-nowrap [&_>_span]:text-xs ${{ neutral: 'bg-slate-100 text-slate-500', success: 'bg-emerald-50 text-emerald-600', warning: 'bg-amber-50 text-amber-700', danger: 'bg-red-50 text-red-600' }[tone]}`}
    >
      <span aria-hidden="true">●</span> {children}
    </span>
  )
}
