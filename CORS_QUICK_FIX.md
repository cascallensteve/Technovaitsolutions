# CORS Error - Quick Fix Guide

## 🔴 **The Problem**

Your frontend (`http://localhost:3002`) cannot communicate with the backend (`https://technova-backend-seven.vercel.app`) due to CORS restrictions.

---

## ✅ **The Solution (For Backend Developer)**

### **If Backend is Django:**

Add to `settings.py`:

```python
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add at top
    # ... other middleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3002",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://yourdomain.com",
]

CORS_ALLOW_CREDENTIALS = True
```

Then run:
```bash
pip install django-cors-headers
```

---

### **If Backend is Node.js/Express:**

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3002', 'http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
```

Then run:
```bash
npm install cors
```

---

### **If Backend is Flask:**

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/auth/*": {
        "origins": ["http://localhost:3002", "http://localhost:3000", "https://yourdomain.com"],
        "supports_credentials": True
    }
})
```

Then run:
```bash
pip install Flask-CORS
```

---

## 🧪 **Test the Fix**

After backend is configured, try signing in again. The error should be gone!

---

## 📞 **Need Help?**

See `CORS_TROUBLESHOOTING.md` for detailed information.
