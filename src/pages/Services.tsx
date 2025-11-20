import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const services = [
  {
    id: 1,
    title: 'System Revamp',
    description: 'Upgrade your old systems with modern, efficient, and scalable solutions.',
    features: [
      'Legacy system modernization',
      'Database migration and optimization',
      'Performance enhancement',
      'Security updates and compliance',
      'User interface redesign',
      'Integration with modern APIs'
    ],
    image: '/images/TECHNOVA3.png',
    video: '/vedio/vedio.mp4',
    timeline: '5-12 weeks'
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'We design and build fast, secure, and responsive websites that grow your business.',
    features: [
      'Custom website development',
      'E-commerce solutions',
      'Content Management Systems',
      'Progressive Web Apps (PWA)',
      'SEO optimization',
      'Mobile-responsive design'
    ],
    image: '/images/NOVATECH.png',
    timeline: '4-10 weeks'
  },
  {
    id: 3,
    title: 'Payment Integration',
    description: 'Unified payment integration covering KCB, M-Pesa, Jenga, Buni, Paystack and more, so your customers can pay easily and securely.',
    features: [
      'KCB payment integration',
      'M-Pesa API & STK push integration',
      'Jenga payment API integration',
      'Buni and Paystack gateway setup',
      'Real-time transaction monitoring & reconciliation',
      'Multi-currency support and fraud protection'
    ],
    image: '/images/MPESA.png',
    timeline: '3-6 weeks'
  },
  {
    id: 4,
    title: 'Mobile App Development',
    description: 'Custom mobile apps built to deliver smooth user experiences on Android and iOS.',
    features: [
      'Native iOS and Android apps',
      'Cross-platform development',
      'App Store optimization',
      'Push notifications',
      'Offline functionality',
      'Real-time synchronization'
    ],
    image: '/images/NOVATECH.png',
    video: '/vedio/vedio2.mp4',
    timeline: '6-14 weeks'
  },
  {
    id: 5,
    title: 'Search Engine Optimization',
    description: 'Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.',
    features: [
      'Keyword research and analysis',
      'On-page SEO optimization',
      'Technical SEO audits',
      'Content optimization',
      'Local SEO services',
      'Performance tracking and reporting'
    ],
    image: '/images/TECHNOVA3.png',
    timeline: '1-2 weeks'
  },
  {
    id: 6,
    title: 'IT Solutions & Support',
    description: 'Your trusted partner for innovative, reliable, and affordable tech solutions.',
    features: [
      '24/7 technical support',
      'Cloud infrastructure setup',
      'Network security solutions',
      'Data backup and recovery',
      'IT consulting and strategy',
      'Hardware procurement'
    ],
    image: '/images/TECHNOVA3.png',
    timeline: 'Ongoing support'
  }
]

const Services = () => {
  useDocumentTitle('IT & Software Development Services | Technova IT Solutions')
  const [selectedService, setSelectedService] = useState(services[0])
  const [showStartChoices, setShowStartChoices] = useState(false)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]">
          {/* Background (fixed image for Services hero) */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/djksfayfu/image/upload/v1750423764/blake-connally-B3l0g6HLxr8-unsplash_evasva.jpg')`,
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
                Build Your Business With Us Today
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed">
                Comprehensive technology solutions designed to transform your business and drive growth.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setShowStartChoices(true)}
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition"
                >
                  Get Started
                </button>
                <a
                  href="#services-list"
                  className="inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white hover:text-neutral-900 transition"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showStartChoices && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowStartChoices(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-neutral-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-neutral-900">How would you like to get started?</h3>
              <p className="mt-1 text-sm text-neutral-600">Choose an option below and we’ll take you there.</p>
            </div>
            <div className="space-y-3">
              <a
                href="https://calendly.com/technova446/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full rounded-md bg-blue-600 text-white px-4 py-3 text-sm font-medium hover:bg-blue-700 transition"
              >
                Schedule a Call
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition"
              >
                Contact Us
              </a>
            </div>
            <button
              type="button"
              onClick={() => setShowStartChoices(false)}
              className="mt-5 w-full text-sm text-neutral-500 hover:text-neutral-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      <section id="services-list" className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              From system modernization to mobile app development, we provide end-to-end technology solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Service Cards */}
            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    selectedService.id === service.id
                      ? 'bg-blue-50 border-blue-200 shadow-md'
                      : 'bg-white border-neutral-200 hover:border-blue-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div
                        className="w-8 h-8 bg-cover bg-center rounded"
                        style={{ backgroundImage: `url('${service.image}')` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-neutral-700 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span className="font-medium">{service.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <div className="mb-6">
                <div
                  className="w-full h-48 bg-cover bg-center rounded-xl mb-4"
                  style={{ backgroundImage: `url('${selectedService.image}')` }}
                />
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {selectedService.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                <div>
                  <p className="text-sm text-neutral-600">Timeline</p>
                  <p className="text-xl font-bold text-neutral-900">{selectedService.timeline}</p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 bg-white">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              We follow a proven methodology to ensure your project is delivered on time, within budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We understand your business needs, goals, and technical requirements.'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Detailed project roadmap with timelines, milestones, and deliverables.'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Agile development with regular updates and feedback cycles.'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Testing, deployment, training, and ongoing support for your solution.'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 bg-gradient-to-r from-neutral-900 via-blue-900 to-neutral-900">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Elevate Your Business?
            </h2>
            <p className="text-xl md:text-2xl text-neutral-200 mb-8 leading-relaxed">
              Join hundreds of satisfied clients who've transformed their operations with our cutting-edge solutions.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-300 mb-2">10+</div>
                <div className="text-white">Projects Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-300 mb-2">98%</div>
                <div className="text-white">Client Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-300 mb-2">24/7</div>
                <div className="text-white">Support Available</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4L3 20l4-4a8.014 8.014 0 01-4-7c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
                Start Your Project
              </a>
              <a
                href="https://calendly.com/technova-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-neutral-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Services
