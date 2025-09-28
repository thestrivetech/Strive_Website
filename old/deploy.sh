#!/bin/bash

# Strive Tech - Production Deployment Script
# This script automates the Vercel deployment process

echo "🚀 Starting Strive Tech Production Deployment..."

# Check if required CLIs are installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g @supabase/cli
fi

# Build the project locally first to catch any errors
echo "🔨 Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Local build successful!"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Post-deployment checklist:"
    echo "1. Verify database connection at /api/health/database"
    echo "2. Test contact form submission"
    echo "3. Test newsletter signup"
    echo "4. Test request form submission"
    echo "5. Check email notifications are working"
    echo ""
    echo "🎉 Your Strive Tech website is now live!"
else
    echo "❌ Deployment failed. Check the logs above for errors."
    exit 1
fi