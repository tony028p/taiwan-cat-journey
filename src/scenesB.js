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
  // carved granite plinth
  c.fillStyle = hg(-46, 46, [[0, '#cfc6b4'], [1, '#8a8270']]); c.fillRect(-44, -34, 88, 34); c.fillStyle = '#b8ae9a'; c.fillRect(-50, -40, 100, 8); c.fillStyle = 'rgba(60,54,44,0.35)'; c.fillRect(-30, -26, 60, 16);
  // standing body: weathered granite, slightly tapering, legs and front paws carved in relief
  const st = hg(-34, 34, [[0, '#d6ccb6'], [0.55, '#ada28c'], [1, '#746a58']]);
  c.fillStyle = st; c.beginPath(); c.moveTo(-26, -40); c.lineTo(-30, -150); c.quadraticCurveTo(-34, -186, 0, -192); c.quadraticCurveTo(34, -186, 30, -150); c.lineTo(26, -40); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(70,62,50,0.45)'; c.lineWidth = 2; line(0, -110, 0, -42, c.strokeStyle, 2); line(-12, -62, -12, -42, c.strokeStyle, 2); line(12, -62, 12, -42, c.strokeStyle, 2);
  [-1, 1].forEach(sd => { c.fillStyle = st; c.beginPath(); c.ellipse(sd * 14, -104, 9, 22, sd * 0.2, 0, TAU); c.fill(); for (let k = 0; k < 3; k++) disc(sd * 14 + (k - 1) * 4, -84, 2.6, '#8a806c'); });
  const r = rng(77); for (let k = 0; k < 60; k++) disc((r() - 0.5) * 56, -50 - r() * 130, 1 + r() * 2, `rgba(${r() < 0.5 ? '60,54,44' : '240,236,226'},0.3)`);
  // red cape tied at the neck
  c.fillStyle = '#c8302a'; c.beginPath(); c.moveTo(-26, -148); c.quadraticCurveTo(0, -140, 26, -148); c.lineTo(36, -70); c.quadraticCurveTo(0, -60, -36, -70); c.closePath(); c.fill(); c.fillStyle = '#e24a3a'; c.beginPath(); c.moveTo(-26, -148); c.quadraticCurveTo(0, -140, 26, -148); c.lineTo(20, -134); c.quadraticCurveTo(0, -128, -20, -134); c.closePath(); c.fill();
  c.fillStyle = '#e24a3a'; c.beginPath(); c.ellipse(0, -138, 8, 5, 0, 0, TAU); c.fill(); poly([[-4, -136], [-12, -114], [-2, -118]], '#c8302a'); poly([[4, -136], [12, -114], [2, -118]], '#c8302a');
  // head: big round face ringed by carved mane curls
  for (let k = 0; k < 18; k++) { const a = k / 18 * TAU; const g = c.createRadialGradient(Math.cos(a) * 30 - 2, -178 + Math.sin(a) * 27 - 2, 1, Math.cos(a) * 30, -178 + Math.sin(a) * 27, 10); g.addColorStop(0, '#cbbfa6'); g.addColorStop(1, '#746a58'); c.fillStyle = g; c.beginPath(); c.arc(Math.cos(a) * 30, -178 + Math.sin(a) * 27, 10, 0, TAU); c.fill(); }
  const fg = c.createRadialGradient(-6, -186, 2, 0, -176, 28); fg.addColorStop(0, '#e0d6c0'); fg.addColorStop(1, '#948a76'); c.fillStyle = fg; c.beginPath(); c.ellipse(0, -177, 25, 24, 0, 0, TAU); c.fill();
  [-9, 9].forEach(ex => { oval(ex, -186, 7, 6, 0, '#f2ece0'); disc(ex + 1, -185.5, 3.2, '#1e1a16'); oval(ex, -193, 8, 2.4, 0, 'rgba(90,80,65,0.75)'); });
  oval(0, -175, 8, 5, 0, '#8a7f6c'); disc(-3.5, -174, 1.6, '#2b2620'); disc(3.5, -174, 1.6, '#2b2620');
  c.fillStyle = '#7b2420'; c.beginPath(); c.ellipse(0, -162, 14, 7, 0, 0, Math.PI); c.fill(); c.fillStyle = '#f2ece0'; for (let k = -2; k <= 2; k++) c.fillRect(k * 4.6 - 1.2, -162, 2.6, 3.4);
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
/* Changhua Roundhouse: the fan of bays wraps round the turntable (far in the middle, near at both ends), tracks radiate
   from the pit, and a black steam engine waits on the turntable bridge. */
