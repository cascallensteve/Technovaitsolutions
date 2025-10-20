# Technova - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Node.js 18+ installed
- Git repository
- Vercel account (free at vercel.com)

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect the settings

3. **Deployment Settings (Auto-detected):**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

## 📁 Project Structure for Deployment

```
Technova/
├── src/                    # Source code
├── public/                 # Static assets
│   ├── images/            # Project images
│   └── vedio/             # Video files
├── dist/                  # Build output (auto-generated)
├── vercel.json            # Vercel configuration
├── .vercelignore          # Files to ignore during deployment
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## ⚙️ Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Key Features:
- **SPA Routing:** All routes redirect to index.html for client-side routing
- **Asset Caching:** Static assets cached for 1 year
- **Framework Detection:** Optimized for Vite builds

## 🔧 Build Process

### Local Build Test:
```bash
npm install
npm run build
npm run preview
```

### Build Output:
- **Location:** `dist/` directory
- **Assets:** Optimized and minified
- **Chunks:** Vendor code split for better caching

## 🌐 Domain Configuration

### Custom Domain (Optional):
1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Environment Variables:
- No environment variables required for basic deployment
- Add any API keys or secrets in Vercel dashboard under "Settings" → "Environment Variables"

## 📊 Performance Optimizations

### Already Configured:
- ✅ Code splitting (vendor, router chunks)
- ✅ Asset optimization and minification
- ✅ Gzip compression
- ✅ Static asset caching
- ✅ Tree shaking for smaller bundles

### Bundle Analysis:
```bash
npm run build -- --mode analyze
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check TypeScript errors: `npx tsc --noEmit`
   - Verify dependencies: `npm install`

2. **Routing Issues:**
   - Ensure `vercel.json` rewrites are configured
   - Check React Router setup in `App.tsx`

3. **Asset Loading:**
   - Verify public assets are in `public/` directory
   - Check asset paths use relative URLs

### Debug Commands:
```bash
# Check build locally
npm run build && npm run preview

# Verify TypeScript
npx tsc --noEmit

# Check dependencies
npm audit
```

## 📱 Mobile & Performance

### Optimizations Included:
- Responsive design with Tailwind CSS
- Optimized images and videos
- Lazy loading components
- Efficient bundle splitting

### Lighthouse Scores Target:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## 🚀 Deployment Checklist

- [ ] Code pushed to repository
- [ ] Build passes locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] All assets in `public/` directory
- [ ] WhatsApp number updated in component
- [ ] Vercel account connected
- [ ] Domain configured (if custom)

## 📞 Support

For deployment issues:
- Check Vercel deployment logs
- Review build output for errors
- Verify configuration files
- Contact: WhatsApp +254712665257

---

**Ready to deploy!** 🎉

Your Technova website is now fully configured for Vercel deployment with optimized performance, proper routing, and all assets ready.
