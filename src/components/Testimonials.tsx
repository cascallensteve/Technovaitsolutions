import React, { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Denzel Odiwuor',
    role: 'Natural Remedies Entrepreneur',
    avatar: '',
    quote: 'Technova developed a modern website for my natural remedies products—clean design, fast performance, and easy product updates. It has helped us reach and convert more customers.',
    satisfaction: '96%',
  },
  {
    id: 2,
    name: 'George Maina',
    role: 'Citimed Hospital Pharmacy Owner',
    avatar: '',
    quote: 'Technova built a complete pharmacy system for us—inventory, billing, and prescriptions—all in one place. Our operations are faster and more accurate now.',
    satisfaction: '97%',
  },
  {
    id: 3,
    name: 'Margeret Wambui',
    role: 'Fashion Retailer',
    avatar: '',
    quote: 'Technova launched an e‑commerce platform for selling clothes—simple management, secure checkout, and great user experience. Sales are up and customers love it.',
    satisfaction: '99%',
  },
]

const AUTOPLAY_INTERVAL = 8000

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      role="region"
      aria-label="What our clients say"
      className="relative w-full py-20 bg-gradient-to-b from-white via-blue-50/40 to-indigo-100/50 overflow-hidden"
    >
      <div className="px-4 md:px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-xs md:text-sm font-semibold tracking-[0.18em] text-blue-600 uppercase mb-3">
            Our Clients Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            What our clients say about Technova
          </h2>
          <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto">
            Real feedback from businesses we&apos;ve helped with web, systems, and payment solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Carousel card */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-blue-50">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <article
                  key={t.id}
                  className="w-full flex-shrink-0 px-6 py-10 md:px-12 md:py-12 text-left"
                  aria-label={`Testimonial from ${t.name}`}
                >
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      Client Story
                    </span>
                  </div>

                  <blockquote className="relative text-neutral-800 leading-relaxed mb-8 text-base md:text-lg">
                    <span className="block text-5xl leading-none text-blue-200 mb-2">“</span>
                    <span>{t.quote}</span>
                    <span className="block text-5xl leading-none text-blue-200 mt-2 text-right">”</span>
                  </blockquote>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="text-base md:text-lg font-semibold text-neutral-900">{t.name}</div>
                      <div className="text-sm text-neutral-500">{t.role}</div>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs md:text-sm text-blue-800 border border-blue-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 11.586l6.543-6.543a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Satisfaction</span>
                      <span className="relative pl-2 font-semibold">
                        <span
                          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
                          aria-hidden="true"
                        ></span>
                        {t.satisfaction}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md text-neutral-700 hover:bg-neutral-50 border border-neutral-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md text-neutral-700 hover:bg-neutral-50 border border-neutral-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((t, index) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-blue-600' : 'w-2 bg-blue-200 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl"></div>
    </section>
  )
}

export default Testimonials
