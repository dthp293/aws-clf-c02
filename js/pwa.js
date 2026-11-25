/* PWA: install prompt, service worker registration and update bar. */
'use strict';

/* ───────── PWA: offline, cài đặt, cập nhật ───────── */
let installEvt = null;
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (location.hash.startsWith('#/settings')) route(); });
addEventListener('appinstalled', () => { installEvt = null; if (location.hash.startsWith('#/settings')) route(); });
let updateRequested = false;
function showUpdateBar(sw) {
  if (document.getElementById('updbar')) return;
  const bar = document.createElement('div');
  bar.id = 'updbar';
  bar.innerHTML = `<span>${t('pwa.newContent')}</span><button>${t('pwa.update')}</button>`;
  bar.querySelector('button').onclick = () => { updateRequested = true; if (sw) sw.postMessage('skipWaiting'); else location.reload(); };
  document.body.appendChild(bar);
}
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  // Lần đầu cài, sw.js gọi clients.claim() nên cũng phát sinh 'controllerchange': không tải lại trong trường hợp đó.
  // Chỉ tải lại khi trang đã có service worker từ trước VÀ người dùng bấm "Cập nhật" ở tab này;
  // nếu bản mới được kích hoạt từ tab khác thì chỉ hiện thanh cập nhật.
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    if (updateRequested) { reloading = true; location.reload(); } else showUpdateBar(null);
  });
  navigator.serviceWorker.register('sw.js').then(reg => {
    if (reg.waiting && navigator.serviceWorker.controller) showUpdateBar(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      nw && nw.addEventListener('statechange', () => { if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdateBar(nw); });
    });
    setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
  }).catch(() => {});
}
function pwaCard() {
  let body;
  if (isStandalone()) body = `<p>${t('pwa.installed')}</p>`;
  else if (installEvt) body = `<p>${t('pwa.installPrompt')}</p><button class="btn primary" id="install">${t('pwa.installBtn')}</button>`;
  else if (isIOS()) body = `<p>${t('pwa.ios')}</p>`;
  else body = `<p>${t('pwa.android')}</p>`;
  const sw = 'serviceWorker' in navigator && navigator.serviceWorker.controller;
  return `<div class="card"><h3 style="margin-top:0">${t('pwa.title')}</h3>${body}
    <p class="muted small">${sw ? t('pwa.cached') : t('pwa.httpsOnly')}
    ${t('pwa.autoUpdate')}</p>
    ${sw ? `<button class="btn" id="refresh">${t('pwa.refresh')}</button>` : ''}</div>`;
}
function bindPwaCard() {
  const ins = document.getElementById('install');
  if (ins) ins.onclick = async () => { installEvt.prompt(); await installEvt.userChoice.catch(() => {}); installEvt = null; route(); };
  const rf = document.getElementById('refresh');
  if (rf) rf.onclick = async () => {
    if (!navigator.onLine) { alert(t('pwa.offline')); return; }
    const keys = await caches.keys(); await Promise.all(keys.filter(k => k.startsWith('clf-c02-')).map(k => caches.delete(k)));
    const reg = await navigator.serviceWorker.getRegistration(); if (reg) await reg.unregister();
    location.reload();
  };
}
