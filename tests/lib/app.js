// Helpers for loading the app code (js/*.js, in index.html order) in tests.
const fs = require('fs'), path = require('path');
const scripts = root => [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const appScripts = root => scripts(root).filter(s => s.startsWith('js/'));
// All app code as one string (for static checks: used i18n keys, no Vietnamese literals…)
const appCode = root => appScripts(root).map(s => fs.readFileSync(path.join(root, s), 'utf8')).join('\n');
// The app wrapped in one function, with `hook` run at the end inside the same scope. Lets a test load the app many
// times in one context (top-level const/let of separate scripts would clash on a second load).
const appBundle = (root, hook = '') => '(() => {\n' + appCode(root) + '\n' + hook + '\n})();';
module.exports = { scripts, appScripts, appCode, appBundle };
