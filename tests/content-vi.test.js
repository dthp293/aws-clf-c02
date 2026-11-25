// Consistency of the Vietnamese source content (content/): answer key, per-option reasons, tags, lessons, glossary.
// Usage: node tests/content-vi.test.js [project root]
const path = require('path');
const load = require('./lib/load.js');
const ROOT = process.argv[2] || path.resolve(__dirname, '..');
const W = load(ROOT), C = W.CLF, TAGS = W.CLF_TAGS || {};
let fails = 0;
const ok = (c, m, list = []) => { if (!c) { fails++; console.log('FAIL', m + (list.length ? ': ' + list.slice(0, 15).join(' | ') : '')); } else console.log('ok  ', m); };
const norm = s => String(s).toLowerCase().replace(/\s+/g, ' ').replace(/[“”"'.?!,]/g, '').trim();
const COUNT = { 2: 'TWO', 3: 'THREE', 4: 'FOUR' };
const TASK_IDS = ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '4.1', '4.2', '4.3'];

const practice = C.questions, pool = C.examPool, all = [...practice, ...pool];
const ids = all.map(q => q.id);
ok(new Set(ids).size === ids.length, `${all.length} question ids are unique`, ids.filter((x, i) => ids.indexOf(x) !== i));
ok(practice.every(q => /^d[1-4]-\d+$/.test(q.id)) && pool.every(q => /^x[1-4]-\d+$/.test(q.id)), 'practice ids are d<N>-…, mock-exam pool ids are x<N>-…',
  [...practice.filter(q => !/^d/.test(q.id)), ...pool.filter(q => !/^x/.test(q.id))].map(q => q.id));
// A few early ids were numbered under another domain before their topic was re-tagged. Ids are kept forever (saved
// progress is keyed by id), so these are allowed; any new mismatch fails.
const LEGACY_ID_DOMAIN = ['d1-12', 'd3-38', 'd3-39', 'd3-40', 'd3-73', 'd3-77', 'd3-78', 'd3-79'];
ok(all.every(q => +q.id[1] === q.d || LEGACY_ID_DOMAIN.includes(q.id)), 'the domain in each id matches its d field (except known legacy ids)',
  all.filter(q => +q.id[1] !== q.d && !LEGACY_ID_DOMAIN.includes(q.id)).map(q => q.id));

const shape = [], keyBad = [], chooseBad = [], whyBad = [], labelBad = [], textBad = [], dupOpt = [];
for (const q of all) {
  const n = q.opts.length;
  if (!(n >= 2 && n <= 6) || !q.opts.every(o => Array.isArray(o) && o.length === 2)) shape.push(q.id);
  if (!q.ans.length || new Set(q.ans).size !== q.ans.length || !q.ans.every(i => Number.isInteger(i) && i >= 0 && i < n) || q.ans.length >= n) keyBad.push(q.id);
  // "(Choose TWO.)" in the English stem ⇔ exactly that many correct answers; single-answer stems have no marker
  const m = q.en.match(/\(Choose (TWO|THREE|FOUR)\.?\)/i);
  if ((q.ans.length > 1) !== !!m || (m && m[1].toUpperCase() !== COUNT[q.ans.length])) chooseBad.push(`${q.id} ans=${q.ans.length} marker=${m ? m[1] : '-'}`);
  if (!Array.isArray(q.why) || q.why.length !== n) whyBad.push(q.id);
  else q.why.forEach((w, i) => {
    const right = q.ans.includes(i), label = (String(w).match(/^\s*(Đúng|Sai)\b/) || [])[1];
    if (!label || (label === 'Đúng') !== right) labelBad.push(`${q.id}[${i}] ${label || 'no label'} but option is ${right ? 'correct' : 'wrong'}`);
  });
  if (![q.en, q.vi, q.exp].every(s => typeof s === 'string' && s.trim()) || !q.opts.every(o => o[0].trim() && o[1].trim())) textBad.push(q.id);
  const en = q.opts.map(o => norm(o[0]));
  if (new Set(en).size !== en.length) dupOpt.push(q.id);
}
ok(!shape.length, '2–6 options per question, each [English, Vietnamese]', shape);
ok(!keyBad.length, 'answer key: valid, distinct option indexes, not every option', keyBad);
ok(!chooseBad.length, '"(Choose TWO/THREE.)" in the stem matches the number of correct answers', chooseBad);
ok(!whyBad.length, 'one reason (why) per option', whyBad);
ok(!labelBad.length, 'each reason starts with "Đúng" for a correct option and "Sai" for a wrong one', labelBad);
ok(!textBad.length, 'stem, Vietnamese translation, explanation and every option are non-empty', textBad);
ok(!dupOpt.length, 'no duplicate options inside a question', dupOpt);
const stems = new Map(); const dupStem = [];
all.forEach(q => { const k = norm(q.en.replace(/\(Choose (TWO|THREE|FOUR)\.?\)/i, '')); if (stems.has(k)) dupStem.push(`${stems.get(k)} = ${q.id}`); else stems.set(k, q.id); });
ok(!dupStem.length, 'no two questions have the same stem', dupStem);

// Tags: [task statement, lesson]; pool questions are never linked to a lesson
const lessons = new Set(C.course.map(l => l.id));
const tagBad = all.filter(q => { const t = TAGS[q.id]; return !t || !TASK_IDS.includes(t[0]) || +t[0][0] !== q.d; }).map(q => `${q.id}→${TAGS[q.id] && TAGS[q.id][0]}`);
ok(!tagBad.length, 'every question has a task statement from its own domain', tagBad);
const lessonBad = all.filter(q => { const l = (TAGS[q.id] || [])[1]; return q.id[0] === 'x' ? l !== null : !lessons.has(l); }).map(q => `${q.id}→${(TAGS[q.id] || [])[1]}`);
ok(!lessonBad.length, 'practice questions are tagged with an existing lesson; pool questions with null', lessonBad);
const extraTags = Object.keys(TAGS).filter(id => !ids.includes(id));
ok(!extraTags.length, 'no tags for unknown questions', extraTags);
const practiceIds = new Set(practice.map(q => q.id));
const badQids = C.course.flatMap(l => (l.qids || []).filter(id => !practiceIds.has(id)).map(id => `${l.id}:${id}`));
ok(!badQids.length, 'lesson qids only point to practice questions (never the mock-exam pool)', badQids);

// Lessons, glossary, services
ok(new Set(C.course.map(l => l.id)).size === C.course.length && C.course.every(l => l.title && l.html && (l.goals || []).length && (l.summary || []).length),
  `${C.course.length} lessons: unique ids, each with title, goals, body and summary`);
const terms = C.glossary.map(g => g.term.toLowerCase());
ok(new Set(terms).size === terms.length && C.glossary.every(g => g.vi && g.vi.trim()), `${terms.length} glossary terms: unique, each with a Vietnamese meaning`, terms.filter((x, i) => terms.indexOf(x) !== i));
const svc = C.services.map(s => s.name);
ok(new Set(svc).size === svc.length && C.services.every(s => [1, 2, 3, 4].includes(s.d) && s.vi && s.vi.trim()), `${svc.length} service cards: unique names, a domain 1–4 and a description`, svc.filter((x, i) => svc.indexOf(x) !== i));

console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
process.exit(fails ? 1 : 0);
