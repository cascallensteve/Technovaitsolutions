# Technova Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prepare for Deployment
Run the preparation script:
```bash
./prepare-deployment.bat
```

This will:
- Clean previous builds and cache
- Install dependencies
- Test the build process
- Verify everything is working

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Login to Vercel (if not already logged in)
vercel login

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect it's a Vite project
4. Deploy!

## 📋 Project Configuration

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite (auto-detected)

### Key Files
- `vercel.json` - Deployment configuration
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Tailwind CSS v4 configuration
- `postcss.config.js` - PostCSS configuration

## 🔧 Troubleshooting

### Common Issues

1. **Tailwind CSS not working**
   - Run: `npm install` to ensure `tailwindcss` package is installed
   - Clear cache: Delete `node_modules/.vite` and `.vite` folders

2. **Build fails**
   - Check TypeScript errors: `npm run lint`
   - Ensure all imports are correct
   - Verify all page components exist

3. **Deployment fails**
   - Check `vercel.json` is minimal and correct
   - Ensure no function runtime configurations
   - Clear Vercel cache: Delete `.vercel` folder

### Environment Requirements
- Node.js 18+ 
- npm 9+
- Tailwind CSS v4
- React 19
- Vite with Rolldown

## 📁 Project Structure
```
Technova/
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── App.tsx       # Main app component
│   ├── main.tsx      # Entry point
│   └── index.css     # Global styles with Tailwind
├── vercel.json       # Vercel configuration
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies and scripts
```

## ✅ Deployment Checklist
- [ ] All dependencies installed
- [ ] Build process works locally
- [ ] Tailwind CSS v4 configured correctly
- [ ] All page routes working
- [ ] No TypeScript errors
- [ ] Vercel configuration is minimal
- [ ] Git repository is up to date
