import React from 'react'

const suggestions = [
  { label: "Build a web suite", href: "#start-project" },
  { label: "Revamp your system", href: "#services" },
  { label: "Seek consultation", href: "#contact" },
]

const quickLinks = [
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="7" y="9" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Shop Surface devices", href: "#surface" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Shop Xbox games and consoles", href: "#xbox" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 17h8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Shop for accessories", href: "#accessories" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7h18M3 12h12M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="17" y="10" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Shop for your business", href: "#business" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3l7 7-7 11-7-11 7-7z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Find your next PC", href: "#next-pc" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Choose your Microsoft 365", href: "#m365" },
]

const HelpPanel: React.FC = () => {
  return (
    <section className="w-full py-10">
      {/* Gradient panel */}
      <div className="mx-4 md:mx-6 lg:mx-8">
        <div className="w-full rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 text-white shadow-md">
          <div className="px-6 md:px-10 lg:px-16 py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">We Technova is here for you</h2>

            {/* Search bar */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-2xl flex items-center rounded-lg bg-white/95 text-neutral-800 shadow-sm ring-1 ring-black/10">
                <input
                  className="flex-1 bg-transparent px-4 py-3 placeholder-neutral-500 focus:outline-none"
                  placeholder="Ask me a question"
                />
                <button aria-label="Ask" className="mx-2 my-1 inline-flex items-center justify-center h-9 w-9 rounded-md bg-sky-600 text-white hover:bg-sky-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {suggestions.map((s) => (
                <a key={s.label} href={s.href} className="rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-sm hover:bg-white/25">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 px-6 md:px-10 lg:px-16">
        {quickLinks.map((q) => (
          <a key={q.label} href={q.href} className="group flex flex-col items-center text-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sky-700 shadow ring-1 ring-black/10 group-hover:shadow-md">
              {q.icon}
            </div>
            <span className="text-sm font-medium text-sky-700 group-hover:underline">
              {q.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default HelpPanel
