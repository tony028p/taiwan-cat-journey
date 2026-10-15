/* Scenes 12–22 */
function turbine(x, y, h, ang, col) {
  line(x, y, x, y - h, col, h * 0.025); disc(x, y - h, h * 0.03, col);
  for (let k = 0; k < 3; k++) { const a = ang + k * TAU / 3; c.save(); c.translate(x, y - h); c.rotate(a); poly([[0, -h * 0.015], [h * 0.48, -h * 0.004], [h * 0.48, h * 0.006], [0, h * 0.02]], col); c.restore(); }
}
function plane(x, y, s, ang) {
  c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s);
  const col = '#2a2530';
  poly([[-60, -4], [50, -6], [62, -2], [58, 3], [-58, 5]], col); poly([[-10, 0], [12, 0], [-14, 34], [-24, 34]], col); poly([[-6, 0], [10, 0], [-4, -20], [-12, -20]], 'rgba(40,35,45,0.7)');
  poly([[-58, -2], [-46, -2], [-62, -26], [-68, -26]], col); poly([[-56, 0], [-46, 0], [-60, 10], [-66, 10]], col);
  c.restore();
  if (Math.sin(T * 6) > 0.6) glow(x + Math.cos(ang) * 60 * s, y + Math.sin(ang) * 60 * s, 16, '255,255,255', 0.9);
  glow(x - 14 * s, y + 30 * s, 10, '255,60,60', 0.7 * (Math.sin(T * 4) > 0 ? 1 : 0.2));
  glow(x + 10 * s, y + 4 * s, 26, '255,240,200', 0.6);
}
function brickArch(x, y, w, h, archH) {
  c.fillStyle = hg(x, x + w, [[0, '#b9654a'], [0.5, '#9a4a35'], [1, '#6c3123']]); c.fillRect(x, y - h, w, h);
  const r = rng(x); for (let yy = y - h; yy < y; yy += 5) { line(x, yy, x + w, yy, 'rgba(60,25,15,0.35)', 0.8); for (let xx = x + ((yy / 5) % 2) * 6; xx < x + w; xx += 12) line(xx, yy, xx, yy + 5, 'rgba(60,25,15,0.25)', 0.6); }
  c.fillStyle = 'rgba(70,110,50,0.75)'; for (let k = 0; k < 30; k++) oval(x + r() * w, y - h + r() * 18, 3 + r() * 7, 2 + r() * 4, 0, `rgba(${70 + r() * 40},${110 + r() * 40},50,0.8)`);
}
function persimmonRack(x, y, w, rows, cols, s) {
  c.fillStyle = '#8a6a3c'; c.fillRect(x - 2, y - 6, 4, 60 * s); c.fillRect(x + w - 2, y - 6, 4, 60 * s);
  for (let rr = 0; rr < rows; rr++) { const yy = y + rr * 10 * s; c.fillStyle = '#c9a76a'; c.fillRect(x, yy, w, 6 * s);
    for (let k = 0; k < cols; k++) { const px = x + (k + 0.5) * w / cols; oval(px, yy + 1 * s, w / cols * 0.42, 3.2 * s, 0, '#e07a1f'); oval(px - 1, yy - 0.2 * s, w / cols * 0.22, 1.4 * s, 0, 'rgba(255,200,120,0.7)'); } }
}
function windLion(x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = hg(-40, 40, [[0, '#b7ab98'], [1, '#6f6656']]); c.fillRect(-36, -30, 72, 30); c.fillRect(-42, -36, 84, 8);
  const st = hg(-30, 30, [[0, '#cfc2a9'], [0.6, '#a4977f'], [1, '#6e6352']]);
  c.fillStyle = st; c.beginPath(); c.moveTo(-18, -36); c.lineTo(-22, -110); c.quadraticCurveTo(-26, -150, 0, -158); c.quadraticCurveTo(28, -150, 22, -110); c.lineTo(18, -36); c.closePath(); c.fill();
  poly([[-22, -126], [22, -126], [30, -60], [-30, -60]], '#c8302a'); poly([[-22, -126], [22, -126], [16, -110], [-16, -110]], '#e04a3a');
  for (let k = 0; k < 16; k++) { const a = k / 16 * TAU; const g = c.createRadialGradient(Math.cos(a) * 25 - 2, -150 + Math.sin(a) * 23 - 2, 1, Math.cos(a) * 25, -150 + Math.sin(a) * 23, 9); g.addColorStop(0, '#bdb09a'); g.addColorStop(1, '#6e6352'); c.fillStyle = g; c.beginPath(); c.arc(Math.cos(a) * 25, -150 + Math.sin(a) * 23, 9, 0, TAU); c.fill(); }
  const fg = c.createRadialGradient(-6, -156, 2, 0, -148, 24); fg.addColorStop(0, '#d8ccb4'); fg.addColorStop(1, '#8e8370'); c.fillStyle = fg; c.beginPath(); c.ellipse(0, -149, 21, 20, 0, 0, TAU); c.fill();
  [-8, 8].forEach(ex => { oval(ex, -156, 6, 5, 0, '#efe9dc'); disc(ex + 1, -155.5, 2.8, '#1e1a16'); oval(ex, -161, 7, 2, 0, 'rgba(90,80,65,0.7)'); });
  oval(0, -147, 6, 4, 0, '#7d7262'); disc(-3, -146, 1.4, '#2b2620'); disc(3, -146, 1.4, '#2b2620');
  c.fillStyle = '#7b2420'; c.beginPath(); c.ellipse(0, -136, 12, 6, 0, 0, Math.PI); c.fill(); c.fillStyle = '#efe9dc'; for (let k = -2; k <= 2; k++) c.fillRect(k * 4 - 1, -136, 2.4, 3);
  line(-18, -96, -26, -70, '#a4977f', 9); line(18, -96, 26, -70, '#a4977f', 9);
  c.restore();
}
function minnanHouse(x, y, w, h, s = 1) {
  c.fillStyle = vg(y - h, y, [[0, '#c4583c'], [1, '#93402c']]); c.fillRect(x, y - h, w, h);
  for (let yy = y - h; yy < y; yy += 4 * s) line(x, yy, x + w, yy, 'rgba(90,30,20,0.25)', 0.6);
  c.fillStyle = '#d9cfbd'; c.fillRect(x, y - 14 * s, w, 14 * s); c.fillStyle = '#3a3030'; c.fillRect(x + w * 0.42, y - h * 0.6, w * 0.16, h * 0.6);
  const rt = y - h - 26 * s; c.fillStyle = vg(rt, y - h, [[0, '#7a4a3a'], [1, '#5a3528']]); c.beginPath(); c.moveTo(x - 6 * s, y - h); c.lineTo(x + 10 * s, rt + 6 * s); c.lineTo(x + w - 10 * s, rt + 6 * s); c.lineTo(x + w + 6 * s, y - h); c.closePath(); c.fill();
  c.strokeStyle = '#4a2a20'; c.lineWidth = 4 * s; c.beginPath(); c.moveTo(x - 4 * s, rt - 8 * s); c.quadraticCurveTo(x + 14 * s, rt + 8 * s, x + w / 2, rt + 5 * s); c.quadraticCurveTo(x + w - 14 * s, rt + 8 * s, x + w + 4 * s, rt - 8 * s); c.stroke();
}

