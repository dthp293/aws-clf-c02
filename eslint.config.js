// Minimal lint: catch real bugs (undefined/unused variables, duplicate keys, unreachable code…) without style rules.
// Content data files (content/, i18n/) are plain data and are checked by tests/ instead.
const fs = require('fs');
const path = require('path');
const js = require('@eslint/js');
const globals = require('globals');
const espree = require('espree');

// `catch (e) { /* ignore */ }` is used on purpose (e.g. localStorage blocked); don't flag unused catch params
const rules = { ...js.configs.recommended.rules, 'no-unused-vars': ['error', { caughtErrors: 'none' }] };

// js/*.js are plain scripts that share one global scope (loaded in order by index.html). Each file may use what the
// others declare at top level, so collect those names and declare them as globals for every app file.
// tests/app-structure.test.js checks that each name is declared once and used somewhere.
const APP_DIR = path.join(__dirname, 'js');
const appGlobals = {};
for (const f of fs.readdirSync(APP_DIR).filter(f => f.endsWith('.js'))) {
  const ast = espree.parse(fs.readFileSync(path.join(APP_DIR, f), 'utf8'), { ecmaVersion: 2022, sourceType: 'script' });
  for (const node of ast.body) {
    if (node.type === 'FunctionDeclaration') appGlobals[node.id.name] = 'writable';
    if (node.type === 'VariableDeclaration') {
      for (const d of node.declarations) if (d.id.type === 'Identifier') appGlobals[d.id.name] = node.kind === 'const' ? 'readonly' : 'writable';
    }
  }
}

module.exports = [
  { ignores: ['node_modules/**', 'content/**', 'i18n/**'] },
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser, ...appGlobals },
    },
    // Top-level names are used from other files, so only unused locals are reported here.
    rules: { ...rules, 'no-unused-vars': ['error', { caughtErrors: 'none', vars: 'local' }], 'no-redeclare': ['error', { builtinGlobals: false }] },
  },
  {
    files: ['sw.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'script', globals: { ...globals.serviceworker } },
    rules,
  },
  {
    files: ['tests/**/*.js', 'scripts/**/*.js', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: { ...globals.node } },
    rules,
  },
];
