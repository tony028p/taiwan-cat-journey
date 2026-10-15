/* Cat rig v2 — one skeleton for every pose. Proportions checked against Muybridge, Animal Locomotion pl. 716 (cat walking):
   short legs, deep chest, head carried low and level, upper limbs hidden inside the body, wrist folds back in swing. */
const CAT2 = { base: '#c48a52', light: '#ecc391', dark: '#6a4227', belly: '#efdec4', stripe: '#4e2d16', eye: '#cfa43c', ear: '#c78f86', nose: '#b9736c', far: '#8f5f37' };
const SIL2 = { base: '#2b1f1a', light: '#3b2b23', dark: '#1d1411', belly: '#33251f', stripe: null, eye: '#e0ae4a', ear: '#3a2a24', nose: '#2b1f1a', far: '#1f1612' };
function lp(a, b, u) { if (typeof a === 'number') return a + (b - a) * u; if (Array.isArray(a)) return a.map((v, i) => lp(v, b[i], u)); const o = {}; for (const k in a) o[k] = (k in b) ? lp(a[k], b[k], u) : a[k]; return o; }
const STAND = { g: 1, hip: [-38, -46], sh: [32, -47], arch: 1.5, head: [60, -58], hr: 0, fn: [34, 0, 0], ff: [28, 0, 0], hn: [-32, 0, 0], hf: [-38, 0, 0], tail: [-2.0, 0.13, 0.06, 1.6, 0], eye: 1, mouth: 0, tongue: 0, ear: 0, br: 0 };
const SIT = { g: 1.4, hip: [-16, -22], sh: [6, -50], arch: -6, head: [16, -72], hr: 0, fn: [16, 0, 0], ff: [9, 0, 0], hn: [6, 0, 2], hf: [0, 0, 2], tail: [2.75, -0.3, 0.05, 1.2, 1], eye: 1, mouth: 0, tongue: 0, ear: 0, br: 1 };
const LOAF = { g: 1.15, hip: [-34, -16], sh: [26, -19], arch: 4, head: [52, -38], hr: 0.05, fn: [40, 0, -1], ff: [34, 0, -1], hn: [-12, 0, 2], hf: [-16, 0, 2], tail: [2.9, -0.32, 0.05, 1, 1], eye: 1, mouth: 0, tongue: 0, ear: 0, br: 1 };
const STRETCH = { g: 1, hip: [-32, -50], sh: [30, -20], arch: -7, head: [60, -26], hr: -0.15, fn: [74, 0, -1], ff: [66, 0, -1], hn: [-30, 0, 0], hf: [-36, 0, 0], tail: [-2.2, 0.1, 0.05, 1.2, 0], eye: 0.2, mouth: 0, tongue: 0, ear: 0.3, br: 0 };
const CROUCH = { g: 1.05, hip: [-36, -26], sh: [30, -22], arch: 2, head: [56, -32], hr: 0.05, fn: [40, 0, 0], ff: [34, 0, 0], hn: [-22, 0, 1.6], hf: [-26, 0, 1.6], tail: [-2.9, -0.02, 0.12, 4, 0], eye: 1, mouth: 0, tongue: 0, ear: -0.1, br: 0 };
const LEAP = { g: 0.95, hip: [-40, -44], sh: [36, -52], arch: 2, head: [66, -64], hr: -0.1, fn: [66, -30, -1], ff: [60, -24, -1], hn: [-78, -18, 0.3], hf: [-72, -14, 0.3], tail: [-2.9, 0.04, 0.05, 2, 0], eye: 1, mouth: 0, tongue: 0, ear: 0.2, br: 0 };

function walkPose(cyc, o = {}) {
  const trot = o.trot, duty = trot ? 0.42 : 0.62, Sx = trot ? 16 : 13, lift = trot ? 10 : 7, low = o.low || 0;
  const offs = trot ? { hn: 0, ff: 0, hf: 0.5, fn: 0.5 } : { hn: 0, fn: 0.25, hf: 0.5, ff: 0.75 };
  const bob = trot ? 1.8 : 1.1, w = Math.sin(cyc * 2 * TAU);
  const foot = (off, base) => { const u = mod(cyc + off, 1); if (u < duty) return [base + Sx - 2 * Sx * u / duty, 0, 0]; const v = (u - duty) / (1 - duty); return [base - Sx + 2 * Sx * sm(v), -Math.sin(v * Math.PI) * lift, Math.sin(v * Math.PI)]; };
  return { ...STAND, hip: [-38, -46 + low + bob * Math.sin(cyc * 2 * TAU + 1.6)], sh: [32, -47 + low * 1.1 + bob * w], head: [60 + (o.headX || 0), -58 + low * 1.2 + bob * 0.3 * w + (o.headY || 0)], hr: o.hr || 0,
    fn: foot(offs.fn, 32), ff: foot(offs.ff, 30), hn: foot(offs.hn, -32), hf: foot(offs.hf, -34),
    tail: trot ? [-2.6, 0.07, 0.1, 3, 0] : (o.tail || [-2.0, 0.13, 0.06, 1.6, 0]), eye: o.eye ?? 1, ear: o.ear || 0 };
}
function walkCyc(dist, s, trot) { return dist / ((trot ? 32 / 0.42 : 26 / 0.62) * s); }

