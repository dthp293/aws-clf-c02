/* SRS items and scheduling (SM-2 variant): main schedule S.cards and Free practice schedule S.free. */
'use strict';

/* ───────── Items ───────── */
const qNum = q => parseInt(q.id.split('-')[1], 10) || 0;
const ITEMS = [
  // xen kẽ domain: d1-1, d2-1, d3-1, d4-1, d1-2...
  ...D.questions.slice().sort((a, b) => qNum(a) - qNum(b) || a.d - b.d).map(q => ({ id: 'q:' + q.id, type: 'q', d: q.d, ref: q })),
  ...D.glossary.map(g => ({ id: 'v:' + g.term.toLowerCase(), type: 'v', d: 0, ref: g })),
  ...D.services.map(s => ({ id: 's:' + s.name, type: 's', d: s.d, ref: s }))
];
const ITEM_BY = new Map(ITEMS.map(i => [i.id, i]));
const qItem = qid => ITEM_BY.get('q:' + qid);

/* ───────── SRS: biến thể SM-2 ─────────
   grade: 1 = Lại (Again), 2 = Khó (Hard), 3 = Tốt (Good), 4 = Dễ (Easy) */
function nextCard(c, g, now = Date.now()) {
  c = c ? { ...c } : { ef: 2.5, reps: 0, ivl: 0, lapses: 0 };
  if (g === 1) {
    c.reps = 0; c.ivl = 0; c.lapses = (c.lapses || 0) + 1;
    c.ef = Math.max(1.3, c.ef - 0.2);
    c.due = now + 10 * MIN;
  } else {
    if (c.reps === 0) c.ivl = g === 4 ? 3 : 1;
    // Không để khoảng cách ngắn lại khi trả lời đúng: Khó ≥ khoảng hiện tại, Tốt/Dễ > khoảng hiện tại
    // (ví dụ Dễ → 3 ngày rồi Khó → vẫn 3 ngày, không tụt về 2).
    else if (c.reps === 1) c.ivl = Math.max(g === 2 ? c.ivl : c.ivl + 1, g === 2 ? 2 : g === 3 ? 4 : 7);
    else c.ivl = Math.max(c.ivl + 1, Math.round(c.ivl * (g === 2 ? 1.2 : g === 3 ? c.ef : c.ef * 1.3)));
    const q = g + 1; // 3..5 theo thang SM-2
    c.ef = Math.max(1.3, c.ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    c.reps++;
    c.due = startOfDay(now) + c.ivl * DAY;
  }
  c.last = now;
  return c;
}
const fmtIvl = c => c.ivl === 0 ? t('ivl.10min') : c.ivl < 30 ? t('ivl.days', { n: c.ivl }) : t('ivl.months', { n: (c.ivl / 30).toFixed(1).replace('.0', '') });

/* Hai lịch SRS độc lập, cùng một luật SM-2:
   - S.cards (lịch chính): Ôn hôm nay, tab Luyện tập, quiz cuối bài học, ôn câu sai sau thi thử.
   - S.free  (lịch riêng): chỉ phiên "Luyện tập tự do" ({ free: true }) đọc/ghi; không đụng S.cards, không đụng newLog.
   Quy tắc chung cho mọi chế độ: thẻ đã học (có trong lịch) không bao giờ hiện trước giờ đến hạn của lịch đó.
   Chỉ thẻ mới được giới thiệu trong phiên "Ôn hôm nay" ({ review: true }) mới tính vào hạn mức thẻ mới/ngày;
   câu mới trả lời ở Luyện tập / quiz bài học vẫn vào S.cards nhưng không "ăn" hạn mức. */
let curSession = null;
const deckOf = opt => opt && opt.free ? S.free : S.cards;
const deck = () => deckOf(curSession);
function grade(id, g) {
  if (!ITEM_BY.has(id)) return;   // chỉ thẻ thuộc ITEMS; câu kho thi thử không bao giờ vào lịch
  const free = !!(curSession && curSession.free);
  const dk = free ? S.free : S.cards;
  const isNew = !dk[id];
  dk[id] = nextCard(dk[id], g);
  if (!free && isNew && curSession && curSession.review) {
    if (S.newLog.date !== today()) S.newLog = { date: today(), count: 0 };
    S.newLog.count++;
  }
  S.activity[today()] = (S.activity[today()] || 0) + 1;
  save();
}
// "Luyện được lúc này" trong một lịch = chưa học (mới) hoặc đã đến hạn
const availIn = (dk, id) => !dk[id] || dk[id].due <= Date.now();
const isAvail = id => availIn(S.cards, id);
const availQs = qs => qs.filter(q => isAvail('q:' + q.id));
// Giờ đến hạn sớm nhất của các thẻ đã học-chưa-đến-hạn trong tập ids (null nếu không có)
function nextDueIn(dk, ids) {
  let m = Infinity; const now = Date.now();
  ids.forEach(id => { const c = dk[id]; if (c && c.due > now && c.due < m) m = c.due; });
  return m === Infinity ? null : m;
}
const fmtWhen = ms => new Date(ms).toLocaleString(LOCALE, { dateStyle: 'medium', timeStyle: 'short' });
function recordAnswer(qid, ok) {
  const s = S.stats[qid] || (S.stats[qid] = { a: 0, c: 0 });
  s.a++; if (ok) s.c++;
}
const isDue = id => S.cards[id] && S.cards[id].due <= Date.now();
const dueItems = () => ITEMS.filter(i => isDue(i.id)).sort((a, b) => S.cards[a.id].due - S.cards[b.id].due);
const newLeft = () => Math.max(0, S.settings.newPerDay - (S.newLog.date === today() ? S.newLog.count : 0));
function newItems(n) {
  // xen kẽ: câu hỏi → từ vựng → dịch vụ
  const pools = ['q', 'v', 's'].map(t => ITEMS.filter(i => i.type === t && !S.cards[i.id]));
  const out = []; let k = 0;
  while (out.length < n && pools.some(p => p.length)) { const p = pools[k % 3]; if (p.length) out.push(p.shift()); k++; }
  return out;
}
function streak() {
  let n = 0; const d = studyDate();
  if (!S.activity[ymd(d)]) d.setDate(d.getDate() - 1);
  while (S.activity[ymd(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function updateBadge() {
  const n = dueItems().length + Math.min(newLeft(), ITEMS.filter(i => !S.cards[i.id]).length);
  document.getElementById('dueBadge').textContent = n || '';
}
