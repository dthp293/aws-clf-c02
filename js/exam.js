/* Mock exam: question selection, timer, submit, results and readiness. */
'use strict';

/* ───────── Thi thử ───────── */
const EXAM_FULL = 65;             // đề thật: 65 câu / 90 phút
const READY = 0.8;                // mục tiêu mỗi đề: ≥ 80% đúng (đề thật đậu 700/1000 thang scaled, 80% chừa khoảng an toàn)
const POOL = D.examPool || [];    // kho câu chỉ dùng cho thi thử (không có trong luyện tập/SRS)
const POOL_IDS = new Set(POOL.map(q => q.id));
const QBY = new Map([...D.questions, ...POOL].map(q => [q.id, q]));
let examTimer = null;
const examSize = () => Math.min(EXAM_FULL, D.questions.length + POOL.length);
const seenCount = id => (S.examSeen && S.examSeen[id]) || 0;
const pct = r => Math.round(r.correct / r.n * 100);
// Đề có phần lớn câu là câu mới gặp lần đầu (fresh ≥ n/2); đề toàn câu đã gặp phản ánh trí nhớ nhiều hơn năng lực.
const isFreshExam = r => r.fresh != null && r.fresh >= r.n / 2;

/* ───────── Mức sẵn sàng: ước tính % đúng trên đề thật ─────────
   Dữ liệu: kết quả LẦN ĐẦU gặp mỗi câu của kho đề riêng (S.examFirst), không phụ thuộc đề nào được tính.
   - Kết quả cũ hơn kết quả MỚI NHẤT một HALF_LIFE thì trọng số giảm một nửa (tối thiểu W_MIN), để tiến bộ gần đây
     được phản ánh. Tính theo kết quả mới nhất chứ không theo hôm nay: không có dữ liệu mới thì ước tính giữ nguyên.
     Mức tối thiểu giữ cho vài câu mới không "xóa" được cả lịch sử (ví dụ một lần đồng hồ máy bị sai).
   - Kết quả không rõ ngày (dữ liệu cũ) được coi như cùng ngày với kết quả cũ nhất có ngày.
   - Mỗi task: tỷ lệ đúng co về tỷ lệ chung m (thêm PRIOR câu "ảo"); m cũng co về BASE, để vài câu đầu tiên đều đúng
     không cho ra "100–100%".
   - Domain = trung bình các task theo số câu của task trong kho; tổng = trung bình các domain theo tỷ trọng đề thật.
   - Khoảng 80%: phương sai của chính phép ước tính (mỗi câu trả lời ảnh hưởng tới task của nó và tới m), cộng độ
     bất định còn lại của task ít dữ liệu so với m.
   - Sẵn sàng: đủ dữ liệu tính theo trọng số (READY_MIN_N tổng, READY_DOM_N mỗi domain), cận dưới tổng ≥ READY_LO
     và cận dưới mỗi domain ≥ READY_DOM. */
