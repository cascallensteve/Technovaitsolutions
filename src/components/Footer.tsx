import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-white">
      <div className="px-4 md:px-6 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-4">
                <img src={logo} alt="Technova" className="h-24 md:h-28 lg:h-32 w-auto object-contain" />
                <p className="text-neutral-300 leading-relaxed max-w-xs">
                  Building the future with innovative technology solutions that scale with your business.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Facebook" className="text-neutral-400 hover:text-white transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.49 17.52 2 11.94 2S2 6.49 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34v7.03C18.34 21.25 22 17.08 22 12.06z"/></svg>
                </a>
                <a href="#" aria-label="WhatsApp" className="text-neutral-400 hover:text-white transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163A10.93 10.93 0 0111.93.06C18.6.06 24 5.46 24 12.13c0 6.67-5.4 12.07-12.07 12.07-2.06 0-4.03-.52-5.78-1.51L.057 24zm6.597-3.807c1.7.995 3.27 1.59 5.39 1.59 5.44 0 9.86-4.42 9.86-9.86 0-5.44-4.42-9.86-9.86-9.86-5.44 0-9.86 4.42-9.86 9.86 0 2.16.69 4.15 1.85 5.78l-.99 3.62 3.61-.99zm10.01-5.61c-.06-.1-.22-.16-.46-.28-.24-.12-1.39-.68-1.6-.76-.21-.08-.36-.12-.51.12-.15.24-.59.76-.72.92-.13.16-.27.18-.5.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.38.11-.5.12-.12.24-.3.37-.46.12-.16.16-.28.24-.47.08-.18.04-.34-.02-.48-.06-.14-.51-1.23-.7-1.69-.18-.45-.37-.39-.51-.4-.13-.01-.28-.01-.43-.01-.15 0-.4.06-.61.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.12.16 1.61 2.46 3.91 3.45.55.24.98.38 1.31.48.55.18 1.05.15 1.45.09.44-.07 1.39-.57 1.59-1.12.2-.55.2-1.02.14-1.12z"/></svg>
                </a>
                <a href="#" aria-label="Gmail" className="text-neutral-400 hover:text-white transition">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.3l-8 5.2-8-5.2V6l8 5.2L20 6v2.3z"/></svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Web Development</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Mobile Apps</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">System Integration</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">M-Pesa Integration</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">IT Consulting</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Our Team</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Case Studies</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Support</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
              <div className="mt-4">
                <p className="text-neutral-400 text-sm">hello@technova.com</p>
                <p className="text-neutral-400 text-sm">+254 700 000 000</p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2024 Technova. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition text-sm">Privacy</a>
              <a href="#" className="text-neutral-400 hover:text-white transition text-sm">Terms</a>
              <a href="#" className="text-neutral-400 hover:text-white transition text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
