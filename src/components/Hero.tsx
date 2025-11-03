

const Hero = () => {
  return (
    <section className="relative w-full bg-white" aria-label="Hero section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 md:py-24">
          {/* Left: Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
              Trusted by 200+ Clients
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
              We build  <span className="text-emerald-600">Software Solutions</span>,
              <br className="hidden sm:block" />
              From<span className="ml-2 sm:ml-3 underline decorati  on-emerald-600 decoration-4 underline-offset-4">Websites</span> to systems
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-neutral-600 mx-auto md:mx-0">
              From small bussiness to large Campanaies .
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="#contact" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">Start Project</a>
              <a href="#download" className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50">Contact us</a>
            </div>
          </div>



          {/* Right: Illustration */}
          <div className="relative order-last md:order-none mt-8 md:mt-0">
            <div className="relative mx-auto w-full max-w-none overflow-visible">
              {/* Soft, concentrated radial gradient behind the image */}
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-[22rem] w-[22rem] sm:h-[28rem] sm:w-[28rem] md:h-[42rem] md:w-[42rem] lg:h-[50rem] lg:w-[50rem] rounded-full blur-3xl opacity-70 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.45)_0%,rgba(16,185,129,0.28)_35%,transparent_85%)]"></div>
              </div>
              {/* Left fade overlay to soften the image near text */}
              <div className="pointer-events-none absolute inset-0 -z-0">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/70 to-transparent"></div>
              </div>
              <img
                src="https://res.cloudinary.com/djksfayfu/image/upload/v1761823445/a_happy_African_lady_looking_forward__wearing_a_yellow_sweater_with__Technova__written_on_it__holdin-removebg-preview_udrnkf.png"
                alt="Technova community illustration"
                className="w-full h-auto rounded-2xl shadow-xl object-contain md:scale-110 lg:scale-125 origin-center md:origin-right"
              />

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

