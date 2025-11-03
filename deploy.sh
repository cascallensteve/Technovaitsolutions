#!/bin/bash

echo "🚀 Starting Technova deployment process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for Vercel deployment."
    echo "📁 Build output is in the 'dist' directory"
    echo ""
    echo "To deploy to Vercel:"
    echo "1. Install Vercel CLI: npm i -g vercel"
    echo "2. Run: vercel --prod"
    echo ""
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
