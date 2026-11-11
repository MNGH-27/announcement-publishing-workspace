import type { ReactNode } from 'react'
import { A11y, Autoplay, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'


import { Card } from '../../../shared/ui'

export interface IAnnouncementSummaryCountsProps {
  total: number
  ready: number
  published: number
}

export function AnnouncementSummary({ total, ready, published }: IAnnouncementSummaryCountsProps) {
  const items = [
    { title: 'Total announcements', value: total, icon: '▤', tone: 'brand' as const },
    { title: 'Ready to publish', value: ready, icon: '◷', tone: 'warning' as const },
    { title: 'Published', value: published, icon: '✓', tone: 'success' as const },
  ]
  return (
    <section aria-label="Announcement summary" className="mb-4 min-w-0">
      <Swiper
        modules={[A11y, Autoplay, Keyboard, Pagination]}
        slidesPerView={1}
        centeredSlides
        centerInsufficientSlides
        spaceBetween={12}
        watchOverflow
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        rewind
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true }}
        a11y={{
          containerMessage: 'Announcement summary',
          slideLabelMessage: '{{index}} of {{slidesLength}}',
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 16,
            allowTouchMove: false,
            autoplay: { enabled: false },
            pagination: { enabled: false },
          },
        }}
        className="w-full pb-7! lg:pb-1! [&_.swiper-pagination]:bottom-0! [&_.swiper-pagination-bullet]:bg-brand-500! [&_.swiper-pagination-bullet]:size-2 [&_.swiper-pagination]:lg:hidden [&_.swiper-slide]:h-auto! [&_.swiper-slide>div]:h-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.title}>
            <AnnouncementSummaryCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}


interface IAnnouncementSummaryCardProps {
  title: string
  value: number
  icon: ReactNode
  tone: 'brand' | 'warning' | 'success'
}

const tones = {
  brand: 'bg-brand-50 text-brand-500',
  warning: 'bg-amber-50 text-amber-700',
  success: 'bg-emerald-50 text-emerald-600',
}

export function AnnouncementSummaryCard({
  title,
  value,
  icon,
  tone,
}: IAnnouncementSummaryCardProps) {
  return (
    <Card className="flex min-h-28 items-center gap-3 p-4 xl:gap-4 xl:p-5">
      <span
        aria-hidden="true"
        className={`grid size-10 shrink-0 place-items-center rounded-xl text-xl ${tones[tone]}`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs leading-relaxed text-muted xl:text-sm">{title}</p>
        <strong className="mt-1 block text-2xl xl:text-3xl font-semibold tabular-nums text-ink">
          {String(value).padStart(2, '0')}
        </strong>
      </div>
    </Card>
  )
}
