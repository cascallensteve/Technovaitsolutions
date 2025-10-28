@echo off
echo 🔧 Fixing Tailwind CSS v4 setup...

echo 📦 Installing missing tailwindcss package...
npm install

echo 🧹 Clearing Vite cache...
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist .vite rmdir /s /q .vite

echo ✅ Tailwind CSS v4 setup complete!
echo 🚀 You can now run: npm run dev

pause
