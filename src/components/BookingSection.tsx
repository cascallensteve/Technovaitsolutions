import { useEffect, useState } from 'react'

const BookingSection = () => {
  const [scheduled, setScheduled] = useState(false)
  useEffect(() => {
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]') as HTMLScriptElement | null
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)
    }

    const onMessage = (e: MessageEvent) => {
      const isCalendly = typeof e.data === 'object' && e.data && 'event' in e.data && String((e.data as any).event).startsWith('calendly.')
      if (isCalendly && (e.data as any).event === 'calendly.event_scheduled') {
        setScheduled(true)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <section id="book-call" className="w-full bg-white py-16">
      <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto relative">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Book a Project Schedule Call</h2>
          <p className="mt-3 text-neutral-600 max-w-2xl">Pick a time that works for you and we’ll discuss your project goals, scope, and next steps.</p>
        </div>
        <div className="calendly-inline-widget" data-url="https://calendly.com/technova446/30min" style={{ minWidth: '320px', height: '700px' }}></div>
        {scheduled && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
            <div className="relative z-10 mx-auto w-full max-w-md rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-xl">
              <div className="text-5xl mb-3">🎉🥳🎂</div>
              <div className="text-xl font-semibold text-neutral-900">Technova is happy for you! See you soon</div>
              <div className="mt-2 text-neutral-600">Your call has been scheduled successfully.</div>
            </div>
          </div>
        )}
        <div className="mt-4 text-sm text-neutral-600">
          Having trouble with the embed? 
          <a className="ml-2 text-emerald-600 hover:underline" href="https://calendly.com/technova446/30min" target="_blank" rel="noreferrer">Open Calendly in a new tab</a>
        </div>
      </div>
    </section>
  )
}

export default BookingSection

