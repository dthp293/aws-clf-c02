// loads content into fake window; usage: require(load)(root) -> window
const fs=require('fs'),path=require('path'),vm=require('vm');
module.exports=function(root,extra){
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const files=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(f=>f!=='app.js');
  const window={};const ctx=vm.createContext({window,console});
  const src={};
  for(const f of files.concat(extra||[])){const before=new Set([...(window.CLF&&window.CLF.questions||[]).map(q=>q.id),...(window.CLF&&window.CLF.examPool||[]).map(q=>q.id)]);
    vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
    const after=[...(window.CLF&&window.CLF.questions||[]).map(q=>q.id),...(window.CLF&&window.CLF.examPool||[]).map(q=>q.id)];
    src[f]=after.filter(i=>!before.has(i));}
  window.__src=src;return window;};
