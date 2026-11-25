/* Study session runner and card renderers (question, flashcard). */
'use strict';

/* ───────── Grade buttons ───────── */
const GL = { 1: ['grade.again', 'g-again'], 2: ['grade.hard', ''], 3: ['grade.good', ''], 4: ['grade.easy', 'g-easy'] };
// base: trạng thái thẻ trước lần chấm này; không truyền thì dùng trạng thái hiện tại trong lịch.
// (Không dùng tham số mặc định: thẻ mới có base = undefined, phải được giữ nguyên là "chưa học".)
const gradeBtns = (id, set, ...b) => { const base = b.length ? b[0] : deck()[id];
  return `<div class="grades ${set.length === 3 ? 'g3' : ''}">${set.map(g =>
    `<button class="btn ${GL[g][1]}" data-g="${g}">${t(GL[g][0])}<small>${fmtIvl(nextCard(base, g, Date.now(), id))}</small></button>`).join('')}</div>`; };

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
  const lang = qLang(), prev = deck()[it.id], isNew = !prev;
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
        <div class="muted small">${t('q.howWasIt')}</div>${gradeBtns(it.id, [2, 3, 4], prev)}<div class="row" style="margin-top:10px">${viBtn}</div>`;
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
    recordAnswer(q.id, ok, S.stats, !isRelearn(prev));
    // Đúng thì xếp lịch "Tốt" ngay (rời trang lúc này vẫn được tính); bấm Khó/Dễ sẽ chấm lại từ trạng thái trước
    grade(it.id, ok ? 3 : 1);
    draw();
  }
  $app.onclick = e => {
    if (e.target.closest('.kw')) return;
    const li = e.target.closest('.opt'); if (li) return toggle(+li.dataset.i);
    const b = e.target.closest('[data-a],[data-g]'); if (!b) return;
    if (b.dataset.g) { const g = +b.dataset.g; if (g !== 3) grade(it.id, g, { prev }); return done(g, true); }
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
      else if (ok) done(3, true);   // đã xếp lịch "Tốt" lúc kiểm tra
      else done(1, false);
    }
  };
}

function renderFlash(it, header, done) {
  let flipped = false;
  const r = it.ref, isV = it.type === 'v', isNew = !deck()[it.id];
  const example = isV && !qTranslated() ? ITEMS.find(i => i.type === 'q' && i.ref.en.toLowerCase().includes(r.term.toLowerCase()))?.ref : null;
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
