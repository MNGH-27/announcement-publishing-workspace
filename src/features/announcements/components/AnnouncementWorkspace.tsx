import { useState } from 'react'
import { Badge, Button, Card, EmptyState, Input } from '../../../shared/ui'
// Static design preview; publication integration is intentionally pending.
const announcements = [
  {
    id: 'ann-101',
    title: 'Service Maintenance Notice',
    category: 'Service update',
    icon: '↻',
    body: 'Our online services will be briefly unavailable during the scheduled maintenance window. We appreciate your patience while we improve reliability.',
  },
  {
    id: 'ann-102',
    title: 'New Feature Launch',
    category: 'Product news',
    icon: '✧',
    body: 'The new workspace search is ready. Customers can find their saved items using the updated search experience in their account.',
  },
  {
    id: 'ann-103',
    title: 'Support Hours Update',
    category: 'Customer support',
    icon: '◷',
    body: 'Our support team has updated its availability. Please consult the support page for the latest hours before contacting the team.',
  },
]
export function AnnouncementWorkspace() {
  const [selected, setSelected] = useState('ann-101')
  const [query, setQuery] = useState('')
  const announcement = announcements.find((item) => item.id === selected)!
  const filtered = announcements.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <div className="flex min-h-screen max-sm:block">
      <aside className="w-60 shrink-0 bg-white border-r border-r-slate-200 pt-8 pr-5 pb-5 pl-5 flex flex-col max-xl:w-48 max-xl:px-3 max-lg:w-16 max-lg:px-3 max-sm:w-full max-sm:h-16 max-sm:pt-3 max-sm:flex-row max-sm:border-r-0 max-sm:border-b border-b-slate-200 max-sm:items-center">
        <a
          href="#main"
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tight mt-0 mr-2 mb-14 ml-2 max-lg:mt-0 max-lg:[&_>_span:last-child]:hidden max-sm:text-xl max-sm:m-0 max-sm:[&_>_span:last-child]:inline"
        >
          <span className="bg-brand-500 text-white rounded-xl pt-0.5 pr-1.5 pb-0.5 pl-1.5 text-xl">
            a↗
          </span>
          <span>
            announce<span className="text-brand-500">.</span>
          </span>
        </a>
        <p className="text-slate-500 text-xs font-semibold tracking-wider mt-0 mr-3.5 mb-3 ml-3.5 max-lg:hidden">
          WORKSPACE
        </p>
        <a
          className="flex items-center gap-2.5 bg-brand-50 text-brand-600 p-3 rounded-lg text-xs font-semibold [&_>_span:first-child]:text-xl max-lg:[&_>_span:not(:first-child)]:hidden max-lg:justify-center max-lg:p-2 max-sm:ml-auto"
          href="#main"
          aria-current="page"
        >
          <span aria-hidden="true">▤</span>
          <span>Announcements</span>
          <span className="ml-auto bg-brand-100 pt-0 pr-1.5 pb-0 pl-1.5 rounded-md text-xs">3</span>
        </a>
        <div className="mt-auto border-t border-t-slate-100 pt-6 flex items-center gap-2.5 [&_strong]:text-xs [&_strong]:block [&_small]:text-xs [&_small]:text-slate-500 [&_small]:block [&_small]:mt-0.5 max-lg:[&_>_div]:hidden max-lg:justify-center max-sm:hidden">
          <span className="grid place-items-center bg-brand-50 text-slate-500 w-8 h-8 rounded-full text-xs font-bold">
            CT
          </span>
          <div>
            <strong>Communications team</strong>
            <small>Publishing workspace</small>
          </div>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="h-20 border-b border-b-slate-200 pt-0 pr-10 pb-0 pl-10 flex items-center justify-between bg-white/70 text-xs text-slate-500 [&_strong]:text-slate-600 [&_strong]:font-medium max-xl:px-6 max-sm:h-14 max-sm:px-5">
          <span>
            Workspace <span className="pt-0 pr-3.5 pb-0 pl-3.5 text-slate-400">/</span>
            <strong>Announcements</strong>
          </span>
          <span className="flex items-center gap-2 text-xs max-sm:hidden">
            <i className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400" /> Team workspace
          </span>
        </header>
        <main
          id="main"
          className="max-w-screen-2xl m-auto pt-11 pr-10 pb-5 pl-10 2xl:pt-14 max-xl:pt-7 max-sm:pt-6 "
        >
          <div className="flex items-center justify-between mb-7 gap-4 [&_p:last-child]:text-xs [&_p:last-child]:text-slate-500 [&_p:last-child]:mt-2 max-sm:items-start max-sm:[&_.eyebrow]:text-xs max-sm:[&_.eyebrow]:tracking-wider max-sm:[&_p:last-child]:text-xs max-sm:[&_p:last-child]:leading-relaxed">
            <div>
              <p className="text-xs tracking-wider font-semibold text-slate-500">
                YOUR COMMUNICATIONS, IN ONE PLACE
              </p>
              <h1 className="text-3xl tracking-tight font-semibold mt-2 mr-0 mb-2 ml-0 max-sm:text-3xl">
                Announcements
              </h1>
              <p>Prepared content. Clear updates. Ready when you are.</p>
            </div>
            <span className="text-xs text-slate-500 border border-slate-200 pt-1.5 pr-2.5 pb-1.5 pl-2.5 rounded-full whitespace-nowrap max-sm:text-xs max-sm:pt-1 ">
              Design preview
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-7 max-lg:gap-2.5 max-sm:mb-4">
            {[
              {
                title: 'Total announcements',
                value: '03',
                icon: '▤',
                tone: 'bg-brand-50 text-brand-500',
                note: 'In your workspace',
              },
              {
                title: 'Ready to publish',
                value: '03',
                icon: '◷',
                tone: 'bg-amber-50 text-amber-700',
                note: 'Prepared and ready',
              },
              {
                title: 'Published',
                value: '00',
                icon: '✓',
                tone: 'bg-emerald-50 text-slate-500',
                note: 'No publications yet',
              },
            ].map((stat) => (
              <Card
                className="p-5 flex items-center gap-3 relative min-h-28 [&_p]:text-slate-500 [&_p]:text-xs [&_p]:mt-0 mr-0 mb-1 ml-0 [&_strong]:text-3xl [&_strong]:font-semibold [&_strong]:tracking-tight max-xl:p-4 max-lg:min-h-20 max-sm:p-3 max-sm:[&_p]:text-xs max-sm:[&_strong]:text-2xl"
                key={stat.title}
              >
                <span
                  className={`w-9 h-9 rounded-xl grid place-items-center text-xl self-start max-lg:hidden ${stat.tone}`}
                >
                  {stat.icon}
                </span>
                <div>
                  <p>{stat.title}</p>
                  <strong>{stat.value}</strong>
                </div>
                <span className="absolute bottom-3.5 right-4 text-xs text-slate-500 max-lg:hidden">
                  {stat.note}
                </span>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-5 items-stretch 2xl:min-h-96 max-xl:grid-cols-5 max-xl:gap-4 max-lg:grid-cols-1">
            <Card className="col-span-2 flex flex-col overflow-hidden max-lg:col-span-1">
              <div className="pt-5 pr-5 pb-4 pl-5 flex gap-2 items-center [&_h2]:text-sm">
                <h2 className="font-semibold">Your announcements</h2>
                <span className="text-xs rounded-md bg-slate-100 text-slate-500 pt-0.5 pr-1.5 pb-0.5 pl-1.5">
                  3
                </span>
              </div>
              <div className="pt-0 pr-5 pb-4 pl-5">
                <Input
                  id="announcement-search"
                  label="Search announcements"
                  placeholder="Search announcements…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="pt-0 pr-2.5 pb-0 pl-2.5">
                {filtered.length ? (
                  filtered.map((item) => (
                    <button
                      className={`w-full text-left flex gap-3 pt-5 pr-3 pb-5 pl-3 border border-transparent border-b-slate-100 rounded-lg items-center transition-colors motion-reduce:transition-none [&:hover]:bg-slate-50 ${selected === item.id ? 'bg-brand-50 border-brand-100 hover:bg-brand-50' : 'hover:bg-slate-50'}`}
                      key={item.id}
                      onClick={() => setSelected(item.id)}
                      aria-pressed={selected === item.id}
                    >
                      <span
                        className={`w-8 h-8 grid place-items-center text-slate-500 bg-slate-100 border border-slate-200 rounded-lg text-xl shrink-0 max-xl:hidden max-lg:grid ${selected === item.id ? 'bg-brand-100 text-brand-500 border-brand-100' : ''}`}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="flex flex-col gap-1.5 [&_strong]:text-xs [&_strong]:font-semibold [&_strong]:leading-snug">
                        <span className="text-xs text-slate-500">{item.category}</span>
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
              <div className="mt-auto pt-6 pr-5 pb-5 pl-5 text-xs text-slate-500">
                All content is prepared and ready for review.
              </div>
            </Card>
            <Card className="col-span-3 flex flex-col overflow-hidden max-lg:col-span-1">
              <div className="pt-5 pr-6 pb-5 pl-6 flex justify-between items-center gap-2 border-b border-b-slate-100 max-sm:px-4">
                <span className="text-xs tracking-wider font-semibold text-slate-500">
                  ANNOUNCEMENT DETAILS
                </span>
                <Badge>Not submitted</Badge>
              </div>
              <div className="pt-7 pr-6 pb-7 pl-6 [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:mt-3.5 mr-0 mb-1.5 ml-0 [&_h2]:leading-snug max-lg:p-6 max-sm:pt-6 max-sm:[&_h2]:text-2xl">
                <span className="text-brand-500 bg-brand-50 border border-brand-100 rounded-md pt-1 pr-1.5 pb-1 pl-1.5 text-xs">
                  {announcement.category}
                </span>
                <h2 className="font-semibold">{announcement.title}</h2>
                <p className="text-xs text-slate-500">{announcement.id}</p>
                <div className="text-xs text-slate-500 tracking-wider mt-7 mr-0 mb-3 ml-0">
                  PREPARED CONTENT
                </div>
                <div className="p-5 border border-slate-100 rounded-lg bg-slate-50 text-slate-500 text-sm leading-relaxed max-sm:p-4">
                  {announcement.body}
                </div>
                <div className="flex gap-2.5 text-slate-400 mt-5 [&_>_span]:text-sm [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-slate-500">
                  <span aria-hidden="true">ⓘ</span>
                  <p>
                    This content is ready to publish. Once submitted, you’ll be able to follow its
                    publication status here.
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-5 pr-6 pb-5 pl-6 border-t border-t-slate-100 flex justify-between items-center gap-3 [&_>_span]:text-xs [&_>_span]:text-slate-500 max-xl:flex-wrap max-sm:pt-4 ">
                <span>◇ Prepared content · Read only</span>
                <Button disabled title="Available after service integration">
                  Publish announcement ↗
                </Button>
              </div>
            </Card>
          </div>
          <footer className="flex items-center gap-2 text-xs text-slate-500 pt-7 pr-0.5 pb-7 pl-0.5 [&_>_span:last-child]:ml-auto max-sm:[&_>_span:last-child]:hidden">
            <i className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400" /> A little clarity
            goes a long way.
            <span>Announcement workspace</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
