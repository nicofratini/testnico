import { readdir, readFile } from 'fs/promises';
import path from 'path';

// Fichiers essentiels à ne jamais marquer comme inutilisés
const ESSENTIAL_FILES = new Set([
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/vite-env.d.ts',
  'src/components/Layout.tsx',
  'src/components/parameters/ParameterCard.tsx',
  'src/components/results/ResultsSummary.tsx',
  'src/components/timeline/index.ts',
  'src/hooks/useSimulation.ts',
  'src/i18n/index.ts'
]);

class DependencyAnalyzer {
  constructor() {
    this.dependencies = new Map();
    this.usedFiles = new Set(ESSENTIAL_FILES);
  }

  async analyze() {
    await this.scanDirectory('src');
    await this.buildDependencyTree();
    return this.getUnusedFiles();
  }

  async scanDirectory(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !this.shouldSkipDir(entry.name)) {
        await this.scanDirectory(fullPath);
      } else if (this.isRelevantFile(entry.name)) {
        await this.analyzeFile(fullPath);
      }
    }
  }

  shouldSkipDir(dirname) {
    return ['node_modules', '.git', 'dist', 'build'].includes(dirname);
  }

  isRelevantFile(filename) {
    return /\.(tsx?|jsx?)$/.test(filename);
  }

  async analyzeFile(filepath) {
    try {
      const content = await readFile(filepath, 'utf-8');
      const imports = this.extractImports(content);
      this.dependencies.set(filepath, imports);
    } catch (error) {
      console.log(`Note: Fichier ${filepath} non accessible`);
    }
  }

  extractImports(content) {
    const imports = new Set();
    // Import classique
    const importRegex = /import\s+(?:[^"']*from\s+)?['"]([^"']+)['"]/g;
    // Import dynamique
    const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.add(match[1]);
    }
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      imports.add(match[1]);
    }
    
    return imports;
  }

  async buildDependencyTree(startingFiles = ESSENTIAL_FILES) {
    const visited = new Set();

    const processFile = async (file) => {
      if (visited.has(file)) return;
      visited.add(file);
      this.usedFiles.add(file);

      const deps = this.dependencies.get(file);
      if (!deps) return;

      for (const imp of deps) {
        const resolvedPath = this.resolveImportPath(imp, file);
        if (resolvedPath) {
          await processFile(resolvedPath);
        }
      }
    };

    for (const file of startingFiles) {
      await processFile(file);
    }
  }

  resolveImportPath(importPath, currentFile) {
    if (importPath.startsWith('.')) {
      const currentDir = path.dirname(currentFile);
      let resolvedPath = path.resolve(currentDir, importPath);
      
      // Gestion des extensions
      if (!this.dependencies.has(resolvedPath)) {
        const extensions = ['.ts', '.tsx', '.js', '.jsx'];
        for (const ext of extensions) {
          if (this.dependencies.has(resolvedPath + ext)) {
            return resolvedPath + ext;
          }
        }
        // Gestion des index files
        for (const ext of extensions) {
          if (this.dependencies.has(path.join(resolvedPath, 'index' + ext))) {
            return path.join(resolvedPath, 'index' + ext);
          }
        }
      }
      return resolvedPath;
    }
    return null;
  }

  getUnusedFiles() {
    const unused = {
      components: [],
      utils: [],
      tests: [],
      others: []
    };

    for (const [file] of this.dependencies) {
      if (!this.usedFiles.has(file) && !ESSENTIAL_FILES.has(file)) {
        if (file.includes('/__tests__/')) {
          unused.tests.push(file);
        } else if (file.includes('/components/')) {
          unused.components.push(file);
        } else if (file.includes('/utils/')) {
          unused.utils.push(file);
        } else {
          unused.others.push(file);
        }
      }
    }

    return unused;
  }
}

// Exécution
async function main() {
  console.log('🔍 Analyse des dépendances...\n');
  
  const analyzer = new DependencyAnalyzer();
  const unusedFiles = await analyzer.analyze();
  
  console.log('📊 Fichiers potentiellement non utilisés :\n');
  
  if (unusedFiles.components.length) {
    console.log('Composants :');
    unusedFiles.components.sort().forEach(f => console.log(`- ${f}`));
    console.log();
  }
  
  if (unusedFiles.utils.length) {
    console.log('Utilitaires :');
    unusedFiles.utils.sort().forEach(f => console.log(`- ${f}`));
    console.log();
  }
  
  if (unusedFiles.tests.length) {
    console.log('Tests :');
    unusedFiles.tests.sort().forEach(f => console.log(`- ${f}`));
    console.log();
  }
  
  if (unusedFiles.others.length) {
    console.log('Autres :');
    unusedFiles.others.sort().forEach(f => console.log(`- ${f}`));
  }
  
  const total = Object.values(unusedFiles).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`\n✨ Total : ${total} fichiers potentiellement inutilisés`);

  // Afficher les fichiers importants qui sont utilisés
  console.log('\n🔒 Fichiers essentiels préservés :');
  console.log([...ESSENTIAL_FILES].sort().join('\n'));
}

main().catch(console.error);