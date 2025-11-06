// Backend API base (token flow)
const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8000'

// Auth namespace
const AUTH_BASE = `${API_BASE}/auth`

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
    user_type?: string
    is_admin?: boolean
    is_staff?: boolean
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
    user_type?: string
    is_admin?: boolean
    is_staff?: boolean
  }
  message: string
}

export const authService = {
  /**
   * Sign up a new user
   */
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    try {
      const response = await fetch(`${AUTH_BASE}/sign-up/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('Sign up error:', {
          status: response.status,
          data: responseData,
        })

        if (responseData.errors) {
          const errorMessages = Object.entries(responseData.errors)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')
          throw new Error(errorMessages)
        }

        throw new Error(responseData.message || 'Sign up failed')
      }

      const result: SignUpResponse = responseData

      // Store token + user
      if (result.data.token) {
        localStorage.setItem('authToken', result.data.token)
        localStorage.setItem('adminToken', result.data.token)
        localStorage.setItem(
          'user',
          JSON.stringify({
            user_id: result.data.user_id,
            username: result.data.username,
            email: result.data.email,
            user_type: result.data.user_type,
            is_admin: result.data.is_admin,
            is_staff: result.data.is_staff,
          })
        )
        console.log('Auth token:', result.data.token)
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
      const response = await fetch(`${AUTH_BASE}/sign-in/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include', // important for session cookies
      })

      const ct = response.headers.get('content-type') || ''
      const responseData = ct.includes('application/json')
        ? await response.json()
        : { message: await response.text() }

      if (!response.ok) {
        if (response.status === 403 && responseData.errors?.email) {
          throw new Error(responseData.errors.email)
        }

        if (response.status === 401 && responseData.errors?.non_field_errors) {
          throw new Error(
            responseData.errors.non_field_errors[0] || 'Invalid username or password'
          )
        }

        throw new Error(responseData.message || 'Sign in failed')
      }

      const result: SignInResponse = responseData

      // Save token and user info
      if (result.data.token) {
        localStorage.setItem('authToken', result.data.token)
        localStorage.setItem(
          'user',
          JSON.stringify({
            user_id: result.data.user_id,
            username: result.data.username,
            email: result.data.email,
            user_type: result.data.user_type,
            is_admin: result.data.is_admin,
            is_staff: result.data.is_staff,
          })
        )
      }

      // --- Fetch verified profile for consistency ---
      await this.fetchAndStoreProfile(result?.data?.token)

      return result
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  },

  /**
   * Fetch and merge authenticated user profile
   */
  async fetchAndStoreProfile(token?: string) {
    const tokenForProfile =
      token ||
      localStorage.getItem('authToken') ||
      localStorage.getItem('adminToken')

    try {
      const profRes = await fetch(`${AUTH_BASE}/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(tokenForProfile ? { Authorization: `Bearer ${tokenForProfile}` } : {}),
        },
        credentials: 'include', // support cookie/session auth
      })

      if (profRes.ok) {
        const pct = profRes.headers.get('content-type') || ''
        const profile = pct.includes('application/json') ? await profRes.json() : {}

        const stored = localStorage.getItem('user')
        const current = stored ? JSON.parse(stored) : {}

        const merged = {
          ...current,
          user_id: profile.user_id ?? current.user_id,
          username: profile.username ?? current.username,
          email: profile.email ?? current.email,
          user_type: profile.user_type ?? current.user_type,
          is_admin: profile.is_admin ?? current.is_admin,
          is_staff: profile.is_staff ?? current.is_staff,
        }

        localStorage.setItem('user', JSON.stringify(merged))
      } else {
        console.warn('Failed to fetch profile:', profRes.status)
      }
    } catch (err) {
      console.warn('Profile fetch failed:', err)
    }
  },
// this is the local storage container for string the authentication token 
  /**
   * Sign out user
   */
  signOut(): void {
    localStorage.removeItem('authToken')
    localStorage.removeItem('adminToken')
    
  },

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken')
  },

  /**
   * Get stored user
   */
  getUser(): Record<string, any> | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Check authentication status
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  /**
   * Send verification email
   */
  async sendVerificationEmail(email: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${AUTH_BASE}/send-verification-email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to send verification email')
    return { success: true, message: data.message || 'Verification email sent successfully' }
  },

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${AUTH_BASE}/resend-verification-email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to resend verification email')
    return { success: true, message: data.message || 'Verification email resent successfully' }
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${AUTH_BASE}/verify-email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Verification failed')
    return { success: true, message: data.message || 'Email verified successfully' }
  },
}
