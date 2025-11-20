import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const EmailVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  useDocumentTitle('Verify Your Email | Technova IT Solutions Admin')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [resendCount, setResendCount] = useState(0)
  const [canResend, setCanResend] = useState(true)
  const [countdown, setCountdown] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const redirectTo = (location.state as any)?.redirectTo || '/admin/signin'

  useEffect(() => {
    // Get email from navigation state
    if (location.state?.email) {
      setEmail(location.state.email)
      setMessage(location.state.message || 'Verification email sent! Please check your inbox.')
    } else {
      // Redirect to admin signup if no email provided
      navigate('/admin/signup')
    }
  }, [location.state, navigate])

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !canResend) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!token.trim()) {
        setError('Please enter the verification code')
        setIsLoading(false)
        return
      }

      if (token.length !== 6) {
        setError('Verification code must be 6 digits')
        setIsLoading(false)
        return
      }

      // Verify token using backend API
      const result = await authService.verifyEmail(token)

      if (!result.success) {
        setError(result.message)
        setIsLoading(false)
        return
      }

      // Success
      setIsVerified(true)
      setMessage('✓ Email verified successfully!')
      
      // Redirect to signin after 2 seconds
      setTimeout(() => {
        navigate(redirectTo, {
          state: {
            email: email,
            message: 'Email verified! You can now sign in.'
          }
        })
      }, 2000)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    setCanResend(false)
    setCountdown(60)
    setResendCount(resendCount + 1)

    try {
      // Resend verification email via backend
      const result = await authService.resendVerificationEmail(email)
      setMessage(result.message)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend email. Please try again.'
      setMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinueToLogin = () => {
    navigate(redirectTo, {
      state: {
        email: email,
        message: 'Please verify your email first by clicking the link in your inbox, then sign in.'
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Verify Your Email</h1>
              <p className="text-neutral-600">We've sent a verification link to your email</p>
            </div>

            {/* Message */}
            {message && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium">{message}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Display */}
            <div className="mb-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <p className="text-xs text-neutral-600 mb-1">Verification email sent to:</p>
              <p className="text-lg font-semibold text-neutral-900 break-all">{email}</p>
            </div>

            {/* Verification Code Input */}
            {!isVerified && (
              <form onSubmit={handleVerifyToken} className="mb-8">
                <div className="mb-4">
                  <label htmlFor="token" className="block text-sm font-medium text-neutral-700 mb-2">
                    Enter 6-Digit Verification Code
                  </label>
                  <input
                    id="token"
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={token}
                    onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-neutral-600 mt-2">Check your email for the 6-digit code</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || token.length !== 6}
                  className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                </button>
              </form>
            )}

            {/* Instructions */}
            <div className="mb-8 space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Check your inbox</p>
                  <p className="text-sm text-neutral-600">Look for an email from Technova</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Click the verification link</p>
                  <p className="text-sm text-neutral-600">This will confirm your email address</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Return to sign in</p>
                  <p className="text-sm text-neutral-600">Log in with your verified email</p>
                </div>
              </div>
            </div>

            {/* Resend Email Button */}
            <button
              onClick={handleResendEmail}
              disabled={!canResend || isLoading}
              className="w-full mb-4 px-4 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : canResend ? 'Resend Verification Email' : `Resend in ${countdown}s`}
            </button>

            {/* Continue to Login Button */}
            <button
              onClick={handleContinueToLogin}
              className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Continue to Sign In
            </button>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Didn't receive the email?</strong> Check your spam folder or{' '}
                <button
                  onClick={handleResendEmail}
                  disabled={!canResend}
                  className="text-blue-600 hover:underline font-semibold disabled:opacity-50"
                >
                  request a new one
                </button>
              </p>
            </div>

            {/* Contact Support */}
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                Need help?{' '}
                <a href="/contact" className="text-green-600 hover:underline font-semibold">
                  Contact support
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

export default EmailVerification