function bodyGeom(p) {
  const H = p.hip, Sh = p.sh, dx = Sh[0] - H[0], dy = Sh[1] - H[1], L = Math.hypot(dx, dy), t = [dx / L, dy / L], n = [t[1], -t[0]];
  const br = 1 + (p.br ? Math.sin(T * 1.7) * 0.025 : 0);
  const sp = u => { const a = 4 * u * (1 - u) * (p.arch || 0); return [H[0] + dx * u + n[0] * a, H[1] + dy * u + n[1] * a]; };
  const at = (u, k) => { const q = sp(u); return [q[0] + n[0] * k, q[1] + n[1] * k]; };
  const g0 = p.g || 1, top = u => (13 + 2 * Math.sin(clamp(u) * Math.PI)) * g0;
  const bot = u => (u < 0.5 ? lerp(18, 13.5, clamp(u / 0.5)) : lerp(13.5, 22, clamp((u - 0.5) / 0.5))) * br * g0;
  const TP = [], BP = [];
  for (let u = -0.16; u <= 1.1001; u += 0.07) { TP.push(at(u, top(u))); BP.push(at(u, -bot(u))); }
  const front = [at(1.2, 9), at(1.24, -4), at(1.18, -16)], rear = [at(-0.26, -10), at(-0.3, 2), at(-0.25, 11)];
  return { H, Sh, t, n, L, sp, at, top, bot, TP, BP, pts: [...TP, ...front, ...BP.slice().reverse(), ...rear] };
}
function seg(a, b, w, col) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
function reach(P, Q, maxL) { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]); if (d <= maxL) return Q; return [P[0] + (Q[0] - P[0]) * maxL / d, P[1] + (Q[1] - P[1]) * maxL / d]; }
function foreLeg(B, tg, col, paw, near) {
  const f = tg[2], toe = [tg[0], tg[1]];
  const pas = f >= 0 ? lp([4, 8], [-7, 4], Math.min(1, f)) : lp([4, 8], [11, 2], Math.min(1, -f));
  const root = [B.Sh[0] - B.t[0] * 4 - B.n[0] * 3, B.Sh[1] - B.t[1] * 4 - B.n[1] * 3];
  const W = reach(root, [toe[0] - pas[0], toe[1] - pas[1]], 36.5), el = ik(root, W, 17.5, 19.5, -1), T2 = [W[0] + pas[0], W[1] + pas[1]];
  seg(root, el, near ? 13 : 11, col); seg(el, W, near ? 8.5 : 7.5, col); seg(W, T2, 6.5, col);
  oval(T2[0] + 1, T2[1] - 2.2, 6.5, 3.8, Math.atan2(pas[1], pas[0]) - Math.PI / 2 + 0.3, paw);
  return { root, el };
}
function hindLeg(B, tg, col, paw, near) {
  const f = tg[2], toe = [tg[0], tg[1]];
  const off = f <= 1 ? lp([-5, -14], [-12, -8], clamp(f)) : lp([-12, -8], [-20, -3], clamp(f - 1));
  const root = [B.H[0] + B.t[0] * 2 - B.n[0] * 3, B.H[1] + B.t[1] * 2 - B.n[1] * 3];
  const hk = reach(root, [toe[0] + off[0], toe[1] + off[1]], 37.5), kn = ik(root, hk, 18, 20, 1);
  seg(root, kn, near ? 15 : 13, col); seg(kn, hk, near ? 8.5 : 7.5, col); seg(hk, toe, 6.5, col);
  oval(toe[0] + 1.5, toe[1] - 2.2, 6.8, 3.6, 0, paw);
  return { root, kn, hk };
}
function tailChain(B, p) {
  const [ba, curl, amp, fq, ground] = p.tail; const base = B.at(-0.2, 7); const pts = [base]; let a = ba;
  for (let k = 0; k < 12; k++) { a += curl + amp * Math.sin(T * fq - k * 0.55) * (0.3 + k / 12); const q = pts[pts.length - 1]; let nx = q[0] + Math.cos(a) * 6.8, ny = q[1] + Math.sin(a) * 6.8; if (ground) ny = Math.min(ny, -3); pts.push([nx, ny]); }
  return pts;
}
function drawTail(pts, P, o) {
  c.lineCap = 'round';
  for (let k = 0; k < pts.length - 1; k++) { c.strokeStyle = (P.stripe && k % 3 === 2) || k > 9 ? P.dark : P.base; c.lineWidth = 9.5 - k * 0.42; c.beginPath(); c.moveTo(pts[k][0], pts[k][1]); c.lineTo(pts[k + 1][0], pts[k + 1][1]); c.stroke(); }
  if (o.rim) rimLine(pts.slice(0, 11).map(q => [q[0], q[1] - 3]), o.rim, 1.1);
}
function catHead2(P, o, p) {
  const eye = clamp(p.eye), m = p.mouth || 0;
  c.save(); c.rotate(-(p.ear || 0) * 0.4); poly([[-8, -8], [1, -11], [-6, -22]], P.dark); c.restore();
  const head = [[-13, -2], [-11, -9], [-3, -13], [6, -12], [12, -7], [15.5, -3], [16.5, 0.5], [14.5, 3.5], [9, 6.5 + m * 4], [0, 8 + m * 2], [-8, 6], [-13, 2]];
  if (m > 0.05) { c.save(); c.translate(6, 3); c.rotate(m * 0.5); poly([[-2, 0], [9, -1], [8, 3], [0, 4]], P.base); c.restore(); }
  shadeBody(head, P, -13, 8, [[[[-4, -12], [-3, -8]], 0.35], [[[0, -12.5], [1, -8.5]], 0.35], [[[-5, -12.5], [-7, -9]], 0.3], [[[-9, -1], [-3, 0], [1, -1]], 0.35], [[[-10, 3], [-4, 4]], 0.3]], { belly: [2, 5, 10, 4.5, 0] });
  oval(12, 2.4, 4.8, 3.4, 0, rgba(P.belly, 0.75));
  if (m > 0.05) { c.save(); c.translate(7, 2); c.rotate(m * 0.45); poly([[0, 0], [10, -1], [9, 4 * m + 1], [1, 3 * m + 1]], '#5a1f1c'); poly([[8.6, 0], [9.6, 0], [9.2, 2]], '#fff'); c.restore(); oval(10, 4 + m * 3, 3.5, 1.6, 0.4, '#e58a8f'); }
  if (p.tongue > 0) oval(16 + p.tongue * 2, 3.2, 2.6 * p.tongue, 1.5, 0.2, '#e58a8f');
  c.save(); c.translate(-0.5, -11); c.rotate(-(p.ear || 0)); poly([[-4.5, 1], [5.5, -0.5], [0, -12]], P.base); if (P.stripe) poly([[-2.5, 0], [3.5, -0.8], [0.1, -9]], rgba(P.ear, 0.75)); if (o.rim) rimLine([[-4.5, 1], [0, -12], [5.5, -0.5]], o.rim, 1.1); c.restore();
  if (eye < 0.3) { c.strokeStyle = '#2a1a12'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(3, -4); c.quadraticCurveTo(6.5, -2.4, 10, -4.2); c.stroke(); }
  else { c.save(); c.translate(6.6, -4.2); c.rotate(-0.12); oval(0, 0, 3.6, 2.5 * eye, 0, P.eye); oval(0.6, 0, 0.9, 2.3 * eye, 0, '#120c08');
    c.strokeStyle = 'rgba(30,18,10,0.9)'; c.lineWidth = 0.9; c.beginPath(); c.ellipse(0, 0, 3.6, 2.5 * eye, 0, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); disc(1.5, -1 * eye, 0.75, 'rgba(255,255,255,0.95)'); c.restore(); }
  poly([[15.2, -1.6], [17, -0.6], [16, 1]], P.nose);
  c.strokeStyle = o.sil ? 'rgba(255,220,180,0.35)' : 'rgba(255,250,240,0.6)'; c.lineWidth = 0.45;
  for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(12.5, 2 + k * 0.7); c.quadraticCurveTo(20, 0 + k * 1.6, 28, -2 + k * 3.2 + Math.sin(T * 1.5) * 0.4); c.stroke(); }
  rimLine([[-13, -2], [-11, -9], [-3, -13], [6, -12], [12, -7], [15.5, -3]], o.rim, 1.3);
}
function drawRig(p, o) {
  const P = o.sil ? SIL2 : CAT2, B = bodyGeom(p), paw = P.stripe ? rgba(P.belly, 0.95) : P.base;
  foreLeg(B, p.ff, P.far, P.far, false); hindLeg(B, p.hf, P.far, P.far, false);
  drawTail(tailChain(B, p), P, o);
  const mid = B.sp(0.5);
  const BG = c.createLinearGradient(mid[0] + B.n[0] * 15, mid[1] + B.n[1] * 15, mid[0] - B.n[0] * 20, mid[1] - B.n[1] * 20); BG.addColorStop(0, P.light); BG.addColorStop(0.42, P.base); BG.addColorStop(1, P.dark);
  smoothClosed(B.pts); c.fillStyle = BG; c.fill();
  c.save(); smoothClosed(B.pts); c.clip();
  if (P.stripe) {
    const bl = B.at(0.62, -18); oval(bl[0], bl[1], 30, 9, Math.atan2(B.t[1], B.t[0]), rgba(P.belly, 0.6));
    c.lineCap = 'round';
    [-0.1, 0.05, 0.2, 0.34, 0.48, 0.62, 0.76, 0.9].forEach((u, i) => { const a = B.at(u, 16), b = B.at(u + 0.05, 2), d = B.at(u + 0.01, -10);
      [[6, 0.12], [4, 0.18], [2.2, 0.26]].forEach(([w, al]) => { c.strokeStyle = rgba(P.stripe, al); c.lineWidth = w * (i === 0 ? 1.3 : 1); c.beginPath(); c.moveTo(a[0], a[1]); c.quadraticCurveTo(b[0], b[1], d[0], d[1]); c.stroke(); }); });
    const sp0 = B.at(-0.1, 14), sp1 = B.at(1.0, 14); c.strokeStyle = rgba(P.stripe, 0.22); c.lineWidth = 5; c.beginPath(); c.moveTo(sp0[0], sp0[1]); c.lineTo(sp1[0], sp1[1]); c.stroke();
  }
  c.restore();
  rimLine(B.TP, o.rim);
  const hl = hindLeg(B, p.hn, P.base, paw, true);
  const th = [lerp(hl.root[0], hl.kn[0], 0.42), lerp(hl.root[1], hl.kn[1], 0.42)], ta = Math.atan2(hl.kn[1] - hl.root[1], hl.kn[0] - hl.root[0]);
  c.save(); c.beginPath(); c.ellipse(th[0], th[1], 17, 14, ta, 0, TAU); c.fillStyle = BG; c.fill(); c.clip();
  if (P.stripe && 0) { c.strokeStyle = rgba(P.stripe, 0.16); c.lineWidth = 3; for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(th[0] - 6 + k * 7, th[1] - 13); c.quadraticCurveTo(th[0] + k * 7, th[1], th[0] - 4 + k * 7, th[1] + 13); c.stroke(); } } c.restore();
  const fl = foreLeg(B, p.fn, P.base, paw, true);
  const sc = B.at(0.95, 11 + Math.max(0, -p.fn[1]) * 0.05 + (p.fn[2] < 0.1 ? 1.5 : 0));
  c.beginPath(); c.ellipse(sc[0], sc[1], 8, 5, Math.atan2(B.t[1], B.t[0]), 0, TAU); c.fillStyle = BG; c.fill();
  const hd = p.head, nb = B.at(1.02, 4);
  c.lineCap = 'round'; c.strokeStyle = P.base; c.lineWidth = 19; c.beginPath(); c.moveTo(nb[0], nb[1]); c.lineTo(lerp(nb[0], hd[0], 0.75), lerp(nb[1], hd[1], 0.75) + 3); c.stroke();
  if (o.extra) o.extra(B);
  c.save(); c.translate(hd[0], hd[1]); c.rotate(p.hr || 0); c.scale(1.28, 1.28); catHead2(P, o, p); c.restore();
  if (o.pawUp) o.pawUp(B, P);
}
function drawCat2(o) {
  c.save(); c.translate(o.x, o.y);
  if (o.shadow !== false) { c.save(); c.scale(o.s, o.s); c.translate(o.pose.hip ? (o.pose.hip[0] + o.pose.sh[0]) / 2 : -8, 0); catShadow(o.pose.hip ? Math.max(30, Math.abs(o.pose.sh[0] - o.pose.hip[0]) * 0.75 + 20) : 46, o.shadowA ?? 0.35); c.restore(); }
  c.scale(o.s * (o.face || 1), o.s); drawRig(o.pose, o); c.restore();
}
/* back-compat with v1 calls */
function sitPose(t, o = {}) { const p = { ...SIT, hr: o.look || 0, eye: o.blink ? 0 : (o.eye ?? 1) }; p.tail = [2.75, -0.3, 0.05 + Math.max(0, Math.sin(t * (o.tailSpeed || 1.3))) * 0.06, (o.tailSpeed || 1.3) * 1.5, 1]; return p; }
function drawCat(o) {
  const pose = o.poseObj || (o.pose === 'sit' ? sitPose(T, o) : walkPose(o.ph / TAU, { hr: o.look, eye: o.blink ? 0 : 1 }));
  if (o.pose !== 'sit' && o.blink) pose.eye = 0;
  drawCat2({ ...o, pose });
}

/* ---- sitting family (pear silhouette, separate from the walking rig) ---- */
const SITP = { sit: 1, hr: 0, eye: 1, mouth: 0, tongue: 0, ear: 0, paw: null, ts: 1.3, lean: 0 };
function catSit2(p, o, P) {
  const br = Math.sin(T * 1.7) * 0.6, flick = Math.max(0, Math.sin(T * (p.ts || 1.3))) * 6, lean = p.lean || 0;
  const tp = [[-30, -5], [-41, -2], [-34, 2], [-12, 3], [8, 2], [18, -1 - flick * 0.4], [22, -4 - flick]];
  c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = P.base; c.lineWidth = 7.5; smoothOpen(tp); c.stroke();
  if (P.stripe) { c.strokeStyle = rgba(P.stripe, 0.5); c.setLineDash([3, 4]); c.lineWidth = 7; smoothOpen(tp); c.stroke(); c.setLineDash([]); }
  limb([[6, -38], [6, -20], [7, -4]], [8, 6.5], P.far); oval(9, -2, 5, 2.8, 0, P.far);
  c.save(); c.translate(0, 0); c.transform(1, 0, lean, 1, 0, 0);
  const body = [[-36, -10], [-40, -28], [-32, -47], [-16, -62], [-2, -72], [11, -75], [20, -66], [22, -48], [18, -30], [12, -8], [-4, -3], [-28, -3]].map(q => [q[0], q[1] - (q[1] < -40 ? br : 0)]);
  oval(-14, -20, 26, 20, -0.15, P.base);
  shadeBody(body, P, -76, -3, [[[[-31, -40], [-22, -34], [-16, -24]]], [[[-25, -52], [-16, -46], [-9, -38]]], [[[-15, -62], [-7, -56], [-1, -48]]], [[[-36, -24], [-28, -18], [-22, -8]], 0.9], [[[-37, -14], [-30, -9]], 0.7]], { belly: [16, -44, 7, 18, 0] });
  rimLine(body.slice(0, 7).map(q => [q[0] - 0.5, q[1] - 0.5]), o.rim);
  if (p.paw) { const sh0 = [15, -40], tg = [p.paw[0], p.paw[1]], W2 = reach(sh0, tg, 34), el = ik(sh0, W2, 16, 18, p.paw[1] < -40 ? 1 : -1); limb([sh0, el, W2], [9, 7], P.base); oval(W2[0] + 1, W2[1], 5.6, 3.6, -0.6, P.stripe ? rgba(P.belly, 0.95) : P.base); }
  else { limb([[14, -38], [14, -20], [15, -3]], [9, 7], P.base); oval(17, -2, 5.6, 3.2, 0, P.stripe ? rgba(P.belly, 0.95) : P.base); }
  oval(-3, -2.5, 10, 3.6, 0, P.base);
  c.save(); c.translate(9, -82 - br); c.rotate(p.hr || 0); c.scale(1.3, 1.3); catHead2(P, o, p); c.restore();
  if (p.paw && p.paw[2]) { const W2 = reach([15, -40], [p.paw[0], p.paw[1]], 34); oval(W2[0] + 1, W2[1], 5.6, 3.6, -0.6, P.stripe ? rgba(P.belly, 0.95) : P.base); }
  c.restore();
}
const _drawRig = drawRig;
drawRig = function (p, o) { if (p.sit) return catSit2(p, o, o.sil ? SIL2 : CAT2); return _drawRig(p, o); };
function sitP(lt, o = {}) { return { ...SITP, ...o, eye: o.eye ?? (blinkAt(lt, o.seed || 0) ? 0 : 1) }; }

