import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const servicesData = [
  {
    id: 1,
    title: 'System Revamp',
    slug: 'system-revamp',
    description: 'Upgrade your old systems with modern, efficient, and scalable solutions.',
    longDescription: 'Transform your legacy systems into modern, efficient, and scalable solutions that drive business growth. Our comprehensive system revamp services ensure your technology infrastructure meets current industry standards while preparing for future expansion.',
    features: [
      'Legacy system modernization',
      'Database migration and optimization',
      'Performance enhancement',
      'Security updates and compliance',
      'User interface redesign',
      'Integration with modern APIs'
    ],
    benefits: [
      'Improved system performance and reliability',
      'Enhanced security and compliance',
      'Reduced maintenance costs',
      'Better user experience',
      'Scalability for future growth',
      'Integration with modern tools'
    ],
    process: [
      'System Analysis & Assessment',
      'Migration Strategy Planning',
      'Development & Testing',
      'Deployment & Training',
      'Ongoing Support & Maintenance'
    ],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762519932/5056412_bmtdqq.jpg',
    video: '',
    timeline: '5-12 weeks',
    pricing: ''
  },
  {
    id: 2,
    title: 'Web Development',
    slug: 'web-development',
    description: 'We design and build fast, secure, and responsive websites that grow your business.',
    longDescription: 'Create stunning, high-performance websites that engage your audience and drive conversions. Our web development services combine cutting-edge technology with beautiful design to deliver exceptional user experiences.',
    features: [
      'Custom website development',
      'E-commerce solutions',
      'Content Management Systems',
      'Progressive Web Apps (PWA)',
      'SEO optimization',
      'Mobile-responsive design'
    ],
    benefits: [
      'Increased online visibility',
      'Better user engagement',
      'Higher conversion rates',
      'Mobile-first approach',
      'SEO-optimized structure',
      'Fast loading speeds'
    ],
    process: [
      'Requirements Gathering',
      'Design & Prototyping',
      'Development & Integration',
      'Testing & Optimization',
      'Launch & Maintenance'
    ],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762519932/5056412_bmtdqq.jpg',
    timeline: '4-10 weeks',
    pricing: ''
  },
  {
    id: 3,
    title: 'Payment Integration',
    slug: 'mpesa-integration',
    description: 'Unified payment integration for KCB, M-Pesa, Jenga, Buni, Paystack and more, giving your customers flexible, secure ways to pay.',
    longDescription: 'Connect your business to multiple payment providers through one clean integration. Our Payment Integration service covers KCB, M-Pesa, Jenga, Buni, Paystack and other gateways so you can accept payments from your customers wherever they are, with secure processing and clear reporting.',
    features: [
      'KCB online and mobile banking payment integration',
      'M-Pesa API & STK push integration',
      'Jenga payment API integration',
      'Buni and Paystack gateway configuration',
      'Real-time transaction monitoring & automated reconciliation',
      'Multi-currency support and fraud protection rules'
    ],
    benefits: [
      'More payment options for your customers',
      'Faster and more reliable transaction processing',
      'Reduced payment friction across web and mobile',
      'Improved security and compliance',
      'Real-time notifications and detailed reporting',
      'Easier scaling as your business and transaction volumes grow'
    ],
    process: [
      'Business Requirements Analysis',
      'API Integration Setup',
      'Security Implementation',
      'Testing & Validation',
      'Go-Live & Support'
    ],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762519932/5056412_bmtdqq.jpg',
    timeline: '3-6 weeks',
    pricing: ''
  },
  {
    id: 4,
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    description: 'Custom mobile apps built to deliver smooth user experiences on Android and iOS.',
    longDescription: 'Develop powerful mobile applications that engage users and drive business growth. Our mobile app development services cover both native and cross-platform solutions with focus on performance and user experience.',
    features: [
      'Native iOS and Android apps',
      'Cross-platform development',
      'App Store optimization',
      'Push notifications',
      'Offline functionality',
      'Real-time synchronization'
    ],
    benefits: [
      'Reach mobile-first audience',
      'Enhanced user engagement',
      'Brand visibility',
      'Direct customer communication',
      'Increased sales opportunities',
      'Competitive advantage'
    ],
    process: [
      'Concept & Strategy',
      'UI/UX Design',
      'Development & Testing',
      'App Store Submission',
      'Launch & Marketing Support'
    ],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762519932/5056412_bmtdqq.jpg',
    video: '',
    timeline: '6-14 weeks',
    pricing: ''
  },
  {
    id: 5,
    title: 'Search Engine Optimization',
    slug: 'seo-services',
    description: 'Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.',
    longDescription: 'Increase your website\'s visibility in search engines and drive qualified organic traffic to your business. Our comprehensive SEO strategies are designed to improve your search rankings, enhance user experience, and deliver measurable results that grow your business.',
    features: [
      'Keyword research and analysis',
      'On-page SEO optimization',
      'Technical SEO audits',
      'Content optimization',
      'Local SEO services',
      'Performance tracking and reporting'
    ],
    benefits: [
      'Increased organic traffic',
      'Higher search engine rankings',
      'Better user experience',
      'Improved brand visibility',
      'Higher conversion rates',
      'Long-term sustainable growth'
    ],
    process: [
      'SEO Audit & Analysis',
      'Strategy Development',
      'Implementation & Optimization',
      'Content Creation & Optimization',
      'Monitoring & Reporting'
    ],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762519932/5056412_bmtdqq.jpg',
    timeline: '1-2 weeks',
    pricing: ''
  },
  {
    id: 6,
    title: 'IT Solutions & Support',
    slug: 'it-solutions-support',
    description: 'Your trusted partner for innovative, reliable, and affordable tech solutions.',
    longDescription: 'Comprehensive IT solutions and support services to keep your business running smoothly. From infrastructure setup to ongoing maintenance, we provide reliable technology support that scales with your business.',
    features: [
      '24/7 technical support',
      'Cloud infrastructure setup',
      'Network security solutions',
      'Data backup and recovery',
      'IT consulting and strategy',
      'Hardware procurement'
    ],
    benefits: [
      'Reduced downtime',
      'Enhanced security',
      'Cost-effective solutions',
      'Expert guidance',
      'Scalable infrastructure',
      'Peace of mind'
    ],
    process: [
      'IT Assessment',
      'Solution Design',
      'Implementation',
      'Training & Documentation',
      'Ongoing Support'
    ],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762519932/5056412_bmtdqq.jpg',
    timeline: 'Ongoing support',
    pricing: ''
  }
]

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState('overview')

  const service = servicesData.find((s) => s.slug === slug) || null

  if (!service) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Service Not Found</h1>
            <p className="text-lg text-neutral-700 mb-8">The service you're looking for doesn't exist.</p>
            <a
              href="/services"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Services
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh]">
          {/* Background */}
          <div className="absolute inset-0">
            {service.video ? (
              <>
                <video
                  key={service.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={service.video} type="video/mp4" />
                </video>
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/djksfayfu/image/upload/v1761824525/a_happy_African_lady_looking_forward__wearing_a_yellow_sweater_with__Technova__written_on_it__holdin_qicwid.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </>
            ) : (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/djksfayfu/image/upload/v1761824525/a_happy_African_lady_looking_forward__wearing_a_yellow_sweater_with__Technova__written_on_it__holdin_qicwid.webp')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-end md:items-center justify-center md:justify-start py-8 md:py-12 px-4 md:px-6 lg:px-16">
            <div className="text-white w-full max-w-4xl md:max-w-3xl lg:max-w-4xl">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5 md:p-6 lg:p-8 shadow-lg ring-1 ring-white/10">
                <div className="mb-4 flex justify-center md:justify-start">
                  <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold ring-1 ring-white/30">
                    Professional Service
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md leading-tight text-center md:text-left">
                  {service.title}
                </h1>
                <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto md:mx-0 drop-shadow leading-relaxed text-center md:text-left">
                  {service.longDescription}
                </p>
                <div className="mt-6 md:mt-8 flex flex-row flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition flex-1 basis-1/2 md:flex-none md:basis-auto"
                  >
                    Get Started
                  </a>
                  <a
                    href="#service-details"
                    className="inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white hover:text-neutral-900 transition flex-1 basis-1/2 md:flex-none md:basis-auto"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section id="service-details" className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-200">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features' },
              { id: 'benefits', label: 'Benefits' },
              { id: 'process', label: 'Process' },
              ...(service?.pricing ? [{ id: 'pricing', label: 'Pricing' }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Service Overview</h3>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  {service.longDescription}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-3">Timeline</h4>
                    <p className="text-neutral-700">{service.timeline}</p>
                  </div>
                  {service.pricing && (
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900 mb-3">Starting Price</h4>
                      <p className="text-neutral-700">{service.pricing}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Process</h3>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-neutral-900 mb-1">{step}</h4>
                        <p className="text-neutral-700">
                          {index === 0 && 'We analyze your current setup and identify improvement opportunities.'}
                          {index === 1 && 'We create a detailed plan tailored to your specific needs and goals.'}
                          {index === 2 && 'Our team implements the solution with regular updates and feedback.'}
                          {index === 3 && 'We ensure smooth deployment and provide comprehensive training.'}
                          {index === 4 && 'Ongoing support and maintenance to ensure optimal performance.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.pricing && activeTab === 'pricing' && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Pricing Information</h3>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">{service.pricing}</h4>
                  <p className="text-blue-800">
                    Our pricing is competitive and transparent. The final cost depends on your specific requirements and project scope.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h5 className="font-semibold text-neutral-900 mb-2">Free Consultation</h5>
                    <p className="text-neutral-700 text-sm">Initial discussion about your needs</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-semibold text-neutral-900 mb-2">Custom Quote</h5>
                    <p className="text-neutral-700 text-sm">Tailored pricing based on requirements</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-semibold text-neutral-900 mb-2">Flexible Payment</h5>
                    <p className="text-neutral-700 text-sm">Payment plans available</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Let's discuss how our {service.title.toLowerCase()} service can help transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
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
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default ServiceDetail
