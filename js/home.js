/* Home page. */
'use strict';

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
