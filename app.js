(() => {
  'use strict';
  const D = window.CLF;

  /* ───────── Task statements (Exam Guide CLF-C02) + gắn nhãn câu hỏi ─────────
     Tên task nằm trong i18n/<lang>/ui.js (khóa 'task.<id>'). */
  const TASKS = Object.fromEntries(['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4',
    '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '4.1', '4.2', '4.3'].map(k => [k, true]));
  (() => {
    const tags = window.CLF_TAGS || {};
    const lessons = new Map((D.course || []).map(l => [l.id, l]));
    [...D.questions, ...(D.examPool || [])].forEach(q => {
      const tg = tags[q.id]; if (!tg) return;
      if (TASKS[tg[0]]) q.t = tg[0];
      const l = !String(q.id).startsWith('x') && tg[1] && lessons.get(tg[1]);
      if (l) { l.qids = l.qids || []; if (!l.qids.includes(q.id)) l.qids.push(q.id); }
    });
  })();
  const KEY = 'clf-c02-study-v1';
  const MIN = 60e3, DAY = 864e5;
  const $app = document.getElementById('app');
  const tip = document.getElementById('tip');

  /* ───────── State (localStorage) ───────── */
  const DEFAULTS = {
    cards: {},          // id → trạng thái SRS (lịch chính: Ôn hôm nay, Luyện tập, quiz bài học)
    free: {},           // id → trạng thái SRS của "Luyện tập tự do" (lịch riêng, tách hẳn khỏi cards)
    stats: {},          // questionId → { a: số lần trả lời, c: số lần đúng }
    settings: { ui: 'vi', lang: 'en-first', newPerDay: 15, kw: true, examDate: '', esl: false },
    newLog: { date: '', count: 0 },
    activity: {},       // 'YYYY-MM-DD' → số lượt ôn
    done: {},           // lessonId → thời điểm đánh dấu đã học
    examSeen: {},       // questionId → số lần xuất hiện trong thi thử
    examStats: {},      // questionId (kho thi thử) → { a, c }
    exam: null,         // bài thi thử đang làm dở
    exams: []           // lịch sử thi thử (mới nhất trước)
  };
  const clone = o => JSON.parse(JSON.stringify(o));
  const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const num = (v, d = 0) => { const n = Number(v); return Number.isFinite(n) ? n : d; };
  const LANGS = ['bi', 'en-first', 'en-only'];   // chế độ song ngữ (chỉ bản tiếng Việt)
  const UI_LANGS = ['vi', 'en', 'ja'];           // ngôn ngữ giao diện + nội dung giải thích
  /* Chuẩn hóa dữ liệu (từ localStorage hoặc file nhập): mỗi khóa đúng kiểu, số là Number, sai thì về mặc định */
  function normalize(s) {
    if (!isObj(s)) s = {};
    const out = clone(DEFAULTS);
    const objMap = (v, f) => { const o = {}; if (isObj(v)) Object.keys(v).forEach(k => { const x = f(v[k]); if (x !== undefined) o[k] = x; }); return o; };
    const ac = v => isObj(v) ? { a: num(v.a), c: num(v.c) } : undefined;
    // Câu của kho thi thử không bao giờ được nằm trong lịch SRS (kể cả khi file nhập có chứa)
    const poolKeys = new Set((D.examPool || []).map(q => 'q:' + q.id));
    const cardMap = v => {
      const o = objMap(v, c => {
        if (!isObj(c)) return undefined;
        return { ...c, ef: Math.max(1.3, num(c.ef, 2.5)), reps: num(c.reps), ivl: num(c.ivl), lapses: num(c.lapses), due: num(c.due, Date.now()), last: num(c.last) };
      });
      Object.keys(o).forEach(k => { if (poolKeys.has(k)) delete o[k]; });
      return o;
    };
    out.cards = cardMap(s.cards);
    out.free = cardMap(s.free);   // dữ liệu cũ chưa có khóa này → {}
    out.stats = objMap(s.stats, ac);
    out.examStats = objMap(s.examStats, ac);
    out.activity = objMap(s.activity, v => num(v));
    out.examSeen = objMap(s.examSeen, v => num(v));
    out.done = objMap(s.done, v => num(v, Date.now()));
    const st = isObj(s.settings) ? s.settings : {};
    const npd = parseInt(st.newPerDay, 10);
    out.settings = {
      ...out.settings, ...st,
      ui: UI_LANGS.includes(st.ui) ? st.ui : out.settings.ui,
      lang: LANGS.includes(st.lang) ? st.lang : out.settings.lang,
      newPerDay: Number.isFinite(npd) ? Math.max(0, Math.min(100, npd)) : out.settings.newPerDay,
      kw: st.kw === undefined ? out.settings.kw : !!st.kw,
      esl: !!st.esl,
      examDate: typeof st.examDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(st.examDate) ? st.examDate : ''
    };
    if (isObj(s.newLog) && typeof s.newLog.date === 'string') out.newLog = { date: s.newLog.date, count: num(s.newLog.count) };
    const ids = v => Array.isArray(v) ? v.filter(x => typeof x === 'string') : [];
    const ansMap = v => objMap(v, a => Array.isArray(a) ? a.map(Number).filter(Number.isInteger) : undefined);
    const ordMap = v => objMap(v, a => Array.isArray(a) ? a.map(Number).filter(Number.isInteger) : undefined);
    out.exams = (Array.isArray(s.exams) ? s.exams : []).filter(isObj).map(r => {
      const n = num(r.n);
      if (!(n > 0)) return null;
      return {
        ...r, date: num(r.date), ids: ids(r.ids), ans: ansMap(r.ans), order: ordMap(r.order), flag: ids(r.flag),
        correct: num(r.correct), n, score: num(r.score), used: num(r.used), auto: !!r.auto,
        fresh: r.fresh == null ? null : num(r.fresh),
        per: objMap(r.per, p => isObj(p) && num(p.t) > 0 ? { c: num(p.c), t: num(p.t) } : undefined)
      };
    }).filter(Boolean).slice(0, 20);
    if (isObj(s.exam) && Array.isArray(s.exam.ids)) {
      const E = s.exam;
      out.exam = { ids: ids(E.ids), order: ordMap(E.order), ans: ansMap(E.ans), flag: ids(E.flag),
        cur: Math.max(0, Math.floor(num(E.cur))), start: num(E.start, Date.now()), dur: num(E.dur, 90 * MIN) };
    }
    return out;
  }
  let S = load();
  function load() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { /* ignore */ }
    return normalize(s);
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
    try { updateBadge(); } catch (e) { /* ignore */ }
  }

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
  let onKey = null;
  document.addEventListener('keydown', e => {
    if (onKey && !e.target.matches('input, textarea, select') && !e.metaKey && !e.ctrlKey && !e.altKey) onKey(e);
  });

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

  /* ───────── Grade buttons ───────── */
  const GL = { 1: ['grade.again', 'g-again'], 2: ['grade.hard', ''], 3: ['grade.good', ''], 4: ['grade.easy', 'g-easy'] };
  const gradeBtns = (id, set) => `<div class="grades ${set.length === 3 ? 'g3' : ''}">${set.map(g =>
    `<button class="btn ${GL[g][1]}" data-g="${g}">${t(GL[g][0])}<small>${fmtIvl(nextCard(deck()[id], g))}</small></button>`).join('')}</div>`;

  /* ───────── Session ───────── */
  function runSession(items, title, opt = {}) {
    const st = { queue: items.filter(Boolean), i: 0, right: 0, wrong: 0, again: {}, retry: [], shown: 0 };
    curSession = opt;
    const dk = () => deckOf(opt);
    next();
    function next() {
      // Chốt chặn chung: không bao giờ hiện thẻ đã học mà chưa đến hạn (ví dụ vừa được chấm ở tab khác)
      while (st.i < st.queue.length && !availIn(dk(), st.queue[st.i].id)) st.queue.splice(st.i, 1);
      if (st.i >= st.queue.length) {
        // Thẻ chấm "Lại" hẹn 10 phút: chỉ quay lại trong phiên này nếu lúc hết hàng đợi nó đã đến hạn
        const back = st.retry.filter(x => availIn(dk(), x.id));
        if (!back.length) return finish();
        st.retry = st.retry.filter(x => !back.includes(x));
        st.queue.push(...back);
      }
      const it = st.queue[st.i];
      st.shown++;
      const header = `<div class="progress">${esc(title)} · ${st.i + 1}/${st.queue.length}</div>`;
      const done = (g, ok) => {
        if (ok === true) st.right++;
        if (ok === false) st.wrong++;
        if (g === 1 && (st.again[it.id] || 0) < 2) { st.again[it.id] = (st.again[it.id] || 0) + 1; if (!st.retry.includes(it)) st.retry.push(it); }
        st.i++; next();
      };
      if (opt.read && it.type === 'q') renderRead(it, header, done);
      else (it.type === 'q' ? renderQuestion : renderFlash)(it, header, done);
      window.scrollTo(0, 0);
    }
    function finish() {
      onKey = null; curSession = null;
      const ans = st.right + st.wrong;
      $app.innerHTML = `<div class="card" style="text-align:center">
        <h1>${t('session.done', { title: esc(title) })}</h1>
        <p>${ans ? t('session.summaryQ', { n: st.shown, right: st.right, wrong: st.wrong }) : t('session.summary', { n: st.shown })}</p>
        <p class="muted small">${t('session.note')}${opt.free ? ' ' + t('session.freeNote') : ''}</p>
        <div class="row" style="justify-content:center"><a class="btn primary" href="#/">${t('btn.home')}</a>${opt.free
          ? `<a class="btn" href="#/review/free">${t('session.freeMore')}</a>`
          : `<a class="btn" href="#/practice">${t('btn.morePractice')}</a><a class="btn" href="#/review/free">${t('review.freePractice')}</a>`}</div></div>`;
    }
  }

  function renderQuestion(it, header, done) {
    const q = it.ref, multi = q.ans.length > 1, need = q.ans.length;
    const order = shuffle(q.opts.map((_, i) => i));
    const lang = qLang(), isNew = !deck()[it.id];
    let showVi = lang === 'bi', answered = false, ok = false;
    const sel = new Set();
    draw();

    function draw() {
      const viOk = VI && (lang !== 'en-only' || answered);
      const vi = showVi && viOk;
      const opts = order.map((oi, k) => {
        const o = q.opts[oi], right = q.ans.includes(oi);
        let cls = 'opt' + (sel.has(oi) ? ' sel' : '');
        if (answered) cls += right ? ' right' : sel.has(oi) ? ' wrong' : '';
        const mark = answered ? (right ? '✓' : sel.has(oi) ? '✗' : '') : String.fromCharCode(65 + k);
        return `<li class="${cls}" data-i="${oi}"><span class="mark">${mark}</span><div>${hl(qOpt(q, oi))}
          ${vi ? `<div class="vi">${esc(o[1])}</div>` : ''}${answered ? `<div class="why">${esc(qWhy(q, oi))}</div>` : ''}</div></li>`;
      }).join('');
      const viBtn = (lang !== 'bi' && viOk) ? `<button class="btn" data-a="vi">${t(showVi ? 'q.hideVi' : 'q.showVi')}</button>` : '';
      let bottom;
      if (!answered) {
        bottom = `<div class="row"><button class="btn primary" data-a="check" ${sel.size === need ? '' : 'disabled'}>${t('q.check')}</button>${viBtn}
          <span class="muted small">${t('q.keys', { last: String.fromCharCode(64 + order.length) })}</span></div>`;
      } else if (ok) {
        bottom = `<div class="result ok">${t('q.correct')} ${esc(qExp(q))}</div>
          <div class="muted small">${t('q.howWasIt')}</div>${gradeBtns(it.id, [2, 3, 4])}<div class="row" style="margin-top:10px">${viBtn}</div>`;
      } else {
        bottom = `<div class="result no">${t('q.wrong')} ${esc(qExp(q))}<div class="small muted" style="margin-top:4px">${t('q.again10')}</div></div>
          <div class="row"><button class="btn primary" data-a="next">${t('q.continue')}</button>${viBtn}</div>`;
      }
      $app.innerHTML = `${header}<div class="card ${multi ? 'multi' : ''} ${answered ? 'done' : ''}">
        <div class="qmeta"><span>${t('common.domain', { d: q.d })} · ${esc(domName(q.d))}${q.t ? ` · ${t('common.task', { t: q.t })}` : ''}</span>
          <span>${q.lvl === 2 ? `<span class="tag">${t('tag.hard')}</span> ` : ''}${isNew ? `<span class="tag">${t('tag.new')}</span> ` : ''}${multi ? `<span class="tag">${t('tag.choose', { n: need })}</span>` : ''}</span></div>
        <div class="qtext">${hl(qStem(q))}</div>${vi ? `<div class="vi">${esc(q.vi)}</div>` : ''}
        <ul class="opts">${opts}</ul>${bottom}</div>`;
    }
    function toggle(oi) {
      if (answered) return;
      if (multi) { if (sel.has(oi)) sel.delete(oi); else if (sel.size < need) sel.add(oi); }
      else { sel.clear(); sel.add(oi); }
      draw();
    }
    function check() {
      if (answered || sel.size !== need) return;
      answered = true;
      ok = q.ans.every(i => sel.has(i));
      recordAnswer(q.id, ok);
      if (!ok) grade(it.id, 1); else save();
      draw();
    }
    $app.onclick = e => {
      if (e.target.closest('.kw')) return;
      const li = e.target.closest('.opt'); if (li) return toggle(+li.dataset.i);
      const b = e.target.closest('[data-a],[data-g]'); if (!b) return;
      if (b.dataset.g) { grade(it.id, +b.dataset.g); return done(+b.dataset.g, true); }
      if (b.dataset.a === 'check') check();
      if (b.dataset.a === 'next') done(1, false);
      if (b.dataset.a === 'vi') { showVi = !showVi; draw(); }
    };
    onKey = e => {
      const k = e.key.toUpperCase();
      if (!answered && k.length === 1 && k >= 'A' && k < String.fromCharCode(65 + order.length)) { toggle(order[k.charCodeAt(0) - 65]); e.preventDefault(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (!answered) check();
        else if (ok) { grade(it.id, 3); done(3, true); }
        else done(1, false);
      }
    };
  }

  function renderFlash(it, header, done) {
    let flipped = false;
    const r = it.ref, isV = it.type === 'v', isNew = !deck()[it.id];
    const example = isV && !qTranslated() ? D.questions.find(q => q.en.toLowerCase().includes(r.term.toLowerCase())) : null;
    draw();
    function draw() {
      const back = isV
        ? `<div><b>${esc(gMeaning(r))}</b></div>${gHint(r) ? `<div class="muted">💡 ${esc(gHint(r))}</div>` : ''}
           ${example ? `<div class="small muted" style="margin-top:12px;text-align:left">${t('flash.example')} <i>${hl(example.en)}</i></div>` : ''}`
        : `<div>${esc(svcDesc(r))}</div>${svcConfuse(r) ? `<div class="muted small" style="margin-top:8px">${t('flash.confuse')} ${esc(svcConfuse(r))}</div>` : ''}`;
      $app.innerHTML = `${header}<div class="card flash">
        <div class="qmeta"><span>${isV ? t('flash.vocab') : t('flash.service', { d: r.d })}</span><span>${isNew ? `<span class="tag">${t('tag.new')}</span>` : ''}</span></div>
        <div class="front">${esc(isV ? r.term : r.name)}</div>
        <p class="muted small">${isV ? t('flash.askVocab') : t('flash.askService')}</p>
        ${flipped ? `<div class="back">${back}</div>${gradeBtns(it.id, [1, 2, 3, 4])}<p class="muted small">${t('flash.keys')}</p>`
                  : `<button class="btn primary" data-a="flip">${t('flash.flip')}</button>`}
      </div>`;
    }
    const pick = g => { grade(it.id, g); done(g, null); };
    $app.onclick = e => {
      const b = e.target.closest('[data-a],[data-g]'); if (!b) return;
      if (b.dataset.a === 'flip') { flipped = true; draw(); }
      if (b.dataset.g) pick(+b.dataset.g);
    };
    onKey = e => {
      if (!flipped && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); flipped = true; draw(); }
      else if (flipped && '1234'.includes(e.key)) pick(+e.key);
      else if (flipped && e.key === 'Enter') pick(3);
    };
  }

  /* ───────── Views ───────── */
  function domStats(d) {
    const qs = D.questions.filter(q => q.d === d);
    let a = 0, c = 0, seen = 0;
    qs.forEach(q => { const s = S.stats[q.id]; if (s) { a += s.a; c += s.c; } if (S.cards['q:' + q.id]) seen++; });
    return { total: qs.length, seen, acc: a ? Math.round(c / a * 100) : null };
  }

  function viewHome() {
    const due = dueItems().length;
    const nl = Math.min(newLeft(), ITEMS.filter(i => !S.cards[i.id]).length);
    const learned = Object.keys(S.cards).length;
    const ex = S.settings.examDate ? Math.round((new Date(S.settings.examDate + 'T00:00').getTime() - calStart(Date.now())) / DAY) : null;
    const domains = D.domains.map(d => {
      const s = domStats(d.id);
      return `<div class="card dom"><div class="row" style="justify-content:space-between"><h3>D${d.id}. ${esc(domName(d))}</h3><span class="tag">${t('home.weight', { w: d.weight })}</span></div>
        <div class="muted small">${esc(d.en)}</div>
        <div class="bar"><i style="width:${s.seen / s.total * 100}%"></i></div>
        <div class="small">${t('home.domProgress', { seen: s.seen, total: s.total, acc: s.acc === null ? '—' : s.acc + '%' })}</div>
        <div class="row"><a class="btn" href="#/learn/${d.id}">${t('nav.learn')}</a><a class="btn" href="#/practice/${d.id}">${t('nav.practice')}</a></div></div>`;
    }).join('');
    $app.innerHTML = `
      <h1>${t('home.title')}</h1>
      <div class="grid">
        <div class="card stat"><b>${due}</b><span class="muted small">${t('home.due')}</span></div>
        <div class="card stat"><b>${nl}</b><span class="muted small">${t('home.new')}</span></div>
        <div class="card stat"><b>${learned}/${ITEMS.length}</b><span class="muted small">${t('home.learned')}</span></div>
        <div class="card stat"><b>🔥 ${streak()}</b><span class="muted small">${t('home.streak')}</span></div>
        ${ex !== null ? `<div class="card stat"><b>${ex >= 0 ? ex : '—'}</b><span class="muted small">${t('home.daysToExam')}</span></div>` : ''}
        ${(S.exams || []).length ? `<a class="card stat" style="text-decoration:none" href="#/exam/r0"><b class="v-${verdict(pct(S.exams[0]))[0]}">${pct(S.exams[0])}%</b><span class="muted small">${t('home.lastExam', { ok: readiness().ok })}</span></a>` : ''}
        ${S.exam ? `<a class="card stat" style="text-decoration:none" href="#/exam"><b>⏱</b><span class="muted small">${t('home.examInProgress')}</span></a>` : ''}
      </div>
      <div class="card row" style="justify-content:space-between">
        <div>${due + nl ? t('home.todayN', { n: due + nl }) : t('home.todayDone')}</div>
        <a class="btn primary" href="#/review">${due + nl ? t('home.startReview') : t('home.viewSchedule')}</a>
      </div>
      ${(() => {
        const nl = nextLesson(); if (!COURSE.length) return '';
        const dn = COURSE.filter(l => isDone(l.id)).length;
        return `<div class="card row" style="justify-content:space-between">
          <div>${t('home.course', { done: dn, total: COURSE.length })}${nl ? `<div class="small muted">${t('home.next', { id: esc(nl.id), title: esc(les(nl).title) })}</div>` : ''}</div>
          <a class="btn" href="${nl ? '#/lesson/' + esc(nl.id) : '#/learn'}">${nl ? (dn ? t('learn.continue') : t('learn.start')) : t('learn.review')}</a></div>`;
      })()}
      ${(() => {
        const ts = taskStats();
        const weak = Object.keys(TASKS).map(k => ({ t: k, ...ts[k] })).filter(r => r.a >= 5).map(r => ({ ...r, p: Math.round(r.c / r.a * 100) }))
          .filter(r => r.p < 80).sort((a, b) => a.p - b.p).slice(0, 3);
        return weak.length ? `<div class="card"><b>${t('home.weakTasks')}</b><ul class="small" style="margin:6px 0 0">${weak.map(r =>
          `<li>${t('common.task', { t: r.t })} ${esc(taskName(r.t))}: <b class="${r.p >= 70 ? 'v-warn' : 'v-no'}">${r.p}%</b> · <a href="#/practice/t-${r.t}">${t('home.practiceNow')}</a></li>`).join('')}</ul>
          <div class="small" style="margin-top:6px"><a href="#/practice">${t('home.fullStats')}</a></div></div>` : '';
      })()}
      <h2>${t('home.byDomain')}</h2>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${domains}</div>
      <h2>${t('home.howto')}</h2>
      <div class="card small">
        <p>${t('home.howto1')}</p>
        <p>${t('home.howto2')}</p>
        ${VI ? `<p>${t('home.howtoMode')}</p>` : ''}
        <p>${t('home.howto3')}</p>
        <p class="muted">${t('home.howto4')}</p>
      </div>`;
  }

  /* Màn hình "không có gì để luyện lúc này": báo giờ đến hạn gần nhất của tập thẻ + lối sang Luyện tập tự do */
  function emptyState(title, ids, opt = {}, back = '#/practice', backLabel = t('common.back')) {
    const nd = nextDueIn(deckOf(opt), ids);
    $app.innerHTML = `<div class="card empty-state"><h1>${t('empty.title')}</h1>
      <p>${t(opt.free ? 'empty.bodyFree' : 'empty.body', { title: esc(title) })}</p>
      ${nd ? `<p>${t('empty.nextDue', { when: fmtWhen(nd) })}</p>` : ''}
      <div class="row">${opt.free ? `<a class="btn primary" href="#/review">${t('nav.review')}</a>` : `<a class="btn primary" href="#/review/free">${t('review.freePractice')}</a>`}
        <a class="btn" href="${esc(back)}">${esc(backLabel)}</a></div>
      ${opt.free ? '' : `<p class="muted small">${t('empty.freeNote')}</p>`}</div>`;
  }

  function viewReview(arg) {
    // #/review              → phiên Ôn hôm nay (lịch chính)
    // #/review/free         → chọn domain cho Luyện tập tự do
    // #/review/free/<d|all> → phiên Luyện tập tự do (lịch riêng S.free)
    if (arg === 'free') return viewFree(location.hash.split('/')[3]);
    const q = [...dueItems(), ...newItems(newLeft())];
    if (q.length) return runSession(q, t('review.title'), { review: true });
    const nd = nextDueIn(S.cards, Object.keys(S.cards));
    const remainNew = ITEMS.filter(i => !S.cards[i.id]).length;
    $app.innerHTML = `<div class="card" style="text-align:center"><h1>${t('review.done')}</h1>
      <p class="muted">${nd ? t('review.nextDue', { when: fmtWhen(nd) }) : ''}</p>
      <div class="row" style="justify-content:center">
        ${remainNew ? `<button class="btn primary" id="more">${t('review.more10')}</button>` : ''}
        <a class="btn" href="#/review/free">${t('review.freePractice')}</a></div>
      <p class="muted small">${t('review.remaining', { n: remainNew })} ${t('review.freeNote')}</p></div>`;
    const m = document.getElementById('more');
    if (m) m.onclick = () => runSession(newItems(10), t('review.extraTitle'), { review: true });
  }

  /* ───────── Luyện tập tự do: lịch SRS riêng (S.free) ─────────
     Phạm vi: Domain 1–4 = câu hỏi + thẻ dịch vụ của domain đó; "Trộn tất cả" = mọi câu hỏi + dịch vụ + từ vựng đề thi
     (từ vựng không thuộc domain nào nên chỉ có ở "Trộn tất cả"). Câu của kho thi thử không bao giờ có mặt (ITEMS không chứa). */
  const FREE_SCOPES = ['1', '2', '3', '4', 'all'];
  const freeItems = sc => sc === 'all' ? ITEMS : ITEMS.filter(i => i.type !== 'v' && i.d === +sc);
  const freeTitle = sc => t('free.title', { scope: sc === 'all' ? t('practice.mixAll') : t('common.domain', { d: sc }) });
  function viewFree(sc) {
    if (FREE_SCOPES.includes(sc)) {
      const items = freeItems(sc), av = items.filter(i => availIn(S.free, i.id));
      if (!av.length) return emptyState(freeTitle(sc), items.map(i => i.id), { free: true }, '#/review/free', t('free.otherScope'));
      return runSession(shuffle(av), freeTitle(sc), { free: true });
    }
    const card = (sc, head, sub) => {
      const items = freeItems(sc), av = items.filter(i => availIn(S.free, i.id)).length;
      const nd = nextDueIn(S.free, items.map(i => i.id));
      const kinds = [['q', 'free.kindQ'], ['s', 'free.kindS'], ['v', 'free.kindV']]
        .map(([ty, k]) => [items.filter(i => i.type === ty).length, k]).filter(x => x[0]).map(([n, k]) => t(k, { n }));
      return `<a class="card dom" style="text-decoration:none" href="#/review/free/${sc}"><h3>${head}</h3>
        ${sub ? `<span class="muted small">${esc(sub)}</span>` : ''}
        <span class="small">${t('free.avail', { av, total: items.length })}</span>
        <span class="muted small">${kinds.join(' · ')}</span>
        ${nd ? `<span class="muted small">${t('free.nextDue', { when: fmtWhen(nd) })}</span>` : ''}</a>`;
    };
    const ndAll = nextDueIn(S.free, ITEMS.map(i => i.id));
    $app.innerHTML = `<div class="crumb small"><a href="#/review">${t('nav.review')}</a> › ${t('review.freePractice')}</div>
      <h1>${t('review.freePractice')}</h1>
      <p class="muted">${t('free.intro')}</p>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
        ${D.domains.map(d => card(String(d.id), 'D' + d.id + '. ' + esc(domName(d)), '')).join('')}
        ${card('all', '🔀 ' + t('practice.mixAll'), t('free.allSub'))}
      </div>
      <p class="muted small">${ndAll ? t('free.nextDueAll', { when: fmtWhen(ndAll) }) + ' ' : ''}${t('free.scopeNote')}</p>`;
  }

  /* ───────── Luyện tập (lịch chính): chỉ câu mới hoặc đã đến hạn ───────── */
  const weakQs = () => D.questions.filter(q => { const s = S.stats[q.id]; return s && s.c / s.a < 0.7; });
  const readQs = () => qTranslated() ? [] : D.questions.filter(q => q.en.length >= 160);
  function practiceSet(arg) {
    if (arg === 'all') return { qs: D.questions, title: t('practice.all') };
    if (arg === 'hard') return { qs: D.questions.filter(q => q.lvl === 2), title: t('practice.hard') };
    if (arg === 'multi') return { qs: D.questions.filter(q => q.ans.length > 1), title: t('practice.multi') };
    if (arg === 'weak') return { qs: weakQs(), title: t('practice.weak') };
    if (arg === 'read') return { qs: readQs(), title: t('practice.read'), opt: { read: true }, max: 15 };
    if (arg.startsWith('t-')) { const k = arg.slice(2); return { qs: D.questions.filter(q => q.t === k), title: t('common.task', { t: k }) + ' · ' + (TASKS[k] ? taskName(k) : '') }; }
    return { qs: D.questions.filter(q => q.d === +arg), title: t('common.domain', { d: arg }) };
  }
  // Bắt đầu một phiên luyện câu hỏi trên lịch chính: bỏ câu đã học mà chưa đến hạn
  function startPractice(qs, title, opt = {}, back = '#/practice', max = Infinity) {
    const av = availQs(qs);
    if (!av.length) return emptyState(title, qs.map(q => 'q:' + q.id), {}, back);
    runSession(shuffle(av).slice(0, max).map(q => qItem(q.id)), title, opt);
  }

  function viewPractice(arg) {
    if (arg) {
      const p = practiceSet(arg);
      if (!p.qs.length) { $app.innerHTML = `<div class="card">${t('practice.empty')}</div>`; return; }
      return startPractice(p.qs, p.title, p.opt, '#/practice', p.max);
    }
    const cnt = qs => `<b>${availQs(qs).length}/${qs.length}</b>`;
    const set = a => practiceSet(a).qs;
    $app.innerHTML = `<h1>${t('nav.practice')}</h1>
      <p class="muted">${t('practice.intro')}</p>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
      ${D.domains.map(d => { const s = domStats(d.id); return `<a class="card dom" style="text-decoration:none" href="#/practice/${d.id}">
        <h3>D${d.id}. ${esc(domName(d))}</h3><span class="muted small">${t('practice.domLine', { total: cnt(set(String(d.id))), acc: s.acc === null ? '—' : s.acc + '%' })}</span></a>`; }).join('')}
      <a class="card dom" style="text-decoration:none" href="#/practice/all"><h3>🔀 ${t('practice.mixAll')}</h3><span class="muted small">${t('practice.nQuestions', { n: cnt(set('all')) })}</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/weak"><h3>🎯 ${t('practice.weak')}</h3><span class="muted small">${t('practice.weakLine', { n: cnt(set('weak')) })}</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/hard"><h3>🔥 ${t('practice.hard')}</h3><span class="muted small">${t('practice.hardLine', { n: cnt(set('hard')) })}</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/multi"><h3>☑️ ${t('practice.multi')}</h3><span class="muted small">${t('practice.multiLine', { n: cnt(set('multi')) })}</span></a>
      ${qTranslated() ? '' : `<a class="card dom" style="text-decoration:none" href="#/practice/read"><h3>📖 ${t('practice.read')}</h3><span class="muted small">${t('practice.readLine', { n: cnt(set('read')) })}</span></a>`}
      </div>
      <h2>${t('practice.byTask')}</h2>
      <p class="muted small">${t('practice.byTaskNote')}</p>
      ${taskTable()}`;
  }

  /* Thống kê theo task statement: gộp S.stats (luyện tập) + S.examStats (thi thử) */
  function taskStats() {
    const out = {};
    Object.keys(TASKS).forEach(k => { out[k] = { a: 0, c: 0, total: 0 }; });
    D.questions.forEach(q => { if (!q.t) return; out[q.t].total++; const s = S.stats[q.id]; if (s) { out[q.t].a += s.a; out[q.t].c += s.c; } });
    (D.examPool || []).forEach(q => { if (!q.t) return; const s = (S.examStats || {})[q.id]; if (s) { out[q.t].a += s.a; out[q.t].c += s.c; } });
    return out;
  }
  function taskTable() {
    const ts = taskStats(), av = {};
    D.questions.forEach(q => { if (q.t && isAvail('q:' + q.id)) av[q.t] = (av[q.t] || 0) + 1; });
    const rows = Object.keys(TASKS).map(k => ({ t: k, ...ts[k], acc: ts[k].a ? Math.round(ts[k].c / ts[k].a * 100) : null }))
      .sort((x, y) => (x.acc === null) - (y.acc === null) || (x.acc ?? 0) - (y.acc ?? 0) || x.t.localeCompare(y.t));
    return `<div class="card scroll-x"><table class="tasks"><tr><th>${t('task.colTask')}</th><th>${t('task.colTopic')}</th><th>${t('task.colAcc')}</th><th style="width:30%"></th><th></th></tr>
      ${rows.map(r => `<tr><td><b>${r.t}</b></td><td>${esc(taskName(r.t))}</td>
        <td class="${r.acc === null ? 'muted' : r.acc >= 80 ? 'v-ok' : r.acc >= 70 ? 'v-warn' : 'v-no'}"><b>${r.acc === null ? '—' : r.acc + '%'}</b><div class="muted small">${t('task.attempts', { n: r.a })}</div></td>
        <td><div class="bar"><i style="width:${r.acc || 0}%;background:${r.acc === null ? 'var(--line)' : r.acc >= 80 ? 'var(--ok)' : r.acc >= 70 ? '#c98a00' : 'var(--bad)'}"></i></div></td>
        <td>${r.total ? `<a class="btn" href="#/practice/t-${r.t}">${t('task.practiceN', { n: (av[r.t] || 0) + '/' + r.total })}</a>` : ''}</td></tr>`).join('')}</table></div>`;
  }

  /* Chế độ luyện đọc đề: đọc đề tiếng Anh, chạm vào từ khóa quyết định, rồi mới xem lựa chọn */
  function renderRead(it, header, done) {
    const q = it.ref, start = Date.now(), marked = new Set();
    const words = q.en.split(/(\s+)/);
    let tick = null;
    const drawStep1 = () => {
      $app.innerHTML = `${header}<div class="card">
        <div class="qmeta"><span>${t('read.step1')}</span><span id="rtimer" class="timer small">0s</span></div>
        <p class="muted small">${t('read.hint')}</p>
        <div class="qtext read">${words.map((w, i) => /\S/.test(w) ? `<span class="tok ${marked.has(i) ? 'mk' : ''}" data-w="${i}">${esc(w)}</span>` : w).join('')}</div>
        <div class="row" style="margin-top:14px"><button class="btn primary" data-a="reveal">${t('read.reveal')}</button>
          <span class="muted small">${t('read.goal')}</span></div></div>`;
    };
    drawStep1();
    tick = setInterval(() => { const el = document.getElementById('rtimer'); if (!el) return clearInterval(tick); el.textContent = Math.round((Date.now() - start) / 1000) + 's'; }, 1000);
    $app.onclick = e => {
      const tk = e.target.closest('.tok');
      if (tk) { const i = +tk.dataset.w; if (marked.has(i)) marked.delete(i); else marked.add(i); tk.classList.toggle('mk'); return; }
      if (e.target.closest('[data-a="reveal"]')) {
        clearInterval(tick);
        const secs = Math.round((Date.now() - start) / 1000);
        const mine = [...marked].sort((a, b) => a - b).map(i => words[i].replace(/[.,;:?()"]/g, '')).join(', ');
        const kws = [...new Set((q.en.match(KW_RE) || []).map(m => m.toLowerCase().replace(/s$/, '')))]
          .map(k => GMAP.get(k) || GMAP.get(k + 's')).filter(Boolean);
        const box = `<div class="card read-review">
          <div class="small">${t(secs > 80 ? 'read.timeSlow' : 'read.time', { secs })}
            ${t('read.yours', { words: mine ? esc(mine) : t('read.none') })}</div>
          ${kws.length ? `<div class="small" style="margin-top:6px">${t('read.keywords')} ${kws.map(g => `<span class="kw">${esc(g.term)}</span> = ${esc(gMeaning(g))}${gHint(g) ? ` <span class="muted">(${esc(gHint(g))})</span>` : ''}`).join(' · ')}</div>` : ''}
          ${qLang() === 'en-only' ? '' : `<div class="vi" style="margin-top:6px">${esc(q.vi)}</div>`}</div>`;
        renderQuestion(it, header + box, done);
      }
    };
  }

  /* ───────── Khóa học ───────── */
  const MODULES = [{ id: 0, en: 'Start here' }, ...D.domains, { id: 5, en: 'Hands-on labs' }];
  const modTitle = m => m.id === 0 ? t('mod.0') : m.id === 5 ? t('mod.5') : domName(m);
  const lessonNum = l => parseInt(String(l.id).split('-')[1], 10) || 0;
  const COURSE = (D.course || []).slice().sort((a, b) => a.module - b.module || lessonNum(a) - lessonNum(b));
  const isDone = id => !!(S.done && S.done[id]);
  const nextLesson = () => COURSE.find(l => !isDone(l.id));
  const modName = m => m === 0 ? t('mod.short0') : m === 5 ? t('mod.short5') : t('common.domain', { d: m });

  function viewLearn(arg) {
    // #/learn            → lộ trình khóa học
    // #/learn/<d>        → lộ trình, cuộn tới module d
    // #/learn/sum/<d>    → tóm tắt nhanh (bảng ôn tập)
    if (arg === 'sum') { const d = +location.hash.split('/')[3]; return viewSummary(dom(d) && D.lessons && D.lessons[d] ? d : 1); }
    const doneN = COURSE.filter(l => isDone(l.id)).length;
    const nl = nextLesson();
    const tabs = `<div class="tabs"><a class="btn on" href="#/learn">${t('learn.tabCourse')}</a><a class="btn" href="#/learn/sum/1">${t('learn.tabSummary')}</a></div>`;
    if (!COURSE.length) {
      $app.innerHTML = `<h1>${t('nav.learn')}</h1>${tabs}<div class="card">${t('learn.noCourse')}</div>`;
      return;
    }
    const mods = MODULES.map(m => {
      const ls = COURSE.filter(l => l.module === m.id);
      if (!ls.length) return '';
      const dn = ls.filter(l => isDone(l.id)).length;
      return `<section class="module" id="mod-${m.id}">
        <div class="row" style="justify-content:space-between"><h2 style="margin:0">${m.id === 0 ? '🌱' : m.id === 5 ? '🛠️' : 'D' + m.id + '.'} ${esc(modTitle(m))}</h2>
          <span class="muted small">${t('learn.modCount', { done: dn, total: ls.length })}${m.weight ? ` · ${t('learn.examWeight', { w: m.weight })}` : ''}</span></div>
        <ol class="lessons">${ls.map(l => `<li><a class="lrow ${isDone(l.id) ? 'done' : ''}" href="#/lesson/${esc(l.id)}">
          <span class="lnum">${isDone(l.id) ? '✓' : esc(l.id)}</span>
          <span class="ltitle">${esc(les(l).title)}</span><span class="muted small">${l.mins ? t('learn.mins', { n: l.mins }) : ''}</span></a></li>`).join('')}</ol>
        ${m.id === 5 ? `<p class="muted small">${t('learn.labNote')}</p>` : ''}
        ${m.id >= 1 && m.id <= 4 ? `<div class="row small"><a href="#/learn/sum/${m.id}">${t('learn.tabSummary')}</a><a href="#/practice/${m.id}">✍️ ${t('learn.practiceDomain', { d: m.id })}</a></div>` : ''}
      </section>`;
    }).join('');
    $app.innerHTML = `<h1>${t('nav.learn')}</h1>${tabs}
      <div class="card">
        <div class="row" style="justify-content:space-between"><b>${t('learn.progress', { done: doneN, total: COURSE.length })}</b>
          ${nl ? `<a class="btn primary" href="#/lesson/${esc(nl.id)}">${t(doneN ? 'learn.continueLesson' : 'learn.startLesson', { id: esc(nl.id) })}</a>` : `<span>${t('learn.allDone')}</span>`}</div>
        <div class="bar" style="margin-top:10px"><i style="width:${doneN / COURSE.length * 100}%"></i></div>
        <p class="muted small" style="margin-bottom:0">${t('learn.tip')}</p>
      </div>${mods}`;
    if (arg && document.getElementById('mod-' + arg)) document.getElementById('mod-' + arg).scrollIntoView();
  }

  function viewSummary(d) {
    $app.innerHTML = `<h1>${t('nav.learn')}</h1>
      <div class="tabs"><a class="btn" href="#/learn">${t('learn.tabCourse')}</a><a class="btn on" href="#/learn/sum/1">${t('learn.tabSummary')}</a></div>
      <div class="tabs">${D.domains.map(x => `<a class="btn ${x.id === d ? 'on' : ''}" href="#/learn/sum/${x.id}">D${x.id}. ${esc(domName(x))}</a>`).join('')}</div>
      <p class="muted small">${t('sum.note')} ${esc(dom(d).en)} · ${t('learn.examWeight', { w: dom(d).weight })}</p>
      ${quickSum(d).map(l => `<div class="card lesson"><h3>${esc(l.t)}</h3><div class="scroll-x">${l.h}</div></div>`).join('')}
      <a class="btn primary" href="#/practice/${d}">${t('learn.practiceDomain', { d })} →</a>`;
  }

  function viewLesson(id) {
    const i = COURSE.findIndex(l => l.id === id);
    if (!COURSE[i]) { $app.innerHTML = `<div class="card">${t('lesson.notFound')}</div>`; return; }
    const l = les(COURSE[i]);
    const prev = COURSE[i - 1], next = COURSE[i + 1];
    const qs = (l.qids || []).filter(q => QBY.has(q) && qItem(q)).map(q => QBY.get(q));
    const draw = () => {
      const done = isDone(l.id);
      const avail = availQs(qs).length, nd = nextDueIn(S.cards, qs.map(q => 'q:' + q.id));
      $app.innerHTML = `
        <div class="crumb small"><a href="#/learn">${t('nav.learn')}</a> › <a href="#/learn/${l.module}">${modName(l.module)}</a> › ${t('lesson.n', { id: esc(l.id) })}</div>
        <article class="lesson-page">
          <h1>${esc(l.title)}</h1>
          <div class="muted small">${t('lesson.readMins', { n: l.mins || '?' })}${qs.length ? ` · ${t('lesson.nQuestions', { n: qs.length })}` : ''}${done ? ` · <span style="color:var(--ok)">${t('lesson.done')}</span>` : ''}</div>
          ${(l.goals || []).length ? `<div class="box goals"><b>${t('lesson.goals')}</b><ul>${l.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul></div>` : ''}
          <div class="lesson-body">${l.html}</div>
          ${(l.summary || []).length ? `<div class="box summary"><b>${t('lesson.summary')}</b><ul>${l.summary.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
          ${(l.terms || []).length ? `<h3>${t('lesson.terms')}</h3><div class="scroll-x"><table><tr><th>${t('col.term')}</th><th>${t('col.meaning')}</th></tr>
            ${l.terms.map(([en, vi]) => `<tr><td><b>${esc(en)}</b></td><td>${esc(vi)}</td></tr>`).join('')}</table></div>` : ''}
          <div class="card lesson-end">
            <div class="row">
              <button class="btn ${done ? '' : 'primary'}" data-a="done">${done ? t('lesson.unmark') : t('lesson.mark')}</button>
              ${avail ? `<button class="btn ${done ? 'primary' : ''}" data-a="quiz">${t('lesson.quiz', { n: avail === qs.length ? avail : avail + '/' + qs.length })}</button>` : ''}
            </div>
            ${qs.length && avail < qs.length ? `<p class="muted small quiz-note">${avail ? t('lesson.quizLeft', { n: qs.length - avail }) : t('lesson.quizNone', { n: qs.length })}${nd ? ' ' + t('lesson.quizNext', { when: fmtWhen(nd) }) : ''} ${t('lesson.quizFree')}</p>` : ''}
            <div class="row" style="justify-content:space-between;margin-top:12px">
              ${prev ? `<a href="#/lesson/${esc(prev.id)}" class="small">← ${esc(prev.id)}. ${esc(les(prev).title)}</a>` : '<span></span>'}
              ${next ? `<a href="#/lesson/${esc(next.id)}" class="small" style="text-align:right">${esc(next.id)}. ${esc(les(next).title)} →</a>` : ''}
            </div>
          </div>
        </article>`;
    };
    draw();
    $app.onclick = e => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      if (b.dataset.a === 'done') {
        S.done = S.done || {};
        if (S.done[l.id]) delete S.done[l.id]; else { S.done[l.id] = Date.now(); S.activity[today()] = (S.activity[today()] || 0) + 1; }
        save(); draw();
      }
      if (b.dataset.a === 'quiz') startPractice(qs, t('lesson.quizTitle', { id: l.id }), {}, '#/lesson/' + l.id);
    };
  }

  function viewGlossary() {
    $app.innerHTML = `<h1>${t('nav.glossary')}</h1>
      <input type="text" id="q" placeholder="${esc(t('gloss.search'))}" style="width:100%;margin-bottom:12px">
      <div id="gl"></div>`;
    const draw = f => {
      f = f.toLowerCase();
      const m = (...s) => !f || s.join(' ').toLowerCase().includes(f);
      const g = D.glossary.filter(x => m(x.term, gMeaning(x), gHint(x)));
      const s = D.services.filter(x => m(x.name, svcDesc(x), svcConfuse(x)));
      document.getElementById('gl').innerHTML = `
        <h2>${t('gloss.keywords', { n: g.length })}</h2><div class="card scroll-x"><table><tr><th>${t('col.term')}</th><th>${t('col.meaning')}</th><th>${t('col.hint')}</th></tr>
        ${g.map(x => `<tr><td><b>${esc(x.term)}</b></td><td>${esc(gMeaning(x))}</td><td class="muted">${esc(gHint(x) || '')}</td></tr>`).join('')}</table></div>
        <h2>${t('gloss.services', { n: s.length })}</h2><div class="card scroll-x"><table><tr><th>${t('col.service')}</th><th>${t('col.function')}</th><th>${t('col.confuse')}</th></tr>
        ${s.map(x => `<tr><td><b>${esc(x.name)}</b></td><td>${esc(svcDesc(x))}</td><td class="muted">${esc(svcConfuse(x) || '')}</td></tr>`).join('')}</table></div>`;
    };
    draw('');
    document.getElementById('q').oninput = e => draw(e.target.value);
  }

  function viewSettings() {
    const st = S.settings;
    const modes = ['bi', 'en-first', 'en-only'];
    $app.innerHTML = `<h1>${t('nav.settings')}</h1>
      <div class="card"><h3 style="margin-top:0">${t('set.uiLang')}</h3>
        ${UI_LANGS.map(v => `<label class="radio"><input type="radio" name="ui" value="${v}" lang="${v}" ${UI === v ? 'checked' : ''}> <b>${LANG_NAMES[v]}</b></label>`).join('')}
        <p class="muted small" style="margin-bottom:0">${t('set.uiNote')}</p></div>
      <div class="card"><h3 style="margin-top:0">${VI ? t('set.langMode') : t('set.display')}</h3>
        ${VI ? modes.map(v => `<label class="radio"><input type="radio" name="lang" value="${v}" ${st.lang === v ? 'checked' : ''}> <b>${t('set.mode.' + v)}</b> <span class="muted small">· ${t('set.mode.' + v + '.d')}</span></label>`).join('') : ''}
        <label class="radio"><input type="checkbox" id="kw" ${st.kw ? 'checked' : ''}> ${t('set.kw')}</label></div>
      <div class="card"><h3 style="margin-top:0">${t('set.schedule')}</h3>
        <div class="row"><label>${t('set.newPerDay')} <input type="number" id="npd" min="0" max="100" value="${esc(st.newPerDay)}" style="width:80px"></label></div>
        <div class="row" style="margin-top:10px"><label>${t('set.examDate')} <input type="date" id="exam" value="${esc(st.examDate)}"></label></div></div>
      ${pwaCard()}
      <div class="card"><h3 style="margin-top:0">${t('set.data')}</h3>
        <p class="muted small">${t('set.dataNote')}</p>
        <div class="row"><button class="btn" id="exp">${t('set.export')}</button>
          <label class="btn">${t('set.import')}<input type="file" id="imp" accept=".json,application/json" hidden></label>
          <button class="btn" id="reset" style="color:var(--bad)">${t('set.reset')}</button></div>
        <p id="msg" class="small"></p></div>`;
    const msg = text => { document.getElementById('msg').textContent = text; };
    bindPwaCard();
    // Đổi ngôn ngữ: lưu rồi tải lại trang để nạp đúng bộ file i18n/<lang>/ (tiến độ giữ nguyên)
    $app.querySelectorAll('[name=ui]').forEach(r => r.onchange = () => {
      if (!UI_LANGS.includes(r.value) || r.value === UI) return;
      st.ui = r.value; save(); location.reload();
    });
    $app.querySelectorAll('[name=lang]').forEach(r => r.onchange = () => { st.lang = r.value; save(); msg(t('set.saved')); });
    document.getElementById('kw').onchange = e => { st.kw = e.target.checked; save(); msg(t('set.saved')); };
    document.getElementById('npd').onchange = e => {
      const v = parseInt(e.target.value, 10);
      if (!Number.isFinite(v)) { e.target.value = st.newPerDay; msg(t('set.npdKeep', { n: st.newPerDay })); return; }
      st.newPerDay = Math.max(0, Math.min(100, v)); e.target.value = st.newPerDay; save(); msg(t('set.saved'));
    };
    document.getElementById('exam').onchange = e => { st.examDate = e.target.value; save(); msg(t('set.saved')); };
    document.getElementById('exp').onclick = () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
      a.download = `clf-c02-progress-${today()}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    document.getElementById('imp').onchange = e => {
      const input = e.target, f = input.files[0]; if (!f) return;
      f.text().then(text => {
        const d = JSON.parse(text);
        if (!isObj(d) || !isObj(d.cards)) throw new Error('bad');
        const next = normalize(d);   // chuẩn hóa trước khi ghi, tránh dữ liệu hỏng làm trắng trang
        // File sao lưu cũ (trước khi có i18n) không có settings.ui → giữ ngôn ngữ đang dùng, không tự chuyển về tiếng Việt
        if (!(isObj(d.settings) && UI_LANGS.includes(d.settings.ui))) next.settings.ui = UI;
        S = next; save();
        if (S.settings.ui !== UI) { location.reload(); return; }   // file nhập dùng ngôn ngữ khác → nạp lại bộ i18n
        viewSettings(); msg(t('set.imported'));
      }).catch(() => { input.value = ''; msg(t('set.badFile')); });
    };
    document.getElementById('reset').onclick = () => {
      if (!confirm(t('set.resetConfirm'))) return;
      const keep = S.settings; S = clone(DEFAULTS); S.settings = keep;
      clearInterval(examTimer); examTimer = null;
      save(); viewSettings(); msg(t('set.resetDone'));
    };
  }

  /* ───────── Thi thử ───────── */
  const EXAM_FULL = 65;             // đề thật: 65 câu / 90 phút
  const PASS = 700;
  const READY = 0.8;                // ngưỡng "sẵn sàng": ≥ 80% đúng
  const POOL = D.examPool || [];    // kho câu chỉ dùng cho thi thử (không có trong luyện tập/SRS)
  const POOL_IDS = new Set(POOL.map(q => q.id));
  const QBY = new Map([...D.questions, ...POOL].map(q => [q.id, q]));
  let examTimer = null;
  const examSize = () => Math.min(EXAM_FULL, D.questions.length + POOL.length);
  const seenCount = id => (S.examSeen && S.examSeen[id]) || 0;
  const pct = r => Math.round(r.correct / r.n * 100);
  // Một đề chỉ được tính vào "mức sẵn sàng" khi phần lớn câu là câu mới gặp lần đầu (fresh ≥ n/2);
  // đề toàn câu đã gặp phản ánh trí nhớ nhiều hơn năng lực.
  const isFreshExam = r => r.fresh != null && r.fresh >= r.n / 2;
  function readiness() {
    const all = S.exams || [];
    const last = all.filter(isFreshExam).slice(0, 3);
    const ok = last.filter(r => r.correct / r.n >= READY).length;
    return { last, ok, ready: last.length === 3 && ok === 3, skipped: all.length - all.filter(isFreshExam).length };
  }
  // Phân bổ số câu theo tỷ trọng domain (phần dư lớn nhất để tổng đúng bằng n; 65 câu → 16/19/22/8)
  function domainQuota(n) {
    const raw = D.domains.map(d => ({ d, x: n * d.weight / 100 }));
    raw.forEach(r => { r.k = Math.floor(r.x); });
    let left = n - raw.reduce((s, r) => s + r.k, 0);
    raw.slice().sort((a, b) => (b.x - b.k) - (a.x - a.k)).forEach(r => { if (left > 0) { r.k++; left--; } });
    return raw;
  }
  // Số đề còn lại mà toàn bộ câu đều là câu chưa từng gặp trong kho đề riêng (tính theo quota từng domain)
  function freshExamsLeft() {
    const n = examSize(); if (!n || !POOL.length) return 0;
    const unseen = POOL.filter(q => seenCount(q.id) === 0);
    return Math.min(...domainQuota(n).filter(r => r.k > 0).map(r => Math.floor(unseen.filter(q => q.d === r.d.id).length / r.k)));
  }
  function verdict(p) {
    const v = p >= READY * 100 ? 'ok' : p >= 70 ? 'warn' : 'no';
    return [v, t('exam.verdict.' + v)];
  }
  const examMinutes = esl => Math.round((esl ? 120 : 90) * examSize() / EXAM_FULL);
  const fmtTime = ms => {
    const s = Math.max(0, Math.round(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0');
  };
  const sameAns = (q, a) => a.length === q.ans.length && q.ans.every(i => a.includes(i));

  function pickExam() {
    const n = examSize();
    // Ưu tiên câu trong kho đề riêng mà bạn gặp ít nhất; thiếu thì bổ sung bằng câu luyện tập.
    const byFresh = arr => shuffle(arr).sort((a, b) => seenCount(a.id) - seenCount(b.id));
    const candidates = dId => [...byFresh(POOL.filter(q => q.d === dId)), ...byFresh(D.questions.filter(q => q.d === dId))];
    // chia số câu theo tỷ trọng domain
    // phân bổ theo phần dư lớn nhất để tổng đúng bằng n (65 câu → 16/19/22/8)
    const raw = domainQuota(n);
    const out = [];
    raw.forEach(r => out.push(...candidates(r.d.id).slice(0, r.k)));
    const rest = byFresh([...POOL, ...D.questions].filter(q => !out.includes(q)));
    while (out.length < n && rest.length) out.push(rest.shift());
    return shuffle(out.slice(0, n)).map(q => q.id);
  }

  function viewExam(arg) {
    if (arg && arg[0] === 'r') return examResult(+arg.slice(1));
    if (S.exam) return examRun();
    const n = examSize(), st = S.settings;
    const hist = (S.exams || []).map((r, i) => { const p = pct(r), v = verdict(p);
      return `<tr><td><a href="#/exam/r${i}">${new Date(r.date).toLocaleString(LOCALE, { dateStyle: 'short', timeStyle: 'short' })}</a></td>
      <td><b class="v-${v[0]}">${p}%</b></td><td>${esc(r.correct)}/${esc(r.n)}</td>
      <td>${r.fresh != null ? `${esc(r.fresh)}/${esc(r.n)}${isFreshExam(r) ? '' : ` <span class="muted small">${t('exam.notCounted')}</span>`}` : '—'}</td><td>${fmtTime(r.used)}</td></tr>`; }).join('');
    const poolSeen = POOL.filter(q => seenCount(q.id) > 0).length;
    const freshLeft = freshExamsLeft();
    const rd = readiness();
    $app.innerHTML = `<h1>${t('nav.exam')}</h1>
      <div class="card">
        <p>${t('exam.intro', { n, mins: `<b id="mins">${t('exam.mins', { n: examMinutes(st.esl) })}</b>` })}
          ${n < EXAM_FULL ? `<span class="muted small">${t('exam.shortNote', { n: D.questions.length })}</span>` : ''}</p>
        <ul class="small">
          <li>${t('exam.rule1')}</li>
          <li>${t('exam.rule2', { pool: POOL.length, seen: poolSeen })}</li>
          <li>${freshLeft > 0 ? t('exam.freshLeft', { n: freshLeft }) : t('exam.noFresh')}
            ${t('exam.saveFresh')}</li>
          <li>${t('exam.rule4')}</li>
          <li>${t('exam.rule5')}</li>
        </ul>
        <label class="radio"><input type="checkbox" id="esl" ${st.esl ? 'checked' : ''}> ${t('exam.esl')}</label>
        <button class="btn primary" id="start" style="margin-top:8px">${t('exam.start')}</button>
      </div>
      ${readyCard(rd)}
      <h2>${t('exam.history')}</h2>
      ${hist ? `<div class="card scroll-x"><table><tr><th>${t('exam.colTime')}</th><th>${t('exam.colPct')}</th><th>${t('exam.colCorrect')}</th><th>${t('exam.colFresh')}</th><th>${t('exam.colUsed')}</th></tr>${hist}</table>
        <p class="note">${t('exam.freshNote')}</p></div>`
             : `<p class="muted">${t('exam.none')}</p>`}`;
    document.getElementById('esl').onchange = e => { st.esl = e.target.checked; save(); document.getElementById('mins').textContent = t('exam.mins', { n: examMinutes(st.esl) }); };
    document.getElementById('start').onclick = () => {
      const ids = pickExam(), order = {};
      ids.forEach(id => { order[id] = shuffle(QBY.get(id).opts.map((_, i) => i)); });
      S.exam = { ids, order, ans: {}, flag: [], cur: 0, start: Date.now(), dur: examMinutes(st.esl) * MIN };
      save(); examRun();
    };
  }

  // Thứ tự lựa chọn hợp lệ = hoán vị đầy đủ các chỉ số lựa chọn của câu
  const validOrder = (q, o) => Array.isArray(o) && o.length === q.opts.length && q.opts.every((_, i) => o.includes(i));
  // Bỏ câu không còn trong ngân hàng (ví dụ sau khi cập nhật nội dung) và sửa thứ tự lựa chọn bị lệch
  function cleanExamIds(E) {
    E.order = E.order || {}; E.ans = E.ans || {}; E.flag = (E.flag || []).filter(id => QBY.has(id));
    E.ids = (E.ids || []).filter(id => QBY.has(id));
    E.ids.forEach(id => { const q = QBY.get(id); if (!validOrder(q, E.order[id])) E.order[id] = q.opts.map((_, i) => i); });
    return E.ids.length;
  }
  const partialIds = E => E.ids.filter(x => { const a = E.ans[x] || []; return a.length > 0 && a.length < QBY.get(x).ans.length; });

  function examRun() {
    const E = S.exam;
    if (!cleanExamIds(E)) {
      S.exam = null; save();
      $app.innerHTML = `<div class="card">${t('exam.invalid')}</div>`;
      return;
    }
    const n = E.ids.length;
    E.cur = Math.min(Math.max(0, E.cur || 0), n - 1);
    const remaining = () => E.start + E.dur - Date.now();
    if (remaining() <= 0) return examSubmit(true);
    draw();
    clearInterval(examTimer);
    examTimer = setInterval(() => {
      const r = remaining();
      if (r <= 0) return examSubmit(true);
      const el = document.getElementById('timer');
      if (el) { el.textContent = '⏱ ' + fmtTime(r); el.classList.toggle('low', r < 5 * MIN); }
    }, 1000);

    function draw() {
      const id = E.ids[E.cur], q = QBY.get(id), sel = E.ans[id] || [], need = q.ans.length, flagged = E.flag.includes(id);
      const isFull = x => (E.ans[x] || []).length >= QBY.get(x).ans.length;
      const answered = E.ids.filter(isFull).length;
      $app.innerHTML = `
        <div class="card exambar"><b>${t('exam.qOf', { i: E.cur + 1, n })}</b>
          <span id="timer" class="timer ${remaining() < 5 * MIN ? 'low' : ''}">⏱ ${fmtTime(remaining())}</span>
          <button class="btn" data-a="flag">${flagged ? t('exam.unflag') : t('exam.flag')}</button></div>
        <div class="card ${need > 1 ? 'multi' : ''}">
          <div class="qtext">${esc(qStem(q))}</div>
          <ul class="opts">${E.order[id].map((oi, k) => `<li class="opt ${sel.includes(oi) ? 'sel' : ''}" data-i="${oi}">
            <span class="mark">${String.fromCharCode(65 + k)}</span><div>${esc(qOpt(q, oi))}</div></li>`).join('')}</ul>
          <div class="row"><button class="btn" data-a="prev" ${E.cur ? '' : 'disabled'}>${t('exam.prev')}</button>
            <button class="btn primary" data-a="next" ${E.cur < n - 1 ? '' : 'disabled'}>${t('exam.next')}</button>
            <span class="muted small">${t('exam.keys', { last: String.fromCharCode(64 + E.order[id].length) })}</span></div>
        </div>
        <div class="card">
          <div class="muted small">${t('exam.navSummary', { answered, n, flags: E.flag.length })}${partialIds(E).length ? t('exam.navPartial', { n: partialIds(E).length }) : ''}</div>
          <div class="qnav">${E.ids.map((x, i) => `<button class="${i === E.cur ? 'cur' : ''} ${isFull(x) ? 'ans' : (E.ans[x] || []).length ? 'part' : ''} ${E.flag.includes(x) ? 'flag' : ''}" data-j="${i}">${i + 1}</button>`).join('')}</div>
          <div class="row" style="margin-top:14px"><button class="btn primary" data-a="submit">${t('exam.submit')}</button>
            <button class="btn" data-a="quit" style="color:var(--bad)">${t('exam.quit')}</button></div>
        </div>`;
    }
    function choose(oi) {
      const id = E.ids[E.cur], q = QBY.get(id), need = q.ans.length;
      let a = (E.ans[id] || []).slice();
      if (need === 1) a = [oi];
      else if (a.includes(oi)) a = a.filter(x => x !== oi);
      else if (a.length < need) a.push(oi);
      E.ans[id] = a; save(); draw();
    }
    const go = i => { if (i >= 0 && i < n) { E.cur = i; save(); draw(); window.scrollTo(0, 0); } };
    const flag = () => { const id = E.ids[E.cur]; E.flag = E.flag.includes(id) ? E.flag.filter(x => x !== id) : [...E.flag, id]; save(); draw(); };
    $app.onclick = e => {
      const li = e.target.closest('.opt'); if (li) return choose(+li.dataset.i);
      const j = e.target.closest('[data-j]'); if (j) return go(+j.dataset.j);
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'prev') go(E.cur - 1);
      if (a === 'next') go(E.cur + 1);
      if (a === 'flag') flag();
      if (a === 'submit') {
        const left = E.ids.filter(x => !(E.ans[x] || []).length).length, part = partialIds(E).length;
        const msg = (left ? t('exam.cUnanswered', { n: left }) : '') + (part ? t('exam.cPartial', { n: part }) : '') + (E.flag.length ? t('exam.cFlagged', { n: E.flag.length }) : '') + t('exam.cSubmit');
        if (confirm(msg)) examSubmit(false);
      }
      if (a === 'quit' && confirm(t('exam.cQuit'))) {
        clearInterval(examTimer); S.exam = null; save(); viewExam();
      }
    };
    onKey = e => {
      const k = e.key.toUpperCase(), ord = E.order[E.ids[E.cur]];
      // M = đánh dấu (không dùng F vì F là lựa chọn thứ 6 của câu Choose THREE)
      if (k === 'M') flag();
      else if (k.length === 1 && k >= 'A' && k < String.fromCharCode(65 + ord.length)) { choose(ord[k.charCodeAt(0) - 65]); }
      else if (e.key === 'ArrowRight') go(E.cur + 1);
      else if (e.key === 'ArrowLeft') go(E.cur - 1);
    };
  }

  function readyCard(rd) {
    const dots = [0, 1, 2].map(i => { const r = rd.last[i]; if (!r) return '<span class="dot"></span>';
      return `<span class="dot ${r.correct / r.n >= READY ? 'ok' : 'no'}" title="${pct(r)}%">${pct(r)}%</span>`; }).join('');
    return `<div class="card ready ${rd.ready ? 'yes' : ''}"><b>${rd.ready ? t('ready.yes') : t('ready.title')}</b>
      <div class="dots">${dots}</div>
      <p class="small muted" style="margin:6px 0 0">${rd.ready ? t('ready.yesNote') : t('ready.goal', { ok: rd.ok, n: rd.last.length || 0 })}</p>
      <p class="small muted" style="margin:6px 0 0">${t('ready.rule')}${rd.skipped ? ' ' + t('ready.skipped', { n: rd.skipped }) : ''}</p></div>`;
  }

  function examSubmit(auto) {
    clearInterval(examTimer); examTimer = null; onKey = null;
    const E = S.exam; if (!E) return;
    if (!cleanExamIds(E)) { S.exam = null; save(); location.hash = '#/exam'; return; }
    const per = {}; let correct = 0;
    E.ids.forEach(id => {
      const q = QBY.get(id), ok = sameAns(q, E.ans[id] || []);
      const p = per[q.d] || (per[q.d] = { c: 0, t: 0 });
      p.t++; if (ok) { p.c++; correct++; }
      if (!POOL_IDS.has(id)) {          // câu luyện tập: ghi thống kê, câu sai vào SRS
        recordAnswer(id, ok);
        if (!ok) S.cards['q:' + id] = nextCard(S.cards['q:' + id], 1);
      }
    });
    const n = E.ids.length;
    S.exams = [{
      date: Date.now(), ids: E.ids, ans: E.ans, order: E.order, flag: E.flag, correct, n, per, auto,
      score: Math.round(100 + 900 * correct / n), used: Math.min(Date.now() - E.start, E.dur),
      fresh: E.ids.filter(id => POOL_IDS.has(id) && seenCount(id) === 0).length
    }, ...(S.exams || [])].slice(0, 20);
    S.examSeen = S.examSeen || {};
    S.examStats = S.examStats || {};
    E.ids.forEach(id => {
      S.examSeen[id] = (S.examSeen[id] || 0) + 1;
      if (POOL_IDS.has(id)) { const st = S.examStats[id] || (S.examStats[id] = { a: 0, c: 0 }); st.a++; if (sameAns(QBY.get(id), E.ans[id] || [])) st.c++; }
    });
    S.exam = null;
    S.activity[today()] = (S.activity[today()] || 0) + n;
    save();
    if (location.hash === '#/exam/r0') route(); else location.hash = '#/exam/r0';
  }

  function examResult(i) {
    const R = (S.exams || [])[i];
    if (!R) { $app.innerHTML = `<div class="card">${t('exam.notFound')}</div>`; return; }
    R.ids = (R.ids || []).filter(id => QBY.has(id));   // bỏ câu đã bị xóa khỏi ngân hàng
    R.order = R.order || {}; R.ans = R.ans || {}; R.flag = R.flag || []; R.per = R.per || {};
    R.ids.forEach(id => { const q = QBY.get(id); if (!validOrder(q, R.order[id])) R.order[id] = q.opts.map((_, j) => j); });
    const p100 = pct(R), v = verdict(p100);
    let filter = 'all', showVi = false;
    const wrongIds = R.ids.filter(id => !sameAns(QBY.get(id), R.ans[id] || []));
    const drillIds = wrongIds.filter(id => !POOL_IDS.has(id));   // chỉ câu luyện tập mới đưa vào ôn
    const tk = {};
    R.ids.forEach(id => { const q = QBY.get(id); if (!q.t) return; const r = tk[q.t] || (tk[q.t] = { c: 0, n: 0 }); r.n++; if (sameAns(q, R.ans[id] || [])) r.c++; });
    const weakTasks = Object.entries(tk).map(([t, r]) => ({ t, ...r, p: Math.round(r.c / r.n * 100) })).filter(r => r.p < 80).sort((a, b) => a.p - b.p).slice(0, 5);
    const domRows = D.domains.filter(d => R.per[d.id]).map(d => {
      const p = R.per[d.id], pc = Math.round(p.c / p.t * 100);
      return `<tr><td>D${d.id}. ${esc(domName(d))}</td><td>${p.c}/${p.t}</td><td style="width:40%"><div class="bar"><i style="width:${pc}%;background:${pc >= 70 ? 'var(--ok)' : 'var(--bad)'}"></i></div></td><td><b>${pc}%</b></td></tr>`;
    }).join('');
    draw();
    function draw() {
      const ids = R.ids.map((id, k) => [id, k]).filter(([id]) => filter === 'all' || (filter === 'wrong' ? wrongIds.includes(id) : R.flag.includes(id)));
      const list = ids.map(([id, k]) => {
        const q = QBY.get(id), a = R.ans[id] || [], ok = sameAns(q, a);
        const opts = R.order[id].map((oi, j) => {
          const right = q.ans.includes(oi), picked = a.includes(oi);
          return `<li class="opt ${right ? 'right' : picked ? 'wrong' : ''}"><span class="mark">${right ? '✓' : picked ? '✗' : String.fromCharCode(65 + j)}</span>
            <div>${esc(qOpt(q, oi))}${showVi ? `<div class="vi">${esc(q.opts[oi][1])}</div>` : ''}<div class="why">${esc(qWhy(q, oi))}</div></div></li>`;
        }).join('');
        return `<div class="card done ${q.ans.length > 1 ? 'multi' : ''}">
          <div class="qmeta"><span>${t('res.qN', { i: k + 1 })} · ${t('common.domain', { d: q.d })} ${R.flag.includes(id) ? '· 🚩' : ''}</span><span>${ok ? t('res.right') : a.length ? t('res.wrong') : t('res.blank')}</span></div>
          <div class="qtext">${hl(qStem(q))}</div>${showVi ? `<div class="vi">${esc(q.vi)}</div>` : ''}
          <ul class="opts">${opts}</ul><div class="result ${ok ? 'ok' : 'no'}">${esc(qExp(q))}</div></div>`;
      }).join('') || `<p class="muted">${t('res.none')}</p>`;
      $app.innerHTML = `
        <div class="card" style="text-align:center">
          <div class="muted small">${new Date(R.date).toLocaleString(LOCALE)}${R.auto ? t('res.auto') : ''}</div>
          <div class="score v-${v[0]}">${p100}<small>${t('res.pctCorrect')}</small></div>
          <h2 style="margin:4px 0">${v[1]}</h2>
          <p>${t('res.line', { c: esc(R.correct), n: esc(R.n), used: fmtTime(R.used) })}${R.fresh != null ? t('res.fresh', { f: esc(R.fresh), n: esc(R.n) }) : ''}</p>
          <p class="note">${t('res.scoreNote', { score: esc(R.score), pass: PASS })}${R.fresh != null && R.fresh < R.n / 2 ? ' ' + t('res.seenWarn') : ''}</p>
          <div class="row" style="justify-content:center">
            <a class="btn primary" href="#/exam">${t('res.retake')}</a>
            ${drillIds.length ? `<button class="btn" data-a="drill">${t('res.drill', { n: drillIds.length })}</button>` : ''}
          </div>
        </div>
        ${i === 0 ? readyCard(readiness()) : ''}
        <h2>${t('res.byDomain')}</h2>
        <div class="card scroll-x"><table>${domRows}</table><p class="note">${t('res.domainNote')}</p>
          ${weakTasks.length ? `<h3 style="margin:14px 0 6px">${t('res.weakTasks')}</h3><ul class="small">${weakTasks.map(r => `<li><b>${t('common.task', { t: r.t })}</b> ${esc(taskName(r.t))}: ${t('res.taskLine', { c: r.c, n: r.n, p: r.p })} · <a href="#/practice/t-${r.t}">${t('res.practiceTask')}</a></li>`).join('')}</ul>` : ''}</div>
        <h2>${t('res.review')}</h2>
        <div class="row" style="margin-bottom:12px">
          <div class="tabs" style="margin:0">
            <button class="btn ${filter === 'all' ? 'on' : ''}" data-f="all">${t('res.fAll', { n: R.ids.length })}</button>
            <button class="btn ${filter === 'wrong' ? 'on' : ''}" data-f="wrong">${t('res.fWrong', { n: wrongIds.length })}</button>
            <button class="btn ${filter === 'flag' ? 'on' : ''}" data-f="flag">${t('res.fFlag', { n: R.flag.length })}</button>
          </div>
          ${VI ? `<label><input type="checkbox" id="vi" ${showVi ? 'checked' : ''}> ${t('res.showVi')}</label>` : ''}
        </div>${list}`;
      const cb = document.getElementById('vi');
      if (cb) cb.onchange = e => { showVi = e.target.checked; draw(); };
    }
    $app.onclick = e => {
      const f = e.target.closest('[data-f]'); if (f) { filter = f.dataset.f; draw(); return; }
      const b = e.target.closest('[data-a="drill"]');
      if (b) startPractice(drillIds.map(id => QBY.get(id)).filter(q => qItem(q.id)), t('res.drillTitle'), {}, '#/exam/r' + i);
    };
  }

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
})();
