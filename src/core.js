/* 小貓環島記 — cinematic edition. Core engine: utils, layers, camera, painting primitives, realistic cat. */
const W = 1280, H = 720, TAU = Math.PI * 2, M = 90, BAR = 92;
let c, S = 1.5, T = 0, SC = null;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const sm = t => { t = clamp(t); return t * t * (3 - 2 * t); };
const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
const mod = (a, n) => ((a % n) + n) % n;
function hash(n) { const s = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); }
function h2(x, y) { return hash(x * 157.31 + y * 113.97); }
function vn1(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u); }
function fbm1(x, o = 6) { let a = 0.5, s = 0, n = 0, f = 1; for (let k = 0; k < o; k++) { s += a * vn1(x * f + k * 17.3); n += a; a *= 0.5; f *= 2; } return s / n; }
function rng(seed) { let s = (Math.floor(seed * 9973) ^ 0x9e3779b9) >>> 0; if (!s) s = 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
const HEXC = {};
function hx(h) { if (HEXC[h]) return HEXC[h]; const n = parseInt(h.slice(1), 16); return HEXC[h] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mix(a, b, t, al = 1) { const A = hx(a), B = hx(b); return `rgba(${Math.round(lerp(A[0], B[0], t))},${Math.round(lerp(A[1], B[1], t))},${Math.round(lerp(A[2], B[2], t))},${al})`; }
function rgba(h, a) { const A = hx(h); return `rgba(${A[0]},${A[1]},${A[2]},${a})`; }

/* ---------- layers & camera ---------- */
const CACHES = {};
function mkCanvas(w, h) { const k = document.createElement('canvas'); k.width = w; k.height = h; return k; }
function camT(d) {
  const cm = SC.cam, u = SC.lt / SC.dur;
  const z = lerp(cm[0], cm[1], u), zl = 1 + (z - 1) * (0.3 + 0.7 * d);
  const ox = lerp(cm[2], cm[3], u) * (0.15 + 0.85 * d), oy = lerp(cm[4] || 0, cm[5] || 0, u) * (0.15 + 0.85 * d);
  c.translate(W / 2 + ox, H / 2 + oy); c.scale(zl, zl); c.translate(-W / 2, -H / 2);
}
function getLayer(key, painter, blur) {
  const cache = CACHES[SC.i] || (CACHES[SC.i] = {});
  let lay = cache[key];
  if (!lay) {
    lay = mkCanvas(Math.ceil((W + 2 * M) * S), Math.ceil(H * S));
    const g = lay.getContext('2d'); g.setTransform(S, 0, 0, S, M * S, 0);
    const prev = c; c = g; painter(); c = prev;
    if (blur) { const b = mkCanvas(lay.width, lay.height), bg = b.getContext('2d'); bg.filter = `blur(${blur * S}px)`; bg.drawImage(lay, 0, 0); lay = b; }
    cache[key] = lay;
  }
  return lay;
}
function L(key, d, painter, o = {}) {
  const lay = getLayer(key, painter, o.blur);
  c.save(); camT(d);
  if (o.dx) c.translate(o.dx, o.dy || 0);
  if (o.alpha != null) c.globalAlpha *= o.alpha;
  if (o.op) c.globalCompositeOperation = o.op;
  c.drawImage(lay, -M, 0, W + 2 * M, H); c.restore();
}
/* mirrored reflection of a cached layer about horizon y */
function R(key, d, axis, alpha, painter, blur = 2, o = {}) {
  const lay = getLayer(key + '#r', () => { const src = getLayer(key, painter); c.drawImage(src, -M, 0, W + 2 * M, H); }, blur);
  c.save(); camT(d);
  c.beginPath(); c.rect(-M, axis, W + 2 * M, H - axis); c.clip();
  c.translate(0, 2 * axis + (o.shift || 0)); c.scale(1, -1);
  c.globalAlpha *= alpha;
  if (typeof GLX !== 'undefined' && GLX.ok && o.ripple !== 0) { const [g, sx, sy, sw, sh] = GLX.ripple(lay, axis, T, o.ripple ?? 1); c.drawImage(g, sx, sy, sw, sh, -M, 0, W + 2 * M, H); }
  else c.drawImage(lay, -M, 0, W + 2 * M, H);
  c.restore();
}
function D(d, fn) { c.save(); camT(d); fn(); c.restore(); }

/* ---------- painting primitives ---------- */
function vg(y0, y1, stops) { const g = c.createLinearGradient(0, y0, 0, y1); stops.forEach(s => g.addColorStop(s[0], s[1])); return g; }
function hg(x0, x1, stops) { const g = c.createLinearGradient(x0, 0, x1, 0); stops.forEach(s => g.addColorStop(s[0], s[1])); return g; }
function sky(stops, y0 = 0, y1 = H) { c.fillStyle = vg(y0, y1, stops); c.fillRect(-M, 0, W + 2 * M, H); }
function glow(x, y, r, rgb, a, op = 'lighter') {
  c.save(); c.globalCompositeOperation = op;
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(0.35, `rgba(${rgb},${a * 0.35})`); g.addColorStop(1, `rgba(${rgb},0)`);
  c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore();
}
function disc(x, y, r, col) { if (!(r > 0)) return; c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }
function oval(x, y, rx, ry, rot, col) { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), rot || 0, 0, TAU); c.fill(); }
function poly(pts, col) { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); if (col) { c.fillStyle = col; c.fill(); } }
function smoothClosed(pts) {
  const n = pts.length; c.beginPath();
  c.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2);
  for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); }
  c.closePath();
}
function smoothOpen(pts) {
  c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) { const p = pts[i], q = pts[i + 1]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); }
  const l = pts[pts.length - 1]; c.lineTo(l[0], l[1]);
}
function line(x1, y1, x2, y2, col, w) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
function ridgeFn(o) { return x => { let n = fbm1(x * o.f + o.seed * 31.7, o.oct || 6); if (o.peak) n = Math.pow(n, o.peak); if (o.shape) n = o.shape(x, n); return o.base - o.amp * n; }; }
/* mountain silhouette with gradient fill, texture, rim light */
function mountain(o) {
  const f = o.fn || ridgeFn(o); const pts = [];
  for (let x = -M; x <= W + M; x += 3) pts.push([x, f(x)]);
  const ymin = Math.min(...pts.map(p => p[1])); if (o.base == null) o.base = Math.max(...pts.map(p => p[1])) - 20;
  c.beginPath(); c.moveTo(-M, o.floor ?? H); pts.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(W + M, o.floor ?? H); c.closePath();
  c.fillStyle = vg(ymin, o.bottom || (o.base + 40), [[0, o.top], [1, o.bot]]); c.fill();
  c.save(); c.clip();
  const r = rng(o.seed + 7);
  if (o.tex === 'forest' || o.tex === 'mixed') {
    const n = o.n || 2600;
    for (let k = 0; k < n; k++) {
      const x = r() * (W + 2 * M) - M, ry = f(x), y = ry + Math.pow(r(), 1.3) * (o.depth || 160);
      const rad = (o.r || 4) * (0.5 + r()) * (0.6 + 0.6 * (y - ry) / (o.depth || 160));
      const sh = r();
      oval(x, y, rad, rad * 1.15, 0, mix(o.dark, o.mid, sh * 0.8, 0.75));
      oval(x + (o.lx || 0.3) * rad, y - rad * 0.35, rad * 0.62, rad * 0.62, 0, mix(o.mid, o.light, r() * 0.9, 0.55));
    }
  }
  if (o.tex === 'rock' || o.tex === 'mixed') {
    for (let k = 0; k < (o.rn || 900); k++) {
      const x = r() * (W + 2 * M) - M, y = f(x) + r() * (o.depth || 200), len = 4 + r() * 18, a = 1.2 + r() * 0.6;
      c.strokeStyle = r() < 0.5 ? rgba(o.light || '#ffffff', 0.08 + r() * 0.1) : rgba(o.dark || '#000000', 0.08 + r() * 0.12);
      c.lineWidth = 0.8 + r() * 1.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * len * (o.lean || 0.6), y + Math.sin(a) * len); c.stroke();
    }
  }
  if (o.haze) { c.fillStyle = vg(ymin, o.bottom || o.base + 40, [[0, 'rgba(0,0,0,0)'], [1, o.haze]]); c.fillRect(-M, ymin, W + 2 * M, H); }
  c.restore();
  if (o.rim) { c.save(); c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1] + 0.6) : c.moveTo(p[0], p[1] + 0.6)); c.strokeStyle = o.rim; c.lineWidth = o.rimW || 1.4; c.stroke(); c.restore(); }
  return f;
}
function toA(col, a) { if (col[0] === '#') return rgba(col, a); const m = col.match(/rgba?\(([^)]+)\)/); const p = m[1].split(',').slice(0, 3).join(','); return `rgba(${p},${a})`; }
function cumulus(x, y, w, h, seed, lit, shade, sunDx = 0.3) {
  const r = rng(seed), P = [];
  for (let k = 0; k < 56; k++) {
    const px = x + (r() - 0.5) * w * 0.95, edge = Math.max(0, 1 - Math.pow(Math.abs(px - x) / (w * 0.52), 2));
    P.push([px, y - r() * h * 0.85 * Math.max(0.1, edge), h * (0.13 + r() * 0.22) * (0.45 + 0.55 * edge)]);
  }
  P.sort((p, q) => q[1] - p[1]);
  c.fillStyle = shade; c.beginPath(); P.forEach(([px, py, pr]) => { c.moveTo(px + pr, py); c.arc(px, py, pr, 0, TAU); }); c.fill();
  const l0 = toA(lit, 0);
  P.forEach(([px, py, pr]) => { const cx = px + sunDx * pr * 0.35, cy = py - pr * 0.38, g = c.createRadialGradient(cx, cy, 0, cx, cy, pr * 0.95);
    g.addColorStop(0, lit); g.addColorStop(0.5, toA(lit, 0.75)); g.addColorStop(1, l0); c.fillStyle = g; c.beginPath(); c.arc(cx, cy, pr * 0.95, 0, TAU); c.fill(); });
}
function stratus(x, y, w, h, col) { const g = c.createRadialGradient(x, y, 0, x, y, w / 2); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.save(); c.translate(x, y); c.scale(1, h / w); c.translate(-x, -y); c.fillStyle = g; c.fillRect(x - w / 2, y - w / 2, w, w); c.restore(); }
function stars(n, seed, ymax, a = 1) { const r = rng(seed); for (let k = 0; k < n; k++) { const x = r() * (W + 2 * M) - M, y = r() * ymax, s = r(); disc(x, y, 0.4 + s * s * 1.3, `rgba(255,250,235,${(0.25 + 0.75 * s) * a})`); } }
function godrays(x, y, len, n, rgb, a, seed, spread = 1.2, base = Math.PI / 2) {
  const r = rng(seed); c.save(); c.globalCompositeOperation = 'lighter';
  for (let k = 0; k < n; k++) {
    const ang = base + (r() - 0.5) * spread, wdt = 0.01 + r() * 0.04, L2 = len * (0.6 + r() * 0.4);
    const g = c.createLinearGradient(x, y, x + Math.cos(ang) * L2, y + Math.sin(ang) * L2);
    g.addColorStop(0, `rgba(${rgb},${a * (0.4 + r() * 0.6)})`); g.addColorStop(1, `rgba(${rgb},0)`);
    c.fillStyle = g; c.beginPath(); c.moveTo(x, y);
    c.lineTo(x + Math.cos(ang - wdt) * L2, y + Math.sin(ang - wdt) * L2); c.lineTo(x + Math.cos(ang + wdt) * L2, y + Math.sin(ang + wdt) * L2); c.closePath(); c.fill();
  }
  c.restore();
}
function shimmer(y0, y1, n, rgb, seed, o = {}) {
  const r = rng(seed); c.save(); c.lineCap = 'round';
  if (o.op) c.globalCompositeOperation = o.op;
  for (let k = 0; k < n; k++) {
    const pr = Math.pow(r(), o.pow || 1.4), y = y0 + pr * (y1 - y0), len = (o.len || 18) * (0.3 + r()) * (0.35 + pr);
    const x = (o.xc != null ? o.xc + (r() - 0.5) * (o.spread || 200) * (0.4 + pr) : r() * (W + 2 * M) - M) + Math.sin(T * (o.sp || 0.8) * (1 + r()) + k) * 8 * (0.3 + pr);
    const a = Math.max(0, Math.sin(T * (o.tw || 2.2) * (0.5 + r()) + k * 1.7));
    c.strokeStyle = `rgba(${rgb},${a * (o.a || 0.5)})`; c.lineWidth = (o.w || 1.2) * (0.6 + pr * 1.4);
    c.beginPath(); c.moveTo(x - len / 2, y); c.lineTo(x + len / 2, y); c.stroke();
  }
  c.restore();
}
function bird(x, y, s, ph, col) {
  const f = Math.sin(ph); c.fillStyle = col; c.beginPath();
  c.moveTo(x - 12 * s, y - 7 * s * f); c.quadraticCurveTo(x - 5 * s, y - 2 * s - 4 * s * f, x, y);
  c.quadraticCurveTo(x + 5 * s, y - 2 * s - 4 * s * f, x + 12 * s, y - 7 * s * f);
  c.quadraticCurveTo(x + 5 * s, y + 0.6 * s - 2 * s * f, x, y + 2 * s);
  c.quadraticCurveTo(x - 5 * s, y + 0.6 * s - 2 * s * f, x - 12 * s, y - 7 * s * f); c.fill();
}
function flock(n, x0, y0, vx, s, col, seed, lt) {
  const r = rng(seed);
  for (let k = 0; k < n; k++) { const ox = (r() - 0.5) * 160, oy = (r() - 0.5) * 60; bird(x0 + ox + lt * vx + Math.sin(lt * 0.7 + k) * 6, y0 + oy + Math.sin(lt * 1.3 + k * 2) * 5, s * (0.7 + r() * 0.5), lt * (9 + r() * 4) + k, col); }
}
function grassTufts(y0, y1, n, cols, seed, wind = 1, h = 14) {
  const r = rng(seed); c.save(); c.lineCap = 'round';
  for (let k = 0; k < n; k++) {
    const x = r() * (W + 2 * M) - M, pr = r(), y = y0 + pr * (y1 - y0), hh = h * (0.5 + r()) * (0.6 + pr), sw = Math.sin(T * 1.8 + x * 0.02) * 3 * wind * (hh / h);
    c.strokeStyle = cols[Math.floor(r() * cols.length)]; c.lineWidth = 0.8 + pr * 1.4;
    c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + sw * 0.3, y - hh * 0.6, x + sw + (r() - 0.5) * 4, y - hh); c.stroke();
  }
  c.restore();
}

