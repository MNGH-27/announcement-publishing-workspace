import type { ReactNode } from 'react'

export function Sidebar({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean
  onNavigate?: () => void
}) {
  return (
    <aside
      aria-label="Workspace sidebar"
      className={`flex h-full shrink-0 flex-col border-r border-slate-200 bg-surface px-5 py-6 ${mobile ? 'w-72 max-w-full' : 'hidden w-20 sm:flex sm:px-3 xl:w-60 xl:px-5'}`}
    >
      <a
        href="#main"
        onClick={onNavigate}
        aria-label="Announce workspace"
        className={`mb-8 flex items-center gap-2 text-xl font-bold tracking-tight ${mobile ? '' : 'justify-center xl:justify-start'}`}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-500 text-xl text-white">
          a↗
        </span>
        <span className={mobile ? '' : 'hidden xl:inline'}>
          announce<span className="text-brand-500">.</span>
        </span>
      </a>
      <p
        className={`mb-3 px-3 text-xs font-semibold tracking-wider text-muted ${mobile ? '' : 'hidden xl:block'}`}
      >
        WORKSPACE
      </p>
      <nav aria-label="Main navigation">
        <a
          href="#main"
          onClick={onNavigate}
          aria-current="page"
          aria-label="Announcements"
          className={`flex min-h-11 items-center gap-3 rounded-xl bg-brand-50 px-3 text-sm font-semibold text-brand-600 ${mobile ? '' : 'justify-center xl:justify-start'}`}
        >
          <span aria-hidden="true" className="text-xl">
            ▤
          </span>
          <span className={mobile ? '' : 'hidden xl:inline'}>Announcements</span>
          <span
            className={`ml-auto rounded-md bg-brand-100 px-2 py-0.5 text-xs ${mobile ? '' : 'hidden xl:inline'}`}
          >
            3
          </span>
        </a>
      </nav>
      <div
        className={`mt-auto flex items-center gap-3 border-t border-slate-100 pt-5 ${mobile ? '' : 'justify-center xl:justify-start'}`}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
          CT
        </span>
        <div className={mobile ? 'min-w-0' : 'hidden min-w-0 xl:block'}>
          <strong className="block text-xs">Communications team</strong>
          <small className="mt-1 block text-xs text-muted">Publishing workspace</small>
        </div>
      </div>
    </aside>
  )
}

export function Header({ onOpenMenu, actions }: { onOpenMenu: () => void; actions?: ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-surface px-3 text-xs text-muted sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          className="grid size-11 shrink-0 place-items-center rounded-lg text-xl text-slate-700 hover:bg-brand-50 sm:hidden"
        >
          ☰
        </button>
        <span>
          <span className="hidden sm:inline">
            Workspace <span className="px-3 text-slate-300">/</span>
          </span>
          <strong className="font-medium text-slate-700">Announcements</strong>
        </span>
      </div>
      <div className="ml-auto flex min-w-0 items-center gap-3">
        {actions}
        <span className="hidden items-center gap-2 lg:flex">
          <span className="size-1.5 rounded-full bg-emerald-600" />
          Team workspace
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-brand-50 font-semibold text-brand-600">
          CT
        </span>
      </div>
    </header>
  )
}

export function Content({ children }: { children: ReactNode }) {
  return (
    <main
      id="main"
      tabIndex={0}
      aria-label="Workspace content"
      className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col p-3 sm:p-5 lg:px-8 lg:py-6">
        {children}
      </div>
    </main>
  )
}
