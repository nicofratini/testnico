import fs from 'fs'; 
const filesToDelete = [
  './src/utils/financialCalculations.ts',
  './src/utils/calculations/leverageCalculator.ts',
];
filesToDelete.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log('Deleted: ' + file);
  } else {
    console.log('File not found: ' + file);
  }
});
