/* 小貓環島記 — procedural hand-drawn animation. Deterministic: draw(ctx, t, scale). */
(function () {
const W = 1280, H = 720, DUR = 60, SCN = 7.5;
const TAU = Math.PI * 2;
const FONT = '"LXGW WenKai TC","Noto Serif TC","Noto Serif CJK TC","PingFang TC","Microsoft JhengHei",serif';
let c, BOIL = 0, T = 0;

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const sm = t => { t = clamp(t); return t * t * (3 - 2 * t); };
const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
function h1(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
const mod = (a, n) => ((a % n) + n) % n;

/* ---------- palette ---------- */
const INK = 'rgba(88,64,54,0.8)';
const FUR = '#f3b36b', FUR2 = '#e3924b', FURD = '#dc9a5a', CREAM = '#fff4e4', PINK = '#f4aaa4',
  NOSE = '#e47f7a', EYE = '#3a2c2a', SCARF = '#d95b52', PACK = '#6aa99c';

/* ---------- hand-drawn primitives ---------- */
function smoothPath(pts, closed, seed = 0, a = 1.2, sharp = false) {
  const n = pts.length;
  const q = pts.map((p, i) => [
    p[0] + (h1(seed * 7.13 + i * 3.71 + BOIL * 0.913) - 0.5) * 2 * a,
    p[1] + (h1(seed * 5.31 + i * 9.17 + BOIL * 1.371) - 0.5) * 2 * a]);
  c.beginPath();
  if (sharp) {
    c.moveTo(q[0][0], q[0][1]);
    for (let i = 1; i < n; i++) c.lineTo(q[i][0], q[i][1]);
    if (closed) c.closePath();
    return;
  }
  if (closed) {
    c.moveTo((q[n - 1][0] + q[0][0]) / 2, (q[n - 1][1] + q[0][1]) / 2);
    for (let i = 0; i < n; i++) {
      const p = q[i], nx = q[(i + 1) % n];
      c.quadraticCurveTo(p[0], p[1], (p[0] + nx[0]) / 2, (p[1] + nx[1]) / 2);
    }
    c.closePath();
  } else {
    c.moveTo(q[0][0], q[0][1]);
    if (n === 2) { c.lineTo(q[1][0], q[1][1]); return; }
    for (let i = 1; i < n - 1; i++) {
      const p = q[i], nx = q[i + 1];
      c.quadraticCurveTo(p[0], p[1], (p[0] + nx[0]) / 2, (p[1] + nx[1]) / 2);
    }
    c.lineTo(q[n - 1][0], q[n - 1][1]);
  }
}
function shape(pts, fill, o = {}) {
  const seed = o.seed || 0, a = o.wob ?? 1.2;
  c.save();
  if (o.alpha != null) c.globalAlpha *= o.alpha;
  const base = c.globalAlpha;
  if (fill) {
    smoothPath(pts, true, seed, a, o.sharp); c.fillStyle = fill; c.fill();
    if (o.wash !== false) { // watercolor second pass, slightly offset
      c.globalAlpha = base * 0.28; smoothPath(pts, true, seed + 0.61, a * 1.8, o.sharp); c.fill();
    }
  }
  if (o.ink !== false) {
    c.globalAlpha = base * (o.inkA ?? 1);
    smoothPath(pts, true, seed + 0.37, a * 1.25, o.sharp);
    c.strokeStyle = o.inkC || INK; c.lineWidth = o.lw || 1.8; c.lineJoin = 'round'; c.stroke();
  }
  c.restore();
}
function ell(cx, cy, rx, ry, n = 16, rot = 0) {
  const p = [], cr = Math.cos(rot), sr = Math.sin(rot);
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU, x = Math.cos(a) * rx, y = Math.sin(a) * ry;
    p.push([cx + x * cr - y * sr, cy + x * sr + y * cr]);
  }
  return p;
}
function rectP(x, y, w, h, step = 40) {
  const p = [], nx = Math.max(1, Math.round(w / step)), ny = Math.max(1, Math.round(h / step));
  for (let i = 0; i < nx; i++) p.push([x + w * i / nx, y]);
  for (let i = 0; i < ny; i++) p.push([x + w, y + h * i / ny]);
  for (let i = nx; i > 0; i--) p.push([x + w * i / nx, y + h]);
  for (let i = ny; i > 0; i--) p.push([x, y + h * i / ny]);
  return p;
}
function pen(pts, col = INK, lw = 1.8, seed = 0, a = 0.8) {
  c.save(); smoothPath(pts, false, seed, a);
  c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); c.restore();
}
function inkStroke(pts, col, w, seed = 0, a = 0.7) {
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  smoothPath(pts, false, seed, a); c.strokeStyle = INK; c.lineWidth = w + 3.4; c.stroke();
  smoothPath(pts, false, seed, a); c.strokeStyle = col; c.lineWidth = w; c.stroke();
  c.restore();
}
function vgrad(stops, y0 = 0, y1 = H) {
  const g = c.createLinearGradient(0, y0, 0, y1);
  stops.forEach(s => g.addColorStop(s[0], s[1]));
  c.fillStyle = g; c.fillRect(0, y0, W, y1 - y0);
}
function glow(x, y, r, rgb, a) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
  c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
}
function disc(x, y, r, col) { if (!(r > 0)) return; c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }
function label(s, x, y, size, col = '#6b4b3e', align = 'center', stroke = 'rgba(255,250,240,0.95)') {
  c.save(); c.font = `700 ${size}px ${FONT}`; c.textAlign = align; c.textBaseline = 'middle';
  c.lineJoin = 'round'; c.lineWidth = size * 0.2; c.strokeStyle = stroke; c.strokeText(s, x, y);
  c.fillStyle = col; c.fillText(s, x, y); c.restore();
}
function each(spacing, off, fn, pad = 1) {
  const k0 = Math.floor(off / spacing) - pad, k1 = Math.floor((off + W) / spacing) + pad;
  for (let k = k0; k <= k1; k++) fn(k * spacing - off, k);
}
function ridge(off, base, amp, seed, col, o = {}) {
  const pts = [], step = 32;
  const f = wx => base - amp * (0.55 * Math.sin(wx * 0.0042 + seed) + 0.3 * Math.sin(wx * 0.0105 + seed * 2.1) + 0.15 * Math.sin(wx * 0.027 + seed * 3.7));
  const g = o.peaky ? wx => base - amp * Math.pow(Math.abs(Math.sin(wx * 0.0035 + seed)), 0.7) - amp * 0.3 * Math.sin(wx * 0.013 + seed) : f;
  const x0 = -step - mod(off, step);
  for (let x = x0; x <= W + step; x += step) pts.push([x, g(x + off)]);
  pts.push([W + step, o.bottom ?? H + 10], [-step, o.bottom ?? H + 10]);
  shape(pts, col, { seed: seed * 10, wob: 1.4, inkA: o.inkA ?? 0.7, lw: o.lw || 1.6, wash: o.wash });
  return g;
}
function cloud(x, y, s, seed, col = 'rgba(255,255,255,0.92)', shadow = 'rgba(160,178,205,0.3)') {
  const pf = [[-46, 6, 22], [-22, -10, 28], [6, -20, 30], [34, -6, 24], [52, 8, 18], [0, 8, 30]];
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = shadow; smoothPath(ell(4, 18, 58, 10, 12), true, seed, 1); c.fill();
  c.fillStyle = col; c.beginPath();
  pf.forEach((p, i) => { const r = p[2] * (1 + 0.04 * Math.sin(T * 0.7 + i + seed)); c.moveTo(p[0] + r, p[1]); c.ellipse(p[0], p[1], r, r * 0.92, 0, 0, TAU); });
  c.fill();
  c.globalAlpha *= 0.35;
  pen([[-66, 12], [-50, -14], [-26, -36], [6, -48], [36, -30], [60, -10], [72, 14]], 'rgba(120,130,160,0.6)', 1.4, seed + 9, 1.2);
  c.restore();
}
function bird(x, y, s, ph, col = INK) {
  const f = Math.sin(ph);
  pen([[x - 10 * s, y - 5 * s * f - 2 * s], [x - 4 * s, y - 1.2 * s * f], [x, y], [x + 4 * s, y - 1.2 * s * f], [x + 10 * s, y - 5 * s * f - 2 * s]], col, 1.9 * s, 77, 0.3);
}
function tree(x, y, s, seed, col = '#8dbb7a', col2 = '#a8cf8e', trunk = '#9b7356') {
  const sw = Math.sin(T * 1.4 + seed) * 3 * s;
  inkStroke([[x, y], [x + sw * 0.3, y - 30 * s], [x + sw * 0.6, y - 55 * s]], trunk, 7 * s, seed);
  [[0, -78, 26], [-20, -62, 21], [20, -62, 21], [0, -56, 20]].forEach((b, i) =>
    shape(ell(x + b[0] * s + sw * (1.2 - i * 0.15), y + b[1] * s, b[2] * s, b[2] * s * 0.9, 14), i % 2 ? col : col2, { seed: seed + i, wob: 1 }));
}
function palm(x, y, s, seed) {
  const sw = Math.sin(T * 1.2 + seed) * 6;
  const top = [x + 26 * s + sw * 0.5, y - 150 * s];
  inkStroke([[x, y], [x + 14 * s, y - 70 * s], top], '#a4805f', 9 * s, seed);
  for (let k = 0; k < 6; k++) {
    const a = -Math.PI / 2 + (k - 2.5) * 0.62 + Math.sin(T * 1.6 + k + seed) * 0.08;
    const L = 70 * s;
    const m = [top[0] + Math.cos(a) * L * 0.55, top[1] + Math.sin(a) * L * 0.55 - 12 * s];
    const e = [top[0] + Math.cos(a) * L, top[1] + Math.sin(a) * L + 18 * s];
    inkStroke([top, m, e], k % 2 ? '#6f9e62' : '#82b06f', 8 * s, seed + k);
  }
  disc(top[0] - 4, top[1] + 6, 5 * s, '#8a6a46'); disc(top[0] + 5, top[1] + 8, 5 * s, '#7d5e3e');
}

/* ---------- the cat ---------- */
function catHead(st) {
  const t = st.t, look = st.look || 0, L = look * 6;
  const twitch = Math.sin(t * 0.9 + (st.seed || 0)) > 0.95 ? Math.sin(t * 55) * 0.16 : 0;
  const earBack = st.earBack || 0;
  c.save(); c.translate(-14 + L * 0.5, -18); c.rotate(-0.15 + twitch * 0.5 - earBack);
  shape([[-12, 6], [-7, -22], [9, -2]], FUR, { seed: 11, wob: 0.6 });
  shape([[-7, 2], [-5.5, -13], [4, -2]], PINK, { seed: 12, wob: 0.4, ink: false, wash: false });
  c.restore();
  c.save(); c.translate(12 + L * 0.5, -20); c.rotate(0.2 + twitch - earBack * 0.6);
  shape([[-9, -2], [7, -24], [13, 6]], FUR, { seed: 13, wob: 0.6 });
  shape([[-4, -2], [6, -15], [8, 2]], PINK, { seed: 14, wob: 0.4, ink: false, wash: false });
  c.restore();
  shape(ell(0, 0, 33, 27, 18), FUR, { seed: 15 });
  pen([[-4 + L, -26], [-3 + L, -17]], FUR2, 3.2, 16); pen([[5 + L, -26], [5 + L, -18]], FUR2, 3.2, 17);
  pen([[-13 + L, -22], [-10 + L, -15]], FUR2, 3, 18); pen([[-31, -2], [-24, -1]], FUR2, 3, 19);
  c.fillStyle = 'rgba(240,135,125,0.38)';
  c.beginPath(); c.ellipse(-18 + L * 1.1, 9, 6, 4, 0, 0, TAU); c.fill();
  c.beginPath(); c.ellipse(25 + L * 1.1, 9, 6, 4, 0, 0, TAU); c.fill();
  const ex = [-7 + L, 15 + L], ey = -2;
  if (st.blink) ex.forEach((x, i) => pen([[x - 5, ey], [x, ey + 3.4], [x + 5, ey]], EYE, 2.5, 20 + i, 0.3));
  else ex.forEach(x => {
    c.fillStyle = EYE; c.beginPath(); c.ellipse(x, ey, 5.4, 7.2, 0, 0, TAU); c.fill();
    disc(x + 1.8 + look, ey - 2.7, 2.1, '#fff'); disc(x - 1.6, ey + 2.6, 1.05, '#fff');
  });
  const mx = 4 + L * 1.15;
  shape(ell(mx, 10, 10, 6.5, 12), CREAM, { seed: 21, inkA: 0.45, lw: 1.2, wob: 0.5, wash: false });
  c.fillStyle = NOSE; c.beginPath(); c.moveTo(mx - 3.3, 5.4); c.lineTo(mx + 3.3, 5.4); c.lineTo(mx, 8.7); c.closePath(); c.fill();
  pen([[mx, 8.6], [mx, 10.6]], INK, 1.3, 22, 0.15);
  pen([[mx - 4.6, 11], [mx - 2.2, 13.2], [mx, 10.8]], INK, 1.3, 23, 0.15);
  pen([[mx, 10.8], [mx + 2.2, 13.2], [mx + 4.6, 11]], INK, 1.3, 24, 0.15);
  const ws = Math.sin(t * 2.1) * 1.2, wc = 'rgba(88,64,54,0.5)';
  for (let k = 0; k < 2; k++) {
    pen([[mx + 9, 8 + k * 4], [mx + 24, 5 + k * 7 + ws]], wc, 1, 25 + k, 0.3);
    pen([[mx - 9, 8 + k * 4], [mx - 24, 5 + k * 7 - ws]], wc, 1, 27 + k, 0.3);
  }
}
function blinkAt(t, seed = 0) { const p = mod(t + seed * 1.37, 3.3); return p < 0.13; }

function catWalk(st) {
  const p = st.p, t = st.t, stride = st.stride ?? 1;
  const bob = st.jump ? 0 : -Math.abs(Math.sin(p)) * 2.6;
  const by = -50 + bob;
  const sw = Math.sin(t * 2.4) * 0.5;
  inkStroke([[-48, by - 2], [-62, by - 12], [-68 + sw * 6, by - 30], [-62 + sw * 14, by - 46], [-51 + sw * 18, by - 52]], FUR, 10, 31);
  pen([[-66 + sw * 12, by - 40], [-60 + sw * 12, by - 38]], FUR2, 3, 39);
  const legs = [[30, Math.PI, 0], [-30, 0, 0], [22, 0, 1], [-36, Math.PI, 1]];
  legs.forEach(([hx, off, near], i) => {
    let fx, fy;
    if (st.jump) { const front = hx > 0; fx = hx + (front ? 18 : -16); fy = front ? -8 : -2; }
    else { const ph = p + off; fx = hx + Math.sin(ph) * 13 * stride; fy = -Math.max(0, Math.cos(ph)) * 8 * stride; }
    const hy = by + 12, kx = (hx + fx) / 2 + (hx > 0 ? 4 : -5), ky = (hy + fy) / 2;
    inkStroke([[hx, hy], [kx, ky], [fx, fy - 5]], near ? FUR : FURD, 11, 40 + i, 0.5);
    shape(ell(fx + 3, fy - 3, 7, 4.5, 10), near ? CREAM : '#ead8c2', { seed: 50 + i, wob: 0.4, lw: 1.4, wash: false });
  });
  const body = ell(-6, by, 48, 24, 18);
  shape(body, FUR, { seed: 32 });
  c.save(); smoothPath(body, true, 32, 1.2); c.clip(); c.fillStyle = CREAM;
  c.beginPath(); c.ellipse(2, by + 21, 36, 11, 0, 0, TAU); c.fill(); c.restore();
  [-44, -36, 12].forEach((sx, i) => pen([[sx, by - 22], [sx + 3, by - 13], [sx, by - 6]], FUR2, 4, 60 + i, 0.6));
  shape(rectP(-28, by - 36, 32, 20, 16), PACK, { seed: 63 });
  pen([[-24, by - 29], [0, by - 29]], 'rgba(255,255,255,.6)', 2, 64);
  disc(-12, by - 22, 2.4, '#f3e3a0');
  const wv = st.wind ?? 1, f = t * 9;
  inkStroke([[26, by - 12], [12, by - 16 + Math.sin(f) * 3 * wv], [0, by - 12 + Math.sin(f + 1.3) * 4 * wv], [-12, by - 18 + Math.sin(f + 2.4) * 5 * wv]], SCARF, 7, 65, 0.5);
  shape(ell(28, by - 4, 8, 13, 10, 0.35), SCARF, { seed: 66, wob: 0.5 });
  c.save(); c.translate(42, by - 30 + bob * 0.4); c.rotate((st.tilt || 0) + Math.sin(p * 2) * 0.02); catHead(st); c.restore();
}
function catSit(st) {
  const t = st.t, br = Math.sin(t * 1.8) * 0.7;
  const flick = Math.max(0, Math.sin(t * (st.tailSpeed || 2.6))) * 12;
  inkStroke([[-34, -10], [-46, -2], [-26, 3], [2, 3], [20, -1 - flick * 0.4], [28, -6 - flick]], FUR, 10, 70, 0.5);
  shape(ell(-14, -24, 28, 23, 16), FUR, { seed: 71 });
  const body = ell(2, -50 - br, 24, 34, 16, -0.12);
  shape(body, FUR, { seed: 72 });
  c.save(); smoothPath(body, true, 72, 1.2); c.clip(); c.fillStyle = CREAM;
  c.beginPath(); c.ellipse(17, -48, 12, 26, 0, 0, TAU); c.fill(); c.restore();
  pen([[-30, -38], [-23, -30]], FUR2, 4, 73); pen([[-36, -27], [-28, -21]], FUR2, 4, 74);
  shape(ell(-2, -4, 13, 5, 10), CREAM, { seed: 75, wob: 0.4, lw: 1.4, wash: false });
  shape(rectP(-26, -72 - br, 22, 26, 12), PACK, { seed: 80 });
  inkStroke([[8, -34], [10, -18], [9, -6]], FUR, 11, 76, 0.5);
  inkStroke([[19, -34], [21, -18], [21, -6]], FUR, 11, 77, 0.5);
  shape(ell(11, -4, 7, 4.5, 10), CREAM, { seed: 78, wob: 0.4, lw: 1.4, wash: false });
  shape(ell(23, -4, 7, 4.5, 10), CREAM, { seed: 79, wob: 0.4, lw: 1.4, wash: false });
  if (st.rod) st.rod();
  inkStroke([[8, -66 - br], [2, -54 + Math.sin(t * 3) * 2], [4, -42]], SCARF, 7, 82, 0.5);
  shape(ell(10, -64 - br, 15, 7, 12), SCARF, { seed: 81, wob: 0.5 });
  c.save(); c.translate(10, -92 - br); c.rotate(st.tilt || 0); catHead(st); c.restore();
}
function bike(ang) {
  const R = 27, wheels = [[-44, -28], [44, -28]];
  wheels.forEach(([x, y], i) => {
    c.save(); c.translate(x, y);
    c.strokeStyle = 'rgba(88,64,54,0.55)'; c.lineWidth = 1.2;
    for (let k = 0; k < 6; k++) { const a = ang + k * Math.PI / 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * R, Math.sin(a) * R); c.stroke(); }
    c.restore();
    c.save(); smoothPath(ell(x, y, R, R, 20), true, 90 + i, 0.6); c.strokeStyle = '#5d5560'; c.lineWidth = 5; c.stroke();
    smoothPath(ell(x, y, R + 3, R + 3, 20), true, 92 + i, 0.6); c.strokeStyle = INK; c.lineWidth = 1.3; c.stroke(); c.restore();
    disc(x, y, 3.5, '#5d5560');
  });
  const cr = [-4, -28], hd = [30, -66], st = [-18, -72], col = '#7cc4b6';
  [[[-44, -28], cr], [cr, hd], [hd, [44, -28]], [cr, st], [st, hd], [[-44, -28], st]].forEach((l, i) => inkStroke(l, col, 4.5, 95 + i, 0.4));
  inkStroke([hd, [34, -84]], col, 4.5, 102, 0.3);
  inkStroke([[27, -84], [41, -86]], '#6b5a52', 4, 103, 0.3);
  shape(ell(-19, -76, 11, 4, 10), '#6b5a52', { seed: 104, wob: 0.3 });
  shape(rectP(40, -74, 24, 17, 12), '#e2bf86', { seed: 105, wob: 0.6 });
  pen([[42, -66], [62, -66]], 'rgba(150,110,70,.7)', 1.4, 106);
  disc(46, -78, 4.5, '#f39fae'); disc(53, -80, 4.5, '#f6d36b'); disc(59, -77, 4, '#f39fae');
  const pd = a => [cr[0] + Math.cos(a) * 12, cr[1] + Math.sin(a) * 12];
  return { near: pd(ang * 1.6), far: pd(ang * 1.6 + Math.PI), seat: st, handle: [30, -84] };
}
function catRide(st, b) {
  const t = st.t, sw = Math.sin(t * 6);
  c.save(); c.translate(b.seat[0], b.seat[1] - 2);
  const loc = q => [q[0] - b.seat[0], q[1] - b.seat[1] + 2];
  const nearP = loc(b.near), farP = loc(b.far), hand = loc(b.handle);
  inkStroke([[-22, -12], [-42, -18], [-56, -14 + sw * 4], [-70, -22 + sw * 6]], FUR, 10, 110, 0.5);
  inkStroke([[2, -4], [(farP[0]) / 2 + 12, farP[1] / 2 - 6], [farP[0], farP[1] - 3]], FURD, 10, 111, 0.4);
  shape(ell(-4, -14, 24, 17, 14), FUR, { seed: 112 });
  const body = ell(12, -36, 20, 29, 16, 0.55);
  shape(body, FUR, { seed: 113 });
  c.save(); smoothPath(body, true, 113, 1.2); c.clip(); c.fillStyle = CREAM; c.beginPath(); c.ellipse(24, -30, 11, 20, 0.5, 0, TAU); c.fill(); c.restore();
  shape(rectP(-16, -50, 22, 24, 12), PACK, { seed: 114 });
  inkStroke([[2, -4], [(nearP[0]) / 2 + 12, nearP[1] / 2 - 6], [nearP[0], nearP[1] - 3]], FUR, 10, 115, 0.4);
  shape(ell(nearP[0] + 2, nearP[1] - 3, 7, 4.5, 10), CREAM, { seed: 116, wob: 0.4, lw: 1.4, wash: false });
  inkStroke([[22, -44], [hand[0] - 14, hand[1] - 18], [hand[0], hand[1] - 2]], FUR, 10, 117, 0.4);
  shape(ell(hand[0], hand[1] - 2, 6.5, 5, 10), CREAM, { seed: 118, wob: 0.4, lw: 1.4, wash: false });
  inkStroke([[22, -58], [6, -60 + sw * 3], [-8, -56 + Math.sin(t * 6 + 1) * 4], [-22, -62 + Math.sin(t * 6 + 2) * 5]], SCARF, 7, 119, 0.5);
  shape(ell(22, -52, 14, 7, 12, 0.3), SCARF, { seed: 120, wob: 0.5 });
  c.save(); c.translate(32, -74 + Math.sin(t * 6) * 0.8); catHead(st); c.restore();
  c.restore();
}

/* ---------- landmarks ---------- */
const FWC = ['255,190,140', '255,150,180', '170,210,255', '190,255,210', '230,180,255', '255,235,150'];
function t101(x, y, s, night) {
  c.save(); c.translate(x, y); c.scale(s, s);
  const g1 = night ? '#465d72' : '#93c2b7', g2 = night ? '#53697f' : '#a7d0c4';
  shape([[-58, 0], [-58, -38], [58, -38], [58, 0]], g2, { sharp: 1, seed: 201 });
  shape([[-36, -38], [-26, -120], [26, -120], [36, -38]], g1, { sharp: 1, seed: 202 });
  shape(ell(0, -84, 9, 9, 10), night ? '#c9a95f' : '#e8d39a', { seed: 203, wob: 0.4 });
  for (let k = 0; k < 8; k++) {
    const yb = -120 - k * 30, yt = yb - 30;
    const segp = [[-23, yb], [-31, yt], [31, yt], [23, yb]];
    shape(segp, k % 2 ? g1 : g2, { sharp: 1, seed: 204 + k });
    if (night) {
      const col = FWC[(k + Math.floor(T * 1.5)) % FWC.length];
      c.save(); c.globalCompositeOperation = 'lighter';
      smoothPath(segp, true, 204 + k, 1, true); c.fillStyle = `rgba(${col},0.45)`; c.fill();
      c.restore();
    } else {
      pen([[-22, yb - 10], [22, yb - 10]], 'rgba(255,255,255,.55)', 1.4, 220 + k, 0.5);
      pen([[-26, yb - 20], [26, yb - 20]], 'rgba(255,255,255,.4)', 1.4, 230 + k, 0.5);
    }
  }
  const top = -360;
  shape([[-18, top], [-15, top - 22], [15, top - 22], [18, top]], g2, { sharp: 1, seed: 240 });
  shape([[-10, top - 22], [-8, top - 38], [8, top - 38], [10, top - 22]], g1, { sharp: 1, seed: 241 });
  pen([[0, top - 38], [0, top - 92]], INK, 3, 242, 0.3);
  if (night) { c.save(); c.globalCompositeOperation = 'lighter'; glow(0, top - 92, 16, '255,120,120', 0.7 * (0.5 + 0.5 * Math.sin(T * 4))); c.restore(); }
  c.restore();
}
function lantern(x, y, r, ang, seed, lit = 1) {
  c.save(); c.translate(x, y); c.rotate(ang);
  pen([[0, -40], [0, -r * 1.1]], INK, 1.2, seed, 0.2);
  c.save(); c.globalCompositeOperation = 'lighter';
  glow(0, 0, r * 4, '255,150,80', 0.28 * lit * (0.85 + 0.15 * Math.sin(T * 9 + seed)));
  c.restore();
  shape(ell(0, 0, r, r * 1.15, 14), '#e2533f', { seed, wob: 0.5, lw: 1.4 });
  c.save(); c.globalCompositeOperation = 'lighter'; glow(0, 0, r * 0.9, '255,210,120', 0.55 * lit); c.restore();
  pen([[-r * 0.55, -r * 0.6], [-r * 0.55, r * 0.6]], 'rgba(120,30,20,.45)', 1, seed + 1, 0.2);
  pen([[r * 0.55, -r * 0.6], [r * 0.55, r * 0.6]], 'rgba(120,30,20,.45)', 1, seed + 2, 0.2);
  c.fillStyle = '#3f2b26'; c.fillRect(-r * 0.5, -r * 1.2, r, 3); c.fillRect(-r * 0.5, r * 1.1, r, 3);
  pen([[0, r * 1.2], [Math.sin(T * 2 + seed) * 2, r * 1.9]], '#e7b54b', 2.4, seed + 3, 0.2);
  c.restore();
}

/* ---------- map card ---------- */
const TW = [[121.53, 25.30], [121.75, 25.15], [121.93, 25.02], [121.85, 24.85], [121.83, 24.58], [121.70, 24.30], [121.60, 23.95], [121.50, 23.50], [121.40, 23.15], [121.20, 22.80], [120.95, 22.40], [120.88, 22.10], [120.85, 21.90], [120.72, 21.94], [120.62, 22.30], [120.42, 22.48], [120.26, 22.68], [120.13, 23.00], [120.10, 23.40], [120.20, 23.75], [120.42, 24.18], [120.70, 24.60], [120.95, 24.86], [121.12, 25.06], [121.40, 25.22]];
const LOCS = [[121.53, 25.04, '台北', 'Taipei'], [121.84, 25.11, '九份', 'Jiufen'], [121.55, 24.17, '太魯閣', 'Taroko Gorge'], [121.22, 23.10, '池上', 'Chishang'], [120.80, 21.98, '墾丁', 'Kenting'], [120.80, 23.51, '阿里山', 'Alishan'], [120.91, 23.86, '日月潭', 'Sun Moon Lake'], [121.53, 25.04, '台北', 'Taipei']];
const proj = (lon, lat) => [30 + (lon - 120.0) * 64, 22 + (25.35 - lat) * 64];
function miniCat(x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  shape([[-9, -3], [-8, -14], [-1, -7]], FUR, { seed: 301, wob: 0.3, lw: 1.2 });
  shape([[1, -7], [8, -14], [9, -3]], FUR, { seed: 302, wob: 0.3, lw: 1.2 });
  shape(ell(0, 0, 10, 8.5, 12), FUR, { seed: 303, wob: 0.3, lw: 1.2 });
  disc(-3.5, -0.5, 1.4, EYE); disc(3.5, -0.5, 1.4, EYE); disc(0, 2.4, 1, NOSE);
  c.restore();
}
function mapCard(i, lt, full) {
  const a = sm((lt - 0.2) / 0.6) * (1 - sm((lt - (full ? 6.0 : 4.6)) / 0.6));
  if (a <= 0) return;
  c.save(); c.globalAlpha *= a;
  c.translate(28 - (1 - easeOut((lt - 0.2) / 0.9)) * 50, 28);
  c.rotate(-0.02);
  c.fillStyle = 'rgba(80,60,40,0.12)'; smoothPath(rectP(6, 8, 196, 312, 50), true, 399, 2); c.fill();
  shape(rectP(0, 0, 196, 312, 50), '#fbf5e8', { seed: 400, wob: 1.5 });
  c.fillStyle = 'rgba(150,200,220,0.25)'; smoothPath(rectP(12, 12, 172, 238, 40), true, 401, 2); c.fill();
  shape(TW.map(p => proj(p[0], p[1])), '#bcd9a5', { seed: 402, wob: 1, lw: 1.5 });
  pen([proj(121.45, 24.9), proj(121.2, 24.2), proj(121.0, 23.5), proj(120.95, 22.8), proj(120.85, 22.2)], '#97bf86', 7, 403, 1);
  const pts = LOCS.slice(0, i + 1).map(p => proj(p[0], p[1]));
  const u = i === 0 ? 0 : sm((lt - 0.7) / 1.4);
  c.save(); c.setLineDash([6, 5]); c.strokeStyle = SCARF; c.lineWidth = 2.6; c.lineCap = 'round';
  c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
  for (let k = 1; k < pts.length - 1; k++) c.lineTo(pts[k][0], pts[k][1]);
  let cur = pts[0];
  if (i > 0) { const A = pts[i - 1], B = pts[i]; cur = [lerp(A[0], B[0], u), lerp(A[1], B[1], u)]; c.lineTo(cur[0], cur[1]); }
  c.stroke(); c.restore();
  LOCS.slice(0, i).forEach(p => { const q = proj(p[0], p[1]); disc(q[0], q[1], 3.6, SCARF); });
  miniCat(cur[0], cur[1] - 4 - Math.abs(Math.sin(lt * 7)) * 3 * (u > 0 && u < 1 ? 1 : 0), 1.05);
  label(LOCS[i][2], 98, 268, 30, '#6b4b3e', 'center', 'rgba(251,245,232,1)');
  c.save(); c.font = `700 14px ${FONT}`; c.textAlign = 'center'; c.fillStyle = '#9b7a62'; c.fillText(LOCS[i][3], 98, 296); c.restore();
  c.restore();
}

/* ---------- scenes ---------- */
function S0(lt) { // Taipei day
  const off = lt * 70;
  vgrad([[0, '#a8d3ea'], [0.55, '#e3f0ea'], [1, '#fbf1dc']]);
  c.save(); c.globalCompositeOperation = 'lighter'; glow(1080, 120, 170, '255,235,180', 0.55); c.restore();
  shape(ell(1080, 120, 40, 40, 16), '#fff1c4', { seed: 1, inkA: 0.4 });
  for (let k = 0; k < 4; k++) cloud(mod(k * 430 - lt * 14 + 200, W + 400) - 200, 90 + (k % 2) * 60, 0.9 + (k % 3) * 0.25, k * 10);
  ridge(off * 0.08, 400, 70, 1.3, '#bad5c5', { inkA: 0.45 });
  ridge(off * 0.15, 450, 45, 4.1, '#a2c7b0', { inkA: 0.5 });
  const po = off * 0.35;
  each(78, po, (x, k) => { const hh = 70 + h1(k * 3.1) * 120; const col = ['#e8c9b0', '#d7dccf', '#f0dcc0', '#c9d9d6'][mod(k, 4)];
    shape(rectP(x, 560 - hh, 64, hh, 32), col, { sharp: 1, seed: k * 3 + 500, inkA: 0.6 });
    for (let r = 0; r < hh / 26 - 1; r++) pen([[x + 10, 560 - hh + 16 + r * 24], [x + 54, 560 - hh + 16 + r * 24]], 'rgba(120,140,150,.35)', 4, k * 7 + r, 0.5);
  });
  t101(930 - po, 560, 1, false);
  each(110, off * 0.6, (x, k) => { const hh = 40 + h1(k * 5.7) * 50; shape(rectP(x, 580 - hh, 90, hh, 30), ['#f3d6bf', '#dfe6d8', '#f5e6c8'][mod(k, 3)], { sharp: 1, seed: k * 5 + 600, inkA: 0.6 });
    shape([[x - 4, 580 - hh], [x + 45, 580 - hh - 16], [x + 94, 580 - hh]], '#c98d76', { sharp: 1, seed: k * 5 + 601, inkA: 0.6 }); });
  c.fillStyle = '#d8d0c3'; c.fillRect(0, 580, W, 80);
  each(90, off * 0.9, (x, k) => pen([[x, 622], [x + 40, 622]], '#fff8e8', 4, k, 0.6));
  for (let s = 0; s < 2; s++) { const sx = W + 150 - mod(lt * 330 + s * 900, 1900); scooter(sx, 640 - s * 18, s); }
  shape(rectP(-20, 655, W + 40, 80, 80), '#efe3cb', { seed: 700, inkA: 0.5 });
  each(240, off, (x, k) => tree(x + 60, 676, 0.9, k * 3));
  for (let b = 0; b < 3; b++) bird(mod(900 - lt * (50 + b * 10) - b * 60, W + 200) - 100, 200 + b * 22 + Math.sin(lt * 2 + b) * 6, 1 + b * 0.1, lt * 12 + b);
  c.save(); c.translate(470, 700); c.scale(1.15, 1.15); catWalk({ p: lt * 7.2, t: lt, blink: blinkAt(lt), seed: 1, look: 0.15 }); c.restore();
  const ta = sm((lt - 0.8) / 0.8) * (1 - sm((lt - 6.3) / 0.7));
  if (ta > 0) { c.save(); c.globalAlpha = ta; const yy = 230 - easeOut((lt - 0.8) / 1) * 14;
    label('小貓環島記', 640, yy, 84, '#6b4b3e'); label('A Cat’s Journey Around Taiwan', 640, yy + 70, 26, '#9a6f55'); c.restore(); }
  mapCard(0, lt);
}
function scooter(x, y, k) {
  c.save(); c.translate(x, y);
  const col = k ? '#f1c35b' : '#87b7d8';
  disc(-26, 0, 11, '#5d5560'); disc(28, 0, 11, '#5d5560'); disc(-26, 0, 4, '#ccc'); disc(28, 0, 4, '#ccc');
  shape([[-40, -6], [-34, -30], [0, -30], [18, -12], [34, -18], [30, -50], [38, -52], [44, -12], [40, -4]], col, { seed: 800 + k, wob: 0.8 });
  shape(ell(-6, -44, 10, 16, 10), k ? '#c97b6b' : '#7b8fc9', { seed: 810 + k });
  shape(ell(-4, -66, 11, 11, 12), k ? '#f6efe0' : '#e86f5f', { seed: 820 + k });
  c.restore();
}
function S1(lt) { // Jiufen dusk
  const off = lt * 55;
  vgrad([[0, '#59609d'], [0.42, '#c3869e'], [0.72, '#f1b588'], [1, '#f5d4a4']]);
  for (let i = 0; i < 24; i++) { const a = 0.4 + 0.6 * Math.sin(T * 3 + i * 2.3); disc(h1(i * 1.3) * W, h1(i * 2.1) * 150, 1.2 + h1(i) * 1.2, `rgba(255,250,230,${0.5 * a})`); }
  c.fillStyle = '#9d8db3'; c.fillRect(0, 330, W, 160);
  for (let i = 0; i < 30; i++) { const y = 340 + h1(i * 4.1) * 130, x = mod(h1(i * 2.7) * W - off * 0.05 + Math.sin(T * 2 + i) * 6, W); pen([[x - 14, y], [x + 14, y]], `rgba(255,220,180,${0.35 + 0.3 * Math.sin(T * 4 + i)})`, 2, i, 0.3); }
  shape([[880 - off * 0.04, 345], [930 - off * 0.04, 318], [985 - off * 0.04, 345]], '#7d7aa0', { seed: 900, inkA: 0.5 });
  ridge(off * 0.12, 360, 70, 2.2, '#6b6f98', { inkA: 0.45 });
  const po = off * 0.32;
  each(70, po, (x, k) => { const y = 420 + mod(k * 37, 90); shape(rectP(x, y, 54, 40, 27), ['#8e7d97', '#a28b95', '#7f7590'][mod(k, 3)], { sharp: 1, seed: k + 1000, inkA: 0.5 });
    shape([[x - 6, y], [x + 27, y - 14], [x + 60, y]], '#55506d', { sharp: 1, seed: k + 1100, inkA: 0.5 });
    disc(x + 16, y + 18, 4, `rgba(255,214,140,${0.6 + 0.4 * Math.sin(T * 5 + k)})`); disc(x + 38, y + 18, 4, 'rgba(255,214,140,.8)'); });
  c.fillStyle = '#b29f92'; c.fillRect(0, 610, W, 110);
  each(48, off, (x, k) => pen([[x, 640 + (k % 2) * 30], [x + 40, 640 + (k % 2) * 30]], 'rgba(110,90,80,.35)', 2, k, 0.8));
  each(640, off, (x, k) => {
    shape(rectP(x, 300, 400, 312, 50), '#9a6a4f', { seed: k + 1200 });
    shape([[x - 40, 300], [x + 20, 250], [x + 380, 250], [x + 440, 300]], '#4e4658', { seed: k + 1210, wob: 1 });
    for (let w = 0; w < 4; w++) { shape(rectP(x + 30 + w * 92, 335, 60, 60, 30), `rgba(255,${200 + mod(k * 13 + w * 7, 30)},130,0.92)`, { sharp: 1, seed: k * 4 + w + 1300 }); pen([[x + 60 + w * 92, 335], [x + 60 + w * 92, 395]], '#6a4535', 2, w + k * 4); }
    shape(rectP(x + 150, 440, 100, 172, 40), '#f7c27c', { sharp: 1, seed: k + 1400 });
    c.save(); c.globalCompositeOperation = 'lighter'; glow(x + 200, 520, 120, '255,180,90', 0.3); c.restore();
    shape(rectP(x + 290, 420, 36, 120, 30), '#c94a3c', { sharp: 1, seed: k + 1500 });
    ['芋', '圓'].forEach((ch, j) => label(ch, x + 308, 455 + j * 46, 26, '#fff2c8', 'center', 'rgba(140,40,30,.6)'));
    shape(rectP(x + 30, 520, 90, 90, 30), '#7a5444', { sharp: 1, seed: k + 1600 });
    shape(ell(x + 75, 520, 22, 8, 12), '#f3efe6', { seed: k + 1610, wob: 0.5 });
    for (let s = 0; s < 3; s++) { const u = mod(T * 0.5 + s / 3, 1); c.save(); c.globalAlpha = (1 - u) * 0.6; pen([[x + 65 + s * 10, 512 - u * 10], [x + 60 + s * 10 + Math.sin(T * 3 + s) * 6, 490 - u * 60], [x + 66 + s * 10, 470 - u * 90]], '#fff', 3, s + 1620, 0.5); c.restore(); }
    for (let l = 0; l < 6; l++) lantern(x + 10 + l * 76, 345, 15, Math.sin(T * 2 + l + k) * 0.09, k * 10 + l + 1700);
    shape(rectP(x + 400, 560, 240, 50, 40), '#c9b8a8', { seed: k + 1800, inkA: 0.6 });
    for (let b = 0; b < 6; b++) pen([[x + 410 + b * 40, 562], [x + 410 + b * 40, 608]], 'rgba(110,90,80,.5)', 3, b + k * 6);
    pen([[x + 400, 300], [x + 520, 330], [x + 640, 300]], INK, 1.2, k + 1900);
    for (let l = 0; l < 2; l++) lantern(x + 470 + l * 60, 360 + (l ? 0 : 6), 12, Math.sin(T * 2.4 + l) * 0.1, k * 10 + l + 1950, 0.8);
  });
  c.save(); c.translate(560, 692); c.scale(1.1, 1.1); catWalk({ p: lt * 6.6, t: lt, blink: blinkAt(lt, 2), seed: 2, look: Math.sin(lt * 0.8) * 0.3, tilt: -0.08 }); c.restore();
  c.save(); c.globalCompositeOperation = 'lighter'; glow(640, 690, 260, '255,170,100', 0.12); c.restore();
  mapCard(1, lt);
}
function S2(lt) { // Taroko gorge
  const off = lt * 45;
  vgrad([[0, '#cfe6ef'], [0.6, '#e9f1ea'], [1, '#eef1e6']]);
  const cliff = (x0, dir, col, seed, top) => {
    const pts = []; for (let k = 0; k <= 12; k++) { const y = top + k * (720 - top) / 12; pts.push([x0 + dir * (Math.sin(k * 1.3 + seed) * 22 + k * 6), y]); }
    pts.push([dir > 0 ? -60 : W + 60, 760], [dir > 0 ? -60 : W + 60, top]);
    shape(pts, col, { seed, wob: 1.5, inkA: 0.6 });
    for (let g = 0; g < 5; g++) { const k = 1 + (g * 5) % 11; const p = pts[k]; for (let q = 0; q < 3; q++) shape(ell(p[0] + dir * (2 + q * 9), p[1] - 4 - (q % 2) * 7, 9 + q * 2, 7, 10), q % 2 ? '#8fb37a' : '#a6c78c', { seed: seed * 10 + g * 3 + q, wob: 0.8, inkA: 0.5, lw: 1.3 }); }
    for (let s = 0; s < 9; s++) { const y = top + 40 + s * 60; const xa = dir > 0 ? -20 : x0 - 60, xb = dir > 0 ? x0 - 10 : W + 20;
      pen([[xa, y], [(xa + xb) / 2, y + 14 * Math.sin(s + seed)], [xb, y + 8]], 'rgba(120,115,110,.3)', 2, seed + s, 1.5); }
  };
  ridge(off * 0.05, 330, 60, 5.2, '#c8d2cf', { inkA: 0.35, peaky: 1 });
  cliff(500 - off * 0.12, -1, '#d5d2c8', 3.3, 160); cliff(780 - off * 0.12, 1, '#d9d6cc', 7.1, 170);
  for (let m = 0; m < 3; m++) { c.save(); c.globalAlpha = 0.45; cloud(mod(m * 500 - lt * 30, W + 400) - 200, 300 + m * 50, 1.8, 50 + m, 'rgba(255,255,255,.8)', 'rgba(0,0,0,0)'); c.restore(); }
  const lx = 380 - off * 0.3;
  cliff(lx, 1, '#cfc4b2', 1.7, -40);
  cliff(lx + 640, -1, '#d6cbb8', 9.4, -40);
  const fx = lx - 60;
  for (let s = 0; s < 14; s++) { const u = mod(T * 1.6 + s / 14, 1); pen([[fx - 18 + h1(s) * 36, 270 + u * 200], [fx - 18 + h1(s) * 36, 300 + u * 220]], 'rgba(255,255,255,.85)', 3, s + 2000, 0.4); }
  c.save(); c.globalAlpha = 0.55; shape(rectP(fx - 26, 270, 52, 290, 40), '#f3f9fb', { seed: 2010, ink: false }); c.restore();
  shape(rectP(fx - 40, 230, 80, 40, 20), '#efe7d8', { seed: 2020 });
  [-30, 0, 30].forEach((d, i) => pen([[fx + d, 232], [fx + d, 268]], '#c64a3c', 4, 2030 + i));
  shape([[fx - 52, 232], [fx, 196], [fx + 52, 232]], '#4d6b5e', { sharp: 1, seed: 2040 });
  shape(rectP(fx - 44, 268, 88, 8, 30), '#9a8f80', { seed: 2050 });
  vgrad([[0, '#8fd3cf'], [1, '#5fb6b5']], 600, 720);
  for (let s = 0; s < 22; s++) { const x = mod(h1(s * 3.3) * W - T * (120 + h1(s) * 80), W + 100) - 50, y = 612 + h1(s * 7.7) * 100; pen([[x, y], [x + 30, y + 2]], 'rgba(255,255,255,.7)', 2.5, s + 2100, 0.6); }
  each(130, off, (x, k) => { inkStroke([[x, 572], [x + 65, 532], [x + 130, 572]], '#d0574b', 5, k + 2200, 0.5); pen([[x + 65, 532], [x + 65, 572]], '#b84638', 3, k + 2210); });
  pen([[-10, 572], [W + 10, 572]], '#b84638', 4, 2250);
  for (let b = 0; b < 4; b++) { const ph = lt * 1.2 + b * 1.7; const bx = mod(300 + b * 260 + Math.sin(ph) * 120 - lt * 40, W), by = 220 + Math.cos(ph * 1.3) * 60 + b * 30; bird(bx, by, 0.9, lt * 18 + b, '#3d3d50'); }
  c.save(); c.translate(560, 606); c.scale(1.05, 1.05); catWalk({ p: lt * 6.2, t: lt, blink: blinkAt(lt, 3), seed: 3, look: 0.2, tilt: Math.sin(lt * 0.7) * 0.06 }); c.restore();
  shape(rectP(-20, 600, W + 40, 18, 80), '#c8574a', { seed: 2300 });
  each(64, off, (x, k) => shape(rectP(x, 578, 6, 24, 12), '#d66658', { seed: k + 2400, wob: 0.4, lw: 1.2 }));
  pen([[-10, 580], [W + 10, 580]], '#c8574a', 4, 2450);
  for (let m = 0; m < 2; m++) { c.save(); c.globalAlpha = 0.35; cloud(mod(m * 700 + lt * 22, W + 500) - 250, 660, 2.4, 70 + m, 'rgba(255,255,255,.7)', 'rgba(0,0,0,0)'); c.restore(); }
  mapCard(2, lt);
}
function balloon(x, y, s, cols, seed, ears) {
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(T * 0.8 + seed) * 0.05);
  pen([[-14, 38], [-8, 60]], INK, 1.2, seed); pen([[14, 38], [8, 60]], INK, 1.2, seed + 1);
  shape(rectP(-10, 58, 20, 14, 10), '#b98a5c', { seed: seed + 2, wob: 0.4 });
  const env = [[0, -48], [26, -40], [38, -14], [30, 14], [14, 36], [-14, 36], [-30, 14], [-38, -14], [-26, -40]];
  if (ears) { shape([[-30, -30], [-26, -62], [-10, -44]], cols[0], { seed: seed + 3, wob: 0.5 }); shape([[10, -44], [26, -62], [30, -30]], cols[0], { seed: seed + 4, wob: 0.5 }); }
  shape(env, cols[0], { seed: seed + 5 });
  c.save(); smoothPath(env, true, seed + 5, 1.2); c.clip();
  for (let k = -2; k <= 2; k += 2) { c.fillStyle = cols[1]; c.beginPath(); c.ellipse(k * 10, -6, 6, 46, 0, 0, TAU); c.fill(); }
  c.restore();
  if (ears) { disc(-12, -8, 3.4, EYE); disc(12, -8, 3.4, EYE); disc(0, 2, 2.4, NOSE); }
  c.restore();
}
function S3(lt) { // Chishang rice fields
  const off = lt * 140;
  vgrad([[0, '#8cc6ea'], [0.5, '#d6ecf2'], [1, '#f2f6e4']]);
  for (let k = 0; k < 4; k++) cloud(mod(k * 380 - off * 0.04 - lt * 10, W + 400) - 200, 80 + (k % 2) * 50, 1.1 + (k % 2) * 0.4, k * 7 + 30);
  ridge(off * 0.04, 300, 80, 0.7, '#a6bedb', { inkA: 0.4, peaky: 1 });
  ridge(off * 0.08, 360, 45, 2.9, '#93b6a8', { inkA: 0.5 });
  balloon(260 - off * 0.06, 250 - lt * 12 + Math.sin(lt) * 4, 1.0, ['#f2a6a0', '#fff1d6'], 3000, false);
  balloon(560 - off * 0.06, 190 - lt * 9, 1.25, ['#f6c96b', '#ffffff'], 3010, true);
  balloon(920 - off * 0.06, 270 - lt * 14, 0.85, ['#8fc3e0', '#f3f0e8'], 3020, false);
  balloon(1180 - off * 0.06, 220 - lt * 11, 0.7, ['#b9a3dc', '#fff'], 3030, false);
  shape(rectP(-20, 400, W + 40, 340, 80), '#a7d07a', { seed: 3100, inkA: 0.5 });
  [430, 470, 520, 640, 700].forEach((y, i) => pen([[-10, y], [W / 2, y + 4 * Math.sin(i)], [W + 10, y]], 'rgba(110,150,80,.4)', 2, 3110 + i, 1.5));
  for (let w = 0; w < 9; w++) { const ph = mod(T * 120 + w * 190 + off * 0.7, W + 300) ; const x = W + 150 - ph, y = 420 + (w % 4) * 34; c.save(); c.globalAlpha = 0.6; pen([[x, y], [x + 50, y - 6], [x + 110, y], [x + 170, y - 5]], '#d6eca6', 6, 3120 + w, 1); c.restore(); }
  for (let e = 0; e < 3; e++) { const ex = mod(400 + e * 300 - lt * 40 - off * 0.2, W + 200) - 100; bird(ex, 380 + e * 14 + Math.sin(lt * 3 + e) * 4, 1.1, lt * 9 + e, '#ffffff'); }
  const tx = 1700 - off * 0.85;
  if (tx > -200 && tx < W + 200) { inkStroke([[tx, 560], [tx + 4, 500], [tx - 4, 470]], '#8a6a4d', 10, 3200); [[0, -150, 50], [-50, -120, 40], [50, -118, 42], [0, -105, 45]].forEach((b, i) => shape(ell(tx + b[0] + Math.sin(T * 1.3 + i) * 3, 560 + b[1], b[2], b[2] * 0.8, 14), i % 2 ? '#78a865' : '#8dbb72', { seed: 3210 + i })); }
  shape(rectP(-20, 552, W + 40, 50, 80), '#ecdcbc', { seed: 3300, inkA: 0.6 });
  each(70, off, (x, k) => pen([[x, 578], [x + 30, 578]], 'rgba(255,255,255,.8)', 3, k + 3310, 0.4));
  each(46, off * 1.25, (x, k) => { const sw = Math.sin(T * 2.4 + k * 0.6) * 6; for (let s = -2; s <= 2; s++) pen([[x + s * 4, 726], [x + s * 6 + sw, 676 - Math.abs(s) * 4]], s % 2 ? '#8ebd62' : '#a6d27a', 3, k * 5 + s + 3400, 0.6); pen([[x + sw, 678], [x + sw + 6, 668]], '#e3cf7a', 4, k + 3500, 0.3); });
  c.save(); c.translate(600, 596); c.scale(1.1, 1.1);
  const b = bike(off / 30); catRide({ t: lt, blink: blinkAt(lt, 4), seed: 4, look: 0.3 }, b); c.restore();
  mapCard(3, lt);
}
function crab(x, y, t) {
  c.save(); c.translate(x, y);
  for (let k = -1; k <= 1; k += 2) for (let l = 0; l < 3; l++) pen([[k * 8, -2], [k * (16 + l * 3), 2 + Math.sin(t * 20 + l) * 2]], '#c8533f', 2, l + k * 3);
  shape(ell(0, -4, 12, 8, 12), '#e0674f', { seed: 4000, wob: 0.4, lw: 1.3 });
  disc(-4, -13, 2, EYE); disc(4, -13, 2, EYE);
  c.restore();
}
function S4(lt) { // Kenting sunset
  vgrad([[0, '#796ea6'], [0.38, '#e598a0'], [0.68, '#f6c38b'], [1, '#fbe0a8']]);
  const sy = 320 + lt * 12;
  c.save(); c.globalCompositeOperation = 'lighter'; glow(640, sy, 260, '255,200,140', 0.5); c.restore();
  c.save(); c.beginPath(); c.rect(0, 0, W, 400); c.clip(); shape(ell(640, sy, 52, 52, 18), '#ffd88a', { seed: 4100, inkA: 0.35 }); c.restore();
  for (let k = 0; k < 3; k++) cloud(mod(k * 470 + lt * 10, W + 400) - 200, 110 + k * 50, 1.1, 4200 + k, 'rgba(255,214,200,.75)', 'rgba(170,120,150,.25)');
  vgrad([[0, '#a39cc6'], [1, '#e5bdb2']], 400, 570);
  for (let r = 0; r < 18; r++) { const y = 408 + r * 9, w = 80 - r * 2 + Math.sin(T * 3 + r) * 14; pen([[640 - w / 2 + Math.sin(T * 2 + r) * 8, y], [640 + w / 2 + Math.sin(T * 2 + r) * 8, y]], 'rgba(255,225,160,.75)', 3, r + 4300, 0.5); }
  for (let r = 0; r < 14; r++) { const y = 420 + r * 11, x = mod(h1(r * 3.1) * W + T * 25 * (r % 2 ? 1 : -1), W); pen([[x - 30, y], [x, y - 3], [x + 30, y]], 'rgba(255,255,255,.4)', 2, r + 4400, 0.5); }
  shape([[860, 570], [900, 430], [980, 390], [1100, 372], [1200, 380], [1300, 400], [1300, 570]], '#8aa77d', { seed: 4500 });
  const lx = 1110, ly = 380;
  const beamA = T * 1.4;
  c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.25 + 0.25 * Math.max(0, Math.cos(beamA));
  const bx = Math.sin(beamA) * 700; const g = c.createLinearGradient(lx, ly - 112, lx + bx, ly - 140);
  g.addColorStop(0, 'rgba(255,245,200,.8)'); g.addColorStop(1, 'rgba(255,245,200,0)'); c.fillStyle = g;
  c.beginPath(); c.moveTo(lx, ly - 112); c.lineTo(lx + bx, ly - 170); c.lineTo(lx + bx, ly - 80); c.closePath(); c.fill(); c.restore();
  shape([[lx - 20, ly], [lx - 13, ly - 100], [lx + 13, ly - 100], [lx + 20, ly]], '#fbf7f0', { sharp: 1, seed: 4600 });
  shape(rectP(lx - 15, ly - 122, 30, 22, 15), '#4d4a52', { sharp: 1, seed: 4610 });
  c.save(); c.globalCompositeOperation = 'lighter'; glow(lx, ly - 112, 40, '255,240,180', 0.7); c.restore();
  shape([[lx - 18, ly - 122], [lx, ly - 138], [lx + 18, ly - 122]], '#4d4a52', { sharp: 1, seed: 4620 });
  shape(rectP(lx - 40, ly - 8, 80, 18, 20), '#f4efe6', { seed: 4630 });
  shape(rectP(-20, 560, W + 40, 180, 80), '#f2d9b0', { seed: 4700, inkA: 0.5 });
  const pulse = Math.pow(Math.max(0, Math.sin(lt * 1.3 - 4.4)), 2);
  const ys = 568 + 104 * pulse;
  c.fillStyle = 'rgba(214,190,160,.6)'; c.fillRect(0, 562, W, Math.max(0, 568 + 104 * Math.pow(Math.max(0, Math.sin((lt - 0.4) * 1.3 - 4.4)), 2) - 560 + 8));
  const wp = []; for (let x = -40; x <= W + 40; x += 40) wp.push([x, ys + Math.sin(x * 0.02 + T * 2) * 5]);
  shape([[-40, 556], ...wp, [W + 40, 556]], 'rgba(165,205,215,0.75)', { seed: 4800, ink: false });
  pen(wp, 'rgba(255,255,255,.95)', 5, 4810, 1.2); pen(wp.map(p => [p[0] + 14, p[1] - 9]), 'rgba(255,255,255,.5)', 2.5, 4811, 1.2);
  palm(110, 650, 1.05, 1); palm(230, 610, 0.8, 2); palm(1230, 660, 0.9, 3);
  crab(860 + Math.sin(lt * 1.8) * 50, 690, lt);
  let cx, cy, st = { t: lt, seed: 5, blink: blinkAt(lt, 5) };
  c.save();
  if (lt < 2.6) { cx = lerp(-80, 600, lt / 2.6); cy = 650; c.translate(cx, cy); c.scale(1.05, 1.05); catWalk({ ...st, p: lt * 7 }); }
  else if (lt < 4.15) { c.translate(600, 650); c.scale(1.05, 1.05); catSit({ ...st, look: 0.1, tilt: -0.1 + (lt - 2.6) * 0.03 }); }
  else if (lt < 4.75) { const u = (lt - 4.15) / 0.6; c.translate(lerp(600, 520, u), lerp(650, 700, u) - Math.sin(u * Math.PI) * 80); c.scale(1.05, 1.05); c.rotate(-0.25 * Math.sin(u * Math.PI)); catWalk({ ...st, jump: 1, p: 0, look: 0.5, blink: true }); }
  else { const u = clamp((lt - 4.75) / 0.25); c.translate(520, 700 + (1 - u) * 4); c.scale(1.05, 1.05); catSit({ ...st, look: lt < 6 ? 0.4 : -0.2, tilt: lt < 6 ? 0.15 : -0.05, tailSpeed: 5 }); }
  c.restore();
  if (lt > 4.15 && lt < 5.1) for (let d = 0; d < 6; d++) { const u = (lt - 4.15) / 0.9; disc(600 + (d - 2.5) * 14 * (1 + u * 2), 660 - Math.sin(u * Math.PI) * 30 - d % 2 * 10, 3 * (1 - u), 'rgba(255,255,255,.9)'); }
  mapCard(4, lt);
}
function train(x, y, wheelA, cars, seed) {
  for (let k = 0; k < cars; k++) {
    const cx = x - k * 232;
    shape(rectP(cx - 105, y - 118, 210, 100, 40), '#c8493f', { seed: seed + k * 10 });
    shape(rectP(cx - 112, y - 132, 224, 16, 40), '#6a4c45', { seed: seed + k * 10 + 1 });
    shape(rectP(cx - 105, y - 52, 210, 12, 50), '#f3e3c4', { seed: seed + k * 10 + 2, inkA: 0.6 });
    for (let w = 0; w < 4; w++) if (!(k === 1 && w === 1)) shape(rectP(cx - 92 + w * 48, y - 104, 36, 36, 18), '#f5e6c6', { sharp: 1, seed: seed + k * 10 + 3 + w });
    [-70, 70].forEach((d, i) => { c.save(); c.translate(cx + d, y - 12); c.rotate(wheelA); disc(0, 0, 15, '#4c4249'); pen([[-12, 0], [12, 0]], '#9a8e8e', 2, i); pen([[0, -12], [0, 12]], '#9a8e8e', 2, i + 1); c.restore(); });
  }
}
function S5(lt) { // Alishan sunrise + forest train
  const off = lt * 160;
  vgrad([[0, '#9bb5d6'], [0.45, '#f1d2b8'], [0.7, '#fae4bf'], [1, '#fff3db']]);
  const sy = 320 - lt * 11;
  c.save(); c.globalCompositeOperation = 'lighter'; glow(780, sy, 300, '255,220,150', 0.6); c.restore();
  shape(ell(780, sy, 44, 44, 16), '#ffe2a0', { seed: 5000, inkA: 0.3 });
  ridge(off * 0.02, 330, 90, 1.1, '#8f97bb', { inkA: 0.4, peaky: 1 });
  for (let b = 0; b < 4; b++) {
    const y = 330 + b * 34, pts = [], o2 = lt * (10 + b * 8) + off * 0.03 * (b + 1);
    for (let x = -60; x <= W + 60; x += 60) pts.push([x, y - 14 - 12 * Math.abs(Math.sin((x + o2) * 0.012 + b))]);
    pts.push([W + 60, y + 60], [-60, y + 60]);
    shape(pts, b % 2 ? 'rgba(255,248,240,.95)' : 'rgba(252,236,226,.95)', { seed: 5100 + b, inkA: 0.3, wob: 1.6 });
  }
  const g = ridge(off * 0.2, 470, 40, 3.3, '#6f8f7e', { inkA: 0.55 });
  each(60, off * 0.2, (x, k) => { const yy = g(x + off * 0.2) + 6; shape([[x - 12, yy], [x, yy - 34 - (k % 3) * 8], [x + 12, yy]], k % 2 ? '#5c7d6b' : '#668a74', { sharp: 1, seed: k + 5200, inkA: 0.5 }); });
  shape(rectP(-20, 560, W + 40, 180, 80), '#8ea876', { seed: 5300, inkA: 0.5 });
  shape(rectP(-20, 592, W + 40, 20, 80), '#b4a28c', { seed: 5310, inkA: 0.6 });
  each(34, off, (x, k) => shape(rectP(x, 594, 20, 14, 10), '#7d6450', { sharp: 1, seed: k + 5320, wob: 0.4, lw: 1 }));
  pen([[-10, 590], [W + 10, 590]], '#5d5560', 3, 5330); pen([[-10, 600], [W + 10, 600]], '#5d5560', 3, 5331);
  const ty = 590 + Math.sin(lt * 14) * 0.8;
  for (let p = 0; p < 7; p++) { const u = mod(lt * 0.9 + p / 7, 1); c.save(); c.globalAlpha = (1 - u) * 0.85; cloud(980 - u * 520, ty - 170 - u * 70 - Math.sin(p) * 10, 0.25 + u * 0.55, 5400 + p, 'rgba(255,255,255,.95)', 'rgba(0,0,0,0)'); c.restore(); }
  shape([[920, ty - 118], [1060, ty - 118], [1090, ty - 60], [1090, ty - 18], [920, ty - 18]], '#c8493f', { seed: 5500 });
  shape(rectP(950, ty - 170, 26, 52, 13), '#4c4249', { sharp: 1, seed: 5510 });
  shape(rectP(1000, ty - 108, 50, 34, 17), '#f5e6c6', { sharp: 1, seed: 5520 });
  shape(rectP(920, ty - 52, 170, 12, 40), '#f3e3c4', { seed: 5530, inkA: 0.6 });
  disc(1084, ty - 40, 6, '#fff3b0');
  [960, 1050].forEach((d, i) => { c.save(); c.translate(d, ty - 12); c.rotate(off / 15); disc(0, 0, 15, '#4c4249'); pen([[-12, 0], [12, 0]], '#9a8e8e', 2, i); pen([[0, -12], [0, 12]], '#9a8e8e', 2, i + 1); c.restore(); });
  train(796, ty, off / 15, 3, 5600);
  shape(rectP(516, ty - 106, 48, 40, 20), '#3f3a44', { sharp: 1, seed: 5700 });
  const st = { t: lt, blink: blinkAt(lt, 6), seed: 6, look: 0.5, earBack: 0.25 + Math.sin(lt * 20) * 0.05, tilt: -0.12 + Math.sin(lt * 1.1) * 0.05 };
  c.save(); c.translate(536, ty - 62); c.scale(0.9, 0.9);
  inkStroke([[-6, -14], [-26, -18 + Math.sin(lt * 10) * 4], [-48, -14 + Math.sin(lt * 10 + 1) * 6], [-66, -20 + Math.sin(lt * 10 + 2) * 7]], SCARF, 7, 5710, 0.5);
  c.save(); c.translate(8, -22); c.rotate(st.tilt); catHead(st); c.restore();
  shape(ell(-6, 4, 8, 6, 10), CREAM, { seed: 5720, wob: 0.4, lw: 1.3 }); shape(ell(14, 5, 8, 6, 10), CREAM, { seed: 5721, wob: 0.4, lw: 1.3 });
  c.restore();
  pen([[490, ty - 66], [600, ty - 66]], '#6a4c45', 5, 5730);
  for (let p = 0; p < 16; p++) { const x = mod(h1(p * 3.7) * W * 1.3 - T * 70 - off * 0.3, W + 80) - 40, y = mod(h1(p * 5.1) * H + T * 30, H); c.save(); c.translate(x, y); c.rotate(T * 2 + p); shape(ell(0, 0, 5, 3, 8), '#f6b8c8', { seed: p + 5800, wob: 0.3, ink: false, wash: false }); c.restore(); }
  each(980, off * 1.6, (x, k) => { inkStroke([[x, 760], [x + 6, 400], [x - 4, 120]], '#6d4f3e', 60, k + 5900, 1.5); pen([[x - 10, 700], [x - 6, 300]], 'rgba(60,40,30,.35)', 3, k + 5910); shape(ell(x, 60, 180, 110, 18), '#4f7360', { seed: k + 5920 }); shape(ell(x - 90, 130, 100, 60, 16), '#5e8670', { seed: k + 5930 }); shape(ell(x + 100, 140, 110, 60, 16), '#56806a', { seed: k + 5940 }); });
  mapCard(5, lt);
}
function S6(lt) { // Sun Moon Lake
  vgrad([[0, '#b9d7e4'], [0.5, '#e6eee3'], [1, '#eeeee0']]);
  for (let k = 0; k < 3; k++) cloud(mod(k * 460 + lt * 12, W + 400) - 200, 90 + k * 30, 1, 6000 + k, 'rgba(255,255,255,.85)');
  const drawMts = () => {
    ridge(lt * 3, 330, 70, 4.4, '#a8c1c6', { inkA: 0.4, bottom: 410 });
    ridge(lt * 5, 370, 45, 6.8, '#86aa9b', { inkA: 0.5, bottom: 410 });
    shape([[900, 410], [960, 330], [1010, 300], [1060, 320], [1130, 410]], '#7a9e8c', { seed: 6100 });
    const px = 1012, py = 300;
    for (let k = 0; k < 7; k++) { const w = 18 - k * 1.8, y = py - k * 9; shape(rectP(px - w * 0.6, y - 8, w * 1.2, 8, 10), '#f0e6d2', { sharp: 1, seed: 6110 + k, wob: 0.4, lw: 1.1 }); shape([[px - w, y - 7], [px + w, y - 7], [px + w * 0.7, y - 11], [px - w * 0.7, y - 11]], '#a54b3e', { sharp: 1, seed: 6120 + k, wob: 0.3, lw: 1 }); }
    pen([[px, py - 68], [px, py - 80]], INK, 2, 6130);
  };
  drawMts();
  c.save(); c.beginPath(); c.rect(0, 410, W, 310); c.clip();
  c.translate(0, 820); c.scale(1, -1); c.globalAlpha = 0.35; drawMts(); c.restore();
  vgrad([[0, 'rgba(150,200,205,0.55)'], [1, 'rgba(120,180,185,0.85)']], 410, 720);
  shape(ell(330, 418, 50, 10, 14), '#7f9f78', { seed: 6200 }); tree(330, 414, 0.5, 6210, '#79a56c', '#8dba7c');
  for (let r = 0; r < 26; r++) { const y = 420 + r * 11 + (r * r) * 0.2, x = mod(h1(r * 2.3) * W + T * (10 + r), W + 100) - 50; pen([[x - 40, y], [x, y - 2], [x + 40, y]], 'rgba(255,255,255,.55)', 2, r + 6300, 0.6); }
  for (let s = 0; s < 14; s++) { const x = h1(s * 9.1) * W, y = 440 + h1(s * 4.2) * 260, a = Math.max(0, Math.sin(T * 4 + s * 2)); disc(x, y, 2.4 * a, `rgba(255,255,240,${a})`); }
  for (let m = 0; m < 3; m++) { c.save(); c.globalAlpha = 0.4; cloud(mod(m * 520 + lt * 18, W + 500) - 250, 400 + m * 6, 2, 6400 + m, 'rgba(255,255,255,.8)', 'rgba(0,0,0,0)'); c.restore(); }
  const bx = 360 + lt * 34, by = 560 + Math.sin(lt * 1.6) * 3, rot = Math.sin(lt * 1.3) * 0.025;
  for (let w = 0; w < 4; w++) { const u = mod(lt * 0.5 + w / 4, 1); c.save(); c.globalAlpha = (1 - u) * 0.7; pen(ell(bx - 90 - u * 120, by + 18, 30 + u * 60, 6 + u * 6, 16).slice(4, 13), '#fff', 2, w + 6500, 0.5); c.restore(); }
  const fishT = lt - 3.6, fx = bx + 230, fyb = 600;
  if (fishT > 0 && fishT < 1.1) { const u = fishT / 1.1; const x = fx - 60 + u * 120, y = fyb - Math.sin(u * Math.PI) * 120; c.save(); c.translate(x, y); c.rotate(-Math.cos(u * Math.PI) * 1.0); shape([[-22, 0], [-6, -9], [14, -6], [22, 0], [14, 6], [-6, 9]], '#f0a26a', { seed: 6600, wob: 0.5 }); shape([[-20, 0], [-32, -10], [-30, 10]], '#e98a55', { seed: 6601, wob: 0.4 }); disc(12, -1, 1.8, EYE); c.restore(); }
  [[0, fx - 60], [1.1, fx + 60]].forEach(([d, x], i) => { const u = (fishT - d) / 1.6; if (u > 0 && u < 1) { c.save(); c.globalAlpha = 1 - u; pen(ell(x, fyb, 10 + u * 60, 3 + u * 10, 18).concat([[x + 10 + u * 60, fyb]]), '#fff', 2.2, 6700 + i, 0.4); c.restore(); if (u < 0.3) for (let d2 = 0; d2 < 5; d2++) disc(x + (d2 - 2) * 8, fyb - Math.sin(u / 0.3 * Math.PI) * 26 - d2 % 2 * 8, 2.5, 'rgba(255,255,255,.9)'); } });
  c.save(); c.translate(bx, by); c.rotate(rot);
  const bobber = [190, 44 + Math.sin(lt * 2.4) * 2];
  const look = fishT > -0.2 && fishT < 2.0 ? 0.6 : 0.2;
  c.save(); c.translate(-10, 6); c.scale(0.95, 0.95);
  catSit({ t: lt, seed: 7, blink: blinkAt(lt, 7) && !(fishT > 0 && fishT < 1.3), look, tilt: fishT > 0 && fishT < 1.6 ? -0.15 : 0.05, tailSpeed: 1.6,
    rod: () => { pen([[24, -24], [120, -110]], '#8a6a4d', 3.5, 6800, 0.3); c.save(); c.strokeStyle = 'rgba(80,70,70,.55)'; c.lineWidth = 1; c.beginPath(); c.moveTo(120, -110); c.quadraticCurveTo(170, -60, (bobber[0] + 10) / 0.95, (bobber[1] - 6) / 0.95); c.stroke(); c.restore(); } });
  c.restore();
  shape([[-70, 0], [70, 0], [96, -14], [86, 6], [60, 26], [-56, 26], [-82, 8], [-90, -10]], '#b47b52', { seed: 6900 });
  pen([[-78, 4], [84, 2]], 'rgba(90,55,35,.5)', 2.5, 6910); pen([[-66, 16], [70, 14]], 'rgba(90,55,35,.4)', 2, 6911);
  disc(bobber[0], bobber[1], 5, '#e9573f'); disc(bobber[0], bobber[1] - 4, 3, '#fff');
  c.restore();
  pen(ell(bx + bobber[0], by + bobber[1] + 4, 16 + Math.sin(lt * 2.4) * 4, 3, 14), 'rgba(255,255,255,.7)', 1.5, 6920, 0.3);
  for (let d = 0; d < 2; d++) { const x = 160 + d * 900 + Math.sin(lt * 2 + d) * 30, y = 330 + Math.cos(lt * 3 + d) * 15; bird(x, y, 0.8, lt * 10 + d, '#6d7a80'); }
  mapCard(6, lt);
}
function S7(lt) { // Taipei night fireworks
  vgrad([[0, '#1d2550'], [0.6, '#3c3e72'], [1, '#6a5a7d']]);
  for (let i = 0; i < 70; i++) { const a = 0.4 + 0.6 * Math.abs(Math.sin(T * 1.7 + i * 1.9)); disc(h1(i * 1.31) * W, h1(i * 2.17) * 360, 0.8 + h1(i * 3) * 1.4, `rgba(255,250,225,${a * 0.8})`); }
  c.save(); c.globalCompositeOperation = 'lighter'; glow(1150, 90, 90, '255,245,200', 0.35); c.restore();
  disc(1150, 90, 30, '#fbf0c8'); disc(1164, 82, 27, '#1f2752');
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let b = 0; b < 12; b++) {
    const tb = 0.4 + b * 0.62 + h1(b * 3.3) * 0.25, age = lt - tb; if (age < 0 || age > 2.4) continue;
    const x = 470 + h1(b * 1.7) * 640, y = 100 + h1(b * 2.9) * 170, col = FWC[b % FWC.length], rise = 0.55;
    if (age < rise) { const u = easeOut(age / rise); const yy = lerp(560, y, u); disc(x, yy, 3, `rgba(${col},0.9)`); pen([[x, yy], [x, yy + 30]], `rgba(${col},0.4)`, 2, b); }
    else {
      const a = age - rise, R = (80 + h1(b * 5) * 70) * easeOut(a / 1.1), fade = 1 - clamp(a / 1.8);
      if (a < 0.4) glow(x, y, 160, col, 0.4 * (1 - a / 0.4));
      for (let k = 0; k < 30; k++) { const an = k / 30 * TAU + b, dy = a * a * 30; const px = x + Math.cos(an) * R, py = y + Math.sin(an) * R + dy;
        c.strokeStyle = `rgba(${col},${fade * 0.9})`; c.lineWidth = 2.4; c.lineCap = 'round'; c.beginPath(); c.moveTo(x + Math.cos(an) * R * 0.75, y + Math.sin(an) * R * 0.75 + dy * 0.8); c.lineTo(px, py); c.stroke();
        disc(px, py, 2.6 * fade + 0.4, `rgba(255,255,240,${fade})`); }
    }
  }
  c.restore();
  ridge(lt * 2, 470, 50, 2.2, '#2d335c', { inkA: 0.4, inkC: 'rgba(150,150,200,.6)' });
  each(70, 0, (x, k) => { const hh = 50 + h1(k * 3.3) * 110; shape(rectP(x, 580 - hh, 56, hh, 28), ['#3a3f68', '#434873', '#353a62'][mod(k, 3)], { sharp: 1, seed: k + 7000, inkC: 'rgba(160,160,210,.5)' });
    for (let r = 0; r < hh / 22 - 1; r++) for (let q = 0; q < 3; q++) if (h1(k * 31 + r * 7 + q) > 0.45) { const on = Math.sin(T * 0.8 + k + r * 3 + q) > -0.6; if (on) c.fillStyle = 'rgba(255,215,140,.85)', c.fillRect(x + 8 + q * 16, 580 - hh + 12 + r * 22, 8, 9); } });
  c.save(); c.globalCompositeOperation = 'lighter'; glow(780, 380, 260, '160,180,255', 0.18); c.restore();
  t101(780, 580, 1.0, true);
  c.fillStyle = '#3d3a62'; c.fillRect(0, 578, W, 30);
  for (let i = 0; i < 26; i++) { const x = h1(i * 4.4) * W; disc(x, 590 + h1(i) * 10, 2, `rgba(255,${200 + i % 40},150,${0.5 + 0.5 * Math.sin(T * 3 + i)})`); }
  shape([[-40, 740], [-40, 600], [60, 580], [200, 560], [330, 590], [470, 612], [560, 660], [620, 740]], '#4a4569', { seed: 7100, inkC: 'rgba(170,160,210,.6)' });
  shape([[380, 740], [430, 650], [520, 630], [640, 650], [720, 740]], '#544e74', { seed: 7110, inkC: 'rgba(170,160,210,.6)' });
  for (let k = 0; k < 4; k++) { const x = 20 + k * 70, sw = Math.sin(T * 1.2 + k) * 4; shape(ell(x + sw, 560 - k * 6, 40, 28, 14), '#3b4a5e', { seed: 7200 + k, inkC: 'rgba(170,160,210,.5)' }); }
  const turn = sm((lt - 3.6) / 0.5) * (1 - sm((lt - 5.6) / 0.5));
  c.save(); c.translate(470, 632); c.scale(1.15, 1.15);
  catSit({ t: lt, seed: 8, look: lerp(0.5, -0.5, turn), tilt: lerp(-0.18, 0.08, turn), blink: (lt > 4.3 && lt < 4.75) || blinkAt(lt, 8), tailSpeed: 1.4 });
  c.restore();
  const ta = sm((lt - 2.4) / 0.8);
  if (ta > 0) { c.save(); c.globalAlpha = ta; label('環島一圈，回家囉！', 760, 668, 48, '#fff6e2', 'center', 'rgba(60,55,100,0.85)'); c.restore(); }
  mapCard(7, lt, true);
}
const SCENES = [S0, S1, S2, S3, S4, S5, S6, S7];