function steamLoco(x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s);
  // tender (behind, right)
  c.fillStyle = vg(-92, -20, [[0, '#2a2a2e'], [1, '#121214']]); c.fillRect(150, -92, 110, 70); c.fillStyle = '#0c0c0e'; c.fillRect(146, -96, 118, 6); disc(176, -12, 13, '#1a1a1c'); disc(234, -12, 13, '#1a1a1c'); disc(176, -12, 5, '#b8352a'); disc(234, -12, 5, '#b8352a');
  // cab
  c.fillStyle = vg(-140, -30, [[0, '#2c2c30'], [1, '#141416']]); c.fillRect(92, -132, 62, 102); c.fillStyle = '#0d0d0f'; c.fillRect(86, -140, 74, 10);
  c.fillStyle = vg(-120, -86, [[0, '#ffd894'], [1, '#e89a4e']]); c.fillRect(104, -120, 38, 32); line(123, -120, 123, -88, '#151517', 3);
  // boiler
  const bg = c.createLinearGradient(0, -128, 0, -52); bg.addColorStop(0, '#4a4a50'); bg.addColorStop(0.35, '#26262a'); bg.addColorStop(1, '#0e0e10'); c.fillStyle = bg; c.fillRect(-20, -126, 116, 72);
  for (let k = 0; k < 4; k++) line(4 + k * 26, -126, 4 + k * 26, -54, 'rgba(160,160,170,0.35)', 1.4);
  line(-16, -112, 92, -112, 'rgba(220,220,230,0.5)', 1.2);
  // smokebox + door
  c.fillStyle = '#121214'; c.fillRect(-44, -128, 28, 76); c.beginPath(); c.ellipse(-44, -90, 10, 36, 0, 0, TAU); c.fill(); disc(-46, -90, 5, '#8a8a90');
  // chimney, domes
  c.fillStyle = '#18181a'; c.fillRect(-38, -170, 18, 44); c.fillRect(-42, -174, 26, 8); c.beginPath(); c.ellipse(26, -128, 14, 12, 0, Math.PI, 0); c.fill(); c.beginPath(); c.ellipse(64, -128, 11, 10, 0, Math.PI, 0); c.fill();
  disc(46, -136, 3, '#d9b04a');
  // frame, buffer beam, pilot
  c.fillStyle = '#b8352a'; c.fillRect(-66, -56, 220, 10); c.fillRect(-70, -64, 14, 26); poly([[-70, -38], [-56, -38], [-40, -10], [-78, -10]], '#2a2a2e'); for (let k = 0; k < 6; k++) line(-76 + k * 6, -12, -60 + k * 3, -38, '#6a6a70', 1);
  c.fillStyle = '#e8d9a8'; c.fillRect(-36, -48, 26, 8); c.font = `700 7px ${FONTS}`; c.fillStyle = '#1a1a1a'; c.textAlign = 'center'; c.fillText('CK 101', -23, -42);
  glow(-50, -100, 18, '255,240,190', 0.9); disc(-50, -100, 4.5, '#fff6d8');
  // driving wheels with spokes + rods
  const ang = t * 0.6; [[0, -24, 22], [50, -24, 22], [-34, -14, 12]].forEach(([wx, wy, r]) => { disc(wx, wy, r, '#141416'); c.strokeStyle = '#b8352a'; c.lineWidth = 3; c.beginPath(); c.arc(wx, wy, r - 2, 0, TAU); c.stroke();
    c.strokeStyle = '#6a6a70'; c.lineWidth = 1.4; for (let k = 0; k < 10; k++) { const a = ang + k * TAU / 10; line(wx, wy, wx + Math.cos(a) * (r - 3), wy + Math.sin(a) * (r - 3), '#5a5a60', 1.2); } disc(wx, wy, 4, '#b8352a'); });
  const cx = Math.cos(ang) * 9, cy = Math.sin(ang) * 9; line(cx, -24 + cy, 50 + cx, -24 + cy, '#a0a0a8', 3.5); line(-60, -40, cx, -24 + cy, '#8a8a90', 3);
  c.restore();
}
const RH = { cx: 640, cy: 770, rx: 900, ry: 310, th: 1.3 };   // fan geometry: bays on an ellipse round the turntable
function rhBay(th) { const x = RH.cx + RH.rx * Math.sin(th), yg = RH.cy - RH.ry * Math.cos(th) * 0.95, sc = clamp((yg - 400) / 70, 0.5, 3.2); return { x, yg, sc }; }
SCENES.push({ county: '彰化縣', place: '彰化扇形車庫', sun: () => [1100, 120, 0.55], en: 'Changhua Roundhouse', ll: '24.08°N 120.54°E', cam: [1.03, 1.09, 0, 0, 0, 0],
  sub: ['彰化的扇形車庫，老火車在這裡轉個身。', 'In Changhua, old trains turn around in the roundhouse.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#5f93c8'], [0.6, '#a9c6de'], [1, '#e6e2d4']]); cumulus(380, 150, 520, 70, 161, '#ffffff', '#c8d0da', 0.4); cumulus(1000, 190, 420, 54, 162, '#ffffff', '#cdd4dc', 0.4); }, { blur: 1.5 });
    L('town', 0.08, () => { const r = rng(166); for (let k = 0; k < 60; k++) { const x = r() * (W + 2 * M) - M, h = 20 + r() * 50; c.fillStyle = mix('#b8bfc6', '#d6d8d4', r()); c.fillRect(x, 340 - h, 24 + r() * 30, h); } c.fillStyle = 'rgba(225,228,226,0.55)'; c.fillRect(-M, 250, W + 2 * M, 100); }, { blur: 1.8 });
    // the fan of bays, painted from the middle (far) outwards (near) so near bays overlap far ones
    L('house', 0.35, () => { const n = 13, ths = []; for (let k = 0; k < n; k++) ths.push(lerp(-RH.th, RH.th, (k + 0.5) / n));
      c.fillStyle = vg(330, H, [[0, '#8f897e'], [1, '#5c564c']]); c.fillRect(-M, 330, W + 2 * M, H);
      const locoCols = [['#e0772e', '#2c4f86'], ['#c8342a', '#e8d9a8'], ['#e0772e', '#2c4f86'], ['#1a1a1c', '#b8352a'], ['#d8402e', '#f0e6c8'], ['#2f5f9a', '#e8c04a']];
      ths.slice().sort((a, b) => Math.abs(a) - Math.abs(b)).forEach((th, idx) => { const A = rhBay(th - 0.121), B = rhBay(th + 0.121), m = rhBay(th), hA = 120 * A.sc, hB = 120 * B.sc, haze = clamp(1 - (m.sc - 0.5) / 1.6) * 0.42;
        const P = (u, v) => [lerp(A.x, B.x, u), lerp(lerp(A.yg, B.yg, u), lerp(A.yg - hA, B.yg - hB, u), v)], Q = (pts, col) => poly(pts.map(([u, v]) => P(u, v)), col);
        const wall = mix('#e8c878', '#c8d0d6', haze), wallS = mix('#c4a458', '#b4bcc4', haze), band = mix('#d8b868', '#bcc4cc', haze), dark = mix('#16110e', '#7a848e', haze * 0.9), win = mix('rgba(60,70,80,0.75)', 'rgba(150,160,170,0.5)', haze);
        Q([[0, 0], [1, 0], [1, 1], [0, 1]], wall);
        Q([[0.17, 0], [0.83, 0], [0.83, 0.62], [0.17, 0.62]], dark);                         // tall bay opening
        Q([[0, 0.62], [1, 0.62], [1, 0.68], [0, 0.68]], wallS);                              // lintel
        for (let w = 0; w < 4; w++) { const u = 0.2 + w * 0.155; Q([[u, 0.73], [u + 0.11, 0.73], [u + 0.11, 0.88], [u, 0.88]], win); }   // upper-floor windows
        Q([[0, 0.93], [1, 0.93], [1, 1.0], [0, 1.0]], band); Q([[-0.02, 1.0], [1.02, 1.0], [1.02, 1.03], [-0.02, 1.03]], mix('#9a8450', '#a8b0b8', haze));   // cornice
        Q([[0, 0], [0.1, 0], [0.1, 1], [0, 1]], wallS);                                      // pillar
        // cylindrical vent on top of each pillar (and the last one)
        [0.05, ...(th === ths[n - 1] ? [0.95] : [])].forEach(u => { const b = P(u, 1.03), r = 7 * m.sc, h = 26 * m.sc; c.fillStyle = hg(b[0] - r, b[0] + r, [[0, mix('#d8b870', '#c0c8ce', haze)], [0.6, mix('#b89850', '#aab2ba', haze)], [1, mix('#8a7038', '#9aa2aa', haze)]]); c.fillRect(b[0] - r, b[1] - h, 2 * r, h); c.fillStyle = mix('#7a6434', '#9aa2aa', haze); c.fillRect(b[0] - r * 1.2, b[1] - h - 3 * m.sc, r * 2.4, 3.5 * m.sc); });
        // locomotives standing in most bays: diesel cabs (orange / red / blue) and the odd steam engine
        if (hash(th * 9 + 2) < 0.8 && Math.abs(th) > 0.12) { const [c1, c2] = locoCols[Math.floor(hash(th * 17) * locoCols.length)], f = P(0.5, 0.0), wv = (B.x - A.x) * 0.5, hv = hA * 0.5;
          if (c1 === '#1a1a1c') { c.fillStyle = mix('#121010', '#6c7680', haze); c.fillRect(f[0] - wv * 0.55, f[1] - hv, wv * 1.1, hv); const g = c.createRadialGradient(f[0] - wv * 0.1, f[1] - hv * 0.7, 2, f[0], f[1] - hv * 0.6, wv * 0.36); g.addColorStop(0, mix('#4a4545', '#9aa2aa', haze)); g.addColorStop(1, mix('#141212', '#6c7680', haze)); c.fillStyle = g; c.beginPath(); c.arc(f[0], f[1] - hv * 0.6, wv * 0.36, 0, TAU); c.fill(); c.fillStyle = mix('#b8352a', '#a8a0a0', haze); c.fillRect(f[0] - wv * 0.6, f[1] - hv * 0.22, wv * 1.2, hv * 0.1); }
          else { c.fillStyle = mix(c1, '#b8b0a8', haze); c.fillRect(f[0] - wv * 0.55, f[1] - hv, wv * 1.1, hv); c.fillStyle = mix(c2, '#a8b0b8', haze); c.fillRect(f[0] - wv * 0.55, f[1] - hv * 0.38, wv * 1.1, hv * 0.16);
            c.fillStyle = mix('rgba(30,40,50,0.85)', 'rgba(120,130,140,0.6)', haze); c.fillRect(f[0] - wv * 0.42, f[1] - hv * 0.86, wv * 0.36, hv * 0.24); c.fillRect(f[0] + wv * 0.06, f[1] - hv * 0.86, wv * 0.36, hv * 0.24);
            for (let st = 0; st < 5; st++) poly([[f[0] - wv * 0.55 + st * wv * 0.22, f[1] - hv * 0.12], [f[0] - wv * 0.44 + st * wv * 0.22, f[1] - hv * 0.12], [f[0] - wv * 0.5 + st * wv * 0.22, f[1]], [f[0] - wv * 0.61 + st * wv * 0.22, f[1]]], mix('#e8c04a', '#b8b8b0', haze)); }
          glow(f[0], f[1] - hv * 0.95, 9 * m.sc, '255,240,190', 0.6 * (1 - haze)); } });
      // radiating tracks to the turntable pit, sleepers on gravel
      ths.forEach(th => { const m = rhBay(th); for (const sd of [-1, 1]) { const off = sd * 9 * m.sc, ex = RH.cx + Math.sin(th) * 300 + sd * 6, ey = 640 - Math.cos(th) * 40;
        line(m.x + off, m.yg, ex, ey, '#3b3632', 3 * m.sc * 0.6 + 1); line(m.x + off, m.yg, ex, ey, 'rgba(235,225,205,0.6)', 1); }
        for (let k = 1; k < 9; k++) { const u = k / 9, x = lerp(m.x, RH.cx + Math.sin(th) * 300, u), y = lerp(m.yg, 640 - Math.cos(th) * 40, u), w = 14 * lerp(m.sc, 1.6, u); line(x - w * Math.cos(th), y - w * 0.15 * Math.sin(th), x + w * Math.cos(th), y + w * 0.15 * Math.sin(th), 'rgba(70,55,40,0.55)', 2); } });
      const r = rng(167); for (let k = 0; k < 600; k++) disc(r() * (W + 2 * M) - M, 420 + r() * 300, 0.6 + r() * 1.4, `rgba(${r() < 0.5 ? '40,36,32' : '200,190,170'},${0.25 + r() * 0.2})`);
    });
    // turntable pit and bridge with the engine
    L('pit', 0.75, () => { c.fillStyle = vg(560, H, [[0, '#9a5a32'], [1, '#5a3420']]); c.beginPath(); c.ellipse(RH.cx, 640, 380, 76, 0, 0, TAU); c.fill();
      c.strokeStyle = '#8a8070'; c.lineWidth = 6; c.beginPath(); c.ellipse(RH.cx, 640, 380, 76, 0, Math.PI, TAU); c.stroke(); c.strokeStyle = 'rgba(30,26,22,0.7)'; c.lineWidth = 2; c.beginPath(); c.ellipse(RH.cx, 646, 360, 66, 0, 0, TAU); c.stroke();
      c.fillStyle = '#3c5548'; c.fillRect(RH.cx - 360, 596, 720, 14); c.fillStyle = '#2c4036'; c.fillRect(RH.cx - 360, 610, 720, 8); for (let k = 0; k < 36; k++) c.fillRect(RH.cx - 352 + k * 20, 590, 4, 8);
      line(RH.cx - 360, 590, RH.cx + 360, 590, '#b8b0a0', 2); line(RH.cx - 360, 584, RH.cx + 360, 584, '#b8b0a0', 2); });
    D(0.75, () => { steamLoco(470, 590, 0.95, lt * 0.2);
      // steam leaking from the cylinders + a lazy plume from the chimney
      for (let p = 0; p < 6; p++) { const u = mod(lt * 0.3 + p / 6, 1); c.save(); c.globalAlpha = (1 - u) * 0.35; c.filter = `blur(${6 * S}px)`; disc(437 + u * 26, 422 - u * 150, 14 + u * 40, '#f2f0ea'); c.restore(); }
      for (let p = 0; p < 4; p++) { const u = mod(lt * 0.5 + p / 4, 1); c.save(); c.globalAlpha = (1 - u) * 0.28; c.filter = `blur(${5 * S}px)`; disc(410 - u * 40, 568 - u * 20, 8 + u * 22, '#f6f4f0'); c.restore(); } });
    D(0.85, () => { const x = 300 + lt * 30; actCat({ x, y: 602, s: 0.95, pose: 'walk', ph: walkPh(lt * 30, 0.95), rim: '255,245,220', look: 0, blink: blinkAt(lt, 12), shadowA: 0.3 }); });
    // sun shafts slanting across the yard, and an out-of-focus rail in the very foreground
    D(1, () => { godrays(1180, 40, 900, 9, '255,244,220', 0.07, 168, 0.5, Math.PI * 0.72); c.save(); c.filter = `blur(${7 * S}px)`; c.fillStyle = 'rgba(40,34,28,0.75)'; c.fillRect(-M, 640, W + 2 * M, 16); c.restore(); });
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
SCENES.push({ county: '臺中市', place: '高美濕地', sun: lt => [560, 365 + lt * 4, 0.9], en: 'Gaomei Wetlands', ll: '24.31°N 120.55°E', cam: [1.02, 1.07, 20, -20, 0, 0],
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
/* Longteng bridge ruins in tung-blossom season: brick piers on granite footings receding across the valley, arch
   remnants hanging off them, misty ridges behind, white blossom on the hillsides, morning light through the mist. */
function hexMix(a, b, t) { const A = hx(a), B = hx(b); return '#' + [0, 1, 2].map(i => Math.round(lerp(A[i], B[i], clamp(t))).toString(16).padStart(2, '0')).join(''); }
function ltPier(x, yb, s, k, haze, brk = 0) {
  // pier: a tapering brick shaft on a stone band, flaring at the top into the stubs of the two broken arches
  const w = 70 * s, h = 250 * s, fl = 60 * s, top = yb - h, stoneY = yb - h * 0.36, r = rng(k * 7 + 3);
  const brick0 = hexMix('#d08442', '#dcc0a8', haze), brick1 = hexMix('#a85a2c', '#cca896', haze), brick2 = hexMix('#6a3218', '#b89a8a', haze);
  const outline = (inset = 0) => { c.beginPath(); c.moveTo(x - inset, yb); c.lineTo(x - inset, top + 150 * s); c.bezierCurveTo(x - inset, top + 56 * s, x - fl * 0.35 + inset, top + 12 * s, x - fl + inset, top + (brk ? 16 : 4) * s); c.lineTo(x - fl + inset, top);
    c.lineTo(x + w + fl - inset, top); c.lineTo(x + w + fl - inset, top + 4 * s); c.bezierCurveTo(x + w + fl * 0.35 - inset, top + 12 * s, x + w + inset, top + 56 * s, x + w + inset, top + 150 * s); c.lineTo(x + w + inset, yb); c.closePath(); };
  c.save(); outline(); c.fillStyle = hg(x - fl, x + w + fl, [[0, brick0], [0.5, brick1], [1, brick2]]); c.fill(); c.clip();
  for (let yy = top; yy < yb; yy += 4.5 * s) { line(x - fl, yy, x + w + fl, yy, `rgba(70,30,20,${0.32 * (1 - haze)})`, 0.7); for (let xx = x - fl + ((yy / (4.5 * s)) % 2) * 5 * s; xx < x + w + fl; xx += 10 * s) line(xx, yy, xx, yy + 4.5 * s, `rgba(70,30,20,${0.2 * (1 - haze)})`, 0.5); }
  c.fillStyle = hexMix('#4f4a42', '#b8bcb8', haze); c.fillRect(x - fl, stoneY, w + 2 * fl, 30 * s); c.fillStyle = `rgba(30,24,20,${0.35 * (1 - haze)})`; c.fillRect(x - fl, stoneY + 30 * s, w + 2 * fl, yb - stoneY); for (let xx = x; xx < x + w; xx += 16 * s) line(xx, stoneY, xx, stoneY + 26 * s, `rgba(60,58,54,${0.4 * (1 - haze)})`, 0.8);   // granite band
  for (let t = 0; t < 14; t++) { c.fillStyle = `rgba(40,26,18,${(0.12 + r() * 0.2) * (1 - haze)})`; c.fillRect(x - fl * 0.6 + r() * (w + fl * 1.2), top + r() * h * 0.3, 2 + r() * 5 * s, h * (0.2 + r() * 0.5)); }   // rain streaks
  // the underside of each broken arch springer, in shadow
  [-1, 1].forEach(sd => { c.fillStyle = `rgba(40,20,12,${0.35 * (1 - haze)})`; c.beginPath(); const ex = sd < 0 ? x : x + w; c.moveTo(ex, top + 150 * s); c.bezierCurveTo(ex, top + 56 * s, ex + sd * fl * 0.65, top + 12 * s, ex + sd * fl, top + 6 * s); c.lineTo(ex + sd * fl, top + 30 * s); c.bezierCurveTo(ex + sd * fl * 0.5, top + 40 * s, ex + sd * 6 * s, top + 80 * s, ex + sd * 2 * s, top + 150 * s); c.closePath(); c.fill(); });
  c.fillStyle = `rgba(0,0,0,${0.18 * (1 - haze)})`; c.fillRect(x + w * 0.62, top, w * 0.6 + fl, h);   // shaded side
  c.restore();
  // ragged broken top with plants
  const vd = hexMix('#3f6a2e', '#c8d4c8', haze), vl = hexMix('#7aa24a', '#d4ddd4', haze);
  for (let t = 0; t < 34; t++) oval(x - fl + r() * (w + 2 * fl), top + r() * 10 * s - 3 * s, (3 + r() * 8) * s, (2 + r() * 4) * s, 0, mix(vd, vl, r(), 0.95));
  for (let t = 0; t < 5; t++) { const vx = x - fl + r() * (w + 2 * fl); c.strokeStyle = mix(vd, vl, 0.3, 0.8); c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(vx, top); c.quadraticCurveTo(vx + (r() - 0.5) * 20 * s, top + 40 * s, vx + (r() - 0.5) * 10, top + (60 + r() * 70) * s); c.stroke(); }
  return { top, w };
}
function tungDots(x0, x1, y0, y1, n, seed, a, sz = 1) { const r = rng(seed); for (let k = 0; k < n; k++) { const x = x0 + r() * (x1 - x0), y = y0 + Math.pow(r(), 0.8) * (y1 - y0); disc(x, y, (0.8 + r() * 1.6) * sz, `rgba(255,253,246,${a * (0.5 + r() * 0.5)})`); } }
SCENES.push({ county: '苗栗縣', place: '龍騰斷橋', sun: () => [180, 120, 0.6], en: 'Longteng Bridge Ruins', ll: '24.37°N 120.78°E', cam: [1.03, 1.09, -30, 10, 0, 0],
  sub: ['苗栗的龍騰斷橋，桐花像雪一樣落下。', 'At Miaoli’s Longteng Bridge, tung blossoms fall like snow.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#a9c2d2'], [0.55, '#dfe6e2'], [1, '#eef0e8']]); stratus(400, 180, 1200, 90, 'rgba(255,255,255,0.7)'); });
    L('m0', 0.03, () => mountain({ base: 300, amp: 90, f: 0.003, seed: 190, top: '#a8bab8', bot: '#c4cfca', haze: 'rgba(232,236,232,0.7)' }), { blur: 2 });
    L('m1', 0.08, () => { mountain({ base: 340, amp: 110, f: 0.0035, seed: 191, top: '#86a29a', bot: '#a6b8ae', tex: 'forest', dark: '#6d8a80', mid: '#86a096', light: '#b4c6ba', depth: 120, n: 1400, r: 3, haze: 'rgba(225,232,228,0.55)' }); tungDots(-M, W + M, 300, 420, 420, 197, 0.5, 0.8); }, { blur: 1.3 });
    L('mist1', 0.1, () => { for (let k = 0; k < 4; k++) stratus(200 + k * 330, 400 + (k % 2) * 16, 520, 46, 'rgba(240,244,240,0.55)'); }, { blur: 3 });
    L('m2', 0.2, () => { mountain({ base: 410, amp: 120, f: 0.004, seed: 192, top: '#58785a', bot: '#6f8c66', tex: 'forest', dark: '#3d5c40', mid: '#56784f', light: '#9bb882', depth: 240, n: 3000, r: 4, haze: 'rgba(210,225,215,0.35)' }); tungDots(-M, W + M, 330, 520, 900, 198, 0.85, 1.1); }, { blur: 0.5 });
    D(0.2, () => godrays(160, 60, 820, 11, '255,250,232', 0.075, 199, 0.55, Math.PI * 0.3));
    // the ruins: nearest pier on the left, receding to the right into the haze
    L('bridge', 0.45, () => { const P = [[1120, 462, 0.48, 0.52], [960, 474, 0.58, 0.42], [740, 492, 0.72, 0.3], [470, 520, 0.92, 0.15], [150, 560, 1.18, 0.0]];
      P.forEach(([x, yb, sc, hz], k) => ltPier(x, yb, sc, k, hz, k % 2));
      // valley floor & near forest in front of the footings
      mountain({ base: 560, amp: 34, f: 0.006, seed: 193, top: '#4d6e3e', bot: '#3c5a32', tex: 'forest', dark: '#33502b', mid: '#4f7040', light: '#89aa62', depth: 160, n: 2200, r: 5 }); tungDots(-M, W + M, 530, 600, 500, 200, 0.95, 1.6); });
    L('fg', 0.95, () => { c.fillStyle = vg(560, H, [[0, '#6b8c44'], [1, '#3b5226']]); c.beginPath(); c.moveTo(-M, H); c.lineTo(-M, 590); c.quadraticCurveTo(640, 570, W + M, 596); c.lineTo(W + M, H); c.fill(); const r = rng(194); for (let k = 0; k < 320; k++) disc(r() * (W + 2 * M) - M, 592 + r() * 40, 1.5 + r() * 2.2, 'rgba(250,248,240,0.9)'); });
    D(0.95, () => { grassTufts(590, 630, 140, ['#7da04e', '#5f8238', '#9cbf68'], 195, 1, 16); const x = 380 + lt * 28; actCat({ x, y: 594, s: 0.95, pose: 'walk', ph: walkPh(lt * 28, 0.95), rim: '255,250,235', blink: blinkAt(lt, 14), shadowA: 0.25 });
      const r = rng(196); for (let k = 0; k < 60; k++) { const x2 = mod(r() * W * 1.2 + T * (20 + r() * 20), W + 100) - 50, y2 = mod(r() * H + T * (25 + r() * 25), H); c.save(); c.translate(x2, y2); c.rotate(T * (1 + r()) + k); const s = 2.5 + r() * 2.5; for (let p = 0; p < 5; p++) { const a = p / 5 * TAU; oval(Math.cos(a) * s * 0.6, Math.sin(a) * s * 0.6, s * 0.6, s * 0.4, a, 'rgba(255,253,245,0.95)'); } disc(0, 0, s * 0.25, '#d9534a'); c.restore(); } });
    // an out-of-focus tung branch right in front of the lens
    D(1, () => { c.save(); c.filter = `blur(${5 * S}px)`; c.strokeStyle = '#3a2e22'; c.lineWidth = 9; c.beginPath(); c.moveTo(1300, 60); c.quadraticCurveTo(1150, 110, 1040, 96); c.stroke(); const r = rng(201);
      for (let k = 0; k < 26; k++) { const x = 1040 + r() * 260, y = 70 + r() * 70; oval(x, y, 14 + r() * 10, 10 + r() * 6, r() * 3, k % 3 ? 'rgba(255,253,246,0.95)' : 'rgba(70,110,50,0.85)'); } c.restore(); });
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

