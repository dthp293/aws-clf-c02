// js/*.js are plain scripts sharing one global scope. Checks:
// - every top-level name is declared in exactly one file (a second `const x` would be a SyntaxError in the browser)
// - no top-level name shadows a browser global (e.g. a function called `close` or `status`)
// - every top-level name is used somewhere (dead code)
// - index.html loads every js/*.js file, core.js first and main.js last
// Usage: node tests/app-structure.test.js [project root]
const fs = require('fs'), path = require('path');
const espree = require('espree');
const globals = require('globals');
const { appScripts } = require('./lib/app.js');
const ROOT = process.argv[2] || path.resolve(__dirname, '..');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } else console.log('ok  ', m); };

const loaded = appScripts(ROOT);
const onDisk = fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).map(f => 'js/' + f).sort();
ok(JSON.stringify(loaded.slice().sort()) === JSON.stringify(onDisk), 'index.html loads every js/*.js file');
ok(loaded[0] === 'js/core.js' && loaded[loaded.length - 1] === 'js/main.js', 'js/core.js loads first and js/main.js last');

const decl = new Map();   // name → [files]
const code = {};
for (const f of loaded) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  code[f] = src;
  const ast = espree.parse(src, { ecmaVersion: 2022, sourceType: 'script' });
  const add = n => decl.set(n, [...(decl.get(n) || []), f]);
  for (const node of ast.body) {
    if (node.type === 'FunctionDeclaration') add(node.id.name);
    if (node.type === 'VariableDeclaration') node.declarations.forEach(d => d.id.type === 'Identifier' && add(d.id.name));
  }
}
const dup = [...decl].filter(([, fs]) => fs.length > 1).map(([n, fs]) => `${n} (${fs.join(', ')})`);
ok(!dup.length, `${decl.size} top-level names, each declared once ` + dup.join('; '));
// Other scripts on the page (inline <script> blocks, content/, i18n/ incl. en/ja loaded later) share the same global
// scope: their top-level var/let/const/function names must not collide with the app's.
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const others = [
  ...[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m, i) => ['index.html inline #' + (i + 1), m[1]]),
  ...[...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(f => !f.startsWith('js/')).map(f => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]),
  ...['en', 'ja'].flatMap(l => fs.readdirSync(path.join(ROOT, 'i18n', l)).map(f => [`i18n/${l}/${f}`, fs.readFileSync(path.join(ROOT, 'i18n', l, f), 'utf8')])),
];
// Names a script adds to the global scope: top-level function/let/const/var, plus `var` inside top-level blocks
// (e.g. `try { var x }`), which is hoisted to the global scope too. Function bodies are skipped.
function globalNames(program) {
  const out = [];
  const visit = (node, top) => {
    if (!node || typeof node.type !== 'string') return;
    if (/Function/.test(node.type) || node.type === 'ClassBody') { if (top && node.type === 'FunctionDeclaration') out.push(node.id.name); return; }
    if (node.type === 'VariableDeclaration' && (top || node.kind === 'var')) node.declarations.forEach(d => d.id.type === 'Identifier' && out.push(d.id.name));
    for (const k of Object.keys(node)) {
      if (k === 'parent') continue;
      const v = node[k];
      if (Array.isArray(v)) v.forEach(c => visit(c, false)); else if (v && typeof v.type === 'string') visit(v, false);
    }
  };
  program.body.forEach(n => visit(n, true));
  return out;
}
const otherNames = new Map();
for (const [name, src] of others) {
  globalNames(espree.parse(src, { ecmaVersion: 2022, sourceType: 'script' })).forEach(n => otherNames.set(n, [...(otherNames.get(n) || []), name]));
}
const pageClash = [...decl.keys()].filter(n => otherNames.has(n)).map(n => `${n} (${otherNames.get(n).join(', ')})`);
ok(!pageClash.length, `no app name collides with a global from the ${others.length} other page scripts ` + pageClash.join('; '));
const leaked = [...otherNames.keys()];
ok(!leaked.length, 'other page scripts declare no globals (wrap them in a function) ' + leaked.join(', '));
const browser = new Set(Object.keys(globals.browser));
const clash = [...decl.keys()].filter(n => browser.has(n));
ok(!clash.length, 'no top-level name shadows a browser global ' + clash.join(', '));
// strip comments and strings roughly, then count word occurrences
const all = Object.values(code).join('\n').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
const unused = [...decl.keys()].filter(n => (all.match(new RegExp('(?<![\\w$.])' + n.replace(/\$/g, '\\$') + '(?![\\w$])', 'g')) || []).length < 2);
ok(!unused.length, 'every top-level name is used ' + unused.join(', '));
console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
process.exit(fails ? 1 : 0);
