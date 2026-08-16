import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const Classes = () => {
  useDocumentTitle('Our Classes | Technova IT Solutions')

  const classes = [
    {
      id: 1,
      title: 'React Training Class',
      description: 'Master React.js from basics to advanced. Get certified and boost your career with hands-on projects.',
      image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1786868912/Blue_Gradient_React_Developer_Course_Facebook_Post_esjysp.png',
      href: '/react-training',
      cta: 'Enroll Now',
      badge: 'Certified Training',
      features: ['Hands-on Projects', 'Expert Instructors', 'Industry Certificate', 'KSh 4,000']
    },
    {
      id: 2,
      title: 'Git & GitHub Mastery Class',
      description: 'Free Class! Master version control with Git and GitHub. Learn branching, merging, pull requests, and collaborative workflows.',
      image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1786884182/magnific_modern-tech-poster-for-gi_gOyTLU0SXO_1_uokc6n.png',
      href: '/git-github-mastery',
      cta: 'Enroll Now',
      badge: 'Certified Training',
      features: ['Version Control', 'Collaborative Workflows', 'Industry Standard Tools', 'Free Class']
    },
    {
      id: 3,
      title: 'Python Backend Development with Django',
      description: 'Build robust backend systems with Python and Django. 2 Months intensive training with guided project. Cost: KSh 6,000.',
      image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1786886129/Gemini_Generated_Image_31cu4k31cu4k31cu_kolvow.jpg',
      href: '/python-django',
      cta: 'Enroll Now',
      badge: 'Certified Training',
      features: ['Python & Django', '2 Months Training', 'Guided Project', 'KSh 6,000']
    }
  ]

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/djksfayfu/image/upload/v1786870054/college-student-looks-copy-space-laptop-while-collecting-notes_rjkwk3.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          </div>
          <div className="relative z-10 w-full h-full flex items-center py-16 px-4 md:px-6 lg:px-16">
            <div className="text-white text-left max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Certified Training
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md leading-tight">
                Our Classes
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed">
                Explore our professional training programs designed to launch your tech career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-white rounded-2xl shadow-sm border border-black/10 overflow-hidden flex flex-col"
              >
                <a href={cls.href} className="block w-full h-64 overflow-hidden bg-neutral-100">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-full h-full object-contain"
                  />
                </a>
                <div className="p-6 flex flex-col flex-1">
                  <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-3 shadow w-fit">
                    {cls.badge}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{cls.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4 flex-1">{cls.description}</p>
                  <ul className="space-y-2 text-sm text-neutral-700 mb-6">
                    {cls.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={cls.href}
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    {cls.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Classes
