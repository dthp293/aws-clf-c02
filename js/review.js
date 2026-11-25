/* Today (SRS review), empty state and Free practice. */
'use strict';

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
