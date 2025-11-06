

const Hero = () => {
  return (
    <section className="relative w-full bg-transparent" aria-label="Hero section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center pt-8 md:pt-10 pb-16 md:pb-20">
          {/* Left: Content */}
          <div className="order-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
              Trusted by 200+ Clients
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
              We build  <span className="text-emerald-600">Software Solutions</span>,{' '}
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-1 sm:mt-0">
                From <span className="ml-1 sm:ml-3 underline decoration-emerald-600 decoration-4 underline-offset-4">Websites</span> to systems
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-neutral-600 mx-auto md:mx-0">
              From small bussiness to large Campanaies .
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="#book-call" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Schedule a Call
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>
                Contact Us
              </a>
            </div>
          </div>



          {/* Right: Illustration */}
          <div className="relative order-2 mt-4 sm:mt-0 md:ml-6 lg:ml-10">
            <div className="relative mx-auto w-full max-w-none overflow-visible">
              <div className="relative rounded-2xl shadow-xl overflow-hidden h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
                <img
                  src="https://res.cloudinary.com/djksfayfu/image/upload/v1762430201/bg_technova_e8p5lq.png"
                  alt="Technova community illustration"
                  className="w-full h-full object-contain"
                />
                {/* Bottom gradient overlay (lower and pure blue to transparent) */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-12 md:h-14 bg-gradient-to-t from-blue-300/60 to-transparent"></div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


