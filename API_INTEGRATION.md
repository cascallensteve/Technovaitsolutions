# API Integration Documentation

## Overview
This document describes the authentication API integration for the Technova application. The frontend communicates with the backend API at `https://technova-backend-seven.vercel.app/`.

## Authentication Service

### Location
`src/services/authService.ts`

### Base URL
```
https://technova-backend-seven.vercel.app
```

## Endpoints

### 1. Sign Up
**Endpoint:** `POST /auth/sign-up/`

**Request Body:**
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "username": "testuser",
    "email": "testuser@example.com",
    "token": "abc123xyz789",
    "email_verification_sent": true,
    "message": "Check your email to verify your account"
  },
  "message": "User registered successfully"
}
```

**Usage in Frontend:**
```typescript
import { authService } from '../services/authService'

const response = await authService.signUp({
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'SecurePass123!',
  password_confirm: 'SecurePass123!'
})

if (response.success) {
  console.log('User registered:', response.data)
  // Token is automatically stored in localStorage
}
```

### 2. Sign In
**Endpoint:** `POST /auth/sign-in/`

**Request Body:**
```json
{
  "email": "testuser@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "username": "testuser",
    "email": "testuser@example.com",
    "token": "abc123xyz789",
    "message": "Login successful"
  },
  "message": "User logged in successfully"
}
```

**Usage in Frontend:**
```typescript
import { authService } from '../services/authService'

const response = await authService.signIn({
  email: 'testuser@example.com',
  password: 'SecurePass123!'
})

if (response.success) {
  console.log('User logged in:', response.data)
  // Token is automatically stored in localStorage
}
```

## Authentication Service Methods

### `signUp(data: SignUpRequest): Promise<SignUpResponse>`
Registers a new user account.

**Parameters:**
- `username` (string): Unique username
- `email` (string): User email address
- `password` (string): User password
- `password_confirm` (string): Password confirmation

**Returns:** Promise with signup response containing user data and token

**Side Effects:** Stores auth token and user data in localStorage

---

### `signIn(data: SignInRequest): Promise<SignInResponse>`
Authenticates an existing user.

**Parameters:**
- `email` (string): User email address
- `password` (string): User password

**Returns:** Promise with signin response containing user data and token

**Side Effects:** Stores auth token and user data in localStorage

---

### `signOut(): void`
Clears authentication data from localStorage.

**Usage:**
```typescript
authService.signOut()
```

---

### `getToken(): string | null`
Retrieves the stored authentication token.

**Returns:** Auth token string or null if not authenticated

**Usage:**
```typescript
const token = authService.getToken()
```

---

### `getUser(): { user_id: number; username: string; email: string } | null`
Retrieves the stored user data.

**Returns:** User object or null if not authenticated

**Usage:**
```typescript
const user = authService.getUser()
if (user) {
  console.log(`Logged in as: ${user.username}`)
}
```

---

### `isAuthenticated(): boolean`
Checks if a user is currently authenticated.

**Returns:** Boolean indicating authentication status

**Usage:**
```typescript
if (authService.isAuthenticated()) {
  // Show authenticated UI
}
```

## Local Storage

The authentication service stores the following in browser localStorage:

### `authToken`
- **Key:** `authToken`
- **Value:** JWT token string
- **Purpose:** Used for authenticated API requests

### `user`
- **Key:** `user`
- **Value:** JSON string containing user data
- **Structure:**
  ```json
  {
    "user_id": 1,
    "username": "testuser",
    "email": "testuser@example.com"
  }
  ```

## Error Handling

The authentication service throws errors with descriptive messages. Always wrap API calls in try-catch blocks:

```typescript
try {
  const response = await authService.signUp(formData)
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  console.error('Sign up failed:', message)
}
```

## Pages Using Authentication

### Sign Up Page
**Location:** `src/pages/SignUp.tsx`

Features:
- Form validation
- Password strength indicator
- Automatic username generation from first/last name
- Success redirect to Sign In page
- Error message display

### Sign In Page
**Location:** `src/pages/SignIn.tsx`

Features:
- Email and password authentication
- Success message display from signup redirect
- Auto-populated email field after signup
- Error message display
- Redirect to home page on successful login

## Integration with Navbar

The Navbar component has been updated to link to the Sign In page:
- Desktop: "Sign in" link in top navigation
- Mobile: "Sign in" link in mobile menu

**Location:** `src/components/Navbar.tsx`

## Routes

New routes have been added to the application:

```typescript
<Route path="/signin" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
```

## Security Considerations

1. **Token Storage:** Tokens are stored in localStorage. For production, consider using httpOnly cookies for better security.

2. **HTTPS:** Ensure all API calls use HTTPS in production.

3. **Password Validation:** Frontend validation is implemented, but backend validation is also required.

4. **CORS:** The backend should be configured to accept requests from your frontend domain.

## Testing the Integration

### Test Sign Up
1. Navigate to `/signup`
2. Fill in the form with valid data
3. Click "Create Account"
4. Should redirect to `/signin` with success message
5. Check browser localStorage for `authToken` and `user`

### Test Sign In
1. Navigate to `/signin`
2. Enter valid credentials
3. Click "Sign In"
4. Should redirect to home page
5. Check browser localStorage for `authToken` and `user`

### Test Sign Out
1. Call `authService.signOut()`
2. Verify localStorage is cleared

## Future Enhancements

1. Add password reset functionality
2. Implement email verification flow
3. Add social authentication (Google, Facebook)
4. Add two-factor authentication
5. Implement refresh token mechanism
6. Add role-based access control (RBAC)
7. Create protected routes component
