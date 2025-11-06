import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'

const AdminSignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      if (location.state?.email) setEmail(location.state.email)
    }
  }, [location.state])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsLoading(true)
    try {
      if (!email || !password) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address')
        setIsLoading(false)
        return
      }
      // Reuse existing sign-in flow (backend can assert admin role)
      const response = await authService.signIn({ email, password })
      if (response.success) {
        navigate('/admin')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(message)
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
            <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">Admin Sign In</h1>
            <p className="text-neutral-600 text-center mb-8">Welcome back, please sign in to continue</p>

            {successMessage && <div className="mb-4 rounded-md bg-emerald-50 border border-emerald-200 p-3 text-emerald-700 text-sm">{successMessage}</div>}
            {error && <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="admin@technova.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="********" />
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-center text-sm text-neutral-600">No admin account? <a className="text-green-700 hover:underline" href="/admin/signup">Create one</a></p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminSignIn
