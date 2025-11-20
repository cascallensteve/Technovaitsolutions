import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useState } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const projectTypeLabels: Record<string, string> = {
  'web-suite': 'Build a web suite',
  'system-revamp': 'Revamp your system',
  consultation: 'Seek consultation',
}

const StartProject = () => {
  const [searchParams] = useSearchParams()
  const initialType = searchParams.get('type') || 'web-suite'
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: initialType,
    budget: '',
    timeline: '',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useDocumentTitle('Start a Project | Technova IT Solutions')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const label = projectTypeLabels[formState.projectType] || 'Start a project with Technova'

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh]">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/djksfayfu/image/upload/v1750423764/blake-connally-B3l0g6HLxr8-unsplash_evasva.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          </div>
          <div className="relative z-10 w-full h-full flex items-center py-16 px-4 md:px-6 lg:px-16">
            <div className="text-white text-left max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-md leading-tight">
                Tell us about your project
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl">
                Share a few details about what you want to build and well get back to you with the best way to move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="project-form" className="w-full py-12 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{label}</h2>
            <p className="text-neutral-600 mb-6">
              Fill in the form below and our team will review your request and respond as soon as possible.
            </p>

            {submitted && (
              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Thank you for sharing your project details. Well review your request and get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-1" htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-1" htmlFor="phone">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. +254 712 665 257"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-1" htmlFor="projectType">
                    What do you want to do?
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="web-suite">Build a web suite</option>
                    <option value="system-revamp">Revamp my system</option>
                    <option value="consultation">Seek consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-1" htmlFor="budget">
                    Estimated budget (optional)
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    value={formState.budget}
                    onChange={handleChange}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. KES 100,000 - 300,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-800 mb-1" htmlFor="timeline">
                    Ideal timeline (optional)
                  </label>
                  <input
                    id="timeline"
                    name="timeline"
                    value={formState.timeline}
                    onChange={handleChange}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 4-8 weeks"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1" htmlFor="details">
                  Tell us about your project
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formState.details}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  placeholder="Share what you want to build, your goals, who will use it, and any specific features you have in mind."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Submit project details
                </button>
                <p className="text-xs text-neutral-500 max-w-xs">
                  By submitting, you agree that Technova may contact you to discuss your project in more detail.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default StartProject
