/* Service worker: cho phép dùng offline.
 * - Khi cài: tải sẵn toàn bộ file vào cache.
 * - Khi dùng: trả file từ cache ngay (nhanh, chạy offline), đồng thời tải bản mới
 *   ở nền để lần mở sau có nội dung cập nhật (stale-while-revalidate).
 * Thêm file mới vào website → thêm vào FILES và tăng VERSION.
 */
const VERSION = 'v9';
const CACHE = 'clf-c02-' + VERSION;
const FILES = [
  './', 'index.html', 'style.css', 'manifest.webmanifest',
  // Code (thứ tự giống index.html)
  'js/core.js', 'js/i18n.js', 'js/util.js', 'js/srs.js', 'js/keywords.js',
  'js/session.js', 'js/home.js', 'js/review.js', 'js/practice.js', 'js/learn.js',
  'js/settings.js', 'js/exam.js', 'js/pwa.js', 'js/main.js',
  // Nội dung (thứ tự giống index.html)
  'content/domains.js', 'content/glossary.js', 'content/services.js', 'content/quick-summary.js',
  'content/lessons/course-a.js', 'content/lessons/course-b.js', 'content/lessons/course-c.js', 'content/lessons/course-d.js',
  'content/lessons/course-e.js', 'content/lessons/course-f.js', 'content/questions/d1.js',
  'content/questions/d2.js', 'content/questions/d3.js', 'content/questions/d4.js', 'content/exam/d1.js',
  'content/exam/d2.js', 'content/exam/d3.js', 'content/exam/d4.js', 'content/tags.js',
  // Bản English / 日本語 (i18n/en, i18n/ja) KHÔNG cache sẵn: js/main.js chỉ nạp ngôn ngữ đang chọn và fetch bên dưới tự
  // cache các file đó. Nhờ vậy người dùng tiếng Việt không phải tải thêm ~2,4 MB, và một file dịch lỗi không làm hỏng việc cài đặt.
  'i18n/vi/ui.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))));
});

// Phiên bản mới: chép các file i18n/en, i18n/ja đã cache từ bản cũ sang (chỉ để dự phòng khi offline ngay sau khi cập
// nhật; khi có mạng, fetch bên dưới luôn lấy bản mới của các file này trước), rồi xóa cache cũ.
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const old = (await caches.keys()).filter(k => k.startsWith('clf-c02-') && k !== CACHE);
    for (const k of old) {
      const oc = await caches.open(k);
      for (const req of await oc.keys()) {
        if (!/\/i18n\/(en|ja)\//.test(new URL(req.url).pathname) || await cache.match(req)) continue;
        const res = await oc.match(req);
        if (res) await cache.put(req, res);
      }
      await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

// File dịch en/ja: ưu tiên mạng. Bản cache có thể là bản chép từ phiên bản trước (xem activate), nên nếu trả cache trước
// thì người dùng en/ja sẽ thấy nội dung cũ ở lần mở đầu tiên sau mỗi lần cập nhật. Mất mạng, hoặc mạng chậm quá 4 giây
// khi đã có bản cache, thì dùng bản cache.
const LANG_FILE = /\/i18n\/(en|ja)\//;
const NET_WAIT = 4000;

// Tải file từ mạng; nếu OK thì lưu một bản vào cache. Trang nhận response ngay, còn việc ghi cache được giữ bằng
// waitUntil để trình duyệt không dừng service worker giữa chừng (kể cả khi trang đã nhận bản cache vì mạng chậm).
function fetchAndStore(e, cache, init) {
  const req = e.request;
  const got = fetch(req, init).then(res => [res, res && res.ok ? res.clone() : null]).catch(() => [null, null]);
  e.waitUntil(got.then(([, copy]) => copy && cache.put(req, copy)).catch(() => {}));
  return got.then(([res]) => res);
}

function networkFirst(e, cache) {
  // no-cache: hỏi lại server (không dùng bản trong HTTP cache của trình duyệt, vốn cũng có thể là bản cũ)
  const fresh = fetchAndStore(e, cache, { cache: 'no-cache' }).then(res => (res && res.ok ? res : null));
  return cache.match(e.request, { ignoreSearch: true }).then(cached => {
    if (!cached) return fresh.then(res => res || Response.error());
    const slow = new Promise(r => setTimeout(() => r(null), NET_WAIT));
    return Promise.race([fresh, slow]).then(res => res || cached);
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (LANG_FILE.test(new URL(req.url).pathname)) { e.respondWith(caches.open(CACHE).then(cache => networkFirst(e, cache))); return; }
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const fresh = fetchAndStore(e, cache);   // cập nhật ngầm cho lần mở sau
    if (cached) return cached;
    const res = await fresh;
    if (res) return res;
    // Offline và chưa có trong cache: với trang HTML thì trả về trang chính
    if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
    return Response.error();
  }));
});