/* 12 — 雲林縣 西螺大橋 */
SCENES.push({ county: '雲林縣', place: '西螺大橋', en: 'Xiluo Bridge over the Zhuoshui', ll: '23.80°N 120.46°E', cam: [1.02, 1.08, 30, -30, 0, 0],
  sub: ['雲林的西螺大橋，紅色鋼架橫過濁水溪。', 'In Yunlin, the red Xiluo Bridge strides across the Zhuoshui River.'],
  draw(lt) {
    const hz = 400;
    L('sky', 0, () => { sky([[0, '#5f8fc0'], [0.55, '#d9d6c6'], [1, '#f2dcae']]); cumulus(300, 250, 400, 70, 151, '#fff6e6', '#d4c3b4', 0.4); cumulus(1000, 220, 300, 60, 152, '#fff6e6', '#d2c1b2', 0.4); }, { blur: 2 });
    L('far', 0.06, () => mountain({ base: 392, amp: 40, f: 0.003, seed: 153, top: '#9aa2b0', bot: '#b5b5b4', haze: 'rgba(230,220,200,0.5)' }), { blur: 2 });
    L('river', 0.3, () => { c.fillStyle = vg(hz, H, [[0, '#b6a988'], [1, '#8a7d62']]); c.fillRect(-M, hz, W + 2 * M, H);
      const r = rng(154); for (let k = 0; k < 9; k++) { const y = hz + 8 + Math.pow(r(), 1.3) * 160, x = r() * W, w = 120 + r() * 400; oval(x, y, w, 3 + (y - hz) * 0.06, 0, 'rgba(150,160,165,0.75)'); oval(x, y - 1, w * 0.8, 1 + (y - hz) * 0.02, 0, 'rgba(230,230,225,0.5)'); }
      for (let k = 0; k < 600; k++) { const y = hz + Math.pow(r(), 1.2) * 220; disc(r() * (W + 2 * M) - M, y, 0.5 + (y - hz) * 0.01, 'rgba(90,80,60,0.25)'); } });
    L('bridge', 0.3, () => { const y0 = 360, y1 = 392, x0 = -M, x1 = W + M; c.fillStyle = '#7a5145'; c.fillRect(x0, y1, x1 - x0, 6); for (let x = x0; x < x1; x += 120) { c.fillStyle = '#8f8a80'; c.fillRect(x + 50, y1 + 6, 12, 30); }
      c.strokeStyle = '#c73a2c'; c.lineWidth = 3; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y0); c.moveTo(x0, y1); c.lineTo(x1, y1); c.stroke();
      c.lineWidth = 2.2; c.beginPath(); for (let x = x0; x < x1; x += 120) { const top = u => y0 - 14 * Math.sin(u * Math.PI); c.moveTo(x, y1); for (let k = 0; k <= 6; k++) c.lineTo(x + k * 20, top(k / 6)); c.lineTo(x + 120, y1); for (let k = 0; k < 6; k++) { c.moveTo(x + k * 20, k % 2 ? top(k / 6) : y1); c.lineTo(x + k * 20 + 20, k % 2 ? y1 : top((k + 1) / 6)); } } c.stroke();
      c.lineWidth = 1.2; c.beginPath(); for (let x = x0; x < x1; x += 10) { c.moveTo(x, y0); c.lineTo(x, y1); } c.strokeStyle = 'rgba(160,40,30,0.7)'; c.stroke(); });
    D(0.3, () => { const vx = mod(lt * 60, 1400) - 100; c.fillStyle = '#e8e2d0'; c.fillRect(vx, 384, 18, 7); c.fillStyle = '#3c5d8a'; c.fillRect(1100 - mod(lt * 80, 1400), 384, 14, 7); shimmer(hz + 10, 560, 80, '255,250,235', 155, { a: 0.4 }); flock(5, 500, 260, 14, 0.6, 'rgba(60,55,50,0.8)', 156, lt); });
    L('bank', 0.9, () => { c.fillStyle = vg(560, H, [[0, '#7c8a4a'], [1, '#3f4a24']]); c.beginPath(); c.moveTo(-M, H); c.lineTo(-M, 574); c.quadraticCurveTo(600, 560, W + M, 580); c.lineTo(W + M, H); c.fill(); c.fillStyle = '#b4a382'; c.fillRect(-M, 590, W + 2 * M, 14); });
    D(0.9, () => { const r = rng(157); c.lineCap = 'round'; for (let k = 0; k < 70; k++) { const x = r() * (W + 2 * M) - M, y = 600 + r() * 40, h = 50 + r() * 60, sw = Math.sin(T * 1.4 + x * 0.01) * 10; c.strokeStyle = 'rgba(90,85,50,0.9)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + sw * 0.3, y - h * 0.6, x + sw, y - h); c.stroke(); oval(x + sw + 4, y - h + 6, 4, 12, 0.4 + sw * 0.03, 'rgba(240,225,200,0.75)'); }
      const x = 420 + lt * 28; actCat({ x, y: 594, s: 0.9, pose: 'walk', ph: walkPh(lt * 28, 0.9), rim: '255,230,180', look: -0.02, blink: blinkAt(lt, 11), shadowA: 0.3 }); });
  } });

