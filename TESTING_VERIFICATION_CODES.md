# Testing Email Verification Codes

## 🧪 Quick Testing Guide

### Step 1: Sign Up
1. Navigate to `/signup`
2. Fill in form with test data:
   - First Name: John
   - Last Name: Doe
   - Email: test@example.com
   - Password: SecurePass123!
   - Confirm: SecurePass123!
   - Check "I agree to terms"
3. Click "Create Account"

### Step 2: Get Verification Code
After signup, you'll see the Email Verification page. The code is available in **3 ways**:

#### Option A: Browser Console (Easiest)
1. Open Browser DevTools: `F12` or `Right-click → Inspect`
2. Go to **Console** tab
3. Look for the box with:
   ```
   ╔════════════════════════════════════════╗
   ║   EMAIL VERIFICATION CODE (DEV MODE)   ║
   ╠════════════════════════════════════════╣
   ║ Email: test@example.com
   ║ Code:  123456
   ║ Expires in: 15 minutes
   ╚════════════════════════════════════════╝
   ```
4. Copy the code (e.g., "123456")

#### Option B: LocalStorage
1. Open Browser DevTools: `F12`
2. Go to **Application** tab
3. Click **LocalStorage** in left sidebar
4. Find your domain
5. Look for key: `verificationCode_test@example.com`
6. Copy the value

#### Option C: Browser Console Command
1. Open Browser DevTools: `F12`
2. Go to **Console** tab
3. Run this command:
   ```javascript
   localStorage.getItem('verificationCode_test@example.com')
   ```
4. Copy the returned code

### Step 3: Enter Code
1. On the Email Verification page
2. Enter the 6-digit code in the input field
3. Click "Verify Email"
4. **Expected:** Success message
5. **Expected:** Redirect to Sign In page

### Step 4: Sign In
1. On Sign In page
2. Enter username and password
3. Click "Sign In"
4. **Expected:** Redirect to Profile page

---

## 🧪 Test Scenarios

### Scenario 1: Successful Verification ✅
**Steps:**
1. Sign up
2. Get code from console
3. Enter code
4. Click verify
5. **Result:** Success, redirect to signin

### Scenario 2: Wrong Code ❌
**Steps:**
1. Sign up
2. Enter wrong code (e.g., "000000")
3. Click verify
4. **Result:** Error message: "Invalid verification code"

### Scenario 3: Expired Code ⏰
**Steps:**
1. Sign up
2. Wait 15+ minutes
3. Try to verify old code
4. **Result:** Error message: "Verification code has expired"

### Scenario 4: Resend Code 🔄
**Steps:**
1. Sign up
2. Click "Resend Verification Email"
3. Check console for new code
4. Enter new code
5. Click verify
6. **Result:** Success

### Scenario 5: Incomplete Code ⚠️
**Steps:**
1. Sign up
2. Enter only 5 digits
3. **Result:** "Verify Email" button is disabled
4. Enter 6th digit
5. **Result:** Button becomes enabled

### Scenario 6: Non-numeric Input 🔤
**Steps:**
1. Try typing letters in code field
2. **Result:** Only numbers accepted
3. Letters are filtered out

---

## 🔧 Developer Tools

### Check All Stored Codes
Open browser console and run:
```javascript
// Get all verification codes
Object.keys(localStorage).filter(k => k.startsWith('verificationCode_'))
```

### Get Specific Code
```javascript
localStorage.getItem('verificationCode_test@example.com')
```

### Clear All Codes
```javascript
// Option 1: Clear localStorage
Object.keys(localStorage).forEach(k => {
  if (k.startsWith('verificationCode_')) {
    localStorage.removeItem(k)
  }
})

// Option 2: Use service method
verificationService.clearAllCodes()
```

### Manually Set Code (Testing)
```javascript
localStorage.setItem('verificationCode_test@example.com', '123456')
```

---

## 📊 Code Expiration

- **Expiration Time:** 15 minutes
- **Format:** 6 random digits
- **Storage:** In-memory + localStorage
- **One-time use:** Code deleted after verification

---

## 🐛 Troubleshooting

### Issue: Code not showing in console
**Solution:**
1. Check if you're on `/verify-email` page
2. Open console before signing up
3. Look for the box with code

### Issue: Code not in localStorage
**Solution:**
1. Make sure you signed up successfully
2. Check localStorage key format: `verificationCode_EMAIL`
3. Try refreshing page

### Issue: "Code expired" error
**Solution:**
1. Request new code by clicking "Resend Verification Email"
2. Use the new code within 15 minutes

### Issue: "Invalid code" error
**Solution:**
1. Double-check code matches exactly
2. Make sure you copied all 6 digits
3. Try resending and using new code

---

## 📝 Test Data

### Valid Test Email
```
test@example.com
```

### Valid Test Password
```
SecurePass123!
```

### Valid Test Code Format
```
6 digits: 123456
```

---

## ✅ Verification Checklist

- [ ] Sign up works
- [ ] Verification page displays
- [ ] Code appears in console
- [ ] Code appears in localStorage
- [ ] Can enter code in input
- [ ] Verify button works
- [ ] Success message shows
- [ ] Redirects to signin
- [ ] Can sign in after verification
- [ ] Resend code works
- [ ] Expired code shows error
- [ ] Wrong code shows error

---

**Status:** ✅ Ready for Testing
**Last Updated:** October 29, 2025
