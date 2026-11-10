import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import ClassRegistrationForm from '../components/ClassRegistrationForm'
import { retrievePublicClass, type TrainingClass } from '../services/classesService'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const FALLBACK_HERO = 'https://res.cloudinary.com/djksfayfu/image/upload/v1786870054/college-student-looks-copy-space-laptop-while-collecting-notes_rjkwk3.webp'

const ClassDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [trainingClass, setTrainingClass] = useState<TrainingClass | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useDocumentTitle(trainingClass ? `${trainingClass.title} | Technova IT Solutions` : 'Class | Technova IT Solutions')

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!slug) {
        setError('Missing class slug')
        setLoading(false)
        return
      }
      setLoading(true)
      setError('')
      try {
        const data = await retrievePublicClass(slug)
        if (!cancelled) setTrainingClass(data)
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load class')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <section className="py-24 text-center text-neutral-600">Loading class...</section>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  if (error || !trainingClass) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <section className="py-24 px-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">Class not found</h1>
          <p className="text-neutral-600 mb-6">{error || 'The class you are looking for does not exist or is not published.'}</p>
          <Link to="/classes" className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Back to Classes
          </Link>
        </section>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  const heroImage = trainingClass.banner_image || trainingClass.image || FALLBACK_HERO
  const features = Array.isArray(trainingClass.features) ? trainingClass.features : []
  const requirements = Array.isArray(trainingClass.requirements) ? trainingClass.requirements : []
  const registrationOpen = trainingClass.registration_open !== false

  const metaItems = [
    trainingClass.price ? { label: 'Price', value: trainingClass.price } : null,
    trainingClass.duration ? { label: 'Duration', value: trainingClass.duration } : null,
    trainingClass.schedule ? { label: 'Schedule', value: trainingClass.schedule } : null,
    trainingClass.location ? { label: 'Location', value: trainingClass.location } : null,
    trainingClass.instructor ? { label: 'Instructor', value: trainingClass.instructor } : null,
    trainingClass.capacity ? { label: 'Capacity', value: String(trainingClass.capacity) } : null,
    trainingClass.start_date ? { label: 'Start date', value: new Date(trainingClass.start_date).toLocaleDateString() } : null,
    trainingClass.end_date ? { label: 'End date', value: new Date(trainingClass.end_date).toLocaleDateString() } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Navbar />

      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${heroImage}')`,
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
                {trainingClass.badge || 'Certified Training'}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md leading-tight">
                {trainingClass.title}
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed">
                {trainingClass.short_description || trainingClass.description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {registrationOpen ? (
                  <a
                    href="#registration-form"
                    className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition"
                  >
                    Register Now
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center rounded-md bg-neutral-200 px-6 py-3 text-base font-medium text-neutral-700">
                    Registration Closed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">About this class</h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {trainingClass.content || trainingClass.description}
                </p>
              </div>

              {metaItems.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Class details</h2>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {metaItems.map(item => (
                      <div key={item.label} className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{item.label}</dt>
                        <dd className="mt-1 text-sm font-medium text-neutral-900">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {features.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">What you will learn</h2>
                  <ul className="space-y-2 text-neutral-700">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirements.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Requirements</h2>
                  <ul className="space-y-2 text-neutral-700">
                    {requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="min-w-0 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-8 min-w-0" id="registration-form">
                {registrationOpen ? (
                  <ClassRegistrationForm classSlug={trainingClass.slug} classTitle={trainingClass.title} />
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Registration Closed</h3>
                    <p className="text-neutral-600">Registrations for this class are currently closed.</p>
                  </div>
                )}
              </div>

              {trainingClass.image && (
                <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border border-black/10">
                  <img src={trainingClass.image} alt={trainingClass.title} className="w-full h-auto object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default ClassDetail