/* 13 — 彰化縣 扇形車庫 */
SCENES.push({ county: '彰化縣', place: '彰化扇形車庫', en: 'Changhua Roundhouse', ll: '24.08°N 120.54°E', cam: [1.03, 1.09, 0, 0, 0, 0],
  sub: ['彰化的扇形車庫，老火車在這裡轉個身。', 'In Changhua, old trains turn around in the roundhouse.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#6c9ccc'], [1, '#e3e0d2']]); cumulus(640, 200, 600, 80, 161, '#ffffff', '#ccd2da', 0); }, { blur: 2 });
    L('house', 0.35, () => { const y = 452, n = 9, bw = 122, x0 = 640 - n * bw / 2;
      c.fillStyle = vg(y, H, [[0, '#8c8478'], [1, '#5a5348']]); c.fillRect(-M, y, W + 2 * M, H);
      for (let k = 0; k < n; k++) { const x = x0 + k * bw;
        c.fillStyle = hg(x, x + bw, [[0, '#efdfa6'], [1, '#cdb97e']]); c.fillRect(x, y - 172, bw, 172); c.fillStyle = '#3a3634'; c.fillRect(x + bw / 2 - 5, y - 232, 10, 40); c.fillRect(x + bw / 2 - 8, y - 236, 16, 6);
        poly([[x - 2, y - 172], [x + bw / 2, y - 198], [x + bw + 2, y - 172]], '#6d6760'); c.fillStyle = '#57524c'; c.fillRect(x - 2, y - 174, bw + 4, 5);
        c.fillStyle = vg(y - 136, y, [[0, '#0f0d0d'], [1, '#2a2524']]); c.fillRect(x + 12, y - 136, bw - 24, 136);
        c.fillStyle = 'rgba(255,255,255,0.12)'; for (let w = 0; w < 4; w++) c.fillRect(x + 18 + w * 22, y - 162, 16, 18);
        if (k % 3 === 1) { const mx = x + bw / 2; c.fillStyle = '#121010'; c.fillRect(mx - 40, y - 112, 80, 98); c.fillRect(mx - 9, y - 132, 18, 22);
          const g = c.createRadialGradient(mx - 10, y - 80, 4, mx, y - 70, 36); g.addColorStop(0, '#4a4545'); g.addColorStop(1, '#141212'); c.fillStyle = g; c.beginPath(); c.arc(mx, y - 70, 34, 0, TAU); c.fill();
          c.strokeStyle = '#6b6565'; c.lineWidth = 2; c.beginPath(); c.arc(mx, y - 70, 24, 0, TAU); c.stroke(); disc(mx, y - 70, 4, '#8a8484');
          c.fillStyle = '#b8352a'; c.fillRect(mx - 46, y - 30, 92, 12); c.fillStyle = '#e8d9a8'; c.fillRect(mx - 14, y - 52, 28, 9); glow(mx, y - 106, 16, '255,240,190', 0.8); disc(mx, y - 106, 4, '#fff6d8'); }
        for (let s2 = -1; s2 <= 1; s2 += 2) { const rx = x + bw / 2 + s2 * 22; line(rx, y, lerp(rx, 640 + s2 * 26, 1), 690, '#3b3632', 3); line(rx, y, 640 + s2 * 26, 690, 'rgba(230,220,200,0.55)', 1); } }
    });
    L('turn', 0.85, () => { c.fillStyle = vg(560, H, [[0, '#6a6358'], [1, '#3a352e']]); c.beginPath(); c.ellipse(640, 680, 520, 90, 0, 0, TAU); c.fill(); c.fillStyle = '#4f6f5e'; c.fillRect(160, 600, 960, 18); c.fillStyle = '#3c5548'; c.fillRect(160, 618, 960, 8); for (let k = 0; k < 24; k++) c.fillRect(170 + k * 40, 590, 4, 12); line(160, 590, 1120, 590, '#4f6f5e', 2); });
    D(0.85, () => { const x = 300 + lt * 30; actCat({ x, y: 602, s: 0.95, pose: 'walk', ph: walkPh(lt * 30, 0.95), rim: '255,245,220', look: 0, blink: blinkAt(lt, 12), shadowA: 0.3 });
      for (let p = 0; p < 6; p++) { const u = mod(lt * 0.3 + p / 6, 1); c.save(); c.globalAlpha = (1 - u) * 0.35; c.filter = 'blur(6px)'; disc(470 + u * 30, 380 - u * 160, 20 + u * 40, '#f2f0ea'); c.restore(); } });
  } });

