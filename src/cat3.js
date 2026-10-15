/* Cat v3 — one continuous silhouette (legs grow out of the body with no seams), cel-shaded with a single outline,
   slimmer domestic-cat proportions. Built after studying hand-drawn feature-animation cats (flat 2-tone fills, outline only on
   the outer silhouette) and Muybridge pl. 716 for the gait. */
const C3 = { base: '#d0965c', shade: '#a36a3c', far: '#8f5b33', light: 'rgba(255,236,200,0.35)', stripe: 'rgba(110,62,28,0.42)', line: '#5a3820', belly: 'rgba(255,240,215,0.75)', eye: '#d8b040', nose: '#c07a72', ear: '#e8a59a' };
const S3 = { base: '#2c201b', shade: '#1f1612', far: '#1a120f', light: 'rgba(0,0,0,0)', stripe: null, line: '#140d0a', belly: 'rgba(0,0,0,0)', eye: '#e8b84e', nose: '#2c201b', ear: '#3a2a24' };
let CB = null, CB2 = null;
const CBW = 720, CBH = 560, COX = 360, COY = 470;
function cbufs() { if (!CB) { CB = mkCanvas(CBW, CBH); CB2 = mkCanvas(CBW, CBH); } }

const STAND3 = { g: 1, hip: [-34, -50], sh: [30, -52], arch: 2, head: [54, -72], hr: 0, fn: [32, 0, 0], ff: [26, 0, 0], hn: [-30, 0, 0], hf: [-36, 0, 0], tail: [-1.75, 0.12, 0.06, 1.6, 0], eye: 1, mouth: 0, tongue: 0, ear: 0, br: 0 };
const CROUCH3 = { ...STAND3, hip: [-32, -30], sh: [28, -26], arch: 3, head: [52, -38], hr: 0.05, fn: [40, 0, 0], ff: [34, 0, 0], hn: [-20, 0, 1.6], hf: [-24, 0, 1.6], tail: [-2.95, -0.02, 0.12, 5, 0], ear: -0.1 };
const LEAP3 = { ...STAND3, hip: [-38, -48], sh: [34, -56], arch: 3, head: [60, -72], hr: -0.15, fn: [66, -36, -1], ff: [60, -28, -1], hn: [-80, -20, 0.3], hf: [-74, -16, 0.3], tail: [-2.9, 0.03, 0.05, 2, 0], ear: 0.25 };
const LAND3 = { ...STAND3, hip: [-34, -54], sh: [30, -40], arch: 1, head: [56, -56], fn: [40, 0, 0], ff: [34, 0, 0], hn: [-44, -12, 0.8], hf: [-40, -8, 0.8] };
const STRETCH3 = { ...STAND3, hip: [-30, -54], sh: [26, -22], arch: -8, head: [58, -28], hr: -0.2, fn: [74, 0, -1], ff: [66, 0, -1], hn: [-28, 0, 0], hf: [-34, 0, 0], tail: [-2.0, 0.1, 0.05, 1.2, 0], eye: 0.2, ear: 0.3 };
const LOAF3 = { ...STAND3, g: 1.12, hip: [-30, -17], sh: [24, -19], arch: 5, head: [46, -42], hr: 0.05, fn: [40, 0, -1], ff: [34, 0, -1], hn: [-10, 0, 2], hf: [-14, 0, 2], tail: [2.9, -0.32, 0.05, 1, 1] };
const SLEEP3 = { ...LOAF3, head: [44, -28], hr: 0.25, eye: 0, ear: 0.15, tail: [2.95, -0.36, 0.03, 0.7, 1] };

