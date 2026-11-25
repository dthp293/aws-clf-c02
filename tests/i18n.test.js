// Usage: node tests/i18n.test.js [project root]
// Checks: node --check on every JS file; t() keys exist in vi/ui.js; vi/en/ja key sets + {params} match;
// app boots in vi/en/ja (loader stubbed), renders every route, no Vietnamese leaks in en/ja; fallback when files are missing.
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = process.argv[2] || path.resolve(__dirname, '..');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } else console.log('ok  ', m); };
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* 1. node --check */
const jsFiles = cp.execSync('git ls-files -co --exclude-standard "*.js"', { cwd: ROOT, encoding: 'utf8' }).trim().split('\n');
let bad = [];
for (const f of jsFiles) { try { cp.execFileSync('node', ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); } catch (e) { bad.push(f); } }
ok(!bad.length, `node --check on ${jsFiles.length} JS files ${bad.join(' ')}`);

/* 2. key sets */
const uiOf = lang => { const w = {}; vm.runInNewContext(rd(`i18n/${lang}/ui.js`), { window: w }); return w.CLF_I18N[lang].ui; };
const U = { vi: uiOf('vi'), en: uiOf('en'), ja: uiOf('ja') };
const keys = l => Object.keys(U[l]).sort().join('|');
ok(keys('vi') === keys('en') && keys('vi') === keys('ja'), `vi/en/ja ui.js have identical key sets (${Object.keys(U.vi).length} keys)`);
for (const l of ['en', 'ja']) {
  const d1 = Object.keys(U.vi).filter(k => !(k in U[l])), d2 = Object.keys(U[l]).filter(k => !(k in U.vi));
  if (d1.length || d2.length) console.log('   ', l, 'missing', d1, 'extra', d2);
}
const params = s => [...new Set([...s.matchAll(/\{(\w+)(?:\?[^{}:]*:[^{}]*)?\}/g)].map(m => m[1]))].sort().join(',');
const pm = [];
for (const k of Object.keys(U.vi)) for (const l of ['en', 'ja']) if (k in U[l] && params(U.vi[k]) !== params(U[l][k])) pm.push(`${l}:${k} [${params(U.vi[k])}] vs [${params(U[l][k])}]`);
ok(!pm.length, 'placeholders match across languages ' + pm.join('; '));
// same set of tag names (a translation may split one <b> into two, e.g. ja exam.saveFresh)
const tags = s => [...new Set((s.match(/<\/?[a-z]+/gi) || []).map(x => x.toLowerCase()))].sort().join(',');
const tm = [];
for (const k of Object.keys(U.vi)) for (const l of ['en', 'ja']) if (k in U[l] && tags(U.vi[k]) !== tags(U[l][k])) tm.push(`${l}:${k}`);
ok(!tm.length, 'HTML tags match across languages ' + tm.join(' '));

