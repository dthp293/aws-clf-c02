// SRS rules: learned cards never shown before due; free practice uses its own schedule.
// Usage: node tests/srs.test.js [project root]
/* global window, location, __T */   // the app runs in this context; these are set up below as globals
const fs = require('fs'), vm = require('vm'), path = require('path'), assert = require('assert');
const { appBundle } = require('./lib/app.js');
const ROOT = process.argv[2] || path.resolve(__dirname, '..');
const KEY = 'clf-c02-study-v1';
const MIN = 60e3, DAY = 864e5;
const RealNow = Date.now;
let NOW = new Date(2026, 10, 25, 10, 0, 0).getTime();
Date.now = () => NOW;

/* ── fake browser ── */
const store = {};
const def = (k, v) => Object.defineProperty(globalThis, k, { value: v, writable: true, configurable: true });
def('window', globalThis);
def('localStorage', { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } });
const els = {};
const el = id => els[id] || (els[id] = { id, innerHTML: '', textContent: '', hidden: true, style: {}, dataset: {}, onclick: null, value: '',
  querySelectorAll: () => [], querySelector: () => null, scrollIntoView() {}, classList: { toggle() {}, add() {}, remove() {} } });
def('document', { getElementById: id => (id === 'app' || id === 'tip' || id === 'dueBadge' || els[id]) ? el(id) : (appHas(id) ? el(id) : null),
  addEventListener() {}, querySelectorAll: () => [], createElement: () => el('tmp'), body: { appendChild() {} } });
function appHas(id) { return el('app').innerHTML.includes(`id="${id}"`); }
def('location', { hash: '', protocol: 'file:', hostname: '' });
def('addEventListener', () => {});
def('scrollTo', () => {});
def('matchMedia', () => ({ matches: false }));
def('confirm', () => true);
def('alert', () => {});
def('innerWidth', 1000); def('innerHeight', 800);

/* ── load in index.html order; expose app internals without changing js/*.js ── */
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(f => !f.startsWith('js/')).concat('APP');
assert.ok(html.includes('<script src="js/main.js"></script>'), 'index.html loads js/main.js');
const HOOK = `
  { const rq = renderQuestion, rf = renderFlash, rr = renderRead;
    renderQuestion = (it, h, d) => { window.__cur = it; return rq(it, h, d); };
    renderFlash = (it, h, d) => { window.__cur = it; return rf(it, h, d); };
    renderRead = (it, h, d) => { window.__cur = it; window.__read = true; return rr(it, h, d); };
    window.__T = { get S() { return S; }, set S(v) { S = v; }, ITEMS, DEFAULTS, normalize, load, route, nextCard, grade, POOL_IDS, COURSE, D, dueItems, newItems, newLeft, clone }; }
`;
function boot(saved) {
  Object.keys(store).forEach(k => delete store[k]);
  if (saved !== undefined) store[KEY] = typeof saved === 'string' ? saved : JSON.stringify(saved);
  Object.keys(els).forEach(k => delete els[k]);
  location.hash = '';
  window.__cur = null;
  for (const f of files) {
    const src = f === 'APP' ? appBundle(ROOT, HOOK) : fs.readFileSync(path.join(ROOT, f), 'utf8');
    vm.runInThisContext(src, { filename: f });
  }
  return window.__T;
}
const app = () => el('app');
const go = h => { window.__cur = null; window.__read = false; location.hash = h; __T.route(); };
const click = (kind, val) => app().onclick({ target: { closest: sel => {
  if (kind === 'opt') return sel === '.opt' ? { dataset: { i: String(val) } } : null;
  if (kind === 'g') return sel.includes('[data-g]') ? { dataset: { g: String(val) } } : null;
  if (kind === 'a') { if (sel === `[data-a="${val}"]`) return { dataset: { a: val } }; return /\[data-a\](,|$)/.test(sel) ? { dataset: { a: val } } : null; }
  return null; } } });
