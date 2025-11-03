import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/TECHNOVA3.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center py-16 px-4 md:px-6 lg:px-16">
            <div className="text-white text-left max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md leading-tight">
                Let's Build Something Amazing Together
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed">
                Ready to transform your ideas into powerful digital solutions? Get in touch with our team of experts.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition"
                >
                  Start Your Project
                </a>
                <a
                  href="tel:+254700000000"
                  className="inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white hover:text-neutral-900 transition"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left: Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                    <p className="text-neutral-700">+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                    <p className="text-neutral-700">hello@technova.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Office</h3>
                    <p className="text-neutral-700">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-900 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-neutral-900 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="system-revamp">System Revamp</option>
                    <option value="mpesa-integration">M-Pesa Integration</option>
                    <option value="it-consulting">IT Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-900 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 bg-neutral-900">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start Your Digital Journey Today
              </h2>
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                From concept to completion, we're here to turn your ideas into powerful digital solutions. 
                Let's explore what's possible for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://calendly.com/technova-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Book Consultation
                </a>
                <a
                  href="tel:+254700000000"
                  className="inline-flex items-center justify-center border border-neutral-600 text-neutral-300 px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Technova?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Expert team with 5+ years experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 support and maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Competitive pricing & flexible packages</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>100% satisfaction guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Contact
