
import { useState, useRef, useCallback, useEffect } from 'react'

const slides = [
  {
    id: 0,
    image: "/images/TECHNOVA3.png",
    video: "/vedio/vedio.mp4",
    title: "System Revamp",
    subtitle: "Upgrade your old systems with modern, efficient, and scalable solutions.",
    cta: { label: "Learn more", href: "#services" },
    align: "left" as const,
  },
  {
    id: 1,
    image: "/images/NOVATECH.png",
    title: "Web Development",
    subtitle: "We design and build fast, secure, and responsive websites that grow your business.",
    cta: { label: "View web work", href: "#portfolio" },
    align: "left" as const,
  },
  {
    id: 2,
    image: "/images/MPESA.png",
    title: "M-Pesa Integration",
    subtitle: "Seamless payment integration to power your business with mobile money solutions.",
    cta: { label: "Integrate payments", href: "#contact" },
    align: "left" as const,
    // custom layout for this slide
    layout: "split" as const,
    gradient: "linear-gradient(90deg, rgba(16,185,129,0.2) 0%, rgba(255,255,255,0.95) 60%)",
  },
  {
    id: 3,
    image: "/images/NOVATECH.png",
    video: "/vedio/vedio2.mp4",
    title: "Mobile App Development",
    subtitle: "Custom mobile apps built to deliver smooth user experiences on Android and iOS.",
    cta: { label: "Build an app", href: "#start-project" },
    align: "left" as const,
  },
  {
    id: 4,
    image: "/images/TECHNOVA3.png",
    title: "IT Solutions & Support",
    subtitle: "Your trusted partner for innovative, reliable, and affordable tech solutions.",
    cta: { label: "Talk to us", href: "#get-us" },
    align: "left" as const,
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(next, 5000);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [index, next, isPlaying]);

  return (
    <section className="relative w-full overflow-hidden" aria-label="Hero section">
      {/* Slides */}
      <div className="relative w-full min-h-[56vh] sm:min-h-[60vh] md:min-h-[68vh]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            data-slide={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={
              (s as any).layout === 'split'
                ? {
                    background: (s as any).gradient || 'linear-gradient(90deg, rgba(16,185,129,0.12) 0%, rgba(255,255,255,0.92) 60%)',
                  }
                : {}
            }
          >
            {(s as any).layout === 'split' ? null : (
              <>
                {(s as any).video ? (
                  <>
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source src={(s as any).video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0"
                      style={{
                        backgroundImage: `url('${s.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      onError={() => {
                        // Fallback to image if video fails
                        const element = document.querySelector(`[data-slide="${s.id}"] video`) as HTMLVideoElement;
                        if (element) {
                          element.style.display = 'none';
                          const fallback = element.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.opacity = '1';
                        }
                      }}
                    />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${s.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )}
                <div className={`absolute inset-0 ${(s as any).video ? 'bg-gradient-to-r from-green-600/30 via-green-400/15 to-transparent' : 'bg-gradient-to-t from-black/40 via-black/10 to-transparent'}`} />
              </>
            )}
          </div>
        ))}

        {/* Content overlay */}
        <div className="relative z-10 w-full h-full flex items-center py-12 px-4 sm:py-14 md:py-16 md:px-6 lg:px-16">
          {(slides[index] as any).layout === 'split' ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Left text */}
              <div className="text-neutral-900 text-left order-1 md:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight break-words">
                  {slides[index].title}
                </h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-800/90 max-w-3xl">
                  {slides[index].subtitle}
                </p>
                <div className="mt-8 flex">
                  <a
                    href={slides[index].cta.href}
                    className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition"
                  >
                    {slides[index].cta.label}
                  </a>
                </div>
              </div>
              {/* Right image */}
              <div className="flex justify-center md:justify-end order-2 md:order-2 mt-8 md:mt-0 pr-3 sm:pr-6 md:pr-10 lg:pr-16">
                <img
                  src={(slides[index] as any).image}
                  alt="M-Pesa integration"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-64 md:max-h-[28rem] rounded-2xl shadow-xl object-contain bg-white/60 p-3 sm:p-4"
                />
              </div>
            </div>
          ) : (
            <div className="text-white text-left">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-md break-words">
                {slides[index].title}
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-3xl drop-shadow">
                {slides[index].subtitle}
              </p>
              <div className="mt-8 flex">
                <a
                  href={slides[index].cta.href}
                  className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition"
                >
                  {slides[index].cta.label}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls bar */}
      </div>

      <div className="w-full flex items-center justify-center md:justify-between gap-6 md:gap-8 px-4 md:px-12 lg:px-16 py-6">
        {/* Prev */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 hover:bg-neutral-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
          onClick={() => setIsPlaying((p) => !p)}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 hover:bg-neutral-50"
        >
          {isPlaying ? (
            // Pause icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6H8v12h2V6zm6 0h-2v12h2V6z" fill="currentColor"/>
            </svg>
          ) : (
            // Play icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          aria-label="Next slide"
          onClick={next}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-neutral-800 shadow-sm ring-1 ring-black/10 hover:bg-neutral-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
