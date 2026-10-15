(async()=>{
const { chromium } = require('playwright');
const fs=require('fs');
const times = process.argv.slice(2).map(Number);
const b = await chromium.launch({ args:['--allow-file-access-from-files'] });
const p = await b.newPage();
const errs=[]; p.on('pageerror', e=>errs.push(e.message)); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()) });
await p.goto('file://'+process.cwd()+'/render.html?s=1'); await p.evaluate(()=>window.ready);
fs.mkdirSync('shots',{recursive:true});
for (const t of times) { const d = await p.evaluate(t=>frame(t,0.85), t); fs.writeFileSync(`shots/t${t}.jpg`, Buffer.from(d.split(',')[1],'base64')); }
console.log(errs.join('\n')||'no errors'); await b.close();
})();
