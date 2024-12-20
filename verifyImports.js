import fs from 'fs'; import path from 'path';
const dir = './src';
const searchKeyword = 'calculateFinalCapital';
const searchFiles = (dirPath) => {
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      searchFiles(filePath);
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(searchKeyword)) {
        console.log('Keyword \'' + searchKeyword + '\' found in ' + filePath);
      }
    }
  });
};
searchFiles(dir);
