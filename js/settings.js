/* Settings page: language, display, schedule, export/import/reset. */
'use strict';

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