/* East Gate helpers (per photos): a warm-lit ashlar gate block with a round-arched passage, crowned by a two-storey
   pavilion — red columns, glowing interior, two tiers of dark tiled roof with strongly upswept eaves and swallowtail ridge. */
function egRoof(x, y, w, h, ov, col) {
  const tip = h * 0.42, L0 = x - w / 2 - ov, R0 = x + w / 2 + ov;
  c.fillStyle = 'rgba(255,170,90,0.85)'; c.beginPath(); c.moveTo(L0 + 6, y - tip + 4); c.quadraticCurveTo(x - w / 2 + ov * 0.2, y + 6, x, y + 7); c.quadraticCurveTo(x + w / 2 - ov * 0.2, y + 6, R0 - 6, y - tip + 4); c.lineTo(R0 - 6, y - tip + 8); c.quadraticCurveTo(x + w / 2, y + 12, x, y + 13); c.quadraticCurveTo(x - w / 2, y + 12, L0 + 6, y - tip + 8); c.fill(); // lit soffit
  const body = () => { c.beginPath(); c.moveTo(L0, y - tip); c.quadraticCurveTo(x - w / 2 + ov * 0.2, y + 2, x, y + 2); c.quadraticCurveTo(x + w / 2 - ov * 0.2, y + 2, R0, y - tip);
    c.quadraticCurveTo(x + w * 0.4, y - h * 0.55, x + w * 0.3, y - h); c.lineTo(x - w * 0.3, y - h); c.quadraticCurveTo(x - w * 0.4, y - h * 0.55, L0, y - tip); c.closePath(); };
  body(); c.fillStyle = vg(y - h, y, [[0, col || '#3a2622'], [1, '#1e1414']]); c.fill();
  c.save(); body(); c.clip(); for (let xx = L0; xx < R0; xx += 5) line(xx, y - h, x + (xx - x) * 1.12, y + 4, 'rgba(255,190,140,0.10)', 1.2);
  c.fillStyle = 'rgba(255,170,100,0.14)'; c.fillRect(L0, y - h * 0.3, R0 - L0, h * 0.3); c.restore();
  c.strokeStyle = '#e7a35a'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(L0, y - tip); c.quadraticCurveTo(x - w / 2 + ov * 0.2, y + 2, x, y + 2); c.quadraticCurveTo(x + w / 2 - ov * 0.2, y + 2, R0, y - tip); c.stroke();
  // ridge with swallowtail ends
  c.strokeStyle = col || '#3a2622'; c.lineCap = 'round'; c.lineWidth = 5; c.beginPath(); c.moveTo(x - w * 0.3, y - h); c.lineTo(x + w * 0.3, y - h); c.stroke();
  c.lineWidth = 5; [-1, 1].forEach(k => { c.beginPath(); c.moveTo(x + k * w * 0.27, y - h); c.quadraticCurveTo(x + k * w * 0.34, y - h - 1, x + k * w * 0.37, y - h - Math.min(14, h * 0.28)); c.stroke(); });
  line(x - w * 0.3, y - h - 2.5, x + w * 0.3, y - h - 2.5, 'rgba(255,190,120,0.5)', 1); c.lineCap = 'butt';
}
function egFloor(x, y, w, h, n) { // one pavilion storey: glowing interior, red columns, a railing
  c.fillStyle = vg(y - h, y, [[0, '#ffcf86'], [1, '#e7883e']]); c.fillRect(x - w / 2, y - h, w, h);
  c.fillStyle = 'rgba(120,40,20,0.35)'; for (let k = 0; k < n * 3; k++) c.fillRect(x - w / 2 + 4 + k * (w - 8) / (n * 3), y - h + 6, 1.4, h - 12);
  for (let k = 0; k <= n; k++) { const cx = x - w / 2 + k * w / n; c.fillStyle = vg(y - h, y, [[0, '#9a2a1e'], [1, '#c2412a']]); c.fillRect(cx - 3.5, y - h, 7, h); }
  c.fillStyle = '#7a2418'; c.fillRect(x - w / 2 - 6, y - 9, w + 12, 3); for (let xx = x - w / 2 - 4; xx < x + w / 2 + 6; xx += 7) c.fillRect(xx, y - 9, 1.6, 9); c.fillRect(x - w / 2 - 6, y - 1, w + 12, 3);
}
function eastGate(x, y) {
  // ashlar gate block with a slight batter, lit gold from the floodlights at its foot
  const bw = 300, bt = 276, bh = 124, top = y - bh;
  c.beginPath(); c.moveTo(x - bw / 2, y); c.lineTo(x - bt / 2, top); c.lineTo(x + bt / 2, top); c.lineTo(x + bw / 2, y); c.closePath();
  c.fillStyle = vg(top, y, [[0, '#a8804a'], [0.55, '#e0b46c'], [1, '#ffd892']]); c.fill();
  c.save(); c.clip(); const r = rng(1881);
  for (let yy = top + 2, k = 0; yy < y; yy += 11, k++) { line(x - bw / 2, yy, x + bw / 2, yy, 'rgba(90,55,25,0.35)', 1); for (let xx = x - bw / 2 + (k % 2) * 14 + r() * 4; xx < x + bw / 2; xx += 26 + r() * 6) line(xx, yy, xx, yy + 11, 'rgba(90,55,25,0.3)', 1); }
  for (let k = 0; k < 160; k++) { c.fillStyle = r() < 0.5 ? 'rgba(255,240,200,0.08)' : 'rgba(80,50,20,0.1)'; c.fillRect(x - bw / 2 + r() * bw, top + r() * bh, 6 + r() * 14, 4 + r() * 6); }
  c.fillStyle = hg(x - bw / 2, x + bw / 2, [[0, 'rgba(40,20,10,0.35)'], [0.25, 'rgba(0,0,0,0)'], [0.8, 'rgba(0,0,0,0)'], [1, 'rgba(40,20,10,0.4)']]); c.fillRect(x - bw / 2, top, bw, bh); c.restore();
  // parapet band, stone plaque, the arched passage glowing inside
  c.fillStyle = '#b48a52'; c.fillRect(x - bt / 2 - 4, top - 8, bt + 8, 9); line(x - bt / 2 - 4, top - 8, x + bt / 2 + 4, top - 8, 'rgba(255,220,160,0.6)', 1);
  c.fillStyle = '#2a1a12'; c.beginPath(); c.moveTo(x - 38, y); c.lineTo(x - 38, y - 52); c.arc(x, y - 52, 38, Math.PI, 0); c.lineTo(x + 38, y); c.fill();
  c.fillStyle = vg(y - 90, y, [[0, 'rgba(255,170,80,0.2)'], [1, 'rgba(255,200,120,0.7)']]); c.beginPath(); c.moveTo(x - 30, y); c.lineTo(x - 30, y - 52); c.arc(x, y - 52, 30, Math.PI, 0); c.lineTo(x + 30, y); c.fill();
  c.strokeStyle = 'rgba(120,80,40,0.8)'; c.lineWidth = 3; c.beginPath(); c.arc(x, y - 52, 41, Math.PI, 0); c.stroke();
  c.fillStyle = '#6e5232'; c.fillRect(x - 22, y - 108, 44, 14); c.fillStyle = '#f0d8a0'; c.font = `700 10px ${FONTS}`; c.textAlign = 'center'; c.fillText('迎曦門', x, y - 97.5);
  // the pavilion: lower storey + roof, upper storey + roof
  egFloor(x, top - 8, 214, 44, 5); egRoof(x, top - 52, 236, 34, 30);
  egFloor(x, top - 64, 140, 30, 3); egRoof(x, top - 94, 168, 46, 26);
}

