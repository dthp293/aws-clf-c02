// Service worker behavior, run against sw.js with fake caches and network:
// - install precaches FILES (no en/ja translation files)
// - en/ja translation files are network-first: a stale cached copy is never served while the network works
// - offline (or a very slow network) falls back to the cached copy
// - other files are cache-first and refreshed in the background
// - the cache write of a fresh copy is kept alive with waitUntil (not cut off when the worker stops)
// - activate keeps cached en/ja files from the previous version and deletes old caches
// Usage: node tests/sw.test.js [project root]
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = process.argv[2] || path.resolve(__dirname, '..');
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } else console.log('ok  ', m); };

class Res { constructor(body, status = 200) { this.body = body; this.status = status; this.ok = status >= 200 && status < 300; } clone() { return new Res(this.body, this.status); } }
const key = r => new URL(typeof r === 'string' ? r : r.url, 'https://site.test/').pathname;
function makeEnv({ network }) {
  const stores = new Map();
  const open = name => { if (!stores.has(name)) stores.set(name, new Map()); const m = stores.get(name);
    return {
      match: async r => m.get(key(r)),
      // a cache write takes a moment, like a real one: it is only done if the worker is kept alive (waitUntil) until then
      put: async (r, res) => { await new Promise(t => setImmediate(t)); m.set(key(r), res); }, keys: async () => [...m.keys()].map(p => ({ url: 'https://site.test' + p })),
      addAll: async reqs => { for (const r of reqs) { const res = await network(r); if (!res || !res.ok) throw new Error('addAll failed ' + key(r)); m.set(key(r), res); } }
    }; };
  const caches = { open: async n => open(n), keys: async () => [...stores.keys()], delete: async n => stores.delete(n) };
  const listeners = {};
  const self = { addEventListener: (t, f) => { listeners[t] = f; }, skipWaiting() {}, clients: { claim: async () => {} } };
  const timers = [];
  const ctx = { self, caches, location: { origin: 'https://site.test' }, URL, Request: function (u, o) { return { url: new URL(u, 'https://site.test/').href, ...o }; },
    Response: { error: () => new Res(null, 0) }, fetch: (r, o) => network(r, o), Promise, console,
    setTimeout: (f, ms) => { timers.push({ f, ms }); return timers.length; } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8') + ';self.__VERSION = VERSION; self.__FILES = FILES;', ctx);
  const req = p => ({ url: 'https://site.test/' + p, method: 'GET', mode: 'no-cors' });
  // dispatch a fetch event; returns the response the worker answered with
  const fetchEv = async (p, { waitBackground = true } = {}) => { let out; const waits = []; listeners.fetch({ request: req(p), respondWith: pr => { out = pr; }, waitUntil: pr => waits.push(pr) }); const r = await out; if (waitBackground) await Promise.all(waits); return r; };
  const lifecycle = async t => { let w; listeners[t]({ waitUntil: p => { w = p; } }); await w; };
  return { self, caches, open, fetchEv, lifecycle, timers, cacheName: 'clf-c02-' + self.__VERSION };
}

(async () => {
  // a network that returns "new:<path>" for every file, and records what was requested and how
  const seen = [];
  const online = async (r, o) => { seen.push([key(r), (o && o.cache) || (r && r.cache) || 'default']); return new Res('new:' + key(r)); };

  // install
  let env = makeEnv({ network: online });
  await env.lifecycle('install');
  const store = await env.open(env.cacheName);
  const cached = (await store.keys()).map(r => key(r));
  ok(cached.includes('/i18n/vi/ui.js') && !cached.some(p => /\/i18n\/(en|ja)\//.test(p)), 'install precaches vi/ui.js but no en/ja translation files');
  ok(env.self.__FILES.every(f => cached.includes(key(f))), `install precaches all ${env.self.__FILES.length} FILES`);

  // network-first for en/ja: a stale cached copy must not be served while online
  await store.put('i18n/en/course-c.js', new Res('old:/i18n/en/course-c.js'));
  seen.length = 0;
  let r = await env.fetchEv('i18n/en/course-c.js');
  ok(r.body === 'new:/i18n/en/course-c.js', 'online: en file comes from the network even when an older copy is cached');
  ok(seen.some(([p, c]) => p === '/i18n/en/course-c.js' && c === 'no-cache'), 'en file is requested with cache: no-cache (skips a stale browser HTTP cache)');
  ok((await store.match('i18n/en/course-c.js')).body === 'new:/i18n/en/course-c.js', 'the fresh en file replaces the cached copy (the cache write is kept alive with waitUntil)');

  // offline: fall back to the cached copy
  env = makeEnv({ network: async () => { throw new Error('offline'); } });
  const s2 = await env.open(env.cacheName);
  await s2.put('i18n/ja/q-1.js', new Res('cached:ja'));
  r = await env.fetchEv('i18n/ja/q-1.js');
  ok(r.body === 'cached:ja', 'offline: ja file falls back to the cached copy');
  r = await env.fetchEv('i18n/ja/q-2.js');
  ok(r.status === 0, 'offline and not cached: an error response (the app then falls back to Vietnamese)');

  // very slow network with a cached copy: the timer wins and the cached copy is served
  env = makeEnv({ network: () => new Promise(() => {}) });
  const s3 = await env.open(env.cacheName);
  await s3.put('i18n/en/data.js', new Res('cached:en'));
  const p = env.fetchEv('i18n/en/data.js', { waitBackground: false });   // the network request never finishes
  await new Promise(res => setImmediate(res));
  const t = env.timers.find(x => x.ms >= 1000);
  ok(!!t && t.ms <= 5000, 'slow network: a timeout of at most 5 s is set');
  if (t) t.f();
  const slow = await Promise.race([p.then(x => x.body), new Promise(res => setTimeout(() => res('hung'), 200))]);
  ok(slow === 'cached:en', 'slow network: the cached copy is served when the timeout fires');

  // other files: cache-first
  env = makeEnv({ network: online });
  const s4 = await env.open(env.cacheName);
  await s4.put('js/core.js', new Res('cached:core'));
  r = await env.fetchEv('js/core.js');
  ok(r.body === 'cached:core', 'app files are served from the cache first (and refreshed in the background)');
  ok((await s4.match('js/core.js')).body === 'new:/js/core.js', 'the background refresh stores the new copy for next time (kept alive with waitUntil)');

  // activate: carry cached en/ja files over from the old version, delete old caches
  env = makeEnv({ network: online });
  const old = await env.open('clf-c02-v0');
  await old.put('i18n/en/q-1.js', new Res('old-en'));
  await old.put('js/core.js', new Res('old-core'));
  await env.open(env.cacheName);
  await env.lifecycle('activate');
  const names = await env.caches.keys();
  const cur = await env.open(env.cacheName);
  ok(!names.includes('clf-c02-v0'), 'activate deletes caches of older versions');
  ok((await cur.match('i18n/en/q-1.js')) && !(await cur.match('js/core.js')), 'activate keeps cached en/ja files (for offline) but not old app files');

  console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.log('CRASH', e); process.exit(2); });
