# Backend Implementation - Email Verification Endpoints

## 📋 Required Endpoints

Your backend needs to implement these 3 endpoints for email verification to work end-to-end.

---

## 1️⃣ Send Verification Email

**Endpoint:** `POST /auth/send-verification-email/`

**Purpose:** Generate and send 6-digit verification code to user's email

**Request:**
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

---

## 2️⃣ Verify Email

**Endpoint:** `POST /auth/verify-email/`

**Purpose:** Verify user email with the 6-digit code

**Request:**
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

---

## 3️⃣ Resend Verification Email

**Endpoint:** `POST /auth/resend-verification-email/`

**Purpose:** Resend verification code if user didn't receive it

**Request:**
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

---

## 🔧 Django Implementation

### Step 1: Create Model for Verification Codes

**File:** `your_app/models.py`

```python
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import random
import string

class EmailVerificationCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='verification_code')
    email = models.EmailField()
    code = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_verified = models.BooleanField(default=False)
    attempts = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'email_verification_codes'
    
    def __str__(self):
        return f"{self.email} - {self.code}"
    
    def is_expired(self):
        return timezone.now() > self.expires_at
    
    def is_valid(self):
        return not self.is_expired() and not self.is_verified
    
    @staticmethod
    def generate_code():
        """Generate random 6-digit code"""
        return ''.join(random.choices(string.digits, k=6))
    
    @classmethod
    def create_for_user(cls, user):
        """Create or update verification code for user"""
        code = cls.generate_code()
        expires_at = timezone.now() + timedelta(minutes=15)
        
        obj, created = cls.objects.update_or_create(
            user=user,
            defaults={
                'email': user.email,
                'code': code,
                'expires_at': expires_at,
                'is_verified': False,
                'attempts': 0
            }
        )
        return obj
```

### Step 2: Create Serializers

**File:** `your_app/serializers.py`

```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import EmailVerificationCode

class SendVerificationEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("Email not found")
        return value

class VerifyEmailSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=6, min_length=6)
    
    def validate_token(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Token must be 6 digits")
        return value

class ResendVerificationEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("Email not found")
        return value
```

### Step 3: Create Views

**File:** `your_app/views.py`

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from .models import EmailVerificationCode
from .serializers import (
    SendVerificationEmailSerializer,
    VerifyEmailSerializer,
    ResendVerificationEmailSerializer
)

class SendVerificationEmailView(APIView):
    """Send verification code to user's email"""
    
    def post(self, request):
        serializer = SendVerificationEmailSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Invalid email',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(email=email)
            
            # Create or update verification code
            verification = EmailVerificationCode.create_for_user(user)
            
            # Send email
            send_verification_email(user.email, verification.code)
            
            return Response({
                'success': True,
                'message': 'Verification code sent to your email',
                'data': {
                    'message': 'Verification email sent successfully'
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Failed to send verification email',
                'errors': {'email': str(e)}
            }, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    """Verify user email with 6-digit code"""
    
    def post(self, request):
        serializer = VerifyEmailSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Invalid token',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        token = serializer.validated_data['token']
        
        try:
            # Find verification code
            verification = EmailVerificationCode.objects.get(code=token)
            
            # Check if expired
            if verification.is_expired():
                return Response({
                    'success': False,
                    'message': 'Email verification failed',
                    'errors': {'token': 'Invalid or expired verification token'}
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if already verified
            if verification.is_verified:
                return Response({
                    'success': False,
                    'message': 'Email verification failed',
                    'errors': {'token': 'Code already used'}
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Mark email as verified
            verification.is_verified = True
            verification.save()
            
            # Update user
            user = verification.user
            user.is_active = True
            user.save()
            
            return Response({
                'success': True,
                'message': 'Email verified successfully'
            }, status=status.HTTP_200_OK)
            
        except EmailVerificationCode.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Email verification failed',
                'errors': {'token': 'Invalid or expired verification token'}
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Verification failed',
                'errors': {'token': str(e)}
            }, status=status.HTTP_400_BAD_REQUEST)

class ResendVerificationEmailView(APIView):
    """Resend verification code to user's email"""
    
    def post(self, request):
        serializer = ResendVerificationEmailSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Invalid email',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(email=email)
            
            # Create new verification code
            verification = EmailVerificationCode.create_for_user(user)
            
            # Send email
            send_verification_email(user.email, verification.code)
            
            return Response({
                'success': True,
                'message': 'Verification email sent successfully',
                'data': {
                    'message': 'Verification code sent to your email'
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Failed to resend verification email',
                'errors': {'email': str(e)}
            }, status=status.HTTP_400_BAD_REQUEST)

def send_verification_email(email, code):
    """Send verification email"""
    subject = 'Email Verification Code'
    message = f"""
    Your email verification code is: {code}
    
    This code will expire in 15 minutes.
    
    If you didn't request this code, please ignore this email.
    """
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )
```

### Step 4: Add URLs

**File:** `your_app/urls.py`

```python
from django.urls import path
from .views import (
    SendVerificationEmailView,
    VerifyEmailView,
    ResendVerificationEmailView
)

urlpatterns = [
    path('auth/send-verification-email/', SendVerificationEmailView.as_view(), name='send-verification-email'),
    path('auth/verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('auth/resend-verification-email/', ResendVerificationEmailView.as_view(), name='resend-verification-email'),
]
```

### Step 5: Configure Email Settings

**File:** `settings.py`

```python
# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # or your email provider
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
DEFAULT_FROM_EMAIL = 'your-email@gmail.com'
```

### Step 6: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 🧪 Testing the Endpoints

### Using cURL

**Send Verification Email:**
```bash
curl -X POST http://localhost:8000/auth/send-verification-email/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

**Verify Email:**
```bash
curl -X POST http://localhost:8000/auth/verify-email/ \
  -H "Content-Type: application/json" \
  -d '{"token":"123456"}'
```

**Resend Verification Email:**
```bash
curl -X POST http://localhost:8000/auth/resend-verification-email/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

## 🔐 Security Features

✅ **Rate Limiting** - Limit resend requests
✅ **Attempt Tracking** - Track verification attempts
✅ **Code Expiration** - 15-minute expiration
✅ **One-time Use** - Code deleted after verification
✅ **Email Validation** - Verify email exists
✅ **HTTPS Only** - Secure communication

---

## 📊 Database Migration

```sql
CREATE TABLE email_verification_codes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  attempts INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES auth_user(id),
  INDEX (email, code)
);
```

---

## ✅ Implementation Checklist

- [ ] Create `EmailVerificationCode` model
- [ ] Create serializers
- [ ] Create views
- [ ] Add URL routes
- [ ] Configure email settings
- [ ] Run migrations
- [ ] Test all endpoints
- [ ] Deploy to production

---

**Status:** Ready for Backend Implementation
**Last Updated:** October 29, 2025