const inSession = () => /class="progress"/.test(app().innerHTML);
const finished = () => /Xong phiên/.test(app().innerHTML);
// answer the currently displayed card; returns its id
function answer(correct, g = 3) {
  const it = window.__cur; assert(it, 'no card displayed');
  if (window.__read) { window.__read = false; click('a', 'reveal'); }
  if (it.type === 'q') {
    const q = it.ref;
    const pick = correct ? q.ans : [q.opts.findIndex((_, i) => !q.ans.includes(i)), ...q.ans].slice(0, q.ans.length);
    pick.forEach(i => click('opt', i));
    click('a', 'check');
    if (correct) click('g', g); else click('a', 'next');
  } else { click('a', 'flip'); click('g', correct ? g : 1); }
  return it.id;
}
// run through a whole session, returning ids shown (answers all correctly)
function drain(max = 5000) { const seen = []; while (inSession() && max--) seen.push(answer(true)); return seen; }
const card = (due, extra = {}) => ({ ef: 2.5, reps: 2, ivl: 4, lapses: 0, due, last: NOW - DAY, ...extra });
const snap = o => JSON.stringify(o);

let pass = 0, fail = 0;
function test(name, fn) {
  NOW = new Date(2026, 10, 25, 10, 0, 0).getTime();
  try { fn(); pass++; console.log('  ok  ' + name); }
  catch (e) { fail++; console.log('FAIL  ' + name + '\n      ' + (e.stack || e).split('\n').slice(0, 4).join('\n      ')); }
}

let T = boot();
const Q = T.D.questions;
const d2 = Q.filter(q => q.d === 2);
const lesson = T.COURSE.find(l => (l.qids || []).length >= 3);
const LQ = lesson.qids;
console.log(`data: ${Q.length} questions, ${T.POOL_IDS.size} pool, ${T.ITEMS.length} items, lesson ${lesson.id} (${LQ.length} q)`);

/* ───── 1. learned-not-due never appears ───── */
test('learned-not-due: not in Ôn hôm nay', () => {
  T = boot();
  T.newItems(5).forEach(i => { T.S.cards[i.id] = card(NOW + 2 * DAY); });
  const hidden = Object.keys(T.S.cards);
  const dueId = 'q:' + d2[30].id; assert(!hidden.includes(dueId)); T.S.cards[dueId] = card(NOW - 1000);
  T.S.settings.newPerDay = 20;
  go('#/review');
  const seen = drain();
  assert(seen.includes(dueId));
  assert.strictEqual(seen[0], dueId, 'due card first');
  hidden.forEach(id => assert(!seen.includes(id), id + ' shown before due'));
  assert.strictEqual(seen.length, 21);
  assert.strictEqual(T.S.newLog.count, 20);
});
test('learned-not-due: not in any practice filter (domain/all/weak/hard/multi/read/task)', () => {
  T = boot();
  const args = ['1', '2', '3', '4', 'all', 'weak', 'hard', 'multi', 'read', 't-2.3'];
  // mark half of every question as learned-not-due, and make "weak" non-empty
  const hidden = new Set();
  Q.forEach((q, i) => { if (i % 2 === 0) { T.S.cards['q:' + q.id] = card(NOW + 3 * DAY); hidden.add('q:' + q.id); } T.S.stats[q.id] = { a: 2, c: 1 }; });
  const base = snap(T.S.cards), stats = snap(T.S.stats);
  for (const a of args) {
    T.S.cards = JSON.parse(base); T.S.stats = JSON.parse(stats);
    go('#/practice/' + a);
    assert(inSession(), a + ': session should start');
    const seen = drain();
    assert(seen.length > 0, a);
    seen.forEach(id => assert(!hidden.has(id), a + ': ' + id + ' shown before due'));
    if (a === 'read') assert(seen.length <= 15);
    assert(finished(), a);
  }
});
test('learned-not-due: not in lesson quiz', () => {
  T = boot();
  T.S.cards['q:' + LQ[0]] = card(NOW + DAY);
  go('#/lesson/' + lesson.id);
  assert(app().innerHTML.includes(`Luyện ${LQ.length - 1}/${LQ.length} câu của bài này`), 'x/y on quiz button');
  click('a', 'quiz');
  const seen = drain();
  assert.strictEqual(seen.length, LQ.length - 1);
  assert(!seen.includes('q:' + LQ[0]));
});
test('learned-not-due in FREE schedule: not in free mode (main schedule irrelevant)', () => {
  T = boot();
  const a = 'q:' + d2[0].id, b = 'q:' + d2[1].id;
  T.S.free[a] = card(NOW + DAY);          // learned in free, not due → hidden
  T.S.cards[b] = card(NOW + 5 * DAY);     // learned in MAIN only → still available in free
  go('#/review/free/2');
  const seen = drain();
  assert(!seen.includes(a)); assert(seen.includes(b));
  const total = T.ITEMS.filter(i => i.type !== 'v' && i.d === 2).length;
  assert.strictEqual(seen.length, total - 1);
});
test('wrong answer (due +10 min) does not come back inside the same session; returns once due', () => {
  T = boot();
  T.S.cards['q:' + LQ[0]] = card(NOW + DAY); T.S.cards['q:' + LQ[1]] = card(NOW + DAY);
  LQ.slice(3).forEach(q => { T.S.cards['q:' + q] = card(NOW + DAY); });
  go('#/lesson/' + lesson.id); click('a', 'quiz');     // only LQ[2] available
  const id = answer(false);
  assert.strictEqual(id, 'q:' + LQ[2]);
  assert(finished(), 'session ends instead of re-showing a not-due card');
  assert.strictEqual(T.S.cards[id].due, NOW + 10 * MIN);
  go('#/practice/all'); assert(!drainPeek(id, 400));
  NOW += 10 * MIN + 1;
  go('#/review'); assert.strictEqual(window.__cur.id, id, 'due again after 10 minutes');
});
function drainPeek(id, max) { let hit = false; while (inSession() && max--) { if (window.__cur.id === id) hit = true; answer(true); } return hit; }
test('wrong answer comes back in-session when it has become due by the end of the queue', () => {
  T = boot();
  go('#/practice/4');
  const first = answer(false);
  NOW += 11 * MIN;
  const seen = drain();
  assert.strictEqual(seen[seen.length - 1], first);
});
test('stale queue: card graded elsewhere mid-session is skipped', () => {
  T = boot();
  go('#/practice/1');
  const d1 = Q.filter(q => q.d === 1).map(q => 'q:' + q.id);
  const cur = window.__cur.id, other = d1.filter(x => x !== cur).slice(0, 5);
  other.forEach(id => { T.S.cards[id] = card(NOW + DAY); });
  const seen = drain();
  other.forEach(id => assert(!seen.includes(id)));
  assert.strictEqual(seen.length, d1.length - 5);
});