/* 14 — 南投縣 日月潭 */
SCENES.push({ county: '南投縣', place: '日月潭', en: 'Sun Moon Lake', ll: '23.86°N 120.91°E', cam: [1.02, 1.08, -20, 20, 0, 0],
  sub: ['南投日月潭，湖面靜得像一面鏡子。', 'Sun Moon Lake in Nantou, still as a mirror.'],
  draw(lt) {
    const hz = 410;
    const land = () => { sky([[0, '#8fa9c4'], [0.5, '#e6d6c8'], [0.6, '#f6dcbc'], [1, '#f6dcbc']]); glow(900, 380, 380, '255,215,170', 0.45);
      mountain({ base: 370, amp: 120, f: 0.0035, seed: 171, top: '#8d9cb0', bot: '#b8b6bd', haze: 'rgba(240,220,210,0.55)' });
      mountain({ base: 400, amp: 80, f: 0.0045, seed: 172, top: '#5d7a74', bot: '#7e938e', tex: 'forest', dark: '#4a6660', mid: '#5f7e74', light: '#93ab98', depth: 90, n: 1600, r: 2.5, haze: 'rgba(230,220,215,0.4)', floor: hz + 1 });
      const px = 1030, py = 300 + 0; for (let k = 0; k < 9; k++) { const w = 8 - k * 0.6, y = 322 - k * 7; c.fillStyle = '#efe4cf'; c.fillRect(px - w * 0.6, y - 6, w * 1.2, 6); poly([[px - w, y - 5], [px + w, y - 5], [px + w * 0.6, y - 8], [px - w * 0.6, y - 8]], '#8c3f34'); } line(px, 258, px, 250, '#333', 1);
      oval(420, hz + 2, 40, 6, 0, '#4d6b5c'); for (let k = 0; k < 12; k++) oval(400 + k * 4, hz - 6 - Math.sin(k) * 4, 7, 9, 0, '#3f5f4e'); };
    L('land', 0.15, land, { blur: 0.6 });
    L('lake', 0.15, () => { c.fillStyle = vg(hz, H, [[0, '#c9c4c4'], [1, '#71858c']]); c.fillRect(-M, hz, W + 2 * M, H); });
    R('land', 0.15, hz + 1, 0.6, land, 2.5);
    L('mist', 0.25, () => { for (let k = 0; k < 8; k++) stratus(k * 190, 400 + (k % 2) * 10, 420, 30, 'rgba(255,245,235,0.6)'); }, { blur: 6, dx: lt * 8 - 30 });
    D(0.2, () => { shimmer(hz + 2, H, 160, '255,245,230', 173, { a: 0.35, len: 30 }); shimmer(hz + 2, 520, 60, '255,220,170', 174, { xc: 900, spread: 200, a: 0.5, op: 'lighter' });
      const bx = 700 + lt * 18; c.save(); c.translate(bx, 470); poly([[-30, 0], [30, 0], [36, -6], [-36, -5]], '#3a2e2a'); c.fillStyle = '#e9e1d0'; c.fillRect(-12, -16, 22, 10); c.restore(); for (let w = 0; w < 4; w++) { const u = mod(lt * 0.4 + w / 4, 1); c.strokeStyle = `rgba(255,255,255,${(1 - u) * 0.4})`; c.lineWidth = 1; c.beginPath(); c.ellipse(bx - 40 - u * 80, 472, 20 + u * 50, 2 + u * 3, 0, 0, Math.PI); c.stroke(); } });
    L('dock', 0.95, () => { poly([[-M, H], [-M, 572], [380, 566], [460, H]]); c.fillStyle = vg(566, H, [[0, '#6b5444'], [1, '#2e221b']]); c.fill(); for (let k = 0; k < 12; k++) line(-M + k * 46, 572 - k * 0.5, -M + k * 52, H, 'rgba(30,20,15,0.6)', 1.5); c.fillStyle = '#3a2c24'; c.fillRect(360, 540, 14, 120); c.fillRect(-20, 530, 14, 60); });
    D(0.95, () => actCat({ x: 230, y: 580, s: 1.1, pose: 'sit', rim: '255,225,190', look: -0.04, blink: blinkAt(lt, 13) }));
  } });

/* 15 — 臺中市 高美濕地 */
SCENES.push({ county: '臺中市', place: '高美濕地', en: 'Gaomei Wetlands', ll: '24.31°N 120.55°E', cam: [1.02, 1.07, 20, -20, 0, 0],
  sub: ['臺中高美濕地，風車慢慢轉著黃昏。', 'At Gaomei Wetlands, the windmills slowly turn the dusk.'],
  draw(lt) {
    const hz = 400, sx = 560, sy = 365 + lt * 4;
    const skyP = () => { sky([[0, '#2f3361'], [0.35, '#8e5a85'], [0.5, '#ec8a6a'], [0.56, '#ffb27a'], [1, '#ffd29a']]); stratus(300, 260, 900, 40, 'rgba(255,140,140,0.45)'); stratus(1000, 300, 900, 30, 'rgba(255,170,140,0.5)'); };
    L('sky', 0, skyP);
    D(0, () => { glow(sx, sy, 420, '255,160,100', 0.55); c.save(); c.beginPath(); c.rect(-M, 0, W + 2 * M, hz); c.clip(); disc(sx, sy, 26, '#ffe2a8'); c.restore(); });
    L('wet', 0.2, () => { c.save(); c.beginPath(); c.rect(-M, hz, W + 2 * M, H); c.clip(); c.translate(0, 2 * hz); c.scale(1, -1); c.drawImage(getLayer('sky', skyP), -M, 0, W + 2 * M, H); c.restore(); c.fillStyle = 'rgba(40,30,50,0.25)'; c.fillRect(-M, hz, W + 2 * M, H);
      const r = rng(181); for (let k = 0; k < 40; k++) { const y = hz + 4 + Math.pow(r(), 1.5) * 220; oval(r() * W, y, 30 + r() * 140, 1 + (y - hz) * 0.03, 0, 'rgba(50,35,45,0.55)'); } });
    D(0.2, () => { glow(sx, 2 * hz - sy, 200, '255,170,110', 0.35); shimmer(hz + 2, H, 100, '255,200,150', 182, { xc: sx, spread: 200, a: 0.5, op: 'lighter' });
      for (let k = 0; k < 12; k++) { const x = 60 + k * 110, h = 150 - Math.abs(k - 5) * 4; turbine(x, hz, h, T * 0.9 + k * 0.7, 'rgba(40,30,45,0.9)'); c.save(); c.translate(0, 2 * hz); c.scale(1, -1); c.globalAlpha = 0.35; turbine(x, hz, h, T * 0.9 + k * 0.7, 'rgba(40,30,45,0.9)'); c.restore(); } });
    L('walk', 0.8, () => { poly([[-M, 560], [W + M, 540], [W + M, 556], [-M, 578]], '#2b2129'); for (let k = 0; k < 30; k++) { const x = -M + k * 50; line(x, 578 - k * 0.6 + 0, x, 600, 'rgba(35,28,35,0.9)', 3); } });
    D(0.8, () => { const x = 280 + lt * 28, y = 560 - (x + M) * 20 / (W + 2 * M); actCat({ x, y, s: 0.85, pose: 'walk', ph: walkPh(lt * 28, 0.85), sil: true, rim: '255,165,110', shadow: false });
      c.save(); c.translate(0, 2 * 600); c.scale(1, -1); c.globalAlpha = 0.3; actCat({ x, y, s: 0.85, pose: 'walk', ph: walkPh(lt * 28, 0.85), sil: true, shadow: false }); c.restore(); flock(6, 800, 230, -12, 0.6, 'rgba(30,20,35,0.85)', 183, lt); });
  } });

