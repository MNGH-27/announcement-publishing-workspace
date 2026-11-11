import type { SelectHTMLAttributes } from 'react'

export function Select({
  className = '',
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`min-h-10 min-w-0 rounded-lg border border-slate-200 bg-surface px-2 text-xs text-slate-700 focus:border-brand-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