/* ───── 2. due card in practice ───── */
test('due card appears in practice; grading updates S.cards; stats counted', () => {
  T = boot();
  d2.forEach(q => { T.S.cards['q:' + q.id] = card(NOW + 9 * DAY); });
  const id = 'q:' + d2[3].id; T.S.cards[id] = card(NOW - 5);
  T.S.newLog = { date: '2026-11-25', count: 4 };
  go('#/practice/2');
  assert.strictEqual(window.__cur.id, id);
  assert(!/>Mới</.test(app().innerHTML));
  answer(true, 3);
  const c = T.S.cards[id];
  assert.strictEqual(c.reps, 3); assert(c.ivl > 4); assert(c.due > NOW + 4 * DAY); assert.strictEqual(c.last, NOW);
  assert.deepStrictEqual(T.S.stats[d2[3].id], { a: 1, c: 1 });
  assert.deepStrictEqual(T.S.newLog, { date: '2026-11-25', count: 4 });
  assert(finished());
  assert.strictEqual(JSON.parse(store[KEY]).cards[id].reps, 3, 'persisted');
  assert.deepStrictEqual(T.S.free, {});
});

/* ───── 3. new card in practice ───── */
test('new card answered in practice / lesson quiz enters S.cards without touching newLog', () => {
  T = boot();
  T.S.newLog = { date: '2026-11-25', count: 2 };
  go('#/practice/3');
  assert(/>Mới</.test(app().innerHTML));
  const a = answer(true), b = answer(false);
  assert(T.S.cards[a] && T.S.cards[a].reps === 1); assert(T.S.cards[b] && T.S.cards[b].due === NOW + 10 * MIN);
  assert.deepStrictEqual(T.S.newLog, { date: '2026-11-25', count: 2 });
  go('#/lesson/' + lesson.id); click('a', 'quiz');
  const c = answer(true);
  assert(T.S.cards[c]);
  assert.deepStrictEqual(T.S.newLog, { date: '2026-11-25', count: 2 });
  assert.strictEqual(T.newLeft(), T.S.settings.newPerDay - 2);
  // the review session still consumes quota
  go('#/review'); answer(true);
  assert.strictEqual(T.S.newLog.count, 3);
});