/* 16 — 苗栗縣 龍騰斷橋 */
SCENES.push({ county: '苗栗縣', place: '龍騰斷橋', en: 'Longteng Bridge Ruins', ll: '24.37°N 120.78°E', cam: [1.03, 1.09, -30, 10, 0, 0],
  sub: ['苗栗的龍騰斷橋，桐花像雪一樣落下。', 'At Miaoli’s Longteng Bridge, tung blossoms fall like snow.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#9cb6c9'], [1, '#e9ece4']]); stratus(600, 200, 1200, 80, 'rgba(255,255,255,0.6)'); });
    L('m1', 0.06, () => mountain({ base: 300, amp: 110, f: 0.0035, seed: 191, top: '#8ea6a0', bot: '#a9b9b0', haze: 'rgba(225,232,228,0.6)' }), { blur: 1.4 });
    L('m2', 0.2, () => mountain({ base: 380, amp: 120, f: 0.004, seed: 192, top: '#58785a', bot: '#6f8c66', tex: 'forest', dark: '#3d5c40', mid: '#56784f', light: '#9bb882', depth: 260, n: 3200, r: 4, haze: 'rgba(210,225,215,0.4)' }), { blur: 0.6 });
    L('bridge', 0.45, () => { [[220, 470, 92, 230], [460, 470, 100, 250], [710, 470, 92, 210], [950, 470, 86, 180]].forEach(([x, y, w, h], i) => { brickArch(x, y, w, h); if (i < 3) { c.strokeStyle = '#8f4330'; c.lineWidth = 28; c.beginPath(); c.arc(x + w + 95, y - h + 120, 102, Math.PI * 1.08, Math.PI * (i === 1 ? 1.5 : 1.92)); c.stroke(); } });
      mountain({ base: 520, amp: 40, f: 0.005, seed: 193, top: '#4d6e3e', bot: '#3c5a32', tex: 'forest', dark: '#33502b', mid: '#4f7040', light: '#89aa62', depth: 200, n: 2600, r: 5 }); });
    L('fg', 0.95, () => { c.fillStyle = vg(560, H, [[0, '#6b8c44'], [1, '#3b5226']]); c.beginPath(); c.moveTo(-M, H); c.lineTo(-M, 590); c.quadraticCurveTo(640, 570, W + M, 596); c.lineTo(W + M, H); c.fill(); const r = rng(194); for (let k = 0; k < 200; k++) disc(r() * (W + 2 * M) - M, 592 + r() * 40, 1.5 + r() * 2, 'rgba(250,248,240,0.85)'); });
    D(0.95, () => { grassTufts(590, 630, 140, ['#7da04e', '#5f8238', '#9cbf68'], 195, 1, 16); const x = 380 + lt * 28; actCat({ x, y: 594, s: 0.95, pose: 'walk', ph: walkPh(lt * 28, 0.95), rim: '255,250,235', blink: blinkAt(lt, 14), shadowA: 0.25 });
      const r = rng(196); for (let k = 0; k < 60; k++) { const x2 = mod(r() * W * 1.2 + T * (20 + r() * 20), W + 100) - 50, y2 = mod(r() * H + T * (25 + r() * 25), H); c.save(); c.translate(x2, y2); c.rotate(T * (1 + r()) + k); const s = 2.5 + r() * 2.5; for (let p = 0; p < 5; p++) { const a = p / 5 * TAU; oval(Math.cos(a) * s * 0.6, Math.sin(a) * s * 0.6, s * 0.6, s * 0.4, a, 'rgba(255,253,245,0.95)'); } disc(0, 0, s * 0.25, '#d9534a'); c.restore(); } });
  } });

/* 17 — 新竹縣 新埔柿餅 */
SCENES.push({ county: '新竹縣', place: '新埔柿餅園', en: 'Persimmon Farms of Xinpu', ll: '24.83°N 121.07°E', cam: [1.02, 1.08, 20, -20, 0, 0],
  sub: ['新竹的九降風，把柿子吹成了金黃色。', 'Hsinchu’s autumn wind dries the persimmons to gold.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#6f9dc8'], [1, '#f1dfb8']]); cumulus(900, 210, 360, 80, 201, '#fff7e8', '#d8c7b2', -0.3); }, { blur: 2 });
    L('hill', 0.08, () => mountain({ base: 360, amp: 60, f: 0.004, seed: 202, top: '#6d8a6a', bot: '#8a9c7c', tex: 'forest', dark: '#4f6b4c', mid: '#6b8862', light: '#a7bd8a', depth: 60, n: 1200, r: 3 }), { blur: 0.8 });
    L('farm', 0.25, () => { minnanHouse(160, 400, 320, 70, 1); minnanHouse(560, 396, 220, 60, 0.9); c.fillStyle = vg(400, H, [[0, '#b9a37a'], [1, '#8a7452']]); c.fillRect(-M, 400, W + 2 * M, H); });
    L('racks', 0.6, () => { for (let row = 0; row < 4; row++) { const y = 430 + row * 40 + row * row * 6, s = 0.6 + row * 0.3, n = 12 - row * 2; for (let k = 0; k < n; k++) { const x = -60 + k * (W + 120) / n + (row % 2) * 40, rx = 52 * s, ry = 16 * s;
        c.fillStyle = '#7a6040'; c.beginPath(); c.ellipse(x, y + 4 * s, rx * 1.02, ry * 1.1, 0, 0, TAU); c.fill(); c.fillStyle = '#c9a66a'; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.fill();
        c.save(); c.beginPath(); c.ellipse(x, y, rx * 0.94, ry * 0.9, 0, 0, TAU); c.clip(); const r = rng(row * 50 + k); for (let a = 0; a < 26; a++) { const px = x + (r() - 0.5) * rx * 1.9, py = y + (r() - 0.5) * ry * 1.8; oval(px, py, 6 * s, 2.6 * s, 0, mix('#e0741c', '#f29a3a', r())); oval(px - 1.5 * s, py - 0.6 * s, 2.5 * s, 1 * s, 0, 'rgba(255,220,150,0.6)'); } c.restore(); } } });
    D(0.6, () => { const r = rng(203); for (let k = 0; k < 40; k++) { const x2 = mod(r() * W * 1.3 + T * (160 + r() * 120), W + 200) - 100, y2 = 200 + r() * 400 + Math.sin(T * 3 + k) * 20; c.save(); c.translate(x2, y2); c.rotate(T * 4 + k); oval(0, 0, 5, 2.4, 0, mix('#c47a2a', '#9a6a2a', r(), 0.85)); c.restore(); }
      for (let k = 0; k < 8; k++) { const u = mod(T * 0.4 + k / 8, 1); c.strokeStyle = `rgba(255,245,220,${0.18 * Math.sin(u * Math.PI)})`; c.lineWidth = 1; c.beginPath(); c.moveTo(-M + u * 1600 - 300, 300 + k * 40); c.quadraticCurveTo(u * 1600, 290 + k * 40, u * 1600 + 200, 300 + k * 40); c.stroke(); } });
    L('fg', 0.95, () => { c.fillStyle = vg(590, H, [[0, '#a68e66'], [1, '#6d5a3e']]); c.fillRect(-M, 600, W + 2 * M, 200); });
    D(0.95, () => { const x = 300 + lt * 30; actCat({ x, y: 612, s: 1.0, pose: 'walk', ph: walkPh(lt * 30, 1.0), rim: '255,220,170', look: 0.05, blink: blinkAt(lt, 15), shadowA: 0.3 }); });
  } });