/* ---------- compositor ---------- */
let paper = null, bufA = null, bufB = null, curS = 0;
function makePaper(S) {
  const p = document.createElement('canvas'); p.width = W * S; p.height = H * S;
  const g = p.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, p.width, p.height);
  let seed = 12345; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 40; i++) { const x = r() * p.width, y = r() * p.height, rr = (80 + r() * 260) * S; const gg = g.createRadialGradient(x, y, 0, x, y, rr); gg.addColorStop(0, `rgba(205,185,155,${0.05 + r() * 0.05})`); gg.addColorStop(1, 'rgba(205,185,155,0)'); g.fillStyle = gg; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
  for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(150,125,100,${0.04 + r() * 0.08})`; g.fillRect(r() * p.width, r() * p.height, S * (0.6 + r()), S * (0.6 + r())); }
  g.lineWidth = 0.6 * S;
  for (let i = 0; i < 700; i++) { const x = r() * p.width, y = r() * p.height, a = r() * TAU, l = (4 + r() * 12) * S; g.strokeStyle = `rgba(160,135,110,${0.05 + r() * 0.08})`; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); }
  const v = g.createRadialGradient(p.width / 2, p.height / 2, p.height * 0.45, p.width / 2, p.height / 2, p.width * 0.68);
  v.addColorStop(0, 'rgba(255,255,255,0)'); v.addColorStop(1, 'rgba(190,160,130,0.38)'); g.fillStyle = v; g.fillRect(0, 0, p.width, p.height);
  return p;
}
function buf(S) { const b = document.createElement('canvas'); b.width = W * S; b.height = H * S; return b; }
function renderScene(target, i, lt, S) {
  c = target.getContext('2d'); c.setTransform(S, 0, 0, S, 0, 0); c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  SCENES[i](lt);
}
function draw(ctx, t, S) {
  if (!paper || curS !== S) { paper = makePaper(S); bufA = buf(S); bufB = buf(S); curS = S; }
  t = clamp(t, 0, DUR - 1e-4); T = t; BOIL = Math.floor(t * 8);
  const i = Math.min(7, Math.floor(t / SCN)), lt = t - i * SCN;
  const X = 0.5;
  renderScene(bufA, i, lt, S);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(bufA, 0, 0);
  let j = -1, ljt = 0, a = 0;
  if (lt > SCN - X && i < 7) { j = i + 1; ljt = lt - SCN; a = sm((lt - (SCN - X)) / (2 * X)); }
  else if (lt < X && i > 0) { j = i - 1; ljt = lt + SCN; a = 1 - sm((lt + X) / (2 * X)); }
  if (j >= 0) { renderScene(bufB, j, ljt, S); ctx.globalAlpha = a; ctx.drawImage(bufB, 0, 0); ctx.globalAlpha = 1; }
  ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(paper, 0, 0); ctx.globalCompositeOperation = 'source-over';
  const endA = sm((t - 58.6) / 1.2), startA = 1 - sm(t / 0.6);
  const fa = Math.max(endA, startA);
  if (fa > 0) { ctx.globalAlpha = fa; ctx.fillStyle = '#f6efe2'; ctx.fillRect(0, 0, W * S, H * S); ctx.globalAlpha = 1;
    if (endA > 0.3) { c = ctx; c.setTransform(S, 0, 0, S, 0, 0); c.globalAlpha = sm((t - 58.9) / 0.6); label('The End', 640, 340, 64, '#8a6450'); label('— 下次再一起出發 —', 640, 410, 26, '#a98670'); c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; } }
}
const CHAPTERS = LOCS.map((l, i) => ({ t: i * SCN, zh: l[2], en: l[3] }));
window.CatTour = { W, H, DUR, draw, CHAPTERS };
})();
