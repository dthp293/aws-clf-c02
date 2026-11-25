// Renders every lesson, quick summary, glossary, practice/exam screen and sample answered questions in en and ja;
// fails on leftover Vietnamese, undefined/NaN, unreplaced {params} or empty explanations.
// Usage: node tests/render.test.js [project root]
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=process.argv[2]||path.resolve(__dirname,'..');const rd=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const html=rd('index.html');const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const VI_RE=/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
function mkEl(id) {
  return { id, innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, hidden: false, children: [],
    classList: { toggle() {}, add() {}, remove() {} }, addEventListener() {}, appendChild(c) { this.children.push(c); },
    querySelector() { return mkEl('q'); }, querySelectorAll() { return []; }, getBoundingClientRect() { return { left: 0, top: 0, bottom: 0 }; },
    scrollIntoView() {}, click() {}, matches() { return false; }, closest() { return null; } };
}
function boot(ui, opts = {}) {
  const store = { 'clf-c02-study-v1': JSON.stringify({ cards: {}, settings: { ui, lang: opts.mode || 'bi' } }) };
  const els = {}, injected = [];
  const navSpans = ['nav.home', 'nav.review', 'nav.practice'].map(k => { const e = mkEl('nav'); e.dataset.i18n = k; return e; });
  const root = { lang: 'vi' };
  let reloaded = 0;
  const document = {
    documentElement: root,
    getElementById(id) { return els[id] || (els[id] = mkEl(id)); }, createElement() { return mkEl('script'); },
    addEventListener() {}, querySelectorAll(sel) { return sel === '[data-i18n]' ? navSpans : []; }, body: mkEl('body'),
    head: { appendChild(sc) {
      injected.push(sc.src);
      setTimeout(() => {
        const f = path.join(ROOT, sc.src);
        if (opts.missing && opts.missing.some(m => sc.src.endsWith(m)) || !fs.existsSync(f)) return sc.onerror && sc.onerror();
        vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: sc.src }); sc.onload && sc.onload();
      }, 0);
    } }
  };
  const ctx = { document, localStorage: { getItem: k => k in store ? store[k] : null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    location: { hash: '#/', protocol: 'file:', hostname: '', reload() { reloaded++; } }, navigator: { userAgent: 'node', platform: 'x', maxTouchPoints: 0 }, console,
    matchMedia: () => ({ matches: false }), addEventListener() {}, scrollTo() {}, innerWidth: 1000, innerHeight: 800, setInterval, clearInterval, setTimeout,
    confirm: () => true, alert() {}, URL: { createObjectURL: () => 'blob:', revokeObjectURL() {} }, Blob: function () {}, Date, Math, JSON };
  ctx.window = ctx; vm.createContext(ctx);
  for (const s of scripts) {
    vm.runInContext(rd(s), ctx, { filename: s });
    if (s === 'js/main.js') vm.runInContext('window.__T={route,get S(){return S},set S(v){S=v},normalize,t,UI,VI,runSession:typeof runSession!=="undefined"?runSession:null,ITEMS,showRecovery};', ctx, { filename: 'hook.js' });
  }
  return { ctx, els, injected, root, navSpans, store, reloaded: () => reloaded };
}
const ROUTES = ['#/', '#/review', '#/review/free', '#/review/free/1', '#/review/free/all', '#/practice', '#/practice/1', '#/practice/read', '#/practice/t-2.3',
  '#/exam', '#/learn', '#/learn/sum/2', '#/lesson/0-1', '#/lesson/3-6', '#/glossary', '#/settings', '#/exam/r9'];
const leak = h => { const x = h.replace(/Tiếng Việt/g, '').replace(/Ngôn ngữ/g, ''); /* endonyms in the language picker */ const m = x.match(new RegExp('.{0,40}' + VI_RE.source + '.{0,40}', 'i')); return m ? m[0] : null; };


(async()=>{let n=0,bad=[];
for(const ui of ['en','ja']){const r=boot(ui);await new Promise(res=>setTimeout(res,80));const T=r.ctx.__T;const D=r.ctx.CLF;
 const hs=[...D.course.map(c=>'#/lesson/'+c.id),'#/learn','#/learn/sum/1','#/learn/sum/2','#/learn/sum/3','#/learn/sum/4','#/glossary','#/exam','#/practice','#/review/free','#/',...ROUTES];
 for(const h of hs){r.ctx.location.hash=h;T.route();const o=r.els.app.innerHTML;n++;
  if(o.includes(r.ctx.CLF_I18N[ui].ui['rec.title']))bad.push(ui+' '+h+' RECOVERY');const l=leak(o);if(l)bad.push(ui+' '+h+' VI: '+l);
  if(/undefined|NaN|\{[a-z]+\}|\[object/.test(o.replace(/<script[\s\S]*?<\/script>/g,'')))bad.push(ui+' '+h+' odd: '+(o.match(/.{0,40}(undefined|NaN|\{[a-z]+\}|\[object).{0,40}/)||[''])[0]);}
 // answer 120 random practice questions wrong and right
 for(let k=0;k<120;k++){r.ctx.location.hash='#/practice/all';T.S.cards={};T.route();const h=r.els.app.innerHTML;
  const need=/Choose THREE|3 つ選択/.test(h)?3:/Choose TWO|2 つ選択/.test(h)?2:1;[...h.matchAll(/data-i="(\d+)"/g)].slice(0,need).forEach(m=>r.els.app.onclick({target:{closest:s=>s==='.opt'?{dataset:{i:m[1]}}:null}}));
  r.els.app.onclick({target:{closest:s=>/\[data-a\]/.test(s)?{dataset:{a:'check'}}:null}});const o=r.els.app.innerHTML;n++;
  const l=leak(o);if(l)bad.push(ui+' q VI: '+l);if(/class="why"><\/div>/.test(o))bad.push(ui+' empty why');if(/undefined/.test(o))bad.push(ui+' q undefined');}
 // exam result review with all questions
 T.S.exams=[{date:Date.now(),ids:[...D.examPool.map(q=>q.id)],ans:{},order:{},flag:[],correct:0,n:D.examPool.length,per:{},used:1,fresh:0,score:100}];
 r.ctx.location.hash='#/exam/r0';T.route();const o=r.els.app.innerHTML;n++;const l=leak(o);if(l)bad.push(ui+' exam result VI: '+l);if(/class="why"><\/div>/.test(o))bad.push(ui+' exam empty why');
}
console.log('renders',n,'issues',bad.length);bad.slice(0,40).forEach(b=>console.log(' ',b));process.exit(bad.length?1:0)})();
