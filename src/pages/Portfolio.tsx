import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

type PortfolioProject = {
  id: number
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  timeline: string
  client: string
  url?: string
}

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Brand Decor Interior Design Platform',
    category: 'Web Development',
    description: 'Modern interior design showcase platform with responsive design, featuring beautiful collections and seamless user experience across desktop and mobile devices.',
    image: '/images/brand decor interior.png',
    url: 'https://brand-decor-interior-ten.vercel.app/',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
    features: [
      'Responsive design showcase',
      'Interior design collections',
      'Modern UI/UX',
      'Mobile-first approach',
      'Interactive galleries'
    ],
    timeline: '6 weeks',
    client: 'Brand Decor Interior'
  },
  {
    id: 2,
    title: 'Empower Ministry Digital Platform',
    category: 'Web Development',
    description: 'Digital portfolio support system with contact management and communication tools, empowering ministries with modern web presence.',
    image: '/images/rpl system.png',
    url: 'https://rpl-kingdom-equipers-agdo.vercel.app/',
    technologies: ['React', 'Node.js', 'Contact Forms', 'Digital Portfolio'],
    features: [
      'Digital portfolio management',
      'Contact form integration',
      'Ministry communication tools',
      'Modern web presence',
      'Mobile-responsive design'
    ],
    timeline: '8 weeks',
    client: 'Empower Ministry'
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.',
    image: '/images/gems.png',
    url: 'https://www.gemsofinsight.com/',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    features: [
      'Real-time inventory tracking',
      'Secure payment gateway',
      'Admin dashboard',
      'Mobile-responsive design',
      'SEO optimization'
    ],
    timeline: '8 weeks',
    client: 'RetailCorp Kenya'
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    category: 'Mobile App Development',
    description: 'A secure mobile banking application with M-Pesa integration, biometric authentication, and real-time transaction monitoring.',
    image: '/images/MPESA.png',
    technologies: ['React Native', 'Firebase', 'M-Pesa API', 'Biometric Auth'],
    features: [
      'M-Pesa integration',
      'Biometric authentication',
      'Real-time notifications',
      'Transaction history',
      'Budget tracking'
    ],
    timeline: '12 weeks',
    client: 'FinanceFirst Bank'
  },
  {
    id: 5,
    title: 'Hospital Management System',
    category: 'System Revamp',
    description: 'Complete modernization of legacy hospital management system with patient records, appointment scheduling, and billing integration.',
    image: '/images/extern .png',
    url: 'https://well-path.vercel.app/',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    features: [
      'Patient record management',
      'Appointment scheduling',
      'Billing integration',
      'Staff management',
      'Report generation'
    ],
    timeline: '16 weeks',
    client: 'Nairobi General Hospital'
  },
  {
    id: 6,
    title: 'School Management Portal',
    category: 'Web Development',
    description: 'Comprehensive school management system with student portals, grade tracking, and parent communication features.',
    image: '/images/TECHNOVA3.png',
    technologies: ['Angular', 'Express.js', 'PostgreSQL', 'Socket.io'],
    features: [
      'Student grade tracking',
      'Parent communication portal',
      'Teacher dashboard',
      'Assignment management',
      'Attendance tracking'
    ],
    timeline: '10 weeks',
    client: 'Greenfield Academy'
  },
  {
    id: 7,
    title: 'Logistics Tracking App',
    category: 'Mobile App Development',
    description: 'Real-time logistics tracking application with GPS integration, delivery notifications, and route optimization.',
    image: '/images/NOVATECH.png',
    technologies: ['Flutter', 'Google Maps API', 'Firebase', 'Push Notifications'],
    features: [
      'Real-time GPS tracking',
      'Route optimization',
      'Delivery notifications',
      'Driver management',
      'Customer portal'
    ],
    timeline: '14 weeks',
    client: 'SwiftDelivery Ltd'
  },
  {
    id: 8,
    title: 'Restaurant POS System',
    category: 'System Integration',
    description: 'Modern point-of-sale system with inventory management, staff scheduling, and integrated payment processing.',
    image: '/images/MPESA.png',
    technologies: ['React', 'Node.js', 'SQLite', 'M-Pesa API'],
    features: [
      'Order management',
      'Inventory tracking',
      'Staff scheduling',
      'Payment processing',
      'Sales analytics'
    ],
    timeline: '6 weeks',
    client: 'Urban Eats Restaurant'
  }
]

const categories = ['All', 'Web Development', 'Mobile App Development', 'System Revamp', 'System Integration']

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(projects[0])

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
          {/* Background */}
          <div className="absolute inset-0">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/vedio/vedio.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center py-16 px-4 md:px-6 lg:px-16">
            <div className="text-white text-left max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md leading-tight">
                Start Your Business
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed">
                Showcasing successful projects that have transformed businesses across Kenya and beyond.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition"
                >
                  Start Your Project
                </a>
                <a
                  href="#portfolio-grid"
                  className="inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white hover:text-neutral-900 transition"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio-grid" className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              From web applications to mobile apps, we've delivered innovative solutions across various industries.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-neutral-700 hover:bg-purple-50 border border-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Project Cards */}
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    selectedProject.id === project.id
                      ? 'bg-purple-50 border-purple-200 shadow-md'
                      : 'bg-white border-neutral-200 hover:border-purple-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-lg overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${project.image}')` }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-neutral-700 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span className="font-medium">{project.client}</span>
                        <span>•</span>
                        <span>{project.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 sticky top-8">
              <div className="mb-6">
                {selectedProject.url ? (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className="w-full h-64 bg-cover bg-center rounded-xl mb-4"
                      style={{ backgroundImage: `url('${selectedProject.image}')` }}
                    />
                  </a>
                ) : (
                  <div
                    className="w-full h-64 bg-cover bg-center rounded-xl mb-4"
                    style={{ backgroundImage: `url('${selectedProject.image}')` }}
                  />
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {selectedProject.description}
                </p>
                <div className="text-sm text-neutral-600 mb-4">
                  <span className="font-medium">Client: </span>{selectedProject.client}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                  Key Features:
                </h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                <div>
                  <p className="text-sm text-neutral-600">Project Timeline</p>
                  <p className="text-xl font-bold text-neutral-900">{selectedProject.timeline}</p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  Start Similar Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-white">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
            Let's discuss how we can bring your vision to life with innovative technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
            >
              Get Started Today
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-md border-2 border-purple-600 bg-transparent px-8 py-3 text-base font-medium text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Portfolio
