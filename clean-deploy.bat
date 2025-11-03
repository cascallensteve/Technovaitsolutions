@echo off
echo 🧹 Cleaning Vercel deployment cache...

REM Remove any local Vercel cache
if exist .vercel rmdir /s /q .vercel

REM Clear npm cache
npm cache clean --force

REM Install dependencies fresh
echo 📦 Installing dependencies...
npm install

echo ✅ Ready for clean deployment!
echo 🚀 Run: vercel --prod

pause
