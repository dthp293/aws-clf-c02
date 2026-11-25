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
   grade: 1 = Lại (Again), 2 = Khó (Hard), 3 = Tốt (Good), 4 = Dễ (Easy)
   - Thẻ đang học (chưa từng nhớ được: reps = 0) trả lời sai không bị trừ ease, không tính là quên (lapse):
     sai khi mới gặp hoặc khi làm lại trong cùng phiên là chuyện bình thường.
   - Quên một thẻ đã nhớ (reps > 0): trừ ease, và khi nhớ lại thì giữ ~25% khoảng cách cũ (không về hẳn 1 ngày).
   - Trả lời đúng một thẻ quá hạn: tính khoảng cách từ số ngày thực sự đã nhớ được (không chỉ khoảng đã hẹn).
   - Tốt (Good) cộng nhẹ ease khi ease < 2.5 (SM-2 gốc giữ nguyên, nên ease chỉ giảm dần).
   - Khoảng ≥ 7 ngày được xê dịch ±5% (cố định theo thẻ và ngày) để các thẻ học cùng ngày không dồn vào một ngày.
   - Có ngày thi: hẹn ôn không muộn hơn ngày trước ngày thi, để mọi thẻ được ôn lại trước khi thi. Chỉ dời ngày đến
     hạn, không đổi khoảng cách (ivl); lần ôn sớm đó trả lời đúng thì giữ nguyên ivl, không tăng mà cũng không mất. */
const daysBetween = (a, b) => Math.max(0, Math.round((startOfDay(b) - startOfDay(a)) / DAY));
// Số giả ngẫu nhiên 0–1 cố định theo chuỗi (FNV-1a + bước trộn cuối của MurmurHash3, để các chuỗi gần giống nhau như
// "q:d1-1", "q:d1-2" vẫn cho kết quả rải đều)
const hashStr = s => {
  let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};
