import fs from 'fs';

const filesToCheck = [
  './src/components/results/ResultsSummary.tsx',
  './src/components/results/SummaryCards.tsx',
  './src/utils/calculations/capitalCalculations.ts',
];

filesToCheck.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  const updatedContent = content.replace(
    /import { calculateFinalCapital } from ['\"](.*?)['\"]/g,
    'import { calculateFinalCapital } from \'../capital/finalCapital\''
  );
  fs.writeFileSync(file, updatedContent, 'utf8');
  console.log('Updated import path in: ' + file);
});
