(async()=>{const { chromium } = require('playwright'); const fs=require('fs');
const b=await chromium.launch({args:['--allow-file-access-from-files']}); const p=await b.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/render.html?s=1'); await p.evaluate(()=>window.ready);
const info=await p.evaluate(()=>info()); let times=process.argv.slice(2).map(Number);
if(process.argv[2]==='all') times=info.STARTS.map((s,i)=>s+(i===0?5.5:3.2));
fs.mkdirSync('build/shots',{recursive:true});
for(const t of times){ const t0=Date.now(); try{ const d=await p.evaluate(t=>frame(t,0.85),t); fs.writeFileSync(`build/shots/t${t.toFixed(1)}.jpg`,Buffer.from(d.split(',')[1],'base64')); }catch(e){errs.push(t+': '+e.message.split('\n')[0]);} console.log(t.toFixed(1), Date.now()-t0,'ms'); }
console.log(JSON.stringify(info)); console.log(errs.join('\n')||'no errors'); await b.close();})();
