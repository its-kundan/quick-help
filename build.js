const fs = require('fs-extra');
const path = require('path');

// Essential files for Chrome extension
const filesToCopy = [
  'manifest.json',
  'index.html', 
  'popup.js',
  'styles.css'
];

// Essential folders for Chrome extension
const foldersToCopy = [
  'icons',
  'data'
];

// Optional: Add any additional files that might be needed
const additionalFiles = [
  // Add any other files your extension might need
];

async function build() {
  try {
    console.log('🚀 Starting Chrome extension build...');
    
    // Clean dist folder
    console.log('🧹 Cleaning dist folder...');
    await fs.remove('dist');
    await fs.ensureDir('dist');
    
    // Copy essential files
    console.log('📁 Copying essential files...');
    for (const file of filesToCopy) {
      if (await fs.pathExists(file)) {
        await fs.copy(file, `dist/${file}`);
        console.log(`  ✅ Copied: ${file}`);
      } else {
        console.warn(`  ⚠️  Warning: ${file} not found`);
      }
    }
    
    // Copy essential folders
    console.log('📂 Copying essential folders...');
    for (const folder of foldersToCopy) {
      if (await fs.pathExists(folder)) {
        await fs.copy(folder, `dist/${folder}`);
        console.log(`  ✅ Copied: ${folder}/`);
      } else {
        console.warn(`  ⚠️  Warning: ${folder}/ not found`);
      }
    }
    
    // Copy additional files if they exist
    if (additionalFiles.length > 0) {
      console.log('📄 Copying additional files...');
      for (const file of additionalFiles) {
        if (await fs.pathExists(file)) {
          await fs.copy(file, `dist/${file}`);
          console.log(`  ✅ Copied: ${file}`);
        }
      }
    }
    
    // Verify essential files exist in dist
    console.log('🔍 Verifying build...');
    const essentialFiles = [
      'dist/manifest.json',
      'dist/index.html',
      'dist/popup.js',
      'dist/styles.css',
      'dist/icons/icon16.png',
      'dist/icons/icon48.png', 
      'dist/icons/icon128.png',
      'dist/data/data.js'
    ];
    
    let allFilesExist = true;
    for (const file of essentialFiles) {
      if (await fs.pathExists(file)) {
        console.log(`  ✅ Verified: ${file.replace('dist/', '')}`);
      } else {
        console.error(`  ❌ Missing: ${file.replace('dist/', '')}`);
        allFilesExist = false;
      }
    }
    
    if (allFilesExist) {
      console.log('\n🎉 Build completed successfully!');
      console.log('📦 Your Chrome extension is ready in the dist/ folder');
      console.log('💡 To load in Chrome:');
      console.log('   1. Open chrome://extensions/');
      console.log('   2. Enable "Developer mode"');
      console.log('   3. Click "Load unpacked"');
      console.log('   4. Select the dist/ folder');
    } else {
      console.error('\n❌ Build failed: Some essential files are missing');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run the build
build();