function walkPose3(cyc, o = {}) {
  const trot = o.trot, duty = trot ? 0.42 : 0.62, Sx = trot ? 16 : 13, lift = trot ? 10 : 7, low = o.low || 0;
  const offs = trot ? { hn: 0, ff: 0, hf: 0.5, fn: 0.5 } : { hn: 0, fn: 0.25, hf: 0.5, ff: 0.75 };
  const bob = trot ? 2 : 1.2, w = Math.sin(cyc * 2 * TAU);
  const foot = (off, base) => { const u = mod(cyc + off, 1); if (u < duty) return [base + Sx - 2 * Sx * u / duty, 0, 0]; const v = (u - duty) / (1 - duty); return [base - Sx + 2 * Sx * sm(v), -Math.sin(v * Math.PI) * lift, Math.sin(v * Math.PI)]; };
  return { ...STAND3, hip: [-34, -50 + low + bob * Math.sin(cyc * 2 * TAU + 1.6)], sh: [30, -52 + low * 1.1 + bob * w], head: [54 + (o.headX || 0), -72 + low * 1.3 + bob * 0.35 * w + (o.headY || 0)], hr: o.hr || 0,
    fn: foot(offs.fn, 30), ff: foot(offs.ff, 28), hn: foot(offs.hn, -30), hf: foot(offs.hf, -32),
    tail: o.tail || (trot ? [-2.3, 0.08, 0.1, 3, 0] : [-1.75, 0.12, 0.06, 1.6, 0]), eye: o.eye ?? 1, ear: o.ear || 0 };
}
function walkCyc3(dist, s, trot) { return dist / ((trot ? 32 / 0.42 : 26 / 0.62) * s); }
/* rotary gallop: gathered <-> extended */
function gallopPose3(cyc) {
  const a = cyc * TAU, ext = 0.5 + 0.5 * Math.sin(a), up = Math.max(0, Math.sin(a + 0.6));
  const p = lp({ ...STAND3, hip: [-24, -46], sh: [22, -44], arch: 9, head: [50, -62], fn: [6, 0, 1], ff: [0, -6, 1], hn: [8, -4, 1], hf: [2, 0, 1] },
    { ...STAND3, hip: [-40, -50], sh: [38, -54], arch: -1, head: [66, -70], fn: [70, -10, -1], ff: [62, -4, -1], hn: [-82, -10, 0.2], hf: [-76, -4, 0.2] }, ext);
  p.hip[1] -= up * 6; p.sh[1] -= up * 6; p.head[1] -= up * 5; p.tail = [-2.9, 0.02, 0.08, 6, 0]; p.ear = 0.35; return p;
}
function gallopCyc3(dist, s) { return dist / (110 * s); }

function bodyGeom3(p) {
  const H = p.hip, Sh = p.sh, dx = Sh[0] - H[0], dy = Sh[1] - H[1], L = Math.hypot(dx, dy), t = [dx / L, dy / L], n = [t[1], -t[0]];
  const br = 1 + (p.br ? Math.sin(T * 1.7) * 0.03 : 0), g0 = p.g || 1;
  const sp = u => { const a = 4 * u * (1 - u) * (p.arch || 0); return [H[0] + dx * u + n[0] * a, H[1] + dy * u + n[1] * a]; };
  const at = (u, k) => { const q = sp(u); return [q[0] + n[0] * k, q[1] + n[1] * k]; };
  const top = u => (11 + 2 * Math.sin(clamp(u) * Math.PI)) * g0;
  const bot = u => (u < 0.5 ? lerp(15, 10.5, clamp(u / 0.5)) : lerp(10.5, 16.5, clamp((u - 0.5) / 0.5))) * br * g0;
  const TP = [], BP = [];
  for (let u = -0.14; u <= 1.1001; u += 0.06) { TP.push(at(u, top(u))); BP.push(at(u, -bot(u))); }
  const front = [at(1.19, 8), at(1.24, -3), at(1.17, -13)], rear = [at(-0.24, -8), at(-0.28, 2), at(-0.23, 10)];
  return { H, Sh, t, n, L, sp, at, top, bot, TP, BP, pts: [...TP, ...front, ...BP.slice().reverse(), ...rear] };
}
function taper(a, b, wa, wb) { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  c.beginPath(); c.moveTo(a[0] + nx * wa / 2, a[1] + ny * wa / 2); c.lineTo(b[0] + nx * wb / 2, b[1] + ny * wb / 2); c.lineTo(b[0] - nx * wb / 2, b[1] - ny * wb / 2); c.lineTo(a[0] - nx * wa / 2, a[1] - ny * wa / 2); c.closePath(); c.fill();
  c.beginPath(); c.arc(a[0], a[1], wa / 2, 0, TAU); c.fill(); c.beginPath(); c.arc(b[0], b[1], wb / 2, 0, TAU); c.fill(); }
