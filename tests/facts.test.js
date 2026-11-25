// Fact register (tests/facts.json): every entry has an official AWS source, and outdated values listed under
// `deny` do not appear anywhere in the content or its translations (unless the sentence says it is the old value).
// Usage: node tests/facts.test.js [project root]
const fs = require('fs'), path = require('path');
const ROOT = process.argv[2] || path.resolve(__dirname, '..');
const R = JSON.parse(fs.readFileSync(path.join(__dirname, 'facts.json'), 'utf8'));
let fails = 0;
const ok = (c, m, list = []) => { if (!c) { fails++; console.log('FAIL', m + (list.length ? ':\n  ' + list.slice(0, 10).join('\n  ') : '')); } else console.log('ok  ', m); };

const OFFICIAL = /^https:\/\/(docs\.aws\.amazon\.com|aws\.amazon\.com|d1\.awsstatic\.com)\//;
const noSource = R.facts.filter(f => !(f.sources || []).length || !f.sources.every(u => OFFICIAL.test(u))).map(f => f.id);
ok(!noSource.length, `${R.facts.length} registered facts each cite an official AWS page`, noSource);
const badResult = R.facts.filter(f => !['confirmed', 'fixed', 'indirect'].includes(f.result) || ![1, 2].includes(f.checks) || (f.checks === 2 && !f.quote && !f.id.startsWith('q:'))).map(f => f.id);
ok(!badResult.length, 'each fact says how it was checked (result, number of checks; a quote when double-checked)', badResult);
ok(R.deny.every(d => OFFICIAL.test(d.source) && d.why), `${R.deny.length} deny rules each give a reason and an official source`);

// all text the learner can see: content/ (Vietnamese source) and i18n/ (English, Japanese)
const files = [];
const walk = d => fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith('.js')) files.push(p); });
walk(path.join(ROOT, 'content')); walk(path.join(ROOT, 'i18n'));
const text = files.map(f => [path.relative(ROOT, f), fs.readFileSync(f, 'utf8')]);
for (const d of R.deny) {
  // near: only count a match when this topic is mentioned close by; allowIf: skip a match when its context says it is
  // the old value or another topic; window: how many characters around the match form that context
  const re = new RegExp(d.pattern, 'gi'), allow = d.allowIf ? new RegExp(d.allowIf, 'i') : null, near = d.near ? new RegExp(d.near, 'i') : null;
  const w = d.window || 100;
  const hits = [];
  for (const [f, s] of text) {
    for (const m of s.matchAll(re)) {
      const ctx = s.slice(Math.max(0, m.index - w), m.index + m[0].length + w);
      const wide = s.slice(Math.max(0, m.index - 150), m.index + m[0].length + 150);
      if (near && !near.test(wide)) continue;
      if (!allow || !allow.test(ctx)) hits.push(`${f}: …${ctx.replace(/\s+/g, ' ')}…`);
    }
  }
  ok(!hits.length, `no outdated value: ${d.why}`, hits);
}
console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
process.exit(fails ? 1 : 0);
