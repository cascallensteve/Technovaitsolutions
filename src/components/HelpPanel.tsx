const suggestions = [
  { label: "Build your project start here", href: "/start-project?type=web-suite" },
  { label: "Revamp your system", href: "/start-project?type=system-revamp" },
  { label: "Seek consultation", href: "/start-project?type=consultation" },
]

const quickLinks = [
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Web Development", href: "/services/web-development" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 9h6M9 15h6M9 12h6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Mobile App Development", href: "/services/mobile-app-development" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "Payment Integration", href: "/services/mpesa-integration" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "System Revamp", href: "/services/system-revamp" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "SEO Services", href: "/services/seo-services" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ), label: "IT Solutions & Support", href: "/services/it-solutions-support" },
  { icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ), label: "AI Automation & Data Analysis", href: "/services/ai-automation-data-analysis" },
]

const HelpPanel: React.FC = () => {
  return (
    <section className="w-full py-10">
      {/* Gradient panel */}
      <div className="mx-4 md:mx-6 lg:mx-8">
        <div className="w-full rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 text-white shadow-md">
          <div className="px-6 md:px-10 lg:px-16 py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Get Started with us</h2>

            {/* Search bar */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-2xl flex items-center rounded-lg bg-white/95 text-neutral-800 shadow-sm ring-1 ring-black/10">
                <input
                  className="flex-1 bg-transparent px-4 py-3 placeholder-neutral-500 focus:outline-none"
                  placeholder="Technova is here for you"
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
      <div className="mt-10 px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 lg:flex lg:items-stretch lg:gap-8 lg:justify-between w-full">
          {quickLinks.map((q) => (
            <a key={q.label} href={q.href} className="group inline-flex flex-col items-center text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sky-700 shadow ring-1 ring-black/10 group-hover:shadow-md">
                {q.icon}
              </div>
              <span className="text-sm font-medium text-sky-700 group-hover:underline">
                {q.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HelpPanel