function fore3(B, tg) {
  const f = tg[2], toe = [tg[0], tg[1]];
  const pas = f >= 0 ? lp([3, 7], [-6, 4], Math.min(1, f)) : lp([3, 7], [9, 2], Math.min(1, -f));
  const root = [B.Sh[0] - B.t[0] * 3 - B.n[0] * 2, B.Sh[1] - B.t[1] * 3 - B.n[1] * 2];
  const W = reach(root, [toe[0] - pas[0], toe[1] - pas[1]], 40), el = ik(root, W, 19.5, 21, -1), T2 = [W[0] + pas[0], W[1] + pas[1]];
  taper(root, el, 15, 9.5); taper(el, W, 8.5, 6.2); taper(W, T2, 6, 5.6);
  c.beginPath(); c.ellipse(T2[0] + 1.2, T2[1] - 2.4, 5.2, 3.2, Math.atan2(pas[1], pas[0]) - Math.PI / 2 + 0.3, 0, TAU); c.fill();
  return { root, el, W, T2 };
}
function hind3(B, tg) {
  const f = tg[2], toe = [tg[0], tg[1]];
  const off = f <= 1 ? lp([-5, -14], [-12, -8], clamp(f)) : lp([-12, -8], [-19, -3], clamp(f - 1));
  const root = [B.H[0] + B.t[0] * 3 - B.n[0] * 1, B.H[1] + B.t[1] * 3 - B.n[1] * 1];
  const hk = reach(root, [toe[0] + off[0], toe[1] + off[1]], 42), kn = ik(root, hk, 20.5, 22, 1);
  taper(root, kn, 22, 11); taper(kn, hk, 8.5, 5.8); taper(hk, toe, 5.8, 5.4);
  c.beginPath(); c.ellipse(toe[0] + 1.5, toe[1] - 2.2, 5.6, 3, 0, 0, TAU); c.fill();
  return { root, kn, hk };
}
function tail3(B, p) {
  const [ba, curl, amp, fq, ground] = p.tail, base = B.at(-0.18, 6), pts = [base]; let a = ba;
  for (let k = 0; k < 12; k++) { a += curl + amp * Math.sin(T * fq - k * 0.55) * (0.3 + k / 12); const q = pts[pts.length - 1]; let nx = q[0] + Math.cos(a) * 6.6, ny = q[1] + Math.sin(a) * 6.6; if (ground) ny = Math.min(ny, -3); pts.push([nx, ny]); }
  for (let k = 0; k < pts.length - 1; k++) taper(pts[k], pts[k + 1], 8.5 - k * 0.38, 8.1 - k * 0.38);
  return pts;
}
function headShape3() { return [[-13, -2], [-11, -9], [-3, -13], [6, -12], [12, -7], [15.5, -3], [16.5, 0.5], [14.5, 3.5], [9, 6.5], [0, 8.5], [-8, 6.5], [-13, 2]]; }
/* silhouette pass: everything in flat colours, no lines */
function silRig(p, P) {
  const B = bodyGeom3(p);
  c.fillStyle = P.far; fore3(B, p.ff); hind3(B, p.hf);
  c.fillStyle = P.base; const tp = tail3(B, p);
  smoothClosed(B.pts); c.fill();
  const hl = hind3(B, p.hn); const th = [lerp(hl.root[0], hl.kn[0], 0.38), lerp(hl.root[1], hl.kn[1], 0.38)];
  c.beginPath(); c.ellipse(th[0], th[1], 15, 12.5, Math.atan2(hl.kn[1] - hl.root[1], hl.kn[0] - hl.root[0]), 0, TAU); c.fill();
  const fl = fore3(B, p.fn);
  const nb = B.at(1.0, 2), hd = p.head; taper(nb, [lerp(nb[0], hd[0], 0.8), lerp(nb[1], hd[1], 0.8)], 22, 19);
  c.save(); c.translate(hd[0], hd[1]); c.rotate(p.hr || 0); c.scale(1.36, 1.36);
  c.save(); c.rotate(-(p.ear || 0) * 0.4); poly([[-8.5, -7], [1, -11], [-7, -24]], P.base); c.restore();
  smoothClosed(headShape3()); c.fill();
  c.save(); c.translate(-0.5, -11); c.rotate(-(p.ear || 0)); poly([[-5, 1.5], [6, 0], [0.2, -13.5]], P.base); c.restore();
  if (p.mouth > 0.05) { c.save(); c.translate(7, 3); c.rotate(p.mouth * 0.5); poly([[-2, 0], [10, -1], [9, 3], [0, 4.5]], P.base); c.restore(); }
  c.restore();
  return { B, tp, hl, fl };
}
function silSit(p, P) {
  const br = Math.sin(T * 1.7) * 0.6, flick = Math.max(0, Math.sin(T * (p.ts || 1.3))) * 6;
  c.fillStyle = P.base;
  const tpp = [[-28, -5], [-40, -2], [-33, 2], [-12, 3], [8, 2], [18, -1 - flick * 0.4], [22, -4 - flick]];
  for (let k = 0; k < tpp.length - 1; k++) taper(tpp[k], tpp[k + 1], 8 - k * 0.5, 7.5 - k * 0.5);
  c.fillStyle = P.far; taper([6, -40], [6, -20], 9, 6.5); taper([6, -20], [7, -4], 6.5, 5.8); c.beginPath(); c.ellipse(9, -2.5, 5, 3, 0, 0, TAU); c.fill();
  c.fillStyle = P.base;
  const body = [[-34, -10], [-38, -27], [-31, -45], [-17, -60], [-4, -70], [9, -73], [18, -64], [20, -47], [16, -30], [12, -9], [-4, -3], [-27, -3]].map(q => [q[0], q[1] - (q[1] < -40 ? br : 0)]);
  smoothClosed(body); c.fill(); c.beginPath(); c.ellipse(-13, -19, 25, 19, -0.15, 0, TAU); c.fill();
  let pawPt = null;
  if (p.paw) { const sh0 = [14, -40], W2 = reach(sh0, [p.paw[0], p.paw[1]], 36), el = ik(sh0, W2, 17, 19, p.paw[1] < -40 ? 1 : -1); taper(sh0, el, 11, 7.5); taper(el, W2, 7.5, 6); c.beginPath(); c.ellipse(W2[0] + 1, W2[1], 5.4, 3.6, -0.6, 0, TAU); c.fill(); pawPt = W2; }
  else { taper([14, -40], [14, -20], 10, 7); taper([14, -20], [15, -4], 7, 6); c.beginPath(); c.ellipse(17, -2.5, 5.4, 3.1, 0, 0, TAU); c.fill(); }
  c.beginPath(); c.ellipse(-3, -3, 10, 3.8, 0, 0, TAU); c.fill();
  const hd = [8, -82 - br];
  c.save(); c.translate(hd[0], hd[1]); c.rotate(p.hr || 0); c.scale(1.34, 1.34);
  c.save(); c.rotate(-(p.ear || 0) * 0.4); poly([[-8.5, -7], [1, -11], [-7, -24]], P.base); c.restore();
  smoothClosed(headShape3()); c.fill();
  c.save(); c.translate(-0.5, -11); c.rotate(-(p.ear || 0)); poly([[-5, 1.5], [6, 0], [0.2, -13.5]], P.base); c.restore();
  if (p.mouth > 0.05) { c.save(); c.translate(7, 3); c.rotate(p.mouth * 0.5); poly([[-2, 0], [10, -1], [9, 3], [0, 4.5]], P.base); c.restore(); }
  c.restore();
  return { body, hd, pawPt };
}
/* shading pass (source-atop on the silhouette) */
function shadeRig(info, p, P) {
  const B = info.B;
  c.save(); c.globalCompositeOperation = 'source-atop';
  // cel shadow along the belly / underside
  c.fillStyle = P.shade; c.beginPath(); const bp = B.BP.map((q, i) => [q[0] + B.n[0] * 7, q[1] + B.n[1] * 7]);
  c.moveTo(bp[0][0], bp[0][1]); bp.forEach(q => c.lineTo(q[0], q[1])); const f1 = B.at(1.3, -40), r1 = B.at(-0.4, -40); c.lineTo(f1[0], f1[1]); c.lineTo(r1[0], r1[1]); c.closePath(); c.globalAlpha = 0.55; c.fill(); c.globalAlpha = 1;
  // shadow behind the thigh and under the head
  c.fillStyle = P.shade; c.globalAlpha = 0.45; const hl = info.hl; c.beginPath(); c.ellipse(hl.kn[0] - 4, hl.kn[1] + 2, 6, 10, 0.3, 0, TAU); c.fill();
  c.beginPath(); c.ellipse(p.head[0] - 6, p.head[1] + 12, 10, 5, 0.2, 0, TAU); c.fill(); c.globalAlpha = 1;
  if (P.stripe) {
    c.strokeStyle = P.stripe; c.lineCap = 'round';
    [-0.08, 0.08, 0.24, 0.4, 0.56, 0.72, 0.88].forEach((u, i) => { const a = B.at(u, 13), b2 = B.at(u + 0.05, 3), d = B.at(u + 0.02, -6); c.lineWidth = i === 0 ? 4.5 : 3.6; c.beginPath(); c.moveTo(a[0], a[1]); c.quadraticCurveTo(b2[0], b2[1], d[0], d[1]); c.stroke(); });
    const tp = info.tp; for (let k = 2; k < tp.length - 1; k += 2) { c.lineWidth = 3.4; c.beginPath(); const q = tp[k], r = tp[k + 1]; const nx = -(r[1] - q[1]), ny = r[0] - q[0], l = Math.hypot(nx, ny) || 1; c.moveTo(q[0] + nx / l * 5, q[1] + ny / l * 5); c.lineTo(q[0] - nx / l * 5, q[1] - ny / l * 5); c.stroke(); }
    const hl2 = info.hl; c.lineWidth = 3; for (let k = 0; k < 2; k++) { const u = 0.35 + k * 0.25, q = [lerp(hl2.root[0], hl2.kn[0], u), lerp(hl2.root[1], hl2.kn[1], u)]; c.beginPath(); c.moveTo(q[0] - 7, q[1] - 2); c.quadraticCurveTo(q[0], q[1] + 1, q[0] + 7, q[1] - 3); c.stroke(); }
    // chest / muzzle lighter
    c.fillStyle = P.belly; const ch = B.at(1.12, -8); c.beginPath(); c.ellipse(ch[0], ch[1], 7, 9, 0, 0, TAU); c.fill();
  }
  // soft top light
  c.fillStyle = P.light; c.beginPath(); const tpp = B.TP.map(q => [q[0] - B.n[0] * 5, q[1] - B.n[1] * 5]); c.moveTo(B.TP[0][0] + B.n[0] * 10, B.TP[0][1] + B.n[1] * 10); tpp.forEach(q => c.lineTo(q[0], q[1])); c.lineTo(B.TP[B.TP.length - 1][0] + B.n[0] * 10, B.TP[B.TP.length - 1][1] + B.n[1] * 10); c.closePath(); c.fill();
  c.restore();
}
function shadeSit(info, p, P) {
  c.save(); c.globalCompositeOperation = 'source-atop';
  c.fillStyle = P.shade; c.globalAlpha = 0.5; c.beginPath(); c.ellipse(-16, -9, 26, 9, -0.1, 0, TAU); c.fill();
  c.beginPath(); c.moveTo(-38, -27); c.quadraticCurveTo(-36, -8, -20, -4); c.lineTo(-40, -2); c.closePath(); c.fill();
  c.beginPath(); c.ellipse(info.hd[0] - 5, info.hd[1] + 12, 11, 5, 0.1, 0, TAU); c.fill(); c.globalAlpha = 1;
  if (P.stripe) {
    c.strokeStyle = P.stripe; c.lineCap = 'round'; c.lineWidth = 3.6;
    [[[-31, -40], [-22, -34], [-16, -25]], [[-25, -52], [-16, -46], [-9, -38]], [[-16, -62], [-8, -56], [-2, -48]], [[-36, -24], [-28, -18], [-22, -9]], [[-6, -66], [0, -60]]].forEach(s => { smoothOpen(s); c.stroke(); });
    c.lineWidth = 3.2; [[-38, -4], [-24, 2], [-6, 3], [10, 1]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x, y - 4); c.lineTo(x + 1, y + 3); c.stroke(); });
    c.fillStyle = P.belly; c.beginPath(); c.ellipse(15, -48, 6, 16, 0, 0, TAU); c.fill();
  }
  c.fillStyle = P.light; c.beginPath(); c.moveTo(-40, -26); c.quadraticCurveTo(-34, -52, -6, -72); c.lineTo(-2, -66); c.quadraticCurveTo(-26, -48, -32, -24); c.closePath(); c.fill();
  c.restore();
}
/* face details drawn on top of the outlined silhouette */
function face3(P, p, sil) {
  const eye = clamp(p.eye ?? 1), m = p.mouth || 0;
  c.save(); c.translate(-0.5, -11); c.rotate(-(p.ear || 0)); poly([[-3, 0.5], [3.8, -0.3], [0.2, -10]], P.ear); c.restore();
  if (!sil) { c.fillStyle = P.belly; c.beginPath(); c.ellipse(11.5, 2.6, 5.4, 3.8, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(110,62,28,0.42)'; c.lineCap = 'round'; c.strokeStyle = 'rgba(110,62,28,0.42)'; c.lineWidth = 1.4; [[-4, -12, -3, -8], [0, -12.5, 1, -8.8], [-10, -1, -3, 0]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); }); }
  if (m > 0.05) { c.save(); c.translate(7, 2.4); c.rotate(m * 0.45); poly([[0, 0], [10, -1], [9, 4 * m + 1], [1, 3 * m + 1]], '#5a1f1c'); poly([[8.6, 0], [9.6, 0], [9.2, 2]], '#fff'); c.restore(); c.fillStyle = '#e58a8f'; c.beginPath(); c.ellipse(10, 4 + m * 3, 3.5, 1.6, 0.4, 0, TAU); c.fill(); }
  if ((p.tongue || 0) > 0) { c.fillStyle = '#e58a8f'; c.beginPath(); c.ellipse(16 + p.tongue * 2, 3.2, 2.6 * p.tongue, 1.5, 0.2, 0, TAU); c.fill(); }
  if (eye < 0.3) { c.strokeStyle = P.line; c.lineWidth = 1.1; c.beginPath(); c.moveTo(3, -4); c.quadraticCurveTo(6.5, -2.4, 10, -4.2); c.stroke(); }
  else { c.save(); c.translate(6.6, -4.2); c.rotate(-0.12); c.fillStyle = P.eye; c.beginPath(); c.ellipse(0, 0, 3.5, 2.6 * eye, 0, 0, TAU); c.fill(); c.fillStyle = '#140c08'; c.beginPath(); c.ellipse(0.7, 0, 1.3, 2.4 * eye, 0, 0, TAU); c.fill();
    c.strokeStyle = P.line; c.lineWidth = 1; c.beginPath(); c.ellipse(0, 0, 3.5, 2.6 * eye, 0, Math.PI * 1.02, Math.PI * 1.98); c.stroke(); c.fillStyle = 'rgba(255,255,255,0.95)'; c.beginPath(); c.arc(1.5, -0.9 * eye, 0.8, 0, TAU); c.fill(); c.restore(); }
  poly([[15.2, -1.6], [17, -0.6], [16, 1]], P.nose);
  c.strokeStyle = P.line; c.lineWidth = 0.7; c.beginPath(); c.moveTo(16, 1.2); c.quadraticCurveTo(14.5, 3.5, 11.5, 4); c.stroke();
  c.strokeStyle = sil ? 'rgba(255,220,180,0.35)' : 'rgba(255,252,245,0.7)'; c.lineWidth = 0.45;
  for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(12.5, 2 + k * 0.8); c.quadraticCurveTo(20, 0 + k * 1.8, 27, -2 + k * 3.4 + Math.sin(T * 1.5) * 0.4); c.stroke(); }
}
function drawCat3(o) {
  cbufs(); const P = o.sil ? S3 : C3, p = o.pose, k = S * o.s;
  const g = CB.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, CBW, CBH);
  g.setTransform(k * (o.face || 1), 0, 0, k, COX, COY);
  const prev = c; c = g;
  const info = p.sit ? silSit(p, P) : silRig(p, P);
  if (p.sit) shadeSit(info, p, P); else shadeRig(info, p, P);
  c = prev;
  // outline: dilate silhouette into CB2, tint, then lay the cat on top
  const g2 = CB2.getContext('2d'); g2.setTransform(1, 0, 0, 1, 0, 0); g2.globalCompositeOperation = 'source-over'; g2.clearRect(0, 0, CBW, CBH);
  const ow = Math.max(1, 1.15 * S);
  for (let a = 0; a < 8; a++) g2.drawImage(CB, Math.cos(a * Math.PI / 4) * ow, Math.sin(a * Math.PI / 4) * ow);
  g2.globalCompositeOperation = 'source-in'; g2.fillStyle = P.line; g2.fillRect(0, 0, CBW, CBH);
  g2.globalCompositeOperation = 'source-over'; g2.drawImage(CB, 0, 0);
  if (o.rim) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, CBW, CBH); g.drawImage(CB2, 0, 0);
    g.globalCompositeOperation = 'source-in'; g.fillStyle = `rgb(${o.rim})`; g.fillRect(0, 0, CBW, CBH);
    g.globalCompositeOperation = 'destination-out'; g.drawImage(CB2, 1.6 * S * (o.rimX ?? 0.6) * (o.face || 1), 2.0 * S); g.globalCompositeOperation = 'source-over';
    g2.globalCompositeOperation = 'lighter'; g2.globalAlpha = 0.85; g2.drawImage(CB, 0, 0); g2.globalAlpha = 1; g2.globalCompositeOperation = 'source-over'; }
  // face on top
  g2.setTransform(k * (o.face || 1), 0, 0, k, COX, COY); c = g2;
  if (p.sit) { const br = Math.sin(T * 1.7) * 0.6; c.save(); c.translate(8, -82 - br); c.rotate(p.hr || 0); c.scale(1.34, 1.34); face3(P, p, o.sil); c.restore(); }
  else { c.save(); c.translate(p.head[0], p.head[1]); c.rotate(p.hr || 0); c.scale(1.36, 1.36); face3(P, p, o.sil); c.restore(); }
  c = prev; g2.setTransform(1, 0, 0, 1, 0, 0);
  // composite into scene
  c.save(); c.translate(o.x, o.y);
  if (o.shadow !== false) { c.save(); c.scale(o.s, o.s); c.translate(p.hip ? (p.hip[0] + p.sh[0]) / 2 * (o.face || 1) : -8 * (o.face || 1), 0); catShadow(p.hip ? Math.max(30, Math.abs(p.sh[0] - p.hip[0]) * 0.8 + 18) : 44, o.shadowA ?? 0.32); c.restore(); }
  c.drawImage(CB2, -COX / S, -COY / S, CBW / S, CBH / S);
  c.restore();
}
