(async()=>{
const { chromium } = require('playwright'); const { spawn } = require('child_process');
const FPS=30, N=60*FPS;
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-i','music.wav','-c:v','libx264','-preset','slow','-crf','23','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-shortest','-movflags','+faststart','cat-taiwan.mp4'],{stdio:['pipe','inherit','inherit']});
const b=await chromium.launch({args:['--allow-file-access-from-files']}); const p=await b.newPage();
await p.goto('file://'+process.cwd()+'/render.html?s=1.5'); await p.evaluate(()=>window.ready);
const t0=Date.now();
for(let f=0;f<N;f++){ const d=await p.evaluate(t=>frame(t,0.93),f/FPS); const buf=Buffer.from(d.split(',')[1],'base64');
  if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
  if(f%300===0) console.log(f, ((Date.now()-t0)/1000).toFixed(0)+'s'); }
ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await b.close(); console.log('done');
})();
