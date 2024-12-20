import fs from 'fs'; import path from 'path';
const dir = './src/utils';
const listFiles = (dirPath) => {
    fs.readdirSync(dirPath).forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            listFiles(filePath);
        } else {
            console.log(filePath);
        }
    });
};
listFiles(dir);
