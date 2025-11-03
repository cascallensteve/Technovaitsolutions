import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'

const SignUp = () => {
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

    // Calculate password strength
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
      // Validation
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

      // Call the signup API
      const response = await authService.signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword,
      })

      if (response.success) {
        // Send verification email via backend
        try {
          await authService.sendVerificationEmail(formData.email)
        } catch (verificationError) {
          console.error('Failed to send verification email:', verificationError)
        }
        
        // Redirect to email verification page
        setTimeout(() => {
          navigate('/verify-email', { 
            state: { 
              email: formData.email,
              message: 'Sign up successful! Please check your email to verify your account.'
            } 
          })
        }, 500)
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-neutral-300'
    if (passwordStrength === 1) return 'bg-red-500'
    if (passwordStrength === 2) return 'bg-yellow-500'
    if (passwordStrength === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength === 1) return 'Weak'
    if (passwordStrength === 2) return 'Fair'
    if (passwordStrength === 3) return 'Good'
    return 'Strong'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 my-auto items-center">
          {/* Right: Welcome Image (appears first on mobile, second on desktop) */}
          <div className="hidden lg:flex items-center justify-center order-2 lg:order-2">
            <div className="relative w-full max-w-md">
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-100 rounded-full opacity-50"></div>
              
              {/* Main card */}
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-neutral-100">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">Join Our Community</h2>
                  <p className="text-neutral-600 text-sm">Start your journey with Technova today</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-neutral-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">500+</p>
                    <p className="text-xs text-neutral-600">Happy Clients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">10+</p>
                    <p className="text-xs text-neutral-600">Years Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">24/7</p>
                    <p className="text-xs text-neutral-600">Support</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-neutral-700">Instant account setup</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-neutral-700">Full access to services</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-neutral-700">Premium support included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left: Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 order-1 lg:order-1">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Create Account</h1>
              <p className="text-neutral-600 text-sm">Join Technova and transform your business</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="john_doe"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
                <p className="text-xs text-neutral-500 mt-1">Letters, numbers, underscores, and hyphens only</p>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-microsoft-purple focus:border-transparent transition"
                />
              </div>


              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-microsoft-purple focus:border-transparent transition"
                />
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-neutral-600">{getPasswordStrengthText()}</span>
                    </div>
                    <p className="text-xs text-neutral-500">
                      Use 8+ characters with uppercase, lowercase, numbers, and symbols
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-microsoft-purple focus:border-transparent transition"
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-neutral-300 text-microsoft-purple focus:ring-microsoft-purple mt-1"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-neutral-700">
                  I agree to the{' '}
                  <a href="#" className="text-microsoft-purple hover:underline font-medium">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-microsoft-purple hover:underline font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-300"></div>
              <span className="text-sm text-neutral-500">or</span>
              <div className="flex-1 h-px bg-neutral-300"></div>
            </div>

            {/* Social Sign Up */}
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

            {/* Sign In Link */}
            <p className="text-center text-neutral-600 text-sm mt-6">
              Already have an account?{' '}
              <a href="/signin" className="text-microsoft-purple font-semibold hover:underline">
                Sign in
              </a>
            </p>
          </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignUp
