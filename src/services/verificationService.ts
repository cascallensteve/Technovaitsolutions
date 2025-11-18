/**
 * Email Verification Service
 * This service handles email verification with 6-digit codes
 * 
 * Currently uses local code generation and validation
 * When backend endpoints are ready, update to call:
 * - POST /auth/verify-email/ - Verify code
 * - POST /auth/resend-verification-email/ - Resend code
 * - POST /auth/send-verification-email/ - Send code
 */

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
   * Uses local generation for now (backend endpoint not yet implemented)
   */
  async sendVerificationCode(email: string): Promise<{ success: boolean; message: string; code?: string }> {
    try {
      // Generate code locally
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
        ║   EMAIL VERIFICATION CODE (DEV MODE)   ║
        ╠════════════════════════════════════════╣
        ║ Email: ${email}
        ║ Code:  ${code}
        ║ Expires in: 15 minutes
        ║
        ║ NOTE: Backend endpoint not yet ready
        ║ Using local code generation
        ╚════════════════════════════════════════╝
      `)

      return {
        success: true,
        message: `✓ Verification code generated. Check browser console for code.`,
        code,
      }
    } catch (error) {
      console.error('Error generating verification code:', error)
      return {
        success: false,
        message: 'Failed to generate verification code',
      }
    }
  },

  /**
   * Verify the code submitted by user
   * Uses local validation for now (backend endpoint not yet implemented)
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

      // Check local code
      const storedData = verificationCodes.get(email)
      if (!storedData) {
        return {
          success: false,
          message: 'No verification code found for this email. Please request a new one.',
        }
      }

      if (isCodeExpired(storedData.expiresAt)) {
        verificationCodes.delete(email)
        localStorage.removeItem(`verificationCode_${email}`)
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

      // Success - clear code
      verificationCodes.delete(email)
      localStorage.removeItem(`verificationCode_${email}`)

      console.log(`✓ Email verified successfully for ${email}`)

      return {
        success: true,
        message: 'Email verified successfully',
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      return {
        success: false,
        message: 'Verification failed. Please try again.',
      }
    }
  },

  /**
   * Resend verification code
   * Uses local generation for now (backend endpoint not yet implemented)
   */
  async resendCode(email: string): Promise<{ success: boolean; message: string; code?: string }> {
    try {
      // Generate new code locally
      verificationCodes.delete(email)
      localStorage.removeItem(`verificationCode_${email}`)
      
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
        ║   VERIFICATION CODE RESENT (DEV MODE)  ║
        ╠════════════════════════════════════════╣
        ║ Email: ${email}
        ║ Code:  ${code}
        ║ Expires in: 15 minutes
        ╚════════════════════════════════════════╝
      `)

      return {
        success: true,
        message: `✓ New verification code generated. Check browser console.`,
        code,
      }
    } catch (error) {
      console.error('Error resending code:', error)
      return {
        success: false,
        message: 'Failed to resend verification code',
      }
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
