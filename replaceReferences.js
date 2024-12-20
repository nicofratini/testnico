import fs from 'fs'; import path from 'path';
const replaceReferences = (dir, oldRef, newRef) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceReferences(filePath, oldRef, newRef);
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(oldRef)) {
        const updatedContent = content.replace(new RegExp(oldRef, 'g'), newRef);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log('Replaced ' + oldRef + ' with ' + newRef + ' in ' + filePath);
      }
    }
  });
};
replaceReferences('./src', 'oldCalculateFinalCapital', 'calculateFinalCapital');
