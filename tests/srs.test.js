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
    window.__T = { get S() { return S; }, set S(v) { S = v; }, ITEMS, DEFAULTS, normalize, load, route, nextCard, grade, POOL_IDS, COURSE, D, dueItems, newItems, newLeft, clone,
      readiness, paceAdvice, isWeakStat, spaceOut, viewHome, READY_MIN_N, save, examTick, daysToExam, pickExam }; }
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
test('learned-not-due: not in any practice filter (domain/all/hard/multi/read/task; weak uses the free schedule)', () => {
  T = boot();
  const args = ['1', '2', '3', '4', 'all', 'weak', 'hard', 'multi', 'read', 't-2.3'];
  // mark half of every question as learned-not-due, and make "weak" non-empty
  const hidden = new Set();
  Q.forEach((q, i) => { if (i % 2 === 0) { T.S.cards['q:' + q.id] = card(NOW + 3 * DAY); hidden.add('q:' + q.id); } T.S.stats[q.id] = { a: 2, c: 1 }; });
  const base = snap(T.S.cards), stats = snap(T.S.stats);
  for (const a of args) {
    T.S.cards = JSON.parse(base); T.S.stats = JSON.parse(stats);
    // "weak" runs on S.free: hide the same cards there instead
    T.S.free = a === 'weak' ? JSON.parse(base) : {};
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
  assert.deepStrictEqual(T.S.stats[d2[3].id], { a: 1, c: 1, r: [1] });
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

/* ───── 10. SM-2 rules ───── */
test('SM-2: learning cards are not penalized; a lapse keeps 25% of the interval; Good raises low ease', () => {
  T = boot();
  const fresh = T.nextCard(undefined, 1, NOW, 'q:x');
  assert.strictEqual(fresh.ef, 2.5); assert.strictEqual(fresh.lapses, 0); assert.strictEqual(fresh.due, NOW + 10 * MIN);
  const retry = T.nextCard(fresh, 1, NOW + 10 * MIN, 'q:x');
  assert.strictEqual(retry.ef, 2.5, 'in-session retry of a learning card keeps ease'); assert.strictEqual(retry.lapses, 0);
  const rev = { ef: 2.5, reps: 3, ivl: 10, lapses: 0, due: NOW, last: NOW - 10 * DAY };
  const lapse = T.nextCard(rev, 1, NOW, 'q:x');
  assert.strictEqual(lapse.lapses, 1); assert.strictEqual(lapse.ef, 2.3); assert.strictEqual(lapse.post, 3);
  const back = T.nextCard(lapse, 3, NOW + DAY, 'q:x');
  assert.strictEqual(back.ivl, 3, 'relearned card resumes at 25% of 10 days'); assert(!('post' in back)); assert.strictEqual(back.ef, 2.3);
  const low = T.nextCard({ ef: 2.0, reps: 3, ivl: 5, lapses: 1, due: NOW, last: NOW - 5 * DAY }, 3, NOW, 'q:x');
  assert(Math.abs(low.ef - 2.05) < 1e-9, 'Good raises ease below 2.5');
  assert.strictEqual(T.nextCard(rev, 3, NOW, 'q:x').ef, 2.5, 'Good keeps ease at 2.5');
});

test('SM-2: overdue success uses the days actually held; fuzz is stable per card and day', () => {
  T = boot();
  const late = { ef: 2.5, reps: 3, ivl: 4, lapses: 0, due: NOW - 36 * DAY, last: NOW - 40 * DAY };
  const g = T.nextCard(late, 3, NOW, 'q:a');
  assert(g.ivl >= 95 && g.ivl <= 105, 'Good after 40 days held → about 100 days, got ' + g.ivl);
  assert.strictEqual(T.nextCard(late, 2, NOW, 'q:a').ivl, 5, 'Hard does not reward the overdue days');
  const a = T.nextCard(late, 3, NOW, 'q:a').ivl, b = T.nextCard(late, 3, NOW, 'q:a').ivl;
  assert.strictEqual(a, b, 'same card, same day → same interval');
  const ivls = new Set(['q:a', 'q:b', 'q:c', 'q:d', 'q:e', 'q:f'].map(id => T.nextCard({ ef: 2.5, reps: 3, ivl: 20, lapses: 0, due: NOW, last: NOW - 20 * DAY }, 3, NOW, id).ivl));
  assert(ivls.size > 1, 'cards graded the same day are spread over several days');
});

test('SM-2: with an exam date, intervals end before the exam', () => {
  T = boot();
  T.S.settings.examDate = '2026-12-05';   // 10 days after NOW
  const c = T.nextCard({ ef: 2.5, reps: 3, ivl: 20, lapses: 0, due: NOW, last: NOW - 20 * DAY }, 4, NOW, 'q:a');
  assert(c.due <= NOW + 9 * DAY, 'due no later than the day before the exam');
  assert(c.ivl > 60 && c.early, 'the interval itself is kept, got ' + c.ivl);
  const again = T.nextCard(c, 3, c.due, 'q:a');
  assert.strictEqual(again.ivl, c.ivl, 'the early review keeps the interval (no growth, no loss)');
  assert.strictEqual(T.nextCard(c, 2, c.due, 'q:a').ef, c.ef, 'Hard on an early review keeps ease');
  T.S.settings.examDate = '';
  const after = T.nextCard(again, 3, again.due + 90 * DAY, 'q:a');
  assert(after.ivl > c.ivl && !after.early, 'after the exam the interval grows from the kept value');
  T.S.settings.examDate = '2026-11-20';   // past: no cap
  assert(T.nextCard({ ef: 2.5, reps: 3, ivl: 20, lapses: 0, due: NOW, last: NOW - 20 * DAY }, 3, NOW, 'q:a').ivl > 40);
});

/* ───── 11. correct answers are scheduled at Check ───── */
test('correct answer is scheduled Good at Check; Easy re-grades from the previous state without double counting', () => {
  T = boot();
  go('#/review');
  const it = window.__cur; assert.strictEqual(it.type, 'q');
  it.ref.ans.forEach(i => click('opt', i)); click('a', 'check');
  const c = T.S.cards[it.id];
  assert(c && c.reps === 1 && c.ivl === 1, 'scheduled Good before any grade button');
  assert.strictEqual(T.S.newLog.count, 1); assert.strictEqual(T.S.log.length, 1);
  assert(/Khó<small>1 ngày<\/small>.*Tốt<small>1 ngày<\/small>.*Dễ<small>3 ngày<\/small>/s.test(app().innerHTML), 'buttons preview from the new-card state');
  click('g', 4);
  assert.strictEqual(T.S.cards[it.id].ivl, 3, 'Easy computed from the new-card state');
  assert.strictEqual(T.S.newLog.count, 1, 'not counted twice'); assert.strictEqual(T.S.log.length, 1); assert.strictEqual(T.S.log[0][2], 4);
});

/* ───── 12. recent-results stats ───── */
test('weak questions use the last 3 answers; old saved stats still work', () => {
  T = boot();
  assert(T.isWeakStat({ a: 10, c: 9, r: [1, 1, 0] }), 'last answer wrong');
  assert(!T.isWeakStat({ a: 10, c: 3, r: [0, 1, 1] }), '2 of last 3 right and last right');
  assert(T.isWeakStat({ a: 3, c: 1, r: [0, 0, 1] }), '1 of last 3 right');
  assert(T.isWeakStat({ a: 10, c: 5 }), 'legacy stats without r: below 70%');
  assert(!T.isWeakStat({ a: 10, c: 8 }));
  const n = T.normalize({ stats: { a: { a: 4, c: 2, r: [1, 0, 1, 1] } } });
  assert.deepStrictEqual(n.stats.a, { a: 4, c: 2, r: [0, 1, 1] });
});

/* ───── 13. new-card order ───── */
test('new cards: questions first, domain-weighted, same task spaced, finished lessons first', () => {
  T = boot();
  const first = T.newItems(60);
  assert.strictEqual(first.filter(i => i.type === 'q').length, 40, 'pattern q q v q q s');
  const qs = T.newItems(400).filter(i => i.type === 'q').slice(0, 120);
  const by = d => qs.filter(i => i.d === d).length;
  assert(by(3) > by(4) * 2.5, `domain 3 (34%) gets more new questions than domain 4 (12%): ${by(3)} vs ${by(4)}`);
  const near = qs.filter((i, k) => qs.slice(Math.max(0, k - 3), k).some(j => j.ref.t === i.ref.t)).length;
  assert.strictEqual(near, 0, 'no two questions of the same task within 3 places');
  const rank = () => { const ids = T.newItems(1000).filter(i => i.type === 'q').map(i => i.ref.id); return LQ.reduce((a, id) => a + ids.indexOf(id), 0) / LQ.length; };
  const before = rank();
  T.S.done[lesson.id] = NOW;
  assert(rank() < before, 'questions of a finished lesson move forward');
});

/* ───── 14. readiness estimate ───── */
const fillFirst = (f, ts = NOW) => { T.S.examFirst = {}; [...T.POOL_IDS].forEach((id, k) => { const v = f(id, k); if (v != null) T.S.examFirst[id] = [v, ts]; }); };
test('readiness: estimate with interval; needs enough data, a high lower bound and every domain', () => {
  T = boot();
  assert.strictEqual(T.readiness().n, 0);
  fillFirst((id, k) => (k < 3 ? 1 : null));
  let few = T.readiness(); assert(few.hi - few.lo > 0.2 && few.lo < 0.75 && few.p < 0.95, `three right answers give a wide interval, not 100–100% (${few.lo}–${few.hi})`);
  fillFirst(() => 1);
  let r = T.readiness();
  assert(r.ready && r.lo >= 0.75 && r.hi <= 1, 'all first answers right → ready');
  fillFirst((id, k) => (k < 60 ? 1 : null));
  r = T.readiness(); assert(r.n === 60 && !r.ready, 'too few answers');
  const QB = new Map(T.D.examPool.map(q => [q.id, q]));
  fillFirst(id => (QB.get(id).d === 4 ? null : 1));
  r = T.readiness(); assert(r.n >= 100 && r.lo >= 0.75 && !r.ready, 'a domain without answers blocks readiness');
  const QBY = new Map([...T.D.questions, ...T.D.examPool].map(q => [q.id, q]));
  fillFirst(id => (QBY.get(id).d === 4 ? 0 : 1));
  r = T.readiness(); assert(!r.ready, 'a weak domain blocks readiness');
  assert(r.dom.find(x => x.d.id === 4).p < 0.5 && r.risky.length && r.risky.every(x => x.t[0] === '4'));
  fillFirst(() => 0, NOW - 120 * DAY);
  [...T.POOL_IDS].slice(0, 120).forEach(id => { T.S.examFirst[id] = [1, NOW]; });
  assert(T.readiness().p > 0.8, 'old results weigh less than recent ones');
});

test('readiness: does not change with time alone; undated old results weigh like the oldest dated ones', () => {
  T = boot();
  fillFirst(() => 1, NOW - 30 * DAY);
  const a = T.readiness();
  NOW += 90 * DAY;
  const b = T.readiness();
  assert.strictEqual(a.lo, b.lo, 'no new data → same estimate'); assert(b.ready);
  T.S.examFirst = {};
  const ids = [...T.POOL_IDS];
  ids.slice(0, 100).forEach(id => { T.S.examFirst[id] = [0, 0]; });            // undated (migrated), all wrong
  ids.slice(100, 195).forEach(id => { T.S.examFirst[id] = [1, NOW]; });        // dated today, all right
  const mixed = T.readiness().p;
  ids.slice(0, 100).forEach(id => { T.S.examFirst[id] = [0, NOW]; });
  assert(Math.abs(T.readiness().p - mixed) < 1e-9, 'undated = same date as the oldest dated result');
});

test('readiness: examFirst is rebuilt from history for old saved data', () => {
  T = boot();
  const pool = T.D.examPool, q0 = pool[0], q1 = pool[1];
  const n = T.normalize({ exams: [
    { date: NOW, n: 2, ids: [q0.id, q1.id], ans: { [q0.id]: q0.ans, [q1.id]: [] }, correct: 1 },
    { date: NOW - DAY, n: 1, ids: [q0.id], ans: { [q0.id]: [] }, correct: 0 }
  ], examStats: { [pool[2].id]: { a: 1, c: 1 } } });
  assert.deepStrictEqual(n.examFirst[q0.id], [0, NOW - DAY], 'first (oldest) attempt wins');
  assert.deepStrictEqual(n.examFirst[q1.id], [0, NOW]);
  assert.deepStrictEqual(n.examFirst[pool[2].id], [1, 0], 'single attempt from examStats');
});

/* ───── 15. abandoned and cancelled exams ───── */
const QB = () => new Map(T.D.examPool.map(q => [q.id, q]));
const full = (E, ids) => ids.forEach(id => { E.ans[id] = QB().get(id).ans.slice(); });
test('exam: reopened after time ran out with under half fully answered → discarded; seen questions count, partial = wrong', () => {
  T = boot();
  go('#/exam'); el('start').onclick();
  const E = T.S.exam, qb = QB();
  full(E, E.ids.slice(0, 5));
  const multi = E.ids.slice(5).find(id => qb.get(id).ans.length > 1);
  E.ans[multi] = [qb.get(multi).ans[0]];                      // incomplete
  NOW += 3 * 60 * MIN;
  go('#/exam');
  assert.strictEqual(T.S.exam, null); assert.strictEqual(T.S.exams.length, 0, 'not scored');
  const counted = new Set([...E.ids.slice(0, 5), multi]);   // first question was also viewed (index 0 is in slice)
  assert.deepStrictEqual(Object.keys(T.S.examFirst).sort(), [...counted].sort(), 'viewed or answered questions count; unviewed stay fresh');
  assert.strictEqual(T.S.examFirst[multi][0], 0, 'incomplete answer counts as wrong');
  assert(E.ids.slice(0, 5).every(id => T.S.examFirst[id][0] === 1));
  assert(/hết giờ/.test(app().innerHTML));
});

test('exam: the half rule counts fully answered questions only', () => {
  T = boot();
  go('#/exam'); el('start').onclick();
  let E = T.S.exam; const qb = QB();
  const singles = E.ids.filter(id => qb.get(id).ans.length === 1), multis = E.ids.filter(id => qb.get(id).ans.length > 1);
  full(E, singles.slice(0, 32)); multis.slice(0, 3).forEach(id => { E.ans[id] = [qb.get(id).ans[0]]; });
  NOW += 3 * 60 * MIN; go('#/exam');
  assert.strictEqual(T.S.exams.length, 0, '32 full + 3 partial of 65 → discarded');
  go('#/exam'); el('start').onclick(); E = T.S.exam;
  full(E, E.ids.slice(0, 33));
  NOW += 3 * 60 * MIN; go('#/exam');
  assert.strictEqual(T.S.exams.length, 1, '33 of 65 → submitted'); assert(T.S.exams[0].auto);
  assert(!('score' in T.S.exams[0]), 'no fake 1000-point score');
});

test('exam: live timeout submits; a timeout found long after (sleep, background tab) is handled as abandoned', () => {
  T = boot();
  go('#/exam'); el('start').onclick();
  let E = T.S.exam; full(E, E.ids.slice(0, 5));
  NOW = E.start + E.dur + 5000; T.examTick();
  assert.strictEqual(T.S.exams.length, 1, 'on the page when time ran out → submitted like the real exam');
  assert.strictEqual(Object.keys(T.S.examFirst).length, 65, 'blank answers count as wrong first answers');
  go('#/exam'); el('start').onclick(); E = T.S.exam; full(E, E.ids.slice(0, 5));
  NOW = E.start + E.dur + 2 * 60 * MIN; T.examTick();
  assert.strictEqual(T.S.exam, null); assert.strictEqual(T.S.exams.length, 1, 'woke up 2 h after the end → discarded');
});

test('exam: cancel counts every viewed question (unanswered = wrong) so answers cannot be cherry-picked', () => {
  T = boot();
  go('#/exam'); el('start').onclick();
  const E = T.S.exam;
  full(E, [E.ids[0]]);
  click('a', 'next'); click('a', 'next');   // views questions 2 and 3 without answering
  click('a', 'quit');
  assert.strictEqual(T.S.exam, null); assert.strictEqual(T.S.exams.length, 0);
  assert.deepStrictEqual(Object.keys(T.S.examFirst).sort(), E.ids.slice(0, 3).sort());
  assert.deepStrictEqual(E.ids.slice(0, 3).map(id => T.S.examFirst[id][0]), [1, 0, 0]);
  assert.strictEqual(Object.keys(T.S.examSeen).length, 3, 'unviewed questions stay fresh');
});

/* ───── 16. state version, review log, pacing, home ───── */
test('state: version, review log, unknown keys kept; home pace advice and learned count', () => {
  T = boot();
  const n = T.normalize({ future: { x: 1 }, log: [[NOW, 'q:a', 3], ['bad']] });
  assert.strictEqual(n.v, 2); assert(!('future' in n), 'unknown keys dropped from data of this version (e.g. an import)');
  assert.deepStrictEqual(n.log, [[NOW, 'q:a', 3, 0]]);
  const newer = T.normalize(JSON.parse('{"v": 3, "future": {"x": 1}, "__proto__": {"cards": 1}}'));
  assert.deepStrictEqual(newer.future, { x: 1 }, 'keys written by a newer version are kept'); assert.strictEqual(newer.v, 3);
  assert.strictEqual(Object.getPrototypeOf(newer), Object.prototype, '__proto__ is never copied');
  // the review log is stored under its own key, and rewritten only when it changes
  T.grade(T.ITEMS[0].id, 3);
  assert(!('log' in JSON.parse(store[KEY])), 'log not in the main state'); assert.strictEqual(JSON.parse(store[KEY + '-log']).length, 1);
  const logJson = store[KEY + '-log'];
  store[KEY + '-log'] = 'untouched'; T.S.settings.kw = false; T.save();
  assert.strictEqual(store[KEY + '-log'], 'untouched', 'unchanged log is not rewritten');
  store[KEY + '-log'] = logJson;
  assert.strictEqual(T.load().log.length, 1, 'load() reads the log back from its own key');
  store[KEY] = '{broken';
  assert.strictEqual(T.load().log.length, 1, 'the log survives a missing or corrupt main state');
  T.S.settings.examDate = '2026-12-15';   // 20 days
  const p = T.paceAdvice();
  assert(p && p.n === Math.ceil(T.ITEMS.length / 13), 'new cards / (20 − 7 days)');
  T.S.cards['v:renamed term'] = card(NOW + DAY);
  go('#/');
  assert(app().innerHTML.includes(`<b>1/${T.ITEMS.length}</b>`), 'orphan cards are not counted as learned');
  assert(app().innerHTML.includes('id="pace"'));
  el('pace').onclick();
  assert.strictEqual(T.S.settings.newPerDay, p.n);
  assert.strictEqual(T.paceAdvice(), null);
  T.S.settings.newPerDay = 15; T.S.settings.examDate = '2026-11-30';   // 5 days: final review week
  assert.strictEqual(T.paceAdvice(), null, 'no new-card advice in the last 7 days');
});

/* ───── 17. review round 3 ───── */
test('new cards: a small daily limit still follows the domain weights over many days', () => {
  T = boot();
  const got = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (let day = 0; day < 40; day++) {
    T.newItems(3).filter(i => i.type === 'q').forEach(i => { got[i.d]++; });
    T.newItems(3).forEach(i => { T.S.cards[i.id] = card(NOW + 99 * DAY); });
  }
  assert(Object.values(got).every(x => x > 0), 'every domain gets new questions: ' + JSON.stringify(got));
  assert(got[3] > got[4] * 2, 'domain 3 (34%) gets more than domain 4 (12%): ' + JSON.stringify(got));
});

test('new cards: the order and the q/q/v/q/q/s pattern continue within the day', () => {
  T = boot();
  const first = T.newItems(6).map(i => i.id);
  T.S.newLog = { date: '2026-11-25', count: 2 };
  assert.strictEqual(T.newItems(1)[0].type, 'v', 'third new card of the day is vocabulary');
  T.S.newLog = { date: '', count: 0 };
  T.S.stats[T.ITEMS.find(i => i.id === first[0]).ref.id] = { a: 3, c: 0, r: [0, 0, 0] };   // mastery changes …
  assert.deepStrictEqual(T.newItems(6).map(i => i.id), first, '… but the day\'s order stays the same');
});

test('exam date: counted in study days (04:00 rollover); final reviews spread over the last 7 days, weakest first', () => {
  T = boot();
  T.S.settings.examDate = '2026-11-30';
  NOW = new Date(2026, 10, 29, 1, 0, 0).getTime();   // 01:00 still belongs to the 28th
  assert.strictEqual(T.daysToExam(), 2);
  NOW = new Date(2026, 10, 25, 10, 0, 0).getTime();
  T.S.settings.examDate = '2026-12-15';   // 20 days
  const days = new Set();
  for (let k = 0; k < 200; k++) {
    const c = T.nextCard({ ef: 2.5, reps: 3, ivl: 40, lapses: 0, due: NOW, last: NOW - 40 * DAY }, 3, NOW, 'q:x' + k);
    assert(c.due <= NOW + 19 * DAY + DAY, 'before the exam'); days.add(Math.round((c.due - NOW) / DAY));
  }
  assert(days.size >= 6, 'spread over the final week, got ' + [...days].sort((a, b) => a - b));
  T.S.cards = { 'q:a': card(NOW - 2 * MIN, { lapses: 0, ef: 2.5 }), 'q:b': card(NOW - MIN, { lapses: 3, ef: 1.8 }) };
  T.S.cards[T.ITEMS[0].id] = card(NOW - 5 * MIN); T.S.cards[T.ITEMS[1].id] = card(NOW - MIN, { lapses: 2 });
  assert.strictEqual(T.dueItems()[0].id, T.ITEMS[1].id, 'same day: the card with more lapses first');
});

test('intervals never shrink on success, even with fuzz; imported junk fields are sanitized', () => {
  T = boot();
  for (let k = 0; k < 50; k++) {
    const relearn = T.nextCard({ ef: 2.0, reps: 0, ivl: 0, lapses: 1, post: 11, due: NOW, last: NOW - 10 * MIN }, 3, NOW, 'q:r' + k);
    assert(relearn.ivl >= 11, 'relearned card keeps at least its post interval, got ' + relearn.ivl);
    const r1 = T.nextCard({ ef: 2.5, reps: 1, ivl: 40, lapses: 0, due: NOW, last: NOW - 40 * DAY }, 3, NOW, 'q:s' + k);
    assert(r1.ivl > 40, 'Good after 40 days is longer than 40, got ' + r1.ivl);
  }
  const n = T.normalize({ cards: { 'q:x': { ef: 2.5, reps: -1, ivl: 'a', post: 'x', early: 0, due: NOW } } });
  assert.deepStrictEqual([n.cards['q:x'].reps, n.cards['q:x'].ivl, 'post' in n.cards['q:x'], 'early' in n.cards['q:x']], [0, 0, false, false]);
  const c = T.nextCard(n.cards['q:x'], 3, NOW, 'q:x');
  assert(Number.isFinite(c.ivl) && Number.isFinite(c.due));
});

test('a retry right after a mistake does not count as mastered', () => {
  T = boot();
  const q = d2[0], id = 'q:' + q.id;
  d2.forEach(x => { T.S.cards['q:' + x.id] = card(NOW + 9 * DAY); });
  T.S.cards[id] = { ef: 2.5, reps: 0, ivl: 0, lapses: 0, due: NOW - MIN, last: NOW - 11 * MIN };
  T.S.stats[q.id] = { a: 1, c: 0, r: [0] };
  go('#/practice/2'); answer(true);
  assert.deepStrictEqual(T.S.stats[q.id], { a: 2, c: 1, r: [0] }, 'counted, but not in the recent results');
  assert(T.isWeakStat(T.S.stats[q.id]), 'still weak');
});

test('readiness: data gates use decayed weights; old results cannot be outvoted by a handful of new ones', () => {
  T = boot();
  const ids = [...T.POOL_IDS];
  ids.slice(0, 130).forEach((id, k) => { T.S.examFirst[id] = [k % 2, NOW - 150 * DAY]; });
  ids.slice(130, 138).forEach(id => { T.S.examFirst[id] = [1, NOW]; });
  const r = T.readiness();
  assert(r.n === 138 && r.ne < T.READY_MIN_N && !r.ready, `not ready on 8 recent answers (ne ${r.ne.toFixed(1)})`);
  assert(r.p < 0.75, 'old results still count (weight floor)');
});

test('exam: draws follow the task mix in every exam; an exam submitted on return records only viewed questions', () => {
  T = boot();
  const counts = [];
  for (let e = 0; e < 3; e++) {
    go('#/exam'); el('start').onclick();
    const c = {}; T.S.exam.ids.forEach(id => { const t = T.D.examPool.find(q => q.id === id).t; c[t] = (c[t] || 0) + 1; });
    counts.push(c); click('a', 'submit');
  }
  assert.strictEqual(Object.keys(T.S.examSeen).length, 195, 'three exams use the whole pool once');
  Object.keys(counts[0]).forEach(k => assert(Math.abs((counts[2][k] || 0) - counts[0][k]) <= 1, `task ${k}: exam 3 ${counts[2][k]} vs exam 1 ${counts[0][k]}`));
  T = boot();
  go('#/exam'); el('start').onclick();
  const E = T.S.exam; full(E, E.ids.slice(0, 33));
  NOW += 3 * 60 * MIN; go('#/exam');
  assert.strictEqual(T.S.exams.length, 1, 'submitted (33 of 65)');
  assert.strictEqual(T.S.exams[0].n, 65, 'scored over the whole exam');
  assert.strictEqual(Object.keys(T.S.examFirst).length, 33, 'unviewed questions stay fresh');
  assert.strictEqual(T.S.exams[0].fresh, 65);
});

Date.now = RealNow;
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
