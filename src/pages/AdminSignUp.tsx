import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'

const AdminSignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'password') {
      let strength = 0
      if (value.length >= 8) strength++
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++
      if (/\d/.test(value)) strength++
      if (/[^a-zA-Z\d]/.test(value)) strength++
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields')
        setIsLoading(false)
        return
      }
      if (formData.username.length < 3) {
        setError('Username must be at least 3 characters long')
        setIsLoading(false)
        return
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
        setError('Username can only contain letters, numbers, underscores, and hyphens')
        setIsLoading(false)
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address')
        setIsLoading(false)
        return
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long')
        setIsLoading(false)
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }
      if (!formData.agreeToTerms) {
        setError('You must agree to the terms and conditions')
        setIsLoading(false)
        return
      }

      // Call the admin signup API (respects VITE_API_URL or uses /api proxy in dev)
      const result = await authService.signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword,
      })

      if (!result?.success) {
        setError(result?.message || 'Admin sign up failed')
        setIsLoading(false)
        return
      }

      navigate('/admin/dashboard')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100">
            <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">Create Admin Account</h1>
            <p className="text-neutral-600 text-center mb-8">Register an administrator account to manage Technova</p>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="admin_technova" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="admin@technova.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="********" />
                <div className="mt-1 h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div className={`h-full ${passwordStrength >= 1 ? 'bg-red-400' : 'bg-transparent'} ${passwordStrength >= 2 ? 'bg-yellow-400' : ''} ${passwordStrength >= 3 ? 'bg-green-400' : ''} ${passwordStrength >= 4 ? 'bg-emerald-600' : ''}`} style={{ width: `${(passwordStrength/4)*100}%` }}></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="********" />
              </div>
              <div className="flex items-center">
                <input id="agree" type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="h-4 w-4 text-green-600 border-neutral-300 rounded" />
                <label htmlFor="agree" className="ml-2 block text-sm text-neutral-700">I agree to the Terms and Privacy Policy</label>
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50">
                {isLoading ? 'Creating account...' : 'Create Admin Account'}
              </button>
              <p className="text-center text-sm text-neutral-600">Already have an account? <a className="text-green-700 hover:underline" href="/admin/signin">Admin Sign in</a></p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminSignUp
