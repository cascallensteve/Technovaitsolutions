/**
 * Email Verification Service
 * This service handles email verification with 6-digit codes
 * 
 * NOTE: This is a development service. In production, the backend should:
 * 1. Generate a 6-digit code
 * 2. Send it via email
 * 3. Store it temporarily (with expiration)
 * 4. Validate it when user submits
 */

interface VerificationCode {
  code: string
  email: string
  createdAt: number
  expiresAt: number
}

// Store verification codes in memory (development only)
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
   * In production, this would call the backend API
   */
  async sendVerificationCode(email: string): Promise<{ success: boolean; message: string; code?: string }> {
    try {
      const code = generateCode()
      const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

      // Store the code
      verificationCodes.set(email, {
        code,
        email,
        createdAt: Date.now(),
        expiresAt,
      })

      // Log to console for development (in production, this would be sent via email)
      console.log(`
        ╔════════════════════════════════════════╗
        ║   EMAIL VERIFICATION CODE (DEV MODE)   ║
        ╠════════════════════════════════════════╣
        ║ Email: ${email}
        ║ Code:  ${code}
        ║ Expires in: 15 minutes
        ╚════════════════════════════════════════╝
      `)

      // Store code in localStorage for easy access during development
      localStorage.setItem(`verificationCode_${email}`, code)

      return {
        success: true,
        message: `Verification code sent to ${email}. Check console for code (development mode).`,
        code, // Return code for development/testing
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send verification code',
      }
    }
  },

  /**
   * Verify the code submitted by user
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

      // Check if code exists
      const storedData = verificationCodes.get(email)
      if (!storedData) {
        return {
          success: false,
          message: 'No verification code found for this email. Please request a new one.',
        }
      }

      // Check if code is expired
      if (isCodeExpired(storedData.expiresAt)) {
        verificationCodes.delete(email)
        return {
          success: false,
          message: 'Verification code has expired. Please request a new one.',
        }
      }

      // Check if code matches
      if (storedData.code !== code) {
        return {
          success: false,
          message: 'Invalid verification code. Please try again.',
        }
      }

      // Code is valid - remove it
      verificationCodes.delete(email)
      localStorage.removeItem(`verificationCode_${email}`)

      return {
        success: true,
        message: 'Email verified successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Verification failed. Please try again.',
      }
    }
  },

  /**
   * Resend verification code
   */
  async resendCode(email: string): Promise<{ success: boolean; message: string; code?: string }> {
    try {
      // Remove old code
      verificationCodes.delete(email)
      localStorage.removeItem(`verificationCode_${email}`)

      // Generate and send new code
      return this.sendVerificationCode(email)
    } catch (error) {
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