/* 3. keys used in app.js / index.html exist in vi */
const html = rd('index.html');
const app = rd('app.js').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/ .*$/gm, '');
const ns = new Set(Object.keys(U.vi).map(k => k.split('.')[0]));
const used = new Set();
for (const m of app.matchAll(/'([a-z]+\.[\w.-]+)'/gi)) if (ns.has(m[1].split('.')[0]) && !m[1].endsWith('.') && !/\.(js|json|html|png)$/.test(m[1])) used.add(m[1]);
for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) used.add(m[1]);
// dynamic keys
['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '4.1', '4.2', '4.3'].forEach(k => used.add('task.' + k));
['bi', 'en-first', 'en-only'].forEach(m => { used.add('set.mode.' + m); used.add('set.mode.' + m + '.d'); });
['ok', 'warn', 'no'].forEach(v => used.add('exam.verdict.' + v));
const tCalls = [...app.matchAll(/\bt\('([^']+)'/g)].map(m => m[1]).filter(k => !k.endsWith('.'));
tCalls.forEach(k => used.add(k));
const missing = [...used].filter(k => !(k in U.vi));
ok(!missing.length, `all ${used.size} used keys exist in vi/ui.js ${missing.join(' ')}`);
const unused = Object.keys(U.vi).filter(k => !used.has(k));
console.log('    (unused keys:', unused.join(' ') || 'none', ')');

/* 4. no hard-coded Vietnamese in app.js outside comments (LANG_NAMES endonym allowed) */
const VI_RE = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const strip = src => src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').map(l => l.replace(/\s\/\/ .*$/, '').replace(/^\s*\/\/.*$/, ''));
const viLines = strip(rd('app.js')).map((l, i) => [i, l]).filter(([, l]) => VI_RE.test(l.replace("'Tiếng Việt'", '')));
ok(!viLines.length, 'no Vietnamese literals in app.js code ' + viLines.map(x => x[1].trim().slice(0, 80)).join(' | '));

/* 5. sw.js FILES */
const swCtx = { self: { addEventListener() {} }, caches: {}, location: { origin: '' } };
vm.runInNewContext(rd('sw.js') + ';self.__F = FILES; self.__V = VERSION;', swCtx);
const F = swCtx.self.__F;
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
ok(scripts.every(s => F.includes(s)), 'every index.html script is in sw FILES');
const i18nAll = ['i18n/vi/ui.js', ...['en', 'ja'].flatMap(l => ['ui', 'data', 'q-1', 'q-2', 'q-3', 'q-4', 'q-5', 'q-6', 'q-7', 'q-8', 'course-a', 'course-b', 'course-c', 'course-d', 'course-e', 'course-f'].map(f => `i18n/${l}/${f}.js`))];
ok(F.includes('i18n/vi/ui.js') && !F.some(f => /^i18n\/(en|ja)\//.test(f)) && i18nAll.every(f => fs.existsSync(path.join(ROOT, f))), 'sw precaches only vi/ui.js; en/ja files exist (cached lazily)');
const absent = F.filter(f => f !== './' && !fs.existsSync(path.join(ROOT, f)));
ok(!absent.length, 'every sw FILES entry exists on disk ' + absent.join(' '));
ok(swCtx.self.__V === 'v6', 'sw VERSION v6');
ok(scripts.indexOf('i18n/vi/ui.js') >= 0 && scripts.indexOf('i18n/vi/ui.js') < scripts.indexOf('app.js'), 'index.html loads i18n/vi/ui.js before app.js');
const filesTxt = rd('i18n/FILES.txt');
const appFiles = (app.match(/const I18N_FILES = \[([\s\S]*?)\]/) || [])[1].match(/'[^']+'/g).map(x => x.slice(1, -1));
ok(appFiles.length === 16 && appFiles.every(f => filesTxt.includes(`i18n/<lang>/${f}.js`)), 'I18N_FILES matches FILES.txt (16 files)');

/* 6. boot the app in a fake browser per language */
function mkEl(id) {
  return { id, innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, hidden: false, children: [],
    classList: { toggle() {}, add() {}, remove() {} }, addEventListener() {}, appendChild(c) { this.children.push(c); },
    querySelector() { return mkEl('q'); }, querySelectorAll() { return []; }, getBoundingClientRect() { return { left: 0, top: 0, bottom: 0 }; },
    scrollIntoView() {}, click() {}, matches() { return false; }, closest() { return null; } };
}
function boot(ui, opts = {}) {
  const store = { 'clf-c02-study-v1': JSON.stringify({ cards: {}, settings: { ui, lang: opts.mode || 'bi' } }) };
  const els = {}, injected = [];
  const navSpans = ['nav.home', 'nav.review', 'nav.practice'].map(k => { const e = mkEl('nav'); e.dataset.i18n = k; return e; });
  const root = { lang: 'vi' };
  let reloaded = 0;
  const document = {
    documentElement: root,
    getElementById(id) { return els[id] || (els[id] = mkEl(id)); }, createElement() { return mkEl('script'); },
    addEventListener() {}, querySelectorAll(sel) { return sel === '[data-i18n]' ? navSpans : []; }, body: mkEl('body'),
    head: { appendChild(sc) {
      injected.push(sc.src);
      setTimeout(() => {
        const f = path.join(ROOT, sc.src);
        if (opts.missing && opts.missing.some(m => sc.src.endsWith(m)) || !fs.existsSync(f)) return sc.onerror && sc.onerror();
        vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: sc.src }); sc.onload && sc.onload();
      }, 0);
    } }
  };
  const ctx = { document, localStorage: { getItem: k => k in store ? store[k] : null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    location: { hash: '#/', protocol: 'file:', hostname: '', reload() { reloaded++; } }, navigator: { userAgent: 'node', platform: 'x', maxTouchPoints: 0 }, console,
    matchMedia: () => ({ matches: false }), addEventListener() {}, scrollTo() {}, innerWidth: 1000, innerHeight: 800, setInterval, clearInterval, setTimeout,
    confirm: () => true, alert() {}, URL: { createObjectURL: () => 'blob:', revokeObjectURL() {} }, Blob: function () {}, Date, Math, JSON };
  ctx.window = ctx; vm.createContext(ctx);
  for (const s of scripts) {
    let code = rd(s);
    if (s === 'app.js') code = code.replace(/\}\)\(\);\s*$/, 'window.__T={route,get S(){return S},set S(v){S=v},normalize,t,UI,VI,runSession:typeof runSession!=="undefined"?runSession:null,ITEMS,showRecovery};})();');
    vm.runInContext(code, ctx, { filename: s });
  }
  return { ctx, els, injected, root, navSpans, store, reloaded: () => reloaded };
}
const ROUTES = ['#/', '#/review', '#/review/free', '#/review/free/1', '#/review/free/all', '#/practice', '#/practice/1', '#/practice/read', '#/practice/t-2.3',
  '#/exam', '#/learn', '#/learn/sum/2', '#/lesson/0-1', '#/lesson/3-6', '#/glossary', '#/settings', '#/exam/r9'];
const leak = h => { const x = h.replace(/Tiếng Việt/g, '').replace(/Ngôn ngữ/g, ''); /* endonyms in the language picker */ const m = x.match(new RegExp('.{0,40}' + VI_RE.source + '.{0,40}', 'i')); return m ? m[0] : null; };

(async () => {
  // VI: synchronous boot, nothing injected, bilingual still shows Vietnamese translation
  let r = boot('vi');
  ok(!r.injected.length && r.els.app.innerHTML.includes('Ôn thi AWS'), 'vi boots synchronously, no i18n files injected');
  r.ctx.location.hash = '#/practice/1'; r.ctx.__T.route();
  ok(/class="vi"/.test(r.els.app.innerHTML), 'vi bilingual mode still shows the Vietnamese translation');
  r.ctx.location.hash = '#/settings'; r.ctx.__T.route();
  ok(/name="lang"/.test(r.els.app.innerHTML) && /name="ui"/.test(r.els.app.innerHTML), 'vi settings: mode radios + language selector');

  for (const ui of ['en', 'ja']) {
    r = boot(ui);
    ok(r.els.app.innerHTML.includes('⏳') && r.injected.length === 16, `${ui}: shows placeholder, injects 16 files`);
    await new Promise(res => setTimeout(res, 50));
    const T = r.ctx.__T;
    ok(r.root.lang === ui && r.navSpans[1].textContent === U[ui]['nav.review'], `${ui}: <html lang> and nav translated`);
    ok(r.els.app.innerHTML.includes(U[ui]['home.title']), `${ui}: home rendered after load`);
    const leaks = [];
    for (const h of ROUTES) {
      r.ctx.location.hash = h; T.route();
      const out = r.els.app.innerHTML;
      if (out.includes('rec.title') || out.includes(U[ui]['rec.title'])) leaks.push(h + ' → recovery screen');
      const l = leak(out); if (l) leaks.push(h + ': ' + l);
    }
    ok(!leaks.length, `${ui}: all routes render without Vietnamese text\n      ` + leaks.join('\n      '));
    r.ctx.location.hash = '#/practice/1'; T.route();
    ok(!/class="vi"/.test(r.els.app.innerHTML) && !/data-a="vi"/.test(r.els.app.innerHTML), `${ui}: no Vietnamese translation / toggle on questions`);
    r.ctx.location.hash = '#/settings'; T.route();
    ok(!/name="lang"/.test(r.els.app.innerHTML) && /id="kw"/.test(r.els.app.innerHTML), `${ui}: bilingual mode hidden, keyword toggle kept`);
    // answer a question wrong → explanation in chosen language
    r.ctx.location.hash = '#/practice/1'; T.route();
    const h = r.els.app.innerHTML;
    // select options in order (multi-response questions need 2–3 picks before Check works)
    const need = (h.match(/data-i="\d+"/g) || []).length && (/Choose THREE|3 つ選択/.test(h) ? 3 : /Choose TWO|2 つ選択/.test(h) ? 2 : 1);
    [...h.matchAll(/data-i="(\d+)"/g)].slice(0, need).forEach(m => r.els.app.onclick({ target: { closest: s => s === '.opt' ? { dataset: { i: m[1] } } : null } }));
    r.els.app.onclick({ target: { closest: s => /\[data-a\]/.test(s) ? { dataset: { a: 'check' } } : null } });
    const after = r.els.app.innerHTML;
    ok(/class="result/.test(after) && !leak(after), `${ui}: answered question shows translated explanation ` + (leak(after) || ""));
  }

  // fallback: en with all content files missing except ui.js → Vietnamese content, English UI, no crash
  r = boot('en', { missing: ['data.js', 'q-1.js', 'q-2.js', 'q-3.js', 'q-4.js', 'q-5.js', 'q-6.js', 'q-7.js', 'q-8.js', 'course-a.js', 'course-b.js', 'course-c.js', 'course-d.js', 'course-e.js', 'course-f.js'] });
  await new Promise(res => setTimeout(res, 50));
  r.ctx.location.hash = '#/lesson/0-1'; r.ctx.__T.route();
  ok(r.els.app.innerHTML.includes('Máy chủ, data center') && r.els.app.innerHTML.includes(U.en['lesson.goals']), 'missing en content → VI lesson with EN UI');
  // fallback: even ui.js missing → Vietnamese UI
  r = boot('ja', { missing: ['ui.js', 'data.js'] });
  await new Promise(res => setTimeout(res, 50));
  ok(r.els.app.innerHTML.includes('Ôn thi AWS'), 'missing ja ui.js → Vietnamese UI, app still renders');

  // normalize / switching
  r = boot('vi');
  const N = r.ctx.__T.normalize;
  ok(N({ settings: { ui: 'fr' } }).settings.ui === 'vi' && N({ settings: { ui: 'ja' } }).settings.ui === 'ja' && N({}).settings.ui === 'vi', 'normalize validates settings.ui');
  r.ctx.location.hash = '#/settings'; r.ctx.__T.route();
  // settings radios are found via $app.querySelectorAll in a browser; emulate by calling the handler path directly
  r.ctx.__T.S.settings.ui = 'en';
  ok(r.ctx.__T.UI === 'vi', 'UI fixed for the session (switch applies on reload)');
  // t(): params and plural
  const T2 = boot('en'); await new Promise(res => setTimeout(res, 50));
  const t = T2.ctx.__T.t;
  ok(t('ivl.days', { n: 1 }) === '1 day' && t('ivl.days', { n: 3 }) === '3 days' && t('nope.key') === 'nope.key', 't(): plural + missing key');

  console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.log('CRASH', e); process.exit(2); });