/* ───── 4./5. free mode ───── */
test('free mode never touches S.cards / newLog; own schedule; stats still counted', () => {
  T = boot();
  T.S.cards['q:' + d2[0].id] = card(NOW + DAY); T.S.cards['q:' + d2[1].id] = card(NOW - 10);
  T.S.newLog = { date: '2026-11-25', count: 1 };
  const cards0 = snap(T.S.cards), log0 = snap(T.S.newLog);
  const badge0 = el('dueBadge').textContent;
  go('#/review/free/all');
  assert(/>Mới</.test(app().innerHTML), 'never seen in free → tagged new even if learned in main');
  const ids = []; for (let i = 0; i < 12; i++) ids.push(answer(i % 3 !== 0, 2 + i % 3));
  assert.strictEqual(snap(T.S.cards), cards0); assert.strictEqual(snap(T.S.newLog), log0);
  assert.strictEqual(el('dueBadge').textContent, badge0, 'home badge unaffected');
  assert.strictEqual(Object.keys(T.S.free).length, 12);
  ids.forEach(id => assert(T.S.free[id] && T.S.free[id].due > NOW));
  drainTypes(60);
  const qAns = Object.values(T.S.stats).reduce((s, x) => s + x.a, 0);
  assert(qAns > 0, 'stats counted in free mode');
  assert.strictEqual(snap(T.S.cards), cards0); assert.strictEqual(snap(T.S.newLog), log0);
  const saved = JSON.parse(store[KEY]);
  assert.strictEqual(Object.keys(saved.free).length, Object.keys(T.S.free).length); assert.strictEqual(snap(saved.cards), cards0);
});
function drainTypes(n) { const t = []; while (inSession() && n--) { t.push(window.__cur.type); answer(true); } return t; }
test('free scopes: domain = questions + services of that domain; all = everything incl. glossary', () => {
  T = boot();
  for (const d of [1, 2, 3, 4]) {
    go('#/review/free/' + d);
    const seen = drain();
    const exp = T.ITEMS.filter(i => i.type !== 'v' && i.d === d).map(i => i.id);
    assert.deepStrictEqual(seen.slice().sort(), exp.sort(), 'domain ' + d);
    assert(!seen.some(id => id.startsWith('v:')));
  }
  T.S.free = {};
  go('#/review/free/all');
  const seen = drain();
  assert.strictEqual(seen.length, T.ITEMS.length); assert(seen.some(id => id.startsWith('v:')));
  assert.deepStrictEqual(T.S.cards, {});
});
test('free-mode learned cards hidden until their free due time, then return', () => {
  T = boot();
  go('#/review/free/4');
  const seen = drain(); assert(seen.length > 0);
  go('#/review/free/4');
  assert(!inSession()); assert(/Chưa có câu nào cần luyện lúc này/.test(app().innerHTML));
  assert(/đến hạn: <b>/.test(app().innerHTML), 'shows next free due time');
  assert(/lịch riêng của Luyện tập tự do/.test(app().innerHTML));
  go('#/review/free');
  assert(app().innerHTML.includes(`<b>0/${seen.length}</b> thẻ luyện được ngay`), 'menu count 0/total for D4');
  assert(/Thẻ tự do tiếp theo đến hạn/.test(app().innerHTML));
  const minDue = Math.min(...seen.map(id => T.S.free[id].due));
  NOW = minDue - 1000; go('#/review/free/4'); assert(!inSession());
  NOW = minDue + 1; go('#/review/free/4'); assert(inSession());
  const again = drain();
  again.forEach(id => assert(T.S.free[id].last === NOW && seen.includes(id)));
  assert.deepStrictEqual(T.S.cards, {});
  // main-schedule practice for the same domain is unaffected by free progress
  go('#/practice/4'); assert(inSession());
});
test('free menu: per-domain counts available/total and links', () => {
  T = boot();
  const n2 = T.ITEMS.filter(i => i.type !== 'v' && i.d === 2);
  T.S.free[n2[0].id] = card(NOW + DAY); T.S.free[n2[1].id] = card(NOW - 1);
  go('#/review/free');
  const h = app().innerHTML;
  ['1', '2', '3', '4', 'all'].forEach(s => assert(h.includes(`href="#/review/free/${s}"`)));
  assert(h.includes(`<b>${n2.length - 1}/${n2.length}</b>`));
  assert(h.includes(`<b>${T.ITEMS.length - 1}/${T.ITEMS.length}</b>`));
  go('#/review/free/zzz'); assert(/Luyện tập tự do<\/h1>/.test(app().innerHTML), 'unknown scope → menu');
});

