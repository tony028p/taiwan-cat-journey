/* Scenes 0–11 */
function walkPh(dist, s) { return dist / (46 * s) * TAU; }
function tower101(x, y, h, o = {}) {
  const u = h / 410, Lc = o.light || '#7c86a6', Dc = o.dark || '#3e4561';
  const seg = (wb, wt, yb, yt) => { poly([[x - wb / 2, yb], [x - wt / 2, yt], [x + wt / 2, yt], [x + wb / 2, yb]]); c.fillStyle = hg(x - wt / 2, x + wt / 2, [[0, Lc], [0.55, mix(Lc, Dc, 0.5)], [1, Dc]]); c.fill(); };
  seg(70 * u, 66 * u, y, y - 34 * u); seg(46 * u, 36 * u, y - 34 * u, y - 120 * u);
  for (let k = 0; k < 8; k++) {
    const yb = y - 120 * u - k * 30 * u; seg(30 * u, 44 * u, yb, yb - 30 * u);
    if (o.night) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = 'rgba(120,200,255,0.42)'; c.fillRect(x - 21 * u, yb - 29 * u, 42 * u, 27 * u); c.fillStyle = 'rgba(210,245,255,0.7)'; c.fillRect(x - 22 * u, yb - 30 * u, 44 * u, 2.4 * u);
      for (let w = 0; w < 6; w++) c.fillRect(x - 13 * u + w * 5.2 * u, yb - 24 * u, 1.2 * u, 18 * u); c.restore(); }
    else { c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(x - 18 * u, yb - 14 * u, 36 * u, 1.2 * u); }
  }
  const tp = y - 360 * u; seg(30 * u, 24 * u, tp, tp - 22 * u); seg(18 * u, 14 * u, tp - 22 * u, tp - 36 * u);
  line(x, tp - 36 * u, x, tp - 92 * u, Dc, 2.2 * u);
  return tp - 92 * u;
}
/* Xinyi district towers around 101 as seen from Xiangshan: Nanshan Plaza (dark slab, right), the Farglory/Cathay towers,
   with lit crowns at night */
function xinyiTowers(y, night, c1, c2) {
  const T = [[742, 150, 26, 'cyan'], [776, 118, 22, 'white'], [906, 216, 40, 'nanshan'], [960, 128, 24, 'magenta'], [996, 168, 30, 'white'], [1046, 112, 22, 'gold'], [700, 96, 26, 'gold'], [1100, 140, 26, 'cyan'], [640, 84, 30, 'white'], [1150, 92, 30, 'gold']];
  const crown = { cyan: '120,220,255', white: '240,245,255', magenta: '255,120,210', gold: '255,200,120', nanshan: '255,255,255' };
  const r = rng(77);
  T.forEach(([x, h, w, kind]) => { c.fillStyle = kind === 'nanshan' ? mix(c1, '#000000', 0.25) : mix(c1, c2, r()); c.fillRect(x - w / 2, y - h, w, h + 40);
    if (kind === 'nanshan') { c.fillStyle = mix(c1, c2, 0.6); c.fillRect(x - w / 2, y - h - 10, w * 0.62, 12); }
    if (night) { for (let yy = y - h + 8; yy < y; yy += 4) for (let xx = x - w / 2 + 2; xx < x + w / 2 - 2; xx += 3) if (r() < (kind === 'nanshan' ? 0.08 : 0.3)) { c.fillStyle = `rgba(255,${210 + r() * 40},${160 + r() * 80},${0.35 + r() * 0.5})`; c.fillRect(xx, yy, 1.4, 1.8); }
      c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(${crown[kind]},0.75)`; c.fillRect(x - w / 2, y - h, w, kind === 'nanshan' ? 3 : 6); glow(x, y - h, w * 1.1, crown[kind], 0.25); c.restore(); }
    else { c.fillStyle = 'rgba(255,230,210,0.18)'; c.fillRect(x - w / 2, y - h, w * 0.4, h); } });
}
/* dense city lights spread over the basin floor (night) */
function cityLights(y0, y1, n, seed) { const r = rng(seed); c.save(); c.globalCompositeOperation = 'lighter';
  for (let k = 0; k < n; k++) { const pr = Math.pow(r(), 0.7), y = y0 + pr * (y1 - y0), x = r() * (W + 2 * M) - M, cool = r() < 0.35, col = cool ? '200,230,255' : r() < 0.08 ? '255,90,90' : `255,${190 + r() * 50},${120 + r() * 60}`;
    c.fillStyle = `rgba(${col},${0.35 + r() * 0.55})`; c.fillRect(x, y, 1 + pr * 1.4, 1 + pr * 1.2); }
  c.restore(); }
function skyline(y, seed, c1, c2, o = {}) {
  const r = rng(seed); let x = -M;
  while (x < W + M) {
    const w = 10 + r() * 26, h = (o.hmin || 18) + Math.pow(r(), 1.6) * (o.hvar || 90);
    c.fillStyle = mix(c1, c2, r()); c.fillRect(x, y - h, w + 0.5, h + 40);
    if (o.win) for (let yy = y - h + 4; yy < y; yy += 5) for (let xx = x + 2; xx < x + w - 2; xx += 4) if (r() < o.win) { c.fillStyle = `rgba(255,${200 + r() * 40},${130 + r() * 60},${0.4 + r() * 0.5})`; c.fillRect(xx, yy, 1.6, 2); }
    x += w + r() * 2;
  }
}
/* overhanging tree branch silhouette in the top-right corner (clear of the location card) (Xiangshan viewpoint), leaves sway gently */
function treeBranch(col, a0) { c.save(); c.translate(W, 0); c.scale(-1, 1); c.fillStyle = col; c.strokeStyle = col; c.lineCap = 'round'; c.lineWidth = 9; c.beginPath(); c.moveTo(-M, 60); c.quadraticCurveTo(80, 70, 190, 132); c.stroke(); c.lineWidth = 5; c.beginPath(); c.moveTo(70, 80); c.quadraticCurveTo(110, 120, 120, 170); c.stroke(); c.beginPath(); c.moveTo(150, 112); c.quadraticCurveTo(230, 120, 280, 150); c.stroke();
  const r = rng(91); for (let k = 0; k < 90; k++) { const t = r(), bx = lerp(-M, 280, t), by = 60 + t * 90 + (r() - 0.5) * 70, sw = Math.sin(T * 1.2 + k) * 1.5; c.beginPath(); c.ellipse(bx + sw, by, 7 + r() * 9, 4 + r() * 5, r() * 3, 0, TAU); c.fill(); } c.restore(); }
/* faceted coastal boulder sitting in water at y: irregular top, upper-left faces lit, cracks, optional rim and glowing waterline.
   o: { col, dk, lit, n, cracks, rim, wl (rgba waterline glow), sink } */
function boulder(x, y, w, h, seed, o = {}) {
  const r = rng(seed), n = o.n || 7, top = [], sk = o.sink ?? 4, pw = o.round ?? 0.55, jt = o.jit ?? 0.4;
  for (let i = 0; i <= n; i++) { const u = i / n, pr = Math.pow(Math.sin(Math.PI * (0.04 + u * 0.92)), pw);
    top.push([x - w / 2 + u * w + (i && i < n ? (r() - 0.5) * w / n * 0.7 : 0), i && i < n ? y - h * pr * (1 - jt * 0.75 + r() * jt) : y]); }
  const col = o.col || '#3c3b42', dk = o.dk || '#0b0c11', lit = o.lit || 'rgba(255,232,205,0.12)';
  const outl = [...top, [x + w / 2, y + sk], [x - w / 2, y + sk]];
  poly(outl); c.fillStyle = vg(y - h, y + sk, [[0, col], [1, dk]]); c.fill();
  c.save(); poly(outl); c.clip();
  // rough faces: bands hanging from each top segment, lit if they face up-left, plus mottling
  for (let i = 0; i < n; i++) { const a = top[i], b = top[i + 1], d1 = h * (0.25 + r() * 0.45), d2 = h * (0.25 + r() * 0.45), sh = (r() - 0.5) * w / n * 0.6;
    const sl = (b[1] - a[1]) / Math.max(1, b[0] - a[0]); poly([a, b, [b[0] + sh, b[1] + d2], [a[0] + sh, a[1] + d1]], sl < 0.1 ? lit : `rgba(0,0,0,${0.1 + r() * 0.14})`);
    if (r() < 0.6) poly([[a[0] + sh, a[1] + d1], [b[0] + sh, b[1] + d2], [lerp(a[0], b[0], 0.5) + sh * 2, Math.max(a[1] + d1, b[1] + d2) + h * 0.3 * r()]], `rgba(0,0,0,${0.08 + r() * 0.1})`); }
  for (let k = 0; k < w * h / 60; k++) { const px = x + (r() - 0.5) * w, py = y - r() * h; disc(px, py, 0.8 + r() * 2.2, r() < 0.5 ? 'rgba(255,240,220,0.05)' : 'rgba(0,0,0,0.12)'); }
  for (let k = 0; k < (o.cracks ?? 4); k++) { const cx = x + (r() - 0.5) * w * 0.8, cy = y - r() * h * 0.8; c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = 1 + r();
    c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + (r() - 0.5) * 14, cy + 6 + r() * 12); c.lineTo(cx + (r() - 0.5) * 18, cy + 14 + r() * 16); c.stroke(); }
  c.restore();
  if (o.rim) { c.beginPath(); top.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.strokeStyle = o.rim; c.lineWidth = 1.3; c.stroke(); }
  if (o.wl) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = o.wl; c.beginPath(); c.ellipse(x, y + 1, w * 0.56, 3.5 + h * 0.06, 0, 0, TAU); c.fill(); c.restore(); }
  return top;
}
function rockFG(pts, top, bot, rim, seed) {
  poly(pts); c.fillStyle = vg(Math.min(...pts.map(p => p[1])), H, [[0, top], [1, bot]]); c.fill();
  c.save(); poly(pts); c.clip(); const r = rng(seed);
  for (let k = 0; k < 700; k++) { const x = r() * (W + 2 * M) - M, y = 400 + r() * 320; c.strokeStyle = r() < 0.5 ? 'rgba(255,220,190,0.05)' : 'rgba(0,0,0,0.12)'; c.lineWidth = 1 + r() * 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6 + r() * 14, y + r() * 6); c.stroke(); }
  c.restore();
  if (rim) { c.save(); c.beginPath(); pts.slice(1, -1).forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.strokeStyle = rim; c.lineWidth = 1.6; c.stroke(); c.restore(); }
}
function bushes(n, x0, x1, yf, seed, dark, light, rr = 14) { const r = rng(seed); for (let k = 0; k < n; k++) { const x = x0 + r() * (x1 - x0), y = yf(x) + r() * 8, s = rr * (0.5 + r()); oval(x, y, s, s * 0.8, 0, dark); oval(x + s * 0.25, y - s * 0.3, s * 0.6, s * 0.5, 0, light); } }
function lantern(x, y, r, ang, lit = 1) {
  c.save(); c.translate(x, y); c.rotate(ang);
  line(0, -r * 2.2, 0, -r * 1.1, 'rgba(30,20,15,0.8)', 1);
  const g = c.createRadialGradient(-r * 0.3, -r * 0.2, 0, 0, 0, r * 1.2); g.addColorStop(0, '#ffb070'); g.addColorStop(0.5, '#e0442e'); g.addColorStop(1, '#7a1a14');
  c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, r, r * 1.2, 0, 0, TAU); c.fill();
  c.fillStyle = '#2a1a14'; c.fillRect(-r * 0.45, -r * 1.25, r * 0.9, r * 0.22); c.fillRect(-r * 0.45, r * 1.05, r * 0.9, r * 0.22);
  c.restore();
  glow(x, y, r * 6, '255,140,70', 0.32 * lit * (0.9 + 0.1 * Math.sin(T * 7 + x)));
}
function rain(n, seed, a = 0.22, ang = 0.15) {
  const r = rng(seed); c.save(); c.lineCap = 'round';
  for (let k = 0; k < n; k++) { const sp = 900 + r() * 500, x = mod(r() * (W + 200) + T * sp * ang, W + 200) - 100, y = mod(r() * H + T * sp, H + 60) - 30, l = 14 + r() * 18;
    c.strokeStyle = `rgba(210,220,235,${a * (0.4 + r() * 0.6)})`; c.lineWidth = 0.8 + r() * 0.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x - l * ang, y - l); c.stroke(); }
  c.restore();
}
function boat(x, y, s, stripe, ph) {
  c.save(); c.translate(x, y + Math.sin(T * 1.1 + ph) * 1.6); c.rotate(Math.sin(T * 0.8 + ph) * 0.02); c.scale(s, s);
  poly([[-64, -16], [70, -20], [58, 2], [-54, 2]]); c.fillStyle = vg(-20, 2, [[0, '#f4f2ec'], [1, '#a9b1b6']]); c.fill();
  poly([[-62, -12], [68, -16], [66, -11], [-61, -8]], stripe);
  c.fillStyle = vg(-46, -18, [[0, '#ffffff'], [1, '#cfd5d8']]); c.fillRect(-14, -46, 44, 28);
  c.fillStyle = '#3d5568'; for (let k = 0; k < 3; k++) c.fillRect(-9 + k * 13, -40, 9, 8);
  line(8, -46, 8, -86, '#5a5a5a', 1.6); line(8, -80, 40, -40, 'rgba(80,80,80,0.6)', 0.8); line(8, -80, -30, -18, 'rgba(80,80,80,0.6)', 0.8);
  poly([[8, -86], [24, -82], [8, -78]], '#d9453b');
  c.restore();
}
function lighthouse(x, y, h) {
  const w0 = h * 0.16, w1 = h * 0.11;
  poly([[x - w0, y], [x - w1, y - h], [x + w1, y - h], [x + w0, y]]); c.fillStyle = hg(x - w0, x + w0, [[0, '#ffffff'], [0.6, '#e9e3da'], [1, '#b8b2ab']]); c.fill();
  c.fillStyle = '#2b2a30'; c.fillRect(x - w1 * 1.1, y - h - h * 0.14, w1 * 2.2, h * 0.14);
  poly([[x - w1 * 1.2, y - h - h * 0.14], [x, y - h - h * 0.28], [x + w1 * 1.2, y - h - h * 0.14]], '#2b2a30');
  c.fillStyle = '#f3efe6'; c.fillRect(x - w1 * 1.6, y - h, w1 * 3.2, h * 0.03);
  return [x, y - h - h * 0.07];
}
function palm(x, y, h, seed, col = '#1e1a1c') {
  const sw = Math.sin(T * 0.9 + seed) * 5, tx = x + h * 0.12 + sw * 0.4, ty = y - h;
  c.strokeStyle = col; c.lineCap = 'round'; c.lineWidth = h * 0.045; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + h * 0.02, y - h * 0.5, tx, ty); c.stroke();
  for (let k = 0; k < 9; k++) {
    const a = -Math.PI / 2 + (k - 4) * 0.42 + Math.sin(T * 1.4 + k + seed) * 0.05, L2 = h * (0.42 + 0.08 * Math.sin(k * 3));
    const ex = tx + Math.cos(a) * L2, ey = ty + Math.sin(a) * L2 * 0.6 + L2 * 0.35;
    c.lineWidth = h * 0.022; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + Math.cos(a) * L2 * 0.5, ty + Math.sin(a) * L2 * 0.5 - h * 0.06, ex, ey); c.stroke();
    for (let j = 1; j < 7; j++) { const u = j / 7, px = lerp(tx, ex, u), py = lerp(ty, ey, u) - Math.sin(u * Math.PI) * h * 0.05; c.lineWidth = h * 0.008; c.beginPath(); c.moveTo(px, py); c.lineTo(px + Math.cos(a + 1.3) * h * 0.06 * (1 - u * 0.5), py + h * 0.07); c.moveTo(px, py); c.lineTo(px + Math.cos(a - 1.3) * h * 0.05, py + h * 0.07); c.stroke(); }
  }
}
/* Lotus Pond's dragon: green scaled body coiled in front of its pagoda, head raised with a red open mouth, gold horns,
   whiskers and a white beard; the tiger: orange with black stripes, white muzzle and chest, mouth wide open */
function lpDragon(x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  const body = [[-120, -6], [-90, -30], [-50, -14], [-14, -40], [20, -24], [40, -50]];
  c.strokeStyle = '#2e8a5a'; c.lineCap = 'round'; c.lineWidth = 30; c.beginPath(); body.forEach(([px, py], k) => k ? c.lineTo(px, py) : c.moveTo(px, py)); c.stroke();
  c.strokeStyle = '#4fb07a'; c.lineWidth = 18; c.stroke(); c.strokeStyle = '#f2c84a'; c.lineWidth = 6; c.beginPath(); body.forEach(([px, py], k) => k ? c.lineTo(px, py - 10) : c.moveTo(px, py - 10)); c.stroke();
  for (let k = 0; k < 14; k++) { const t = k / 13, px = lerp(-120, 40, t), py = -18 - Math.sin(t * 9) * 12; disc(px, py, 3, 'rgba(255,240,180,0.5)'); }
  // head
  c.fillStyle = '#3a9a66'; c.beginPath(); c.ellipse(64, -74, 44, 30, -0.3, 0, TAU); c.fill();
  c.fillStyle = '#b8261e'; c.beginPath(); c.moveTo(66, -64); c.quadraticCurveTo(108, -60, 116, -40); c.quadraticCurveTo(96, -26, 70, -40); c.closePath(); c.fill();                 // open mouth
  c.fillStyle = '#5a0e0a'; c.beginPath(); c.ellipse(90, -48, 16, 9, 0.2, 0, TAU); c.fill(); for (let k = 0; k < 5; k++) poly([[76 + k * 8, -60], [79 + k * 8, -52], [82 + k * 8, -60]], '#ffffff');
  c.fillStyle = '#f4f0e6'; c.beginPath(); c.moveTo(60, -40); c.quadraticCurveTo(70, -10, 90, -14); c.quadraticCurveTo(80, -30, 74, -40); c.closePath(); c.fill();              // beard
  disc(70, -86, 8, '#ffffff'); disc(72, -86, 4.5, '#1a1a1a'); disc(73, -87, 1.5, '#ffffff');
  c.strokeStyle = '#f2c84a'; c.lineWidth = 5; c.beginPath(); c.moveTo(48, -98); c.quadraticCurveTo(36, -126, 18, -134); c.moveTo(60, -100); c.quadraticCurveTo(56, -130, 44, -142); c.stroke();
  c.strokeStyle = '#e8a83a'; c.lineWidth = 2; c.beginPath(); c.moveTo(100, -66); c.quadraticCurveTo(130, -90, 150, -80); c.moveTo(104, -58); c.quadraticCurveTo(136, -60, 150, -44); c.stroke();
  c.fillStyle = '#d24a2a'; for (let k = 0; k < 6; k++) poly([[30 - k * 8, -96 + k * 6], [24 - k * 8, -116 + k * 6], [20 - k * 8, -94 + k * 6]], '#d24a2a');                      // mane
  c.restore();
}
function lpTiger(x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#e4902e'; c.beginPath(); c.ellipse(40, -34, 80, 34, 0, 0, TAU); c.fill();                                                                  // crouched body
  c.strokeStyle = '#2a1a10'; c.lineWidth = 5; c.lineCap = 'round'; for (let k = 0; k < 7; k++) { c.beginPath(); c.moveTo(-10 + k * 18, -66); c.quadraticCurveTo(-4 + k * 18, -44, -12 + k * 18, -24); c.stroke(); }
  c.fillStyle = '#f2ece0'; c.beginPath(); c.ellipse(20, -12, 50, 12, 0, 0, TAU); c.fill();
  // head, facing left toward the visitors
  c.fillStyle = '#ea9a34'; c.beginPath(); c.ellipse(-30, -66, 44, 40, 0, 0, TAU); c.fill(); [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(-30 + sd * 30, -100, 12, 12, 0, 0, TAU); c.fill(); disc(-30 + sd * 30, -100, 6, '#f2c0a0'); });
  c.fillStyle = '#f4efe4'; c.beginPath(); c.ellipse(-46, -48, 30, 22, 0, 0, TAU); c.fill();
  c.fillStyle = '#b8261e'; c.beginPath(); c.ellipse(-56, -40, 22, 16, 0, 0, TAU); c.fill(); c.fillStyle = '#5a0e0a'; c.beginPath(); c.ellipse(-56, -38, 14, 10, 0, 0, TAU); c.fill();      // open mouth
  for (let k = 0; k < 4; k++) { poly([[-70 + k * 9, -54], [-67 + k * 9, -46], [-64 + k * 9, -54]], '#ffffff'); poly([[-70 + k * 9, -26], [-67 + k * 9, -32], [-64 + k * 9, -26]], '#ffffff'); }
  c.strokeStyle = '#2a1a10'; c.lineWidth = 4; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-50 + k * 14, -104); c.lineTo(-46 + k * 12, -88); c.stroke(); }
  [-1, 1].forEach(sd => { disc(-30 + sd * 16, -76, 7, '#fff4c0'); disc(-30 + sd * 16, -76, 3.5, '#1a1a1a'); });
  disc(-48, -62, 5, '#3a2014');
  c.restore();
}
function pagoda(x, y, h, wall, roof, n = 7) {
  const sh = h / (n + 1.2);
  for (let k = 0; k < n; k++) {
    const yb = y - k * sh, w = h * 0.2 * (1 - k * 0.075);
    const wc = k % 2 ? '#d95b38' : wall; c.fillStyle = hg(x - w, x + w, [[0, mix(wc, '#ffffff', 0.25)], [0.6, wc], [1, mix(wc, '#000000', 0.35)]]); c.fillRect(x - w, yb - sh, w * 2, sh);
    c.fillStyle = '#f4f1ea'; c.fillRect(x - w * 1.15, yb - sh * 0.32, w * 2.3, 2.2); for (let p = 0; p <= 8; p++) c.fillRect(x - w * 1.15 + p * w * 2.3 / 8 - 0.6, yb - sh * 0.32, 1.2, sh * 0.3);
    c.fillStyle = '#b8322a'; for (let p = -1; p <= 1; p += 2) c.fillRect(x + p * w * 0.8 - 1.5, yb - sh, 3, sh);
    c.fillStyle = 'rgba(60,30,20,0.6)'; c.fillRect(x - w * 0.25, yb - sh * 0.75, w * 0.5, sh * 0.5);
    const rw = w * 1.55, ry = yb - sh;
    c.beginPath(); c.moveTo(x - rw - 6, ry - 6); c.quadraticCurveTo(x - rw * 0.6, ry + 2, x - w, ry + 3); c.lineTo(x + w, ry + 3); c.quadraticCurveTo(x + rw * 0.6, ry + 2, x + rw + 6, ry - 6); c.lineTo(x + w * 0.7, ry - sh * 0.28); c.lineTo(x - w * 0.7, ry - sh * 0.28); c.closePath();
    c.fillStyle = hg(x - rw, x + rw, [[0, mix(roof, '#ffffff', 0.15)], [1, mix(roof, '#000000', 0.3)]]); c.fill();
  }
  const top = y - n * sh - sh * 0.28; line(x, top, x, top - sh * 0.9, '#c9a24a', 3); disc(x, top - sh * 0.5, 4, '#d8b14f');
}
function headland(xEnd, ySea, slope, seed, top, bot, o = {}) {
  return mountain({ fn: x => x < xEnd ? ySea : Math.min(ySea, ySea - Math.min(o.max || 999, (x - xEnd) * slope) * (0.85 + 0.3 * fbm1(x * 0.01 + seed)) - (fbm1(x * 0.02 + seed * 3) - 0.3) * 26 * clamp((x - xEnd) / 80) - fbm1(x * 0.09 + seed) * 7), floor: ySea + 0.5, top, bot, bottom: ySea, tex: o.tex, seed, dark: o.dark, mid: o.mid, light: o.light, depth: o.depth || 60, n: o.n || 1200, r: o.r || 3, rn: o.rn || 600, lean: -0.5, haze: o.haze, rim: o.rim });
}

const SCENES = [];
/* 0 — 臺北市 象山 dawn */
SCENES.push({ county: '臺北市', place: '象山', sun: () => [880, 470, 0.45], en: 'Xiangshan · Taipei 101', ll: '25.03°N 121.57°E', cam: [1.02, 1.09, 30, -10, 0, 6],
  sub: ['清晨五點半，臺北還沒醒。', '5:30 a.m. — Taipei is still asleep.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#17223d'], [0.3, '#3b4872'], [0.52, '#a27c88'], [0.64, '#eba985'], [0.74, '#f6cd9c'], [1, '#f3dcb8']]); glow(880, 470, 520, '255,185,140', 0.35); stars(80, 1, 220, 0.6);
      stratus(420, 260, 900, 50, 'rgba(235,160,160,0.35)'); stratus(980, 310, 700, 36, 'rgba(255,195,160,0.45)'); stratus(700, 360, 1100, 30, 'rgba(255,210,170,0.35)'); });
    L('far', 0.08, () => mountain({ base: 470, amp: 120, f: 0.0032, seed: 1, oct: 5, top: '#6c6e92', bot: '#b9949b', haze: 'rgba(240,180,160,0.45)', rim: 'rgba(255,200,170,0.5)' }), { blur: 1.2 });
    L('city', 0.3, () => { skyline(540, 7, '#575a7a', '#857b96', { hmin: 14, hvar: 70, win: 0.05 }); xinyiTowers(540, false, '#5d5f80', '#7f7896'); tower101(860, 540, 360, { light: '#8d8fae', dark: '#4d5170' });
      c.fillStyle = vg(440, 560, [[0, 'rgba(236,170,160,0)'], [1, 'rgba(236,180,165,0.6)']]); c.fillRect(-M, 440, W + 2 * M, 140); }, { blur: 0.6 });
    D(0.3, () => { const blink = Math.sin(T * 3) > 0.3; if (blink) glow(860, 540 - 360 * 1.0, 10, '255,60,50', 0.9); });
    L('mist', 0.36, () => { for (let k = 0; k < 7; k++) stratus(k * 230 - 40, 520 + (k % 3) * 14, 520, 26, 'rgba(255,225,215,0.55)'); }, { blur: 5, dx: lt * 7 });
    L('rock', 0.92, () => {
      const pts = [[-M, H], [-M, 500], [40, 486], [150, 462], [250, 492], [330, 520], [470, 522], [560, 548], [660, 610], [760, 660], [820, H]];
      rockFG(pts, '#3a3140', '#120f16', 'rgba(255,175,135,0.65)', 3);
      bushes(40, -M, 250, x => 470 + Math.abs(x - 140) * 0.18, 4, '#1a1820', '#2b2632', 16);
    });
    D(0.92, () => { grassTufts(505, 530, 50, ['#3a3040', '#4a3c48', '#5b4650'], 5, 1, 12, [-M, 455]); actCat({ x: 410, y: 524, s: 1.05, pose: 'sit', sil: true, rim: '255,185,140', look: -0.06, blink: blinkAt(lt) }); });
    D(1, () => treeBranch('#141018', 0));
  } });

/* 1 — 新北市 九份 rain at dusk */
/* Jiufen at night in the rain: a three-storey wooden teahouse on the left, the stepped alley (Shuqi Road) climbing away
   on the right with lantern strings across it that shrink into the mist, wet flagstones mirroring the lanterns. */
function jfTeahouse(x0, x1, yb) {
  const fl = [[yb - 150, yb], [yb - 290, yb - 150], [yb - 410, yb - 290]];
  fl.forEach(([y0, y1], k) => { const inset = k * 10;
    c.fillStyle = vg(y0, y1, [[0, '#3a241b'], [1, '#22140f']]); c.fillRect(x0 + inset, y0, x1 - x0 - 2 * inset, y1 - y0);
    for (let bx2 = x0 + inset; bx2 < x1 - inset; bx2 += 7) line(bx2, y0, bx2, y1, `rgba(${hash(bx2) < 0.5 ? '0,0,0' : '120,80,50'},0.18)`, 1);
    // paper-lattice windows, lit warm
    const n = Math.floor((x1 - x0 - 2 * inset) / 84), ww = 58, wh = (y1 - y0) * 0.5;
    for (let w = 0; w < n; w++) { const wx = x0 + inset + 16 + w * 84, wy = y0 + (y1 - y0) * 0.24;
      const lit = hash(w * 3.1 + k * 7.7); c.fillStyle = lit < 0.18 ? vg(wy, wy + wh, [[0, '#3a2a26'], [1, '#2a1c18']]) : vg(wy, wy + wh, [[0, lit < 0.5 ? '#ffd38e' : '#ffe6b4'], [1, lit < 0.5 ? '#e0803e' : '#f2a660']]); c.fillRect(wx, wy, ww, wh);
      if (lit >= 0.18) glow(wx + ww / 2, wy + wh / 2, ww * 0.9, '255,170,90', 0.12);
      c.strokeStyle = 'rgba(60,32,18,0.85)'; c.lineWidth = 1.2; for (let g = 1; g < 4; g++) line(wx + g * ww / 4, wy, wx + g * ww / 4, wy + wh, 'rgba(60,32,18,0.7)', 1); for (let g = 1; g < 5; g++) line(wx, wy + g * wh / 5, wx + ww, wy + g * wh / 5, 'rgba(60,32,18,0.55)', 0.8);
      c.strokeStyle = '#1c100b'; c.lineWidth = 3; c.strokeRect(wx, wy, ww, wh); }
    // balcony rail
    if (k < 2) { const ry = y0 + (y1 - y0) * 0.86; c.fillStyle = '#1a0f0b'; c.fillRect(x0 + inset - 8, ry, x1 - x0 - 2 * inset + 16, 6); for (let b = x0 + inset - 6; b < x1 - inset + 6; b += 11) c.fillRect(b, ry + 6, 3, 18); c.fillRect(x0 + inset - 8, ry + 22, x1 - x0 - 2 * inset + 16, 4); }
    // deep eave with turned-up corners
    const ey = y0 - 2, L0 = x0 + inset - 46, R0 = x1 - inset + 46; c.fillStyle = '#120c0e'; c.beginPath(); c.moveTo(L0 - 18, ey - 16); c.quadraticCurveTo(L0 + 10, ey + 2, L0 + 40, ey - 4); c.lineTo(R0 - 40, ey - 4); c.quadraticCurveTo(R0 - 10, ey + 2, R0 + 18, ey - 16); c.lineTo(R0, ey + 10); c.lineTo(L0, ey + 10); c.closePath(); c.fill();
    for (let t = 0; t < 40; t++) line(L0 + t * (R0 - L0) / 40, ey - 3, L0 + t * (R0 - L0) / 40 - 4, ey + 9, 'rgba(70,64,72,0.55)', 1);
    // planters on the balcony
    if (k < 2) { const r = rng(k + 31); for (let t = 0; t < 18; t++) oval(x0 + inset + r() * (x1 - x0 - 2 * inset), y0 + (y1 - y0) * 0.84 - r() * 6, 7 + r() * 8, 5 + r() * 4, 0, mix('#2c4d2a', '#6c9348', r(), 0.95)); }
  });
  c.fillStyle = '#9a2a20'; c.fillRect(x1 - 70, yb - 380, 34, 170); c.strokeStyle = '#d9a648'; c.lineWidth = 2; c.strokeRect(x1 - 70, yb - 380, 34, 170);
  c.font = `700 24px ${FONTS}`; c.fillStyle = '#f4d9a0'; c.textAlign = 'center'; '茶樓'.split('').forEach((ch, i) => c.fillText(ch, x1 - 53, yb - 334 + i * 56));
  c.fillStyle = '#1b120e'; c.fillRect(x0 + 120, yb - 168, 190, 30); c.font = `700 18px ${FONTS}`; c.fillStyle = '#e8c27a'; c.fillText('悲 情 茶 坊', x0 + 215, yb - 147);
}
const JF = { vp: [905, 300], l0: 690, r0: 1080, yb: 598 };
function jfAlley(z) { const { vp, l0, r0, yb } = JF; return { l: lerp(l0, vp[0] - 26, z), r: lerp(r0, vp[0] + 26, z), y: lerp(yb, vp[1] + 20, z), s: 1 - z * 0.9 }; }
SCENES.push({ county: '新北市', place: '九份老街', sun: () => [905, 300, 0.25], en: 'Jiufen Old Street', ll: '25.11°N 121.84°E', cam: [1.04, 1.1, -20, 20, 0, 0],
  sub: ['九份的雨，把燈籠洗得更紅了。', 'In Jiufen, the rain makes the lanterns glow redder.'],
  draw(lt) {
    L('sky', 0, () => { sky([[0, '#0f2550'], [0.35, '#1d3f7a'], [0.6, '#3d5a92'], [0.78, '#6a6a98'], [1, '#5a5070']]); stratus(880, 260, 1000, 90, 'rgba(150,160,200,0.3)'); stars(30, 43, 200, 0.4); });
    L('far', 0.05, () => { c.fillStyle = vg(330, 420, [[0, '#4a5068'], [1, '#2f3448']]); c.fillRect(-M, 330, W + 2 * M, 120);
      mountain({ base: 360, amp: 110, f: 0.0042, seed: 41, oct: 4, top: '#2a3044', bot: '#3c4258', shape: (x, n) => n * Math.exp(-Math.pow((x - 980) / 220, 2)) * 1.4, haze: 'rgba(120,120,145,0.55)' });
      for (let k = 0; k < 40; k++) line(-M, 340 + k * 2.2, W + M, 340 + k * 2.2, `rgba(255,190,140,${0.03 * Math.sin(k * 0.7) ** 2})`, 1); }, { blur: 2.2 });
    L('houses', 0.3, () => { const r = rng(11);
      for (let k = 0; k < 90; k++) { const x = 560 + r() * 760, y = 300 + r() * 130 + (x - 560) * 0.12, w = 22 + r() * 30, h = 14 + r() * 16;
        c.fillStyle = mix('#2c2a36', '#45404c', r()); c.fillRect(x, y, w, h); poly([[x - 3, y], [x + w / 2, y - 7], [x + w + 3, y]], '#1d1a22');
        for (let q = 0; q < 3; q++) if (r() < 0.55) { c.fillStyle = `rgba(255,${170 + r() * 60},110,0.85)`; c.fillRect(x + 3 + q * w / 3, y + 4, w / 5, h / 3); } } }, { blur: 1.4 });
    D(0.3, () => { const r = rng(12); for (let k = 0; k < 26; k++) glow(600 + r() * 680, 320 + r() * 140, 14, '255,170,90', 0.12 + 0.04 * Math.sin(T * 3 + k)); });
    // the stepped alley climbing to the vanishing point, facades on both sides receding into rain mist
    L('alley', 0.55, () => { const { vp, yb } = JF, zs = []; for (let k = 0; k <= 26; k++) zs.push(1 - 1 / (1 + k * 0.22));
      // steps
      for (let k = 0; k < zs.length - 1; k++) { const a = jfAlley(zs[k]), b = jfAlley(zs[k + 1]), mid = (a.y + b.y) / 2;
        poly([[a.l, a.y], [a.r, a.y], [b.r, b.y], [b.l, b.y]], mix('#3a3438', '#625a5a', 0.4 + 0.2 * (k % 2)));
        poly([[a.l, a.y], [a.r, a.y], [a.r, mid], [a.l, mid]], mix('#2a2428', '#4a4246', 0.5)); line(a.l, a.y, a.r, a.y, 'rgba(255,200,150,0.18)', 1); }
      // facades along each side
      [-1, 1].forEach(sd => { for (let k = 0; k < 7; k++) { const z0 = 0.06 + k * 0.13, z1 = z0 + 0.11, A = jfAlley(z0), B = jfAlley(z1), xa = sd < 0 ? A.l : A.r, xb = sd < 0 ? B.l : B.r, ha = 330 * A.s, hb = 330 * B.s;
        const out = sd < 0 ? -70 * A.s : 70 * A.s, outB = sd < 0 ? -70 * B.s : 70 * B.s, haze = 0.15 + 0.6 * z0;
        poly([[xa, A.y], [xb, B.y], [xb, B.y - hb], [xa, A.y - ha]], mix('#2e1c16', '#5a4e58', haze));
        // windows (warm) in perspective
        for (let fl2 = 0; fl2 < 3; fl2++) { const u0 = 0.18 + fl2 * 0.3, u1 = u0 + 0.16, wa = [lerp(xa, xb, 0.2), lerp(xa, xb, 0.8)];
          const ya = (t, u) => lerp(lerp(A.y, B.y, t), lerp(A.y - ha, B.y - hb, t), u);
          poly([[wa[0], ya(0.2, u0)], [wa[1], ya(0.8, u0)], [wa[1], ya(0.8, u1)], [wa[0], ya(0.2, u1)]], `rgba(255,${180 + fl2 * 15},110,${0.85 - haze * 0.6})`); }
        // eave
        poly([[xa + out, A.y - ha - 4], [xb + outB, B.y - hb - 4], [xb, B.y - hb + 6 * B.s], [xa, A.y - ha + 6 * A.s]], mix('#140e10', '#4a4450', haze)); } });
      // rain mist down the alley
      const g = c.createRadialGradient(vp[0], vp[1] + 40, 10, vp[0], vp[1] + 40, 420); g.addColorStop(0, 'rgba(150,140,160,0.55)'); g.addColorStop(1, 'rgba(150,140,160,0)'); c.fillStyle = g; c.fillRect(vp[0] - 420, vp[1] - 380, 840, 840);
    });
    // lantern strings across the alley, shrinking with distance (dynamic: they sway)
    D(0.55, () => { [0.1, 0.22, 0.35, 0.48, 0.6, 0.72].forEach((z, k) => { const A = jfAlley(z), h = 190 * A.s, yA = A.y - h, n = Math.max(3, Math.round(6 * A.s + 2));
      c.strokeStyle = `rgba(30,18,14,${0.8 - z * 0.5})`; c.lineWidth = 1.2 * A.s + 0.3; c.beginPath(); c.moveTo(A.l, yA); c.quadraticCurveTo((A.l + A.r) / 2, yA + 40 * A.s, A.r, yA); c.stroke();
      for (let t = 1; t < n; t++) { const u = t / n, x = lerp(A.l, A.r, u), y = yA + 4 * 40 * A.s * u * (1 - u) * 0.5 + 10 * A.s; c.save(); c.globalAlpha = 1 - z * 0.45; lantern(x, y, 11 * A.s + 1.5, Math.sin(T * 1.4 + k + t) * 0.08, 1 - z * 0.4); c.restore(); } }); });
    L('tea', 0.75, () => { jfTeahouse(-70, 690, 598); });
    D(0.75, () => { [[598 - 150, 690], [598 - 290, 680], [598 - 410, 670]].forEach(([y, x1], row) => { for (let k = 0; k * 42 < x1 + 90; k++) lantern(-60 + k * 42, y + 22 + (k % 2) * 4, 10, Math.sin(T * 1.6 + k + row) * 0.07); }); });
    // near wall on the right of the alley mouth (where the black cat shelters)
    L('right', 0.8, () => { c.fillStyle = vg(240, 600, [[0, '#2b2026'], [1, '#17121a']]); c.fillRect(1080, 250, 360, 350); for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(255,190,110,0.72)'; c.fillRect(1110 + k * 70, 300 + (k % 2) * 70, 34, 46); }
      c.fillStyle = '#120c0e'; c.beginPath(); c.moveTo(1040, 262); c.quadraticCurveTo(1060, 248, 1090, 244); c.lineTo(1400, 244); c.lineTo(1400, 262); c.closePath(); c.fill(); });
    D(0.8, () => { for (let k = 0; k < 5; k++) lantern(1100 + k * 62, 278, 10, Math.sin(T * 1.5 + k) * 0.08); });
    L('ground', 0.95, () => { c.fillStyle = vg(598, H, [[0, '#2c2830'], [1, '#121016']]); c.fillRect(-M, 596, W + 2 * M, 200); const r = rng(19);
      for (let y = 600; y < H; y += 14) { line(-M, y, W + M, y, 'rgba(0,0,0,0.45)', 1.2); for (let x = -M + (y % 28) * 2; x < W + M; x += 56 + r() * 20) line(x, y, x - 4, y + 14, 'rgba(0,0,0,0.35)', 1); } });
    D(0.95, () => { c.save(); c.beginPath(); c.rect(-M, 598, W + 2 * M, 200); c.clip();
      // lantern reflections in the wet flagstones: long soft vertical streaks under every lantern row
      for (let k = 0; k < 12; k++) { const x = -40 + k * 66; c.save(); c.translate(x, 616); c.scale(1, 3.2); glow(0, 0, 16, '255,110,60', 0.2 + 0.06 * Math.sin(T * 5 + k)); c.restore(); }
      for (let k = 0; k < 5; k++) { c.save(); c.translate(1100 + k * 62, 612); c.scale(1, 2.6); glow(0, 0, 13, '255,140,70', 0.16); c.restore(); }
      c.save(); c.translate(JF.vp[0], 612); c.scale(1, 2); glow(0, 0, 90, '255,170,110', 0.12); c.restore();
      shimmer(602, 690, 70, '255,180,120', 13, { a: 0.35, len: 12 }); c.restore();
      const x = 660 + lt * 34; actCat({ x, y: 604, s: 0.95, pose: 'walk', ph: walkPh(lt * 34, 0.95), rim: '255,160,90', look: -0.05, blink: blinkAt(lt, 2) }); });
    D(1, () => { rain(300, 14, 0.25);
      // out-of-focus lanterns right in front of the lens (shallow depth of field)
      [[-30, 150, 70], [1240, 170, 60], [1290, 520, 80]].forEach(([x, y, r], k) => { glow(x, y, r * 1.7, '255,110,60', 0.32 + 0.04 * Math.sin(T * 2 + k)); c.save(); c.globalAlpha = 0.5; c.filter = `blur(${10 * S}px)`; oval(x, y, r * 0.55, r * 0.66, 0, '#d8442e'); c.restore(); }); });
  } });

/* Zhengbin harbour per photos: a crowded row of 3–5 storey houses painted in saturated colours (turquoise, orange, lemon, red,
   pink, lime, cobalt, white), varied heights and widths, balconies, window bars, AC units, rooftop sheds and water tanks;
   a green hill with more houses behind; boats moored nose to tail along the quay; a mirror-calm, turquoise harbour. */
function zbHouses(hz) {
  const cols = ['#27b5c4', '#f2832a', '#f6d02f', '#e6413a', '#f27aa3', '#86c440', '#3a7fd0', '#f5f0e4', '#ffb2bf', '#9a6cd0', '#2fa36b', '#ff6a3a', '#5fd0c0', '#f3a6d8'];
  // hillside houses (hazed)
  const r0 = rng(35); for (let k = 0; k < 70; k++) { const x = r0() * (W + 2 * M) - M, y = hz - 112 - r0() * 70, w = 14 + r0() * 22, h = 12 + r0() * 18;
    c.fillStyle = mix(cols[Math.floor(r0() * cols.length)], '#c8d6d8', 0.55); c.fillRect(x, y - h, w, h + 30); c.fillStyle = 'rgba(70,90,100,0.35)'; for (let fx = x + 3; fx < x + w - 4; fx += 7) c.fillRect(fx, y - h + 4, 3, 4); }
  // back row: taller blocks peeking over
  const r1 = rng(36); for (let x = -M; x < W + M;) { const w = 40 + r1() * 60, h = 140 + r1() * 70; if (r1() < 0.35) { x += w; continue; } c.fillStyle = mix(cols[Math.floor(r1() * cols.length)], '#d8e0e2', 0.45); c.fillRect(x, hz - h, w, h);
    c.fillStyle = 'rgba(60,70,80,0.3)'; for (let fy = hz - h + 10; fy < hz - 120; fy += 24) for (let fx = x + 5; fx < x + w - 10; fx += 15) c.fillRect(fx, fy, 8, 10); x += w + r1() * 30; }
  // front row along the quay
  const r = rng(31); let x = -M, last = -1;
  while (x < W + M) { const fl = 3 + Math.floor(r() * 3), fh = 27, w = 36 + r() * 34, h = fl * fh + 8; let ci = Math.floor(r() * cols.length); if (ci === last) ci = (ci + 3) % cols.length; last = ci; const col = cols[ci], yb = hz, top = yb - h;
    c.fillStyle = vg(top, yb, [[0, mix(col, '#ffffff', 0.12)], [1, mix(col, '#000000', 0.1)]]); c.fillRect(x, top, w, h);
    c.fillStyle = 'rgba(0,0,0,0.16)'; c.fillRect(x + w - 3, top, 3, h); c.fillStyle = 'rgba(255,255,255,0.3)'; c.fillRect(x, top, w, 3);
    // ground floor: roll-up door / shop
    c.fillStyle = '#5a5c60'; c.fillRect(x + 4, yb - 22, w - 8, 22); for (let k = yb - 20; k < yb; k += 3) line(x + 4, k, x + w - 4, k, 'rgba(255,255,255,0.12)', 1);
    for (let f = 1; f < fl; f++) { const fy = yb - 22 - f * fh + 6, bal = r() < 0.45;
      const nw = Math.max(1, Math.floor((w - 8) / 16)); for (let k = 0; k < nw; k++) { const fx = x + 5 + k * ((w - 10) / nw); c.fillStyle = r() < 0.15 ? '#c9d8de' : '#33424e'; c.fillRect(fx + 2, fy, (w - 10) / nw - 5, 14); c.fillStyle = 'rgba(255,255,255,0.4)'; c.fillRect(fx + 2, fy, (w - 10) / nw - 5, 2);
        c.strokeStyle = 'rgba(30,30,30,0.35)'; c.lineWidth = 0.7; for (let b = fx + 4; b < fx + (w - 10) / nw - 4; b += 3) { c.beginPath(); c.moveTo(b, fy); c.lineTo(b, fy + 14); c.stroke(); } }
      if (bal) { c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(x + 2, fy + 16, w - 4, 3); c.strokeStyle = 'rgba(40,40,40,0.55)'; c.lineWidth = 0.8; line(x + 2, fy + 10, x + w - 2, fy + 10, 'rgba(40,40,40,0.55)', 0.8); for (let b = x + 3; b < x + w - 2; b += 4) line(b, fy + 10, b, fy + 16, 'rgba(40,40,40,0.4)', 0.6); }
      if (r() < 0.35) { c.fillStyle = '#e6e6e2'; c.fillRect(x + w - 14, fy + 4, 10, 7); c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(x + w - 14, fy + 10, 10, 1); } }
    // roof: parapet, stair shed, water tanks
    c.fillStyle = mix(col, '#000000', 0.2); c.fillRect(x, top - 4, w, 4);
    if (r() < 0.6) { const sw = 12 + r() * 12; c.fillStyle = r() < 0.5 ? '#d9d6cf' : mix(col, '#ffffff', 0.3); c.fillRect(x + 4 + r() * (w - sw - 8), top - 18, sw, 14); }
    if (r() < 0.5) { const tx = x + 6 + r() * (w - 16); c.fillStyle = r() < 0.5 ? '#3d7ec8' : '#e8e4dc'; c.fillRect(tx, top - 12, 9, 8); oval(tx + 4.5, top - 12, 4.5, 1.6, 0, '#bfc4c8'); }
    x += w; }
  // quay
  c.fillStyle = vg(hz - 2, hz + 12, [[0, '#a7a49c'], [1, '#6c6a66']]); c.fillRect(-M, hz - 2, W + 2 * M, 12); line(-M, hz - 2, W + M, hz - 2, 'rgba(255,255,255,0.4)', 1);
  for (let k = 0; k < 30; k++) { const tx = -M + k * 48 + 20; c.fillStyle = '#e8e4da'; c.fillRect(tx, hz + 2, 5, 6); }
  // moored boats along the quay (static, so they reflect with the houses)
  const rb = rng(37); for (let bx = -M + 30; bx < W + M; bx += 80 + rb() * 60) { const s = 0.5 + rb() * 0.25, white = rb() < 0.55, hull = white ? '#f2f1ec' : '#2c6fb5', y = hz + 15;
    c.save(); c.translate(bx, y); c.scale(s, s); poly([[-70, -18], [74, -22], [60, 4], [-58, 4]]); c.fillStyle = vg(-22, 4, [[0, hull], [1, mix(hull, '#000000', 0.25)]]); c.fill();
    poly([[-68, -14], [72, -18], [70, -13], [-67, -10]], white ? (rb() < 0.5 ? '#2c6fb5' : '#d83c32') : '#f2f1ec');
    c.fillStyle = '#f4f4f0'; c.fillRect(-20, -48, 46, 30); c.fillStyle = '#34495a'; for (let k = 0; k < 3; k++) c.fillRect(-15 + k * 14, -42, 10, 9); if (rb() < 0.6) { c.fillStyle = '#e8e8e4'; c.fillRect(-8, -64, 24, 16); }
    line(6, -64, 6, -100, '#5a5a5a', 2); c.restore(); }
}
/* 2 — 基隆市 正濱漁港 */
SCENES.push({ county: '基隆市', place: '正濱漁港', en: 'Zhengbin Fishing Port', ll: '25.15°N 121.77°E', cam: [1.03, 1.08, 20, -20, 0, 0],
  sub: ['基隆的漁港，每一扇窗都是不同的顏色。', 'In Keelung, every window by the harbor wears a different color.'],
  draw(lt) {
    const hz = 440;
    L('sky', 0, () => { sky([[0, '#3f86d0'], [0.5, '#9cc6e8'], [1, '#e6eef2']]); cumulus(300, 220, 380, 90, 21, '#ffffff', '#c3cfdd', 0.3); cumulus(1000, 190, 320, 80, 22, '#ffffff', '#c0cad8', 0.3); }, { blur: 1.5 });
    L('hill', 0.1, () => mountain({ base: 300, amp: 130, f: 0.004, seed: 6, top: '#3f7a46', bot: '#5f9258', tex: 'forest', dark: '#2f5e36', mid: '#4f8a4c', light: '#8fc070', depth: 200, n: 2600, r: 3.2, haze: 'rgba(190,215,220,0.25)' }), { blur: 0.6 });
    const housesP = () => zbHouses(hz);
    L('houses', 0.3, housesP);
    L('water', 0.3, () => { c.fillStyle = vg(hz, H, [[0, '#4aa3a6'], [0.5, '#2f8088'], [1, '#1d5560']]); c.fillRect(-M, hz + 10, W + 2 * M, H); });
    R('houses', 0.3, hz + 12, 0.78, housesP, 1.2, { shift: 0, ripple: 0.15 });
    D(0.3, () => { c.fillStyle = 'rgba(60,170,170,0.12)'; c.fillRect(-M, hz + 10, W + 2 * M, H); shimmer(hz + 14, H, 200, '255,255,250', 32, { a: 0.35, len: 30, w: 1 }); });
    D(0.55, () => { boat(380, 548, 1.0, '#2f6fb0', 0); boat(840, 530, 0.85, '#d83c32', 2); boat(1130, 556, 1.1, '#2c6fb5', 4); });
    D(0.5, () => flock(4, 400, 200, 22, 0.8, 'rgba(60,60,70,0.85)', 33, lt));
    L('pier', 0.95, () => { poly([[-M, 586], [520, 590], [560, H], [-M, H]]); c.fillStyle = vg(586, H, [[0, '#8f8f8a'], [1, '#55524e']]); c.fill(); line(-M, 587, 522, 591, 'rgba(255,255,255,0.45)', 2);
      const rp = rng(38); for (let k = 0; k < 500; k++) disc(-M + rp() * 600, 592 + rp() * 40, 0.6 + rp(), rp() < 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)');
      c.fillStyle = '#e6c22e'; for (let k = 0; k < 6; k++) { c.fillRect(-M + 40 + k * 90, 594, 40, 4); }
      c.fillStyle = '#3e3a38'; c.fillRect(440, 566, 22, 26); oval(451, 566, 14, 5, 0, '#57524f'); line(451, 576, 540, 604, 'rgba(220,210,180,0.8)', 1.5); });
    D(0.95, () => actCat({ x: 300, y: 594, s: 1.15, pose: 'sit', rim: '255,245,225', look: -0.04, blink: blinkAt(lt, 3) }));
  } });

/* 3 — 宜蘭縣 龜山島 sunrise — per photos: blue dawn sky going gold at the horizon, a bank of cumulus lit from below on the
   horizon with rays fanning up from the hidden sun, Turtle Island hazed blue-grey, black reef rocks framing the shore,
   long-exposure surf washing up the sand. */
SCENES.push({ county: '宜蘭縣', place: '外澳海灘 · 龜山島', sun: lt => [820, 432 - lt * 9, 1], en: 'Turtle Island from Wai’ao', ll: '24.88°N 121.84°E', cam: [1.02, 1.08, -10, 10, 0, 0],
  sub: ['宜蘭的海上，龜山島正等著日出。', 'Off Yilan, Turtle Island waits for the sunrise.'],
  draw(lt) {
    const hz = 420, sy = 432 - lt * 9;
    L('sky', 0, () => { sky([[0, '#152752'], [0.25, '#2f5a98'], [0.43, '#6f8fbc'], [0.52, '#d9b98a'], [0.58, '#f6c867'], [1, '#ffe2a2']]);
      stratus(300, 180, 900, 60, 'rgba(40,60,110,0.45)'); stratus(1050, 150, 800, 50, 'rgba(40,60,110,0.4)'); stratus(420, 300, 900, 40, 'rgba(255,190,150,0.35)'); stratus(1000, 270, 700, 30, 'rgba(255,200,160,0.3)'); });
    D(0, () => { godrays(820, sy + 6, 520, 22, '255,225,160', 0.11 * (1 - sm((lt - 4) / 3) * 0.4), 31, 2.2, -Math.PI / 2); glow(820, sy, 380, '255,190,110', 0.5);
      c.save(); c.beginPath(); c.rect(-M, 0, W + 2 * M, hz); c.clip(); disc(820, sy, 26, '#fff1c8'); glow(820, sy, 60, '255,240,200', 0.8); c.restore(); });
    // the horizon cloud bank, dark blue below, rims lit gold
    L('bank', 0.05, () => { c.fillStyle = vg(392, hz, [[0, 'rgba(58,68,104,0)'], [0.35, '#3e4870'], [1, '#353f62']]); c.fillRect(-M, 392, W + 2 * M, hz - 392);
      [[120, 404, 420, 70, 33], [560, 400, 360, 60, 34], [960, 408, 520, 80, 35], [1260, 402, 360, 62, 36]].forEach(([x, y, w, h, sd]) => cumulus(x, y, w, h, sd, 'rgba(255,200,130,0.6)', '#38426a', 0.0));
      c.fillStyle = vg(380, hz, [[0, 'rgba(70,80,120,0)'], [1, 'rgba(70,80,120,0.6)']]); c.fillRect(-M, 380, W + 2 * M, hz - 380); }, { blur: 1 });
    L('island', 0.12, () => { const pts = [[400, hz + 1], [418, 410], [446, 380], [480, 342], [506, 326], [524, 323], [546, 334], [596, 358], [656, 374], [706, 386], [730, 389], [746, 382], [760, 390], [780, hz + 1]]; smoothClosed(pts); c.fillStyle = vg(320, hz, [[0, '#3c4868'], [1, '#2c3552']]); c.fill();
      c.save(); smoothClosed(pts); c.clip(); c.fillStyle = hg(520, 790, [[0, 'rgba(255,200,140,0)'], [1, 'rgba(255,200,140,0.18)']]); c.fillRect(400, 300, 400, 130); const r = rng(37); for (let k = 0; k < 220; k++) disc(400 + r() * 380, 330 + r() * 90, 1 + r() * 1.5, 'rgba(20,30,50,0.08)'); c.restore(); }, { blur: 0.6 });
    L('sea', 0.2, () => { c.fillStyle = vg(hz, H, [[0, '#7c86a0'], [0.12, '#4d6890'], [0.5, '#2c4468'], [1, '#162238']]); c.fillRect(-M, hz, W + 2 * M, H);
      // distant reef just off the beach
      [[905, 446, 60, 14, 381], [990, 450, 40, 9, 382], [1080, 444, 80, 18, 383], [620, 452, 34, 8, 384]].forEach(([x, y, w, h, sd]) => boulder(x, y, w, h, sd, { col: '#2a2c3a', dk: '#141620', lit: 'rgba(255,200,140,0.12)', cracks: 1, sink: 2 })); });
    D(0.2, () => { shimmer(hz + 2, 600, 240, '255,214,150', 41, { xc: 820, spread: 260, a: 0.85, len: 30, w: 1.4, op: 'lighter' }); shimmer(hz + 2, 600, 140, '190,210,255', 42, { a: 0.2, len: 34 }); });
    L('beach', 0.9, () => { c.fillStyle = vg(560, H, [[0, '#4a4250'], [0.4, '#2e2834'], [1, '#17131c']]); c.fillRect(-M, 566, W + 2 * M, 200);
      const r = rng(45); for (let k = 0; k < 900; k++) disc(r() * (W + 2 * M) - M, 570 + Math.pow(r(), 1.4) * 70, 0.5 + r() * 0.9, r() < 0.5 ? 'rgba(255,210,170,0.07)' : 'rgba(0,0,0,0.16)');
      // black reef rocks framing the shore
      boulder(40, 574, 330, 150, 46, { col: '#2a2830', dk: '#0c0b10', lit: 'rgba(255,190,130,0.12)', rim: 'rgba(255,190,130,0.45)', n: 12, sink: 60, round: 0.7 });
      boulder(196, 586, 110, 46, 47, { col: '#24232b', dk: '#0c0b10', lit: 'rgba(255,190,130,0.1)', rim: 'rgba(255,190,130,0.35)', n: 6, sink: 40 });
      boulder(1270, 560, 210, 120, 48, { col: '#26252e', dk: '#0c0b10', lit: 'rgba(255,190,130,0.1)', rim: 'rgba(255,190,130,0.4)', n: 9, sink: 80, round: 0.8 }); });
    D(0.9, () => { const sw = Math.sin(lt * 0.9) * 10; c.save(); c.globalCompositeOperation = 'lighter';
      // long-exposure wash: soft white sheets sliding up the sand with streaks
      for (let k = 0; k < 3; k++) { const u = mod(lt * 0.22 + k / 3, 1), y = 552 + u * 24, a = Math.sin(u * Math.PI);
        c.fillStyle = vg(y - 10, y + 6, [[0, 'rgba(200,215,240,0)'], [1, `rgba(220,230,250,${0.22 * a})`]]); c.fillRect(-M, y - 10, W + 2 * M, 16);
        const r = rng(49 + k); for (let j = 0; j < 40; j++) { const x = r() * (W + 2 * M) - M, l = 30 + r() * 70; c.strokeStyle = `rgba(235,240,255,${0.3 * a * r()})`; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y + r() * 4); c.lineTo(x + l, y + r() * 4 - 2); c.stroke(); } }
      c.restore(); shimmer(560, 600, 80, '255,210,160', 43, { xc: 820, spread: 300, a: 0.5 });
      c.strokeStyle = 'rgba(255,240,225,0.8)'; c.lineWidth = 2; c.beginPath(); for (let x = -M; x <= W + M; x += 12) { const y = 560 + sw + Math.sin(x * 0.03 + lt * 2) * 2; x === -M ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke();
      flock(5, 260, 260, 18, 0.7, 'rgba(30,25,40,0.85)', 44, lt);
      actCat({ x: 330, y: 604, s: 1.1, pose: 'sit', sil: true, rim: '255,175,120', look: -0.08, blink: blinkAt(lt, 4) }); });
  } });

/* 4 — 花蓮縣 清水斷崖 */
/* Qingshui cliffs from the Huide viewpoint: sheer green-capped cliffs falling straight into the Pacific, ridge after
   ridge receding into the haze, turquoise water and a white surf line along the narrow gravel beach at their foot,
   the Suhua highway slipping into a tunnel portal, and the wooden viewing deck in front. */
function qsCliff(x0, ySea, yTop, seed, haze, o = {}) {
  // profile: sheer face rising from the sea at x0, rounded shoulder, ridge running off to the right
  const ridge = x => yTop + (x - x0 - 60) * 0.12 + (fbm1(x * 0.008 + seed) - 0.5) * 60;
  const face = y => x0 + (ySea - y) * (o.lean ?? 0.18) + (fbm1(y * 0.02 + seed * 2) - 0.5) * 22;
  const pts = []; for (let y = ySea; y >= yTop + 30; y -= 6) pts.push([face(y), y]);
  for (let x = face(yTop + 30) + 10; x <= W + M + 20; x += 10) pts.push([x, Math.min(ridge(x), ySea)]);
  pts.push([W + M + 20, ySea + 2], [x0 - 20, ySea + 2]);
  const rock = hexMix2(o.rock || '#8c8a80', '#c4d2d8', haze), green = hexMix2('#3f6b3a', '#a8bcc0', haze), green2 = hexMix2('#7aa25c', '#c0d0d0', haze);
  c.save(); poly(pts); c.fillStyle = vg(yTop, ySea, [[0, green], [0.45, hexMix2('#4c7442', '#b0c2c4', haze)], [1, rock]]); c.fill(); c.clip();
  const r = rng(seed);
  // vertical rock striations on the lower face
  for (let k = 0; k < 160; k++) { const y = yTop + 60 + r() * (ySea - yTop - 60), x = face(y) + r() * 160; c.strokeStyle = `rgba(${r() < 0.5 ? '40,38,34' : '230,228,220'},${(0.12 + r() * 0.12) * (1 - haze)})`; c.lineWidth = 1 + r() * 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r() - 0.5) * 6, y + 14 + r() * 40); c.stroke(); }
  // shadow on the side facing away from the light
  c.fillStyle = `rgba(20,30,40,${0.22 * (1 - haze)})`; c.beginPath(); c.moveTo(face(ySea) - 30, ySea); for (let y = ySea; y >= yTop + 30; y -= 6) c.lineTo(face(y) + 26, y); c.lineTo(face(yTop + 30) - 30, yTop + 30); c.closePath(); c.fill();
  // forest canopy clinging to the upper slopes
  for (let k = 0; k < (o.n || 900); k++) { const x = x0 + r() * (W + M - x0), yr = Math.min(ridge(x), ySea), y = yr + Math.pow(r(), 1.6) * (ySea - yr) * 0.75; if (x < face(y) + 4) continue; oval(x, y, (3 + r() * 6) * (o.sc || 1), (2 + r() * 4) * (o.sc || 1), 0, mix(green, green2, r(), 0.9)); }
  c.restore();
  // gravel beach and surf at the foot
  c.fillStyle = hexMix2('#b8b2a4', '#d8e0e2', haze); c.beginPath(); c.moveTo(face(ySea) - 30, ySea + 1); c.lineTo(W + M, ySea + 1); c.lineTo(W + M, ySea + 4 * (o.sc || 1)); c.lineTo(face(ySea) - 30, ySea + 4 * (o.sc || 1)); c.closePath(); c.fill();
  return { face, ridge };
}
function hexMix2(a, b, t) { const A = hx(a), B = hx(b); return '#' + [0, 1, 2].map(i => Math.round(lerp(A[i], B[i], clamp(t))).toString(16).padStart(2, '0')).join(''); }
SCENES.push({ county: '花蓮縣', place: '清水斷崖', sun: () => [260, 120, 0.45], en: 'Qingshui Cliffs', ll: '24.21°N 121.66°E', cam: [1.03, 1.1, 30, -20, 0, 0],
  sub: ['花蓮的斷崖，一路從山落進海裡。', 'In Hualien, the cliffs fall straight from the mountains into the sea.'],
  draw(lt) {
    const sea = 470;
    L('sky', 0, () => { sky([[0, '#4f8fcb'], [0.55, '#a9cde4'], [1, '#e2eef0']]); cumulus(300, 220, 300, 64, 51, '#ffffff', '#cdd7e2', -0.2); stratus(900, 250, 900, 50, 'rgba(255,255,255,0.5)'); }, { blur: 2 });
    L('ocean', 0.1, () => { c.fillStyle = vg(300, H, [[0, '#8fc0d6'], [0.12, '#2f86bf'], [0.6, '#1f6aa8'], [1, '#16558c']]); c.fillRect(-M, 300, W + 2 * M, H); }, { blur: 0.5 });
    D(0.1, () => shimmer(320, H, 220, '255,255,255', 52, { a: 0.35, len: 16 }));
    // ridges receding into the haze
    L('c1', 0.1, () => qsCliff(470, 318, 200, 53, 0.78, { n: 300, sc: 0.5, lean: 0.1 }), { blur: 1.4 });
    L('c2', 0.18, () => qsCliff(560, 352, 150, 54, 0.55, { n: 500, sc: 0.65, lean: 0.12 }), { blur: 0.9 });
    L('c3', 0.3, () => qsCliff(680, 404, 90, 57, 0.3, { n: 900, sc: 0.85, lean: 0.14 }), { blur: 0.4 });
    // turquoise shallows along each foot of the cliffs, under the near cliff
    L('shallow', 0.3, () => { [[470, 320, 380], [560, 355, 520], [680, 408, 680]].forEach(([x, y, w]) => { c.fillStyle = 'rgba(90,200,205,0.5)'; c.beginPath(); c.moveTo(x - 40, y + 2); c.lineTo(W + M, y + 2); c.lineTo(W + M, y + 10 + w * 0.02); c.lineTo(x - 20, y + 10); c.closePath(); c.fill(); }); }, { blur: 6 });
    L('near', 0.45, () => { const C = qsCliff(800, sea, 20, 55, 0.0, { n: 2200, sc: 1.1, lean: 0.2 });
      // Suhua highway: a ledge cut into the face, disappearing into an arched tunnel portal
      const ty = 380, tx = C.face(ty) + 10; c.fillStyle = '#b8b4aa'; c.beginPath(); c.moveTo(tx - 4, ty + 10); c.lineTo(W + M, ty - 40); c.lineTo(W + M, ty - 28); c.lineTo(tx - 4, ty + 22); c.closePath(); c.fill(); line(tx, ty + 10, W + M, ty - 40, '#e8e6e0', 1.5);
      c.fillStyle = '#d6d2c8'; c.beginPath(); c.moveTo(tx + 60, ty + 4); c.lineTo(tx + 60, ty - 22); c.arc(tx + 80, ty - 22, 20, Math.PI, 0); c.lineTo(tx + 100, ty - 2); c.closePath(); c.fill();
      c.fillStyle = '#1e1c1a'; c.beginPath(); c.moveTo(tx + 66, ty + 2); c.lineTo(tx + 66, ty - 22); c.arc(tx + 80, ty - 22, 14, Math.PI, 0); c.lineTo(tx + 94, ty); c.closePath(); c.fill(); });
    D(0.45, () => { const u = mod(lt * 0.18, 1), x = lerp(1330, 880, u), y = lerp(338, 390, u); if (u < 0.92) { c.fillStyle = '#d23a2e'; c.fillRect(x - 7, y - 6, 14, 6); c.fillStyle = 'rgba(30,40,60,0.7)'; c.fillRect(x - 4, y - 9, 8, 3); } });
    // surf breaking along the foot of each cliff
    D(0.45, () => { [[470, 318, 0.4], [560, 352, 0.6], [680, 404, 0.8], [800, sea, 1]].forEach(([x, y, k], i) => { for (let w = 0; w < 4; w++) { const u = mod(lt * 0.3 + w / 4 + i * 0.2, 1); c.strokeStyle = `rgba(255,255,255,${(1 - u) * 0.75 * k})`; c.lineWidth = 2 * k; c.beginPath(); c.moveTo(x - 10 - u * 40 * k, y + 2 + u * 6 * k); c.quadraticCurveTo(x + 200 * k, y + 4 + u * 4 * k, W + M, y + 6 * k); c.stroke(); } }); });
    // wooden viewing deck in the foreground
    L('fg', 0.95, () => { const pts = [[-M, H], [-M, 520], [80, 512], [210, 530], [330, 560], [420, 610], [470, H]]; rockFG(pts, '#5a5650', '#2c2a28', 'rgba(255,250,235,0.4)', 56); bushes(40, -M, 300, x => 515 + Math.max(0, x - 80) * 0.2, 57, '#3d5a35', '#6d8f58', 12);
      c.fillStyle = '#7a5434'; c.fillRect(-M, 494, 360, 7); c.fillStyle = '#5e3f26'; c.fillRect(-M, 500, 360, 2); for (let k = 0; k < 7; k++) { c.fillStyle = '#6a4a2e'; c.fillRect(-60 + k * 60, 494, 7, 36); } c.fillStyle = '#7a5434'; c.fillRect(-M, 512, 360, 5); });
    D(0.95, () => actCat({ x: 180, y: 524, s: 1.05, pose: 'sit', rim: '255,255,240', look: -0.12, blink: blinkAt(lt, 5) }));
    D(0.4, () => flock(3, 700, 230, -14, 0.7, 'rgba(40,50,60,0.8)', 58, lt));
  } });

/* the "Mr. Brown" (金城武) tree: a lone broad-crowned 茄苳 whose trunk leans and whose crown reaches out to one side (left) */
function brownTree(x, y, h, seed) {
  const r = rng(seed);
  c.fillStyle = 'rgba(50,70,20,0.28)'; c.beginPath(); c.ellipse(x - h * 0.2, y + 3, h * 0.42, h * 0.035, 0, 0, TAU); c.fill();
  const bark = (x0, y0, x1, y1, cx, cy, w0, w1) => { const n = 12; c.beginPath(); for (let i = 0; i <= n; i++) { const u = i / n, px = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * cx + u * u * x1, py = (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * cy + u * u * y1; c.lineTo(px - lerp(w0, w1, u) / 2, py); }
    for (let i = n; i >= 0; i--) { const u = i / n, px = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * cx + u * u * x1, py = (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * cy + u * u * y1; c.lineTo(px + lerp(w0, w1, u) / 2, py); }
    c.closePath(); c.fillStyle = hg(x0 - w0, x0 + w0, [[0, '#6a5a48'], [0.45, '#4a3d31'], [1, '#2b231c']]); c.fill(); };
  bark(x, y, x - h * 0.06, y - h * 0.46, x + h * 0.03, y - h * 0.25, h * 0.085, h * 0.05);
  bark(x - h * 0.06, y - h * 0.44, x - h * 0.5, y - h * 0.74, x - h * 0.2, y - h * 0.58, h * 0.045, h * 0.012);
  bark(x - h * 0.06, y - h * 0.44, x - h * 0.12, y - h * 0.9, x - h * 0.02, y - h * 0.7, h * 0.04, h * 0.012);
  bark(x - h * 0.05, y - h * 0.46, x + h * 0.26, y - h * 0.78, x + h * 0.08, y - h * 0.66, h * 0.035, h * 0.01);
  // crown: leaf clusters, wider to the left; each a dark mass with sunlit dabs on top
  const C = [[-0.55, 0.74, 0.17], [-0.38, 0.86, 0.2], [-0.15, 0.95, 0.22], [0.08, 0.9, 0.2], [0.27, 0.8, 0.16], [-0.62, 0.62, 0.12], [-0.3, 0.7, 0.2], [0.0, 0.72, 0.2], [0.2, 0.66, 0.13], [-0.45, 0.6, 0.12]];
  C.forEach(([dx, dy, rr]) => { const cx = x + dx * h, cy = y - dy * h, R = rr * h; for (let k = 0; k < 160; k++) { const a = r() * TAU, d = Math.sqrt(r()) * R, px = cx + Math.cos(a) * d * 1.15, py = cy + Math.sin(a) * d * 0.8;
      oval(px, py, 3 + r() * 4, 2.5 + r() * 3, r() * 3, mix('#1b3418', '#2c5222', r())); } });
  C.forEach(([dx, dy, rr]) => { const cx = x + dx * h, cy = y - dy * h, R = rr * h; for (let k = 0; k < 420; k++) { const a = r() * TAU, d = Math.sqrt(r()) * R, px = cx + Math.cos(a) * d * 1.1, py = cy + Math.sin(a) * d * 0.75, up = clamp((cy - py) / R * 0.8 + 0.6 + (cx - px) / R * 0.15);
      if (r() < up) oval(px, py - 2, 1.6 + r() * 2.6, 1.3 + r() * 2, r() * 3, mix('#3e7228', '#a4cc58', up * r())); } });
}
/* 5 — 臺東縣 伯朗大道 — per photos: the straight road running out through the paddies to the Central Range, the lone leaning
   金城武 tree beside it, bright green-gold rice, big blue sky; mountains with low cloud on their flanks */
SCENES.push({ county: '臺東縣', place: '池上伯朗大道', en: 'Mr. Brown Avenue, Chishang', ll: '23.10°N 121.22°E', cam: [1.02, 1.07, 0, 0, 0, 0],
  sub: ['臺東的稻田，風一吹就是一片海浪。', 'In Taitung, a breeze turns the rice fields into waves.'],
  draw(lt) {
    const hz = 402, vx = 905, rd = y => (y - hz) / (566 - hz);
    L('sky', 0, () => { sky([[0, '#2f6fbf'], [0.5, '#7fb4e4'], [1, '#d8eaf4']]); cumulus(250, 240, 400, 120, 61, '#ffffff', '#bccbdd', 0.35); cumulus(760, 170, 300, 90, 62, '#ffffff', '#c3cfe0', 0.35); cumulus(1180, 260, 360, 110, 63, '#ffffff', '#bccbdd', 0.35); }, { blur: 1.2 });
    L('mtn', 0.06, () => { mountain({ base: 386, amp: 175, f: 0.0022, seed: 64, oct: 5, top: '#5f81a6', bot: '#8aa6bf', haze: 'rgba(200,220,236,0.55)' });
      stratus(380, 340, 900, 60, 'rgba(240,246,250,0.28)'); stratus(1000, 326, 800, 50, 'rgba(240,246,250,0.22)');
      mountain({ base: 398, amp: 60, f: 0.005, seed: 65, top: '#4f7a5a', bot: '#6f9670', tex: 'forest', dark: '#3e6248', mid: '#58805e', light: '#8eb084', depth: 50, n: 1100, r: 2.4, haze: 'rgba(190,215,225,0.35)' }); }, { blur: 0.8 });
    D(0.06, () => { [[300, 210, 0.9, '#e5584a', '#f7d24a'], [560, 150, 0.6, '#4b8fd1', '#f4f1e8']].forEach(([x, y, s, a, b], i) => { const yy = y - lt * 6 + Math.sin(lt + i) * 3; c.save(); c.translate(x, yy); c.scale(s, s); oval(0, 0, 26, 30, 0, a); c.save(); c.beginPath(); c.ellipse(0, 0, 26, 30, 0, 0, TAU); c.clip(); for (let k = -2; k <= 2; k += 2) oval(k * 9, 0, 4.5, 30, 0, b); c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(6, -30, 30, 60); c.restore(); line(-8, 26, -5, 40, '#333', 0.8); line(8, 26, 5, 40, '#333', 0.8); c.fillStyle = '#7a5a3a'; c.fillRect(-6, 40, 12, 9); c.restore(); }); });
    L('fields', 0.5, () => { c.fillStyle = vg(hz, H, [[0, '#9fb256'], [0.25, '#b9c447'], [0.6, '#c9c040'], [1, '#a59a2c']]); c.fillRect(-M, hz, W + 2 * M, H);
      // distant farm houses and windbreak trees along the foot of the range
      const r0 = rng(69); for (let k = 0; k < 26; k++) { const x = r0() * (W + 2 * M) - M, w = 10 + r0() * 30; if (Math.abs(x - vx) < 30) continue; oval(x, hz + 1, w, 5 + r0() * 5, 0, mix('#3f6a3e', '#5f8a4e', r0(), 0.9)); if (r0() < 0.3) { c.fillStyle = '#e8e4da'; c.fillRect(x + w * 0.4, hz - 3, 8, 4); } }
      // paddies: ridges between plots running toward the vanishing point, and across
      for (let k = -24; k <= 24; k++) { if (k === 0) continue; const xb = vx + k * 150; c.strokeStyle = 'rgba(100,110,40,0.2)'; c.lineWidth = 1; c.beginPath(); c.moveTo(vx + k * 3, hz); c.lineTo(xb, H + 40); c.stroke(); }
      for (let k = 0; k < 10; k++) { const y = hz + Math.pow(k / 10, 1.9) * (H - hz) + 2; line(-M, y, W + M, y, 'rgba(110,105,40,0.3)', 0.6 + k * 0.25); }
      const r = rng(66); for (let k = 0; k < 9000; k++) { const pr = Math.pow(r(), 1.5), y = hz + pr * (H - hz), x = r() * (W + 2 * M) - M, l = 2 + pr * 9; c.strokeStyle = r() < 0.5 ? `rgba(245,232,130,${0.25 + r() * 0.3})` : `rgba(80,110,30,${0.2 + r() * 0.3})`; c.lineWidth = 0.6 + pr; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r() - 0.5) * 2, y - l); c.stroke(); }
      // Mr. Brown Avenue itself: straight to the mountains, double yellow centre line
      c.beginPath(); c.moveTo(vx - 2, hz); c.lineTo(vx + 2, hz); c.lineTo(1050, 566); c.lineTo(765, 566); c.closePath(); c.fillStyle = vg(hz, 566, [[0, '#9a9c9c'], [1, '#6c6d6e']]); c.fill();
      c.strokeStyle = '#f0f0ea'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(vx - 1.6, hz); c.lineTo(778, 566); c.moveTo(vx + 1.6, hz); c.lineTo(1037, 566); c.stroke();
      c.strokeStyle = '#e8c23a'; c.lineWidth = 1; c.beginPath(); c.moveTo(vx - 0.4, hz); c.lineTo(903, 566); c.moveTo(vx + 0.4, hz); c.lineTo(912, 566); c.stroke();
      // the cross road the cat walks along
      c.fillStyle = vg(566, 600, [[0, '#737475'], [1, '#5c5d5f']]); c.fillRect(-M, 566, W + 2 * M, 34); line(-M, 568, W + M, 568, 'rgba(240,240,232,0.8)', 1.5); line(-M, 598, W + M, 598, 'rgba(240,240,232,0.8)', 2);
      const r3 = rng(70); for (let k = 0; k < 900; k++) disc(r3() * (W + 2 * M) - M, 566 + r3() * 34, 0.6 + r3() * 0.8, r3() < 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)');
      brownTree(1068, 524, 270, 67); });
    D(0.5, () => { c.save(); c.globalCompositeOperation = 'lighter'; for (let w = 0; w < 6; w++) { const u = mod(lt * 0.18 + w / 6, 1), y = hz + Math.pow(u, 1.6) * (H - hz); if (y > 562 && y < 602) continue; c.fillStyle = vg(y - 14 * u, y + 14 * u, [[0, 'rgba(255,240,170,0)'], [0.5, 'rgba(255,240,170,0.13)'], [1, 'rgba(255,240,170,0)']]); c.fillRect(-M, y - 20, W + 2 * M, 40); } c.restore();
      const x = 260 + lt * 30; actCat({ x, y: 582, s: 0.85, pose: 'walk', ph: walkPh(lt * 30, 0.85), look: 0.02, blink: blinkAt(lt, 6), shadowA: 0.25 }); });
    D(1, () => { grassTufts(608, 640, 120, ['#7f8f2c', '#a8b045', '#5f7426'], 68, 1.4, 26); });
  } });

/* Eluanbi lighthouse per photos: a thick, gently tapering white cylinder, gallery with railing, white lantern room and dome,
   small gabled door porch; lit warm on the sunward (left) side, lavender in shade */
function eluanbi(x, y, h) {
  const w0 = h * 0.19, w1 = h * 0.145, top = y - h;
  poly([[x - w0, y], [x - w1, top], [x + w1, top], [x + w0, y]]); c.fillStyle = hg(x - w0, x + w0, [[0, '#ffe2c4'], [0.3, '#fbeee0'], [0.62, '#d9cfd6'], [1, '#9f97ab']]); c.fill();
  for (let k = 1; k < 6; k++) line(x - lerp(w0, w1, k / 6), y - h * k / 6, x + lerp(w0, w1, k / 6), y - h * k / 6, 'rgba(120,110,130,0.18)', 1);
  [[0.35, 0], [0.62, 0.3]].forEach(([v, dx]) => { const wy = y - h * v; c.fillStyle = '#4a4656'; c.fillRect(x - 3 + dx * w0, wy - 8, 6, 12); });
  // gallery + railing
  c.fillStyle = '#e9e1df'; c.fillRect(x - w1 * 1.35, top - 4, w1 * 2.7, 6); c.fillStyle = 'rgba(120,110,130,0.5)'; c.fillRect(x - w1 * 1.35, top + 1, w1 * 2.7, 2);
  for (let k = 0; k <= 10; k++) line(x - w1 * 1.3 + k * w1 * 0.26, top - 4, x - w1 * 1.3 + k * w1 * 0.26, top - 14, 'rgba(90,85,100,0.8)', 0.8); line(x - w1 * 1.32, top - 14, x + w1 * 1.32, top - 14, 'rgba(90,85,100,0.9)', 1.2);
  // lantern room (white frame, glass) and dome
  const lw = w1 * 0.8, ly = top - 4 - h * 0.13; c.fillStyle = hg(x - lw, x + lw, [[0, '#fff0de'], [1, '#aaa2b2']]); c.fillRect(x - lw, ly, lw * 2, h * 0.13);
  c.fillStyle = 'rgba(70,80,100,0.85)'; c.fillRect(x - lw * 0.78, ly + 3, lw * 1.56, h * 0.13 - 7); for (let k = 1; k < 4; k++) line(x - lw * 0.78 + k * lw * 0.39, ly + 3, x - lw * 0.78 + k * lw * 0.39, ly + h * 0.13 - 4, '#e6dede', 1);
  c.beginPath(); c.ellipse(x, ly, lw * 1.05, h * 0.07, 0, Math.PI, TAU); c.fillStyle = hg(x - lw, x + lw, [[0, '#fbe8d6'], [1, '#9890a4']]); c.fill(); disc(x, ly - h * 0.075, 2.5, '#d8d0d4'); line(x, ly - h * 0.08, x, ly - h * 0.13, '#555', 1);
  // door porch
  const px = x - w0 * 0.25, pw = w0 * 0.55; c.fillStyle = '#efe4dc'; c.fillRect(px - pw / 2, y - h * 0.13, pw, h * 0.13); poly([[px - pw * 0.62, y - h * 0.13], [px, y - h * 0.19], [px + pw * 0.62, y - h * 0.13]], '#e4d8d2'); c.fillStyle = '#5a5262'; c.fillRect(px - pw * 0.2, y - h * 0.1, pw * 0.4, h * 0.1);
  return [x, ly + h * 0.06];
}
/* 6 — 屏東縣 鵝鑾鼻 sunset */
SCENES.push({ county: '屏東縣', place: '鵝鑾鼻燈塔', sun: lt => [420, 372 + lt * 4, 1], en: 'Eluanbi Lighthouse', ll: '21.90°N 120.85°E', cam: [1.03, 1.09, 10, -20, 0, 0],
  sub: ['屏東的最南端，燈塔替夕陽守著海。', 'At Pingtung’s southern tip, the lighthouse keeps watch as the sun sets.'],
  draw(lt) {
    const hz = 420, sx = 420, sy = 372 + lt * 4;
    L('sky', 0, () => { sky([[0, '#4c4677'], [0.35, '#c06f7c'], [0.55, '#f39a62'], [0.62, '#fcc075'], [1, '#ffd9a0']]); stratus(300, 300, 800, 40, 'rgba(255,150,120,0.5)'); stratus(900, 240, 900, 50, 'rgba(255,170,140,0.4)'); cumulus(1000, 300, 300, 50, 71, 'rgba(255,190,150,0.9)', 'rgba(150,90,110,0.9)', -0.4); }, { blur: 1.2 });
    D(0, () => { glow(sx, sy, 420, '255,170,100', 0.55); c.save(); c.beginPath(); c.rect(-M, 0, W + 2 * M, hz); c.clip(); disc(sx, sy, 30, '#ffe6b0'); glow(sx, sy, 70, '255,230,180', 0.7); c.restore(); });
    L('sea', 0.12, () => { c.fillStyle = vg(hz, H, [[0, '#d48978'], [0.35, '#7a5a78'], [1, '#2c2a45']]); c.fillRect(-M, hz, W + 2 * M, H); });
    D(0.12, () => { shimmer(hz + 2, H, 260, '255,200,140', 72, { xc: sx, spread: 300, a: 0.85, len: 30, w: 1.5, op: 'lighter' }); });
    const f = x => 470 - 120 * sm((x - 520) / 500) - fbm1(x * 0.01 + 3) * 16;
    L('cape', 0.6, () => {
      // white compound behind the ridge: arcaded building, the fort wall, flat-roofed annexes, then the tower
      const base = (x0, x1) => { let m = 0; for (let x = x0; x <= x1; x += 6) m = Math.max(m, f(x)); return m + 6; };
      const wallY = base(760, 1290) - 0;
      [[1150, 1240, 26], [1210, 1300, 20]].forEach(([x0, x1, hh]) => { const b = base(x0, x1); c.fillStyle = hg(x0, x1, [[0, '#f7e2cf'], [1, '#c8bccb']]); c.fillRect(x0, b - hh - 30, x1 - x0, hh + 30); c.fillStyle = '#e8dcd6'; c.fillRect(x0 - 3, b - hh - 33, x1 - x0 + 6, 4); });
      const bx0 = 790, bx1 = 960, bb = base(bx0, bx1), bt = Math.min(f(bx0), f(bx1)) - 40; c.fillStyle = hg(bx0, bx1, [[0, '#ffe4cc'], [1, '#d6c8cf']]); c.fillRect(bx0, bt, bx1 - bx0, bb - bt); c.fillStyle = '#f2e6de'; c.fillRect(bx0 - 4, bt - 4, bx1 - bx0 + 8, 6);
      for (let k = 0; k < 6; k++) { const ax = bx0 + 14 + k * 26; c.fillStyle = 'rgba(80,70,95,0.75)'; c.beginPath(); c.moveTo(ax, bt + 34); c.lineTo(ax, bt + 16); c.arc(ax + 8, bt + 16, 8, Math.PI, TAU); c.lineTo(ax + 16, bt + 34); c.fill(); }
      const lp = eluanbi(1012, base(990, 1034) - 10, 172);
      palm(1150, base(1140, 1160) - 4, 120, 2, '#3a4a2c'); palm(1235, base(1225, 1245) - 6, 104, 3, '#34442a');
      c.beginPath(); c.moveTo(380, H); for (let x = 380; x <= W + M; x += 4) c.lineTo(x, x < 420 ? 560 - (x - 380) * 2 : Math.min(f(x), 560)); c.lineTo(W + M, H); c.closePath();
      c.fillStyle = vg(330, H, [[0, '#b59a5c'], [0.35, '#7a7a44'], [1, '#2a2e1f']]); c.fill();
      c.save(); c.clip(); const r = rng(73); for (let k = 0; k < 2200; k++) { const x = 380 + r() * (W + M - 380), y = Math.min(f(x), 560) + Math.pow(r(), 1.6) * 260, l = 3 + r() * 6; c.strokeStyle = r() < 0.5 ? `rgba(255,196,120,${0.2 + r() * 0.22})` : `rgba(50,45,25,${0.15 + r() * 0.2})`; c.lineWidth = 1; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r() - 0.5) * 3, y - l); c.stroke(); }
        // the white fort wall running along the plateau in front of the compound
        c.restore(); const wf = x => Math.min(f(x), 560) - 12 * sm((x - 770) / 40); c.beginPath(); for (let x = 770; x <= W + M; x += 6) c.lineTo(x, wf(x)); for (let x = W + M; x >= 770; x -= 6) c.lineTo(x, Math.min(f(x), 560) + 8); c.closePath(); c.fillStyle = hg(770, 1290, [[0, '#ffe6d0'], [1, '#d9cad0']]); c.fill();
        c.strokeStyle = 'rgba(110,100,120,0.45)'; c.lineWidth = 1; c.beginPath(); for (let x = 760; x <= W + M; x += 6) c.lineTo(x, wf(x) + 3); c.stroke();
      // cliff face at the left edge, warm sunlit rock
      c.beginPath(); c.moveTo(380, H); c.lineTo(380, 560); c.lineTo(420, 480); c.lineTo(430, 520); c.lineTo(400, H); c.closePath(); c.fillStyle = vg(480, H, [[0, '#8a6448'], [1, '#2e2420']]); c.fill();
      void lp; });
    D(0.6, () => { const a = Math.max(0, Math.cos(T * 1.2)); const by = f(1012) - 172 - 26; glow(1012, by, 50, '255,240,190', 0.6); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,240,200,${0.18 * a})`; c.beginPath(); c.moveTo(1012, by); c.lineTo(1012 - 700 * Math.sin(T * 1.2 + 1.6), by - 42); c.lineTo(1012 - 700 * Math.sin(T * 1.2 + 1.6), by + 48); c.closePath(); c.fill(); c.restore();
      const x = 500 + lt * 26; actCat({ x, y: Math.min(f(x), 560) + 2, s: 0.85, pose: 'walk', ph: walkPh(lt * 26, 0.85), rim: '255,180,120', look: -0.05, shadow: false }); });
  } });

/* 7 — 高雄市 蓮池潭 龍虎塔 */
SCENES.push({ county: '高雄市', place: '蓮池潭龍虎塔', en: 'Dragon & Tiger Pagodas', ll: '22.68°N 120.29°E', cam: [1.03, 1.08, -20, 20, 0, 0],
  sub: ['高雄蓮池潭，從龍口進去，從虎口出來。', 'At Lotus Pond: in through the dragon, out through the tiger.'],
  draw(lt) {
    const hz = 430;
    const scene = () => {
      sky([[0, '#6a9cc9'], [0.55, '#c9d9df'], [1, '#f2e5c9']]); cumulus(250, 220, 340, 80, 81, '#fffaf0', '#d8cbbd', 0.3); cumulus(1080, 190, 280, 70, 82, '#fffaf0', '#d6c9bb', 0.3);
      mountain({ base: 400, amp: 50, f: 0.004, seed: 83, top: '#8fa3a8', bot: '#a7b4b2', haze: 'rgba(220,220,215,0.5)' });
      skyline(hz, 84, '#9ea6a6', '#c2c2b8', { hmin: 8, hvar: 34 });
      bushes(120, -M, W + M, () => hz - 6, 85, '#3f5a3a', '#6f8c56', 10);
      pagoda(590, hz, 290, '#e7c35a', '#c75b2c'); pagoda(710, hz, 290, '#e7c35a', '#c75b2c');
      // the giant dragon (left) and tiger (right) whose open mouths are the pagoda entrances
      lpDragon(520, hz + 4, 1); lpTiger(780, hz + 4, 1);
      // zig-zag bridges out to the mouths
      c.fillStyle = '#d8cdb8'; c.fillRect(380, hz - 4, 150, 8); c.fillRect(770, hz - 4, 160, 8); for (let k = 0; k < 14; k++) { c.fillStyle = '#c4402f'; c.fillRect(384 + k * 11, hz - 14, 2, 10); c.fillRect(774 + k * 11, hz - 14, 2, 10); } line(380, hz - 14, 530, hz - 14, '#c4402f', 2); line(770, hz - 14, 930, hz - 14, '#c4402f', 2);
    };
    L('scene', 0.3, scene);
    L('water', 0.3, () => { c.fillStyle = vg(hz, H, [[0, '#7c9c8a'], [1, '#3d5a50']]); c.fillRect(-M, hz, W + 2 * M, H); });
    R('scene', 0.3, hz, 0.5, scene, 2);
    D(0.3, () => shimmer(hz + 3, H, 200, '255,250,230', 86, { a: 0.4, len: 22 }));
    L('bridge', 0.7, () => { const seg = [[470, 470, 660, 500], [660, 500, 300, 548], [300, 548, 760, 590]]; seg.forEach(([x1, y1, x2, y2]) => { c.strokeStyle = '#8e7e6c'; c.lineWidth = 10; line(x1, y1, x2, y2, '#a89580', 10); line(x1, y1 - 12, x2, y2 - 12, '#c4402f', 2.5); for (let k = 0; k <= 12; k++) { const u = k / 12; line(lerp(x1, x2, u), lerp(y1, y2, u) - 12, lerp(x1, x2, u), lerp(y1, y2, u), '#c4402f', 2); } });
      c.fillStyle = vg(600, H, [[0, '#a99784'], [1, '#6f6050']]); c.fillRect(-M, 600, W + 2 * M, 200); for (let k = 0; k < 40; k++) line(-M + k * 40, 600, -M + k * 40, 630, '#c4402f', 2); line(-M, 600, W + M, 600, '#c4402f', 3); });
    D(0.7, () => { const x = 330 + lt * 28; actCat({ x, y: 548 + (x - 300) / 460 * 42 - 1, s: 0.6, pose: 'walk', ph: walkPh(lt * 28, 0.6), look: 0.06, blink: blinkAt(lt, 7), shadowA: 0.2 }); flock(3, 300, 230, 10, 0.6, 'rgba(50,50,60,0.8)', 87, lt); });
  } });

/* 8 — 澎湖縣 七美雙心石滬 */
SCENES.push({ county: '澎湖縣', place: '七美雙心石滬', en: 'Twin Hearts Stone Weir, Qimei', ll: '23.21°N 119.43°E', cam: [1.02, 1.1, 0, 0, -10, 10],
  sub: ['坐船到澎湖，海裡有兩顆石頭砌成的心。', 'By ferry to Penghu, where two hearts are built of stone.'],
  draw(lt) {
    const hz = 190;
    L('sky', 0, () => { sky([[0, '#4b8ac8'], [0.22, '#b8d6ea'], [0.27, '#e2ecef'], [1, '#e2ecef']]); cumulus(900, 160, 260, 40, 91, '#ffffff', '#d4dde8'); });
    L('sea', 0.3, () => { c.fillStyle = vg(hz, H, [[0, '#2c6c99'], [0.35, '#2d8fb1'], [0.7, '#4fc1c6'], [1, '#86dccf']]); c.fillRect(-M, hz, W + 2 * M, H);
      const heart = (cx, cy, s) => { const pts = []; for (let k = 0; k <= 60; k++) { const t = k / 60 * TAU, x = 16 * Math.pow(Math.sin(t), 3), y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); pts.push([cx + x * s, cy + y * s * 0.42]); } return pts; };
      [[560, 440, 9.5], [760, 470, 6.5]].forEach(([x, y, s]) => { const p = heart(x, y, s); poly(p); c.fillStyle = 'rgba(160,230,215,0.55)'; c.fill(); c.strokeStyle = '#6d6250'; c.lineWidth = 7; c.stroke(); c.strokeStyle = 'rgba(230,220,190,0.6)'; c.lineWidth = 2; c.stroke(); c.save(); c.translate(0, 3); c.strokeStyle = 'rgba(30,60,60,0.35)'; c.lineWidth = 3; poly(p); c.stroke(); c.restore(); });
      const r = rng(92); for (let k = 0; k < 60; k++) oval(r() * W, 560 + r() * 60, 4 + r() * 10, 2 + r() * 4, 0, 'rgba(60,90,80,0.35)'); });
    D(0.3, () => { shimmer(hz + 4, H, 220, '255,255,255', 93, { a: 0.5, len: 14 }); for (let k = 0; k < 5; k++) { const u = mod(lt * 0.15 + k / 5, 1), y = lerp(300, 620, u); c.strokeStyle = `rgba(255,255,255,${0.25 * Math.sin(u * Math.PI)})`; c.lineWidth = 1.5 + u * 2; c.beginPath(); for (let x = -M; x < W + M; x += 20) { const yy = y + Math.sin(x * 0.02 + k) * 4; x === -M ? c.moveTo(x, yy) : c.lineTo(x, yy); } c.stroke(); } });
    L('cliff', 0.95, () => { const pts = [[-M, H], [-M, 520], [120, 530], [260, 548], [380, 580], [430, 640], [450, H]]; poly(pts); c.fillStyle = vg(520, H, [[0, '#7ea65a'], [0.2, '#5e7f45'], [0.3, '#8b7a5e'], [1, '#4e4232']]); c.fill(); grassTufts(522, 560, 160, ['#6f9a4c', '#8db864', '#55783c'], 94, 0, 10); });
    D(0.95, () => { grassTufts(525, 545, 40, ['#9bc26b', '#76a050'], 95, 1.6, 12); actCat({ x: 230, y: 544, s: 1.0, pose: 'sit', rim: '255,255,245', look: 0.18, blink: blinkAt(lt, 8) }); });
    D(0.5, () => flock(3, 900, 280, -16, 0.7, 'rgba(250,250,250,0.9)', 96, lt));
  } });

/* 9 — 臺南市 井仔腳瓦盤鹽田 */
SCENES.push({ county: '臺南市', place: '井仔腳瓦盤鹽田', sun: lt => [680, 330 + lt * 5, 1], en: 'Jingzaijiao Tile-Paved Salt Fields', ll: '23.16°N 120.09°E', cam: [1.03, 1.08, 20, -20, 0, 0],
  sub: ['臺南的鹽田，把整片天空收了進來。', 'Tainan’s salt fields hold the whole sky.'],
  draw(lt) {
    const hz = 380, sx = 680, sy = 330 + lt * 5;
    const skyP = () => { sky([[0, '#3d2f5c'], [0.3, '#a2506a'], [0.48, '#f07a4f'], [0.53, '#ffad5e'], [0.6, '#ffcf86'], [1, '#ffcf86']]); stratus(400, 250, 900, 40, 'rgba(255,120,110,0.5)'); stratus(1000, 300, 800, 30, 'rgba(255,160,120,0.5)'); cumulus(250, 300, 320, 40, 101, 'rgba(255,160,120,0.9)', 'rgba(120,60,90,0.9)', 0.4); };
    L('sky', 0, skyP, { blur: 2 });
    D(0, () => { glow(sx, sy, 440, '255,150,80', 0.55); c.save(); c.beginPath(); c.rect(-M, 0, W + 2 * M, hz); c.clip(); disc(sx, sy, 28, '#ffe0a0'); glow(sx, sy, 70, '255,220,160', 0.7); c.restore(); });
    L('land', 0.15, () => { skyline(hz, 102, '#3a2a35', '#4a3340', { hmin: 2, hvar: 14 }); c.fillStyle = '#3a2a35'; c.fillRect(-M, hz - 2, W + 2 * M, 4); });
    L('pans', 0.4, () => { c.save(); c.beginPath(); c.rect(-M, hz, W + 2 * M, H); c.clip(); c.translate(0, 2 * hz); c.scale(1, -1); c.drawImage(getLayer('sky', skyP), -M, 0, W + 2 * M, H); c.restore();
      c.fillStyle = 'rgba(80,40,60,0.18)'; c.fillRect(-M, hz, W + 2 * M, H);
      for (let k = 1; k < 9; k++) { const y = hz + Math.pow(k / 9, 1.7) * (H - hz); line(-M, y, W + M, y, 'rgba(60,35,45,0.85)', 1 + k * 0.8); }
      for (let k = -14; k <= 14; k++) { line(640 + k * 30, hz, 640 + k * 260, H, 'rgba(60,35,45,0.7)', 1.2); }
      const r = rng(103); for (let k = 0; k < 18; k++) { const y = hz + 6 + Math.pow(r(), 1.6) * 80, x = r() * W, s = 4 + (y - hz) * 0.25; poly([[x - s, y], [x, y - s * 0.9], [x + s, y]], 'rgba(255,225,215,0.9)'); poly([[x, y - s * 0.9], [x + s, y], [x + s * 0.3, y]], 'rgba(160,110,120,0.6)'); } });
    D(0.4, () => { shimmer(hz + 2, H, 120, '255,200,150', 104, { xc: sx, spread: 220, a: 0.5, op: 'lighter' }); const x = 300 + lt * 26, y = 500;
      c.fillStyle = 'rgba(60,35,45,0.95)'; c.fillRect(-M, y, W + 2 * M, 5);
      actCat({ x, y, s: 0.85, pose: 'walk', ph: walkPh(lt * 26, 0.85), sil: true, rim: '255,170,110', shadow: false });
      c.save(); c.translate(0, 2 * y + 6); c.scale(1, -1); c.globalAlpha = 0.35; actCat({ x, y, s: 0.85, pose: 'walk', ph: walkPh(lt * 26, 0.85), sil: true, shadow: false }); c.restore(); });
  } });

/* 10 — 嘉義縣 阿里山 */
SCENES.push({ county: '嘉義縣', place: '阿里山 · 雲海日出', sun: lt => [360, 300 - lt * 6, 1], en: 'Alishan Sunrise & Sea of Clouds', ll: '23.51°N 120.80°E', cam: [1.02, 1.08, -20, 20, 0, 0],
  sub: ['嘉義的阿里山，雲海在腳下翻湧。', 'On Alishan, a sea of clouds rolls beneath its paws.'],
  draw(lt) {
    const sx = 360, sy = 300 - lt * 6;
    L('sky', 0, () => { sky([[0, '#4e6a9c'], [0.38, '#c79aa0'], [0.5, '#f5c18f'], [1, '#fff0cf']]); });
    D(0, () => { glow(sx, sy, 460, '255,200,130', 0.6); disc(sx, sy, 24, '#fff4d2'); glow(sx, sy, 60, '255,240,200', 0.8); godrays(sx, sy, 700, 26, '255,220,170', 0.08, 111, 2.6, Math.PI * 0.55); });
    L('peaks', 0.06, () => mountain({ base: 330, amp: 140, f: 0.0035, seed: 112, peak: 1.4, top: '#5f668d', bot: '#9a8fa6', haze: 'rgba(240,200,190,0.5)', rim: 'rgba(255,210,170,0.7)' }), { blur: 0.8 });
    for (let b = 0; b < 4; b++) L('cl' + b, 0.15 + b * 0.08, () => { const r = rng(113 + b); for (let k = 0; k < 14; k++) cumulus(r() * (W + 2 * M) - M, 380 + b * 30 + r() * 20, 220 + r() * 160, 50, 120 + b * 20 + k, b < 2 ? '#fff6ea' : '#fff2e4', b < 2 ? '#d6c7cf' : '#c9b9c6', -0.3); c.fillStyle = b < 2 ? '#ddd0d6' : '#cdbdc9'; c.fillRect(-M, 384 + b * 30, W + 2 * M, H); }, { blur: 3.2 - b * 0.4, dx: lt * (3 + b * 3) - 30 });
    L('ridge', 0.5, () => { const f = mountain({ base: 520, amp: 60, f: 0.004, seed: 130, top: '#2c3b37', bot: '#1d2826' }); const r = rng(131); for (let k = 0; k < 90; k++) { const x = r() * (W + 2 * M) - M, y = f(x) + 6, h = 20 + r() * 40; poly([[x - h * 0.22, y], [x, y - h], [x + h * 0.22, y]], '#1e2a27'); }
      c.fillStyle = '#2a2226'; c.fillRect(-M, 556, W + 2 * M, 4); });
    D(0.5, () => { const tx = 1100 - lt * 40; for (let k = 0; k < 3; k++) { const x = tx + k * 70; c.fillStyle = '#b83a2e'; c.fillRect(x, 528, 64, 26); c.fillStyle = '#f0dcb4'; c.fillRect(x, 540, 64, 4); c.fillStyle = '#ffd890'; for (let w = 0; w < 4; w++) c.fillRect(x + 6 + w * 15, 532, 9, 6); c.fillStyle = '#3a2a24'; c.fillRect(x - 2, 524, 68, 5); } });
    L('fg', 0.95, () => { c.fillStyle = vg(560, H, [[0, '#3b2c24'], [1, '#1a130f']]); c.fillRect(-M, 590, W + 2 * M, 200); c.fillStyle = '#4a372b'; c.fillRect(-M, 578, W + 2 * M, 12); for (let k = 0; k < 12; k++) c.fillRect(-60 + k * 130, 578, 9, 60);
      [[60, 70], [1180, 90]].forEach(([x, w]) => { c.fillStyle = hg(x - w / 2, x + w / 2, [[0, '#4a3324'], [0.4, '#6b4a33'], [1, '#24170f']]); c.fillRect(x - w / 2, 0, w, H); const r = rng(x); for (let k = 0; k < 40; k++) line(x - w / 2 + r() * w, r() * H, x - w / 2 + r() * w, r() * H + 60, 'rgba(20,10,5,0.35)', 2); }); });
    D(0.95, () => actCat({ x: 520, y: 580, s: 1.05, pose: 'sit', sil: true, rim: '255,195,140', look: -0.1, blink: blinkAt(lt, 9), shadow: false }));
  } });

/* 11 — 嘉義市 檜意森活村 */
SCENES.push({ county: '嘉義市', place: '檜意森活村', sun: () => [1150, -40, 0.5], en: 'Hinoki Village', ll: '23.48°N 120.45°E', cam: [1.03, 1.09, 20, -20, 0, 0],
  sub: ['嘉義市的老木屋，還留著檜木的香氣。', 'Chiayi’s old wooden houses still smell of cypress.'],
  draw(lt) {
    L('bg', 0, () => { sky([[0, '#9fbfcf'], [1, '#e8e2cf']]); const r = rng(141); for (let k = 0; k < 900; k++) { const x = r() * (W + 2 * M) - M, y = r() * 360, s = 6 + r() * 16; oval(x, y, s, s * 0.8, 0, mix('#3d5b35', '#9fbf6a', r() * (y < 200 ? 1 : 0.6), 0.85)); } }, { blur: 2.5 });
    L('house', 0.4, () => {
      c.fillStyle = vg(260, 530, [[0, '#5a3d2a'], [1, '#3a271b']]); c.fillRect(160, 270, 900, 260);
      for (let k = 0; k < 60; k++) line(160, 280 + k * 4.2, 1060, 280 + k * 4.2, 'rgba(25,15,8,0.35)', 0.8);
      for (let k = 0; k < 7; k++) { const x = 200 + k * 124; c.fillStyle = '#efe6d2'; c.fillRect(x, 330, 80, 110); c.strokeStyle = '#3a2618'; c.lineWidth = 3; c.strokeRect(x, 330, 80, 110); for (let q = 1; q < 4; q++) line(x, 330 + q * 27, x + 80, 330 + q * 27, '#3a2618', 1.2); line(x + 40, 330, x + 40, 440, '#3a2618', 1.5); }
      poly([[110, 278], [300, 160], [920, 160], [1110, 278]]); c.fillStyle = vg(160, 280, [[0, '#4d4f55'], [1, '#2c2d32']]); c.fill(); for (let k = 0; k < 40; k++) line(130 + k * 25, 270, 310 + k * 15.5, 165, 'rgba(15,15,18,0.45)', 1.2);
      c.fillStyle = '#6b4a33'; c.fillRect(140, 516, 940, 18); c.fillStyle = '#4a3222'; c.fillRect(140, 534, 940, 30); for (let k = 0; k < 10; k++) c.fillRect(150 + k * 100, 534, 8, 50); });
    L('ground', 0.6, () => { c.fillStyle = vg(560, H, [[0, '#b5a58a'], [1, '#857559']]); c.fillRect(-M, 562, W + 2 * M, 200); const r = rng(142); for (let k = 0; k < 900; k++) disc(r() * (W + 2 * M) - M, 565 + r() * 150, 0.6 + r() * 1.4, `rgba(${r() < 0.5 ? '255,250,230' : '60,50,40'},0.3)`); });
    D(0.6, () => { c.save(); c.globalCompositeOperation = 'multiply'; const r = rng(143); for (let k = 0; k < 30; k++) { const x = r() * W + Math.sin(T * 0.6 + k) * 6, y = 280 + r() * 330; oval(x, y, 20 + r() * 50, 8 + r() * 14, 0.3, 'rgba(90,80,110,0.35)'); } c.restore(); godrays(1150, -40, 900, 18, '255,235,190', 0.07, 144, 0.7, Math.PI * 0.68);
      const x = 230 + lt * 30; actCat({ x, y: 516, s: 0.85, pose: 'walk', ph: walkPh(lt * 30, 0.85), rim: '255,230,180', look: 0.04, blink: blinkAt(lt, 10), shadowA: 0.3 });
      const r2 = rng(145); for (let k = 0; k < 14; k++) { const x2 = mod(r2() * W + T * 30, W + 100) - 50, y2 = mod(r2() * H + T * 40, H); c.save(); c.translate(x2, y2); c.rotate(T * 2 + k); oval(0, 0, 4, 2, 0, mix('#c58a2a', '#7aa23c', r2(), 0.85)); c.restore(); } });
  } });
