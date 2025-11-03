// Backend API URL
const API_BASE_URL = 'https://technova-backend-seven.vercel.app'

interface SignUpRequest {
  username: string
  email: string
  password: string
  password_confirm: string
}

interface SignUpResponse {
  success: boolean
  data: {
    user_id: number
    username: string
    email: string
    token: string
    email_verification_sent: boolean
    message: string
  }
  message: string
}

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  success: boolean
  data: {
    user_id: number
    username: string
    email: string
    token: string
  }
  message: string
}

export const authService = {
  /**
   * Sign up a new user
   */
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/sign-up/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Log detailed error for debugging
        console.error('Sign up error:', {
          status: response.status,
          data: responseData
        })
        
        // Handle specific error messages
        if (responseData.errors) {
          const errorMessages = Object.entries(responseData.errors)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')
          throw new Error(errorMessages)
        }
        
        throw new Error(responseData.message || 'Sign up failed')
      }

      const result: SignUpResponse = responseData
      
      // Store token in localStorage
      if (result.data.token) {
        localStorage.setItem('authToken', result.data.token)
        localStorage.setItem('user', JSON.stringify({
          user_id: result.data.user_id,
          username: result.data.username,
          email: result.data.email,
        }))
      }

      return result
    } catch (error) {
      throw error
    }
  },

  /**
   * Sign in an existing user
   */
  async signIn(data: SignInRequest): Promise<SignInResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/sign-in/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 403 && responseData.errors?.email) {
          // Email not verified
          throw new Error(responseData.errors.email)
        }
        
        if (response.status === 401 && responseData.errors?.non_field_errors) {
          // Invalid credentials
          throw new Error(responseData.errors.non_field_errors[0] || 'Invalid username or password')
        }

        throw new Error(responseData.message || 'Sign in failed')
      }

      const result: SignInResponse = responseData
      
      // Store token in localStorage
      if (result.data.token) {
        localStorage.setItem('authToken', result.data.token)
        localStorage.setItem('user', JSON.stringify({
          user_id: result.data.user_id,
          username: result.data.username,
          email: result.data.email,
        }))
      }

      return result
    } catch (error) {
      throw error
    }
  },

  /**
   * Sign out the current user
   */
  signOut(): void {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  /**
   * Get the stored auth token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken')
  },

  /**
   * Get the stored user data
   */
  getUser(): { user_id: number; username: string; email: string } | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  /**
   * Send verification email
   */
  async sendVerificationEmail(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-verification-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('Send verification email error:', responseData)
        throw new Error(responseData.message || 'Failed to send verification email')
      }

      return {
        success: true,
        message: responseData.message || 'Verification email sent successfully',
      }
    } catch (error) {
      console.error('Error sending verification email:', error)
      throw error
    }
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        const errorMsg = responseData.errors?.token || responseData.message || 'Verification failed'
        throw new Error(errorMsg)
      }

      return {
        success: true,
        message: responseData.message || 'Email verified successfully',
      }
    } catch (error) {
      console.error('Error verifying email:', error)
      throw error
    }
  },

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('Resend verification email error:', responseData)
        throw new Error(responseData.message || 'Failed to resend verification email')
      }

      return {
        success: true,
        message: responseData.message || 'Verification email resent successfully',
      }
    } catch (error) {
      console.error('Error resending verification email:', error)
      throw error
    }
  },
}
