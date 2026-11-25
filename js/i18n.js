/* Language: t() for UI strings and per-field translations of content (falls back to Vietnamese). */
'use strict';

/* ───────── Ngôn ngữ (i18n) ─────────
   Chuỗi giao diện: i18n/<lang>/ui.js → window.CLF_I18N[lang].ui. Nội dung giải thích, bài học, từ vựng: các file
   khác trong i18n/<lang>/ (xem i18n/FILES.txt). Thiếu chuỗi/trường nào thì dùng bản tiếng Việt gốc. */
const I18N = window.CLF_I18N = window.CLF_I18N || {};
const UI = S.settings.ui;                // cố định trong cả phiên; đổi ngôn ngữ trong Cài đặt → tải lại trang
const VI = UI === 'vi';                  // bản dịch câu hỏi + chế độ song ngữ chỉ có ở bản tiếng Việt
const LOCALE = { vi: 'vi-VN', en: 'en-US', ja: 'ja-JP' }[UI];
const LANG_NAMES = { vi: 'Tiếng Việt', en: 'English', ja: '日本語' };   // tên tự gọi, không dịch
const I18N_FILES = ['ui', 'data', 'q-1', 'q-2', 'q-3', 'q-4', 'q-5', 'q-6', 'q-7', 'q-8',
  'course-a', 'course-b', 'course-c', 'course-d', 'course-e', 'course-f'];
const pack = lang => I18N[lang] || {};
/* t('khóa', { tham số }): ngôn ngữ đang chọn → tiếng Việt → chính khóa. {x} = tham số; {n?một:nhiều} = số ít/nhiều.
   Kết quả có thể chứa HTML; tham số được chèn nguyên văn nên phải esc() trước nếu là dữ liệu. */
function t(key, p) {
  const cur = pack(UI).ui, vi = pack('vi').ui;
  let s = cur && typeof cur[key] === 'string' ? cur[key] : vi && typeof vi[key] === 'string' ? vi[key] : key;
  if (!p) return s;
  s = s.replace(/\{(\w+)\?([^{}:]*):([^{}]*)\}/g, (m, k, one, many) => k in p ? (Number(p[k]) === 1 ? one : many) : m);
  return s.replace(/\{(\w+)\}/g, (m, k) => k in p ? String(p[k]) : m);
}
// Nội dung theo ngôn ngữ: null khi đang dùng tiếng Việt hoặc chưa có bản dịch
const tr = (kind, id) => { if (VI) return null; const o = pack(UI)[kind]; return (o && o[id]) || null; };
const pick = (v, d) => typeof v === 'string' && v ? v : d;
const has = (x, k) => !!x && typeof x[k] === 'string';
const domName = d => { const x = typeof d === 'object' ? d : dom(d); return pick(tr('domains', x.id), x.vi); };
const qExp = q => pick((tr('q', q.id) || {}).exp, q.exp);
const qWhy = (q, i) => { const w = (tr('q', q.id) || {}).why; return pick(Array.isArray(w) ? w[i] : null, q.why[i] || ''); };
// Câu hỏi/đáp án theo ngôn ngữ (bản ja dịch cả đề vì kỳ thi có bản tiếng Nhật; bản en dùng nguyên văn)
// Chỉ dùng bản dịch khi đủ cả đề lẫn mọi lựa chọn; thiếu bất kỳ phần nào thì cả câu dùng tiếng Anh (không trộn hai ngôn ngữ)
const qLoc = q => { const x = tr('q', q.id), o = x && x.opts;
  return x && typeof x.q === 'string' && x.q && Array.isArray(o) && o.length === q.opts.length && o.every(s => typeof s === 'string' && s) ? x : null; };
const qStem = q => { const x = qLoc(q); return x ? x.q : q.en; };
const qOpt = (q, i) => { const x = qLoc(q); return x ? x.opts[i] : q.opts[i][0]; };
// Bản này hiển thị đề đã dịch (ja) → các tính năng luyện đọc đề tiếng Anh không áp dụng
const qTranslated = () => !VI && D.questions.some(qLoc);
const gMeaning = g => pick((tr('glossary', g.term) || {}).meaning, g.vi);
const gHint = g => { const x = tr('glossary', g.term); return has(x, 'hint') ? x.hint : g.hint; };
const svcDesc = s => pick((tr('services', s.name) || {}).desc, s.vi);
const svcConfuse = s => { const x = tr('services', s.name); return has(x, 'confuse') ? x.confuse : s.confuse; };
// Bài học đã ghép bản dịch (từng trường, thiếu thì giữ tiếng Việt). terms[i][0] là thuật ngữ tiếng Anh, giữ nguyên.
function les(l) {
  const x = tr('course', l.id); if (!x) return l;
  const arr = (a, d) => Array.isArray(a) && a.length ? a : d;
  return { ...l, title: pick(x.title, l.title), goals: arr(x.goals, l.goals), html: pick(x.html, l.html), summary: arr(x.summary, l.summary),
    terms: (l.terms || []).map(([en, vi], i) => [en, pick(Array.isArray(x.terms) && Array.isArray(x.terms[i]) ? x.terms[i][1] : null, vi)]) };
}
// Tóm tắt nhanh của domain d: [{ t, h }]
function quickSum(d) {
  const base = (D.lessons || {})[d] || [], x = tr('lessons', d);
  if (!Array.isArray(x) || !x.length) return base;
  return Array.from({ length: Math.max(x.length, base.length) }, (_, i) => {
    const y = x[i] || {}, b = base[i] || {};
    return { t: pick(y.t, b.t || ''), h: pick(y.h, b.h || '') };
  });
}
const taskName = k => t('task.' + k);
const qLang = () => VI ? S.settings.lang : 'en-only';   // bản en/ja: không có bản dịch tiếng Việt của câu hỏi (ja hiển thị đề tiếng Nhật qua qStem/qOpt)
