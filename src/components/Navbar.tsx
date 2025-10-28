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

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top banner */}
      <div className="w-full bg-microsoft-purple text-white">
        <div className="px-4 md:px-6 lg:px-8 flex h-10 items-center justify-between text-xs">
          <p className="truncate">
            <span className="hidden sm:inline">Transform your business with cutting-edge technology solutions. </span>
            Get started today
          </p>
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-white text-microsoft-purple px-3 py-1 text-xs font-medium hover:bg-white/90 transition"
          >
            Free Consultation
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full px-4 md:px-6 lg:px-8 flex h-14 items-center justify-between gap-4">
        {/* Left: brand and primary links */}
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-1">
            <svg className="h-6 w-6 text-neutral-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="text-xl font-bold text-neutral-900">Technova</span>
          </a>
          <div className={`${isMobileMenuOpen ? 'hidden' : 'hidden md:flex'} items-center gap-6 text-sm`}>
            <a href="/" className="text-neutral-700 hover:text-neutral-900">Home</a>
            <a href="/services" className="text-neutral-700 hover:text-neutral-900">Services</a>
            <a href="/portfolio" className="text-neutral-700 hover:text-neutral-900">Portfolio</a>
            <a href="/team" className="text-neutral-700 hover:text-neutral-900">Team</a>
            <a href="/blog" className="text-neutral-700 hover:text-neutral-900">Blog</a>
            <a href="/contact" className="text-neutral-700 hover:text-neutral-900">Contact</a>
          </div>
        </div>
        
        {/* Right: utilities and mobile menu button */}
        <div className="flex items-center gap-4 text-sm">
          <div ref={dropdownRef} className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:block'} relative`}>
            <button 
              onClick={toggleServicesDropdown}
              className="flex items-center gap-1 text-neutral-700 hover:underline"
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
            <a href="/profile" className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:inline'} px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium`}>
              {user.username}
            </a>
          ) : (
            <a href="/signin" className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:inline'} text-neutral-700 hover:underline`}>Sign in</a>
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
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="px-4 py-4 space-y-3">
            <a 
              href="/" 
              className="block text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/services" 
              className="block text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="/portfolio" 
              className="block text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a 
              href="/team" 
              className="block text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Team
            </a>
            <a 
              href="/blog" 
              className="block text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a 
              href="/contact" 
              className="block text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="border-t border-neutral-200 pt-3 mt-3">
              <button 
                onClick={toggleMobileServices}
                className="flex items-center justify-between text-neutral-700 hover:text-neutral-900 py-2 w-full text-left"
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
                <div className="ml-4 mt-2 space-y-2">
                  {services.map((service) => (
                    <a
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block text-neutral-600 hover:text-neutral-900 py-2 text-sm"
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
                  className="block text-green-600 hover:text-green-700 py-2 w-full text-left font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👤 {user.username}
                </a>
              ) : (
                <a 
                  href="/signin" 
                  className="block text-neutral-700 hover:text-neutral-900 py-2 w-full text-left"
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
  )
}

export default Navbar;
