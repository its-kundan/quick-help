#!/bin/bash

# Chrome Extension Build Script
# This script creates a dist/ folder with only the essential files needed for the Chrome extension

echo "🚀 Starting Chrome extension build..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

# Clean dist folder
print_status "🧹 Cleaning dist folder..."
rm -rf dist
mkdir -p dist

# Essential files for Chrome extension
ESSENTIAL_FILES=("manifest.json" "index.html" "popup.js" "styles.css")

# Essential folders for Chrome extension
ESSENTIAL_FOLDERS=("icons" "data")

# Copy essential files
print_status "📁 Copying essential files..."
for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "dist/$file"
        print_success "  ✅ Copied: $file"
    else
        print_warning "  ⚠️  Warning: $file not found"
    fi
done

# Copy essential folders
print_status "📂 Copying essential folders..."
for folder in "${ESSENTIAL_FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        cp -r "$folder" "dist/$folder"
        print_success "  ✅ Copied: $folder/"
    else
        print_warning "  ⚠️  Warning: $folder/ not found"
    fi
done

# Verify essential files exist in dist
print_status "🔍 Verifying build..."
ESSENTIAL_VERIFY=(
    "dist/manifest.json"
    "dist/index.html"
    "dist/popup.js"
    "dist/styles.css"
    "dist/icons/icon16.png"
    "dist/icons/icon48.png"
    "dist/icons/icon128.png"
    "dist/data/data.js"
)

all_files_exist=true
for file in "${ESSENTIAL_VERIFY[@]}"; do
    if [ -f "$file" ]; then
        print_success "  ✅ Verified: ${file#dist/}"
    else
        print_error "  ❌ Missing: ${file#dist/}"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = true ]; then
    echo ""
    print_success "🎉 Build completed successfully!"
    print_success "📦 Your Chrome extension is ready in the dist/ folder"
    echo ""
    print_status "💡 To load in Chrome:"
    echo "   1. Open chrome://extensions/"
    echo "   2. Enable \"Developer mode\""
    echo "   3. Click \"Load unpacked\""
    echo "   4. Select the dist/ folder"
else
    echo ""
    print_error "❌ Build failed: Some essential files are missing"
    exit 1
fi