/* 18 — 新竹市 東門城 */
SCENES.push({ county: '新竹市', place: '迎曦東門城', en: 'East Gate of Hsinchu', ll: '24.80°N 120.97°E', cam: [1.03, 1.1, 0, 0, 0, 10],
  sub: ['新竹市的東門城，兩百年來守著每個夜晚。', 'Hsinchu’s East Gate has watched over the city’s nights for two centuries.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#16234a'], [0.5, '#3a4f86'], [0.72, '#8a7aa2'], [1, '#d59a8a']]); stars(30, 211, 200, 0.5); });
    L('city', 0.1, () => skyline(430, 212, '#2a3054', '#3c4268', { hmin: 30, hvar: 120, win: 0.08 }), { blur: 0.8 });
    L('gate', 0.4, () => { const x = 640, y = 470;
      c.fillStyle = hg(x - 170, x + 170, [[0, '#8f8a82'], [0.6, '#6d6862'], [1, '#4c4844']]); c.fillRect(x - 170, y - 110, 340, 110); for (let yy = y - 110; yy < y; yy += 14) line(x - 170, yy, x + 170, yy, 'rgba(30,30,30,0.4)', 1); for (let yy = y - 110, k = 0; yy < y; yy += 14, k++) for (let xx = x - 170 + (k % 2) * 20; xx < x + 170; xx += 40) line(xx, yy, xx, yy + 14, 'rgba(30,30,30,0.35)', 1);
      c.fillStyle = '#1a1612'; c.beginPath(); c.moveTo(x - 36, y); c.lineTo(x - 36, y - 60); c.arc(x, y - 60, 36, Math.PI, 0); c.lineTo(x + 36, y); c.fill(); glow(x, y - 30, 60, '255,190,110', 0.35);
      c.fillStyle = '#8c2c22'; for (let k = -3; k <= 3; k++) c.fillRect(x + k * 34 - 4, y - 190, 8, 80); c.fillStyle = '#f0d7a8'; c.fillRect(x - 110, y - 190, 220, 80); c.fillStyle = 'rgba(255,190,110,0.6)'; c.fillRect(x - 100, y - 180, 200, 60); for (let k = -3; k <= 3; k++) { c.fillStyle = '#8c2c22'; c.fillRect(x + k * 34 - 4, y - 190, 8, 80); }
      c.fillStyle = '#2a2224'; c.beginPath(); c.moveTo(x - 160, y - 186); c.quadraticCurveTo(x - 120, y - 194, x - 100, y - 240); c.lineTo(x + 100, y - 240); c.quadraticCurveTo(x + 120, y - 194, x + 160, y - 186); c.lineTo(x + 150, y - 196); c.lineTo(x - 150, y - 196); c.closePath(); c.fill();
      c.strokeStyle = '#2a2224'; c.lineWidth = 5; c.beginPath(); c.moveTo(x - 120, y - 252); c.quadraticCurveTo(x - 100, y - 238, x, y - 240); c.quadraticCurveTo(x + 100, y - 238, x + 120, y - 252); c.stroke();
      c.fillStyle = '#e8d7b0'; c.font = `700 16px ${FONTS}`; c.textAlign = 'center'; c.fillText('迎曦', x, y - 82); });
    D(0.4, () => { glow(640, 330, 260, '255,180,100', 0.18); for (let k = -1; k <= 1; k += 2) glow(640 + k * 150, 470, 60, '255,200,130', 0.35); });
    L('plaza', 0.6, () => { c.fillStyle = vg(470, H, [[0, '#2b2a36'], [1, '#141420']]); c.fillRect(-M, 470, W + 2 * M, H); c.fillStyle = vg(500, 560, [[0, '#2a3a52'], [1, '#1a2438']]); c.fillRect(-M, 508, W + 2 * M, 50); });
    D(0.6, () => { shimmer(510, 556, 80, '255,190,120', 213, { xc: 640, spread: 400, a: 0.6, op: 'lighter' });
      for (let k = 0; k < 10; k++) { const u = mod(lt * 0.5 + k / 10, 1), y = 486 + (k % 2) * 8; const x = k % 2 ? lerp(-100, W + 100, u) : lerp(W + 100, -100, u); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = vg(0, 1, [[0, '#fff'], [1, '#fff']]); c.fillStyle = k % 2 ? 'rgba(255,80,70,0.6)' : 'rgba(255,240,210,0.6)'; c.fillRect(x - 60, y, 120, 2); c.restore(); }
      [[180, 470], [1100, 470]].forEach(([x, y]) => { line(x, y, x, y - 90, '#1b1b22', 3); glow(x, y - 92, 40, '255,210,150', 0.6); }); });
    L('wall', 0.95, () => { c.fillStyle = vg(576, H, [[0, '#4a4650'], [1, '#22202a']]); c.fillRect(-M, 580, W + 2 * M, 200); for (let x = -M; x < W + M; x += 46) line(x, 580, x, H, 'rgba(0,0,0,0.4)', 1); line(-M, 580, W + M, 580, 'rgba(255,200,140,0.35)', 1.5); });
    D(0.95, () => actCat({ x: 900, y: 582, s: 1.05, pose: 'sit', face: -1, rim: '255,190,130', look: -0.18, blink: blinkAt(lt, 16), shadowA: 0.25 }));
  } });

