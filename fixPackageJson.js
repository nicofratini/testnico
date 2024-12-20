const fs = require('fs'); const correctedPackageJson = {
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\": \"vite-react-typescript-starter\",
  \"private\": true,
  \"version\": \"0.0.0\",
  \"type\": \"module\",
  \"scripts\": {
    \"dev\": \"vite\",
    \"build\": \"vite build\",
    \"lint\": \"eslint .\",
    \"preview\": \"vite preview\",
    \"test\": \"node --experimental-vm-modules node_modules/.bin/jest\",
    \"test:watch\": \"node --experimental-vm-modules node_modules/.bin/jest --watchAll\"
  },
  \"dependencies\": {
    \"chart.js\": \"^4.4.7\",
    \"lucide-react\": \"^0.344.0\",
    \"react\": \"^18.3.1\",
    \"react-chartjs-2\": \"^5.2.0\",
    \"react-dom\": \"^18.3.1\"
  },
  \"devDependencies\": {
    \"@babel/core\": \"^7.26.0\",
    \"@babel/preset-env\": \"^7.26.0\",
    \"@babel/preset-react\": \"^7.26.3\",
    \"@babel/preset-typescript\": \"^7.26.0\",
    \"@eslint/js\": \"^9.9.1\",
    \"@types/jest\": \"^29.5.14\",
    \"@types/react\": \"^18.3.5\",
    \"@types/react-dom\": \"^18.3.0\",
    \"@vitejs/plugin-react\": \"^4.3.1\",
    \"autoprefixer\": \"^10.4.18\",
    \"babel-jest\": \"^29.7.0\",
    \"eslint\": \"^9.9.1\",
    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",
    \"eslint-plugin-react-refresh\": \"^0.4.11\",
    \"globals\": \"^15.9.0\",
    \"identity-obj-proxy\": \"^3.0.0\",
    \"jest\": \"^29.7.0\",
    \"jest-environment-jsdom\": \"^29.7.0\",
    \"postcss\": \"^8.4.35\",
    \"tailwindcss\": \"^3.4.1\",
    \"ts-jest\": \"^29.2.5\",
    \"typescript\": \"^5.7.2\",
    \"typescript-eslint\": \"^8.3.0\",
    \"vite\": \"^5.4.2\"
  }
};
fs.writeFileSync('package.json', JSON.stringify(correctedPackageJson, null, 2));