/* ---------- realistic tabby cat ---------- */
const CATP = { base: '#c8894f', light: '#f2c792', dark: '#6b4024', belly: '#f1e1c6', stripe: '#5a3318', eye: '#cfa43c', ear: '#c98f86', nose: '#b9736c' };
const SILP = { base: '#2c201b', light: '#3d2d25', dark: '#1e1512', belly: '#34261f', stripe: null, eye: '#e0ae4a', ear: '#3a2a24', nose: '#2c201b' };
function ik(P, Q, a, b, bend) {
  const dx = Q[0] - P[0], dy = Q[1] - P[1]; let d = Math.hypot(dx, dy); d = Math.max(0.01, Math.min(d, a + b - 0.01));
  const ang = Math.atan2(dy, dx), A = Math.acos(clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1));
  const t = ang - bend * A; return [P[0] + Math.cos(t) * a, P[1] + Math.sin(t) * a];
}
function limb(pts, widths, col) {
  c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = col;
  for (let k = 0; k < pts.length - 1; k++) { c.lineWidth = widths[k]; c.beginPath(); c.moveTo(pts[k][0], pts[k][1]); c.lineTo(pts[k + 1][0], pts[k + 1][1]); c.stroke(); }
}
function shadeBody(pts, P, y0, y1, stripes, o) {
  smoothClosed(pts); c.fillStyle = vg(y0, y1, [[0, P.light], [0.38, P.base], [1, P.dark]]); c.fill();
  c.save(); smoothClosed(pts); c.clip();
  if (o.belly) oval(o.belly[0], o.belly[1], o.belly[2], o.belly[3], o.belly[4] || 0, rgba(P.belly, 0.75));
  if (P.stripe && stripes) {
    c.lineCap = 'round';
    stripes.forEach(s => { [[6, 0.14], [4, 0.2], [2.2, 0.28]].forEach(([w, a]) => { c.strokeStyle = rgba(P.stripe, a); c.lineWidth = w * (s[1] || 1); smoothOpen(s[0]); c.stroke(); }); });
  }
  if (o.lightSide) { const g = c.createLinearGradient(o.lightSide[0], 0, o.lightSide[1], 0); g.addColorStop(0, 'rgba(255,230,190,0)'); g.addColorStop(1, 'rgba(255,230,190,0.22)'); c.fillStyle = g; c.fillRect(-80, -140, 200, 160); }
  c.restore();
}
function rimLine(pts, rim, w = 1.6) { if (!rim) return; c.save(); c.globalCompositeOperation = 'lighter'; smoothOpen(pts); c.strokeStyle = `rgba(${rim},0.85)`; c.lineWidth = w; c.lineCap = 'round'; c.stroke(); c.restore(); }
function catHead(P, o) {
  const rim = o.rim;
  poly([[-8, -8], [1, -11], [-6, -22]], P.dark);
  const head = [[-13, -2], [-11, -9], [-3, -13], [6, -12], [12, -7], [15.5, -3], [16.5, 0.5], [14.5, 3.5], [9, 6.5], [0, 8], [-8, 6], [-13, 2]];
  shadeBody(head, P, -13, 8, [[[[-4, -12], [-3, -8]], 0.35], [[[0, -12.5], [1, -8.5]], 0.35], [[[-5, -12.5], [-7, -9]], 0.3], [[[-9, -1], [-3, 0], [1, -1]], 0.35], [[[-10, 3], [-4, 4]], 0.3]], { belly: [2, 5, 10, 4.5, 0] });
  oval(12, 2.4, 4.8, 3.4, 0, rgba(P.belly, 0.75));
  c.save(); poly([[-5, -10], [5, -11.5], [-0.5, -23]], P.base); c.fill(); if (P.stripe) poly([[-3, -11], [3, -11.8], [-0.4, -20]], rgba(P.ear, 0.75)); c.restore();
  if (o.blink) { c.strokeStyle = '#2a1a12'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(3, -4); c.quadraticCurveTo(6.5, -2.4, 10, -4.2); c.stroke(); }
  else {
    c.save(); c.translate(6.6, -4.2); c.rotate(-0.12);
    oval(0, 0, 3.6, 2.5, 0, P.eye); oval(0.6, 0, 0.9, 2.3, 0, '#120c08');
    c.strokeStyle = 'rgba(30,18,10,0.9)'; c.lineWidth = 0.9; c.beginPath(); c.ellipse(0, 0, 3.6, 2.5, 0, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
    disc(1.5, -1, 0.75, 'rgba(255,255,255,0.95)'); c.restore();
  }
  poly([[15.2, -1.6], [17, -0.6], [16, 1]], P.nose);
  c.strokeStyle = 'rgba(40,24,16,0.6)'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(16, 1.2); c.quadraticCurveTo(14.5, 3.5, 11.5, 4); c.stroke();
  c.strokeStyle = o.sil ? 'rgba(255,220,180,0.35)' : 'rgba(255,250,240,0.6)'; c.lineWidth = 0.45;
  for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(12.5, 2 + k * 0.7); c.quadraticCurveTo(20, 0 + k * 1.6, 28, -2 + k * 3.2 + Math.sin(T * 1.5) * 0.4); c.stroke(); }
  rimLine([[-13, -2], [-11, -9], [-3, -13], [6, -12], [12, -7], [15.5, -3]], rim, 1.3);
  rimLine([[-5, -10], [-0.5, -23], [5, -11.5]], rim, 1.1);
}
function catShadow(rx, a = 0.35) { const g = c.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, `rgba(20,12,8,${a})`); g.addColorStop(1, 'rgba(20,12,8,0)'); c.save(); c.scale(1, 0.12); c.fillStyle = g; c.fillRect(-rx, -rx, 2 * rx, 2 * rx); c.restore(); }
function catWalk(o, P) {
  const cyc = o.ph / TAU, bob = Math.cos(cyc * TAU * 2) * 1.2, b = bob;
  const sh = [24, -40 + b], hp = [-30, -41 + b * 0.8];
  const foot = (off, base) => { const u = mod(cyc + off, 1), st = 0.6, Sx = 14; if (u < st) return [base + Sx - 2 * Sx * (u / st), 0]; const v = (u - st) / (1 - st); return [base - Sx + 2 * Sx * sm(v), -Math.sin(v * Math.PI) * 8]; };
  const fore = (f) => { const wr = [f[0] - 1, f[1] - 6], el = ik(sh, wr, 19, 22, -1); return [sh, el, wr, [f[0] + 3, f[1] - 2]]; };
  const hind = (f) => { const hk = [f[0] - 7, f[1] - 13], kn = ik(hp, hk, 21, 20, 1); return [hp, kn, hk, [f[0] + 2, f[1] - 2]]; };
  const fh = hind(foot(0.5, hp[0] + 3)), ff = fore(foot(0.75, sh[0] + 4));
  limb(fh, [12, 7, 5.5], P.dark); limb(ff, [10, 6.5, 5.5], P.dark);
  // tail
  const tp = [[-40, -55 + b]]; let ang = -2.1;
  for (let k = 0; k < 11; k++) { ang += 0.13 + Math.sin(T * 1.6 - k * 0.45) * 0.05; const p = tp[tp.length - 1]; tp.push([p[0] + Math.cos(ang) * 6.2, p[1] + Math.sin(ang) * 6.2]); }
  c.lineCap = 'round'; for (let k = 0; k < tp.length - 1; k++) { c.strokeStyle = (k % 3 === 1 && P.stripe) ? P.dark : (k > 8 ? P.dark : P.base); c.lineWidth = 8.5 - k * 0.38; c.beginPath(); c.moveTo(tp[k][0], tp[k][1]); c.lineTo(tp[k + 1][0], tp[k + 1][1]); c.stroke(); }
  rimLine(tp.slice(0, 10).map(p => [p[0] - 1, p[1] - 2]), o.rim, 1.2);
  const body = [[40, -54 + b], [35, -38 + b], [24, -31 + b], [4, -29 + b], [-16, -31 + b], [-28, -32 + b], [-42, -40 + b], [-45, -50 + b], [-38, -58 + b], [-14, -59 + b], [10, -60 + b], [26, -61 + b], [38, -66 + b]];
  shadeBody(body, P, -62 + b, -29 + b, [[[[-30, -59], [-27, -48], [-30, -38]]], [[[-20, -60], [-17, -48], [-20, -36]]], [[[-9, -60], [-7, -48], [-10, -35]]], [[[2, -60], [3, -49], [0, -37]]], [[[13, -61], [13, -51], [10, -42]], 0.9], [[[-38, -54], [-34, -45]], 0.8]].map(s => [s[0].map(p => [p[0], p[1] + b]), s[1]]), { belly: [0, -28 + b, 30, 6] });
  rimLine(body.slice(7).map(p => [p[0], p[1] - 0.5]), o.rim);
  const nh = hind(foot(0, hp[0] + 1)), nf = fore(foot(0.25, sh[0] + 3));
  limb(nh, [12.5, 7.5, 6], P.base); limb(nf, [10.5, 7, 6], P.base);
  [nh[3], nf[3]].forEach(p => oval(p[0], p[1], 5.2, 3, 0, P.stripe ? rgba(P.belly, 0.9) : P.base));
  c.save(); c.beginPath(); c.ellipse(-31, -43 + b, 13, 15, 0.3, 0, TAU); c.clip(); c.fillStyle = vg(-59 + b, -29 + b, [[0, P.light], [0.38, P.base], [1, P.dark]]); c.fillRect(-50, -62 + b, 40, 40);
  if (P.stripe) { c.strokeStyle = rgba(P.stripe, 0.22); c.lineCap = 'round'; c.lineWidth = 3; [[-36, -50], [-30, -52]].forEach(q => { c.beginPath(); c.moveTo(q[0], q[1] + b); c.quadraticCurveTo(q[0] + 4, q[1] + 8 + b, q[0] + 2, q[1] + 16 + b); c.stroke(); }); } c.restore();
  c.save(); c.translate(44, -63 + b * 0.5); c.rotate((o.look || 0) + Math.sin(cyc * TAU * 2) * 0.02); c.scale(1.3, 1.3); catHead(P, o); c.restore();
}
function catSit(o, P) {
  const br = Math.sin(T * 1.7) * 0.6, flick = Math.max(0, Math.sin(T * (o.tailSpeed || 1.3))) * 6;
  const tp = [[-30, -5], [-41, -2], [-34, 2], [-12, 3], [8, 2], [18, -1 - flick * 0.4], [22, -4 - flick]];
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.strokeStyle = P.base; c.lineWidth = 7; smoothOpen(tp); c.stroke();
  if (P.stripe) { c.strokeStyle = rgba(P.stripe, 0.55); c.setLineDash([3, 4]); c.lineWidth = 6.5; smoothOpen(tp); c.stroke(); c.setLineDash([]); }
  limb([[6, -40], [6, -20], [7, -3]], [8, 6], P.dark); oval(9, -2, 5, 2.8, 0, P.dark);
  const body = [[-36, -10], [-39, -28], [-31, -47], [-15, -63], [-1, -74], [11, -78], [19, -68], [21, -50], [17, -30], [12, -8], [-4, -3], [-28, -3]].map(p => [p[0], p[1] - (p[1] < -40 ? br : 0)]);
  oval(-14, -20, 25, 20, -0.15, P.base);
  shadeBody(body, P, -78, -3, [[[[-31, -40], [-22, -34], [-16, -24]]], [[[-25, -52], [-16, -46], [-9, -38]]], [[[-15, -62], [-7, -56], [-1, -48]]], [[[-36, -24], [-28, -18], [-22, -8]], 0.9], [[[-37, -14], [-30, -9]], 0.7]], { belly: [15, -46, 7, 18, 0] });
  rimLine(body.slice(0, 7).map(p => [p[0] - 0.5, p[1] - 0.5]), o.rim);
  limb([[14, -40], [14, -20], [15, -3]], [9, 7], P.base);
  oval(17, -2, 5.6, 3.2, 0, P.stripe ? rgba(P.belly, 0.95) : P.base);
  oval(-3, -2.5, 10, 3.6, 0, P.base);
  c.save(); c.translate(8, -84 - br); c.rotate(o.look || 0); c.scale(1.3, 1.3); catHead(P, o); c.restore();
}
function drawCat(o) {
  const P = o.sil ? SILP : CATP;
  c.save(); c.translate(o.x, o.y);
  if (o.shadow !== false) { c.save(); c.translate(o.pose === 'sit' ? -8 * o.s : 0, 0); c.scale(o.s, o.s); catShadow(o.pose === 'sit' ? 46 : 58, o.shadowA ?? 0.35); c.restore(); }
  c.scale(o.s * (o.face || 1), o.s);
  if (o.pose === 'sit') catSit(o, P); else catWalk(o, P);
  c.restore();
}
function blinkAt(t, seed = 0) { return mod(t + seed * 1.37, 3.9) < 0.14; }
