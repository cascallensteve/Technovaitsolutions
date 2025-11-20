const BookingSection = () => {
  return (
    <section id="book-call" className="w-full bg-white py-16">
      <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Book a Project Schedule Call
            </h2>
            <p className="text-neutral-700 text-base md:text-lg mb-6 max-w-xl">
              Pick a time that works for you and we&apos;ll discuss your project goals, scope, and next steps.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600 mb-6">
              <li>• 30 minutes focused on your idea or existing system</li>
              <li>• We help you clarify requirements, timelines, and budget</li>
              <li>• No obligation — just an honest, technical conversation</li>
            </ul>
            <a
              href="https://calendly.com/technova446/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-colors"
            >
              Open Calendly
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
              </svg>
            </a>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Fast, simple scheduling</h3>
              <p className="text-sm text-neutral-600 mb-4">
                We use Calendly so you can instantly see our availability and choose a time that fits your schedule.
              </p>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">1</span>
                  <span>Select a time that works for you</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">2</span>
                  <span>Share a few details about your project</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">3</span>
                  <span>Meet Technova at your scheduled time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingSection

