/* Service worker: cho phép dùng offline.
 * - Khi cài: tải sẵn toàn bộ file vào cache.
 * - Khi dùng: trả file từ cache ngay (nhanh, chạy offline), đồng thời tải bản mới
 *   ở nền để lần mở sau có nội dung cập nhật (stale-while-revalidate).
 * Thêm file mới vào website → thêm vào FILES và tăng VERSION.
 */
const VERSION = 'v7';
const CACHE = 'clf-c02-' + VERSION;
const FILES = [
  './', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest',
  // Nội dung (thứ tự giống index.html)
  'content/domains.js', 'content/glossary.js', 'content/services.js', 'content/quick-summary.js',
  'content/lessons/course-a.js', 'content/lessons/course-b.js', 'content/lessons/course-c.js', 'content/lessons/course-d.js',
  'content/lessons/course-e.js', 'content/lessons/course-f.js', 'content/questions/d1.js', 'content/questions/d2.js',
  'content/questions/d3.js', 'content/questions/d4.js', 'content/exam/d1.js', 'content/exam/d2.js',
  'content/exam/d3.js', 'content/exam/d4.js', 'content/tags.js',
  // Bản English / 日本語 (i18n/en, i18n/ja) KHÔNG cache sẵn: app.js chỉ nạp ngôn ngữ đang chọn và fetch bên dưới tự
  // cache các file đó. Nhờ vậy người dùng tiếng Việt không phải tải thêm ~2,4 MB, và một file dịch lỗi không làm hỏng việc cài đặt.
  'i18n/vi/ui.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))));
});

// Phiên bản mới: chép các file i18n/en, i18n/ja đã cache từ bản cũ sang (để vẫn dùng được offline ngay sau khi cập nhật;
// fetch bên dưới sẽ làm mới chúng ở lần mở tiếp theo), rồi xóa cache cũ.
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

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { e.waitUntil(fresh); return cached; }
    const res = await fresh;
    if (res) return res;
    // Offline và chưa có trong cache: với trang HTML thì trả về trang chính
    if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
    return Response.error();
  }));
});
