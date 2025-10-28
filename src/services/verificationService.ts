/**
 * Email Verification Service
 * This service handles email verification with 6-digit codes
 * 
 * It calls the backend API endpoints:
 * - POST /auth/verify-email/ - Verify code
 * - POST /auth/resend-verification-email/ - Resend code
 */

const API_BASE_URL = 'https://technova-backend-seven.vercel.app'

interface VerificationCode {
  code: string
  email: string
  createdAt: number
  expiresAt: number
}

// Store verification codes in memory (fallback for development)
const verificationCodes: Map<string, VerificationCode> = new Map()

// Generate a random 6-digit code
const generateCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Check if code is expired (15 minutes)
const isCodeExpired = (expiresAt: number): boolean => {
  return Date.now() > expiresAt
}

export const verificationService = {
  /**
   * Send verification code to email
   * Calls backend API to send email with code
   */
  async sendVerificationCode(email: string): Promise<{ success: boolean; message: string; code?: string }> {
    try {
      // Call backend to send verification email
      const response = await fetch(`${API_BASE_URL}/auth/send-verification-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('Backend verification error:', responseData)
        return {
          success: false,
          message: responseData.message || 'Failed to send verification code',
        }
      }

      // Log success
      console.log(`✓ Verification code sent to ${email}`)
      console.log('Response:', responseData)

      return {
        success: true,
        message: responseData.message || `Verification code sent to ${email}`,
      }
    } catch (error) {
      console.error('Error sending verification code:', error)
      
      // Fallback: Generate code locally for development
      const code = generateCode()
      const expiresAt = Date.now() + 15 * 60 * 1000

      verificationCodes.set(email, {
        code,
        email,
        createdAt: Date.now(),
        expiresAt,
      })

      localStorage.setItem(`verificationCode_${email}`, code)

      console.log(`
        ╔════════════════════════════════════════╗
        ║   EMAIL VERIFICATION CODE (FALLBACK)   ║
        ╠════════════════════════════════════════╣
        ║ Email: ${email}
        ║ Code:  ${code}
        ║ Expires in: 15 minutes
        ║ (Backend not responding - using local)
        ╚════════════════════════════════════════╝
      `)

      return {
        success: true,
        message: `Verification code generated. Check console for code (backend not responding).`,
        code,
      }
    }
  },

  /**
   * Verify the code submitted by user
   * Calls backend API to verify token
   */
  async verifyCode(email: string, code: string): Promise<{ success: boolean; message: string }> {
    try {
      // Validate inputs
      if (!email || !code) {
        return {
          success: false,
          message: 'Email and code are required',
        }
      }

      // Call backend to verify token
      const response = await fetch(`${API_BASE_URL}/auth/verify-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: code }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        const errorMsg = responseData.errors?.token || responseData.message || 'Verification failed'
        console.error('Backend verification error:', errorMsg)
        return {
          success: false,
          message: errorMsg,
        }
      }

      // Success
      console.log('✓ Email verified successfully')
      
      // Clear local code if it exists
      verificationCodes.delete(email)
      localStorage.removeItem(`verificationCode_${email}`)

      return {
        success: true,
        message: responseData.message || 'Email verified successfully',
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      
      // Fallback: Check local code for development
      const storedData = verificationCodes.get(email)
      if (!storedData) {
        return {
          success: false,
          message: 'No verification code found for this email. Please request a new one.',
        }
      }

      if (isCodeExpired(storedData.expiresAt)) {
        verificationCodes.delete(email)
        return {
          success: false,
          message: 'Verification code has expired. Please request a new one.',
        }
      }

      if (storedData.code !== code) {
        return {
          success: false,
          message: 'Invalid verification code. Please try again.',
        }
      }

      verificationCodes.delete(email)
      localStorage.removeItem(`verificationCode_${email}`)

      return {
        success: true,
        message: 'Email verified successfully',
      }
    }
  },

  /**
   * Resend verification code
   * Calls backend API to resend email
   */
  async resendCode(email: string): Promise<{ success: boolean; message: string; code?: string }> {
    try {
      // Call backend to resend verification email
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('Backend resend error:', responseData)
        return {
          success: false,
          message: responseData.message || 'Failed to resend verification code',
        }
      }

      // Log success
      console.log(`✓ Verification code resent to ${email}`)
      console.log('Response:', responseData)

      return {
        success: true,
        message: responseData.message || `Verification code resent to ${email}`,
      }
    } catch (error) {
      console.error('Error resending code:', error)
      
      // Fallback: Generate new code locally
      verificationCodes.delete(email)
      localStorage.removeItem(`verificationCode_${email}`)
      return this.sendVerificationCode(email)
    }
  },

  /**
   * Get stored code (development only - for testing)
   */
  getStoredCode(email: string): string | null {
    const storedData = verificationCodes.get(email)
    return storedData ? storedData.code : null
  },

  /**
   * Clear all codes (for testing)
   */
  clearAllCodes(): void {
    verificationCodes.clear()
    // Clear localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('verificationCode_')) {
        localStorage.removeItem(key)
      }
    })
  },
}