/* ---- per-county actions ---- */
function shakeDrops(x, y, s, u) { const r = rng(77); for (let k = 0; k < 18; k++) { const a = r() * TAU, v = 40 + r() * 70; disc(x + Math.cos(a) * v * u * s, y + (Math.sin(a) * v * u - 60 * u * u) * s * 0.7 + 40 * u * u * s, 1.6 * s * (1 - u), `rgba(220,230,245,${0.8 * (1 - u)})`); } }
function butterfly(x, y, s, t) { const f = Math.abs(Math.sin(t * 18)); c.save(); c.translate(x, y); c.scale(s, s); oval(-4 * f - 1, -3, 5 * f + 0.6, 4, -0.4, '#f6d55a'); oval(4 * f + 1, -3, 5 * f + 0.6, 4, 0.4, '#f6d55a'); oval(-3 * f - 1, 2, 3.5 * f + 0.5, 2.6, 0.3, '#e9a84a'); oval(3 * f + 1, 2, 3.5 * f + 0.5, 2.6, -0.3, '#e9a84a'); line(0, -4, 0, 4, '#2a2220', 1.2); c.restore(); }
function actCat(o) {
  const i = SC.i, lt = SC.lt; let q = { ...o };
  const F = { 1: 1.2, 2: 1.1, 3: 1.05, 4: 1.1, 5: 1.25, 6: 1.15, 7: 1.3, 8: 1.15, 9: 1.15, 11: 1.15, 12: 1.2, 13: 1.15, 14: 1.1, 15: 1.15, 16: 1.2, 17: 1.15 }[i] || 1; q.s *= F;
  if (i in { 6: 1, 9: 1, 15: 1 }) q.cyc = walkCyc(lt * (i === 15 ? 28 : 26), q.s);
  const walkTo = (x0, sp) => { q.x = x0 + lt * sp; q.pose = walkPose(walkCyc(lt * sp, q.s), { hr: q.look || 0 }); };
  switch (i) {
    case 0: { const yawn = sm((lt - 5.4) / 0.4) * (1 - sm((lt - 6.8) / 0.5)); q.pose = sitP(lt, { hr: lerp(-0.06, -0.55, yawn), mouth: yawn, eye: yawn > 0.3 ? 0 : (blinkAt(lt) ? 0 : 1), ts: 1.1 }); break; }
    case 1: { const stopT = 3.6, d = lt < stopT ? lt * 46 : stopT * 46 + (1 - Math.exp(-(lt - stopT) * 5)) * 9; q.x = 610 + d;
      if (lt < stopT) q.pose = walkPose(walkCyc(lt * 46, q.s, true), { trot: 1 });
      else { const u = lt - stopT - 0.5, sh = u > 0 && u < 0.7 ? Math.sin(u * 40) * 0.45 * (1 - u / 0.7) : 0; q.pose = { ...STAND, hr: sh, eye: Math.abs(sh) > 0.1 ? 0 : 1, ear: Math.abs(sh) * 0.8 }; if (u > 0 && u < 1.2) { const pp = q; q.after = () => shakeDrops(pp.x + 60 * pp.s, pp.y - 58 * pp.s, pp.s, clamp(u / 1.2)); } }
      break; }
    case 2: { const gullX = 900 - lt * 40; const wig = lt > 2.5 && lt < 4.4 ? Math.sin(lt * 22) * 2.5 : 0;
      if (lt < 4.4) { const u = sm(lt / 0.8); q.pose = lp(STAND, CROUCH, u); q.pose.hip = [q.pose.hip[0] + wig, q.pose.hip[1]]; q.pose.hr = -0.25 - lt * 0.02; q.pose.tail = [-2.9, -0.02, 0.18, 6, 0]; q.x = 260; q.y = 594; }
      else if (lt < 5.0) { const u = (lt - 4.4) / 0.6; q.pose = lp(CROUCH, LEAP, sm(u * 2)); q.x = 260 + u * 70; q.y = 594 - Math.sin(u * Math.PI) * 50; q.shadowA = 0.2; }
      else { const u = sm((lt - 5.0) / 0.4); q.pose = lp(LEAP, { ...STAND, hr: -0.3 }, u); q.x = 330; q.y = 594; }
      q.pose_sil = false; break; }
    case 3: { const g = lt > 1.8 && lt < 4.6, ph = (lt - 1.8) * 5; const lick = g ? (0.5 + 0.5 * Math.sin(ph)) : 0;
      q.pose = sitP(lt, g ? { hr: 0.45 + lick * 0.1, tongue: lick, eye: 0, paw: [26, -70 + lick * 4, 1] } : { hr: -0.08 }); break; }
    case 4: { q.x = 0 + lt * 34; q.y = 498 + (q.x + 90) * 22 / 390 - 2; q.pose = walkPose(walkCyc(lt * 34, q.s), { tail: [-2.9, 0.05, 0.12, 1.4, 0], hr: 0.12 }); break; }
    case 5: { const bx = 640 + Math.sin(lt * 1.3) * 60 + lt * 22, by = 520 + Math.sin(lt * 2.7) * 25 - sm((lt - 4.2) / 1.5) * 110;
      if (lt < 2.4) walkTo(260, 30);
      else if (lt < 3.8) { const u = sm((lt - 2.4) / 0.5); q.x = 260 + 2.4 * 30; q.pose = lp(STAND, CROUCH, u); q.pose.hip = [q.pose.hip[0] + (lt > 3 ? Math.sin(lt * 24) * 2.5 : 0), q.pose.hip[1]]; q.pose.hr = -0.3; }
      else if (lt < 4.5) { const u = (lt - 3.8) / 0.7; q.pose = lp(CROUCH, LEAP, sm(u * 1.6)); q.x = 332 + u * 120; q.y = 582 - Math.sin(u * Math.PI) * 70; q.shadowA = 0.15; }
      else { const u = sm((lt - 4.5) / 0.35); q.pose = lp(LEAP, { ...STAND, hr: -0.5 }, u); q.x = 452; }
      q.after = () => butterfly(bx, by, 1.2, lt); break; }
    case 7: { if (lt < 4.2) walkTo(330, 28); else { q.x = 330 + 4.2 * 28; q.pose = lp(walkPose(walkCyc(4.2 * 28, q.s)), { ...STAND, hr: 0.5, head: [58, -50] }, sm((lt - 4.2) / 0.5)); } q.y = 548 + (q.x - 300) / 460 * 42 - 1; break; }
    case 8: { const pp = { ...LOAF, eye: blinkAt(lt, 8) || (lt > 3 && lt < 3.9) ? 0 : 1, hr: Math.sin(lt * 0.5) * 0.06, ear: Math.max(0, Math.sin(lt * 3)) > 0.97 ? 0.4 : 0 }; pp.tail = [2.9, -0.32, 0.08, 1.4, 1]; q.pose = pp; q.y = 546; q.x = 220; break; }
    case 10: { const yawn = sm((lt - 2.4) / 0.4) * (1 - sm((lt - 3.7) / 0.5)); q.pose = sitP(lt, { hr: lerp(-0.1, -0.6, yawn), mouth: yawn, eye: yawn > 0.3 ? 0 : (blinkAt(lt, 9) ? 0 : 1) }); break; }
    case 11: { if (lt < 2.6) { const u = sm(lt / 0.9) * (1 - sm((lt - 1.9) / 0.7)); q.pose = lp(STAND, STRETCH, u); q.pose.mouth = Math.max(0, u - 0.6) * 2; q.x = 230; }
      else { const d = (lt - 2.6) * 30; q.x = 230 + d; q.pose = walkPose(walkCyc(d, q.s)); } break; }
    case 12: { q.x = 380 + lt * 50; q.pose = walkPose(walkCyc(lt * 50, q.s, true), { trot: 1 }); break; }
    case 13: { walkTo(300, 22); q.pose.tail = [-1.9, 0.16, 0.05, 1.2, 0]; q.y = 598; break; }
    case 14: { const ph = lt * 4.5, a = 0.5 + 0.5 * Math.sin(ph), wash = lt > 3.4;
      q.pose = sitP(lt, wash ? { hr: 0.15 + a * 0.25, eye: 0, paw: [24 + a * 4, -84 + a * 8, 1] } : { hr: 0.5, tongue: a, eye: 0.15, paw: [26, -70 + a * 3, 1] }); break; }
    case 16: { const sw = Math.max(0, Math.sin(lt * 2.2 - 1)); q.pose = sitP(lt, { hr: -0.35 - sw * 0.1, paw: sw > 0.05 ? [30 + sw * 14, -50 - sw * 40, 1] : null, ts: 2.2 }); q.x = 470; q.y = 600; break; }
    case 17: { walkTo(280, 22); q.pose = walkPose(walkCyc(lt * 22, q.s), { low: 9, ear: 0.45, eye: 0.35, hr: 0.12, tail: [-2.8, 0.03, 0.14, 2.4, 0] }); break; }
    case 18: { const look = lt < 2 ? -0.18 : lt < 3.5 ? lerp(-0.18, 0.25, sm((lt - 2) / 0.6)) : lerp(0.25, -0.1, sm((lt - 3.8) / 0.6)); q.pose = sitP(lt, { hr: look }); break; }
    case 19: { const u = clamp((lt - 0.5) / 5.5); q.pose = sitP(lt, { hr: -0.15 - u * 0.6, ts: 1.8 }); break; }
    case 20: { q.pose = sitP(lt, { hr: lt < 3 ? 0.35 : lerp(0.35, -0.1, sm((lt - 3) / 0.8)), eye: lt > 4.5 && lt < 5.4 ? 0 : 1 }); break; }
    case 21: { const tap = Math.max(0, Math.sin(lt * 2.4)); q.pose = lp(STAND, CROUCH, 0.8); q.pose.fn = [44 + tap * 20, -tap * 10, tap]; q.pose.hr = 0.35; q.pose.head = [58, -40]; q.x = 150; q.y = 551; break; }
    case 22: { const sl = sm((lt - 1.5) / 2.5); const pp = lp(LOAF, { ...LOAF, head: [50, -30], hr: 0.18 }, sl); pp.eye = lt > 5.5 ? 0 : (lt > 4 ? 0.35 : (blinkAt(lt, 20) ? 0 : 1)); pp.tail = [2.9, -0.34, 0.04, 0.8, 1]; q.pose = pp; q.x = 400; break; }
    default: if (!q.pose || typeof q.pose === 'string') { q.pose = q.pose === 'sit' ? sitP(lt, { hr: q.look || 0 }) : walkPose(q.cyc ?? q.ph / TAU, { hr: q.look || 0 }); }
  }
  drawCat2(q); if (q.after) q.after();
}
