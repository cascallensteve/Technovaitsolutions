@echo off
echo 🔍 Verifying Technova deployment readiness...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    exit /b 1
) else (
    echo ✅ Node.js is installed
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    exit /b 1
) else (
    echo ✅ npm is available
)

REM Check if package.json exists
if not exist package.json (
    echo ❌ package.json not found
    exit /b 1
) else (
    echo ✅ package.json found
)

REM Check if vercel.json exists
if not exist vercel.json (
    echo ❌ vercel.json not found
    exit /b 1
) else (
    echo ✅ vercel.json configured
)

REM Install dependencies
echo.
echo 📦 Installing dependencies...
npm install >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
) else (
    echo ✅ Dependencies installed
)

REM Run TypeScript check
echo.
echo 🔍 Checking TypeScript...
npx tsc --noEmit >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ TypeScript errors found
    echo Run 'npx tsc --noEmit' to see details
    exit /b 1
) else (
    echo ✅ TypeScript check passed
)

REM Test build
echo.
echo 🔨 Testing build process...
npm run build >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Build failed
    echo Run 'npm run build' to see details
    exit /b 1
) else (
    echo ✅ Build successful
)

REM Check if dist directory exists
if not exist dist (
    echo ❌ dist directory not created
    exit /b 1
) else (
    echo ✅ Build output created in dist/
)

REM Check if index.html exists in dist
if not exist dist\index.html (
    echo ❌ index.html not found in dist/
    exit /b 1
) else (
    echo ✅ index.html generated
)

echo.
echo 🎉 Deployment verification complete!
echo.
echo Your Technova project is ready for Vercel deployment.
echo.
echo Next steps:
echo 1. Install Vercel CLI: npm install -g vercel
echo 2. Login to Vercel: vercel login
echo 3. Deploy: vercel --prod
echo.
echo Or push to GitHub and connect via Vercel dashboard.
echo.
pause
