# CORS Error - Troubleshooting Guide

## 🔴 **The Error**

```
Access to fetch at 'https://technova-backend-seven.vercel.app/auth/sign-in/' 
from origin 'http://localhost:3002' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 🤔 **What is CORS?**

CORS (Cross-Origin Resource Sharing) is a security feature that prevents websites from making unauthorized requests to other domains.

**Your Setup:**
- Frontend: `http://localhost:3002` (your local dev server)
- Backend: `https://technova-backend-seven.vercel.app` (production server)

These are **different origins**, so the browser blocks the request unless the backend explicitly allows it.

---

## ✅ **Solution: Configure Backend CORS**

### **The Backend Must Add CORS Headers**

The backend server needs to respond with these headers:

```
Access-Control-Allow-Origin: http://localhost:3002
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## 🔧 **Backend Configuration by Framework**

### **Django (Python)**

**Step 1: Install django-cors-headers**
```bash
pip install django-cors-headers
```

**Step 2: Update settings.py**
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',  # Add this
    'rest_framework',
    'your_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Add CORS configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3002",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "https://yourdomain.com",
]

CORS_ALLOW_CREDENTIALS = True
```

---

### **Node.js / Express**

**Step 1: Install cors package**
```bash
npm install cors
```

**Step 2: Configure in your app**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3002',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'https://yourdomain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Your routes
app.post('/auth/sign-in/', (req, res) => {
  // Your signin logic
});
```

---

### **Flask (Python)**

**Step 1: Install Flask-CORS**
```bash
pip install Flask-CORS
```

**Step 2: Configure in your app**
```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# CORS configuration
CORS(app, resources={
    r"/auth/*": {
        "origins": [
            "http://localhost:3002",
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:3002",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173",
            "https://yourdomain.com"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

@app.route('/auth/sign-in/', methods=['POST'])
def sign_in():
    # Your signin logic
    pass
```

---

### **FastAPI (Python)**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3002",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "https://yourdomain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/auth/sign-in/")
async def sign_in(request: SignInRequest):
    # Your signin logic
    pass
```

---

## 🚀 **For Production Deployment**

When deploying to production, update your CORS configuration to include your production domain:

```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
    "https://app.yourdomain.com",
    # Keep localhost for development if needed
    "http://localhost:3002",
]
```

---

## 🧪 **Testing CORS Configuration**

### **Option 1: Using curl**
```bash
curl -X OPTIONS https://technova-backend-seven.vercel.app/auth/sign-in/ \
  -H "Origin: http://localhost:3002" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

Look for these headers in the response:
```
Access-Control-Allow-Origin: http://localhost:3002
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### **Option 2: Using Postman**
1. Create a POST request to `https://technova-backend-seven.vercel.app/auth/sign-in/`
2. Go to Headers tab
3. Add: `Origin: http://localhost:3002`
4. Send the request
5. Check response headers for CORS headers

---

## 🔍 **Common CORS Issues & Solutions**

### **Issue 1: Preflight Request Fails**
**Symptom:** OPTIONS request returns 404 or 405

**Solution:** Ensure your backend handles OPTIONS requests
```python
# Django
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET", "POST", "OPTIONS"])
def sign_in(request):
    pass
```

### **Issue 2: Credentials Not Sent**
**Symptom:** Cookies/auth headers not included

**Solution:** Add credentials to fetch request
```javascript
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',  // Add this
  body: JSON.stringify(data)
})
```

### **Issue 3: Wildcard CORS Too Permissive**
**Current:** `Access-Control-Allow-Origin: *`

**Better:** Specify allowed origins
```python
CORS_ALLOWED_ORIGINS = ["http://localhost:3002", "https://yourdomain.com"]
```

---

## 📋 **Checklist for Backend Developer**

- [ ] CORS library installed (django-cors-headers, cors, Flask-CORS, etc.)
- [ ] CORS middleware added to the application
- [ ] Allowed origins configured (include localhost:3002)
- [ ] Allowed methods configured (GET, POST, PUT, DELETE, OPTIONS)
- [ ] Allowed headers configured (Content-Type, Authorization)
- [ ] Credentials allowed if using cookies/auth
- [ ] OPTIONS requests handled properly
- [ ] Configuration tested with curl or Postman
- [ ] Production domain added for deployment

---

## 📞 **Next Steps**

1. **Share this guide with your backend developer**
2. **Ask them to configure CORS** for your frontend origin
3. **Test the configuration** using curl or Postman
4. **Verify the fix** by trying to sign in again

---

## 🎯 **Quick Reference**

**What needs to be fixed:** Backend server configuration
**Who needs to fix it:** Backend developer
**What to ask them:** "Please add CORS headers to allow requests from http://localhost:3002"
**How to verify:** Check response headers for `Access-Control-Allow-Origin`

---

**Status:** ⏳ Waiting for Backend CORS Configuration
**Last Updated:** October 28, 2025
