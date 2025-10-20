
import { useRef, useState, useEffect } from 'react'

type Project = {
  id: number
  title: string
  blurb: string
  image: string
  cta: { label: string; href: string }
}

const projects: Project[] = [
  {
    id: 1,
    title: 'An app for anything',
    blurb:
      'Make your product feel fast and delightful with modern UI and thoughtful UX. We ship to app stores and the web.',
    image: '/images/TECHNOVA3.png',
    cta: { label: 'Explore case study', href: '#case-1' },
  },
  {
    id: 2,
    title: 'Tap, talk, write',
    blurb:
      'Voice, touch, or pen—your users choose. We craft multimodal experiences that work the way people do.',
    image: '/images/NOVATECH.png',
    cta: { label: 'Learn more', href: '#case-2' },
  },
  {
    id: 3,
    title: 'Super. Speed',
    blurb:
      'Performance-focused builds that scale—from prototype to millions of users with confidence.',
    image: '/images/Technova1.png',
    cta: { label: 'Explore performance work', href: '#case-3' },
  },
  {
    id: 4,
    title: 'Payments that work',
    blurb:
      'Seamless integrations (e.g., M-Pesa) with reliable reconciliation and clear reporting dashboards.',
    image: '/images/MPESA.png',
    cta: { label: 'See payments project', href: '#case-4' },
  },
]

const RecentProjects = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)

  const scrollTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const item = el.children[i] as HTMLElement
    if (!item) return
    el.scrollTo({ left: item.offsetLeft - 16, behavior: 'smooth' })
    setIndex(i)
  }

  const next = () => {
    const newIndex = Math.min(index + 1, projects.length - 1)
    scrollTo(newIndex)
  }
  
  const prev = () => {
    const newIndex = Math.max(index - 1, 0)
    scrollTo(newIndex)
  }

  useEffect(() => { scrollTo(index) }, [index])

  const progress = ((index + 1) / projects.length) * 100

  return (
    <section className="w-full py-16">
      <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[3fr,4fr] items-start">
          {/* Left copy */}
          <div className="order-2 lg:order-1 pr-0 lg:pr-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight mb-6">
              The best of our recent work
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 leading-relaxed max-w-none mb-4">
              No matter your goals, we craft fast, secure, and beautiful products—
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 leading-relaxed max-w-none">
              websites, apps, and platforms—that help your business grow.
            </p>
          </div>

          {/* Slider viewport */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div
                ref={trackRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
                style={{ scrollbarWidth: 'none' }}
              >
                {projects.map((p) => (
                  <article
                    key={p.id}
                    className="min-w-[320px] sm:min-w-[360px] md:min-w-[400px] lg:min-w-[440px] snap-start rounded-3xl bg-white shadow-sm border border-black/10 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="rounded-2xl overflow-hidden ring-1 ring-black/5">
                        <div
                          className="aspect-[4/3] bg-cover bg-center"
                          style={{ backgroundImage: `url('${p.image}')` }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <h3 className="text-lg font-semibold text-neutral-900">{p.title}</h3>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{p.blurb}</p>
                      <div className="mt-4">
                        <a
                          href={p.cta.href}
                          className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          {p.cta.label}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* bottom controls within viewport area */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    disabled={index === 0}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    disabled={index === projects.length - 1}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div className="relative h-1 bg-neutral-200 rounded-full w-40 sm:w-56 md:w-72">
                  <div className="absolute left-0 top-0 h-1 bg-neutral-900 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecentProjects
