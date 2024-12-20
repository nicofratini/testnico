const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ProjectCleaner {
  constructor(projectPath) {
    this.projectPath = projectPath;
    this.fileHashes = new Map();
    this.duplicates = new Map();
    this.unusedFiles = new Set();
  }

  // Calculer le hash du contenu d'un fichier
  async calculateFileHash(filePath) {
    const content = await fs.promises.readFile(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
  }

  // Analyser tous les fichiers du projet
  async analyzeProject() {
    console.log('🔍 Analyse du projet en cours...');
    await this.scanDirectory(this.projectPath);
    await this.findDuplicates();
    await this.analyzeUnusedFiles();
    return {
      duplicates: this.duplicates,
      unusedFiles: this.unusedFiles
    };
  }

  // Scanner récursivement les répertoires
  async scanDirectory(dirPath) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (this.shouldSkipPath(fullPath)) continue;

      if (entry.isDirectory()) {
        await this.scanDirectory(fullPath);
      } else {
        const hash = await this.calculateFileHash(fullPath);
        
        if (!this.fileHashes.has(hash)) {
          this.fileHashes.set(hash, []);
        }
        this.fileHashes.get(hash).push(fullPath);
      }
    }
  }

  // Vérifier si le chemin doit être ignoré
  shouldSkipPath(filePath) {
    const ignorePaths = [
      'node_modules',
      '.git',
      'dist',
      'build',
      'coverage'
    ];
    
    return ignorePaths.some(ignore => filePath.includes(ignore)) ||
           path.basename(filePath).startsWith('.');
  }

  // Trouver les fichiers dupliqués
  async findDuplicates() {
    console.log('🔍 Recherche des doublons...');
    
    for (const [hash, files] of this.fileHashes.entries()) {
      if (files.length > 1) {
        // Analyse du contenu pour détecter les versions
        const versions = await this.analyzeVersions(files);
        this.duplicates.set(hash, versions);
      }
    }
  }

  // Analyser les versions des fichiers
  async analyzeVersions(files) {
    const versions = [];
    
    for (const file of files) {
      const content = await fs.promises.readFile(file, 'utf-8');
      const version = this.extractVersion(content) || 'unknown';
      versions.push({ path: file, version });
    }
    
    return versions;
  }

  // Extraire la version d'un fichier
  extractVersion(content) {
    const versionMatch = content.match(/version['":\s]+([0-9.]+)/i);
    return versionMatch ? versionMatch[1] : null;
  }

  // Analyser les fichiers non utilisés
  async analyzeUnusedFiles() {
    console.log('🔍 Recherche des fichiers non utilisés...');
    
    const imports = await this.createImportsIndex();
    
    for (const [hash, files] of this.fileHashes.entries()) {
      for (const file of files) {
        const relPath = path.relative(this.projectPath, file);
        if (!this.isFileReferenced(relPath, imports)) {
          this.unusedFiles.add(file);
        }
      }
    }
  }

  // Créer un index des imports dans le projet
  async createImportsIndex() {
    const imports = new Set();
    
    for (const [hash, files] of this.fileHashes.entries()) {
      for (const file of files) {
        const content = await fs.promises.readFile(file, 'utf-8');
        const fileImports = this.extractImports(content);
        fileImports.forEach(imp => imports.add(imp));
      }
    }
    
    return imports;
  }

  // Extraire les imports d'un fichier
  extractImports(content) {
    const imports = new Set();
    const importRegex = /(?:import|require)\s*\(?['"](.*?)['"]\)?/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.add(match[1]);
    }
    
    return imports;
  }

  // Vérifier si un fichier est référencé
  isFileReferenced(filePath, imports) {
    const criticalFiles = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'index.html',
      'main.tsx',
      'App.tsx'
    ];

    if (criticalFiles.includes(path.basename(filePath))) {
      return true;
    }

    return imports.has(filePath) || 
           imports.has('./' + filePath) || 
           imports.has('../' + filePath);
  }

  // Générer le rapport de nettoyage
  async generateReport() {
    const report = {
      duplicateFiles: [],
      unusedFiles: Array.from(this.unusedFiles),
      recommendations: []
    };

    for (const [hash, versions] of this.duplicates.entries()) {
      report.duplicateFiles.push({
        files: versions.map(v => v.path),
        versions: versions.map(v => v.version)
      });

      const newest = versions.reduce((a, b) => 
        (a.version === 'unknown' || b.version === 'unknown') ? a :
        (a.version > b.version ? a : b)
      );

      report.recommendations.push({
        type: 'duplicate',
        message: `Conserver ${path.basename(newest.path)} et supprimer les autres versions`,
        affectedFiles: versions.map(v => v.path).filter(p => p !== newest.path)
      });
    }

    for (const file of this.unusedFiles) {
      report.recommendations.push({
        type: 'unused',
        message: `Fichier potentiellement inutilisé : ${file}`,
        affectedFiles: [file]
      });
    }

    return report;
  }

  // Nettoyer le projet
  async cleanProject(options = { dryRun: true }) {
    const report = await this.generateReport();
    
    if (options.dryRun) {
      console.log('📋 Mode simulation (dry-run) - Aucun fichier ne sera supprimé');
    }

    console.log('\n🧹 Plan de nettoyage :');
    
    for (const rec of report.recommendations) {
      console.log(`\n${rec.type === 'duplicate' ? '📑' : '🗑'} ${rec.message}`);
      
      if (!options.dryRun) {
        for (const file of rec.affectedFiles) {
          try {
            await fs.promises.unlink(file);
            console.log(`✅ Supprimé : ${file}`);
          } catch (error) {
            console.error(`❌ Erreur lors de la suppression de ${file}:`, error);
          }
        }
      }
    }

    return report;
  }
}

// Exécution directe
async function main() {
  try {
    const cleaner = new ProjectCleaner(process.cwd());
    console.log('🚀 Début de l\'analyse du projet...');
    await cleaner.analyzeProject();
    
    console.log('\n📊 Exécution en mode simulation...');
    await cleaner.cleanProject({ dryRun: true });
    
    // En mode interactif, on demanderait confirmation ici
    // Pour l'instant, on ne fait que la simulation
    console.log('\n✅ Analyse terminée ! Pour effectuer le nettoyage réel, modifiez le script pour passer dryRun: false');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

main();