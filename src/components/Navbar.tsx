import { useState, useEffect, useRef } from 'react'
import { authService } from '../services/authService'
import logo from '../assets/logo.png'

const services = [
  { id: 1, title: 'System Revamp', slug: 'system-revamp' },
  { id: 2, title: 'Web Development', slug: 'web-development' },
  { id: 3, title: 'Payment Integration', slug: 'mpesa-integration' },
  { id: 4, title: 'Mobile App Development', slug: 'mobile-app-development' },
  { id: 5, title: 'Search Engine Optimization', slug: 'seo-services' },
  { id: 6, title: 'IT Solutions & Support', slug: 'it-solutions-support' },
  { id: 7, title: 'AI Automation & Data Analysis', slug: 'ai-automation-data-analysis' }
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Record<string, any> | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check authentication status
    const userData = authService.getUser()
    if (userData) {
      setIsAuthenticated(true)
      setUser(userData as any)
    }
  }, [])

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsMobileMenuOpen(false)
        setIsClosing(false)
      }, 300)
    } else {
      setIsMobileMenuOpen(true)
    }
    setIsServicesDropdownOpen(false)
  }


  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen)
  }


  const toggleMobileServices = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false)
      }
    }


    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
      document.body.classList.add('mobile-menu-open')
      // Also prevent scroll on the root html element for full freeze
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('mobile-menu-open')
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('mobile-menu-open')
      document.documentElement.style.overflow = ''
    }
  }, [isMobileMenuOpen])


  return (
    <>
    <header className="w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-neutral-200 fixed top-0 inset-x-0 z-[9999999999]">
      {/* Top contact / social bar */}
      <div className="bg-[#051632] text-white text-xs lg:text-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between gap-4 py-2">
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F5DFF]"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              <span className="text-white/90 font-medium">0793515066</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 border-l border-white/20 pl-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F5DFF]"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m22 6-10 7L2 6"/></svg></span>
              <span className="text-white/90">technova446@gmail.com</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 border-l border-white/20 pl-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F5DFF]"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
              <span className="text-white/90">Mon - Fri: 8:00AM - 5:00PM</span>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="h-8 w-8 flex items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12.06C22 6.49 17.52 2 11.94 2S2 6.49 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34v7.03C18.34 21.25 22 17.08 22 12.06Z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="#"
              aria-label="X"
              className="h-8 w-8 flex items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4h3.3l4.1 5.6L15.9 4H20l-6.3 7.4L20 20h-3.3l-4.4-6L8.1 20H4l6.5-7.6L4 4Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="h-8 w-8 flex items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17" cy="7" r="0.9" fill="currentColor" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="h-8 w-8 flex items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2ZM2 8h2V22H2V8Zm6 0h3.8v1.9h.1C12.7 8.9 14 8 16 8c3 0 4 2 4 4.6V22h-4v-7.4c0-1.3 0-3-1.8-3-1.8 0-2.2 1.4-2.2 2.9V22H8V8Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-1 md:px-2 lg:px-4 flex items-center justify-between gap-4 py-1 md:py-2">
        {/* Left: brand and primary links */}
        <div className="flex items-center gap-5">
          <a href="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Technova logo"
              className="h-12 md:h-14 lg:h-16 w-auto object-contain select-none transform origin-left scale-175"
              draggable="false"
            />

            <span className="sr-only">Technova</span>
          </a>
          <div className={`${isMobileMenuOpen ? 'hidden' : 'hidden md:flex'} md:flex-none items-center justify-end gap-4 text-[16px] md:text-[17px] ml-12 md:ml-16 lg:ml-20 nav-font` }>
            <a href="/" className="px-3 py-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 hover:ring-1 hover:ring-neutral-200 transition">Home</a>
            <a href="/services" className="px-3 py-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 hover:ring-1 hover:ring-neutral-200 transition">Services</a>
            <a href="/portfolio" className="px-3 py-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 hover:ring-1 hover:ring-neutral-200 transition">Portfolio</a>
            <a href="/team" className="px-3 py-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 hover:ring-1 hover:ring-neutral-200 transition">Team</a>
            <a href="/blog" className="px-3 py-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 hover:ring-1 hover:ring-neutral-200 transition">Blog</a>
            <a href="/contact" className="px-3 py-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 hover:ring-1 hover:ring-neutral-200 transition">Contact</a>
          </div>
        </div>
        

        {/* Right: utilities and mobile menu button */}
        <div className="flex items-center gap-4 text-sm">
          <div ref={dropdownRef} className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:block'} relative nav-font`}>
            <button 
              onClick={toggleServicesDropdown}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 hover:ring-1 hover:ring-neutral-200 transition"
            >
              <span>What we offer</span>
              <svg 
                className={`h-3 w-3 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} 
                viewBox="0 0 10 6" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >

                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            
            
            {/* Services Dropdown */}
            {isServicesDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  Our Services
                </div>
                {services.map((service) => (
                  <a
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="block px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {service.title}
                  </a>
                ))}
                <div className="border-t border-neutral-200 mt-2 pt-2">
                  <a
                    href="/services"
                    className="block px-4 py-3 text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    View All Services →
                  </a>
                </div>
              </div>
            )}
          </div>
          {isAuthenticated && user ? (
            <a href="/profile" className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:inline'} px-4 py-2 rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition font-medium` }>
              Welcome {user?.username}
            </a>
          ) : null}
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {(isMobileMenuOpen || isClosing) && (
        <div className="md:hidden fixed inset-0 z-[9999999999]" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ease-out ${
              isMobileMenuOpen && !isClosing ? 'opacity-100 bg-white' : 'opacity-0 bg-white'
            }`}
            onClick={toggleMobileMenu}
          />

          {/* Sliding Panel */}
          <div
            className={`absolute inset-x-0 top-0 h-full bg-white transform transition-transform duration-300 ease-out z-[10000000000] ${
              isMobileMenuOpen && !isClosing ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-[#007bff]">
              <a href="/" onClick={toggleMobileMenu} className="flex items-center gap-2">
                <img src={logo} alt="Technova logo" className="h-10 w-auto object-contain" />
                <span className="sr-only">Technova</span>
              </a>
              <button onClick={toggleMobileMenu} aria-label="Close menu" className="p-2 rounded-full hover:bg-white/10 text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="px-4 py-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] pb-10 nav-font">
              <a 
                href="/" 
                className="block text-[clamp(1rem,2.8vw,1.25rem)] text-[#007bff] hover:text-[#005fcc] py-3 rounded-lg hover:bg-neutral-100 px-2 font-medium"
                onClick={toggleMobileMenu}
              >
                Home
              </a>
              <a 
                href="/services" 
                className="block text-[clamp(1rem,2.8vw,1.25rem)] text-neutral-800 hover:text-[#007bff] py-3 rounded-lg hover:bg-neutral-100 px-2"
                onClick={toggleMobileMenu}
              >
                Services
              </a>
              <a 
                href="/portfolio" 
                className="block text-[clamp(1rem,2.8vw,1.25rem)] text-neutral-800 hover:text-[#007bff] py-3 rounded-lg hover:bg-neutral-100 px-2"
                onClick={toggleMobileMenu}
              >
                Portfolio
              </a>
              <a 
                href="/team" 
                className="block text-[clamp(1rem,2.8vw,1.25rem)] text-neutral-800 hover:text-[#007bff] py-3 rounded-lg hover:bg-neutral-100 px-2"
                onClick={toggleMobileMenu}
              >
                Team
              </a>
              <a 
                href="/blog" 
                className="block text-[clamp(1rem,2.8vw,1.25rem)] text-neutral-800 hover:text-[#007bff] py-3 rounded-lg hover:bg-neutral-100 px-2"
                onClick={toggleMobileMenu}
              >
                Blog
              </a>
              <a 
                href="/contact" 
                className="block text-[clamp(1rem,2.8vw,1.25rem)] text-neutral-800 hover:text-[#007bff] py-3 rounded-lg hover:bg-neutral-100 px-2"
                onClick={toggleMobileMenu}
              >
                Contact
              </a>

              <div className="border-t border-neutral-200 pt-2 mt-2">
                <button 
                  onClick={toggleMobileServices}
                  className="flex items-center justify-between text-[clamp(1rem,2.8vw,1.25rem)] text-neutral-800 hover:text-[#007bff] py-3 w-full text-left rounded-lg hover:bg-neutral-100 px-2"
                >
                  <span>What we offer</span>
                  <svg 
                    className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} 
                    viewBox="0 0 10 6" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                
                {/* Mobile Services Submenu */}
                {isMobileServicesOpen && (
                  <div className="ml-2 mt-1 space-y-1">
                    {services.map((service) => (
                      <a
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="block text-neutral-700 hover:text-[#007bff] py-2 text-base rounded-md hover:bg-neutral-100 pl-4"
                        onClick={() => {
                          toggleMobileMenu()
                          setIsMobileServicesOpen(false)
                        }}
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                )}
                
                {isAuthenticated && user ? (
                  <a 
                    href="/profile" 
                    className="block text-[#007bff] hover:text-[#005fcc] py-3 w-full text-left font-semibold"
                    onClick={toggleMobileMenu}
                  >
                    👤 Welcome {user?.username}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
    <div className="h-[56px] md:h-[96px] lg:h-[112px]" aria-hidden="true"></div>
    </>
  )
}

export default Navbar;
