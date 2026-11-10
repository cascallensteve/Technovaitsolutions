import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { registerForClass } from '../services/classesService'

const PythonDjangoClass = () => {
  useDocumentTitle('Python Backend Development with Django | Certified Training | Technova IT Solutions')

  const HERO_BG_URL = 'https://res.cloudinary.com/djksfayfu/image/upload/v1786887264/html-css-collage-concept_1_1_iaxsnj.webp'
  const POSTER_URL = 'https://res.cloudinary.com/djksfayfu/image/upload/v1786886129/Gemini_Generated_Image_31cu4k31cu4k31cu_kolvow.jpg'

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    priorKnowledge: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')
    setIsSubmitting(true)

    try {
      if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.email.trim() || !formData.priorKnowledge) {
        setSubmitError('Please fill in all fields.')
        setIsSubmitting(false)
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setSubmitError('Please enter a valid email address.')
        setIsSubmitting(false)
        return
      }

      await registerForClass('python-django', {
        full_name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email,
        prior_knowledge: formData.priorKnowledge as 'yes' | 'no',
        notes: '',
      })

      setSubmitSuccess('Registration successful! We will contact you shortly.')
      setFormData({ name: '', whatsapp: '', email: '', priorKnowledge: '' })
      setSubmitted(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setSubmitError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${HERO_BG_URL}')`,
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
                Python Backend Development with Django
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed">
                Master Python backend development with Django. 2 Months intensive training with a guided real-world project. Cost: KSh 6,000.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#registration-form"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration-form" className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Left: Registration Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-8 min-w-0">
              {submitted ? (
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V7.5m0 0a2.5 2.5 0 015 0v-1a2.5 2.5 0 015 0v3.5m0 0a2.5 2.5 0 01-5 0V13m0 0h-1a2.5 2.5 0 00-5 0v-1" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13a2.5 2.5 0 00-5 0v-1a2.5 2.5 0 00-5 0v3.5m0 0a2.5 2.5 0 015 0v-1a2.5 2.5 0 015 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Welcome to the Class! 🎉</h3>
                    <p className="text-emerald-700 font-medium mb-1">Registration successful!</p>
                    <p className="text-neutral-600 text-sm md:text-base">Thank you for joining us. We're excited to have you on board!</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-left max-w-sm mx-auto">
                    <h4 className="font-semibold text-emerald-900 mb-2 text-sm uppercase tracking-wide">What's Next?</h4>
                    <ul className="space-y-2 text-sm text-emerald-800">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>We will contact you shortly with class details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Make sure Python is installed on your laptop</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Bring your enthusiasm to learn Django! 🚀</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setSubmitSuccess('')
                      setSubmitError('')
                      setFormData({ name: '', whatsapp: '', email: '', priorKnowledge: '' })
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Register Another Person
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm break-words">{submitSuccess}</div>
                  )}
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm break-words">{submitError}</div>
                  )}

                  <div className="min-w-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 break-words">
                      Python Backend Development with Django
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-6 shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Certified Training
                    </div>
                  </div>

                  <div className="min-w-0">
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
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-neutral-900 mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 254712345678"
                    />
                  </div>

                  <div className="min-w-0">
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

                  <div className="min-w-0">
                    <label htmlFor="priorKnowledge" className="block text-sm font-medium text-neutral-900 mb-2">
                      Do you have prior coding knowledge? *
                    </label>
                    <select
                      id="priorKnowledge"
                      name="priorKnowledge"
                      required
                      value={formData.priorKnowledge}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Register Now'}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Poster */}
            <div className="min-w-0">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-black/10">
                <img
                  src={POSTER_URL}
                  alt="Python Backend Development with Django Poster"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default PythonDjangoClass
