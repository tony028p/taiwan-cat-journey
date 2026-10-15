(async()=>{
require('fs').mkdirSync('build',{recursive:true});
const { chromium } = require('playwright'); const { spawn } = require('child_process');
const FPS=24;
const b=await chromium.launch({args:['--allow-file-access-from-files']}); const p=await b.newPage();
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/render.html?s=1.5'); await p.evaluate(()=>window.ready);
const DUR=(await p.evaluate(()=>info())).DUR; const N=Math.round(DUR*FPS);
// optional: FROM=<seconds> OUT=<file> renders only the tail of the film, video only (for splicing a re-rendered ending)
const F0=Math.round((+process.env.FROM||0)*FPS), OUT=process.env.OUT||'build/film.mp4', TAIL=F0>0;
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-',...(TAIL?[]:['-i','build/music.wav']),'-c:v','libx264','-preset','slow','-crf','16','-pix_fmt','yuv420p',...(TAIL?['-an']:['-c:a','aac','-b:a','192k','-shortest']),'-movflags','+faststart',OUT],{stdio:['pipe','inherit','inherit']});
const t0=Date.now();
for(let f=F0;f<N;f++){ const d=await p.evaluate(t=>frame(t,0.94),f/FPS); const buf=Buffer.from(d.split(',')[1],'base64');
  if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
  if(f%240===0) console.log(f,'/',N, ((Date.now()-t0)/1000).toFixed(0)+'s'); }
ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await b.close(); console.log('done',((Date.now()-t0)/1000).toFixed(0)+'s');
})();
