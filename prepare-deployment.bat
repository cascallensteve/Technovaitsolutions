@echo off
echo 🚀 Preparing Technova for deployment...

echo.
echo 📋 Step 1: Cleaning previous builds and cache...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist .vite rmdir /s /q .vite
if exist .vercel rmdir /s /q .vercel

echo.
echo 📦 Step 2: Installing dependencies...
npm install

echo.
echo 🔨 Step 3: Testing build process...
npm run build

if %errorlevel% equ 0 (
    echo.
    echo ✅ Build successful! 
    echo 📁 Build output created in 'dist' directory
    echo.
    echo 🌐 Step 4: Testing preview...
    echo You can test locally with: npm run preview
    echo.
    echo 🚀 Ready for Vercel deployment!
    echo.
    echo To deploy:
    echo 1. Make sure you're logged into Vercel CLI: vercel login
    echo 2. Deploy: vercel --prod
    echo.
) else (
    echo.
    echo ❌ Build failed! Please check the errors above.
    echo Fix any issues before deploying.
    pause
    exit /b 1
)

pause
