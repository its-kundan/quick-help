# Chrome Extension Setup & Deployment Guide

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [First Time Publishing](#first-time-publishing)
3. [Version Updates](#version-updates)
4. [Testing Locally](#testing-locally)
5. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### Prerequisites
- Google Chrome browser
- Google account for Chrome Web Store
- Node.js installed (for build process)

### Project Structure
```
0Quick-link/
├── manifest.json          # Extension configuration
├── package.json           # Project dependencies and scripts
├── index.html            # Popup interface
├── popup.js              # Popup functionality
├── styles.css            # Styling
├── data/                 # Data files
├── icons/                # Extension icons
├── build.js              # Build script
├── dist/                 # Built extension (generated)
└── setup.md              # This file
```

---

## First Time Publishing

### Step 1: Prepare Your Extension
```bash
# Install dependencies (if any)
npm install

# Build the extension
npm run build
```

### Step 2: Create Chrome Web Store Account
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Sign in with your Google account
3. Pay the one-time $5.00 registration fee (if not already done)
4. Accept the developer agreement

### Step 3: Package Your Extension
```bash
# Create a ZIP file for upload
powershell -command "Compress-Archive -Path 'dist/*' -DestinationPath 'quick-links-extension-v1.0.0.zip' -Force"
```

### Step 4: Upload to Chrome Web Store
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Click "Add new item"
3. Upload the ZIP file: `quick-links-extension-v1.0.0.zip`
4. Fill in the store listing information:
   - **App name**: Quick Links & Prompts
   - **Short description**: Access your frequently used links and AI prompts in one click
   - **Detailed description**: [Your detailed description]
   - **Category**: Productivity
   - **Language**: English

### Step 5: Add Store Assets
- **Icon**: Upload your 128x128 icon
- **Screenshots**: Add screenshots of your extension in action
- **Promotional images**: Create promotional graphics

### Step 6: Submit for Review
1. Review all information
2. Click "Submit for review"
3. Wait for Google's review (1-3 business days)

---

## Version Updates

### Step 1: Update Version Numbers
```bash
# Update version in manifest.json and package.json
# Current version: 1.0.1
# Next version: 1.0.2 (or 1.1.0 for major changes)
```

**Files to update:**
- `manifest.json` - Update the "version" field
- `package.json` - Update the "version" field

### Step 2: Build Updated Extension
```bash
# Clean and rebuild
npm run clean
npm run build
```

### Step 3: Package Updated Version
```bash
# Create ZIP with new version number
powershell -command "Compress-Archive -Path 'dist/*' -DestinationPath 'quick-links-extension-v1.0.2.zip' -Force"
```

### Step 4: Upload Update to Chrome Web Store
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Find your extension "Quick Links & Prompts"
3. Click on it to access extension details
4. Click "Package" or "Upload new version"
5. Upload the new ZIP file: `quick-links-extension-v1.0.2.zip`
6. Add release notes describing the changes
7. Click "Submit for review"

### Step 5: Update Store Listing (if needed)
- Update description if features changed
- Add new screenshots if UI changed
- Update promotional materials

---

## Testing Locally

### Load Extension for Testing
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist/` folder from your project
5. The extension will appear in your extensions list

### Test Changes
- Click the extension icon to test the popup
- Test all functionality
- Check for any console errors

### Reload After Changes
```bash
# After making changes, rebuild and reload
npm run build
# Then click "Reload" button in chrome://extensions/
```

---

## Version Numbering Guidelines

### Semantic Versioning (Recommended)
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes, major new features
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, minor improvements

### Examples
- `1.0.0` → `1.0.1` (bug fix)
- `1.0.1` → `1.1.0` (new feature)
- `1.1.0` → `2.0.0` (breaking change)

---

## Build Commands

### Available Scripts
```bash
# Build the extension
npm run build

# Build using shell script
npm run build:shell

# Clean dist folder
npm run clean
```

### Manual Build Process
1. `npm run clean` - Remove old build files
2. `npm run build` - Create new build in dist/
3. Test locally using chrome://extensions/
4. Create ZIP file for upload
5. Upload to Chrome Web Store

---

## Troubleshooting

### Common Issues

#### Build Fails
- Check if all required files exist
- Verify Node.js is installed
- Check for syntax errors in JavaScript files

#### Extension Won't Load
- Check manifest.json for syntax errors
- Verify all referenced files exist
- Check browser console for errors

#### Upload Rejected
- Ensure version number is incremented
- Check that all required fields are filled
- Verify extension follows Chrome Web Store policies

#### Update Not Showing
- Wait for Google's review process
- Check that version number is higher than current
- Verify ZIP file contains all necessary files

### Useful Commands
```bash
# Check current version
grep "version" manifest.json package.json

# List files in dist folder
ls -la dist/

# Check ZIP contents
powershell -command "Expand-Archive -Path 'quick-links-extension-v1.0.1.zip' -DestinationPath 'temp-check' -Force"
```

---

## File Checklist

Before publishing, ensure these files are present and correct:

### Required Files
- [ ] `manifest.json` (with correct version)
- [ ] `index.html`
- [ ] `popup.js`
- [ ] `styles.css`
- [ ] `icons/icon16.png`
- [ ] `icons/icon48.png`
- [ ] `icons/icon128.png`
- [ ] `data/data.js`

### Version Files
- [ ] `manifest.json` version updated
- [ ] `package.json` version updated
- [ ] ZIP file named with version number

---

## Notes

- **Review Time**: Google typically reviews updates in 1-3 business days
- **Automatic Updates**: Users receive updates automatically once approved
- **Rollback**: You can rollback to previous versions from the developer dashboard
- **Testing**: Always test locally before uploading to the store
- **Backup**: Keep backup copies of previous versions

---

*Last updated: Version 1.0.1*
