/* Practice tab (main schedule), task-statement stats and the question-reading drill. */
'use strict';

/* ───────── Luyện tập (lịch chính): chỉ câu mới hoặc đã đến hạn ───────── */
const weakQs = () => D.questions.filter(q => isWeakStat(S.stats[q.id]));
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
  runSession(spaceOut(shuffle(av).slice(0, max).map(q => qItem(q.id))), title, opt);
}

function viewPractice(arg) {
  if (arg) {
    const p = practiceSet(arg);
    if (!p.qs.length) { $app.innerHTML = `<div class="card">${t('practice.empty')}</div>`; return; }
    return startPractice(p.qs, p.title, p.opt, '#/practice', p.max);
  }
  const cnt = qs => `<b>${availQs(qs).length}/${qs.length}</b>`;
  const set = a => practiceSet(a).qs;
  const tile = (arg, head, sub) => `<a class="card dom" style="text-decoration:none" href="#/practice/${arg}"><h3>${head}</h3><span class="muted small">${sub}</span></a>`;
  $app.innerHTML = `<h1>${t('nav.practice')}</h1>
    <p class="muted">${t('practice.intro')}</p>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
    ${D.domains.map(d => { const s = domStats(d.id); return tile(d.id, `D${d.id}. ${esc(domName(d))}`, t('practice.domLine', { total: cnt(set(String(d.id))), acc: s.acc === null ? '—' : s.acc + '%' })); }).join('')}
    ${tile('all', '🔀 ' + t('practice.mixAll'), t('practice.nQuestions', { n: cnt(set('all')) }))}
    ${tile('weak', '🎯 ' + t('practice.weak'), t('practice.weakLine', { n: cnt(set('weak')) }))}
    ${tile('hard', '🔥 ' + t('practice.hard'), t('practice.hardLine', { n: cnt(set('hard')) }))}
    ${tile('multi', '☑️ ' + t('practice.multi'), t('practice.multiLine', { n: cnt(set('multi')) }))}
    ${qTranslated() ? '' : tile('read', '📖 ' + t('practice.read'), t('practice.readLine', { n: cnt(set('read')) }))}
    </div>
    <h2>${t('practice.byTask')}</h2>
    <p class="muted small">${t('practice.byTaskNote')}</p>
    ${taskTable()}`;
}

/* Thống kê theo task statement: gộp S.stats (luyện tập) + S.examStats (thi thử).
   Tỷ lệ đúng (c/a) tính theo 3 lần trả lời gần nhất của mỗi câu, để tiến bộ gần đây được phản ánh;
   n = tổng số lượt trả lời (chỉ để hiển thị). */
// Task yếu nhất: tỷ lệ đúng < 80%, có ít nhất minA lượt trả lời; stats = { task: { a, c } }
const weakTasksOf = (stats, minA, limit) => Object.entries(stats).filter(([, r]) => r.a >= minA)
  .map(([k, r]) => ({ t: k, ...r, p: Math.round(r.c / r.a * 100) })).filter(r => r.p < 80).sort((a, b) => a.p - b.p).slice(0, limit);
function taskStats() {
  const out = {};
  Object.keys(TASKS).forEach(k => { out[k] = { a: 0, c: 0, n: 0, total: 0 }; });
  const add = (q, s) => { if (!s || !s.a) return; const r = recentOf(s); out[q.t].a += r.a; out[q.t].c += r.c; out[q.t].n += s.a; };
  D.questions.forEach(q => { if (!q.t) return; out[q.t].total++; add(q, S.stats[q.id]); });
  (D.examPool || []).forEach(q => { if (q.t) add(q, (S.examStats || {})[q.id]); });
  return out;
}
// Mức thành thạo từng task (0–1, theo các lần trả lời gần đây); null = chưa có dữ liệu
const taskMastery = () => Object.fromEntries(Object.entries(taskStats()).map(([k, r]) => [k, r.a ? r.c / r.a : null]));
function taskTable() {
  const ts = taskStats(), av = {};
  D.questions.forEach(q => { if (q.t && isAvail('q:' + q.id)) av[q.t] = (av[q.t] || 0) + 1; });
  const rows = Object.keys(TASKS).map(k => ({ t: k, ...ts[k], acc: ts[k].a ? Math.round(ts[k].c / ts[k].a * 100) : null }))
    .sort((x, y) => (x.acc === null) - (y.acc === null) || (x.acc ?? 0) - (y.acc ?? 0) || x.t.localeCompare(y.t));
  return `<div class="card scroll-x"><table class="tasks"><tr><th>${t('task.colTask')}</th><th>${t('task.colTopic')}</th><th>${t('task.colAcc')}</th><th style="width:30%"></th><th></th></tr>
    ${rows.map(r => `<tr><td><b>${r.t}</b></td><td>${esc(taskName(r.t))}</td>
      <td class="${r.acc === null ? 'muted' : r.acc >= 80 ? 'v-ok' : r.acc >= 70 ? 'v-warn' : 'v-no'}"><b>${r.acc === null ? '—' : r.acc + '%'}</b><div class="muted small">${t('task.attempts', { n: r.n })}</div></td>
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
