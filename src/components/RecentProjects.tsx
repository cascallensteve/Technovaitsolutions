
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

  const scrollTo = useCallback((i: number) => {
    const el = trackRef.current
    if (!el) return
    const item = el.children[i] as HTMLElement
    if (!item) return
    
    // Simple scroll to item position
    const scrollLeft = item.offsetLeft - 16 // Account for padding
    
    el.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' })
    setIndex(i)
  }, [])

  const next = useCallback(() => {
    const newIndex = index === projects.length - 1 ? 0 : index + 1
    scrollTo(newIndex)
  }, [index, scrollTo])
  
  const prev = useCallback(() => {
    const newIndex = index === 0 ? projects.length - 1 : index - 1
    scrollTo(newIndex)
  }, [index, scrollTo])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      next()
    }, 4000) // Change slide every 4 seconds
    
    return () => clearInterval(interval)
  }, [next, isAutoPlaying])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

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
                className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {projects.map((p) => (
                  <article
                    key={p.id}
                    className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px] lg:w-[440px] snap-start rounded-3xl bg-white shadow-sm border border-black/10 overflow-hidden group"
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
                              {p.techStack.map((tech, techIndex) => (
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
