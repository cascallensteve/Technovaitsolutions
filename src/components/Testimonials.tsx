import React, { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Denzel Odiwuor',
    role: 'Natural Remedies Entrepreneur',
    avatar: '',
    quote: 'Technova developed a modern website for my natural remedies products—clean design, fast performance, and easy product updates. It has helped us reach and convert more customers.',
    satisfaction: '90%',
  },
  {
    id: 2,
    name: 'George Maina',
    role: 'Citimed Hospital Pharmacy Owner',
    avatar: '',
    quote: 'Technova built a complete pharmacy system for us—inventory, billing, and prescriptions—all in one place. Our operations are faster and more accurate now.',
    satisfaction: '88%',
  },
  {
    id: 3,
    name: 'Margeret Wambui',
    role: 'Fashion Retailer',
    avatar: '',
    quote: 'Technova launched an e‑commerce platform for selling clothes—simple management, secure checkout, and great user experience. Sales are up and customers love it.',
    satisfaction: '95%',
  },
]

const Testimonials: React.FC = () => {
  const [visible, setVisible] = useState<boolean[]>(new Array(testimonials.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute('data-index')
          if (entry.isIntersecting && idxAttr) {
            const i = parseInt(idxAttr, 10)
            setVisible((prev) => {
              if (prev[i]) return prev
              const copy = [...prev]
              copy[i] = true
              return copy
            })
          }
        })
      },
      { threshold: 0.25 }
    )

    cardsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <section role="region" aria-label="Client success stories" className="relative w-full py-20 bg-gradient-to-b from-white via-blue-50/40 to-indigo-100/50 overflow-hidden">
      <div className="px-4 md:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-3">
            Recent <span className="text-blue-600 relative inline-block">Success Stories<div className="absolute left-0 right-0 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/60 via-indigo-500/60 to-transparent rounded-full"></div></span>
          </h2>
          <p className="text-center text-neutral-600 max-w-2xl mx-auto">
            Real results from clients across industries.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12 items-stretch">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                ref={(el) => {
                  cardsRef.current[idx] = el
                }}
                data-index={idx}
                className={`group p-[1px] rounded-2xl bg-gradient-to-br ${
                  idx === 0
                    ? 'from-blue-200/60 via-blue-100/30 to-indigo-200/60 hover:from-blue-200/80 hover:to-indigo-200/80'
                    : idx === 1
                    ? 'from-violet-200/60 via-violet-100/30 to-fuchsia-200/60 hover:from-violet-200/80 hover:to-fuchsia-200/80'
                    : 'from-teal-200/60 via-teal-100/30 to-cyan-200/60 hover:from-teal-200/80 hover:to-cyan-200/80'
                } transform motion-reduce:transform-none transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none will-change-transform
                  ${
                    visible[idx]
                      ? 'opacity-100 translate-x-0 scale-100'
                      : idx === 0
                      ? 'opacity-0 -translate-x-8'
                      : idx === 1
                      ? 'opacity-0 scale-95'
                      : 'opacity-0 translate-x-8'
                  }
                `}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <article
                  tabIndex={0}
                  aria-label={`Testimonial from ${testimonial.name}`}
                  className="h-full bg-white/80 hover:bg-white/90 backdrop-blur rounded-2xl p-6 shadow-sm border border-white/40 hover:border-blue-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:ring-2 focus:ring-blue-300/40"
                >
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4 group-hover:w-16 transition-all duration-300"></div>
                  <div className="mb-3">
                    <h3 className="font-semibold text-neutral-900 tracking-tight">
                      <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                        {testimonial.name}
                      </span>
                    </h3>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-4"></div>
                  
                  <blockquote className="relative text-neutral-700 leading-relaxed mb-6">
                    <span className="block text-4xl leading-none text-blue-500/20 mb-1">“</span>
                    <span className="italic">{testimonial.quote}</span>
                    <span className="block text-4xl leading-none text-blue-500/20 mt-2 text-right">”</span>
                  </blockquote>
                  
                  <div className={`inline-flex items-center gap-2 text-sm rounded-full px-3 py-1 border ${
                    idx === 0
                      ? 'bg-blue-50/80 text-blue-700 border-blue-200'
                      : idx === 1
                      ? 'bg-violet-50/80 text-violet-700 border-violet-200'
                      : 'bg-emerald-50/80 text-emerald-700 border-emerald-200'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 11.586l6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Satisfaction</span>
                    <span className="relative pl-2 font-semibold">
                      <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" aria-hidden="true"></span>
                      {testimonial.satisfaction}
                    </span>
                  </div>
                </article>
              </div>
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
