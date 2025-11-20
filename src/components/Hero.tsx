import { useEffect, useState } from 'react'

type HeroSlide = {
  id: number
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  image: string
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: 'Build modern digital experiences with Technova',
    subtitle: 'From websites to complete systems, we design, build, and support what your business needs.',
    ctaLabel: 'Start a project',
    ctaHref: '/contact',
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762521547/representations-user-experience-interface-design_yvdw9r.webp',
  },
  {
    id: 2,
    title: 'Web, e‑commerce & custom systems under one roof',
    subtitle: 'Technova helps you launch fast, secure and scalable solutions tailored to your workflows.',
    ctaLabel: 'View our services',
    ctaHref: '/services',
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1750423764/blake-connally-B3l0g6HLxr8-unsplash_evasva.jpg',
  },
  {
    id: 3,
    title: 'From idea to live product with Technova',
    subtitle: 'Strategy, design, development and support — all focused on helping your business grow.',
    ctaLabel: 'Book a free call',
    ctaHref: '#book-call',
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1750423764/blake-connally-B3l0g6HLxr8-unsplash_evasva.jpg',
  },
]

const AUTO_SLIDE_INTERVAL = 7000

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, AUTO_SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    if (index < 0) {
      setActiveIndex(slides.length - 1)
    } else if (index >= slides.length) {
      setActiveIndex(0)
    } else {
      setActiveIndex(index)
    }
  }

  return (
    <section className="relative w-full" aria-label="Hero section">
      <div className="relative w-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px] overflow-hidden">
        {/* Slides track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative w-full shrink-0"
            >
              {/* Background image */}
              <div
                className="w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px] bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
                aria-hidden="true"
              />

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
                  <div className="max-w-2xl text-left text-white">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-300/50 mb-4">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                      Technova • Web & Systems Development
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-xl">
                      {slide.subtitle}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={slide.ctaHref}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 transition-colors"
                      >
                        {slide.ctaLabel}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                      <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                      >
                        View recent work
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

