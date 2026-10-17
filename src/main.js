/* Timeline, compositor, cinematic post, subtitles, titles and credits */
const FONTS = '"Noto Serif TC","Noto Serif CJK TC","Songti TC","PMingLiU",serif';
const FILM = []; SCENES.forEach((s, i) => { s.id = 'L' + i; FILM.push(s); if (i < SCENES.length - 1 && TRANS[i]) FILM.push(TRANS[i]); });
const DURS = FILM.map((s, i) => i === 0 ? 8 : (s.final ? 9 : (s.dur || 6)));
const PRE = 1.0, STARTS = []; { let t = PRE; DURS.forEach(d => { STARTS.push(t); t += d; }); }
const SCENES_END = STARTS[STARTS.length - 1] + DURS[DURS.length - 1];
const CREDITS = 8, DUR = SCENES_END + CREDITS;
const XF = 0.5;
const ROUTE = [[121.57, 25.03], [121.84, 25.11], [121.77, 25.15], [121.84, 24.88], [121.66, 24.21], [121.22, 23.10], [120.85, 21.90], [120.29, 22.68], [119.43, 23.21], [120.09, 23.16], [120.80, 23.51], [120.45, 23.48], [120.46, 23.80], [120.54, 24.08], [120.91, 23.86], [120.55, 24.31], [120.78, 24.37], [121.07, 24.83], [120.97, 24.80], [121.23, 25.08], [118.38, 24.44], [119.95, 26.16], [121.57, 25.03]];
const TWN = [[121.53, 25.30], [121.75, 25.15], [121.93, 25.02], [121.85, 24.85], [121.83, 24.58], [121.70, 24.30], [121.60, 23.95], [121.50, 23.50], [121.40, 23.15], [121.20, 22.80], [120.95, 22.40], [120.88, 22.10], [120.85, 21.90], [120.72, 21.94], [120.62, 22.30], [120.42, 22.48], [120.26, 22.68], [120.13, 23.00], [120.10, 23.40], [120.20, 23.75], [120.42, 24.18], [120.70, 24.60], [120.95, 24.86], [121.12, 25.06], [121.40, 25.22]];

