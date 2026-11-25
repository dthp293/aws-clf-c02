// Minimal lint: catch real bugs (undefined/unused variables, duplicate keys, unreachable code…) without style rules.
// Content data files (questions, lessons, i18n) are plain data and are checked by tests/ instead.
const js = require('@eslint/js');
const globals = require('globals');

// `catch (e) { /* ignore */ }` is used on purpose (e.g. localStorage blocked); don't flag unused catch params
const rules = { ...js.configs.recommended.rules, 'no-unused-vars': ['error', { caughtErrors: 'none' }] };

module.exports = [
  { ignores: ['node_modules/**'] },
  {
    files: ['app.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser },
    },
    rules,
  },
  {
    files: ['sw.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.serviceworker },
    },
    rules,
  },
  {
    files: ['tests/**/*.js', 'eslint.config.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules,
  },
  {
    // Only these files are linted; everything else (content data) is skipped.
    ignores: ['*.js', '!app.js', '!sw.js', '!eslint.config.js', 'course/**', 'exam/**', 'extra/**', 'meta/**', 'i18n/**'],
  },
];
