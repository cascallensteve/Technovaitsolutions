# Technova Django Backend Structure

## Project Setup

```bash
# Create Django project
django-admin startproject technova_backend
cd technova_backend

# Create apps
python manage.py startapp blog
python manage.py startapp services
python manage.py startapp portfolio
python manage.py startapp team
python manage.py startapp testimonials
python manage.py startapp core
```

## Requirements (requirements.txt)

```txt
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
Pillow==10.0.1
django-ckeditor==6.7.0
django-taggit==4.0.0
python-decouple==3.8
cloudinary==1.36.0
django-cloudinary-storage==0.3.0
```

## Settings Configuration

```python
# settings.py
import os
from decouple import config
import cloudinary
import cloudinary.uploader
import cloudinary.api

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'ckeditor',
    'ckeditor_uploader',
    'taggit',
    'cloudinary_storage',
    'cloudinary',
    'core',
    'blog',
    'services',
    'portfolio',
    'team',
    'testimonials',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://your-frontend-domain.com",
]

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

# Cloudinary Configuration
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': config('CLOUDINARY_API_KEY'),
    'API_SECRET': config('CLOUDINARY_API_SECRET'),
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# CKEditor
CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': '100%',
    },
}
```

## Models

### 1. Core App Models (core/models.py)

```python
from django.db import models
from cloudinary.models import CloudinaryField

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=100, default="Technova")
    tagline = models.CharField(max_length=200, default="Innovative Technology Solutions")
    description = models.TextField()
    logo = CloudinaryField('logo', blank=True, null=True)
    favicon = CloudinaryField('favicon', blank=True, null=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)
    address = models.TextField()
    social_facebook = models.URLField(blank=True)
    social_twitter = models.URLField(blank=True)
    social_linkedin = models.URLField(blank=True)
    social_github = models.URLField(blank=True)
    whatsapp_number = models.CharField(max_length=20, blank=True)
    calendly_link = models.URLField(blank=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

class HeroSlide(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    image = CloudinaryField('image')
    video = CloudinaryField('video', resource_type='video', blank=True, null=True)
    cta_label = models.CharField(max_length=50)
    cta_link = models.CharField(max_length=200)
    layout_type = models.CharField(
        max_length=20,
        choices=[('default', 'Default'), ('split', 'Split')],
        default='default'
    )
    gradient_overlay = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class QuickLink(models.Model):
    label = models.CharField(max_length=100)
    icon_svg = models.TextField()
    href = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class OfferCard(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    image = CloudinaryField('image')
    primary_cta_label = models.CharField(max_length=50)
    primary_cta_link = models.CharField(max_length=200)
    secondary_cta_label = models.CharField(max_length=50, blank=True)
    secondary_cta_link = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
```

### 2. Blog App Models (blog/models.py)

```python
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from taggit.managers import TaggableManager

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default="#3B82F6")  # Hex color
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    role = models.CharField(max_length=100)
    avatar = CloudinaryField('avatar', blank=True, null=True)
    social_linkedin = models.URLField(blank=True)
    social_github = models.URLField(blank=True)
    social_twitter = models.URLField(blank=True)
    social_portfolio = models.URLField(blank=True)
    
    def __str__(self):
        return self.user.get_full_name() or self.user.username

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField(max_length=300)
    content = RichTextField()
    featured_image = CloudinaryField('image')
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = TaggableManager()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    is_featured = models.BooleanField(default=False)
    read_time = models.PositiveIntegerField(default=5)  # minutes
    views_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-published_at', '-created_at']
```

### 3. Services App Models (services/models.py)

```python
from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    icon_svg = models.TextField()
    color = models.CharField(max_length=7, default="#3B82F6")
    
    class Meta:
        verbose_name_plural = "Service Categories"

class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.TextField(max_length=300)
    long_description = RichTextField()
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)
    featured_image = CloudinaryField('image')
    video = CloudinaryField('video', resource_type='video', blank=True, null=True)
    timeline = models.CharField(max_length=100)
    starting_price = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'title']

class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, related_name='features', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class ServiceBenefit(models.Model):
    service = models.ForeignKey(Service, related_name='benefits', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class ServiceProcess(models.Model):
    service = models.ForeignKey(Service, related_name='process_steps', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    step_number = models.PositiveIntegerField()
    
    class Meta:
        ordering = ['step_number']
```

### 4. Portfolio App Models (portfolio/models.py)

```python
from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from taggit.managers import TaggableManager

class ProjectCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    color = models.CharField(max_length=7, default="#3B82F6")
    
    class Meta:
        verbose_name_plural = "Project Categories"

class Project(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('ongoing', 'Ongoing'),
        ('paused', 'Paused'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.TextField(max_length=300)
    full_description = RichTextField()
    category = models.ForeignKey(ProjectCategory, on_delete=models.CASCADE)
    client_name = models.CharField(max_length=200, blank=True)
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    featured_image = CloudinaryField('image')
    gallery_images = models.JSONField(default=list, blank=True)  # Store Cloudinary URLs
    tech_stack = TaggableManager()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    is_featured = models.BooleanField(default=False)
    completion_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-completion_date', '-created_at']
```

### 5. Team App Models (team/models.py)

