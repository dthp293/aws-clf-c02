/* Service worker: cho phép dùng offline.
 * - Khi cài: tải sẵn toàn bộ file vào cache.
 * - Khi dùng: trả file từ cache ngay (nhanh, chạy offline), đồng thời tải bản mới
 *   ở nền để lần mở sau có nội dung cập nhật (stale-while-revalidate).
 * Thêm file mới vào website → thêm vào FILES và tăng VERSION.
 */
const VERSION = 'v3';
const CACHE = 'clf-c02-' + VERSION;
const FILES = [
  './', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest',
  'data.js', 'questions-2.js', 'content-3.js', 'questions-4.js',
  'extra/extra-d2.js', 'extra/extra-d3.js', 'extra/extra-d4.js',
  'extra/more-d1.js', 'extra/more-d2.js', 'extra/more-d3.js', 'extra/more-d4.js',
  'meta/tags-a.js', 'meta/tags-b.js',
  'exam/exam-d1.js', 'exam/exam-d2.js', 'exam/exam-d3.js', 'exam/exam-d4.js',
  'course/course-a.js', 'course/course-b.js', 'course/course-c.js', 'course/course-d.js', 'course/course-e.js', 'course/course-f.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('clf-c02-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
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
