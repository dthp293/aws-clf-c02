/* Mock exam: question selection, timer, submit, results and readiness. */
'use strict';

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
// Thứ tự lựa chọn bị lệch (ví dụ câu đã đổi số lựa chọn) → về thứ tự gốc
const fixOrders = E => E.ids.forEach(id => { const q = QBY.get(id); if (!validOrder(q, E.order[id])) E.order[id] = q.opts.map((_, i) => i); });
// Bỏ câu không còn trong ngân hàng (ví dụ sau khi cập nhật nội dung) và sửa thứ tự lựa chọn bị lệch
function cleanExamIds(E) {
  E.order = E.order || {}; E.ans = E.ans || {}; E.flag = (E.flag || []).filter(id => QBY.has(id));
  E.ids = (E.ids || []).filter(id => QBY.has(id));
  fixOrders(E);
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
  logActivity(n);
  save();
  if (location.hash === '#/exam/r0') route(); else location.hash = '#/exam/r0';
}

function examResult(i) {
  const R = (S.exams || [])[i];
  if (!R) { $app.innerHTML = `<div class="card">${t('exam.notFound')}</div>`; return; }
  R.ids = (R.ids || []).filter(id => QBY.has(id));   // bỏ câu đã bị xóa khỏi ngân hàng
  R.order = R.order || {}; R.ans = R.ans || {}; R.flag = R.flag || []; R.per = R.per || {};
  fixOrders(R);
  const p100 = pct(R), v = verdict(p100);
  let filter = 'all', showVi = false;
  const isRight = new Map(R.ids.map(id => [id, sameAns(QBY.get(id), R.ans[id] || [])]));
  const wrongIds = R.ids.filter(id => !isRight.get(id));
  const drillIds = wrongIds.filter(id => !POOL_IDS.has(id));   // chỉ câu luyện tập mới đưa vào ôn
  const tk = {};
  R.ids.forEach(id => { const q = QBY.get(id); if (!q.t) return; const r = tk[q.t] || (tk[q.t] = { c: 0, a: 0 }); r.a++; if (isRight.get(id)) r.c++; });
  const weakTasks = weakTasksOf(tk, 1, 5);
  const domRows = D.domains.filter(d => R.per[d.id]).map(d => {
    const p = R.per[d.id], pc = Math.round(p.c / p.t * 100);
    return `<tr><td>D${d.id}. ${esc(domName(d))}</td><td>${p.c}/${p.t}</td><td style="width:40%"><div class="bar"><i style="width:${pc}%;background:${pc >= 70 ? 'var(--ok)' : 'var(--bad)'}"></i></div></td><td><b>${pc}%</b></td></tr>`;
  }).join('');
  draw();
  function draw() {
    const ids = R.ids.map((id, k) => [id, k]).filter(([id]) => filter === 'all' || (filter === 'wrong' ? wrongIds.includes(id) : R.flag.includes(id)));
    const list = ids.map(([id, k]) => {
      const q = QBY.get(id), a = R.ans[id] || [], ok = isRight.get(id);
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
        ${weakTasks.length ? `<h3 style="margin:14px 0 6px">${t('res.weakTasks')}</h3><ul class="small">${weakTasks.map(r => `<li><b>${t('common.task', { t: r.t })}</b> ${esc(taskName(r.t))}: ${t('res.taskLine', { c: r.c, n: r.a, p: r.p })} · <a href="#/practice/t-${r.t}">${t('res.practiceTask')}</a></li>`).join('')}</ul>` : ''}</div>
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