/* 18 — 新竹市 東門城 — per photos: the gate at night in its roundabout, floodlit gold, long-exposure traffic trails sweeping round it,
   city buildings and neon behind, trees with uplights on the island */
SCENES.push({ county: '新竹市', place: '迎曦東門城', en: 'East Gate of Hsinchu', ll: '24.80°N 120.97°E', cam: [1.03, 1.1, 0, 0, 0, 10],
  sub: ['新竹市的東門城，兩百年來守著每個夜晚。', 'Hsinchu’s East Gate has watched over the city’s nights for two centuries.'],
  sun: () => [640, 330, 0.25],
  draw(lt) {
    const RX = [600, 660, 720, 780], RY = [44, 52, 60, 68], CY = 496;
    L('sky', 0, () => { sky([[0, '#05070f'], [0.55, '#111a33'], [0.85, '#2a2a44'], [1, '#4a3a40']]); glow(640, 470, 700, '255,160,90', 0.12); stars(24, 211, 200, 0.35); });
    L('city', 0.1, () => { skyline(470, 212, '#141a2c', '#20263c', { hmin: 50, hvar: 170, win: 0.12 });
      c.fillStyle = '#1a2034'; c.fillRect(905, 150, 70, 330); c.fillStyle = '#222a40'; c.fillRect(975, 170, 26, 310); const r = rng(1882);
      for (let yy = 160; yy < 470; yy += 7) for (let xx = 910; xx < 970; xx += 6) if (r() < 0.3) { c.fillStyle = `rgba(255,${210 + r() * 30 | 0},150,${0.35 + r() * 0.4})`; c.fillRect(xx, yy, 3, 3); } }, { blur: 0.8 });
    L('near', 0.22, () => { const r = rng(1883); [[-M, 150, 300], [150, 120, 250], [890, 170, 270], [1060, 240, 230], [1200, 160, 300]].forEach(([x, w, h], i) => {
        c.fillStyle = mix('#2a2a38', '#3a3446', r()); c.fillRect(x, 470 - h, w, h + 30);
        for (let yy = 470 - h + 10; yy < 462; yy += 14) for (let xx = x + 6; xx < x + w - 10; xx += 16) if (r() < 0.55) { c.fillStyle = `rgba(255,${200 + r() * 40 | 0},${120 + r() * 60 | 0},${0.45 + r() * 0.45})`; c.fillRect(xx, yy, 9, 7); }
        const nc = ['255,70,80', '80,200,255', '255,200,60', '120,255,170', '255,90,200'][i]; c.fillStyle = `rgba(${nc},0.9)`; const sy = 470 - h * (0.4 + r() * 0.3); c.fillRect(x + w * 0.2, sy, w * 0.5, 16);
        c.save(); c.globalCompositeOperation = 'lighter'; glow(x + w * 0.45, sy + 8, 60, nc, 0.35); c.restore(); }); });
    // trails on the far side of the roundabout, seen either side of the island
    L('road', 0.3, () => { c.fillStyle = vg(CY - 70, H, [[0, '#1c1a22'], [1, '#121118']]); c.fillRect(-M, CY - 70, W + 2 * M, H);
      c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 4; i++) { const col = i < 2 ? '255,236,200' : '255,60,50';
        for (let j = 0; j < 3; j++) { c.strokeStyle = `rgba(${col},${0.35 - j * 0.1})`; c.lineWidth = 1.2 + j * 2.5; c.beginPath(); c.ellipse(640, CY, RX[i], RY[i], 0, Math.PI, TAU); c.stroke(); } } c.restore(); });
    L('island', 0.4, () => { // raised island: retaining wall, steps, trees with uplights
      c.fillStyle = vg(470, 500, [[0, '#6a5a48'], [1, '#2e2820']]); c.beginPath(); c.ellipse(640, 486, 380, 26, 0, 0, TAU); c.fill(); c.fillStyle = '#3a4a2e'; c.beginPath(); c.ellipse(640, 474, 372, 16, 0, 0, TAU); c.fill();
      c.fillStyle = '#8a7660'; for (let k = 0; k < 4; k++) c.fillRect(600 - k * 6, 470 + k * 6, 80 + k * 12, 6);
      const r = rng(1884); [[330, 70], [410, 90], [870, 90], [950, 70], [280, 50], [1000, 50]].forEach(([tx, th]) => { line(tx, 474, tx, 474 - th * 0.5, '#2a2018', 4);
        for (let k = 0; k < 26; k++) { const a = r() * TAU, rr = r() * th * 0.42; oval(tx + Math.cos(a) * rr, 474 - th * 0.62 + Math.sin(a) * rr * 0.75, 10 + r() * 10, 8 + r() * 8, 0, mix('#2e4a2a', '#9aa848', r() * (0.4 + 0.6 * Math.max(0, Math.sin(a))))); } });
      eastGate(640, 472); });
    D(0.4, () => { c.save(); c.globalCompositeOperation = 'lighter'; glow(640, 420, 240, '255,190,110', 0.22); glow(640, 300, 150, '255,170,90', 0.18); [-150, 150].forEach(k => glow(640 + k, 470, 50, '255,210,140', 0.5)); c.restore(); });
    // near side of the roundabout: static long-exposure streaks plus moving head/tail lights
    D(0.6, () => { c.save(); c.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 4; i++) { const col = i < 2 ? '255,236,200' : '255,60,50';
        for (let j = 0; j < 3; j++) { c.strokeStyle = `rgba(${col},${0.5 - j * 0.14})`; c.lineWidth = 1.4 + j * 3; c.beginPath(); c.ellipse(640, CY + 6, RX[i] + 10, RY[i] + 6, 0, 0.02, Math.PI - 0.02); c.stroke(); }
        for (let k = 0; k < 5; k++) { const th = mod((i < 2 ? -1 : 1) * lt * 0.18 + k / 5 + i * 0.13, 1) * Math.PI, px = 640 + Math.cos(th) * (RX[i] + 10), py = CY + 6 + Math.sin(th) * (RY[i] + 6); glow(px, py, 16, col, 0.7); } }
      c.restore(); [[150, 560], [1130, 560]].forEach(([x, y]) => { line(x, y, x, y - 130, '#18161e', 3); line(x, y - 130, x + 20, y - 134, '#18161e', 3); glow(x + 22, y - 132, 46, '255,210,150', 0.6); }); });
    L('wall', 0.95, () => { c.fillStyle = vg(576, H, [[0, '#4a4650'], [1, '#22202a']]); c.fillRect(-M, 580, W + 2 * M, 200); for (let x = -M; x < W + M; x += 46) line(x, 580, x, H, 'rgba(0,0,0,0.4)', 1); line(-M, 580, W + M, 580, 'rgba(255,200,140,0.35)', 1.5); });
    D(0.95, () => actCat({ x: 900, y: 582, s: 1.05, pose: 'sit', face: -1, rim: '255,190,130', look: -0.18, blink: blinkAt(lt, 16), shadowA: 0.25 }));
  } });