/* ───── 6. empty states ───── */
test('empty state: practice filter with nothing new/due shows next due + link to free mode', () => {
  T = boot();
  const d4 = Q.filter(q => q.d === 4);
  d4.forEach((q, i) => { T.S.cards['q:' + q.id] = card(NOW + (i + 2) * DAY); });
  const soon = new Date(2026, 10, 26, 7, 30).getTime(); T.S.cards['q:' + d4[5].id].due = soon;
  T.S.cards['q:' + Q.find(q => q.d === 1).id] = card(NOW + 3600e3);   // other set, earlier: must not be reported
  go('#/practice/4');
  const h = app().innerHTML;
  assert(!inSession()); assert(/Chưa có câu nào cần luyện lúc này/.test(h));
  assert(h.includes(new Date(soon).toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' })), 'next due of THAT set');
  assert(h.includes('href="#/review/free"') && h.includes('Luyện tập tự do'));
  go('#/practice');
  assert(app().innerHTML.includes(`<b>0/${d4.length}</b> câu`), 'filter card count');
  assert(app().innerHTML.includes(`<b>${Q.length - d4.length - 1}/${Q.length}</b> câu`), 'all count');
});
test('empty state: weak filter with no weak questions keeps old message; lesson quiz; review done', () => {
  T = boot();
  go('#/practice/weak'); assert(/Chưa có câu nào ở mục này/.test(app().innerHTML));
  LQ.forEach(q => { T.S.cards['q:' + q] = card(NOW + 2 * DAY); });
  go('#/lesson/' + lesson.id);
  const h = app().innerHTML;
  assert(!h.includes('data-a="quiz"'), 'no quiz button when nothing available');
  assert(/đã học và chưa đến hạn ôn/.test(h) && /Câu tiếp theo đến hạn: <b>/.test(h) && h.includes('href="#/review/free"'));
  T.S.settings.newPerDay = 0;
  go('#/review');
  assert(/Hôm nay đã ôn xong/.test(app().innerHTML) && app().innerHTML.includes('href="#/review/free"') && !app().innerHTML.includes('href="#/practice"'));
  assert(/Thẻ tiếp theo đến hạn: <b>/.test(app().innerHTML));
});

/* ───── 7. compatibility / normalize / reset / import-export ───── */
test('old state without `free` loads fine and keeps progress', () => {
  const old = { cards: { ['q:' + d2[0].id]: card(NOW - 5), 'v:zzz': { ef: '2.1', reps: 1, ivl: 1, due: NOW + DAY } },
    stats: { [d2[0].id]: { a: 3, c: 2 } }, settings: { lang: 'bi', newPerDay: 7, kw: false, examDate: '2026-12-20', esl: true },
    newLog: { date: '2026-11-25', count: 3 }, activity: { '2026-11-24': 9 }, done: { '1-1': 123 }, examSeen: {}, examStats: {}, exam: null, exams: [] };
  T = boot(old);
  assert.deepStrictEqual(T.S.free, {});
  assert.deepStrictEqual(T.S.cards['q:' + d2[0].id], old.cards['q:' + d2[0].id]);
  assert.strictEqual(T.S.settings.newPerDay, 7); assert.deepStrictEqual(T.S.newLog, old.newLog); assert.deepStrictEqual(T.S.stats, old.stats);
  for (const h of ['#/', '#/review/free', '#/practice', '#/review/free/1', '#/settings', '#/exam', '#/learn']) { go(h); assert(!/Ứng dụng gặp lỗi/.test(app().innerHTML), h); }
  T = boot('{broken'); assert.deepStrictEqual(T.S.free, {}); assert.deepStrictEqual(T.S.cards, {});
  T = boot({ cards: {}, free: 'junk' }); assert.deepStrictEqual(T.S.free, {});
  T = boot({ cards: {}, free: { 'q:a': null, 'q:b': { ef: 0.5, due: 'x' } } });
  assert.deepStrictEqual(Object.keys(T.S.free), ['q:b']); assert.strictEqual(T.S.free['q:b'].ef, 1.3); assert.strictEqual(T.S.free['q:b'].due, NOW);
});
test('reset clears S.free (and cards), keeps settings; export contains free; import restores it', () => {
  T = boot();
  go('#/review/free/1'); answer(true); answer(false);
  T.S.settings.newPerDay = 33;
  assert.strictEqual(Object.keys(T.S.free).length, 2);
  const exported = JSON.stringify(T.S);                       // same payload the export button serialises
  assert.strictEqual(Object.keys(JSON.parse(exported).free).length, 2);
  go('#/settings');
  el('msg'); el('reset').onclick();
  assert.deepStrictEqual(T.S.free, {}); assert.deepStrictEqual(T.S.cards, {}); assert.strictEqual(T.S.settings.newPerDay, 33);
  assert.deepStrictEqual(JSON.parse(store[KEY]).free, {});
  const imp = T.normalize(JSON.parse(exported));               // same path the import handler uses
  assert.strictEqual(Object.keys(imp.free).length, 2);
  assert('free' in T.DEFAULTS);
});

/* ───── 8. pool isolation ───── */
test('pool ids never enter S.free / S.cards (sessions, grade(), normalize/import)', () => {
  T = boot();
  const pool = [...T.POOL_IDS];
  assert(pool.length > 0);
  assert(!T.ITEMS.some(i => i.type === 'q' && T.POOL_IDS.has(i.ref.id)), 'ITEMS has no pool question');
  go('#/review/free/all'); drain();
  go('#/practice/all'); drain();
  const bad = o => Object.keys(o).filter(k => T.POOL_IDS.has(k.replace(/^q:/, '')));
  assert.deepStrictEqual(bad(T.S.free), []); assert.deepStrictEqual(bad(T.S.cards), []);
  assert.strictEqual(Object.keys(T.S.free).length, T.ITEMS.length);
  T.grade('q:' + pool[0], 3); T.grade(pool[0], 3);
  assert.deepStrictEqual(bad(T.S.free), []); assert.deepStrictEqual(bad(T.S.cards), []);
  const n = T.normalize({ cards: { ['q:' + pool[0]]: card(NOW) }, free: { ['q:' + pool[1]]: card(NOW), ['q:' + d2[0].id]: card(NOW) } });
  assert.deepStrictEqual(Object.keys(n.cards), []); assert.deepStrictEqual(Object.keys(n.free), ['q:' + d2[0].id]);
});

/* ───── 9. exam untouched by the two schedules ───── */
test('mock exam: runs from held-out pool, submit does not touch S.free; home badge = main schedule only', () => {
  T = boot();
  T.S.settings.newPerDay = 5;
  go('#/review/free/2'); for (let i = 0; i < 6; i++) answer(true);
  const free0 = snap(T.S.free);
  go('#/'); 
  assert.strictEqual(el('dueBadge').textContent, 5, 'badge = 0 due + 5 new');
  assert(/<b>0<\/b><span class="muted small">thẻ đến hạn ôn/.test(app().innerHTML));
  assert(app().innerHTML.includes(`<b>0/${T.ITEMS.length}</b><span class="muted small">thẻ đã học`), 'home "learned" ignores free');
  go('#/exam'); el('start').onclick();
  assert(T.S.exam && T.S.exam.ids.length === 65);
  assert(T.S.exam.ids.every(id => T.POOL_IDS.has(id)), 'exam drawn from pool');
  click('a', 'submit');
  assert.strictEqual(T.S.exams.length, 1);
  assert.strictEqual(snap(T.S.free), free0); assert.deepStrictEqual(T.S.cards, {});
});

Date.now = RealNow;
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