let bufA, bufB, bloomC, grains, curS = 0;
function setup(Sc) {
  S = Sc; curS = Sc;
  bufA = mkCanvas(W * S, H * S); bufB = mkCanvas(W * S, H * S); bloomC = mkCanvas(480, 270);
  grains = [];
  for (let g = 0; g < 6; g++) { const k = mkCanvas(960, 540), x = k.getContext('2d'), id = x.createImageData(960, 540); let s = 1234 + g * 777;
    for (let i = 0; i < id.data.length; i += 4) { s = (s * 16807) % 2147483647; const v = 128 + ((s / 2147483647) - 0.5) * 120; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; }
    x.putImageData(id, 0, 0); grains.push(k); }
  if (typeof GLX !== 'undefined') GLX.init(Math.ceil((W + 2 * M) * S), Math.ceil(H * S), bufA.width, bufA.height);
}
function renderScene(target, i, lt) {
  c = target.getContext('2d'); c.setTransform(S, 0, 0, S, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.filter = 'none';
  SC = { i, lt, dur: DURS[i], cam: FILM[i].cam, sc: FILM[i] };
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  FILM[i].draw(lt);
  if (typeof crowdHook === 'function') crowdHook(null);   // background cats on top of the scene
}
function txt(s, x, y, size, col, o = {}) {
  c.save(); c.font = `${o.w || 600} ${size}px ${o.font || FONTS}`; c.textAlign = o.align || 'center'; c.textBaseline = 'middle';
  if (o.ls) c.letterSpacing = o.ls + 'px';
  if (o.shadow) { c.shadowColor = 'rgba(0,0,0,0.65)'; c.shadowBlur = o.shadow; }
  c.fillStyle = col; c.fillText(s, x, y); c.restore();
}
function subtitle(zh, en, a) {
  if (a <= 0) return; c.save(); c.globalAlpha = a;
  txt(zh, W / 2, H - BAR + 34, 27, '#f3ede2', { w: 600, ls: 2 });
  txt(en, W / 2, H - BAR + 66, 14.5, '#b9b0a2', { w: 400, ls: 1.2 });
  c.restore();
}
function locCard(i, lt) {
  const sc = FILM[i], a = sm((lt - 0.6) / (sc.via ? 0.5 : 0.7)) * (1 - sm((lt - 4.4) / 0.8)); if (a <= 0) return;
  c.save(); c.globalAlpha = a; const x = 64, y = BAR + 44, dx = (1 - easeOut((lt - 0.6) / 1.2)) * -14;
  c.translate(dx, 0);
  const num = sc.final ? '終點' : sc.via ? '途 中' : `${String(+sc.id.slice(1) + 1).padStart(2, '0')} ／ 22`;
  txt(num, x, y, 12, 'rgba(255,248,235,0.85)', { align: 'left', w: 500, ls: 3, shadow: 8 });
  c.fillStyle = 'rgba(255,248,235,0.75)'; c.fillRect(x, y + 14, 46 * easeOut((lt - 0.8) / 1), 1);
  txt(sc.county, x, y + 44, 34, '#fffaf0', { align: 'left', w: 700, ls: 4, shadow: 14 });
  txt(sc.place, x, y + 80, 16, 'rgba(255,248,235,0.92)', { align: 'left', w: 500, ls: 2, shadow: 10 });
  txt(sc.en.toUpperCase(), x, y + 102, 10.5, 'rgba(255,248,235,0.7)', { align: 'left', w: 400, ls: 2.2, shadow: 8 });
  txt(sc.ll, x, y + 120, 10, 'rgba(255,248,235,0.55)', { align: 'left', w: 400, ls: 1.5, shadow: 8, font: 'ui-monospace, "DejaVu Sans Mono", monospace' });
  c.restore();
}
function proj(lon, lat, ox, oy, k) { return [ox + (lon - 118.2) * k, oy + (26.4 - lat) * k]; }
function credits(ct) {
  c.fillStyle = '#07070a'; c.fillRect(0, 0, W, H);
  const k = 96, ox = 150, oy = 150, a = sm(ct / 1.0);
  c.save(); c.globalAlpha = a;
  poly(TWN.map(p => proj(p[0], p[1], ox, oy, k))); c.fillStyle = 'rgba(255,240,215,0.08)'; c.fill(); c.strokeStyle = 'rgba(255,240,215,0.45)'; c.lineWidth = 1; c.stroke();
  [[119.58, 23.57, 9, 7], [118.38, 24.44, 8, 4], [119.95, 26.16, 5, 3], [119.43, 23.21, 3, 2]].forEach(([lo, la, rx, ry]) => { const p = proj(lo, la, ox, oy, k); c.strokeStyle = 'rgba(255,240,215,0.45)'; c.beginPath(); c.ellipse(p[0], p[1], rx, ry, 0, 0, TAU); c.stroke(); });
  const u = sm((ct - 0.6) / 4.5) * (ROUTE.length - 1), n = Math.floor(u);
  c.setLineDash([3, 4]); c.strokeStyle = 'rgba(230,150,90,0.9)'; c.lineWidth = 1.4; c.beginPath();
  ROUTE.forEach((p, j) => { if (j > n + 1) return; let q = proj(p[0], p[1], ox, oy, k); if (j === n + 1) { const pr = proj(ROUTE[n][0], ROUTE[n][1], ox, oy, k); q = [lerp(pr[0], q[0], u - n), lerp(pr[1], q[1], u - n)]; } j ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); }); c.stroke(); c.setLineDash([]);
  ROUTE.forEach((p, j) => { if (j > n) return; const q = proj(p[0], p[1], ox, oy, k); disc(q[0], q[1], 2.6, '#f0b070'); glow(q[0], q[1], 10, '255,180,110', 0.35); });
  c.restore();
  const b = sm((ct - 1.2) / 1.2);
  c.save(); c.globalAlpha = b;
  txt('小貓環島記', 860, 290, 52, '#f4ede0', { w: 700, ls: 10 });
  txt('A CAT’S JOURNEY AROUND TAIWAN', 860, 344, 13, '#b8ae9f', { w: 400, ls: 5 });
  c.fillStyle = 'rgba(244,237,224,0.4)'; c.fillRect(800, 376, 120, 1);
  txt('二十二個縣市　·　一隻貓　·　一座島', 860, 410, 17, '#d8cfbf', { w: 500, ls: 3 });
  c.restore();
  const e = sm((ct - 4.2) / 1.2) * (1 - sm((ct - CREDITS + 0.8) / 0.8));
  c.save(); c.globalAlpha = e; txt('— 完 —', 860, 500, 20, '#f4ede0', { w: 600, ls: 8 }); c.restore();
  c.save(); c.globalAlpha = 1 - (1 - sm((ct - CREDITS + 0.8) / 0.8)); c.restore();
}
function post(ctx, t, sun) {
  if (typeof GLX !== 'undefined' && GLX.ok) return GLX.post(ctx, t, { sun });
  const cw = W * S, ch = H * S;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const b = bloomC.getContext('2d'); b.filter = 'blur(5px) brightness(1.05)'; b.clearRect(0, 0, 480, 270); b.drawImage(ctx.canvas, 0, 0, 480, 270); b.filter = 'none';
  ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.24; ctx.drawImage(bloomC, 0, 0, cw, ch);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'soft-light';
  const g = ctx.createLinearGradient(0, 0, 0, ch); g.addColorStop(0, 'rgba(255,205,160,0.35)'); g.addColorStop(0.55, 'rgba(128,128,128,0)'); g.addColorStop(1, 'rgba(30,70,95,0.45)'); ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'multiply';
  const v = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.35, cw / 2, ch / 2, cw * 0.62); v.addColorStop(0, 'rgba(255,255,255,1)'); v.addColorStop(1, 'rgba(70,60,55,1)'); ctx.fillStyle = v; ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.09; ctx.drawImage(grains[Math.floor(t * 24) % grains.length], 0, 0, cw, ch);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}
