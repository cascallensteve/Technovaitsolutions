import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'

const SignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Check if there's a success message from signup redirect
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      if (location.state?.username) {
        setUsername(location.state.username)
      }
    }
  }, [location.state])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsLoading(true)

    try {
      // Validation
      if (!username || !password) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }
      
      if (username.trim().length < 3) {
        setError('Username must be at least 3 characters long')
        setIsLoading(false)
        return
      }

      // Call the signin API
      const response = await authService.signIn({
        username,
        password,
      })

      if (response.success) {
        // Redirect to profile page
        setTimeout(() => {
          navigate('/profile')
        }, 500)
      }
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
      
      <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Welcome Back</h1>
              <p className="text-neutral-600 text-sm">Sign in to your Technova account</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                    Password
                  </label>
                  <a href="#" className="text-sm text-green-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-neutral-700">
                  Remember me
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-300"></div>
              <span className="text-sm text-neutral-500">or</span>
              <div className="flex-1 h-px bg-neutral-300"></div>
            </div>

            {/* Social Sign In */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-neutral-700 font-medium">Google</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-neutral-700 font-medium">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-neutral-600 text-sm mt-6">
              Don't have an account?{' '}
              <a href="/signup" className="text-green-600 font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignIn
