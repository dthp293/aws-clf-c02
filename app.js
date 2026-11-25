(() => {
  'use strict';
  const D = window.CLF;

  /* ───────── Task statements (Exam Guide CLF-C02) + gắn nhãn câu hỏi ───────── */
  const TASKS = {
    '1.1': 'Lợi ích của AWS Cloud', '1.2': 'Well-Architected Framework', '1.3': 'Migration & AWS CAF', '1.4': 'Kinh tế học cloud',
    '2.1': 'Shared responsibility', '2.2': 'Bảo mật, quản trị, tuân thủ', '2.3': 'Quản lý truy cập (IAM)', '2.4': 'Dịch vụ & tài nguyên bảo mật',
    '3.1': 'Cách triển khai & vận hành', '3.2': 'Hạ tầng toàn cầu', '3.3': 'Compute', '3.4': 'Database', '3.5': 'Network',
    '3.6': 'Storage', '3.7': 'AI/ML & Analytics', '3.8': 'Nhóm dịch vụ khác',
    '4.1': 'Mô hình giá', '4.2': 'Billing & quản lý chi phí', '4.3': 'Support & tài nguyên'
  };
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
    settings: { lang: 'en-first', newPerDay: 15, kw: true, examDate: '', esl: false },
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
  const LANGS = ['bi', 'en-first', 'en-only'];
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
  const fmtIvl = c => c.ivl === 0 ? '10 phút' : c.ivl < 30 ? c.ivl + ' ngày' : (c.ivl / 30).toFixed(1).replace('.0', '') + ' tháng';

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
  const fmtWhen = t => new Date(t).toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' });
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
    tip.innerHTML = `<b>${esc(g.vi)}</b>${g.hint ? `<small>💡 ${esc(g.hint)}</small>` : ''}`;
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
  const GL = { 1: ['Lại', 'g-again'], 2: ['Khó', ''], 3: ['Tốt', ''], 4: ['Dễ', 'g-easy'] };
  const gradeBtns = (id, set) => `<div class="grades ${set.length === 3 ? 'g3' : ''}">${set.map(g =>
    `<button class="btn ${GL[g][1]}" data-g="${g}">${GL[g][0]}<small>${fmtIvl(nextCard(deck()[id], g))}</small></button>`).join('')}</div>`;

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
        <h1>🎉 Xong phiên “${esc(title)}”</h1>
        <p>Đã ôn <b>${st.shown}</b> lượt${ans ? ` · Câu hỏi: <b>${st.right}</b> đúng / <b>${st.wrong}</b> sai` : ''}.</p>
        <p class="muted small">Thẻ trả lời sai sẽ quay lại sau 10 phút (khi đến hạn). Thẻ đúng sẽ giãn dần khoảng cách ôn.${opt.free ? ' Phiên này dùng lịch riêng của Luyện tập tự do, không ảnh hưởng lịch Ôn hôm nay.' : ''}</p>
        <div class="row" style="justify-content:center"><a class="btn primary" href="#/">Về trang chủ</a>${opt.free
          ? '<a class="btn" href="#/review/free">Luyện tập tự do tiếp</a>'
          : '<a class="btn" href="#/practice">Luyện tập thêm</a><a class="btn" href="#/review/free">Luyện tập tự do</a>'}</div></div>`;
    }
  }

  function renderQuestion(it, header, done) {
    const q = it.ref, multi = q.ans.length > 1, need = q.ans.length;
    const order = shuffle(q.opts.map((_, i) => i));
    const lang = S.settings.lang, isNew = !deck()[it.id];
    let showVi = lang === 'bi', answered = false, ok = false;
    const sel = new Set();
    draw();

    function draw() {
      const viOk = lang !== 'en-only' || answered;
      const vi = showVi && viOk;
      const opts = order.map((oi, k) => {
        const o = q.opts[oi], right = q.ans.includes(oi);
        let cls = 'opt' + (sel.has(oi) ? ' sel' : '');
        if (answered) cls += right ? ' right' : sel.has(oi) ? ' wrong' : '';
        const mark = answered ? (right ? '✓' : sel.has(oi) ? '✗' : '') : String.fromCharCode(65 + k);
        return `<li class="${cls}" data-i="${oi}"><span class="mark">${mark}</span><div>${hl(o[0])}
          ${vi ? `<div class="vi">${esc(o[1])}</div>` : ''}${answered ? `<div class="why">${esc(q.why[oi] || '')}</div>` : ''}</div></li>`;
      }).join('');
      const viBtn = (lang !== 'bi' && viOk) ? `<button class="btn" data-a="vi">${showVi ? 'Ẩn' : 'Xem'} tiếng Việt</button>` : '';
      let bottom;
      if (!answered) {
        bottom = `<div class="row"><button class="btn primary" data-a="check" ${sel.size === need ? '' : 'disabled'}>Kiểm tra</button>${viBtn}
          <span class="muted small">Phím: A–${String.fromCharCode(64 + order.length)} chọn · Enter kiểm tra</span></div>`;
      } else if (ok) {
        bottom = `<div class="result ok">✅ <b>Chính xác!</b> ${esc(q.exp)}</div>
          <div class="muted small">Bạn thấy câu này thế nào? (Enter = Tốt)</div>${gradeBtns(it.id, [2, 3, 4])}<div class="row" style="margin-top:10px">${viBtn}</div>`;
      } else {
        bottom = `<div class="result no">❌ <b>Chưa đúng.</b> ${esc(q.exp)}<div class="small muted" style="margin-top:4px">Câu này sẽ quay lại sau 10 phút.</div></div>
          <div class="row"><button class="btn primary" data-a="next">Tiếp tục (Enter)</button>${viBtn}</div>`;
      }
      $app.innerHTML = `${header}<div class="card ${multi ? 'multi' : ''} ${answered ? 'done' : ''}">
        <div class="qmeta"><span>Domain ${q.d} · ${esc(dom(q.d).vi)}${q.t ? ` · Task ${q.t}` : ''}</span>
          <span>${q.lvl === 2 ? '<span class="tag">🔥 Nâng cao</span> ' : ''}${isNew ? '<span class="tag">Mới</span> ' : ''}${multi ? `<span class="tag">Chọn ${need}</span>` : ''}</span></div>
        <div class="qtext">${hl(q.en)}</div>${vi ? `<div class="vi">${esc(q.vi)}</div>` : ''}
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
    const example = isV ? D.questions.find(q => q.en.toLowerCase().includes(r.term.toLowerCase())) : null;
    draw();
    function draw() {
      const back = isV
        ? `<div><b>${esc(r.vi)}</b></div>${r.hint ? `<div class="muted">💡 ${esc(r.hint)}</div>` : ''}
           ${example ? `<div class="small muted" style="margin-top:12px;text-align:left">Ví dụ trong đề: <i>${hl(example.en)}</i></div>` : ''}`
        : `<div>${esc(r.vi)}</div>${r.confuse ? `<div class="muted small" style="margin-top:8px">⚠️ Hay nhầm với: ${esc(r.confuse)}</div>` : ''}`;
      $app.innerHTML = `${header}<div class="card flash">
        <div class="qmeta"><span>${isV ? 'Từ vựng đề thi' : `Dịch vụ AWS · Domain ${r.d}`}</span><span>${isNew ? '<span class="tag">Mới</span>' : ''}</span></div>
        <div class="front">${esc(isV ? r.term : r.name)}</div>
        <p class="muted small">${isV ? 'Nghĩa là gì? Thường gợi ý dịch vụ nào?' : 'Dịch vụ này làm gì?'}</p>
        ${flipped ? `<div class="back">${back}</div>${gradeBtns(it.id, [1, 2, 3, 4])}<p class="muted small">Phím 1–4 để chấm</p>`
                  : `<button class="btn primary" data-a="flip">Lật thẻ (Space)</button>`}
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
      return `<div class="card dom"><div class="row" style="justify-content:space-between"><h3>D${d.id}. ${esc(d.vi)}</h3><span class="tag">${d.weight}% đề</span></div>
        <div class="muted small">${esc(d.en)}</div>
        <div class="bar"><i style="width:${s.seen / s.total * 100}%"></i></div>
        <div class="small">Đã học ${s.seen}/${s.total} câu · Tỷ lệ đúng: <b>${s.acc === null ? '—' : s.acc + '%'}</b></div>
        <div class="row"><a class="btn" href="#/learn/${d.id}">Bài học</a><a class="btn" href="#/practice/${d.id}">Luyện tập</a></div></div>`;
    }).join('');
    $app.innerHTML = `
      <h1>Ôn thi AWS Certified Cloud Practitioner</h1>
      <div class="grid">
        <div class="card stat"><b>${due}</b><span class="muted small">thẻ đến hạn ôn</span></div>
        <div class="card stat"><b>${nl}</b><span class="muted small">thẻ mới hôm nay</span></div>
        <div class="card stat"><b>${learned}/${ITEMS.length}</b><span class="muted small">thẻ đã học</span></div>
        <div class="card stat"><b>🔥 ${streak()}</b><span class="muted small">ngày liên tiếp</span></div>
        ${ex !== null ? `<div class="card stat"><b>${ex >= 0 ? ex : '—'}</b><span class="muted small">ngày đến kỳ thi</span></div>` : ''}
        ${(S.exams || []).length ? `<a class="card stat" style="text-decoration:none" href="#/exam/r0"><b class="v-${verdict(pct(S.exams[0]))[0]}">${pct(S.exams[0])}%</b><span class="muted small">thi thử gần nhất · sẵn sàng ${readiness().ok}/3 (đề mới)</span></a>` : ''}
        ${S.exam ? `<a class="card stat" style="text-decoration:none" href="#/exam"><b>⏱</b><span class="muted small">Đang thi dở · tiếp tục</span></a>` : ''}
      </div>
      <div class="card row" style="justify-content:space-between">
        <div>${due + nl ? `Hôm nay cần ôn <b>${due + nl}</b> thẻ.` : 'Hôm nay bạn đã ôn xong 🎉'}</div>
        <a class="btn primary" href="#/review">${due + nl ? 'Bắt đầu ôn' : 'Xem lịch ôn'}</a>
      </div>
      ${(() => {
        const nl = nextLesson(); if (!COURSE.length) return '';
        const dn = COURSE.filter(l => isDone(l.id)).length;
        return `<div class="card row" style="justify-content:space-between">
          <div>📚 Khóa học: <b>${dn}/${COURSE.length}</b> bài${nl ? `<div class="small muted">Tiếp theo: ${esc(nl.id)}. ${esc(nl.title)}</div>` : ''}</div>
          <a class="btn" href="${nl ? '#/lesson/' + esc(nl.id) : '#/learn'}">${nl ? (dn ? 'Học tiếp' : 'Bắt đầu học') : 'Xem lại'}</a></div>`;
      })()}
      ${(() => {
        const ts = taskStats();
        const weak = Object.keys(TASKS).map(t => ({ t, ...ts[t] })).filter(r => r.a >= 5).map(r => ({ ...r, p: Math.round(r.c / r.a * 100) }))
          .filter(r => r.p < 80).sort((a, b) => a.p - b.p).slice(0, 3);
        return weak.length ? `<div class="card"><b>🎯 Task cần ôn nhiều nhất</b><ul class="small" style="margin:6px 0 0">${weak.map(r =>
          `<li>Task ${r.t} ${esc(TASKS[r.t])}: <b class="${r.p >= 70 ? 'v-warn' : 'v-no'}">${r.p}%</b> · <a href="#/practice/t-${r.t}">Luyện ngay</a></li>`).join('')}</ul>
          <div class="small" style="margin-top:6px"><a href="#/practice">Xem thống kê đầy đủ →</a></div></div>` : '';
      })()}
      <h2>Tiến độ theo domain</h2>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${domains}</div>
      <h2>Cách dùng</h2>
      <div class="card small">
        <p>📅 <b>Ôn hôm nay</b> trộn câu hỏi, từ vựng đề thi và thẻ dịch vụ theo <b>lặp lại ngắt quãng (SRS)</b>. Thẻ trả lời sai quay lại sau 10 phút. Thẻ đúng giãn dần thành 1, 4, 10... ngày. Thẻ đã học chỉ xuất hiện lại khi đến hạn; muốn luyện thêm ngoài lịch thì dùng <a href="#/review/free">Luyện tập tự do</a> (lịch riêng).</p>
        <p>🟨 Từ <span class="kw" tabindex="0" data-k="most cost-effective">được tô màu</span> trong đề là từ khóa quan trọng. Rê chuột hoặc chạm vào để xem nghĩa tiếng Việt và gợi ý.</p>
        <p>🌐 Vào <a href="#/settings">Cài đặt</a> để chuyển chế độ ngôn ngữ: <i>Song ngữ</i> → <i>Ưu tiên tiếng Anh</i> → <i>Chỉ tiếng Anh</i>.</p>
        <p class="muted">Tiến độ chỉ lưu trên trình duyệt này. Dùng Cài đặt → Xuất dữ liệu để sao lưu.</p>
      </div>`;
  }

  /* Màn hình "không có gì để luyện lúc này": báo giờ đến hạn gần nhất của tập thẻ + lối sang Luyện tập tự do */
  function emptyState(title, ids, opt = {}, back = '#/practice', backLabel = 'Quay lại') {
    const nd = nextDueIn(deckOf(opt), ids);
    $app.innerHTML = `<div class="card empty-state"><h1>✅ Chưa có câu nào cần luyện lúc này</h1>
      <p><b>${esc(title)}</b>: không còn câu mới, và các câu đã học đều chưa đến hạn ôn${opt.free ? ' theo lịch riêng của Luyện tập tự do' : ''}.</p>
      ${nd ? `<p>Câu tiếp theo trong mục này đến hạn: <b>${fmtWhen(nd)}</b></p>` : ''}
      <div class="row">${opt.free ? '<a class="btn primary" href="#/review">Ôn hôm nay</a>' : '<a class="btn primary" href="#/review/free">Luyện tập tự do</a>'}
        <a class="btn" href="${esc(back)}">${esc(backLabel)}</a></div>
      ${opt.free ? '' : '<p class="muted small">Luyện tập tự do có lịch riêng nên luyện thêm ở đó không làm lệch lịch Ôn hôm nay.</p>'}</div>`;
  }

  function viewReview(arg) {
    // #/review              → phiên Ôn hôm nay (lịch chính)
    // #/review/free         → chọn domain cho Luyện tập tự do
    // #/review/free/<d|all> → phiên Luyện tập tự do (lịch riêng S.free)
    if (arg === 'free') return viewFree(location.hash.split('/')[3]);
    const q = [...dueItems(), ...newItems(newLeft())];
    if (q.length) return runSession(q, 'Ôn hôm nay', { review: true });
    const nd = nextDueIn(S.cards, Object.keys(S.cards));
    const remainNew = ITEMS.filter(i => !S.cards[i.id]).length;
    $app.innerHTML = `<div class="card" style="text-align:center"><h1>🎉 Hôm nay đã ôn xong!</h1>
      <p class="muted">${nd ? `Thẻ tiếp theo đến hạn: <b>${fmtWhen(nd)}</b>` : ''}</p>
      <div class="row" style="justify-content:center">
        ${remainNew ? `<button class="btn primary" id="more">Học thêm 10 thẻ mới</button>` : ''}
        <a class="btn" href="#/review/free">Luyện tập tự do</a></div>
      <p class="muted small">Còn ${remainNew} thẻ chưa học. Luyện tập tự do dùng lịch riêng, không ảnh hưởng lịch ôn này.</p></div>`;
    const m = document.getElementById('more');
    if (m) m.onclick = () => runSession(newItems(10), 'Thẻ mới thêm', { review: true });
  }

  /* ───────── Luyện tập tự do: lịch SRS riêng (S.free) ─────────
     Phạm vi: Domain 1–4 = câu hỏi + thẻ dịch vụ của domain đó; "Trộn tất cả" = mọi câu hỏi + dịch vụ + từ vựng đề thi
     (từ vựng không thuộc domain nào nên chỉ có ở "Trộn tất cả"). Câu của kho thi thử không bao giờ có mặt (ITEMS không chứa). */
  const FREE_SCOPES = ['1', '2', '3', '4', 'all'];
  const freeItems = sc => sc === 'all' ? ITEMS : ITEMS.filter(i => i.type !== 'v' && i.d === +sc);
  const freeTitle = sc => 'Luyện tập tự do · ' + (sc === 'all' ? 'Trộn tất cả' : 'Domain ' + sc);
  function viewFree(sc) {
    if (FREE_SCOPES.includes(sc)) {
      const items = freeItems(sc), av = items.filter(i => availIn(S.free, i.id));
      if (!av.length) return emptyState(freeTitle(sc), items.map(i => i.id), { free: true }, '#/review/free', 'Chọn phạm vi khác');
      return runSession(shuffle(av), freeTitle(sc), { free: true });
    }
    const card = (sc, head, sub) => {
      const items = freeItems(sc), av = items.filter(i => availIn(S.free, i.id)).length;
      const nd = nextDueIn(S.free, items.map(i => i.id));
      const kinds = [['q', 'câu hỏi'], ['s', 'dịch vụ'], ['v', 'từ vựng']].map(([t, l]) => [items.filter(i => i.type === t).length, l]).filter(x => x[0]);
      return `<a class="card dom" style="text-decoration:none" href="#/review/free/${sc}"><h3>${head}</h3>
        ${sub ? `<span class="muted small">${esc(sub)}</span>` : ''}
        <span class="small"><b>${av}/${items.length}</b> thẻ luyện được ngay</span>
        <span class="muted small">${kinds.map(k => k[0] + ' ' + k[1]).join(' · ')}</span>
        ${nd ? `<span class="muted small">⏳ Thẻ tiếp theo đến hạn: ${fmtWhen(nd)}</span>` : ''}</a>`;
    };
    const ndAll = nextDueIn(S.free, ITEMS.map(i => i.id));
    $app.innerHTML = `<div class="crumb small"><a href="#/review">Ôn hôm nay</a> › Luyện tập tự do</div>
      <h1>Luyện tập tự do</h1>
      <p class="muted">Luyện thêm bao nhiêu tùy thích theo <b>lịch riêng</b>: không làm thay đổi lịch Ôn hôm nay, không tính vào số thẻ mới mỗi ngày.
        Thẻ đã luyện ở đây cũng giãn dần theo SRS và chỉ quay lại khi đến hạn của lịch riêng này.</p>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
        ${D.domains.map(d => card(String(d.id), 'D' + d.id + '. ' + esc(d.vi), '')).join('')}
        ${card('all', '🔀 Trộn tất cả', 'Cả 4 domain + từ vựng đề thi')}
      </div>
      <p class="muted small">${ndAll ? `Thẻ tự do tiếp theo đến hạn: <b>${fmtWhen(ndAll)}</b>. ` : ''}Domain gồm câu hỏi và thẻ dịch vụ của domain đó; từ vựng đề thi chỉ có trong “Trộn tất cả”.</p>`;
  }

  /* ───────── Luyện tập (lịch chính): chỉ câu mới hoặc đã đến hạn ───────── */
  const weakQs = () => D.questions.filter(q => { const s = S.stats[q.id]; return s && s.c / s.a < 0.7; });
  const readQs = () => D.questions.filter(q => q.en.length >= 160);
  function practiceSet(arg) {
    if (arg === 'all') return { qs: D.questions, title: 'Tất cả domain' };
    if (arg === 'hard') return { qs: D.questions.filter(q => q.lvl === 2), title: 'Câu nâng cao' };
    if (arg === 'multi') return { qs: D.questions.filter(q => q.ans.length > 1), title: 'Câu chọn nhiều đáp án' };
    if (arg === 'weak') return { qs: weakQs(), title: 'Câu hay sai' };
    if (arg === 'read') return { qs: readQs(), title: 'Luyện đọc đề', opt: { read: true }, max: 15 };
    if (arg.startsWith('t-')) { const t = arg.slice(2); return { qs: D.questions.filter(q => q.t === t), title: 'Task ' + t + ' · ' + (TASKS[t] || '') }; }
    return { qs: D.questions.filter(q => q.d === +arg), title: 'Domain ' + arg };
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
      if (!p.qs.length) { $app.innerHTML = `<div class="card">Chưa có câu nào ở mục này. <a href="#/practice">Quay lại</a></div>`; return; }
      return startPractice(p.qs, p.title, p.opt, '#/practice', p.max);
    }
    const cnt = qs => `<b>${availQs(qs).length}/${qs.length}</b>`;
    const set = a => practiceSet(a).qs;
    $app.innerHTML = `<h1>Luyện tập</h1>
      <p class="muted">Luyện câu hỏi theo domain. Chỉ hiện câu <b>mới</b> hoặc <b>đã đến hạn ôn</b>; kết quả được ghi vào lịch SRS (không tính vào số thẻ mới mỗi ngày).
        Số trên mỗi ô là <b>số câu luyện được ngay / tổng số câu</b>. Muốn luyện thêm ngoài lịch: <a href="#/review/free">Luyện tập tự do</a>.</p>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
      ${D.domains.map(d => { const s = domStats(d.id); return `<a class="card dom" style="text-decoration:none" href="#/practice/${d.id}">
        <h3>D${d.id}. ${esc(d.vi)}</h3><span class="muted small">${cnt(set(String(d.id)))} câu · đúng ${s.acc === null ? '—' : s.acc + '%'}</span></a>`; }).join('')}
      <a class="card dom" style="text-decoration:none" href="#/practice/all"><h3>🔀 Trộn tất cả</h3><span class="muted small">${cnt(set('all'))} câu</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/weak"><h3>🎯 Câu hay sai</h3><span class="muted small">${cnt(set('weak'))} câu (tỷ lệ đúng dưới 70%)</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/hard"><h3>🔥 Câu nâng cao</h3><span class="muted small">${cnt(set('hard'))} câu gần độ khó đề thật</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/multi"><h3>☑️ Câu chọn nhiều đáp án</h3><span class="muted small">${cnt(set('multi'))} câu (Choose TWO/THREE)</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/read"><h3>📖 Luyện đọc đề</h3><span class="muted small">Tìm từ khóa quyết định trước khi xem đáp án · tối đa 15 câu dài (${cnt(set('read'))} câu)</span></a>
      </div>
      <h2>Theo task statement</h2>
      <p class="muted small">Gộp kết quả luyện tập và thi thử. Task có tỷ lệ đúng thấp nhất được xếp lên đầu. Bấm để luyện riêng task đó (số câu luyện được ngay / tổng).</p>
      ${taskTable()}`;
  }

  /* Thống kê theo task statement: gộp S.stats (luyện tập) + S.examStats (thi thử) */
  function taskStats() {
    const out = {};
    Object.keys(TASKS).forEach(t => { out[t] = { a: 0, c: 0, total: 0 }; });
    D.questions.forEach(q => { if (!q.t) return; out[q.t].total++; const s = S.stats[q.id]; if (s) { out[q.t].a += s.a; out[q.t].c += s.c; } });
    (D.examPool || []).forEach(q => { if (!q.t) return; const s = (S.examStats || {})[q.id]; if (s) { out[q.t].a += s.a; out[q.t].c += s.c; } });
    return out;
  }
  function taskTable() {
    const ts = taskStats(), av = {};
    D.questions.forEach(q => { if (q.t && isAvail('q:' + q.id)) av[q.t] = (av[q.t] || 0) + 1; });
    const rows = Object.keys(TASKS).map(t => ({ t, ...ts[t], acc: ts[t].a ? Math.round(ts[t].c / ts[t].a * 100) : null }))
      .sort((x, y) => (x.acc === null) - (y.acc === null) || (x.acc ?? 0) - (y.acc ?? 0) || x.t.localeCompare(y.t));
    return `<div class="card scroll-x"><table class="tasks"><tr><th>Task</th><th>Chủ đề</th><th>Đúng</th><th style="width:30%"></th><th></th></tr>
      ${rows.map(r => `<tr><td><b>${r.t}</b></td><td>${esc(TASKS[r.t])}</td>
        <td class="${r.acc === null ? 'muted' : r.acc >= 80 ? 'v-ok' : r.acc >= 70 ? 'v-warn' : 'v-no'}"><b>${r.acc === null ? '—' : r.acc + '%'}</b><div class="muted small">${r.a} lượt</div></td>
        <td><div class="bar"><i style="width:${r.acc || 0}%;background:${r.acc === null ? 'var(--line)' : r.acc >= 80 ? 'var(--ok)' : r.acc >= 70 ? '#c98a00' : 'var(--bad)'}"></i></div></td>
        <td>${r.total ? `<a class="btn" href="#/practice/t-${r.t}">Luyện ${av[r.t] || 0}/${r.total}</a>` : ''}</td></tr>`).join('')}</table></div>`;
  }

  /* Chế độ luyện đọc đề: đọc đề tiếng Anh, chạm vào từ khóa quyết định, rồi mới xem lựa chọn */
  function renderRead(it, header, done) {
    const q = it.ref, start = Date.now(), marked = new Set();
    const words = q.en.split(/(\s+)/);
    let tick = null;
    const drawStep1 = () => {
      $app.innerHTML = `${header}<div class="card">
        <div class="qmeta"><span>📖 Bước 1/2: đọc đề và chạm vào từ khóa quyết định</span><span id="rtimer" class="timer small">0s</span></div>
        <p class="muted small">Gợi ý: tìm yêu cầu chính (MOST cost-effective, LEAST operational overhead…), ràng buộc (cannot be interrupted, without managing servers…) và đối tượng (data, users, servers…).</p>
        <div class="qtext read">${words.map((w, i) => /\S/.test(w) ? `<span class="tok ${marked.has(i) ? 'mk' : ''}" data-w="${i}">${esc(w)}</span>` : w).join('')}</div>
        <div class="row" style="margin-top:14px"><button class="btn primary" data-a="reveal">Xem từ khóa gợi ý & các lựa chọn →</button>
          <span class="muted small">Mục tiêu khi thi: khoảng 80 giây mỗi câu (90 phút / 65 câu)</span></div></div>`;
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
          <div class="small"><b>⏱ ${secs}s</b> để đọc đề${secs > 80 ? ' (hơi lâu, hãy luyện đọc lướt tìm từ khóa)' : ''}.
            Từ bạn chọn: <i>${mine ? esc(mine) : 'chưa chọn từ nào'}</i></div>
          ${kws.length ? `<div class="small" style="margin-top:6px">🔑 Từ khóa gợi ý: ${kws.map(g => `<span class="kw">${esc(g.term)}</span> = ${esc(g.vi)}${g.hint ? ` <span class="muted">(${esc(g.hint)})</span>` : ''}`).join(' · ')}</div>` : ''}
          ${S.settings.lang === 'en-only' ? '' : `<div class="vi" style="margin-top:6px">${esc(q.vi)}</div>`}</div>`;
        renderQuestion(it, header + box, done);
      }
    };
  }

  /* ───────── Khóa học ───────── */
  const MODULES = [{ id: 0, vi: 'Nền tảng IT cho người mới', en: 'Start here' }, ...D.domains, { id: 5, vi: 'Thực hành trên AWS (tùy chọn)', en: 'Hands-on labs' }];
  const lessonNum = l => parseInt(String(l.id).split('-')[1], 10) || 0;
  const COURSE = (D.course || []).slice().sort((a, b) => a.module - b.module || lessonNum(a) - lessonNum(b));
  const isDone = id => !!(S.done && S.done[id]);
  const nextLesson = () => COURSE.find(l => !isDone(l.id));
  const modName = m => m === 0 ? 'Nền tảng' : m === 5 ? 'Thực hành' : 'Domain ' + m;

  function viewLearn(arg) {
    // #/learn            → lộ trình khóa học
    // #/learn/<d>        → lộ trình, cuộn tới module d
    // #/learn/sum/<d>    → tóm tắt nhanh (bảng ôn tập)
    if (arg === 'sum') { const d = +location.hash.split('/')[3]; return viewSummary(dom(d) && D.lessons && D.lessons[d] ? d : 1); }
    const doneN = COURSE.filter(l => isDone(l.id)).length;
    const nl = nextLesson();
    const tabs = `<div class="tabs"><a class="btn on" href="#/learn">📚 Khóa học</a><a class="btn" href="#/learn/sum/1">📋 Tóm tắt nhanh</a></div>`;
    if (!COURSE.length) {
      $app.innerHTML = `<h1>Bài học</h1>${tabs}<div class="card">Chưa có bài học chi tiết. Xem <a href="#/learn/sum/1">Tóm tắt nhanh</a>.</div>`;
      return;
    }
    const mods = MODULES.map(m => {
      const ls = COURSE.filter(l => l.module === m.id);
      if (!ls.length) return '';
      const dn = ls.filter(l => isDone(l.id)).length;
      return `<section class="module" id="mod-${m.id}">
        <div class="row" style="justify-content:space-between"><h2 style="margin:0">${m.id === 0 ? '🌱' : m.id === 5 ? '🛠️' : 'D' + m.id + '.'} ${esc(m.vi)}</h2>
          <span class="muted small">${dn}/${ls.length} bài${m.weight ? ` · ${m.weight}% đề thi` : ''}</span></div>
        <ol class="lessons">${ls.map(l => `<li><a class="lrow ${isDone(l.id) ? 'done' : ''}" href="#/lesson/${esc(l.id)}">
          <span class="lnum">${isDone(l.id) ? '✓' : esc(l.id)}</span>
          <span class="ltitle">${esc(l.title)}</span><span class="muted small">${l.mins || ''} phút</span></a></li>`).join('')}</ol>
        ${m.id === 5 ? '<p class="muted small">Không bắt buộc cho kỳ thi, nhưng giúp nhớ lâu hơn. Luôn làm theo phần dọn dẹp ở cuối mỗi lab để tránh phát sinh chi phí.</p>' : ''}
        ${m.id >= 1 && m.id <= 4 ? `<div class="row small"><a href="#/learn/sum/${m.id}">📋 Tóm tắt nhanh</a><a href="#/practice/${m.id}">✍️ Luyện câu hỏi Domain ${m.id}</a></div>` : ''}
      </section>`;
    }).join('');
    $app.innerHTML = `<h1>Bài học</h1>${tabs}
      <div class="card">
        <div class="row" style="justify-content:space-between"><b>Tiến độ khóa học: ${doneN}/${COURSE.length} bài</b>
          ${nl ? `<a class="btn primary" href="#/lesson/${esc(nl.id)}">${doneN ? 'Học tiếp' : 'Bắt đầu học'}: bài ${esc(nl.id)} →</a>` : '<span>🎉 Đã học hết!</span>'}</div>
        <div class="bar" style="margin-top:10px"><i style="width:${doneN / COURSE.length * 100}%"></i></div>
        <p class="muted small" style="margin-bottom:0">Gợi ý: học theo thứ tự từ phần Nền tảng. Mỗi bài có phần luyện câu hỏi liên quan ở cuối. Bài học xong sẽ có dấu ✓.</p>
      </div>${mods}`;
    if (arg && document.getElementById('mod-' + arg)) document.getElementById('mod-' + arg).scrollIntoView();
  }

  function viewSummary(d) {
    $app.innerHTML = `<h1>Bài học</h1>
      <div class="tabs"><a class="btn" href="#/learn">📚 Khóa học</a><a class="btn on" href="#/learn/sum/1">📋 Tóm tắt nhanh</a></div>
      <div class="tabs">${D.domains.map(x => `<a class="btn ${x.id === d ? 'on' : ''}" href="#/learn/sum/${x.id}">D${x.id}. ${esc(x.vi)}</a>`).join('')}</div>
      <p class="muted small">Bảng tóm tắt để ôn lại sau khi đã học bài chi tiết. ${esc(dom(d).en)} · ${dom(d).weight}% đề thi</p>
      ${((D.lessons || {})[d] || []).map(l => `<div class="card lesson"><h3>${esc(l.t)}</h3><div class="scroll-x">${l.h}</div></div>`).join('')}
      <a class="btn primary" href="#/practice/${d}">Luyện câu hỏi Domain ${d} →</a>`;
  }

  function viewLesson(id) {
    const i = COURSE.findIndex(l => l.id === id);
    const l = COURSE[i];
    if (!l) { $app.innerHTML = `<div class="card">Không tìm thấy bài học. <a href="#/learn">Về danh sách</a></div>`; return; }
    const prev = COURSE[i - 1], next = COURSE[i + 1];
    const qs = (l.qids || []).filter(q => QBY.has(q) && qItem(q)).map(q => QBY.get(q));
    const draw = () => {
      const done = isDone(l.id);
      const avail = availQs(qs).length, nd = nextDueIn(S.cards, qs.map(q => 'q:' + q.id));
      $app.innerHTML = `
        <div class="crumb small"><a href="#/learn">Bài học</a> › <a href="#/learn/${l.module}">${modName(l.module)}</a> › Bài ${esc(l.id)}</div>
        <article class="lesson-page">
          <h1>${esc(l.title)}</h1>
          <div class="muted small">⏱ ${l.mins || '?'} phút đọc${qs.length ? ` · ✍️ ${qs.length} câu luyện tập` : ''}${done ? ' · <span style="color:var(--ok)">✓ Đã học</span>' : ''}</div>
          ${(l.goals || []).length ? `<div class="box goals"><b>🎯 Sau bài này bạn sẽ</b><ul>${l.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul></div>` : ''}
          <div class="lesson-body">${l.html}</div>
          ${(l.summary || []).length ? `<div class="box summary"><b>📌 Tóm tắt bài</b><ul>${l.summary.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
          ${(l.terms || []).length ? `<h3>📖 Thuật ngữ trong bài</h3><div class="scroll-x"><table><tr><th>English</th><th>Tiếng Việt</th></tr>
            ${l.terms.map(([en, vi]) => `<tr><td><b>${esc(en)}</b></td><td>${esc(vi)}</td></tr>`).join('')}</table></div>` : ''}
          <div class="card lesson-end">
            <div class="row">
              <button class="btn ${done ? '' : 'primary'}" data-a="done">${done ? '↩︎ Bỏ đánh dấu đã học' : '✓ Đánh dấu đã học'}</button>
              ${avail ? `<button class="btn ${done ? 'primary' : ''}" data-a="quiz">✍️ Luyện ${avail === qs.length ? avail : avail + '/' + qs.length} câu của bài này</button>` : ''}
            </div>
            ${qs.length && avail < qs.length ? `<p class="muted small quiz-note">${avail ? `${qs.length - avail} câu còn lại đã học và chưa đến hạn ôn.` : `Cả ${qs.length} câu của bài này đã học và chưa đến hạn ôn.`}${nd ? ` Câu tiếp theo đến hạn: <b>${fmtWhen(nd)}</b>.` : ''} Muốn luyện thêm: <a href="#/review/free">Luyện tập tự do</a>.</p>` : ''}
            <div class="row" style="justify-content:space-between;margin-top:12px">
              ${prev ? `<a href="#/lesson/${esc(prev.id)}" class="small">← ${esc(prev.id)}. ${esc(prev.title)}</a>` : '<span></span>'}
              ${next ? `<a href="#/lesson/${esc(next.id)}" class="small" style="text-align:right">${esc(next.id)}. ${esc(next.title)} →</a>` : ''}
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
      if (b.dataset.a === 'quiz') startPractice(qs, 'Luyện bài ' + l.id, {}, '#/lesson/' + l.id);
    };
  }

  function viewGlossary() {
    $app.innerHTML = `<h1>Từ vựng</h1>
      <input type="text" id="q" placeholder="Tìm (Anh hoặc Việt)..." style="width:100%;margin-bottom:12px">
      <div id="gl"></div>`;
    const draw = f => {
      f = f.toLowerCase();
      const m = (...s) => !f || s.join(' ').toLowerCase().includes(f);
      const g = D.glossary.filter(x => m(x.term, x.vi, x.hint));
      const s = D.services.filter(x => m(x.name, x.vi, x.confuse));
      document.getElementById('gl').innerHTML = `
        <h2>Từ khóa trong đề (${g.length})</h2><div class="card scroll-x"><table><tr><th>English</th><th>Tiếng Việt</th><th>Gợi ý</th></tr>
        ${g.map(x => `<tr><td><b>${esc(x.term)}</b></td><td>${esc(x.vi)}</td><td class="muted">${esc(x.hint)}</td></tr>`).join('')}</table></div>
        <h2>Dịch vụ AWS (${s.length})</h2><div class="card scroll-x"><table><tr><th>Dịch vụ</th><th>Chức năng</th><th>Hay nhầm với</th></tr>
        ${s.map(x => `<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.vi)}</td><td class="muted">${esc(x.confuse)}</td></tr>`).join('')}</table></div>`;
    };
    draw('');
    document.getElementById('q').oninput = e => draw(e.target.value);
  }

  function viewSettings() {
    const st = S.settings;
    const L = [['bi', 'Song ngữ', 'Luôn hiện tiếng Anh và tiếng Việt (tuần 1–2)'],
               ['en-first', 'Ưu tiên tiếng Anh', 'Hiện tiếng Anh, bấm để xem bản dịch (tuần 3–4)'],
               ['en-only', 'Chỉ tiếng Anh', 'Như thi thật, chỉ xem bản dịch sau khi trả lời (tuần 5–6)']];
    $app.innerHTML = `<h1>Cài đặt</h1>
      <div class="card"><h3 style="margin-top:0">Chế độ ngôn ngữ</h3>
        ${L.map(([v, t, d]) => `<label class="radio"><input type="radio" name="lang" value="${v}" ${st.lang === v ? 'checked' : ''}> <b>${t}</b> <span class="muted small">· ${d}</span></label>`).join('')}
        <label class="radio"><input type="checkbox" id="kw" ${st.kw ? 'checked' : ''}> Tô màu từ khóa trong đề</label></div>
      <div class="card"><h3 style="margin-top:0">Lịch học</h3>
        <div class="row"><label>Số thẻ mới mỗi ngày: <input type="number" id="npd" min="0" max="100" value="${esc(st.newPerDay)}" style="width:80px"></label></div>
        <div class="row" style="margin-top:10px"><label>Ngày thi: <input type="date" id="exam" value="${esc(st.examDate)}"></label></div></div>
      ${pwaCard()}
      <div class="card"><h3 style="margin-top:0">Dữ liệu</h3>
        <p class="muted small">Tiến độ chỉ lưu trên trình duyệt này. Hãy xuất file để sao lưu hoặc chuyển sang máy khác.</p>
        <div class="row"><button class="btn" id="exp">Xuất dữ liệu (.json)</button>
          <label class="btn">Nhập dữ liệu<input type="file" id="imp" accept=".json,application/json" hidden></label>
          <button class="btn" id="reset" style="color:var(--bad)">Xóa toàn bộ tiến độ</button></div>
        <p id="msg" class="small"></p></div>`;
    const msg = t => { document.getElementById('msg').textContent = t; };
    bindPwaCard();
    $app.querySelectorAll('[name=lang]').forEach(r => r.onchange = () => { st.lang = r.value; save(); msg('Đã lưu.'); });
    document.getElementById('kw').onchange = e => { st.kw = e.target.checked; save(); msg('Đã lưu.'); };
    document.getElementById('npd').onchange = e => {
      const v = parseInt(e.target.value, 10);
      if (!Number.isFinite(v)) { e.target.value = st.newPerDay; msg('Giữ nguyên ' + st.newPerDay + ' thẻ/ngày (ô trống không hợp lệ).'); return; }
      st.newPerDay = Math.max(0, Math.min(100, v)); e.target.value = st.newPerDay; save(); msg('Đã lưu.');
    };
    document.getElementById('exam').onchange = e => { st.examDate = e.target.value; save(); msg('Đã lưu.'); };
    document.getElementById('exp').onclick = () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
      a.download = `clf-c02-progress-${today()}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    document.getElementById('imp').onchange = e => {
      const input = e.target, f = input.files[0]; if (!f) return;
      f.text().then(t => {
        const d = JSON.parse(t);
        if (!isObj(d) || !isObj(d.cards)) throw new Error('bad');
        const next = normalize(d);   // chuẩn hóa trước khi ghi, tránh dữ liệu hỏng làm trắng trang
        S = next; save();
        viewSettings(); msg('✅ Đã nhập dữ liệu.');
      }).catch(() => { input.value = ''; msg('❌ File không hợp lệ.'); });
    };
    document.getElementById('reset').onclick = () => {
      if (!confirm('Xóa toàn bộ tiến độ học (thẻ SRS, lịch Luyện tập tự do, thống kê, bài đã học, lịch sử thi thử, bài thi dở)? Cài đặt được giữ lại. Không thể hoàn tác.')) return;
      const keep = S.settings; S = clone(DEFAULTS); S.settings = keep;
      clearInterval(examTimer); examTimer = null;
      save(); viewSettings(); msg('Đã xóa tiến độ.');
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
    return p >= READY * 100 ? ['ok', '✅ Đạt ngưỡng an toàn (≥ 80%)']
      : p >= 70 ? ['warn', '⚠️ Sát ngưỡng: đề thật có thể khó hơn, cần ôn thêm']
      : ['no', '❌ Chưa đạt: hãy ôn lại các domain yếu'];
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
      return `<tr><td><a href="#/exam/r${i}">${new Date(r.date).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</a></td>
      <td><b class="v-${v[0]}">${p}%</b></td><td>${esc(r.correct)}/${esc(r.n)}</td>
      <td>${r.fresh != null ? `${esc(r.fresh)}/${esc(r.n)}${isFreshExam(r) ? '' : ' <span class="muted small">(không tính sẵn sàng)</span>'}` : '—'}</td><td>${fmtTime(r.used)}</td></tr>`; }).join('');
    const poolSeen = POOL.filter(q => seenCount(q.id) > 0).length;
    const freshLeft = freshExamsLeft();
    const rd = readiness();
    $app.innerHTML = `<h1>Thi thử</h1>
      <div class="card">
        <p>Đề gồm <b>${n} câu</b>, làm trong <b id="mins">${examMinutes(st.esl)} phút</b>.
          ${n < EXAM_FULL ? `<span class="muted small">(Đề thật có 65 câu trong 90 phút. Ngân hàng hiện có ${D.questions.length} câu nên thời gian được tính theo tỷ lệ.)</span>` : ''}</p>
        <ul class="small">
          <li>Giống thi thật: <b>chỉ tiếng Anh</b>, không tô màu từ khóa, không xem đáp án giữa chừng.</li>
          <li>Đề ưu tiên lấy từ <b>kho đề riêng ${POOL.length} câu</b>. Các câu này <b>không xuất hiện</b> khi luyện tập hay ôn SRS, nên kết quả phản ánh năng lực thật chứ không phải trí nhớ. Bạn đã gặp ${poolSeen}/${POOL.length} câu trong các lần thi trước.</li>
          <li>${freshLeft > 0
            ? `Kho còn đủ câu chưa gặp cho <b>${freshLeft} đề hoàn toàn mới</b>.`
            : '<b>Đã hết đề hoàn toàn mới</b>: các đề tiếp theo sẽ lặp lại câu bạn đã gặp, điểm có thể cao hơn năng lực thật.'}
            Mỗi đề làm xong sẽ “tiêu” các câu mới đó, nên hãy <b>để dành đề mới cho giai đoạn cuối</b> (1–2 tuần trước ngày thi) để đo mức sẵn sàng; giai đoạn đầu nên dùng Luyện tập và Ôn hôm nay.</li>
          <li>Có thể <b>đánh dấu</b> câu để xem lại và chuyển qua lại giữa các câu. Hết giờ thì bài tự nộp.</li>
          <li>Kết quả tính bằng <b>% câu đúng</b>. Đề thật dùng thang điểm scaled (đậu 700/1000) và có thể khó hơn, nên hãy nhắm <b>≥ 80%</b>.</li>
        </ul>
        <label class="radio"><input type="checkbox" id="esl" ${st.esl ? 'checked' : ''}> Áp dụng chế độ <b>ESL +30 phút</b> (nếu bạn đăng ký hỗ trợ này khi đặt lịch thi)</label>
        <button class="btn primary" id="start" style="margin-top:8px">Bắt đầu thi</button>
      </div>
      ${readyCard(rd)}
      <h2>Lịch sử thi thử</h2>
      ${hist ? `<div class="card scroll-x"><table><tr><th>Thời gian</th><th>% đúng</th><th>Đúng</th><th>Câu mới gặp</th><th>Thời gian làm</th></tr>${hist}</table>
        <p class="note">“Câu mới gặp”: số câu bạn gặp lần đầu trong bài thi đó. Nếu thấp, điểm có thể cao hơn năng lực thật vì bạn đã nhớ đáp án.</p></div>`
             : '<p class="muted">Chưa có bài thi nào.</p>'}`;
    document.getElementById('esl').onchange = e => { st.esl = e.target.checked; save(); document.getElementById('mins').textContent = examMinutes(st.esl) + ' phút'; };
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
      $app.innerHTML = `<div class="card">Bài thi đang làm dở không còn câu hỏi hợp lệ (ngân hàng câu hỏi đã được cập nhật), nên đã được hủy. <a href="#/exam">Bắt đầu bài thi mới</a></div>`;
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
        <div class="card exambar"><b>Câu ${E.cur + 1}/${n}</b>
          <span id="timer" class="timer ${remaining() < 5 * MIN ? 'low' : ''}">⏱ ${fmtTime(remaining())}</span>
          <button class="btn" data-a="flag">${flagged ? '🚩 Bỏ đánh dấu' : '🏳️ Đánh dấu'}</button></div>
        <div class="card ${need > 1 ? 'multi' : ''}">
          <div class="qtext">${esc(q.en)}</div>
          <ul class="opts">${E.order[id].map((oi, k) => `<li class="opt ${sel.includes(oi) ? 'sel' : ''}" data-i="${oi}">
            <span class="mark">${String.fromCharCode(65 + k)}</span><div>${esc(q.opts[oi][0])}</div></li>`).join('')}</ul>
          <div class="row"><button class="btn" data-a="prev" ${E.cur ? '' : 'disabled'}>← Câu trước</button>
            <button class="btn primary" data-a="next" ${E.cur < n - 1 ? '' : 'disabled'}>Câu sau →</button>
            <span class="muted small">Phím: A–${String.fromCharCode(64 + E.order[id].length)} chọn · ←/→ chuyển câu · M đánh dấu</span></div>
        </div>
        <div class="card">
          <div class="muted small">Bảng câu hỏi · Đã trả lời đủ ${answered}/${n} · Đánh dấu ${E.flag.length}${partialIds(E).length ? ` · Chọn chưa đủ ${partialIds(E).length} (viền nét đứt)` : ''}</div>
          <div class="qnav">${E.ids.map((x, i) => `<button class="${i === E.cur ? 'cur' : ''} ${isFull(x) ? 'ans' : (E.ans[x] || []).length ? 'part' : ''} ${E.flag.includes(x) ? 'flag' : ''}" data-j="${i}">${i + 1}</button>`).join('')}</div>
          <div class="row" style="margin-top:14px"><button class="btn primary" data-a="submit">Nộp bài</button>
            <button class="btn" data-a="quit" style="color:var(--bad)">Hủy bài thi</button></div>
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
        const msg = (left ? `Còn ${left} câu chưa trả lời. ` : '') + (part ? `Có ${part} câu chọn nhiều đáp án nhưng chưa chọn đủ số lượng. ` : '') + (E.flag.length ? `Có ${E.flag.length} câu đang đánh dấu. ` : '') + 'Nộp bài?';
        if (confirm(msg)) examSubmit(false);
      }
      if (a === 'quit' && confirm('Hủy bài thi này? Kết quả sẽ không được lưu.')) {
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
    return `<div class="card ready ${rd.ready ? 'yes' : ''}"><b>${rd.ready ? '🎯 Sẵn sàng đi thi' : '🎯 Mức sẵn sàng'}</b>
      <div class="dots">${dots}</div>
      <p class="small muted" style="margin:6px 0 0">${rd.ready
        ? 'Bạn đã đạt ≥ 80% ở 3 đề mới gần nhất. Hãy thử thêm Official Practice Question Set trên AWS Skill Builder trước khi đăng ký thi.'
        : `Mục tiêu: đạt ≥ 80% ở <b>3 đề mới liên tiếp</b> (hiện ${rd.ok}/${rd.last.length || 0} đề gần nhất đạt).`}</p>
      <p class="small muted" style="margin:6px 0 0">Chỉ tính các đề có <b>ít nhất một nửa số câu là câu mới gặp lần đầu</b>; đề lặp lại nhiều câu cũ đo trí nhớ hơn là năng lực.${rd.skipped ? ` ${rd.skipped} đề trong lịch sử không được tính vì vậy.` : ''}</p></div>`;
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
    if (!R) { $app.innerHTML = `<div class="card">Không tìm thấy bài thi. <a href="#/exam">Quay lại</a></div>`; return; }
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
      return `<tr><td>D${d.id}. ${esc(d.vi)}</td><td>${p.c}/${p.t}</td><td style="width:40%"><div class="bar"><i style="width:${pc}%;background:${pc >= 70 ? 'var(--ok)' : 'var(--bad)'}"></i></div></td><td><b>${pc}%</b></td></tr>`;
    }).join('');
    draw();
    function draw() {
      const ids = R.ids.map((id, k) => [id, k]).filter(([id]) => filter === 'all' || (filter === 'wrong' ? wrongIds.includes(id) : R.flag.includes(id)));
      const list = ids.map(([id, k]) => {
        const q = QBY.get(id), a = R.ans[id] || [], ok = sameAns(q, a);
        const opts = R.order[id].map((oi, j) => {
          const right = q.ans.includes(oi), picked = a.includes(oi);
          return `<li class="opt ${right ? 'right' : picked ? 'wrong' : ''}"><span class="mark">${right ? '✓' : picked ? '✗' : String.fromCharCode(65 + j)}</span>
            <div>${esc(q.opts[oi][0])}${showVi ? `<div class="vi">${esc(q.opts[oi][1])}</div>` : ''}<div class="why">${esc(q.why[oi] || '')}</div></div></li>`;
        }).join('');
        return `<div class="card done ${q.ans.length > 1 ? 'multi' : ''}">
          <div class="qmeta"><span>Câu ${k + 1} · Domain ${q.d} ${R.flag.includes(id) ? '· 🚩' : ''}</span><span>${ok ? '✅ Đúng' : a.length ? '❌ Sai' : '⚪ Bỏ trống'}</span></div>
          <div class="qtext">${hl(q.en)}</div>${showVi ? `<div class="vi">${esc(q.vi)}</div>` : ''}
          <ul class="opts">${opts}</ul><div class="result ${ok ? 'ok' : 'no'}">${esc(q.exp)}</div></div>`;
      }).join('') || '<p class="muted">Không có câu nào.</p>';
      $app.innerHTML = `
        <div class="card" style="text-align:center">
          <div class="muted small">${new Date(R.date).toLocaleString('vi-VN')}${R.auto ? ' · tự nộp khi hết giờ' : ''}</div>
          <div class="score v-${v[0]}">${p100}<small>% đúng</small></div>
          <h2 style="margin:4px 0">${v[1]}</h2>
          <p>Đúng <b>${esc(R.correct)}/${esc(R.n)}</b> câu · Thời gian làm ${fmtTime(R.used)}${R.fresh != null ? ` · Câu mới gặp lần đầu: <b>${esc(R.fresh)}/${esc(R.n)}</b>` : ''}</p>
          <p class="note">Quy đổi thô theo thang 1000 ≈ ${esc(R.score)} điểm, chỉ để tham khảo. Đề thật dùng thang scaled (đậu ${PASS}) và có thể khó hơn, nên hãy nhắm ≥ 80% ở 3 đề liên tiếp.${R.fresh != null && R.fresh < R.n / 2 ? ' ⚠️ Đề này có nhiều câu bạn đã gặp, nên kết quả có thể cao hơn năng lực thật và không được tính vào mức sẵn sàng.' : ''}</p>
          <div class="row" style="justify-content:center">
            <a class="btn primary" href="#/exam">Thi lại</a>
            ${drillIds.length ? `<button class="btn" data-a="drill">Ôn ngay ${drillIds.length} câu sai (câu luyện tập)</button>` : ''}
          </div>
        </div>
        ${i === 0 ? readyCard(readiness()) : ''}
        <h2>Kết quả theo domain</h2>
        <div class="card scroll-x"><table>${domRows}</table><p class="note">Domain nào dưới 70% thì nên học lại bài học của domain đó.</p>
          ${weakTasks.length ? `<h3 style="margin:14px 0 6px">Task cần ôn thêm</h3><ul class="small">${weakTasks.map(r => `<li><b>Task ${r.t}</b> ${esc(TASKS[r.t])}: ${r.c}/${r.n} câu đúng (${r.p}%) · <a href="#/practice/t-${r.t}">Luyện task này</a></li>`).join('')}</ul>` : ''}</div>
        <h2>Xem lại bài làm</h2>
        <div class="row" style="margin-bottom:12px">
          <div class="tabs" style="margin:0">
            <button class="btn ${filter === 'all' ? 'on' : ''}" data-f="all">Tất cả (${R.ids.length})</button>
            <button class="btn ${filter === 'wrong' ? 'on' : ''}" data-f="wrong">Sai / bỏ trống (${wrongIds.length})</button>
            <button class="btn ${filter === 'flag' ? 'on' : ''}" data-f="flag">Đã đánh dấu (${R.flag.length})</button>
          </div>
          <label><input type="checkbox" id="vi" ${showVi ? 'checked' : ''}> Hiện tiếng Việt</label>
        </div>${list}`;
      document.getElementById('vi').onchange = e => { showVi = e.target.checked; draw(); };
    }
    $app.onclick = e => {
      const f = e.target.closest('[data-f]'); if (f) { filter = f.dataset.f; draw(); return; }
      const b = e.target.closest('[data-a="drill"]');
      if (b) startPractice(drillIds.map(id => QBY.get(id)).filter(q => qItem(q.id)), 'Ôn câu sai sau thi thử', {}, '#/exam/r' + i);
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
    bar.innerHTML = '<span>🔄 Có nội dung mới</span><button>Cập nhật</button>';
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
    if (isStandalone()) body = '<p>✅ Bạn đang dùng bản đã cài. Ứng dụng chạy được offline.</p>';
    else if (installEvt) body = '<p>Cài website thành ứng dụng trên máy để mở nhanh từ màn hình chính và dùng offline.</p><button class="btn primary" id="install">📲 Cài ứng dụng</button>';
    else if (isIOS()) body = '<p>Trên iPhone/iPad: mở trang này bằng <b>Safari</b> → bấm nút <b>Chia sẻ</b> (ô vuông có mũi tên lên) → chọn <b>“Thêm vào MH chính”</b>.</p>';
    else body = '<p>Trên Android: mở bằng <b>Chrome</b> → menu <b>⋮</b> → <b>“Cài đặt ứng dụng”</b> hoặc <b>“Thêm vào màn hình chính”</b>. Trên máy tính: bấm biểu tượng cài đặt ở thanh địa chỉ.</p>';
    const sw = 'serviceWorker' in navigator && navigator.serviceWorker.controller;
    return `<div class="card"><h3 style="margin-top:0">📱 Ứng dụng & offline</h3>${body}
      <p class="muted small">${sw ? '✓ Đã lưu sẵn nội dung để dùng offline.' : 'Chế độ offline chỉ hoạt động khi mở qua HTTPS (ví dụ GitHub Pages).'}
      Nội dung mới sẽ tự tải về khi có mạng.</p>
      ${sw ? '<button class="btn" id="refresh">🔄 Tải lại nội dung mới nhất</button>' : ''}</div>`;
  }
  function bindPwaCard() {
    const ins = document.getElementById('install');
    if (ins) ins.onclick = async () => { installEvt.prompt(); await installEvt.userChoice.catch(() => {}); installEvt = null; route(); };
    const rf = document.getElementById('refresh');
    if (rf) rf.onclick = async () => {
      if (!navigator.onLine) { alert('Bạn đang offline. Hãy kết nối mạng rồi thử lại.'); return; }
      const keys = await caches.keys(); await Promise.all(keys.filter(k => k.startsWith('clf-c02-')).map(k => caches.delete(k)));
      const reg = await navigator.serviceWorker.getRegistration(); if (reg) await reg.unregister();
      location.reload();
    };
  }

  /* ───────── Router ───────── */
  const ROUTES = { '': viewHome, review: viewReview, practice: viewPractice, exam: viewExam, learn: viewLearn, lesson: viewLesson, glossary: viewGlossary, settings: viewSettings };
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  function route() {
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
    $app.innerHTML = `<div class="card"><h2 style="margin-top:0">⚠️ Ứng dụng gặp lỗi khi hiển thị</h2>
      <p>Có thể dữ liệu tiến độ trên trình duyệt này bị hỏng (ví dụ do nhập file không đúng định dạng).</p>
      <p class="muted small">Chi tiết: ${esc(err && err.message || err)}</p>
      <div class="row"><a class="btn" href="#/">Thử lại trang chủ</a>
        <button class="btn" id="rcExp">Tải bản sao dữ liệu hiện tại</button>
        <button class="btn" id="rcReset" style="color:var(--bad)">Xóa dữ liệu và bắt đầu lại</button></div></div>`;
    document.getElementById('rcExp').onclick = () => {
      let raw = ''; try { raw = localStorage.getItem(KEY) || ''; } catch (e) { /* ignore */ }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
      a.download = `clf-c02-backup-${today()}.json`; a.click();
    };
    document.getElementById('rcReset').onclick = () => {
      if (!confirm('Xóa toàn bộ dữ liệu tiến độ trên trình duyệt này?')) return;
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      S = clone(DEFAULTS); save(); location.hash = '#/'; route();
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
  try { updateBadge(); } catch (err) { /* badge không quan trọng */ }
  route();
})();
