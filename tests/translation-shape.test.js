// Structural review of en/ja content vs the Vietnamese source (labels vs answer key, HTML tags, keys).
// Usage: node tests/translation-shape.test.js [project root]
const fs=require('fs'),path=require('path'),vm=require('vm');const R=process.argv[2]||path.resolve(__dirname,'..');
const html=fs.readFileSync(R+'/index.html','utf8');
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(s=>s!=='app.js');
const w={};w.window=w;vm.createContext(w);for(const s of scripts)vm.runInContext(fs.readFileSync(R+'/'+s,'utf8'),w);
const FILES=['ui','data','q-1','q-2','q-3','q-4','q-5','q-6','q-7','q-8','course-a','course-b','course-c','course-d','course-e','course-f'];
for(const l of ['en','ja'])for(const f of FILES)vm.runInContext(fs.readFileSync(`${R}/i18n/${l}/${f}.js`,'utf8'),w);
const D=w.CLF,I=w.CLF_I18N;const VIRE=/[ạảãầấậẩẫằắặẳẵẹẻẽềếệểễịỉĩọỏõồốộổỗơờớợởỡụủũưừứựửữỳỵỷỹđ]/i;
const VOID=new Set(['br','hr','img','input','meta','link','wbr','col']);
function balance(h){const st=[];for(const m of h.matchAll(/<(\/?)([a-z][a-z0-9]*)\b[^>]*?(\/?)>/gi)){const t=m[2].toLowerCase();if(VOID.has(t)||m[3])continue;if(!m[1])st.push(t);else{if(st[st.length-1]===t)st.pop();else return 'mismatch </'+t+'> open='+st.slice(-3)}}return st.length?'unclosed '+st:null}
const tagset=h=>[...(h.match(/<[a-z][a-z0-9]*/gi)||[])].map(x=>x.toLowerCase()).sort().join(',');
const out={};const P=(l,m)=>(out[l]=out[l]||[]).push(m);
for(const l of ['en','ja']){const L=I[l];
 // questions
 for(const q of [...D.questions,...D.examPool]){const x=L.q[q.id];if(!x){P(l,'q missing '+q.id);continue}
  if(!x.exp)P(l,'q exp empty '+q.id);if(!Array.isArray(x.why)||x.why.length!==q.opts.length)P(l,'q why len '+q.id);
  [x.exp,...(x.why||[])].forEach(s=>{if(VIRE.test(s||''))P(l,'q VI text '+q.id+': '+s.slice(0,60))});
  if(x.why)x.why.forEach((s,i)=>{const right=q.ans.includes(i);const ws=String(s);
    const saysOk=l==='en'?/^\s*(Correct|Right)\b/i.test(ws):/^\s*正解/.test(ws);const saysNo=l==='en'?/^\s*(Incorrect|Wrong|Not correct)\b/i.test(ws):/^\s*不正解/.test(ws);
    const vs=q.why[i]||'';const vOk=/^\s*(Đúng)/i.test(vs),vNo=/^\s*(Sai)/i.test(vs);
    if((vOk&&saysNo)||(vNo&&saysOk)||(right&&saysNo)||(!right&&saysOk))P(l,`q why polarity ${q.id}[${i}] right=${right}: ${ws.slice(0,50)}`)});}
 // course
 for(const c of D.course){const x=L.course[c.id];if(!x){P(l,'course missing '+c.id);continue}
  for(const k of ['title','html'])if(!x[k])P(l,`course ${c.id} no ${k}`);
  for(const k of ['goals','summary'])if((c[k]||[]).length!==(x[k]||[]).length)P(l,`course ${c.id} ${k} len ${(c[k]||[]).length}/${(x[k]||[]).length}`);
  if((c.terms||[]).length!==(x.terms||[]).length)P(l,`course ${c.id} terms len`);
  (x.terms||[]).forEach((t,i)=>{if(!c.terms[i]||t[0]!==c.terms[i][0])P(l,`course ${c.id} term[${i}] en mismatch ${t[0]} vs ${c.terms[i]&&c.terms[i][0]}`)});
  const b=balance(x.html||'');if(b)P(l,`course ${c.id} html ${b}`);
  if(tagset(x.html||'')!==tagset(c.html))P(l,`course ${c.id} tag multiset differs`);
  const hrefs=h=>[...h.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).sort().join(' ');if(hrefs(x.html||'')!==hrefs(c.html))P(l,`course ${c.id} hrefs differ: ${hrefs(x.html||'')} | ${hrefs(c.html)}`);
  const all=JSON.stringify(x);if(VIRE.test(all.replace(/Tiếng Việt/g,'')))P(l,`course ${c.id} has VI chars: `+(all.match(new RegExp('.{0,30}'+VIRE.source+'.{0,30}','i'))||[''])[0]);}
 // glossary/services/lessons/domains
 for(const g of D.glossary){const x=L.glossary[g.term];if(!x||!x.meaning)P(l,'gloss missing '+g.term);else{if(!!g.hint!==!!x.hint)P(l,`gloss hint presence ${g.term} vi=${!!g.hint}`);if(VIRE.test(x.meaning+x.hint))P(l,'gloss VI '+g.term)}}
 for(const s of D.services){const x=L.services[s.name];if(!x||!x.desc)P(l,'svc missing '+s.name);else{if(!!s.confuse!==!!x.confuse)P(l,'svc confuse presence '+s.name);if(VIRE.test(x.desc+x.confuse))P(l,'svc VI '+s.name)}}
 for(const d of [1,2,3,4]){if(!L.domains[d])P(l,'domain '+d);const a=D.lessons[d],b=L.lessons[d]||[];if(a.length!==b.length)P(l,`sum ${d} len ${a.length}/${b.length}`);
  b.forEach((y,i)=>{const bb=balance(y.h||'');if(bb)P(l,`sum ${d}.${i} ${bb}`);if(a[i]&&tagset(y.h)!==tagset(a[i].h))P(l,`sum ${d}.${i} tags differ`);if(VIRE.test(y.t+y.h))P(l,`sum ${d}.${i} VI`)})}
 // extra keys not in VI
 const qids=new Set([...D.questions,...D.examPool].map(q=>q.id));Object.keys(L.q).forEach(k=>{if(!qids.has(k))P(l,'extra q '+k)});
 const gl=new Set(D.glossary.map(g=>g.term));Object.keys(L.glossary).forEach(k=>{if(!gl.has(k))P(l,'extra gloss '+k)});
 const sv=new Set(D.services.map(g=>g.name));Object.keys(L.services).forEach(k=>{if(!sv.has(k))P(l,'extra svc '+k)});
}
for(const l of ['en','ja']){console.log(`== ${l}: ${(out[l]||[]).length} issues`);(out[l]||[]).slice(0,60).forEach(x=>console.log('  '+x))}
process.exit(['en','ja'].some(l=>(out[l]||[]).length)?1:0);
