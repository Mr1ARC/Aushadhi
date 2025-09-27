#!/bin/bash

echo "🚀 Aushadhi-OCR Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if remote origin exists
if ! git remote | grep -q origin; then
    echo "Please add your GitHub repository as origin:"
    echo "git remote add origin https://github.com/yourusername/aushadhi-ocr.git"
    exit 1
fi

# Add all changes
echo "Adding changes to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Deploy: $(date)"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com and deploy your Frontend folder"
echo "2. Go to https://railway.app and deploy your backend folder"
echo "3. Update environment variables with your backend URL"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
