(async()=>{const { chromium } = require('playwright');
const b=await chromium.launch({args:['--allow-file-access-from-files']}); const p=await b.newPage({viewport:{width:+(process.argv[4]||1200),height:+(process.argv[5]||500)}});
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/'+process.argv[2]); await p.waitForTimeout(300);
await p.screenshot({path:process.argv[3]}); console.log(errs.join('\n')||'ok'); await b.close();})();