const HALF_LIFE = 21 * DAY, W_MIN = 0.25, PRIOR = 4, BASE = 0.7, Z80 = 1.2816;
const READY_LO = 0.75, READY_DOM = 0.65, READY_MIN_N = 80, READY_DOM_N = 8;
const clamp01 = x => Math.max(0, Math.min(1, x));
function readiness() {
  const cnt = {}; POOL.forEach(q => { if (q.t) cnt[q.t] = (cnt[q.t] || 0) + 1; });
  const tasks = Object.keys(cnt);
  const tk = Object.fromEntries(tasks.map(k => [k, { w: 0, w2: 0, s: 0, n: 0 }]));
  let n = 0, sw = 0, ss = 0;
  const data = Object.entries(S.examFirst || {}).filter(([id]) => { const q = QBY.get(id); return q && q.t && POOL_IDS.has(id) && cnt[q.t]; });
  const dated = data.map(([, x]) => x[1]).filter(Boolean);
  const newest = dated.length ? Math.max(...dated) : 0, oldest = dated.length ? Math.min(...dated) : 0;
  data.forEach(([id, [ok, ts]]) => {
    const w = Math.max(W_MIN, Math.pow(0.5, Math.max(0, newest - (ts || oldest)) / HALF_LIFE));
    const r = tk[QBY.get(id).t];
    r.w += w; r.w2 += w * w; r.s += w * ok; r.n++; n++; sw += w; ss += w * ok;
  });
  if (!n) return { n: 0, ready: false, dom: [], risky: [] };
  const m = (ss + PRIOR * BASE) / (sw + PRIOR), task = {};
  tasks.forEach(k => { const r = tk[k], p = (r.s + PRIOR * m) / (r.w + PRIOR);
    task[k] = { t: k, p, a: PRIOR / (r.w + PRIOR), n: r.n }; });
  // Ước tính của một nhóm task với hệ số c (tổng = 1): P = Σ c_k·p_k. Câu trả lời i của task j (trọng số w_i) làm P đổi
  // w_i·(c_j/(w_j+PRIOR) + A/(sw+PRIOR)), với A = Σ c_k·a_k (qua m).
  const band = c => {
    let p = 0, A = 0, v = 0;
    tasks.forEach(k => { p += (c[k] || 0) * task[k].p; A += (c[k] || 0) * task[k].a; });
    tasks.forEach(k => {
      const q = task[k].p * (1 - task[k].p), g = (c[k] || 0) / (tk[k].w + PRIOR) + A / (sw + PRIOR);
      v += q * tk[k].w2 * g * g + (c[k] || 0) ** 2 * task[k].a ** 2 * m * (1 - m) / (PRIOR + 1);
    });
    const sd = Math.sqrt(v);
    return { p, lo: clamp01(p - Z80 * sd), hi: clamp01(p + Z80 * sd) };
  };
  const ws = D.domains.reduce((x, d) => x + d.weight, 0) || 1, all = {};
  const dom = D.domains.map(d => {
    const ks = tasks.filter(k => +k[0] === d.id), tot = ks.reduce((x, k) => x + cnt[k], 0) || 1, c = {};
    ks.forEach(k => { c[k] = cnt[k] / tot; all[k] = c[k] * d.weight / ws; });
    return { d, n: ks.reduce((x, k) => x + tk[k].n, 0), ne: ks.reduce((x, k) => x + tk[k].w, 0), ...band(c) };
  });
  const { p, lo, hi } = band(all);
  const risky = Object.values(task).filter(x => x.n > 0 && x.p < READY).sort((a, b) => a.p - b.p).slice(0, 3);
  return { n, ne: sw, p, lo, hi, dom, risky, latest: newest,
    ready: sw >= READY_MIN_N && lo >= READY_LO && dom.every(x => x.ne >= READY_DOM_N && x.lo >= READY_DOM) };
}
const pct100 = x => Math.round(x * 100);
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

// Chia k phần theo tỷ lệ các giá trị trong w (phần dư lớn nhất, tổng đúng bằng k)
function splitByWeight(w, k) {
  const keys = Object.keys(w), tot = keys.reduce((x, y) => x + w[y], 0) || 1, out = {};
  keys.forEach(x => { out[x] = Math.floor(k * w[x] / tot); });
  let left = k - keys.reduce((x, y) => x + out[y], 0);
  keys.slice().sort((x, y) => (k * w[y] / tot - out[y]) - (k * w[x] / tot - out[x])).forEach(x => { if (left > 0) { out[x]++; left--; } });
  return out;
}
function pickExam() {
  const n = examSize();
  // Gặp ít nhất trước (ngẫu nhiên trong cùng số lần gặp)
  const byFresh = arr => shuffle(arr).sort((a, b) => seenCount(a.id) - seenCount(b.id));
  const out = [];
  // Mỗi domain lấy đúng số câu theo tỷ trọng (65 câu → 16/19/22/8); trong domain, mỗi task lấy số câu theo tỷ lệ số câu
  // của task trong kho, nên đề nào cũng phủ chủ đề giống nhau (đề sau không phải "phần còn lại" lệch task).
  domainQuota(n).forEach(r => {
    const pool = POOL.filter(q => q.d === r.d.id), byTask = {};
    pool.forEach(q => { (byTask[q.t || ''] = byTask[q.t || ''] || []).push(q); });
    // theo số câu CHƯA GẶP của mỗi task (khi còn đủ), để các đề lần lượt dùng hết kho mà vẫn giữ tỷ lệ task
    const unseen = l => l.filter(q => seenCount(q.id) === 0).length;
    const useUnseen = pool.filter(q => seenCount(q.id) === 0).length >= r.k;
    const quota = splitByWeight(Object.fromEntries(Object.entries(byTask).map(([k, l]) => [k, useUnseen ? unseen(l) : l.length])), r.k);
    const picked = Object.entries(byTask).flatMap(([k, l]) => byFresh(l).slice(0, quota[k]));
    // task thiếu câu: lấy bù trong domain, rồi tới câu luyện tập của domain (chỉ khi kho đề riêng không đủ)
    const extra = [...byFresh(pool.filter(q => !picked.includes(q))), ...byFresh(D.questions.filter(q => q.d === r.d.id))];
    out.push(...picked, ...extra.slice(0, Math.max(0, r.k - picked.length)));
  });
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
    S.exam = { ids, order, ans: {}, flag: [], cur: 0, start: Date.now(), dur: examMinutes(st.esl) * MIN, seen: [] };
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
  E.seen = E.seen || [];
  const remaining = () => E.start + E.dur - Date.now();
  if (remaining() <= 0) return examExpired();
  draw();
  clearInterval(examTimer);
  examTimer = setInterval(examTick, 1000);

  function draw() {
    const id = E.ids[E.cur], q = QBY.get(id), sel = E.ans[id] || [], need = q.ans.length, flagged = E.flag.includes(id);
    if (!E.seen.includes(id)) { E.seen.push(id); save(); }   // câu đã xem: được tính nếu hủy bài (xem examDiscard)
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
    if (a === 'quit' && confirm(t('exam.cQuit'))) { examDiscard(); viewExam(); }
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

const REMEDY_MAX = 20;
function readyCard(rd) {
  if (!rd.n) return `<div class="card ready"><b>${t('ready.title')}</b>
    <p class="small muted" style="margin:6px 0 0">${t('ready.noData')}</p><p class="small muted" style="margin:6px 0 0">${t('ready.rule')}</p></div>`;
  // màu theo đúng ngưỡng của từng loại: tổng so với READY_LO, domain so với READY_DOM
  const cls = (x, min) => x >= min ? 'v-ok' : x >= min - 0.1 ? 'v-warn' : 'v-no';
  const rows = rd.dom.map(x => `<tr><td>D${x.d.id}. ${esc(domName(x.d))}</td><td class="${cls(x.lo, READY_DOM)}"><b>${pct100(x.p)}%</b></td>
    <td class="muted small">${t('ready.range', { lo: pct100(x.lo), hi: pct100(x.hi) })} · ${t('ready.domN', { n: x.n })}</td></tr>`).join('');
  const thin = rd.dom.find(x => x.ne < READY_DOM_N);
  const why = rd.ready ? t('ready.yesNote') : rd.ne < READY_MIN_N ? t('ready.needMore', { n: Math.ceil(READY_MIN_N - rd.ne) })
    : thin ? t('ready.needDomain', { d: thin.d.id, n: Math.ceil(READY_DOM_N - thin.ne) })
    : rd.lo < READY_LO ? t('ready.lowTotal', { lo: pct100(READY_LO) }) : t('ready.lowDomain', { lo: pct100(READY_DOM) });
  return `<div class="card ready ${rd.ready ? 'yes' : ''}"><b>${rd.ready ? t('ready.yes') : t('ready.title')}</b>
    <div class="score ${cls(rd.lo, READY_LO)}" style="font-size:1.6em">${t('ready.est', { lo: pct100(rd.lo), hi: pct100(rd.hi) })}</div>
    <p class="small muted" style="margin:2px 0 6px">${t('ready.basis', { n: rd.n })}${rd.latest ? ' ' + t('ready.age', { date: new Date(rd.latest).toLocaleDateString(LOCALE) }) : ''}</p>
    <div class="scroll-x"><table class="small">${rows}</table></div>
    ${rd.risky.length ? `<p class="small" style="margin:6px 0 0">${t('ready.risky')} ${rd.risky.map(x => `<a href="#/practice/t-${x.t}">${t('common.task', { t: x.t })}</a> (${pct100(x.p)}%)`).join(' · ')}</p>` : ''}
    <p class="small muted" style="margin:6px 0 0">${why}</p>
    <p class="small muted" style="margin:6px 0 0">${t('ready.rule')}</p></div>`;
}

// Mỗi giây khi đang thi. Hết giờ ngay lúc này (đang ở trang thi) thì nộp như thi thật. Hết giờ đã lâu (máy ngủ, tab
// ở nền rồi mới chạy lại) hoặc trang đang ẩn thì coi như bỏ dở: xử lý như khi mở lại bài đã hết giờ.
const LATE = MIN;
function examTick() {
  const E = S.exam; if (!E) { clearInterval(examTimer); examTimer = null; return; }
  const r = E.start + E.dur - Date.now();
  if (r <= 0) return r < -LATE || document.hidden ? examExpired() : examSubmit(true);
  const el = document.getElementById('timer');
  if (el) { el.textContent = '⏱ ' + fmtTime(r); el.classList.toggle('low', r < 5 * MIN); }
}
// Bỏ dở (mở lại khi đã hết giờ): đã trả lời đủ ít nhất một nửa số câu thì nộp như thi thật; ít hơn thì hủy, để một bài
// bỏ dở không bị tính là một đề làm kém.
const MIN_ANSWERED = 0.5;
const isFullAns = (E, id) => (E.ans[id] || []).length >= QBY.get(id).ans.length;
function examExpired() {
  const E = S.exam; if (!E) return;
  cleanExamIds(E);
  if (E.ids.filter(id => isFullAns(E, id)).length >= MIN_ANSWERED * E.ids.length) return examSubmit(true, true);
  const n = examDiscard();
  $app.innerHTML = `<div class="card">${t('exam.expired', { n })}</div>`;
}
// Ghi một câu của bài thi: lần đầu gặp câu của kho đề riêng → dữ liệu mức sẵn sàng; thống kê; số lần gặp
function recordExamAnswer(id, ok, now) {
  if (POOL_IDS.has(id)) {
    if (seenCount(id) === 0 && !S.examFirst[id]) S.examFirst[id] = [ok ? 1 : 0, now];
    recordAnswer(id, ok, S.examStats);
  } else recordAnswer(id, ok);       // câu luyện tập (chỉ khi kho đề riêng không đủ câu)
}
// Hủy bài đang làm: không lưu điểm. Mọi câu đã xem được tính như khi nộp (câu chưa trả lời đủ = sai), để không thể chỉ
// trả lời câu chắc chắn rồi hủy; câu chưa xem vẫn là câu mới.
function examDiscard() {
  clearInterval(examTimer); examTimer = null; onKey = null;
  const E = S.exam; if (!E) return 0;
  cleanExamIds(E);
  const now = Date.now();
  const seen = E.ids.filter(id => (E.seen || []).includes(id) || (E.ans[id] || []).length);
  seen.forEach(id => recordExamAnswer(id, sameAns(QBY.get(id), E.ans[id] || []), now));
  seen.forEach(id => { S.examSeen[id] = (S.examSeen[id] || 0) + 1; });
  S.exam = null; save();
  return seen.length;
}

// away = true: bài bỏ dở được nộp khi mở lại (đã hết giờ lúc vắng mặt). Vẫn chấm điểm cả đề, nhưng chỉ câu đã xem
// mới được ghi cho mức sẵn sàng và tính là đã gặp; câu chưa mở tới vẫn là câu mới.
function examSubmit(auto, away = false) {
  clearInterval(examTimer); examTimer = null; onKey = null;
  const E = S.exam; if (!E) return;
  if (!cleanExamIds(E)) { S.exam = null; save(); location.hash = '#/exam'; return; }
  const per = {}; let correct = 0;
  const now = Date.now();
  const counts = id => !away || (E.seen || []).includes(id) || (E.ans[id] || []).length;
  const fresh = E.ids.filter(id => POOL_IDS.has(id) && seenCount(id) === 0).length;
  E.ids.forEach(id => {
    const q = QBY.get(id), ok = sameAns(q, E.ans[id] || []);
    const p = per[q.d] || (per[q.d] = { c: 0, t: 0 });
    p.t++; if (ok) { p.c++; correct++; }
    if (counts(id)) recordExamAnswer(id, ok, now);
  });
  const n = E.ids.length;
  S.exams = [{
    date: now, ids: E.ids, ans: E.ans, order: E.order, flag: E.flag, correct, n, per, auto,
    used: Math.min(now - E.start, E.dur), fresh
  }, ...(S.exams || [])].slice(0, 20);
  E.ids.filter(counts).forEach(id => { S.examSeen[id] = (S.examSeen[id] || 0) + 1; });
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
  // Ôn sau thi thử: câu của kho đề riêng không bao giờ vào lịch ôn, nên luyện các câu luyện tập cùng task với câu sai
  const wrongTasks = new Set(wrongIds.map(id => QBY.get(id).t).filter(Boolean));
  // Chia REMEDY_MAX câu theo số câu sai của từng task (task sai nhiều được nhiều câu hơn); task không đủ câu luyện
  // được ngay thì phần thiếu chuyển sang task khác
  const missBy = {}; wrongIds.forEach(id => { const k = QBY.get(id).t; if (k) missBy[k] = (missBy[k] || 0) + 1; });
  const remedy = (() => {
    const av = {}; Object.keys(missBy).forEach(k => { av[k] = shuffle(availQs(D.questions.filter(q => q.t === k))); });
    const quota = splitByWeight(missBy, REMEDY_MAX), out = [];
    Object.keys(av).forEach(k => out.push(...av[k].splice(0, quota[k])));
    const spare = shuffle(Object.values(av).flat());
    while (out.length < REMEDY_MAX && spare.length) out.push(spare.shift());
    return spaceOut(out.map(q => qItem(q.id)).filter(Boolean));
  })();
  const remedyN = remedy.length;
  const tk = {};
  R.ids.forEach(id => { const q = QBY.get(id); if (!q.t) return; const r = tk[q.t] || (tk[q.t] = { c: 0, a: 0 }); r.a++; if (isRight.get(id)) r.c++; });
  const weakTasks = weakTasksOf(tk, 2, 5);
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
        <p class="note">${t('res.scoreNote')}${R.fresh != null && R.fresh < R.n / 2 ? ' ' + t('res.seenWarn') : ''}</p>
        <div class="row" style="justify-content:center">
          <a class="btn primary" href="#/exam">${t('res.retake')}</a>
          ${remedyN ? `<button class="btn" data-a="drill">${t('res.drill', { n: remedyN, t: wrongTasks.size })}</button>` : ''}
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
    if (b) { const items = remedy.filter(it => isAvail(it.id)); if (items.length) runSession(items, t('res.drillTitle'), {}); else emptyState(t('res.drillTitle'), remedy.map(it => it.id), {}, '#/exam/r' + i); }
  };
}
