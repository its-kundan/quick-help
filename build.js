const fs = require('fs-extra');

const filesToCopy = ['manifest.json', 'index.html', 'popup.js', 'styles.css'];
const foldersToCopy = ['icons', 'data'];

async function build() {
  // Clean dist folder
  await fs.remove('dist');
  await fs.ensureDir('dist');

  // Copy files
  for (const file of filesToCopy) {
    await fs.copy(file, `dist/${file}`);
  }

  // Copy folders
  for (const folder of foldersToCopy) {
    await fs.copy(folder, `dist/${folder}`);
  }

  console.log('✅ dist/ folder is ready for deployment.');
}

build();
