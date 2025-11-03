
import { useRef, useState, useEffect, useCallback } from 'react'

type Project = {
  id: number
  title: string
  blurb: string
  image: string
  cta: { label: string; href: string }
  techStack: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Brand Decor Interior',
    blurb:
      'Modern interior design platform with responsive design, showcasing beautiful collections and seamless user experience across all devices.',
    image: '/images/brand decor interior.png',
    cta: { label: 'Explore case study', href: '#case-1' },
    techStack: ['Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: 2,
    title: 'Healthcare & Wellness Platform',
    blurb:
      'Professional healthcare and wellness services platform with mental health support, outpatient services, and wellness programs.',
    image: '/images/extern .png',
    cta: { label: 'View healthcare project', href: '#case-2' },
    techStack: ['Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'Gems of Insight Classes',
    blurb:
      'Educational platform offering natural treatments and insight classes with interactive learning features and comprehensive course management.',
    image: '/images/gems.png',
    cta: { label: 'Explore education platform', href: '#case-3' },
    techStack: ['Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'Empower Ministry Platform',
    blurb:
      'Digital portfolio support system with contact management, empowering ministries with modern web presence and communication tools.',
    image: '/images/rpl system.png',
    cta: { label: 'Learn more', href: '#case-4' },
    techStack: ['Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: 5,
    title: 'Super. Speed',
    blurb:
      'Performance-focused builds that scale—from prototype to millions of users with confidence.',
    image: '/images/Technova1.png',
    cta: { label: 'Explore performance work', href: '#case-5' },
    techStack: ['Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
]

const RecentProjects = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Render only original projects

  const getCardStep = useCallback(() => {
    const el = trackRef.current
    if (!el) return 0
    const first = el.querySelector<HTMLElement>('article')
    if (!first) return 0
    const cs = getComputedStyle(el)
    const gapPx = cs.gap || '0px'
    const gap = parseFloat(gapPx)
    return first.offsetWidth + (isNaN(gap) ? 0 : gap)
  }, [])

  const smoothScrollTo = useCallback((position: number) => {
    const el = trackRef.current
    if (!el) return
    
    el.scrollTo({ left: position, behavior: 'smooth' })
  }, [])

  const scrollTo = useCallback((i: number) => {
    const el = trackRef.current
    if (!el) return
    
    const step = getCardStep()
    const targetPosition = i * step
    
    smoothScrollTo(targetPosition)
    setIndex(i % projects.length)
  }, [getCardStep, smoothScrollTo])

  const next = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    
    const newIndex = (index + 1) % projects.length
    scrollTo(newIndex)
  }, [index, scrollTo])
  
  const prev = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    
    const newIndex = (index - 1 + projects.length) % projects.length
    scrollTo(newIndex)
  }, [index, scrollTo])

  // Enhanced auto-play with continuous smooth scrolling
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      prev()
    }, 3000) // Advance every 3 seconds
    
    return () => clearInterval(interval)
  }, [prev, isAutoPlaying])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const progress = ((index + 1) / projects.length) * 100

  return (
    <section className="w-full py-16">
      <div className="px-4 md:px-6 lg:px-8 w-full">
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
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  scrollBehavior: 'smooth',
                  transition: 'scroll-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {projects.map((p: Project, projectIndex: number) => (
                  <article
                    key={`${p.id}-${projectIndex}`}
                    className="flex-shrink-0 w-[calc(100%-0px)] sm:w-[calc((100%-8px)/2)] md:w-[calc((100%-16px)/3)] lg:w-[calc((100%-24px)/4)] snap-start rounded-3xl bg-white shadow-sm border border-black/10 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out"
                  >
                    <div className="p-4">
                      <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 relative">
                        <div
                          className="aspect-[4/3] bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url('${p.image}')` }}
                          aria-hidden="true"
                        />
                        {/* Tech Stack Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full">
                            <div className="flex flex-wrap gap-2 justify-center">
                              {p.techStack.map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-white/90 text-neutral-800 text-xs font-medium rounded-full backdrop-blur-sm shadow-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
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
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 hover:bg-neutral-50 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 hover:bg-neutral-50 transition-colors"
                    title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
                  >
                    {isAutoPlaying ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4h4v16H6V4zM14 4h4v16h-4V4z" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={next}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 hover:bg-neutral-50 transition-colors"
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
