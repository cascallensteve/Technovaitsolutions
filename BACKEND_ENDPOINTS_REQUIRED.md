# Backend Endpoints Required for Email Verification

## 🔴 **Critical: Backend Implementation Needed**

The frontend is now configured to call the following backend endpoints. **Your backend team must implement these endpoints** for email verification to work properly.

---

## 📋 Required Backend Endpoints

### 1. Send Verification Email
**Endpoint:** `POST /auth/send-verification-email/`

**Purpose:** Generate and send a 6-digit verification code to user's email

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Verification code sent to your email",
  "data": {
    "message": "Verification email sent successfully"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Failed to send verification email",
  "errors": {
    "email": "Email not found or invalid"
  }
}
```

**Backend Implementation Should:**
- ✅ Generate random 6-digit code
- ✅ Store code temporarily (15-minute expiration)
- ✅ Send email with code to user
- ✅ Return success message

---

### 2. Verify Email
**Endpoint:** `POST /auth/verify-email/`

**Purpose:** Verify user email with the 6-digit code

**Request Body:**
```json
{
  "token": "123456"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Email verification failed",
  "errors": {
    "token": "Invalid or expired verification token"
  }
}
```

**Backend Implementation Should:**
- ✅ Validate token format (6 digits)
- ✅ Check if token exists
- ✅ Check if token is expired
- ✅ Check if token matches
- ✅ Mark email as verified
- ✅ Delete token after verification

---

### 3. Resend Verification Email
**Endpoint:** `POST /auth/resend-verification-email/`

**Purpose:** Resend verification code if user didn't receive it

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Verification email sent successfully",
  "data": {
    "message": "Verification code sent to your email"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Failed to resend verification email",
  "errors": {
    "email": "Email not found"
  }
}
```

**Backend Implementation Should:**
- ✅ Generate new 6-digit code
- ✅ Delete old code
- ✅ Store new code (15-minute expiration)
- ✅ Send email with new code
- ✅ Return success message

---

## 🔄 User Flow with Backend

```
1. User Signs Up
   ↓
2. Frontend calls POST /auth/send-verification-email/
   ↓
3. Backend generates code & sends email
   ↓
4. User receives email with code
   ↓
5. User enters code on verification page
   ↓
6. Frontend calls POST /auth/verify-email/
   ↓
7. Backend validates code
   ↓
8. Success: Email marked as verified
   ↓
9. User can sign in
```

---

## 🛠️ Frontend Implementation Status

✅ **Already Implemented:**
- Email verification page with code input
- Calls to backend endpoints
- Error handling
- Success messages
- Resend functionality
- 60-second resend cooldown
- Code validation (6 digits)

⏳ **Waiting For Backend:**
- `/auth/send-verification-email/` endpoint
- `/auth/verify-email/` endpoint
- `/auth/resend-verification-email/` endpoint
- Email sending service
- Code generation & storage
- Code expiration (15 minutes)

---

## 🔐 Security Considerations

### Code Generation
- Use cryptographically secure random number generator
- 6-digit format (000000-999999)
- Unique per user

### Code Storage
- Store in database with expiration
- Delete after successful verification
- Delete after 15 minutes (expired)
- One-time use only

### Email Sending
- Use SMTP or email service (SendGrid, Mailgun, etc.)
- Include code in email
- Include expiration time
- Include link to verification page

### Rate Limiting
- Limit resend requests (e.g., 1 per minute)
- Limit verification attempts (e.g., 5 per 15 minutes)
- Prevent brute force attacks

---

## 📊 Database Schema (Suggested)

```sql
CREATE TABLE verification_codes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  verified_at TIMESTAMP NULL,
  attempts INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX (email, code)
);
```

---

## 🧪 Testing the Endpoints

### Using cURL

**Send Verification Email:**
```bash
curl -X POST https://technova-backend-seven.vercel.app/auth/send-verification-email/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Verify Email:**
```bash
curl -X POST https://technova-backend-seven.vercel.app/auth/verify-email/ \
  -H "Content-Type: application/json" \
  -d '{"token":"123456"}'
```

**Resend Verification Email:**
```bash
curl -X POST https://technova-backend-seven.vercel.app/auth/resend-verification-email/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## 📝 Frontend Service Integration

The frontend verification service is configured to call these endpoints:

**File:** `src/services/verificationService.ts`

**Methods:**
```typescript
// Send verification code
await verificationService.sendVerificationCode(email)

// Verify code
await verificationService.verifyCode(email, code)

// Resend code
await verificationService.resendCode(email)
```

---

## ⚠️ Current Fallback Behavior

Until backend endpoints are implemented, the frontend has a **fallback mechanism**:

1. Tries to call backend endpoint
2. If backend fails, generates code locally
3. Stores code in memory and localStorage
4. Shows code in browser console
5. Allows testing without backend

**This is for development only. Production must use backend endpoints.**

---

## 🚀 Implementation Checklist for Backend

- [ ] Create `/auth/send-verification-email/` endpoint
- [ ] Create `/auth/verify-email/` endpoint
- [ ] Create `/auth/resend-verification-email/` endpoint
- [ ] Implement code generation (6 digits)
- [ ] Implement code storage (15-minute expiration)
- [ ] Implement email sending service
- [ ] Add rate limiting
- [ ] Add error handling
- [ ] Test all endpoints
- [ ] Deploy to production

---

## 📞 Integration Support

Once backend endpoints are ready:
1. Deploy backend changes
2. Frontend will automatically use them
3. No frontend changes needed
4. Email verification will work end-to-end

---

**Status:** ⏳ Waiting for Backend Implementation
**Last Updated:** October 29, 2025
**Frontend Version:** 1.0.0 (Ready)
