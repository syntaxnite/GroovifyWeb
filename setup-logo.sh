#!/bin/bash

# This script helps set up Groovify and provides information about the app

echo "===== Groovify Setup Script ====="
echo "Setting up necessary files for Groovify..."

# Create necessary directories
mkdir -p /Users/martinbenkhabeb-house/Desktop/GroovifyWeb/public/images

echo ""
echo "Setup complete! Your Groovify app is ready to use."
echo ""
echo "=== LOGO INFORMATION ==="
echo "Groovify now uses an embedded SVG logo component."
echo "The logo is defined in: src/components/GroovifyLogo.tsx"
echo "To customize it, simply edit that file."
echo ""
echo "=== NEXT STEPS ==="
echo "1. Set up your Spotify Developer credentials in .env.local"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 to view your app"
