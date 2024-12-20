import fs from 'fs';
import path from 'path';

const searchDirectory = './src'; // Répertoire à explorer
const searchTerms = [
    'calculateFinalCapital',
    'calculateCycle',
    'newFinalCapital',
    'initialCapital',
];

function searchFiles(directory) {
    fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.join(directory, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            searchFiles(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            searchTerms.forEach((term) => {
                if (content.includes(term)) {
                    console.log(`${term} found in ${fullPath}`);
                }
            });
        }
    });
}

// Lancez la recherche dans le répertoire spécifié
searchFiles(searchDirectory);
