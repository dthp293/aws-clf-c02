// Coverage of the en/ja translations against the Vietnamese source:
// every question has exp/why (ja also q/opts), every lesson/glossary/service/quick summary exists with the same shape,
// node --check passes and no Vietnamese text is left.
// Usage: node tests/translation-coverage.test.js [project root]
const fs = require('fs'), path = require('path'), cp = require('child_process');
const load = require('./lib/load.js');
const ROOT = process.argv[2] || path.resolve(__dirname, '..');

const VI_RE = /[ăâđêôơưĂÂĐÊÔƠƯàảãạằẳẵặắầẩẫậấèẻẽẹềểễệếìỉĩịòỏõọồổỗộốờởỡợớùủũụừửữựứỳỷỹỵýÀẢÃẠÈẺẼẸÌỈĨỊÒỎÕỌÙỦŨỤỲỶỸỴ]/;
const tags = h => (h.match(/<\/?[a-zA-Z][^>]*>/g) || []).map(t => t.replace(/\s+/g, ' '));
const eq = (a, b) => JSON.stringify(a.slice().sort()) === JSON.stringify(b.slice().sort());
const FILES = ['data', 'q-1', 'q-2', 'q-3', 'q-4', 'q-5', 'q-6', 'q-7', 'q-8', 'course-a', 'course-b', 'course-c', 'course-d', 'course-e', 'course-f'];

function checkLesson(v, o, errs) {
  const id = v.id;
  if (typeof o.title !== 'string' || !o.title.trim()) errs.push(id + ': title missing');
  for (const k of ['goals', 'summary', 'terms']) {
    if (!Array.isArray(o[k]) || o[k].length !== (v[k] || []).length) errs.push(`${id}: ${k} length ${o[k] && o[k].length} != ${(v[k] || []).length}`);
  }
  (o.terms || []).forEach((t, i) => {
    if (!Array.isArray(t) || t.length !== 2) errs.push(`${id}: terms[${i}] must be [term, meaning]`);
    else if (v.terms[i] && t[0] !== v.terms[i][0]) errs.push(`${id}: terms[${i}][0] "${t[0]}" must equal "${v.terms[i][0]}"`);
  });
  if (typeof o.html !== 'string') { errs.push(id + ': html missing'); return; }
  const a = tags(v.html), b = tags(o.html);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) { errs.push(`${id}: HTML tag #${i} differs: source ${a[i]} vs ${b[i]}`); break; }
  }
}

function verify(lang) {
  const files = FILES.map(f => `i18n/${lang}/${f}.js`);
  const errs = [];
  for (const f of files) {
    try { cp.execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); }
    catch (e) { errs.push('node --check ' + f + ': ' + e.stderr); }
  }
  if (errs.length) return errs;
  const W = load(ROOT, files), C = W.CLF, L = W.CLF_I18N[lang];
  const all = [...C.questions, ...C.examPool];
  for (const q of all) {
    const o = L.q[q.id];
    if (!o) { errs.push('question missing ' + q.id); continue; }
    if (!o.exp || !o.exp.trim()) errs.push(q.id + ': exp empty');
    if (!Array.isArray(o.why) || o.why.length !== q.opts.length) errs.push(q.id + ': why length');
    else o.why.forEach((w, i) => { if (q.why && q.why[i] && !w.trim()) errs.push(`${q.id}: why[${i}] empty`); });
    // ja shows translated questions (the exam is offered in Japanese)
    if (lang === 'ja') {
      if (typeof o.q !== 'string' || !o.q.trim()) errs.push(q.id + ': q (stem) missing');
      if (!Array.isArray(o.opts) || o.opts.length !== q.opts.length || o.opts.some(s => typeof s !== 'string' || !s.trim())) errs.push(q.id + ': opts missing or wrong length');
    }
  }
  const ids = new Set(all.map(q => q.id));
  const extra = Object.keys(L.q).filter(k => !ids.has(k));
  if (extra.length) errs.push('unknown question ids: ' + extra.join(', '));
  for (const l of C.course) {
    const o = L.course[l.id];
    if (!o) errs.push('lesson missing ' + l.id); else checkLesson(l, o, errs);
  }
  if (!eq(Object.keys(L.glossary), C.glossary.map(g => g.term))) errs.push('glossary keys differ from the Vietnamese source');
  if (!eq(Object.keys(L.services), C.services.map(s => s.name))) errs.push('services keys differ from the Vietnamese source');
  if (!eq(Object.keys(L.domains), ['1', '2', '3', '4'])) errs.push('domains keys');
  if (!eq(Object.keys(L.lessons), Object.keys(C.lessons))) errs.push('quick summary keys');
  Object.keys(C.lessons).forEach(d => {
    const a = C.lessons[d], b = L.lessons[d];
    if (!b || b.length !== a.length) { errs.push(`quick summary ${d}: length`); return; }
    a.forEach((l, i) => { if (!b[i].t || JSON.stringify(tags(l.h)) !== JSON.stringify(tags(b[i].h))) errs.push(`quick summary ${d}/${i}: shape`); });
  });
  for (const f of files) {
    const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of s.matchAll(new RegExp('.{0,30}' + VI_RE.source + '.{0,30}', 'g'))) {
      if (!/B[áa]nhNgon/.test(m[0])) errs.push(f + ': Vietnamese text? ' + m[0]);
    }
  }
  if (!errs.length) console.log(`ok   ${lang}: ${all.length} questions, ${C.course.length} lessons, ${C.glossary.length} glossary, ${C.services.length} services`);
  return errs;
}

let fail = 0;
for (const lang of ['en', 'ja']) {
  const errs = verify(lang);
  if (errs.length) { fail++; console.log(`FAIL ${lang}:\n  ` + errs.slice(0, 60).join('\n  ')); }
}
process.exit(fail ? 1 : 0);
