#!/bin/bash

# Clean previous build
rm -rf dist

# Create dist folder
mkdir dist

# Copy essential files
cp manifest.json index.html popup.js styles.css dist/

# Copy folders
cp -r icons dist/
cp -r data dist/

echo "✅ Build completed. Files copied to dist/"
