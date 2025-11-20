import logo from '../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-neutral-950 text-white">
      <div className="px-4 md:px-6 lg:px-16 py-12 md:py-14">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Top: Brand + CTA */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-neutral-800 pb-8">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Technova" className="h-20 md:h-24 lg:h-28 w-auto object-contain" />
              <div className="h-10 md:h-12 w-px bg-neutral-800" />
              <p className="text-neutral-300 leading-relaxed max-w-md text-sm md:text-base">
                Building the future with innovative technology solutions that scale with your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-xs uppercase tracking-wide text-neutral-400">Start a project</div>
              <a
                href="/start-project#project-form"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-colors"
              >
                Let&apos;s talk
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle: Columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wide text-neutral-200 uppercase">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services/web-development" className="text-neutral-400 hover:text-white transition">Web Development</a></li>
                <li><a href="/services/mobile-app-development" className="text-neutral-400 hover:text-white transition">Mobile Apps</a></li>
                <li><a href="/services/system-revamp" className="text-neutral-400 hover:text-white transition">System Integration</a></li>
                <li><a href="/services/mpesa-integration" className="text-neutral-400 hover:text-white transition">Payment Integration</a></li>
                <li><a href="/services/it-solutions-support" className="text-neutral-400 hover:text-white transition">IT Consulting</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wide text-neutral-200 uppercase">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-neutral-400 hover:text-white transition">About Us</a></li>
                <li><a href="/team" className="text-neutral-400 hover:text-white transition">Our Team</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Careers</a></li>
                <li><a href="/portfolio" className="text-neutral-400 hover:text-white transition">Case Studies</a></li>
                <li><a href="/blog" className="text-neutral-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wide text-neutral-200 uppercase">Get in Touch</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="text-neutral-400 hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Support</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
              <div className="mt-4 space-y-1 text-sm">
                <p className="text-neutral-300">technova446@gmail.com</p>
                <p className="text-neutral-300">+254 712 665 257</p>
                <p className="text-neutral-500 text-xs">Nairobi, Kenya</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wide text-neutral-200 uppercase">Connect</h4>
              <p className="text-neutral-400 text-sm mb-4">Follow Technova on social for updates, tips, and new launches.</p>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-700 text-neutral-300 hover:bg-white/10 hover:text-white transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12.06C22 6.49 17.52 2 11.94 2S2 6.49 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34v7.03C18.34 21.25 22 17.08 22 12.06z" />
                  </svg>
                </a>
                {/* X / Twitter */}
                <a
                  href="#"
                  aria-label="X"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-700 text-neutral-300 hover:bg-white/10 hover:text-white transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-700 text-neutral-300 hover:bg-white/10 hover:text-white transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17" cy="7" r="0.9" fill="currentColor" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-700 text-neutral-300 hover:bg-white/10 hover:text-white transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2ZM2 8h2V22H2V8Zm6 0h3.8v1.9h.1C12.7 8.9 14 8 16 8c3 0 4 2 4 4.6V22h-4v-7.4c0-1.3 0-3-1.8-3-1.8 0-2.2 1.4-2.2 2.9V22H8V8Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom: Legal */}
          <div className="border-t border-neutral-800 pt-6 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-xs sm:text-sm">
              © {currentYear} Technova. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-500">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <span className="opacity-40">•</span>
              <a href="#" className="hover:text-white transition">Terms</a>
              <span className="opacity-40">•</span>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
