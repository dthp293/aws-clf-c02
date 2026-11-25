/* Router, recovery screen and boot (loads the chosen language first). Loaded last. */
'use strict';

/* ───────── Router ───────── */
const ROUTES = { '': viewHome, review: viewReview, practice: viewPractice, exam: viewExam, learn: viewLearn, lesson: viewLesson, glossary: viewGlossary, settings: viewSettings };
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
let booted = false;   // chưa vẽ gì cho đến khi nạp xong bộ ngôn ngữ (tránh nháy chữ tiếng Việt)
function route() {
  if (!booted) return;
  hideTip(); onKey = null; $app.onclick = null; clearInterval(examTimer); examTimer = null; curSession = null;
  try {
    const [path, arg] = location.hash.replace(/^#\/?/, '').split('/');
    const p = own(ROUTES, path) ? path : '';
    document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === p));
    ROUTES[p](arg);
    window.scrollTo(0, 0);
  } catch (err) { showRecovery(err); }
}
/* Màn hình khôi phục khi dữ liệu hỏng làm app lỗi: cho xuất bản sao dữ liệu thô rồi xóa */
function showRecovery(err) {
  onKey = null; $app.onclick = null;
  try { console.error(err); } catch (e) { /* ignore */ }
  $app.innerHTML = `<div class="card"><h2 style="margin-top:0">${t('rec.title')}</h2>
    <p>${t('rec.p1')}</p>
    <p class="muted small">${t('rec.detail')} ${esc(err && err.message || err)}</p>
    <div class="row"><a class="btn" href="#/">${t('rec.retry')}</a>
      <button class="btn" id="rcExp">${t('rec.export')}</button>
      <button class="btn" id="rcReset" style="color:var(--bad)">${t('rec.reset')}</button></div></div>`;
  document.getElementById('rcExp').onclick = () => {
    let raw = ''; try { raw = localStorage.getItem(KEY) || ''; } catch (e) { /* ignore */ }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
    a.download = `clf-c02-backup-${today()}.json`; a.click();
  };
  document.getElementById('rcReset').onclick = () => {
    if (!confirm(t('rec.confirm'))) return;
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    S = clone(DEFAULTS); S.settings.ui = UI; save(); location.hash = '#/'; route();
  };
}
addEventListener('hashchange', route);
// Bấm vào liên kết trỏ tới đúng trang đang mở (ví dụ "Ôn hôm nay" khi đang ở #/review) → vẽ lại trang đó
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const norm = h => (h === '' || h === '#') ? '#/' : h;
  if (norm(a.getAttribute('href')) === norm(location.hash)) { e.preventDefault(); route(); }
});
/* ───────── Khởi động: nạp bộ ngôn ngữ đã chọn rồi mới vẽ ─────────
   Tiếng Việt có sẵn (data.js… + i18n/vi/ui.js trong index.html) nên vẽ ngay, đồng bộ.
   en/ja: chèn 16 thẻ <script> của i18n/<lang>/; file nào lỗi (offline, thiếu file) thì bỏ qua → phần đó dùng tiếng Việt. */
function loadLang(lang) {
  if (lang === 'vi') return null;
  const one = f => new Promise(res => {
    const sc = document.createElement('script');
    sc.src = `i18n/${lang}/${f}.js`; sc.async = false;
    sc.onload = sc.onerror = () => res();
    document.head.appendChild(sc);
  });
  const all = Promise.all(I18N_FILES.map(one));
  // Mạng chậm: quá 10 giây thì vẽ trước bằng phần đã có; khi các file còn lại về thì áp dụng lại (không cắt ngang phiên đang làm)
  all.then(() => { if (!booted) return; applyStatic(); if (!curSession) route(); });
  return Promise.race([all, new Promise(res => setTimeout(res, 10e3))]);
}
// Phần dịch nằm ngoài #app (thanh điều hướng, <html lang>)
function applyStatic() {
  const de = document.documentElement;
  if (de) { de.lang = UI; if (de.classList) de.classList.remove('i18n-loading'); }
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
}
function start() {
  if (booted) return;
  booted = true;
  applyStatic();
  try { updateBadge(); } catch (err) { /* badge không quan trọng */ }
  route();
}
const loading = loadLang(UI);
if (loading) { $app.innerHTML = '<p class="muted" style="text-align:center">⏳</p>'; loading.then(start, start); } else start();
