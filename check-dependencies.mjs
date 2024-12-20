import { readFile, readdir } from 'fs/promises';
import path from 'path';

const usedFiles = new Set();
const processedFiles = new Set();

async function findImports(content) {
  const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
  const imports = new Set();
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.add(match[1]);
  }
  return imports;
}

async function resolveImportPath(importPath, currentDir) {
  if (importPath.startsWith('.')) {
    const fullPath = path.resolve(currentDir, importPath);
    if (!fullPath.endsWith('.ts') && !fullPath.endsWith('.tsx')) {
      if (await fileExists(`${fullPath}.ts`)) return `${fullPath}.ts`;
      if (await fileExists(`${fullPath}.tsx`)) return `${fullPath}.tsx`;
      if (await fileExists(`${fullPath}/index.ts`)) return `${fullPath}/index.ts`;
      if (await fileExists(`${fullPath}/index.tsx`)) return `${fullPath}/index.tsx`;
    }
    return fullPath;
  }
  return importPath;
}

async function fileExists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

async function processFile(filePath) {
  if (processedFiles.has(filePath)) return;
  processedFiles.add(filePath);
  
  try {
    const content = await readFile(filePath, 'utf8');
    const imports = await findImports(content);
    
    usedFiles.add(filePath);
    
    for (const imp of imports) {
      if (!imp.startsWith('.')) continue; // Ignorer les imports de node_modules
      
      const fullPath = await resolveImportPath(imp, path.dirname(filePath));
      if (await fileExists(fullPath)) {
        await processFile(fullPath);
      }
    }
  } catch (error) {
    console.log(`⚠️ Impossible de lire ${filePath}:`, error.message);
  }
}

async function checkDependencies() {
  console.log('🔍 Analyse des dépendances...\n');
  
  // Commencer par App.tsx
  await processFile('src/App.tsx');
  
  // Lister tous les fichiers du projet
  const allFiles = new Set();
  
  async function scanDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!fullPath.includes('node_modules')) {
          await scanDir(fullPath);
        }
      } else if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
        allFiles.add(fullPath);
      }
    }
  }
  
  await scanDir('src');
  
  console.log('📊 Rapport d\'analyse :\n');
  console.log('Fichiers utilisés :');
  usedFiles.forEach(file => console.log('✅', file));
  
  console.log('\nFichiers potentiellement inutilisés :');
  allFiles.forEach(file => {
    if (!usedFiles.has(file)) {
      console.log('❌', file);
    }
  });
}

checkDependencies();