```python
from django.db import models
from cloudinary.models import CloudinaryField

class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    bio = models.TextField()
    avatar = CloudinaryField('avatar')
    skills = models.JSONField(default=list)  # ["React", "Node.js", ...]
    tech_stack = models.JSONField(default=dict)  # {"languages": [...], "frameworks": [...]}
    social_linkedin = models.URLField(blank=True)
    social_github = models.URLField(blank=True)
    social_twitter = models.URLField(blank=True)
    social_portfolio = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    joined_date = models.DateField()
    
    class Meta:
        ordering = ['order', 'name']
```

### 6. Testimonials App Models (testimonials/models.py)

```python
from django.db import models
from cloudinary.models import CloudinaryField

class Testimonial(models.Model):
    client_name = models.CharField(max_length=200)
    client_role = models.CharField(max_length=100)
    client_company = models.CharField(max_length=200)
    client_avatar = CloudinaryField('avatar', blank=True, null=True)
    content = models.TextField()
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    project_title = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
```

## API Serializers

### Blog Serializers (blog/serializers.py)

```python
from rest_framework import serializers
from .models import BlogPost, Category, Author

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = Author
        fields = ['id', 'full_name', 'role', 'bio', 'avatar', 'social_linkedin', 
                 'social_github', 'social_twitter', 'social_portfolio']

class BlogPostListSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image', 'author', 
                 'category', 'tags', 'is_featured', 'read_time', 'views_count', 
                 'published_at']

class BlogPostDetailSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = BlogPost
        fields = '__all__'
```

### Services Serializers (services/serializers.py)

```python
from rest_framework import serializers
from .models import Service, ServiceFeature, ServiceBenefit, ServiceProcess

class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ['title', 'description']

class ServiceBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBenefit
        fields = ['title', 'description']

class ServiceProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProcess
        fields = ['step_number', 'title', 'description']

class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'short_description', 'featured_image', 
                 'timeline', 'starting_price', 'is_featured']

class ServiceDetailSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)
    benefits = ServiceBenefitSerializer(many=True, read_only=True)
    process_steps = ServiceProcessSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = '__all__'
```

## API Views

### Blog Views (blog/views.py)

```python
from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import BlogPost, Category
from .serializers import BlogPostListSerializer, BlogPostDetailSerializer, CategorySerializer

class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'author', 'is_featured']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['published_at', 'views_count']
    ordering = ['-published_at']
    
    def get_queryset(self):
        return BlogPost.objects.filter(status='published')

class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(status='published')
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class FeaturedPostsView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(status='published', is_featured=True)
    serializer_class = BlogPostListSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@api_view(['GET'])
def blog_stats(request):
    return Response({
        'total_posts': BlogPost.objects.filter(status='published').count(),
        'total_categories': Category.objects.count(),
        'featured_posts': BlogPost.objects.filter(status='published', is_featured=True).count(),
    })
```

### Services Views (services/views.py)

```python
from rest_framework import generics
from .models import Service
from .serializers import ServiceListSerializer, ServiceDetailSerializer

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceListSerializer

class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceDetailSerializer
    lookup_field = 'slug'

class FeaturedServicesView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True, is_featured=True)
    serializer_class = ServiceListSerializer
```

## URL Configuration

### Main URLs (technova_backend/urls.py)

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/blog/', include('blog.urls')),
    path('api/services/', include('services.urls')),
    path('api/portfolio/', include('portfolio.urls')),
    path('api/team/', include('team.urls')),
    path('api/testimonials/', include('testimonials.urls')),
    path('api/core/', include('core.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
]
```

### Blog URLs (blog/urls.py)

```python
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.BlogPostListView.as_view(), name='blog-list'),
    path('posts/<slug:slug>/', views.BlogPostDetailView.as_view(), name='blog-detail'),
    path('featured/', views.FeaturedPostsView.as_view(), name='featured-posts'),
    path('categories/', views.CategoryListView.as_view(), name='categories'),
    path('stats/', views.blog_stats, name='blog-stats'),
]
```

## Admin Configuration

### Blog Admin (blog/admin.py)

```python
from django.contrib import admin
from .models import BlogPost, Category, Author

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['user', 'role']
    list_filter = ['role']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'is_featured', 'published_at']
    list_filter = ['status', 'category', 'is_featured', 'author']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image')
        }),
        ('Metadata', {
            'fields': ('author', 'category', 'tags', 'read_time')
        }),
        ('Publishing', {
            'fields': ('status', 'is_featured', 'published_at')
        }),
    )
```

## Environment Variables (.env)

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## API Endpoints Summary

### Blog Endpoints
- `GET /api/blog/posts/` - List all blog posts (with filtering, search, pagination)
- `GET /api/blog/posts/{slug}/` - Get single blog post
- `GET /api/blog/featured/` - Get featured posts
- `GET /api/blog/categories/` - List categories
- `GET /api/blog/stats/` - Blog statistics

### Services Endpoints
- `GET /api/services/` - List all services
- `GET /api/services/{slug}/` - Get single service
- `GET /api/services/featured/` - Get featured services

### Portfolio Endpoints
- `GET /api/portfolio/projects/` - List projects
- `GET /api/portfolio/projects/{slug}/` - Get single project
- `GET /api/portfolio/featured/` - Get featured projects

### Team Endpoints
- `GET /api/team/members/` - List team members
- `GET /api/team/members/{id}/` - Get single team member

### Core Endpoints
- `GET /api/core/hero-slides/` - Get hero slides
- `GET /api/core/quick-links/` - Get quick links
- `GET /api/core/offers/` - Get offer cards
- `GET /api/core/settings/` - Get site settings

This structure provides a complete Django backend to manage all your Technova website content with a RESTful API that your React frontend can consume.
