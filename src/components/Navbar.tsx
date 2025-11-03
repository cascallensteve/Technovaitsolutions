import { useState, useEffect, useRef } from 'react'
import { authService } from '../services/authService'

const services = [
  { id: 1, title: 'System Revamp', slug: 'system-revamp' },
  { id: 2, title: 'Web Development', slug: 'web-development' },
  { id: 3, title: 'M-Pesa Integration', slug: 'mpesa-integration' },
  { id: 4, title: 'Mobile App Development', slug: 'mobile-app-development' },
  { id: 5, title: 'Search Engine Optimization', slug: 'seo-services' },
  { id: 6, title: 'IT Solutions & Support', slug: 'it-solutions-support' }
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string } | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check authentication status
    const userData = authService.getUser()
    if (userData) {
      setIsAuthenticated(true)
      setUser(userData)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMobileMenuOpen])


  return (
    <>
    <header className="w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-neutral-200 fixed top-0 inset-x-0 z-[9999]">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4 py-1 md:py-2">
        {/* Left: brand and primary links */}
        <div className="flex items-center gap-5">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/djksfayfu/image/upload/v1761826048/a_logo_for__Technova__using_blue_and_white_colors__with_a_stylized__TS__abbreviation_on_the_left__se-removebg-preview_z1j5j6.png"
              alt="Technova logo"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain select-none"
              draggable="false"
            />

            <span className="sr-only">Technova</span>
          </a>
          <div className={`${isMobileMenuOpen ? 'hidden' : 'hidden md:flex'} items-center gap-6 text-[16px] md:text-[17px] ml-6 md:ml-10 lg:ml-12` }>
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
          <div ref={dropdownRef} className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:block'} relative`}>
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
              Welcome {user.username}
            </a>
          ) : (
            <a href="/signin" className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:inline'} px-4 py-2 rounded-full border border-blue-600 text-blue-700 hover:bg-blue-50 transition font-semibold`}>Sign in</a>
          )}
          
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
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[10000] bg-white" role="dialog" aria-modal="true">
          {/* Overlay top bar with logo + close */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
              <img src="https://res.cloudinary.com/djksfayfu/image/upload/v1761826048/a_logo_for__Technova__using_blue_and_white_colors__with_a_stylized__TS__abbreviation_on_the_left__se-removebg-preview_z1j5j6.png" alt="Technova logo" className="h-8 w-auto object-contain" />
              <span className="sr-only">Technova</span>
            </a>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-full hover:bg-neutral-100">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="px-4 py-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] pb-10">
            <a 
              href="/" 
              className="block text-lg text-neutral-800 hover:text-neutral-900 py-3 rounded-lg hover:bg-neutral-100 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/services" 
              className="block text-lg text-neutral-800 hover:text-neutral-900 py-3 rounded-lg hover:bg-neutral-100 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="/portfolio" 
              className="block text-lg text-neutral-800 hover:text-neutral-900 py-3 rounded-lg hover:bg-neutral-100 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a 
              href="/team" 
              className="block text-lg text-neutral-800 hover:text-neutral-900 py-3 rounded-lg hover:bg-neutral-100 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Team
            </a>
            <a 
              href="/blog" 
              className="block text-lg text-neutral-800 hover:text-neutral-900 py-3 rounded-lg hover:bg-neutral-100 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a 
              href="/contact" 
              className="block text-lg text-neutral-800 hover:text-neutral-900 py-3 rounded-lg hover:bg-neutral-100 px-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="border-t border-neutral-200 pt-2 mt-2">
              <button 
                onClick={toggleMobileServices}
                className="flex items-center justify-between text-lg text-neutral-800 hover:text-neutral-900 py-3 w-full text-left rounded-lg hover:bg-neutral-100 px-2"
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
                      className="block text-neutral-700 hover:text-neutral-900 py-2 text-base rounded-md hover:bg-neutral-100 pl-4"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
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
                  className="block text-green-600 hover:text-green-700 py-3 w-full text-left font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👤 Welcome {user.username}
                </a>
              ) : (
                <a 
                  href="/signin" 
                  className="block text-neutral-700 hover:text-neutral-900 py-3 w-full text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
    <div className="h-[56px] md:h-[64px] lg:h-[72px]" aria-hidden="true"></div>
    </>
  )
}

export default Navbar;
