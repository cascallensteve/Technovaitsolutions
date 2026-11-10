import { useState } from 'react'
import { registerForClass, type ClassRegistrationPayload } from '../services/classesService'

type Props = {
  classSlug: string
  classTitle: string
  onRegistered?: () => void
}

const ClassRegistrationForm = ({ classSlug, classTitle, onRegistered }: Props) => {
  const [formData, setFormData] = useState({
    full_name: '',
    whatsapp: '',
    email: '',
    prior_knowledge: '' as '' | 'yes' | 'no',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetForm = () => {
    setFormData({ full_name: '', whatsapp: '', email: '', prior_knowledge: '', notes: '' })
    setSubmitError('')
    setSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    try {
      if (!formData.full_name.trim() || !formData.whatsapp.trim() || !formData.email.trim() || !formData.prior_knowledge) {
        setSubmitError('Please fill in all required fields.')
        setIsSubmitting(false)
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setSubmitError('Please enter a valid email address.')
        setIsSubmitting(false)
        return
      }

      const payload: ClassRegistrationPayload = {
        full_name: formData.full_name.trim(),
        whatsapp: formData.whatsapp.trim(),
        email: formData.email.trim(),
        prior_knowledge: formData.prior_knowledge,
        notes: formData.notes.trim(),
      }

      await registerForClass(classSlug, payload)
      setSubmitted(true)
      onRegistered?.()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setSubmitError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">Registration Successful!</h3>
          <p className="text-emerald-700 font-medium mb-1">Welcome to {classTitle}</p>
          <p className="text-neutral-600 text-sm md:text-base">Thank you for registering. We will contact you shortly with class details.</p>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          Register Another Person
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm break-words">{submitError}</div>
      )}

      <div className="min-w-0">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 break-words">{classTitle}</h2>
        <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-6 shadow">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Registration
        </div>
      </div>

      <div className="min-w-0">
        <label htmlFor="full_name" className="block text-sm font-medium text-neutral-900 mb-2">Full Name *</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          required
          value={formData.full_name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your full name"
        />
      </div>

      <div className="min-w-0">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-neutral-900 mb-2">WhatsApp Number *</label>
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
        <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">Email Address *</label>
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
        <label htmlFor="prior_knowledge" className="block text-sm font-medium text-neutral-900 mb-2">Do you have prior coding knowledge? *</label>
        <select
          id="prior_knowledge"
          name="prior_knowledge"
          required
          value={formData.prior_knowledge}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="min-w-0">
        <label htmlFor="notes" className="block text-sm font-medium text-neutral-900 mb-2">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Anything we should know?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Register Now'}
      </button>
    </form>
  )
}

export default ClassRegistrationForm