/* 19 — 桃園市 桃園國際機場 */
SCENES.push({ county: '桃園市', place: '桃園國際機場', en: 'Taoyuan International Airport', ll: '25.08°N 121.23°E', cam: [1.02, 1.07, 0, 0, 0, 0],
  sub: ['桃園機場。下一站，離島。', 'Taoyuan Airport. Next stop: the outer islands.'],
  draw(lt) {
    const hz = 430;
    L('sky', 0, () => { sky([[0, '#2b2f5a'], [0.4, '#7a5d88'], [0.6, '#e48d6c'], [0.75, '#f7b97f'], [1, '#f7c58c']]); stratus(400, 280, 900, 40, 'rgba(255,150,130,0.45)'); stratus(1000, 330, 800, 30, 'rgba(255,190,150,0.5)'); glow(900, 440, 300, '255,170,110', 0.4); });
    L('apt', 0.15, () => { c.fillStyle = '#2c2634'; c.fillRect(-M, hz - 18, W + 2 * M, 22); c.fillRect(980, hz - 90, 10, 80); poly([[960, hz - 90], [1010, hz - 90], [1004, hz - 112], [966, hz - 112]], '#2c2634'); c.fillStyle = '#ffd59a'; c.fillRect(968, hz - 106, 34, 8); skyline(hz - 16, 221, '#2c2634', '#3a3242', { hmin: 4, hvar: 18, win: 0.06 }); c.fillStyle = vg(hz, H, [[0, '#4a3f52'], [1, '#1f1a26']]); c.fillRect(-M, hz, W + 2 * M, H);
      poly([[560, hz], [720, hz], [1280, H], [0, H]], '#2a2530'); for (let k = 0; k < 14; k++) { const u = Math.pow(k / 14, 1.8), y = lerp(hz + 2, H, u); c.fillStyle = 'rgba(240,240,240,0.7)'; c.fillRect(640 - 4 - u * 6, y, 8 + u * 12, 2 + u * 10); } });
    D(0.15, () => { for (let k = 0; k < 18; k++) { const u = Math.pow(k / 18, 1.7), y = lerp(hz + 2, H, u); [[560, 0], [720, 1280]].forEach(([x0, x1], i) => { const x = lerp(x0, x1 === 0 ? 0 : 1280, u); glow(lerp(i ? 720 : 560, i ? 1280 : 0, u), y, 6 + u * 14, i ? '255,230,180' : '255,230,180', 0.8); }); } for (let k = 0; k < 12; k++) glow(k * 110, hz + 8, 5, '120,170,255', 0.8);
      const u = clamp((lt - 0.5) / 5.5), px = lerp(300, 1250, u), py = lerp(hz - 6, 120, Math.pow(u, 1.4)); plane(px, py, 0.9 + u * 0.4, -0.28 * Math.min(1, u * 3)); });
    L('fence', 0.95, () => { c.fillStyle = vg(560, H, [[0, '#2a2420'], [1, '#110e0c']]); c.fillRect(-M, 600, W + 2 * M, 200); c.strokeStyle = 'rgba(30,26,30,0.75)'; c.lineWidth = 1; for (let x = -M; x < W + M; x += 12) { line(x, 470, x + 40, 600, 'rgba(30,26,30,0.6)', 1); line(x + 40, 470, x, 600, 'rgba(30,26,30,0.6)', 1); } for (let x = -M; x < W + M; x += 200) line(x, 460, x, 610, '#1d1a1e', 5); line(-M, 466, W + M, 466, '#1d1a1e', 4); });
    D(0.95, () => actCat({ x: 420, y: 604, s: 1.15, pose: 'sit', sil: true, rim: '255,175,120', look: -0.35 + sm((lt - 1) / 4) * 0.15, blink: blinkAt(lt, 17), shadow: false }));
  } });

/* 20 — 金門縣 風獅爺 */
SCENES.push({ county: '金門縣', place: '風獅爺與閩南古厝', en: 'Wind Lion God, Kinmen', ll: '24.44°N 118.38°E', cam: [1.03, 1.09, 20, -10, 0, 0],
  sub: ['金門的風獅爺，替整個村子擋著風。', 'In Kinmen, the Wind Lion God shields the village from the wind.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#2f6fb5'], [0.6, '#9cc5e6'], [1, '#e7eef0']]); cumulus(400, 200, 380, 90, 231, '#ffffff', '#c7d2df', 0.35); cumulus(1050, 240, 300, 70, 232, '#ffffff', '#c7d2df', 0.35); }, { blur: 2 });
    L('village', 0.3, () => { minnanHouse(520, 450, 260, 90, 1.1); minnanHouse(820, 452, 300, 100, 1.2); minnanHouse(1140, 455, 220, 80, 1); bushes(30, 480, W + M, () => 448, 233, '#3d5a32', '#6a8a4a', 14); c.fillStyle = vg(450, H, [[0, '#c9b48a'], [1, '#9a845c']]); c.fillRect(-M, 452, W + 2 * M, H); });
    L('sorghum', 0.65, () => { const r = rng(234); for (let k = 0; k < 260; k++) { const x = 760 + r() * 700, y = 500 + r() * 120, h = 40 + r() * 40; line(x, y, x, y - h, '#6f8a3a', 1.4); oval(x, y - h - 6, 3.5, 8, 0, mix('#8a2f1e', '#b8552a', r())); } });
    D(0.65, () => { const r = rng(235); for (let k = 0; k < 120; k++) { const x = 760 + r() * 700, y = 470 + r() * 40, sw = Math.sin(T * 1.6 + x * 0.02) * 4; oval(x + sw, y, 3, 7, sw * 0.05, mix('#8a2f1e', '#c2602e', r(), 0.9)); } });
    L('lion', 0.75, () => { windLion(330, 600, 1.45); c.fillStyle = vg(590, H, [[0, '#b29c72'], [1, '#7a6648']]); c.fillRect(-M, 598, W + 2 * M, 200); });
    D(0.75, () => actCat({ x: 470, y: 604, s: 1.05, pose: 'sit', face: -1, rim: '255,250,235', look: 0.3, blink: blinkAt(lt, 18) }));
  } });