function draw(ctx, t) {
  T = t;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (t >= SCENES_END) { c = ctx; c.setTransform(S, 0, 0, S, 0, 0); credits(t - SCENES_END); post(ctx, t); c = ctx; c.setTransform(S, 0, 0, S, 0, 0); c.fillStyle = '#000'; c.fillRect(0, 0, W, BAR); c.fillRect(0, H - BAR, W, BAR); const f = sm((t - (DUR - 1)) / 1); if (f > 0) { c.globalAlpha = f; c.fillRect(0, 0, W, H); c.globalAlpha = 1; } return; }
  let i = 0; while (i < FILM.length - 1 && t >= STARTS[i + 1]) i++;
  const lt = Math.max(-XF, t - STARTS[i]);
  for (const k in CACHES) if (+k < i - 1 || +k > i + 1) delete CACHES[k];
  if (typeof GLX !== 'undefined' && GLX.ok) GLX.prune(new Set(Object.values(CACHES).flatMap(o => Object.values(o))));
  renderScene(bufA, i, lt); ctx.drawImage(bufA, 0, 0);
  let j = -1, ljt = 0, a = 0;
  if (i < FILM.length - 1 && lt > DURS[i] - XF) { j = i + 1; ljt = lt - DURS[i]; a = sm((lt - (DURS[i] - XF)) / (2 * XF)); }
  else if (i > 0 && lt < XF) { j = i - 1; ljt = lt + DURS[i - 1]; a = 1 - sm((lt + XF) / (2 * XF)); }
  if (j >= 0) { renderScene(bufB, j, ljt); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.drawImage(bufB, 0, 0); ctx.globalAlpha = 1; }
  const sunOf = (k, l, w) => { const f = FILM[k].sun; if (!f || w <= 0) return null; const s = f(l); return [s[0], s[1], (s[2] ?? 1) * w]; };
  const sI = sunOf(i, lt, j >= 0 ? 1 - a : 1), sJ = j >= 0 ? sunOf(j, ljt, a) : null;
  post(ctx, t, sJ && (!sI || sJ[2] > sI[2]) ? sJ : sI);
  c = ctx; c.setTransform(S, 0, 0, S, 0, 0); c.globalAlpha = 1;
  c.fillStyle = '#000'; c.fillRect(0, 0, W, BAR); c.fillRect(0, H - BAR, W, BAR);
  // texts (scene-owned, crossfade with scene alpha)
  const texts = (k, lt2, al) => { const sc = FILM[k], d = DURS[k]; c.save(); c.globalAlpha = al;
    locCard(k, k === 0 ? lt2 - 3.2 : lt2);
    const s0 = k === 0 ? 4.4 : (sc.via ? 0.5 : 0.9);
    if (sc.sub3) { subtitle(sc.sub[0], sc.sub[1], sm((lt2 - s0) / 0.5) * (1 - sm((lt2 - 4.0) / 0.35))); subtitle(sc.sub2[0], sc.sub2[1], sm((lt2 - 4.45) / 0.4) * (1 - sm((lt2 - 6.25) / 0.35))); subtitle(sc.sub3[0], sc.sub3[1], sm((lt2 - 6.7) / 0.4) * (1 - sm((lt2 - d + 0.2) / 0.5))); }
    else if (sc.sub2) { subtitle(sc.sub[0], sc.sub[1], sm((lt2 - s0) / 0.5) * (1 - sm((lt2 - 4.4) / 0.4))); subtitle(sc.sub2[0], sc.sub2[1], sm((lt2 - 4.9) / 0.5) * (1 - sm((lt2 - d + 0.2) / 0.5))); }
    else subtitle(sc.sub[0], sc.sub[1], sm((lt2 - s0) / 0.5) * (1 - sm((lt2 - d + 0.6) / 0.4)));
    c.restore(); };
  if (j >= 0 && a > 0.5) texts(j, ljt, 1); else texts(i, lt, 1);
  if (i === 0) { const ta = sm((t - 1.4) / 1.2) * (1 - sm((t - 4.6) / 0.8)); if (ta > 0) { c.save(); c.globalAlpha = ta; txt('小貓環島記', W / 2, H / 2 - 18, 60, '#fffaf0', { w: 700, ls: 14, shadow: 24 }); txt('A CAT’S JOURNEY AROUND TAIWAN', W / 2, H / 2 + 34, 13, 'rgba(255,248,235,0.85)', { w: 400, ls: 6, shadow: 12 }); c.restore(); } }
  const fin = 1 - sm(t / 1.8), fout = sm((t - (SCENES_END - 0.9)) / 0.9), f = Math.max(fin, fout);
  if (f > 0) { c.globalAlpha = f; c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.globalAlpha = 1; }
}
window.Film = { W, H, get DUR() { return DUR; }, setup, draw, SCENES: FILM, STARTS, DURS };
