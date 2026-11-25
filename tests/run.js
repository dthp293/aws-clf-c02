// Runs every tests/*.test.js and exits non-zero if any fails. Usage: node tests/run.js  (or: npm test)
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js')).sort();
let failed = [];
for (const f of files) {
  console.log(`\n▶ ${f}`);
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, f), ROOT], { encoding: 'utf8' });
  const out = (r.stdout || '') + (r.stderr || '');
  // Print failures and the summary line; keep the log short when everything passes
  const lines = out.trimEnd().split('\n');
  const shown = r.status === 0 ? lines.filter(l => !/^ok\s/.test(l)).slice(-5) : lines;
  console.log(shown.join('\n'));
  if (r.status !== 0) failed.push(f);
}
console.log(`\n${files.length - failed.length}/${files.length} test files passed${failed.length ? ' — FAILED: ' + failed.join(', ') : ''}`);
process.exit(failed.length ? 1 : 0);