/* 21 — 連江縣 馬祖藍眼淚 */
SCENES.push({ county: '連江縣', place: '馬祖藍眼淚', en: 'Blue Tears of Matsu', ll: '26.16°N 119.95°E', cam: [1.02, 1.08, -20, 20, 0, 0],
  sub: ['馬祖的海，到了夜裡會發出藍光。', 'In Matsu, the sea glows blue at night.'],
  draw(lt) {
    const hz = 400;
    L('sky', 0, () => { sky([[0, '#05070f'], [0.6, '#0e1a33'], [1, '#1d2b45']]); c.save(); c.translate(700, 200); c.rotate(-0.5); stratus(0, 0, 1300, 150, 'rgba(140,150,200,0.25)'); stratus(0, 0, 900, 70, 'rgba(220,210,230,0.18)'); c.restore(); stars(500, 241, 420, 0.9); });
    L('isl', 0.1, () => { mountain({ base: hz, amp: 70, f: 0.005, seed: 242, top: '#0d1322', bot: '#121a2c', shape: (x, n) => x > 650 ? n : n * 0.2, floor: hz + 1 }); const r = rng(243); for (let k = 0; k < 40; k++) { const x = 700 + r() * 500, y = hz - 10 - r() * 40 * (1 - Math.abs(x - 950) / 300); c.fillStyle = '#1a2032'; c.fillRect(x, y, 14, 10); if (r() < 0.6) { c.fillStyle = 'rgba(255,200,120,0.85)'; c.fillRect(x + 4, y + 3, 4, 4); } } });
    L('sea', 0.2, () => { c.fillStyle = vg(hz, H, [[0, '#0b1426'], [1, '#04070e']]); c.fillRect(-M, hz, W + 2 * M, H); });
    D(0.2, () => { shimmer(hz + 2, H, 120, '160,180,230', 244, { a: 0.25 }); c.save(); c.globalCompositeOperation = 'lighter';
      for (let w = 0; w < 6; w++) { const u = mod(lt * 0.16 + w / 6, 1), y = lerp(440, 600, u), a = Math.sin(u * Math.PI);
        c.strokeStyle = `rgba(60,170,255,${0.55 * a})`; c.lineWidth = 3; c.beginPath(); for (let x = -M; x <= W + M; x += 10) { const yy = y + Math.sin(x * 0.012 + w * 2 + lt) * 6; x === -M ? c.moveTo(x, yy) : c.lineTo(x, yy); } c.stroke();
        c.strokeStyle = `rgba(120,220,255,${0.4 * a})`; c.lineWidth = 1; c.stroke(); }
      const r = rng(245); for (let k = 0; k < 220; k++) { const x = r() * (W + 2 * M) - M, y = 450 + r() * 170, a = Math.max(0, Math.sin(T * 3 * (0.5 + r()) + k)); disc(x, y, 1 + r() * 1.5, `rgba(90,200,255,${a * 0.85})`); }
      glow(640, 560, 500, '40,140,255', 0.18); c.restore(); });
    L('rock', 0.95, () => { const pts = [[-M, H], [-M, 560], [90, 548], [220, 560], [330, 590], [400, 640], [430, H]]; rockFG(pts, '#141b2a', '#06080e', 'rgba(90,190,255,0.55)', 246); });
    D(0.95, () => actCat({ x: 200, y: 556, s: 1.05, pose: 'sit', sil: true, rim: '90,190,255', look: 0.12, blink: blinkAt(lt, 19), shadow: false }));
  } });

/* 22 — 臺北市 回家 night */
SCENES.push({ county: '臺北市', place: '回到象山', en: 'Home again · Taipei', ll: '25.03°N 121.57°E', final: true, cam: [1.02, 1.12, 10, -30, 0, 8],
  sub: ['繞了一整圈，臺北的燈還亮著。', 'One full circle later, Taipei’s lights are still on.'],
  sub2: ['原來，家就是最後一站。', 'Home, it turns out, is the last stop.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#070b1c'], [0.45, '#1c2448'], [0.7, '#3d3a62'], [1, '#5d4a68']]); stars(260, 251, 360, 0.8); glow(640, 560, 700, '255,170,120', 0.2); });
    D(0, () => { const u = mod(lt, 9); if (u > 3 && u < 3.8) { const v = (u - 3) / 0.8; c.strokeStyle = `rgba(255,255,240,${Math.sin(v * Math.PI) * 0.8})`; c.lineWidth = 1.5; line(900 + v * 200, 120 + v * 60, 900 + v * 200 - 60, 120 + v * 60 - 18, `rgba(255,255,240,${Math.sin(v * Math.PI) * 0.8})`, 1.5); } });
    L('far', 0.08, () => mountain({ base: 470, amp: 120, f: 0.0032, seed: 1, oct: 5, top: '#141a32', bot: '#262844' }), { blur: 2 });
    L('city', 0.3, () => { skyline(540, 7, '#1d2140', '#2b2d50', { hmin: 14, hvar: 70, win: 0.35 }); tower101(860, 540, 360, { light: '#4a5a7a', dark: '#262c44', night: true }); c.fillStyle = vg(440, 560, [[0, 'rgba(255,170,120,0)'], [1, 'rgba(255,170,120,0.25)']]); c.fillRect(-M, 440, W + 2 * M, 140); });
    D(0.3, () => { const r = rng(252); for (let k = 0; k < 120; k++) { const x = r() * (W + 2 * M) - M, y = 480 + r() * 60, a = Math.max(0, Math.sin(T * (0.5 + r()) + k)); disc(x, y, 1, `rgba(255,220,160,${a})`); } glow(860, 540 - 360, 12, '255,60,50', Math.sin(T * 3) > 0.3 ? 0.9 : 0.2); glow(860, 360, 200, '255,190,130', 0.15); });
    L('rock', 0.92, () => { const pts = [[-M, H], [-M, 500], [40, 486], [150, 462], [250, 492], [330, 520], [470, 522], [560, 548], [660, 610], [760, 660], [820, H]]; rockFG(pts, '#1e1a26', '#08070c', 'rgba(255,190,140,0.35)', 3); bushes(40, -M, 250, x => 470 + Math.abs(x - 140) * 0.18, 4, '#0e0d14', '#1a1820', 16); });
    D(0.92, () => { grassTufts(505, 530, 60, ['#1e1a24', '#2a2430'], 5, 1, 12); actCat({ x: 410, y: 524, s: 1.05, pose: 'sit', sil: true, rim: '255,195,150', look: lt > 4 ? -0.02 - sm((lt - 4) / 2) * 0.2 : -0.06, blink: (lt > 6.5 && lt < 7.3) || blinkAt(lt, 20) }); });
  } });
