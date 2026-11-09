import type { ReactNode } from 'react'
import { Button } from './Button'

export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-40 flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <span
        aria-hidden="true"
        className="size-8 animate-spin rounded-full border-2 border-brand-100 border-t-brand-500 motion-reduce:animate-none"
      />
      <p className="text-sm text-muted">{message}</p>
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
  retrying = false,
}: {
  title?: string
  message?: string
  onRetry?: () => void
  retrying?: boolean
}) {
  return (
    <div
      role="alert"
      className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 p-6 text-center"
    >
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-full bg-red-100 text-xl font-semibold text-red-600"
      >
        !
      </span>
      <div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} disabled={retrying}>
          {retrying ? 'Retrying…' : 'Try again'}
        </Button>
      )}
    </div>
  )
}

export function EmptyState({
  title = 'Nothing here yet',
  children = 'There are no items to display.',
  action,
}: {
  title?: string
  children?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 p-6 text-center">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-xl bg-slate-100 text-xl text-slate-500"
      >
        ▤
      </span>
      <div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <div className="mt-1 max-w-sm text-sm leading-relaxed text-muted">{children}</div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
