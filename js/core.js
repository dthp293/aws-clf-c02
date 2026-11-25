/* State in localStorage (load/save/normalize) and question tagging. Loaded first: defines D (= window.CLF) and S. */
'use strict';

const D = window.CLF;

/* ───────── Task statements (Exam Guide CLF-C02) + gắn nhãn câu hỏi ─────────
   Tên task nằm trong i18n/<lang>/ui.js (khóa 'task.<id>'). */
const TASKS = Object.fromEntries(['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4',
  '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '4.1', '4.2', '4.3'].map(k => [k, true]));
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
  settings: { ui: 'vi', lang: 'en-first', newPerDay: 15, kw: true, examDate: '', esl: false },
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
const LANGS = ['bi', 'en-first', 'en-only'];   // chế độ song ngữ (chỉ bản tiếng Việt)
const UI_LANGS = ['vi', 'en', 'ja'];           // ngôn ngữ giao diện + nội dung giải thích
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
    ui: UI_LANGS.includes(st.ui) ? st.ui : out.settings.ui,
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
