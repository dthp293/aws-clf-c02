/* Small helpers: HTML escaping, study-day dates (roll over at 04:00), shuffle, keyboard hook. */
'use strict';

/* ───────── Helpers ───────── */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
// Ngày học chuyển lúc 04:00 sáng (giống Anki): ôn lúc 1–2 giờ sáng vẫn tính cho "hôm qua".
const ROLL_H = 4;
const studyDate = (t = Date.now()) => new Date(t - ROLL_H * 3600e3);
const today = () => ymd(studyDate());
const startOfDay = t => { const d = studyDate(t); d.setHours(ROLL_H, 0, 0, 0); return d.getTime(); };
const calStart = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const dom = id => D.domains.find(d => d.id === id);
// Tải một file JSON xuống máy (xuất dữ liệu, sao lưu khi lỗi)
function downloadJson(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
let onKey = null;
document.addEventListener('keydown', e => {
  if (onKey && !e.target.matches('input, textarea, select') && !e.metaKey && !e.ctrlKey && !e.altKey) onKey(e);
});
