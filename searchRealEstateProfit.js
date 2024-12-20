import fs from 'fs'; import path from 'path';

const searchKeyword = 'calculateRealEstateProfit';
const dir = 'src';

const searchFiles = (dir, keyword) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      searchFiles(filePath, keyword);
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(keyword)) {
        console.log('Keyword \'' + keyword + '\' found in ' + filePath);
      }
    }
  });
};

searchFiles(dir, searchKeyword);
