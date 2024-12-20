import fs from 'fs';
import path from 'path';

const keywords = ['calculateCycle', 'calculateFinalCapital', 'initialCapital', 'newFinalCapital'];

const searchInFile = (filePath, keywords) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return keywords.some((keyword) => content.includes(keyword));
};

const walkDirectory = (dir, keywords) => {
  const results = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results.push(...walkDirectory(filePath, keywords));
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      if (searchInFile(filePath, keywords)) {
        results.push(filePath);
      }
    }
  });
  return results;
};

const files = walkDirectory('./src', keywords);
console.log('Files with references:', files);
