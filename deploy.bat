@echo off
echo 🚀 Starting Technova deployment process...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the project
echo 🔨 Building the project...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful! Ready for Vercel deployment.
    echo 📁 Build output is in the 'dist' directory
    echo.
    echo To deploy to Vercel:
    echo 1. Install Vercel CLI: npm i -g vercel
    echo 2. Run: vercel --prod
    echo.
) else (
    echo ❌ Build failed! Please check the errors above.
    exit /b 1
)
