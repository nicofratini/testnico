import fs from 'fs';
import path from 'path';

const searchExports = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchExports(fullPath); // Recherche récursive dans les sous-dossiers
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('export')) {
        console.log(`Export found in ${fullPath}`);
      }
    }
  });
};

// Dossier à analyser
const timelineDir = './src/components/timeline';
if (fs.existsSync(timelineDir)) {
  searchExports(timelineDir);
} else {
  console.error(`Directory not found: ${timelineDir}`);
}