/* 19 — 桃園市 桃園國際機場 */
SCENES.push({ county: '桃園市', place: '桃園國際機場', sun: () => [900, 440, 0.55], en: 'Taoyuan International Airport', ll: '25.08°N 121.23°E', cam: [1.02, 1.07, 0, 0, 0, 0],
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
      // blue surf breaking around the reef rocks
      const r2 = rng(247); for (let k = 0; k < 26; k++) { const x = 420 + r2() * 860, y = 470 + r2() * 120, w = 40 + r2() * 90; r2(); const ph = mod(lt * 0.5 + k * 0.37, 1), a2 = Math.sin(ph * Math.PI);
        c.strokeStyle = `rgba(70,190,255,${0.8 * a2})`; c.lineWidth = 3; c.beginPath(); c.ellipse(x, y + 2, w * (0.55 + ph * 0.3), 6 + ph * 6, 0, 0, Math.PI); c.stroke(); glow(x, y, w * 0.9, '40,160,255', 0.35 * a2); }
      glow(640, 560, 500, '40,140,255', 0.18); c.restore(); });
    // reef rocks stretching out into the bay (dark granite, catching the blue glow on their edges)
    L('reef', 0.35, () => { const r = rng(247); for (let k = 0; k < 26; k++) { const x = 420 + r() * 860, y = 470 + r() * 120, w = 40 + r() * 90, h = 20 + r() * 50 * ((y - 440) / 180);
        c.fillStyle = vg(y - h, y, [[0, '#2a3650'], [1, '#0a0e18']]); c.beginPath(); c.moveTo(x - w / 2, y); c.quadraticCurveTo(x - w * 0.4, y - h, x - w * 0.1, y - h * 1.1); c.quadraticCurveTo(x + w * 0.3, y - h * 0.9, x + w / 2, y); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(110,200,255,0.7)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x - w / 2, y); c.quadraticCurveTo(x - w * 0.4, y - h, x - w * 0.1, y - h * 1.1); c.quadraticCurveTo(x + w * 0.3, y - h * 0.9, x + w / 2, y); c.stroke(); } });
    L('rock', 0.95, () => { const pts = [[-M, H], [-M, 560], [90, 548], [220, 560], [330, 590], [400, 640], [430, H]]; rockFG(pts, '#141b2a', '#06080e', 'rgba(90,190,255,0.55)', 246); });
    D(0.95, () => actCat({ x: 200, y: 556, s: 1.05, pose: 'sit', sil: true, rim: '90,190,255', look: 0.12, blink: blinkAt(lt, 19), shadow: false }));
  } });

