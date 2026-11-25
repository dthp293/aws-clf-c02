/* Exam keyword highlighting and tooltips. */
'use strict';

/* ───────── Tô màu từ khóa + tooltip ───────── */
const GMAP = new Map(D.glossary.map(g => [g.term.toLowerCase(), g]));
const KW_RE = new RegExp('\\b(' + D.glossary.map(g => g.term).sort((a, b) => b.length - a.length)
  .map(t => esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(s?)\\b', 'gi');
function hl(text) {
  const e = esc(text);
  if (!S.settings.kw) return e;
  return e.replace(KW_RE, (m, t, s) => {
    const g = GMAP.get(t.toLowerCase());
    return g ? `<span class="kw" tabindex="0" data-k="${esc(g.term.toLowerCase())}">${t}${s}</span>` : m;
  });
}
function showTip(el) {
  const g = GMAP.get(el.dataset.k); if (!g) return;
  const hint = gHint(g);
  tip.innerHTML = `<b>${esc(gMeaning(g))}</b>${hint ? `<small>💡 ${esc(hint)}</small>` : ''}`;
  tip.hidden = false;
  const r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
  const x = Math.min(Math.max(8, r.left), innerWidth - w - 8);
  let y = r.bottom + 6; if (y + h > innerHeight - 8) y = r.top - h - 6;
  tip.style.left = x + 'px'; tip.style.top = y + 'px';
}
const hideTip = () => { tip.hidden = true; };
document.addEventListener('mouseover', e => { const k = e.target.closest('.kw'); if (k) showTip(k); });
document.addEventListener('mouseout', e => { if (e.target.closest('.kw')) hideTip(); });
document.addEventListener('focusin', e => { const k = e.target.closest('.kw'); if (k) showTip(k); });
document.addEventListener('focusout', e => { if (e.target.closest('.kw')) hideTip(); });
document.addEventListener('click', e => { const k = e.target.closest('.kw'); if (k) showTip(k); else hideTip(); });
addEventListener('scroll', hideTip, { passive: true });