// Số ngày học từ hôm nay đến ngày thi (null nếu chưa đặt hoặc đã qua). Tính theo ngày học (chuyển lúc 04:00) giống
// lịch ôn: học lúc 1 giờ sáng vẫn thuộc ngày hôm trước.
function daysToExam(now = Date.now()) {
  const ed = typeof S !== 'undefined' && S.settings && S.settings.examDate;
  if (!ed) return null;
  const n = Math.round((new Date(ed + 'T00:00').getTime() + ROLL_H * 3600e3 - startOfDay(now)) / DAY);
  return n > 0 ? n : null;
}
// Đợt ôn cuối trước kỳ thi được rải đều trên FINAL_DAYS ngày cuối (không dồn hết vào ngày trước kỳ thi)
const FINAL_DAYS = 7;
function nextCard(c, g, now = Date.now(), id = '') {
  c = c ? { ...c } : { ef: 2.5, reps: 0, ivl: 0, lapses: 0 };
  if (g === 1) {
    if (c.reps > 0) {   // quên một thẻ đã nhớ
      c.lapses = (c.lapses || 0) + 1;
      c.ef = Math.max(1.3, c.ef - 0.2);
      // giữ ~25% khoảng đã thực sự nhớ được (thẻ bị dời sớm vì ngày thi: tính theo số ngày đã qua, không theo ivl)
      const held = c.last ? daysBetween(c.last, now) : c.ivl;
      c.post = Math.max(1, Math.round((c.early ? Math.min(c.ivl, held) : c.ivl) * 0.25));
    }
    c.reps = 0; c.ivl = 0;
    c.due = now + 10 * MIN;
  } else {
    const wasReview = c.reps > 0;
    // Số ngày thực sự đã nhớ: khi trả lời trễ hơn hẹn, dùng số ngày đó (Khó thì không thưởng phần trễ)
    const held = c.last ? daysBetween(c.last, now) : 0;
    const base = g === 2 ? c.ivl : Math.max(c.ivl, held);
    // Ôn sớm hơn khoảng đã hẹn vì bị dời lên trước ngày thi: giữ nguyên khoảng cách và ease
    const keep = c.reps > 0 && c.early && held < c.ivl;
    // mức sàn: khoảng cách sau khi trả lời đúng không bao giờ ngắn hơn mức này (kể cả sau khi xê dịch ±5%)
    let floor = c.ivl;
    if (keep) { /* c.ivl giữ nguyên */ }
    else if (c.reps === 0) { c.ivl = floor = Math.max(g === 4 ? 3 : 1, c.post || 0); delete c.post; }
    // Không để khoảng cách ngắn lại khi trả lời đúng: Khó ≥ khoảng hiện tại, Tốt/Dễ > khoảng hiện tại
    // (ví dụ Dễ → 3 ngày rồi Khó → vẫn 3 ngày, không tụt về 2).
    else if (c.reps === 1) { floor = g === 2 ? c.ivl : c.ivl + 1; c.ivl = Math.max(g === 2 ? base : base + 1, g === 2 ? 2 : g === 3 ? 4 : 7); }
    else { floor = c.ivl + 1; c.ivl = Math.max(floor, Math.round(base * (g === 2 ? 1.2 : g === 3 ? c.ef : c.ef * 1.3))); }
    if (wasReview && !keep) c.ef = Math.max(1.3, g === 2 ? c.ef - 0.14 : g === 4 ? c.ef + 0.1 : c.ef < 2.5 ? Math.min(2.5, c.ef + 0.05) : c.ef);
    if (c.ivl >= 7 && !keep) c.ivl = Math.max(7, floor, Math.round(c.ivl * (0.95 + 0.1 * hashStr(id + ymd(studyDate(now))))));
    // Có ngày thi: hẹn không muộn hơn một ngày trong FINAL_DAYS ngày cuối (chọn cố định theo thẻ), để đợt ôn cuối
    // được rải đều thay vì dồn cả bộ thẻ vào ngày trước kỳ thi.
    const left = daysToExam(now);
    const last = left && left > 1 ? left - 1 - Math.floor(hashStr('final:' + id) * Math.min(FINAL_DAYS, left - 1)) : null;
    const wait = last ? Math.min(c.ivl, Math.max(1, last)) : c.ivl;
    if (wait < c.ivl) c.early = 1; else delete c.early;   // early: ngày ôn bị dời lên trước ngày thi
    c.reps++;
    c.due = startOfDay(now) + wait * DAY;
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
// redo = { prev }: chấm lại thẻ vừa chấm (ví dụ câu đúng đã được tự chấm "Tốt", người học bấm Khó/Dễ):
// tính lại từ trạng thái trước đó, không đếm thêm lượt học / thẻ mới.
function grade(id, g, redo) {
  if (!ITEM_BY.has(id)) return;   // chỉ thẻ thuộc ITEMS; câu kho thi thử không bao giờ vào lịch
  const free = !!(curSession && curSession.free);
  const dk = free ? S.free : S.cards;
  const prev = redo ? redo.prev : dk[id];
  dk[id] = nextCard(prev, g, Date.now(), id);
  if (redo) { const l = S.log[S.log.length - 1]; if (l && l[1] === id) l[2] = g; save(); return; }
  if (!free && !prev && curSession && curSession.review) {
    if (S.newLog.date !== today()) S.newLog = { date: today(), count: 0 };
    S.newLog.count++;
  }
  // Nhật ký ôn (thời điểm, thẻ, điểm, lịch): dữ liệu cho việc tinh chỉnh lịch ôn sau này (ví dụ FSRS)
  S.log.push([Date.now(), id, g, free ? 1 : 0]);
  if (S.log.length > LOG_MAX) S.log.splice(0, S.log.length - LOG_MAX);
  logActivity();
  save();
}
// Lượt học trong ngày (dùng cho chuỗi ngày liên tiếp): mỗi thẻ ôn, bài đánh dấu đã học, câu trong đề thi thử
const logActivity = (n = 1) => { S.activity[today()] = (S.activity[today()] || 0) + n; };
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
// Thống kê câu hỏi: tổng số lượt (a), số lượt đúng (c) và kết quả 3 lần gần nhất (r, 1 = đúng) để đánh giá theo hiện tại.
// recent = false: không đưa vào r (lần làm lại ngay sau khi sai, khi đáp án vẫn còn nhớ, không cho biết đã nắm được).
function recordAnswer(qid, ok, stats = S.stats, recent = true) {
  const s = stats[qid] || (stats[qid] = { a: 0, c: 0, r: [] });
  s.a++; if (ok) s.c++;
  if (recent) s.r = [...(s.r || []), ok ? 1 : 0].slice(-RECENT);
}
// Thẻ đang ở bước học lại ngay sau một lần sai (hẹn 10 phút)
const isRelearn = c => !!c && c.reps === 0 && c.ivl === 0 && !!c.last;
// Tỷ lệ đúng gần đây của một câu: 3 lần gần nhất (dữ liệu cũ chưa có r thì dùng tổng)
const recentOf = s => s.r && s.r.length ? { a: s.r.length, c: s.r.reduce((x, y) => x + y, 0) } : { a: s.a, c: s.c };
// Câu yếu: lần gần nhất sai, hoặc đúng dưới 2 trong 3 lần gần nhất
const isWeakStat = s => { if (!s || !s.a) return false; if (!s.r || !s.r.length) return s.c / s.a < 0.7; const r = recentOf(s); return !s.r[s.r.length - 1] || (r.a >= 3 && r.c < 2); };
const isDue = id => S.cards[id] && S.cards[id].due <= Date.now();
// Đến hạn sớm trước; cùng ngày thì thẻ yếu trước (quên nhiều lần, ease thấp), để dừng giữa chừng vẫn đã ôn thẻ khó
const dayOf = c => startOfDay(c.due);
const dueItems = () => ITEMS.filter(i => isDue(i.id)).sort((a, b) => { const x = S.cards[a.id], y = S.cards[b.id];
  return dayOf(x) - dayOf(y) || (y.lapses || 0) - (x.lapses || 0) || x.ef - y.ef || x.due - y.due; });
const newLeft = () => Math.max(0, S.settings.newPerDay - (S.newLog.date === today() ? S.newLog.count : 0));
/* Thẻ mới tiếp theo:
   - Câu hỏi được ưu tiên hơn thẻ từ vựng/dịch vụ (mẫu q, q, từ vựng, q, q, dịch vụ).
   - Câu hỏi mới chia theo tỷ trọng domain trong đề thật (domain 3 = 34% có nhiều câu mới hơn domain 4 = 12%); trong
     một domain, task đang yếu được ưu tiên và câu của bài học đã học xong được ưu tiên gấp 3.
   - Câu cùng task không đứng gần nhau (xem spaceOut).
   - Thứ tự câu hỏi được tính một lần mỗi ngày (và khi đánh dấu thêm bài đã học), nên mở phiên nhiều lần trong ngày
     vẫn đi tiếp đúng thứ tự; mẫu q/q/từ vựng/q/q/dịch vụ tiếp tục từ số thẻ mới đã học hôm nay. */
let newOrder = { key: '', ids: [] };
function newItems(n) {
  const fresh = ITEMS.filter(i => !S.cards[i.id]);
  const key = today() + '|' + Object.keys(S.done || {}).length;
  if (newOrder.key !== key) newOrder = { key, ids: rankNewQuestions(fresh.filter(i => i.type === 'q')).map(i => i.id) };
  const qs = newOrder.ids.filter(id => !S.cards[id]).map(id => ITEM_BY.get(id));
  const known = new Set(qs.map(i => i.id));
  qs.push(...rankNewQuestions(fresh.filter(i => i.type === 'q' && !known.has(i.id))));   // (an toàn: câu chưa có trong thứ tự đã lưu)
  const pools = { q: qs, v: fresh.filter(i => i.type === 'v'), s: fresh.filter(i => i.type === 's') };
  const PATTERN = ['q', 'q', 'v', 'q', 'q', 's'];
  const out = []; let k = S.newLog.date === today() ? S.newLog.count : 0;
  while (out.length < n && (pools.q.length || pools.v.length || pools.s.length)) {
    const p = pools[PATTERN[k % PATTERN.length]]; if (p.length) out.push(p.shift()); k++;
  }
  return out;
}
function rankNewQuestions(items) {
  if (!items.length) return items;
  const mastery = taskMastery();
  // câu thuộc một bài đã học xong (một câu có thể nằm trong quiz của nhiều bài)
  const inDone = new Set(); (D.course || []).forEach(l => { if (S.done[l.id]) (l.qids || []).forEach(q => inDone.add(q)); });
  const day = today();
  // Trong mỗi domain: chọn ngẫu nhiên có trọng số (Efraimidis–Spirakis, khóa = u^(1/w), u cố định theo thẻ và ngày)
  const byDom = new Map();
  items.forEach(i => {
    const m = mastery[i.ref.t];
    const w = (1.5 - (m == null ? 0.5 : m)) * (inDone.has(i.ref.id) ? 3 : 1);
    if (!byDom.has(i.d)) byDom.set(i.d, []);
    byDom.get(i.d).push({ i, k: Math.pow(Math.max(1e-9, hashStr(i.id + day)), 1 / w) });
  });
  byDom.forEach(l => l.sort((a, b) => b.k - a.k));
  // Giữa các domain: lần lượt lấy domain đang "thiếu" nhất so với tỷ trọng đề thật
  // took: số câu mỗi domain đã đưa vào học (tính cả các ngày trước), để hạn mức nhỏ mỗi ngày vẫn chia đúng tỷ trọng
  const weight = d => (dom(d) || {}).weight || 25, took = {}, out = [];
  ITEMS.forEach(i => { if (i.type === 'q' && S.cards[i.id]) took[i.d] = (took[i.d] || 0) + 1; });
  while (out.length < items.length) {
    let best = null;
    byDom.forEach((l, d) => { if (l.length && (best === null || ((took[d] || 0) + 1) / weight(d) < ((took[best] || 0) + 1) / weight(best))) best = d; });
    out.push(byDom.get(best).shift().i); took[best] = (took[best] || 0) + 1;
  }
  return spaceOut(out);
}
// Xếp lại một danh sách thẻ để hai câu cùng task (thường giống nhau, có khi cùng đáp án) cách nhau ít nhất GAP thẻ,
// giữ thứ tự gốc nhiều nhất có thể.
const GAP = 3;
const spaceKey = i => i.type === 'q' && i.ref.t ? 't' + i.ref.t : i.id;
function spaceOut(items) {
  const rest = items.slice(), out = [];
  while (rest.length) {
    const recent = out.slice(-GAP).map(spaceKey);
    let j = rest.findIndex(i => !recent.includes(spaceKey(i)));
    if (j < 0) j = 0;
    out.push(rest.splice(j, 1)[0]);
  }
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
