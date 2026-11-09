import { useEffect, useRef, type ReactNode } from 'react'
import { Content, Header, Sidebar } from '../../shared/layout'

export function Layout({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 640px)')
    const closeOnDesktop = () => {
      if (desktop.matches) menu.current?.close()
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-canvas">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onOpenMenu={() => menu.current?.showModal()} />
        <Content>{children}</Content>
      </div>

      <dialog
        id="mobile-navigation"
        ref={menu}
        aria-label="Navigation menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) menu.current?.close()
        }}
        className="fixed inset-0 m-0 h-dvh max-h-full w-full max-w-full border-0 bg-transparent p-0 backdrop:bg-slate-900/40"
      >
        <div className="relative h-full w-72 max-w-full bg-surface">
          <button
            type="button"
            autoFocus
            aria-label="Close navigation menu"
            onClick={() => menu.current?.close()}
            className="absolute top-5 right-3 grid size-11 place-items-center rounded-lg text-xl text-slate-600 hover:bg-slate-100"
          >
            ×
          </button>
          <Sidebar mobile onNavigate={() => menu.current?.close()} />
        </div>
      </dialog>
    </div>
  )
}
