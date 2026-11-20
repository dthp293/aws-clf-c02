(() => {
  'use strict';
  const D = window.CLF;
  const KEY = 'clf-c02-study-v1';
  const MIN = 60e3, DAY = 864e5;
  const $app = document.getElementById('app');
  const tip = document.getElementById('tip');

  /* ───────── State (localStorage) ───────── */
  const DEFAULTS = {
    cards: {},          // id → trạng thái SRS
    stats: {},          // questionId → { a: số lần trả lời, c: số lần đúng }
    settings: { lang: 'en-first', newPerDay: 15, kw: true, examDate: '', esl: false },
    newLog: { date: '', count: 0 },
    activity: {},       // 'YYYY-MM-DD' → số lượt ôn
    done: {},           // lessonId → thời điểm đánh dấu đã học
    exam: null,         // bài thi thử đang làm dở
    exams: []           // lịch sử thi thử (mới nhất trước)
  };
  let S = load();
  function load() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { /* ignore */ }
    if (!s || typeof s !== 'object') s = {};
    const base = JSON.parse(JSON.stringify(DEFAULTS));
    return { ...base, ...s, settings: { ...base.settings, ...(s.settings || {}) } };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
    updateBadge();
  }

  /* ───────── Helpers ───────── */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const today = () => ymd(new Date());
  const startOfDay = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
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
      else if (c.reps === 1) c.ivl = g === 2 ? 2 : g === 3 ? 4 : 7;
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

  function grade(id, g) {
    const isNew = !S.cards[id];
    S.cards[id] = nextCard(S.cards[id], g);
    if (isNew) {
      if (S.newLog.date !== today()) S.newLog = { date: today(), count: 0 };
      S.newLog.count++;
    }
    S.activity[today()] = (S.activity[today()] || 0) + 1;
    save();
  }
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
    let n = 0; const d = new Date();
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
    `<button class="btn ${GL[g][1]}" data-g="${g}">${GL[g][0]}<small>${fmtIvl(nextCard(S.cards[id], g))}</small></button>`).join('')}</div>`;

  /* ───────── Session ───────── */
  function runSession(items, title) {
    const st = { queue: items.slice(), i: 0, right: 0, wrong: 0, again: {} };
    next();
    function next() {
      if (st.i >= st.queue.length) return finish();
      const it = st.queue[st.i];
      const header = `<div class="progress">${esc(title)} · ${st.i + 1}/${st.queue.length}</div>`;
      const done = (g, ok) => {
        if (ok === true) st.right++;
        if (ok === false) st.wrong++;
        if (g === 1 && (st.again[it.id] || 0) < 2) { st.again[it.id] = (st.again[it.id] || 0) + 1; st.queue.push(it); }
        st.i++; next();
      };
      (it.type === 'q' ? renderQuestion : renderFlash)(it, header, done);
      window.scrollTo(0, 0);
    }
    function finish() {
      onKey = null;
      const ans = st.right + st.wrong;
      $app.innerHTML = `<div class="card" style="text-align:center">
        <h1>🎉 Xong phiên “${esc(title)}”</h1>
        <p>Đã ôn <b>${st.queue.length}</b> lượt${ans ? ` · Câu hỏi: <b>${st.right}</b> đúng / <b>${st.wrong}</b> sai` : ''}.</p>
        <p class="muted small">Thẻ trả lời sai sẽ quay lại sớm. Thẻ đúng sẽ giãn dần khoảng cách ôn.</p>
        <div class="row" style="justify-content:center"><a class="btn primary" href="#/">Về trang chủ</a><a class="btn" href="#/practice">Luyện tập thêm</a></div></div>`;
    }
  }

  function renderQuestion(it, header, done) {
    const q = it.ref, multi = q.ans.length > 1, need = q.ans.length;
    const order = shuffle(q.opts.map((_, i) => i));
    const lang = S.settings.lang, isNew = !S.cards[it.id];
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
          <span class="muted small">Phím: A–E chọn · Enter kiểm tra</span></div>`;
      } else if (ok) {
        bottom = `<div class="result ok">✅ <b>Chính xác!</b> ${esc(q.exp)}</div>
          <div class="muted small">Bạn thấy câu này thế nào? (Enter = Tốt)</div>${gradeBtns(it.id, [2, 3, 4])}<div class="row" style="margin-top:10px">${viBtn}</div>`;
      } else {
        bottom = `<div class="result no">❌ <b>Chưa đúng.</b> ${esc(q.exp)}<div class="small muted" style="margin-top:4px">Câu này sẽ quay lại sau 10 phút.</div></div>
          <div class="row"><button class="btn primary" data-a="next">Tiếp tục (Enter)</button>${viBtn}</div>`;
      }
      $app.innerHTML = `${header}<div class="card ${multi ? 'multi' : ''} ${answered ? 'done' : ''}">
        <div class="qmeta"><span>Domain ${q.d} · ${esc(dom(q.d).vi)}</span>
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
    const r = it.ref, isV = it.type === 'v', isNew = !S.cards[it.id];
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
    const ex = S.settings.examDate ? Math.ceil((new Date(S.settings.examDate + 'T00:00').getTime() - startOfDay(Date.now())) / DAY) : null;
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
        ${(S.exams || []).length ? `<a class="card stat" style="text-decoration:none" href="#/exam/r0"><b style="color:${S.exams[0].score >= 700 ? 'var(--ok)' : 'var(--bad)'}">${S.exams[0].score}</b><span class="muted small">điểm thi thử gần nhất</span></a>` : ''}
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
      <h2>Tiến độ theo domain</h2>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${domains}</div>
      <h2>Cách dùng</h2>
      <div class="card small">
        <p>📅 <b>Ôn hôm nay</b> trộn câu hỏi, từ vựng đề thi và thẻ dịch vụ theo <b>lặp lại ngắt quãng (SRS)</b>. Thẻ trả lời sai quay lại sau 10 phút. Thẻ đúng giãn dần thành 1, 4, 10... ngày.</p>
        <p>🟨 Từ <span class="kw" tabindex="0" data-k="most cost-effective">được tô màu</span> trong đề là từ khóa quan trọng. Rê chuột hoặc chạm vào để xem nghĩa tiếng Việt và gợi ý.</p>
        <p>🌐 Vào <a href="#/settings">Cài đặt</a> để chuyển chế độ ngôn ngữ: <i>Song ngữ</i> → <i>Ưu tiên tiếng Anh</i> → <i>Chỉ tiếng Anh</i>.</p>
        <p class="muted">Tiến độ chỉ lưu trên trình duyệt này. Dùng Cài đặt → Xuất dữ liệu để sao lưu.</p>
      </div>`;
  }

  function viewReview() {
    const q = [...dueItems(), ...newItems(newLeft())];
    if (q.length) return runSession(q, 'Ôn hôm nay');
    const dues = Object.values(S.cards).map(c => c.due).filter(Boolean);
    const nextDue = dues.length ? new Date(Math.min(...dues)) : null;
    const remainNew = ITEMS.filter(i => !S.cards[i.id]).length;
    $app.innerHTML = `<div class="card" style="text-align:center"><h1>🎉 Hôm nay đã ôn xong!</h1>
      <p class="muted">${nextDue ? `Thẻ tiếp theo đến hạn: <b>${nextDue.toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' })}</b>` : ''}</p>
      <div class="row" style="justify-content:center">
        ${remainNew ? `<button class="btn primary" id="more">Học thêm 10 thẻ mới</button>` : ''}
        <a class="btn" href="#/practice">Luyện tập tự do</a></div>
      <p class="muted small">Còn ${remainNew} thẻ chưa học.</p></div>`;
    const m = document.getElementById('more');
    if (m) m.onclick = () => runSession(newItems(10), 'Thẻ mới thêm');
  }

  function viewPractice(arg) {
    if (arg) {
      let qs, title;
      if (arg === 'all') { qs = D.questions; title = 'Tất cả domain'; }
      else if (arg === 'hard') { qs = D.questions.filter(q => q.lvl === 2); title = 'Câu nâng cao'; }
      else if (arg === 'multi') { qs = D.questions.filter(q => q.ans.length > 1); title = 'Câu chọn nhiều đáp án'; }
      else if (arg === 'weak') { qs = D.questions.filter(q => { const s = S.stats[q.id]; return s && s.c / s.a < 0.7; }); title = 'Câu hay sai'; }
      else { qs = D.questions.filter(q => q.d === +arg); title = 'Domain ' + arg; }
      if (!qs.length) { $app.innerHTML = `<div class="card">Chưa có câu nào ở mục này. <a href="#/practice">Quay lại</a></div>`; return; }
      return runSession(shuffle(qs).map(q => ITEMS.find(i => i.id === 'q:' + q.id)), title);
    }
    const weak = D.questions.filter(q => { const s = S.stats[q.id]; return s && s.c / s.a < 0.7; }).length;
    $app.innerHTML = `<h1>Luyện tập</h1>
      <p class="muted">Luyện câu hỏi theo domain. Kết quả vẫn được ghi vào lịch SRS.</p>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
      ${D.domains.map(d => { const s = domStats(d.id); return `<a class="card dom" style="text-decoration:none" href="#/practice/${d.id}">
        <h3>D${d.id}. ${esc(d.vi)}</h3><span class="muted small">${s.total} câu · đúng ${s.acc === null ? '—' : s.acc + '%'}</span></a>`; }).join('')}
      <a class="card dom" style="text-decoration:none" href="#/practice/all"><h3>🔀 Trộn tất cả</h3><span class="muted small">${D.questions.length} câu</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/weak"><h3>🎯 Câu hay sai</h3><span class="muted small">${weak} câu (tỷ lệ đúng dưới 70%)</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/hard"><h3>🔥 Câu nâng cao</h3><span class="muted small">${D.questions.filter(q => q.lvl === 2).length} câu gần độ khó đề thật</span></a>
      <a class="card dom" style="text-decoration:none" href="#/practice/multi"><h3>☑️ Câu chọn nhiều đáp án</h3><span class="muted small">${D.questions.filter(q => q.ans.length > 1).length} câu (Choose TWO)</span></a>
      </div>`;
  }

  /* ───────── Khóa học ───────── */
  const MODULES = [{ id: 0, vi: 'Nền tảng IT cho người mới', en: 'Start here' }, ...D.domains];
  const lessonNum = l => parseInt(String(l.id).split('-')[1], 10) || 0;
  const COURSE = (D.course || []).slice().sort((a, b) => a.module - b.module || lessonNum(a) - lessonNum(b));
  const isDone = id => !!(S.done && S.done[id]);
  const nextLesson = () => COURSE.find(l => !isDone(l.id));
  const modName = m => m === 0 ? 'Nền tảng' : 'Domain ' + m;

  function viewLearn(arg) {
    // #/learn            → lộ trình khóa học
    // #/learn/<d>        → lộ trình, cuộn tới module d
    // #/learn/sum/<d>    → tóm tắt nhanh (bảng ôn tập)
    if (arg === 'sum') return viewSummary(+location.hash.split('/')[3] || 1);
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
        <div class="row" style="justify-content:space-between"><h2 style="margin:0">${m.id === 0 ? '🌱' : 'D' + m.id + '.'} ${esc(m.vi)}</h2>
          <span class="muted small">${dn}/${ls.length} bài${m.weight ? ` · ${m.weight}% đề thi` : ''}</span></div>
        <ol class="lessons">${ls.map(l => `<li><a class="lrow ${isDone(l.id) ? 'done' : ''}" href="#/lesson/${esc(l.id)}">
          <span class="lnum">${isDone(l.id) ? '✓' : esc(l.id)}</span>
          <span class="ltitle">${esc(l.title)}</span><span class="muted small">${l.mins || ''} phút</span></a></li>`).join('')}</ol>
        ${m.id ? `<div class="row small"><a href="#/learn/sum/${m.id}">📋 Tóm tắt nhanh</a><a href="#/practice/${m.id}">✍️ Luyện câu hỏi Domain ${m.id}</a></div>` : ''}
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
      ${D.lessons[d].map(l => `<div class="card lesson"><h3>${esc(l.t)}</h3><div class="scroll-x">${l.h}</div></div>`).join('')}
      <a class="btn primary" href="#/practice/${d}">Luyện câu hỏi Domain ${d} →</a>`;
  }

  function viewLesson(id) {
    const i = COURSE.findIndex(l => l.id === id);
    const l = COURSE[i];
    if (!l) { $app.innerHTML = `<div class="card">Không tìm thấy bài học. <a href="#/learn">Về danh sách</a></div>`; return; }
    const prev = COURSE[i - 1], next = COURSE[i + 1];
    const qs = (l.qids || []).filter(q => QBY.has(q));
    const draw = () => {
      const done = isDone(l.id);
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
              ${qs.length ? `<button class="btn ${done ? 'primary' : ''}" data-a="quiz">✍️ Luyện ${qs.length} câu của bài này</button>` : ''}
            </div>
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
      if (b.dataset.a === 'quiz') runSession(shuffle(qs).map(q => ITEMS.find(it => it.id === 'q:' + q)), 'Luyện bài ' + l.id);
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
        <div class="row"><label>Số thẻ mới mỗi ngày: <input type="number" id="npd" min="0" max="100" value="${st.newPerDay}" style="width:80px"></label></div>
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
    document.getElementById('npd').onchange = e => { st.newPerDay = Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)); save(); msg('Đã lưu.'); };
    document.getElementById('exam').onchange = e => { st.examDate = e.target.value; save(); msg('Đã lưu.'); };
    document.getElementById('exp').onclick = () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
      a.download = `clf-c02-progress-${today()}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    document.getElementById('imp').onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => {
        const d = JSON.parse(t);
        if (!d || typeof d !== 'object' || !d.cards) throw new Error('bad');
        localStorage.setItem(KEY, t); S = load(); save(); msg('✅ Đã nhập dữ liệu.');
      }).catch(() => msg('❌ File không hợp lệ.'));
    };
    document.getElementById('reset').onclick = () => {
      if (!confirm('Xóa toàn bộ tiến độ học? Không thể hoàn tác.')) return;
      const keep = S.settings; S = load(); S.cards = {}; S.stats = {}; S.newLog = { date: '', count: 0 }; S.activity = {}; S.settings = keep;
      save(); msg('Đã xóa tiến độ.');
    };
  }

  /* ───────── Thi thử ───────── */
  const EXAM_FULL = 65;             // đề thật: 65 câu / 90 phút
  const PASS = 700;
  const QBY = new Map(D.questions.map(q => [q.id, q]));
  let examTimer = null;
  const examSize = () => Math.min(EXAM_FULL, D.questions.length);
  const examMinutes = esl => Math.round((esl ? 120 : 90) * examSize() / EXAM_FULL);
  const fmtTime = ms => {
    const s = Math.max(0, Math.round(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0');
  };
  const sameAns = (q, a) => a.length === q.ans.length && q.ans.every(i => a.includes(i));

  function pickExam() {
    const n = examSize();
    if (n === D.questions.length) return shuffle(D.questions).map(q => q.id);
    // chia số câu theo tỷ trọng domain
    // phân bổ theo phần dư lớn nhất để tổng đúng bằng n (65 câu → 16/19/22/8)
    const raw = D.domains.map(d => ({ d, x: n * d.weight / 100 }));
    raw.forEach(r => { r.k = Math.floor(r.x); });
    let left = n - raw.reduce((s, r) => s + r.k, 0);
    raw.slice().sort((a, b) => (b.x - b.k) - (a.x - a.k)).forEach(r => { if (left > 0) { r.k++; left--; } });
    const out = [];
    raw.forEach(r => out.push(...shuffle(D.questions.filter(q => q.d === r.d.id)).slice(0, r.k)));
    const rest = shuffle(D.questions.filter(q => !out.includes(q)));
    while (out.length < n && rest.length) out.push(rest.shift());
    return shuffle(out.slice(0, n)).map(q => q.id);
  }

  function viewExam(arg) {
    if (arg && arg[0] === 'r') return examResult(+arg.slice(1));
    if (S.exam) return examRun();
    const n = examSize(), st = S.settings;
    const hist = (S.exams || []).map((r, i) => `<tr><td><a href="#/exam/r${i}">${new Date(r.date).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</a></td>
      <td><b>${r.score}</b></td><td>${r.score >= PASS ? '<span style="color:var(--ok)">Đạt</span>' : '<span style="color:var(--bad)">Chưa đạt</span>'}</td>
      <td>${r.correct}/${r.n}</td><td>${fmtTime(r.used)}</td></tr>`).join('');
    $app.innerHTML = `<h1>Thi thử</h1>
      <div class="card">
        <p>Đề gồm <b>${n} câu</b>, làm trong <b id="mins">${examMinutes(st.esl)} phút</b>.
          ${n < EXAM_FULL ? `<span class="muted small">(Đề thật có 65 câu trong 90 phút. Ngân hàng hiện có ${D.questions.length} câu nên thời gian được tính theo tỷ lệ.)</span>` : ''}</p>
        <ul class="small">
          <li>Giống thi thật: <b>chỉ tiếng Anh</b>, không tô màu từ khóa, không xem đáp án giữa chừng.</li>
          <li>Có thể <b>đánh dấu</b> câu để xem lại và chuyển qua lại giữa các câu.</li>
          <li>Hết giờ thì bài tự nộp. Đậu khi đạt <b>≥ ${PASS}</b>/1000 điểm.</li>
          <li>Câu sai sẽ được đưa vào lịch SRS để ôn lại.</li>
        </ul>
        <label class="radio"><input type="checkbox" id="esl" ${st.esl ? 'checked' : ''}> Áp dụng chế độ <b>ESL +30 phút</b> (nếu bạn đăng ký hỗ trợ này khi đặt lịch thi)</label>
        <button class="btn primary" id="start" style="margin-top:8px">Bắt đầu thi</button>
      </div>
      <h2>Lịch sử thi thử</h2>
      ${hist ? `<div class="card scroll-x"><table><tr><th>Thời gian</th><th>Điểm</th><th>Kết quả</th><th>Đúng</th><th>Thời gian làm</th></tr>${hist}</table></div>`
             : '<p class="muted">Chưa có bài thi nào.</p>'}`;
    document.getElementById('esl').onchange = e => { st.esl = e.target.checked; save(); document.getElementById('mins').textContent = examMinutes(st.esl) + ' phút'; };
    document.getElementById('start').onclick = () => {
      const ids = pickExam(), order = {};
      ids.forEach(id => { order[id] = shuffle(QBY.get(id).opts.map((_, i) => i)); });
      S.exam = { ids, order, ans: {}, flag: [], cur: 0, start: Date.now(), dur: examMinutes(st.esl) * MIN };
      save(); examRun();
    };
  }

  function examRun() {
    const E = S.exam, n = E.ids.length;
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
      const answered = E.ids.filter(x => (E.ans[x] || []).length).length;
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
            <span class="muted small">Phím: A–E chọn · ←/→ chuyển câu · F đánh dấu</span></div>
        </div>
        <div class="card">
          <div class="muted small">Bảng câu hỏi · Đã trả lời ${answered}/${n} · Đánh dấu ${E.flag.length}</div>
          <div class="qnav">${E.ids.map((x, i) => `<button class="${i === E.cur ? 'cur' : ''} ${(E.ans[x] || []).length ? 'ans' : ''} ${E.flag.includes(x) ? 'flag' : ''}" data-j="${i}">${i + 1}</button>`).join('')}</div>
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
        const left = E.ids.filter(x => !(E.ans[x] || []).length).length;
        const msg = (left ? `Còn ${left} câu chưa trả lời. ` : '') + (E.flag.length ? `Có ${E.flag.length} câu đang đánh dấu. ` : '') + 'Nộp bài?';
        if (confirm(msg)) examSubmit(false);
      }
      if (a === 'quit' && confirm('Hủy bài thi này? Kết quả sẽ không được lưu.')) {
        clearInterval(examTimer); S.exam = null; save(); viewExam();
      }
    };
    onKey = e => {
      const k = e.key.toUpperCase(), ord = E.order[E.ids[E.cur]];
      if (k.length === 1 && k >= 'A' && k < String.fromCharCode(65 + ord.length) && k !== 'F') { choose(ord[k.charCodeAt(0) - 65]); }
      else if (k === 'F') flag();
      else if (e.key === 'ArrowRight') go(E.cur + 1);
      else if (e.key === 'ArrowLeft') go(E.cur - 1);
    };
  }

  function examSubmit(auto) {
    clearInterval(examTimer); examTimer = null; onKey = null;
    const E = S.exam; if (!E) return;
    const per = {}; let correct = 0;
    E.ids.forEach(id => {
      const q = QBY.get(id), ok = sameAns(q, E.ans[id] || []);
      const p = per[q.d] || (per[q.d] = { c: 0, t: 0 });
      p.t++; if (ok) { p.c++; correct++; }
      recordAnswer(id, ok);
      if (!ok) S.cards['q:' + id] = nextCard(S.cards['q:' + id], 1); // câu sai → vào SRS, ôn lại sớm
    });
    const n = E.ids.length;
    S.exams = [{
      date: Date.now(), ids: E.ids, ans: E.ans, order: E.order, flag: E.flag, correct, n, per, auto,
      score: Math.round(100 + 900 * correct / n), used: Math.min(Date.now() - E.start, E.dur)
    }, ...(S.exams || [])].slice(0, 20);
    S.exam = null;
    S.activity[today()] = (S.activity[today()] || 0) + n;
    save();
    if (location.hash === '#/exam/r0') route(); else location.hash = '#/exam/r0';
  }

  function examResult(i) {
    const R = (S.exams || [])[i];
    if (!R) { $app.innerHTML = `<div class="card">Không tìm thấy bài thi. <a href="#/exam">Quay lại</a></div>`; return; }
    const pass = R.score >= PASS;
    let filter = 'all', showVi = false;
    const wrongIds = R.ids.filter(id => !sameAns(QBY.get(id), R.ans[id] || []));
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
          <div class="score ${pass ? 'pass' : 'fail'}">${R.score}<small>/1000</small></div>
          <h2 style="margin:4px 0">${pass ? '🎉 ĐẠT' : 'CHƯA ĐẠT'} <span class="muted small">(cần ≥ ${PASS})</span></h2>
          <p>Đúng <b>${R.correct}/${R.n}</b> câu · Thời gian làm ${fmtTime(R.used)}</p>
          <p class="note">Điểm chỉ là quy đổi gần đúng (100 + 900 × tỷ lệ đúng). Đề thật dùng thang điểm scaled nên kết quả có thể khác.</p>
          <div class="row" style="justify-content:center">
            <a class="btn primary" href="#/exam">Thi lại</a>
            ${wrongIds.length ? `<button class="btn" data-a="drill">Ôn ngay ${wrongIds.length} câu sai</button>` : ''}
          </div>
        </div>
        <h2>Kết quả theo domain</h2>
        <div class="card scroll-x"><table>${domRows}</table><p class="note">Domain nào dưới 70% thì nên học lại bài học của domain đó.</p></div>
        <h2>Xem lại bài làm</h2>
        <div class="row" style="margin-bottom:12px">
          <div class="tabs" style="margin:0">
            <button class="btn ${filter === 'all' ? 'on' : ''}" data-f="all">Tất cả (${R.n})</button>
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
      if (b) runSession(wrongIds.map(id => ITEMS.find(it => it.id === 'q:' + id)), 'Ôn câu sai sau thi thử');
    };
  }

  /* ───────── PWA: offline, cài đặt, cập nhật ───────── */
  let installEvt = null;
  const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (location.hash.startsWith('#/settings')) route(); });
  addEventListener('appinstalled', () => { installEvt = null; if (location.hash.startsWith('#/settings')) route(); });
  function showUpdateBar(sw) {
    if (document.getElementById('updbar')) return;
    const bar = document.createElement('div');
    bar.id = 'updbar';
    bar.innerHTML = '<span>🔄 Có nội dung mới</span><button>Cập nhật</button>';
    bar.querySelector('button').onclick = () => { if (sw) sw.postMessage('skipWaiting'); else location.reload(); };
    document.body.appendChild(bar);
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloading) { reloading = true; location.reload(); } });
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
  function route() {
    hideTip(); onKey = null; $app.onclick = null; clearInterval(examTimer); examTimer = null;
    const [path, arg] = location.hash.replace(/^#\/?/, '').split('/');
    document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === (ROUTES[path] ? path : '')));
    (ROUTES[path] || viewHome)(arg);
    window.scrollTo(0, 0);
  }
  addEventListener('hashchange', route);
  updateBadge();
  route();
})();
