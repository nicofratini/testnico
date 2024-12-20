import { build } from 'esbuild';
import fs from 'fs';

(async () => {
    const dependencies = new Set();

    // Build avec esbuild pour capturer les dépendances
    await build({
        entryPoints: ['./src/main.tsx'], // Point d'entrée principal
        bundle: true,
        write: false,
        plugins: [{
            name: 'dependency-tracker',
            setup(build) {
                build.onResolve({ filter: /.*/ }, args => {
                    if (!args.path.startsWith('.')) return; // Exclure les modules node
                    dependencies.add(args.path);
                });
            }
        }]
    });

    const depArray = Array.from(dependencies).map(dep => `src/${dep}`);
    fs.writeFileSync('usedDependencies.json', JSON.stringify(depArray, null, 2));
    console.log('Fichiers utilisés listés dans usedDependencies.json');
})();
