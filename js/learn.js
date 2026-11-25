/* Course, lessons, quick summaries and glossary. */
'use strict';

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
      if (S.done[l.id]) delete S.done[l.id]; else { S.done[l.id] = Date.now(); logActivity(); }
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
