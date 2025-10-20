import { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top banner */}
      <div className="w-full bg-microsoft-purple text-white">
        <div className="px-4 md:px-6 lg:px-8 flex h-10 items-center justify-between text-xs">
          <p className="truncate">
            <span className="hidden sm:inline">Get up to 40% off selected Surface devices. </span>
            Shop now
          </p>
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-white text-microsoft-purple px-3 py-1 text-xs font-medium hover:bg-white/90 transition"
          >
            Shop Deals
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
            <a href="/contact" className="text-neutral-700 hover:text-neutral-900">Contact</a>
          </div>
        </div>
        
        {/* Right: utilities and mobile menu button */}
        <div className="flex items-center gap-4 text-sm">
          <button className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:flex'} items-center gap-1 text-neutral-700 hover:underline`}>
            <span>What we offer</span>
            <svg className="h-3 w-3" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className={`${isMobileMenuOpen ? 'hidden' : 'hidden sm:inline'} text-neutral-700 hover:underline`}>Sign in</button>
          
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
              href="/contact" 
              className="block text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="border-t border-neutral-200 pt-3 mt-3">
              <button className="block text-neutral-700 hover:text-neutral-900 py-2 w-full text-left">
                What we offer
              </button>
              <button className="block text-neutral-700 hover:text-neutral-900 py-2 w-full text-left">
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar;
