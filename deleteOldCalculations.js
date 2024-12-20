import fs from 'fs';

const filesToDelete = [
  './src/utils/calculations/newCapitalCalculator.ts',
  './src/utils/calculations/core/oldCalculator.ts',
  './src/utils/calculations/financialCalculations.ts',
];

filesToDelete.forEach((file) => {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
      console.log(`Deleted: ${file}`);
    } catch (error) {
      console.error(`Failed to delete ${file}:`, error);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