/* 22 — 臺北市 回家 night */
SCENES.push({ county: '臺北市', place: '回到象山', en: 'Home again · Taipei', ll: '25.03°N 121.57°E', final: true, cam: [1.02, 1.12, 10, -30, 0, 8],
  sub: ['繞了一整圈，臺北的燈還亮著。', 'One full circle later, Taipei’s lights are still on.'],
  sub2: ['原來，家就是最後一站。', 'Home, it turns out, is the last stop.'],
  sub3: ['一路上交到的朋友，都來到夢裡。', 'And all the friends it made along the way come to visit in its dreams.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#070b1c'], [0.45, '#1c2448'], [0.7, '#3d3a62'], [1, '#5d4a68']]); stars(260, 251, 360, 0.8); glow(640, 560, 700, '255,170,120', 0.2); });
    D(0, () => { const u = mod(lt, 9); if (u > 3 && u < 3.8) { const v = (u - 3) / 0.8; c.strokeStyle = `rgba(255,255,240,${Math.sin(v * Math.PI) * 0.8})`; c.lineWidth = 1.5; line(900 + v * 200, 120 + v * 60, 900 + v * 200 - 60, 120 + v * 60 - 18, `rgba(255,255,240,${Math.sin(v * Math.PI) * 0.8})`, 1.5); } });
    L('far', 0.08, () => mountain({ base: 470, amp: 120, f: 0.0032, seed: 1, oct: 5, top: '#141a32', bot: '#262844' }), { blur: 2 });
    L('city', 0.3, () => { skyline(540, 7, '#1d2140', '#2b2d50', { hmin: 14, hvar: 70, win: 0.35 }); xinyiTowers(540, true, '#182040', '#2a3060'); tower101(860, 540, 360, { light: '#5a7aa8', dark: '#22304e', night: true }); cityLights(500, 580, 2600, 253); c.fillStyle = vg(440, 560, [[0, 'rgba(255,170,120,0)'], [1, 'rgba(255,170,120,0.25)']]); c.fillRect(-M, 440, W + 2 * M, 140); });
    D(0.3, () => { const r = rng(252); for (let k = 0; k < 120; k++) { const x = r() * (W + 2 * M) - M, y = 480 + r() * 60, a = Math.max(0, Math.sin(T * (0.5 + r()) + k)); disc(x, y, 1, `rgba(255,220,160,${a})`); } glow(860, 540 - 360, 12, '255,60,50', Math.sin(T * 3) > 0.3 ? 0.9 : 0.2); glow(860, 360, 200, '255,190,130', 0.15); });
    L('rock', 0.92, () => { const pts = [[-M, H], [-M, 500], [40, 486], [150, 462], [250, 492], [330, 520], [470, 522], [560, 548], [660, 610], [760, 660], [820, H]]; rockFG(pts, '#1e1a26', '#08070c', 'rgba(255,190,140,0.35)', 3); bushes(40, -M, 250, x => 470 + Math.abs(x - 140) * 0.18, 4, '#0e0d14', '#1a1820', 16); });
    D(0.92, () => { grassTufts(505, 530, 50, ['#1e1a24', '#2a2430'], 5, 1, 12, [-M, 455]); actCat({ x: 410, y: 524, s: 1.05, pose: 'sit', sil: true, rim: '255,195,150', look: lt > 4 ? -0.02 - sm((lt - 4) / 2) * 0.2 : -0.06, blink: (lt > 6.5 && lt < 7.3) || blinkAt(lt, 20) }); });
    D(1, () => treeBranch('#06050a', 0));
  } });
