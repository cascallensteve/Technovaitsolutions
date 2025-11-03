# Frontend & Backend Integration - Email Verification

## ✅ Integration Complete

The frontend is now fully integrated with the backend email verification endpoints!

---

## 🔄 Complete User Flow

```
1. User Signs Up
   ↓
2. Frontend calls POST /auth/sign-up/
   ↓
3. Backend creates user account
   ↓
4. Frontend calls POST /auth/send-verification-email/
   ↓
5. Backend generates 6-digit code & sends email
   ↓
6. User receives email with code
   ↓
7. Redirect to Email Verification Page
   ↓
8. User enters code
   ↓
9. Frontend calls POST /auth/verify-email/
   ↓
10. Backend validates code
    ↓
11. Success: Email marked as verified
    ↓
12. Redirect to Sign In Page
    ↓
13. User signs in
    ↓
14. Redirect to Profile Page
```

---

## 📁 Files Updated

### 1. **`src/services/authService.ts`**

Added 3 new methods:

```typescript
// Send verification email
await authService.sendVerificationEmail(email)

// Verify email with token
await authService.verifyEmail(token)

// Resend verification email
await authService.resendVerificationEmail(email)
```

### 2. **`src/pages/SignUp.tsx`**

Updated to:
- Send `first_name` and `last_name` to backend
- Call `authService.sendVerificationEmail()` after signup
- Redirect to `/verify-email` page

### 3. **`src/pages/EmailVerification.tsx`**

Updated to:
- Call `authService.verifyEmail()` to verify code
- Call `authService.resendVerificationEmail()` to resend code
- Use backend API instead of local validation

---

## 🔌 Backend Endpoints Called

### 1. Sign Up
```
POST /auth/sign-up/
{
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!"
}
```

### 2. Send Verification Email
```
POST /auth/send-verification-email/
{
  "email": "john@example.com"
}
```

### 3. Verify Email
```
POST /auth/verify-email/
{
  "token": "123456"
}
```

### 4. Resend Verification Email
```
POST /auth/resend-verification-email/
{
  "email": "john@example.com"
}
```

### 5. Sign In
```
POST /auth/sign-in/
{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

---

## 🧪 Testing the Complete Flow

### Step 1: Sign Up
1. Go to `/signup`
2. Fill in form:
   - First Name: John
   - Last Name: Doe
   - Email: test@example.com
   - Password: SecurePass123!
   - Confirm: SecurePass123!
   - Check "I agree to terms"
3. Click "Create Account"
4. **Expected:** Redirect to `/verify-email`

### Step 2: Get Verification Code
1. Check your email inbox for verification code
2. Or check backend console if email not configured
3. Copy the 6-digit code

### Step 3: Verify Email
1. On `/verify-email` page
2. Enter 6-digit code
3. Click "Verify Email"
4. **Expected:** Success message
5. **Expected:** Redirect to `/signin` after 2 seconds

### Step 4: Sign In
1. On `/signin` page
2. Enter username and password
3. Click "Sign In"
4. **Expected:** Redirect to `/profile`

### Step 5: View Profile
1. On `/profile` page
2. **Expected:** See user information

---

## 🔧 Service Methods

### authService.sendVerificationEmail()
```typescript
try {
  const result = await authService.sendVerificationEmail('user@example.com')
  console.log(result.message) // "Verification email sent successfully"
} catch (error) {
  console.error(error.message)
}
```

### authService.verifyEmail()
```typescript
try {
  const result = await authService.verifyEmail('123456')
  console.log(result.message) // "Email verified successfully"
} catch (error) {
  console.error(error.message)
}
```

### authService.resendVerificationEmail()
```typescript
try {
  const result = await authService.resendVerificationEmail('user@example.com')
  console.log(result.message) // "Verification email sent successfully"
} catch (error) {
  console.error(error.message)
}
```

---

## 📊 Error Handling

### Invalid Token
```json
{
  "success": false,
  "message": "Invalid or expired verification token"
}
```

### Expired Token
```json
{
  "success": false,
  "message": "Email verification token has expired"
}
```

### Email Not Found
```json
{
  "success": false,
  "message": "Email not found"
}
```

### Email Not Verified (Sign In)
```json
{
  "success": false,
  "message": "Email not verified",
  "errors": {
    "email": "Please verify your email before signing in"
  }
}
```

---

## 🎯 Frontend Components

### Sign Up Page (`/signup`)
- ✅ Form validation
- ✅ Password strength indicator
- ✅ Terms & conditions checkbox
- ✅ Green "Create Account" button
- ✅ Calls backend sign-up endpoint
- ✅ Sends verification email
- ✅ Redirects to verification page

### Email Verification Page (`/verify-email`)
- ✅ 6-digit code input
- ✅ Auto-filters non-numeric
- ✅ Verify button (enabled when 6 digits)
- ✅ Resend button with 60-second cooldown
- ✅ Error messages
- ✅ Success messages
- ✅ Redirects to sign-in on success

### Sign In Page (`/signin`)
- ✅ Username/password input
- ✅ Remember me checkbox
- ✅ Sign in button
- ✅ Error handling for unverified emails
- ✅ Redirects to profile on success

### Profile Page (`/profile`)
- ✅ Display user information
- ✅ Sign out button
- ✅ Protected route (requires auth)

---

## 🔐 Security Features

✅ **Email Verification Required** - Must verify before signing in
✅ **6-digit Codes** - Random, secure codes
✅ **15-minute Expiration** - Codes expire after 15 minutes
✅ **One-time Use** - Codes deleted after verification
✅ **Rate Limiting** - Resend cooldown (60 seconds)
✅ **HTTPS Only** - Secure communication
✅ **Token Storage** - JWT tokens in localStorage

---

## 📱 Responsive Design

✅ Mobile (< 640px)
✅ Tablet (640px - 1024px)
✅ Desktop (> 1024px)
✅ All devices supported

---

## 🚀 Deployment Checklist

- [ ] Backend endpoints implemented
- [ ] Email service configured
- [ ] Database migrations run
- [ ] Frontend updated
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Test complete flow
- [ ] Deploy to production

---

## 📝 Environment Variables

**Backend (.env):**
```
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@technova.com
```

**Frontend (.env):**
```
VITE_API_URL=https://technova-backend-seven.vercel.app
```

---

## 🧪 Test Scenarios

### Scenario 1: Successful Sign Up & Verification ✅
1. Sign up with valid data
2. Receive verification email
3. Enter code
4. Email verified
5. Sign in successfully

### Scenario 2: Invalid Code ❌
1. Sign up
2. Enter wrong code
3. **Expected:** Error message

### Scenario 3: Expired Code ⏰
1. Sign up
2. Wait 15+ minutes
3. Try to verify
4. **Expected:** Error message

### Scenario 4: Resend Code 🔄
1. Sign up
2. Click "Resend"
3. Receive new code
4. Enter new code
5. Verify successfully

### Scenario 5: Sign In Without Verification ❌
1. Sign up
2. Don't verify email
3. Try to sign in
4. **Expected:** Error: "Email not verified"

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs
3. Verify email configuration
4. Check CORS settings
5. Verify database migrations

---

**Status:** ✅ **Frontend & Backend Integration Complete**
**Last Updated:** October 29, 2025
**Version:** 1.0.0
