/* Cat v3 — one continuous silhouette (legs grow out of the body with no seams), cel-shaded with a single outline,
   slimmer domestic-cat proportions. Built after studying hand-drawn feature-animation cats (flat 2-tone fills, outline only on
   the outer silhouette) and Muybridge pl. 716 for the gait. */
const C3 = { base: '#d4975a', shade: '#a96d3d', far: '#93643f', cream: '#f5e2c4', creamS: '#dcbc96', light: 'rgba(255,238,205,0.36)', stripe: 'rgba(122,64,24,0.5)', line: '#4e301e', inner: 'rgba(78,46,26,0.8)', belly: 'rgba(255,242,220,0.9)', eye: '#d8b040', nose: '#c97b72', ear: '#eca79c' };
const S3 = { base: '#2c201b', shade: '#1f1612', far: '#150f0c', cream: '#2c201b', creamS: '#251a16', light: 'rgba(0,0,0,0)', stripe: null, line: '#140d0a', inner: 'rgba(8,5,4,0.75)', belly: 'rgba(0,0,0,0)', eye: '#e8b84e', nose: '#2c201b', ear: '#3a2a24' };
/* other cats met along the way (same rig, different coats). patches: [u, k, rx, ry, col] in body coords;
   sitPatches: [x, y, rx, ry, col] in the sitting silhouette; headPatches: [x, y, rx, ry, col] in head coords */
const COATS = {
  black: { base: '#2b2427', shade: '#1d181b', far: '#151113', cream: '#3b3236', creamS: '#30282c', light: 'rgba(170,180,220,0.16)', stripe: null, line: '#0d0a0b', inner: 'rgba(0,0,0,0.6)', belly: 'rgba(0,0,0,0)', eye: '#9ccf54', nose: '#4a3a3e', ear: '#6e4c52' },
  white: { base: '#f3efe7', shade: '#d6cfc3', far: '#c4bcae', cream: '#ffffff', creamS: '#e6e0d5', light: 'rgba(255,255,255,0.35)', stripe: null, line: '#6a5f56', inner: 'rgba(106,95,86,0.7)', belly: 'rgba(255,255,255,0.9)', eye: '#7fb4e6', nose: '#e8a0a0', ear: '#f2b2ae' },
  grey: { base: '#8e9197', shade: '#717379', far: '#5d6066', cream: '#e3e1dc', creamS: '#c9c7c1', light: 'rgba(235,240,250,0.3)', stripe: 'rgba(58,60,68,0.5)', line: '#3a3c42', inner: 'rgba(58,60,66,0.8)', belly: 'rgba(240,240,236,0.9)', eye: '#c9b13c', nose: '#c08a8a', ear: '#d9a3a0' },
  calico: { base: '#f4eee4', shade: '#d8cfc1', far: '#c6bcae', cream: '#fbf8f2', creamS: '#e7e0d4', light: 'rgba(255,255,255,0.3)', stripe: null, line: '#5a4a3e', inner: 'rgba(90,74,62,0.7)', belly: 'rgba(255,252,246,0.9)', eye: '#d6ad3c', nose: '#e39a92', ear: '#eeaaa2',
    patches: [[0.05, 6, 16, 12, '#d98a45'], [0.42, 9, 11, 9, '#2f2a2a'], [0.78, 7, 10, 8, '#d98a45']], sitPatches: [[-22, -40, 13, 15, '#d98a45'], [-6, -60, 8, 8, '#2f2a2a'], [-28, -14, 10, 7, '#2f2a2a']], headPatches: [[-6.5, -7, 4, 7.5, '#d98a45'], [5, -10.5, 3, 4.2, '#2f2a2a']], tail: '#d98a45' },
  tuxedo: { base: '#26222a', shade: '#1a171d', far: '#121014', cream: '#f2efe8', creamS: '#d9d4ca', light: 'rgba(170,180,220,0.16)', stripe: null, line: '#0b090c', inner: 'rgba(0,0,0,0.6)', belly: 'rgba(250,248,242,0.95)', eye: '#e2c24c', nose: '#e39a9a', ear: '#5e4650' },
};
const HSR = 1.56, HSS = 1.5; // head scale (rig / sitting): a little big, so expressions read at film size
let CB = null, CB2 = null, CB3 = null, CB4 = null, CB5 = null;
const CBW = 720, CBH = 560, COX = 360, COY = 470;
function cbufs() { if (!CB) { CB = mkCanvas(CBW, CBH); CB2 = mkCanvas(CBW, CBH); CB3 = mkCanvas(CBW, CBH); CB4 = mkCanvas(CBW, CBH); CB5 = mkCanvas(CBW, CBH); } }

const STAND3 = { g: 1, hip: [-34, -50], sh: [30, -52], arch: 3.5, head: [54, -72], hr: 0, fn: [32, 0, 0], ff: [26, 0, 0], hn: [-38, 0, 0], hf: [-44, 0, 0], tail: [-1.75, 0.12, 0.06, 1.6, 0], eye: 1, mouth: 0, tongue: 0, ear: 0, br: 0, sb: 2, hb: 1.5 };
const CROUCH3 = { ...STAND3, hip: [-32, -30], sh: [28, -26], arch: 3, head: [52, -38], hr: 0.05, fn: [40, 0, 0], ff: [34, 0, 0], hn: [-26, 0, 1.6], hf: [-30, 0, 1.6], tail: [-2.95, -0.02, 0.12, 5, 0], ear: -0.1, sb: 4.5, hb: 2 };
const LEAP3 = { ...STAND3, hip: [-36, -48], sh: [32, -56], arch: 3, head: [58, -72], hr: -0.15, fn: [66, -36, -1], ff: [60, -28, -1], hn: [-80, -20, 0.3], hf: [-74, -16, 0.3], tail: [-2.9, 0.03, 0.05, 2, 0], ear: 0.25, sb: 0.5, hb: 0.5, g: 0.96 };
const LAND3 = { ...STAND3, hip: [-34, -54], sh: [30, -40], arch: 1, head: [56, -56], fn: [40, 0, 0], ff: [34, 0, 0], hn: [-44, -12, 0.8], hf: [-40, -8, 0.8], sb: 4 };
const STRETCH3 = { ...STAND3, hip: [-30, -54], sh: [26, -22], arch: -8, head: [58, -28], hr: -0.2, fn: [74, 0, -1], ff: [66, 0, -1], hn: [-28, 0, 0], hf: [-34, 0, 0], tail: [-2.0, 0.1, 0.05, 1.2, 0], eye: 0.2, ear: 0.3, sb: 3.5 };
const LOAF3 = { ...STAND3, g: 1.12, hip: [-30, -17], sh: [24, -19], arch: 5, head: [46, -42], hr: 0.05, fn: [40, 0, -1], ff: [34, 0, -1], hn: [-10, 0, 2], hf: [-14, 0, 2], tail: [2.9, -0.32, 0.05, 1, 1], sb: 1, hb: 1 };
/* startled "Halloween cat": back arched high, on tiptoe, tail straight up and bushy */
const SCARED3 = { ...STAND3, g: 1.14, hip: [-28, -60], sh: [26, -58], arch: 15, head: [50, -60], hr: 0.12, fn: [24, 0, -0.3], ff: [18, 0, -0.3], hn: [-22, 0, 0], hf: [-28, 0, 0], tail: [-1.62, 0.02, 0.03, 9, 0], tailW: 1.7, sb: 1, hb: 1 };
/* reared up on the hind legs, forepaws raised */
const REAR3 = { ...STAND3, hip: [-24, -40], sh: [10, -84], arch: -3, head: [26, -108], hr: -0.35, fn: [40, -112, -1], ff: [34, -104, -1], hn: [-14, 0, 0.9], hf: [-20, 0, 0.9], tail: [-2.8, -0.12, 0.08, 3, 0], sb: 1, hb: 1 };
const SLEEP3 = { ...LOAF3, head: [44, -28], hr: 0.25, eye: 0, ear: 0.15, tail: [2.95, -0.36, 0.03, 0.7, 1] };

/* Walk (lateral sequence) and trot (diagonal pairs). Stance feet move back at exactly the body speed (walkCyc3), so
   nothing slides. Secondary motion is derived from which legs are bearing weight: the withers and pelvis rise over a
   vertical supporting leg, the shoulder blade pokes above the topline, the head counter-bobs and nods with the forefeet. */
function walkPose3(cyc, o = {}) {
  const trot = o.trot, duty = trot ? 0.45 : 0.64, Sx = trot ? 17 : 13.5, lift = trot ? 11 : 7.5, low = o.low || 0;
  const offs = trot ? { hn: 0, ff: 0.03, hf: 0.5, fn: 0.53 } : { hn: 0, fn: 0.25, hf: 0.5, ff: 0.75 };
  const sup = {};
  const foot = (k, base, fore) => {
    const u = mod(cyc + offs[k], 1);
    if (u < duty) { const v = u / duty; sup[k] = Math.sin(Math.PI * v); return [base + Sx - 2 * Sx * v, 0, fore ? 0 : 0.35 * v * v]; }
    const v = (u - duty) / (1 - duty), up = Math.sin(Math.PI * Math.pow(v, 0.72)); sup[k] = 0;
    const f = fore ? (v < 0.55 ? Math.min(1, 1.8 * Math.sin(Math.PI * v / 1.1)) : v < 0.9 ? lerp(1, -0.45, sm((v - 0.55) / 0.35)) : lerp(-0.45, 0, (v - 0.9) / 0.1)) : 0.35 + 0.75 * up;
    return [base - Sx + 2 * Sx * sm(v) + (fore ? 2.5 * Math.sin(Math.PI * v) * v : 0), -up * lift, f];
  };
  const fn = foot('fn', 30, 1), ff = foot('ff', 28, 1), hn = foot('hn', -37, 0), hf = foot('hf', -39, 0);
  const sF = Math.max(sup.fn, sup.ff), sH = Math.max(sup.hn, sup.hf), amp = trot ? 3.2 : 2.2;
  const shY = -52 + low * 1.1 - (sF - 0.7) * amp, hipY = -50 + low - (sH - 0.7) * amp * 0.9;
  return { ...STAND3, hip: [-34, hipY], sh: [30, shY], arch: 3.5 + (sF - sH) * 0.6,
    head: [54 + (o.headX || 0) + sF * 0.8, -72 + low * 1.3 + (shY + 52 - low * 1.1) * 0.35 + (o.headY || 0)], hr: (o.hr || 0) + (sF - 0.7) * 0.025,
    fn, ff, hn, hf, sb: 1.2 + 2.6 * sF, hb: 0.8 + 1.6 * sH,
    tail: o.tail || (trot ? [-2.3, 0.08, 0.1, 3, 0] : [-1.75, 0.12, 0.06, 1.6, 0]), eye: o.eye ?? 1, ear: o.ear || 0 };
}
function walkCyc3(dist, s, trot) { return dist / ((trot ? 34 / 0.45 : 27 / 0.64) * s * SPX); }
/* Galloping lope (transverse sequence: far-hind, near-hind, near-fore, far-fore) with one gathered suspension.
   The spine stays almost the same length (±11%): extension is shown by the back flattening and the legs reaching,
   not by stretching the body. GLC = stride per cycle in pose units; drive it with gallopCyc3 so stance feet stay put. */
const GLC = 100;
function gallopPose3(cyc) {
  const u = mod(cyc, 1), d = 0.38;
  const bump = (c0, w) => { const x = mod(u - c0 + 0.5, 1) - 0.5; return Math.exp(-(x * x) / (w * w)); };
  const w0 = mod(u - 0.92, 1), e = w0 < 0.46 ? sm(w0 / 0.46) : 1 - sm((w0 - 0.46) / 0.54);
  const foot = (t0, xs, fore) => {
    const v = mod(u - t0, 1);
    if (v < d) return [xs - GLC * v, 0, fore ? 0 : 0.5 * (v / d)];
    const w = (v - d) / (1 - d), xl = xs - GLC * d;
    if (fore) {
      const x = w < 0.3 ? lerp(xl, xl - 3, w / 0.3) : lerp(xl - 3, xs, sm((w - 0.3) / 0.7)) + 7 * Math.sin(Math.PI * clamp((w - 0.45) / 0.55)) ;
      const y = -19 * Math.pow(Math.sin(Math.PI * Math.min(1, w * 1.05)), 0.8);
      const f = w < 0.5 ? 1 : w < 0.86 ? lerp(1, -1, sm((w - 0.5) / 0.36)) : lerp(-1, 0, (w - 0.86) / 0.14);
      return [x, y, f];
    }
    const y = -15 * Math.pow(Math.sin(Math.PI * w), 0.7);
    return [lerp(xl, xs, sm(w)), y, 0.5 + 1.2 * Math.sin(Math.PI * Math.min(1, w * 1.15))];
  };
  const hf = foot(0.0, -17, 0), hn = foot(0.08, -19, 0), fn = foot(0.40, 54, 1), ff = foot(0.48, 52, 1);
  const L = lerp(55, 67, e), cx = -1 + 2 * e;
  const yC = -47 - 6 * bump(0.93, 0.08) + 2.2 * bump(0.2, 0.1) + 2.2 * bump(0.63, 0.1);
  const pitch = 4.5 * Math.sin(TAU * (u - 0.08));
  const hip = [cx - L / 2, yC + pitch * 0.5 + 1], sh = [cx + L / 2, yC - pitch * 0.5 - 2];
  return { ...STAND3, g: lerp(1.04, 0.96, e), hip, sh, arch: lerp(10, -1.5, e),
    head: [sh[0] + 25, lerp(-66, -69, e) + (yC + 47) * 0.45 - pitch * 0.2], hr: -0.08 + 0.05 * Math.sin(TAU * (u - 0.3)),
    fn, ff, hn, hf, sb: 1 + 3 * Math.max(fn[1] === 0 ? 1 : 0, ff[1] === 0 ? 1 : 0) * (1 - e * 0.5), hb: 1 + 2 * (1 - e),
    tail: [-2.7 + 0.22 * Math.sin(TAU * (u - 0.25)), -0.035, 0.09, 0, 0], tailPh: -TAU * u, ear: 0.4 };
}
function gallopCyc3(dist, s) { return dist / (GLC * s * SPX); }
/* rig poses are authored long; they are drawn compressed along x by SPX for a compact, cat-like torso */
const SPX = 0.86;
function squashX(p) { if (p.sit) return p; const q = { ...p }; ['hip', 'sh', 'head'].forEach(k => q[k] = [p[k][0] * SPX, p[k][1]]); ['fn', 'ff', 'hn', 'hf'].forEach(k => q[k] = [p[k][0] * SPX, p[k][1], p[k][2]]); return q; }

function bodyGeom3(p) {
  const H = p.hip, Sh = p.sh, dx = Sh[0] - H[0], dy = Sh[1] - H[1], L = Math.hypot(dx, dy), t = [dx / L, dy / L], n = [t[1], -t[0]];
  const br = 1 + (p.br ? Math.sin(T * 1.7) * 0.03 : 0), g0 = p.g || 1, sb = p.sb ?? 2, hb = p.hb ?? 1.5;
  const sp = u => { const a = 4 * u * (1 - u) * (p.arch || 0); return [H[0] + dx * u + n[0] * a, H[1] + dy * u + n[1] * a]; };
  const at = (u, k) => { const q = sp(u); return [q[0] + n[0] * k, q[1] + n[1] * k]; };
  const top = u => (10.5 + 1.6 * Math.sin(clamp(u) * Math.PI) + 1.2 * sm(clamp((u - 0.7) / 0.3))) * g0 + sb * Math.exp(-Math.pow((u - 0.86) / 0.09, 2)) + hb * Math.exp(-Math.pow((u - 0.06) / 0.1, 2));
  const bot = u => (u < 0.48 ? lerp(12, 8.6, sm(clamp((u + 0.05) / 0.5))) : lerp(8.6, 17, sm(clamp((u - 0.48) / 0.47)))) * br * g0;
  const TP = [], BP = [];
  for (let u = -0.12; u <= 1.1001; u += 0.04) { TP.push(at(u, top(u))); BP.push(at(u, -bot(u))); }
  const front = [at(1.19, 8), at(1.24, -3), at(1.17, -13)], rear = [at(-0.18, -9), at(-0.21, 1), at(-0.17, 10)];
  return { H, Sh, t, n, L, sp, at, top, bot, TP, BP, pts: [...TP, ...front, ...BP.slice().reverse(), ...rear] };
}
function taper(a, b, wa, wb) { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  c.beginPath(); c.moveTo(a[0] + nx * wa / 2, a[1] + ny * wa / 2); c.lineTo(b[0] + nx * wb / 2, b[1] + ny * wb / 2); c.lineTo(b[0] - nx * wb / 2, b[1] - ny * wb / 2); c.lineTo(a[0] - nx * wa / 2, a[1] - ny * wa / 2); c.closePath(); c.fill();
  c.beginPath(); c.arc(a[0], a[1], wa / 2, 0, TAU); c.fill(); c.beginPath(); c.arc(b[0], b[1], wb / 2, 0, TAU); c.fill(); }
/* a slightly muscled limb segment: bulges toward `side` near the top */
function limbSeg(a, b, wa, wb, bulge) { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, m = [a[0] + dx * 0.35, a[1] + dy * 0.35], wm = (wa + wb) / 2 + (bulge || 0);
  c.beginPath(); c.moveTo(a[0] + nx * wa / 2, a[1] + ny * wa / 2); c.quadraticCurveTo(m[0] + nx * wm / 2 * 1.1, m[1] + ny * wm / 2 * 1.1, b[0] + nx * wb / 2, b[1] + ny * wb / 2);
  c.lineTo(b[0] - nx * wb / 2, b[1] - ny * wb / 2); c.quadraticCurveTo(m[0] - nx * wm / 2, m[1] - ny * wm / 2, a[0] - nx * wa / 2, a[1] - ny * wa / 2); c.closePath(); c.fill();
  c.beginPath(); c.arc(a[0], a[1], wa / 2, 0, TAU); c.fill(); c.beginPath(); c.arc(b[0], b[1], wb / 2, 0, TAU); c.fill(); }
function fore3(B, tg, part = 3) {
  const f = tg[2], toe = [tg[0], tg[1]];
  const pas = f >= 0 ? lp([3, 7], [-6, 4], Math.min(1, f)) : lp([3, 7], [9, 2], Math.min(1, -f));
  const root = [B.Sh[0] - B.t[0] * 3 - B.n[0] * 2, B.Sh[1] - B.t[1] * 3 - B.n[1] * 2];
  const W = reach(root, [toe[0] - pas[0], toe[1] - pas[1]], 40), el = ik(root, W, 19.5, 21, -1), T2 = [W[0] + pas[0], W[1] + pas[1]];
  const pa = Math.atan2(pas[1], pas[0]) - Math.PI / 2 + 0.3;
  if (part & 1) limbSeg(root, el, 14, 8.6, 2);
  if (part & 2) { limbSeg(el, W, 7.6, 5.4, 1); taper(W, T2, 5.3, 5); c.beginPath(); c.ellipse(T2[0] + 1.2, T2[1] - 2.3, 4.9, 3, pa, 0, TAU); c.fill(); }
  return { root, el, W, T2, pa };
}
function hind3(B, tg, part = 3) {
  const f = tg[2], toe = [tg[0], tg[1]];
  const off = f <= 1 ? lp([-5, -14], [-12, -8], clamp(f)) : lp([-12, -8], [-19, -3], clamp(f - 1));
  const root = [B.H[0] - B.t[0] * 1 - B.n[0] * 3, B.H[1] - B.t[1] * 1 - B.n[1] * 3];
  const hk = reach(root, [toe[0] + off[0], toe[1] + off[1]], 42), kn = ik(root, hk, 20.5, 22, 1);
  if (part & 1) limbSeg(root, kn, 14, 8.8, 1.5);
  if (part & 2) { limbSeg(kn, hk, 7.4, 5.2, 1); taper(hk, toe, 5.2, 4.9); c.beginPath(); c.ellipse(toe[0] + 1.5, toe[1] - 2.1, 5.1, 2.8, 0, 0, TAU); c.fill(); }
  return { root, kn, hk, toe };
}
function hind3Geom(B, tg) { const f = tg[2], toe = [tg[0], tg[1]], off = f <= 1 ? lp([-5, -14], [-12, -8], clamp(f)) : lp([-12, -8], [-19, -3], clamp(f - 1));
  const root = [B.H[0] - B.t[0] * 1 - B.n[0] * 3, B.H[1] - B.t[1] * 1 - B.n[1] * 3], hk = reach(root, [toe[0] + off[0], toe[1] + off[1]], 42); return { root, kn: ik(root, hk, 20.5, 22, 1), hk }; }
function tail3(B, p) {
  const [ba, curl, amp, fq, ground] = p.tail, base = B.at(-0.18, 6), pts = [base], ph = p.tailPh != null ? p.tailPh : T * fq; let a = ba;
  for (let k = 0; k < 12; k++) { a += curl + amp * Math.sin(ph - k * 0.55) * (0.3 + k / 12); const q = pts[pts.length - 1]; let nx = q[0] + Math.cos(a) * 6.6, ny = q[1] + Math.sin(a) * 6.6; if (ground) ny = Math.min(ny, -3); pts.push([nx, ny]); }
  const tw = p.tailW || 1; for (let k = 0; k < pts.length - 1; k++) taper(pts[k], pts[k + 1], (7.6 - k * 0.32) * tw, (7.3 - k * 0.32) * tw);
  return pts;
}
/* ---------- head: a small 3D model projected at any yaw ----------
   pose.turn = 0 → profile (looking along the body, +x), 1 → facing the camera. Head coords: x = across the face
   (viewer's right when facing the camera), y down, z forward (nose). Units match the old profile head. */
function headView(p) {
  const tn = clamp(p.turn || 0), ph = (1 - tn) * 0.45 * Math.PI, cs = Math.cos(ph), sn = Math.sin(ph);
  return { tn, cs, sn, pr: (x, y, z) => [z * sn + x * cs, y], d: (x, z) => z * cs - x * sn };
}
/* ear triangle for side s (±1): ear > 0 swivels back, < 0 pricks forward; earDown flattens it sideways */
function earGeo(H, p, s) {
  const e = p.ear || 0, dn = p.earDown || 0;
  const b1 = [s * 2.4, -11.2, 4.6], b2 = [s * 10.8, -6.8, -3.4], tp = [s * (8.4 + dn * 8), -24 + dn * 11 + Math.max(0, e) * 2.5, -0.6 - e * 7 - dn * 2];
  const dep = H.d(s * 7, 0), off = dep < 0 ? [-5 * (1 - H.tn), -1 * (1 - H.tn)] : [0, 0];   // the far ear peeks out behind in profile
  return { b1, b2, tp, pts: [b1, b2, tp].map(v => { const q = H.pr(...v); return [q[0] + off[0], q[1] + off[1]]; }), dep };
}
/* head outline pieces as one path (skull, cheeks + fur tufts, muzzle, chin) */
function headPath(H, p) {
  const sk = H.pr(0, -2, 0), w = Math.hypot(12 * H.cs, 11.5 * H.sn);
  c.beginPath(); c.ellipse(sk[0], sk[1], w, 11, 0, 0, TAU);
  [-1, 1].forEach(s => { const q = H.pr(s * 8, 3.4, 2.4); c.moveTo(q[0] + 6.6, q[1]); c.arc(q[0], q[1], 6.6, 0, TAU);
    const t1 = H.pr(s * 14.2, 4.6, -0.5), t2 = H.pr(s * 11.4, 0.6, 1.2), t3 = H.pr(s * 11.8, 8.4, 0.8); c.moveTo(t1[0], t1[1]); c.lineTo(t2[0], t2[1]); c.lineTo(t3[0], t3[1]); c.closePath(); });
  const mz = H.pr(0, 3.6, 10.2), ch = H.pr(0, 6.8, 7.6);
  c.moveTo(mz[0] + 5.6, mz[1]); c.arc(mz[0], mz[1], 5.6, 0, TAU); c.moveTo(ch[0] + 4.2, ch[1]); c.arc(ch[0], ch[1], 4.2, 0, TAU);
  if ((p.mouth || 0) > 0.05) { const j = H.pr(0, 6.4 + 3.6 * p.mouth, 9.6); c.moveTo(j[0] + 4.4, j[1]); c.arc(j[0], j[1], 4.4, 0, TAU); }
}
function headSil(p, P, hd, sc) {
  const H = headView(p);
  c.save(); c.translate(hd[0], hd[1]); c.rotate(p.hr || 0); c.scale(sc, sc); c.fillStyle = P.base;
  [-1, 1].map(s => earGeo(H, p, s)).sort((a, b) => a.dep - b.dep).forEach(e => poly(e.pts, P.base));
  headPath(H, p); c.fill('nonzero');
  c.restore();
}
/* Rig cat, drawn into CB (current context) in three depth groups so that each reads as its own value:
   far legs (dark, in shadow) -> tail + body (orange, cream underside) -> near legs (own layer, with a thin inner
   contour wherever they overlap the body or the far legs) -> neck and head. */
function drawRig(p, P, k, fx) {
  const B = bodyGeom3(p), main = c;
  c.fillStyle = P.far; const ffl = fore3(B, p.ff), fhl = hind3(B, p.hf);
  { const g5 = CB5.getContext('2d'); g5.setTransform(1, 0, 0, 1, 0, 0); g5.globalCompositeOperation = 'copy'; g5.drawImage(CB, 0, 0); g5.globalCompositeOperation = 'source-over'; } // far legs only
  c.fillStyle = P.tail || P.base; const tp = tail3(B, p);
  if (P.stripe) { c.save(); c.globalCompositeOperation = 'source-atop'; c.strokeStyle = P.stripe; c.lineCap = 'round'; c.lineWidth = 3.4;
    for (let j = 3; j < tp.length - 1; j += 2) { const q = tp[j], r = tp[j + 1], nx = -(r[1] - q[1]), ny = r[0] - q[0], l = Math.hypot(nx, ny) || 1; c.beginPath(); c.moveTo(q[0] + nx / l * 5, q[1] + ny / l * 5); c.lineTo(q[0] - nx / l * 5, q[1] - ny / l * 5); c.stroke(); }
    c.restore(); }
  c.fillStyle = P.base; smoothClosed(B.pts); c.fill();
  // the haunch belongs to the body silhouette: a rounded rump that follows the near thigh, no separate outline
  const hk0 = hind3Geom(B, p.hn), ha = Math.atan2(B.t[1], B.t[0]), sw = [(hk0.kn[0] - hk0.root[0]) * 0.12, (hk0.kn[1] - hk0.root[1]) * 0.08];
  const hc = [B.H[0] - B.t[0] * 4 + sw[0], B.H[1] - B.t[1] * 4 + sw[1]];
  const haunch = () => { c.beginPath(); c.ellipse(hc[0], hc[1], 13.5, 13.2 * (p.g || 1), ha, 0, TAU); };
  haunch(); c.fill(); hind3(B, p.hn, 1); fore3(B, p.fn, 1);
  c.save(); smoothClosed(B.pts); c.clip(); shadeBody3(B, p, P); c.restore();
  // near legs on their own layer
  const g3 = CB3.getContext('2d'); g3.setTransform(1, 0, 0, 1, 0, 0); g3.globalCompositeOperation = 'source-over'; g3.clearRect(0, 0, CBW, CBH); g3.setTransform(k * fx, 0, 0, k, COX, COY);
  c = g3; c.fillStyle = P.base;
  const hl = hind3(B, p.hn, 2);
  const fl = fore3(B, p.fn, 2);
  shadeLegs3(B, hl, fl, p, P);
  // inner contour: ring around the near lower legs, kept only where they cross a far leg (never against the body)
  const g4 = CB4.getContext('2d'), iw = Math.max(0.8, 0.95 * S);
  g4.setTransform(1, 0, 0, 1, 0, 0); g4.globalCompositeOperation = 'source-over'; g4.clearRect(0, 0, CBW, CBH);
  for (let a = 0; a < 8; a++) g4.drawImage(CB3, Math.cos(a * Math.PI / 4) * iw, Math.sin(a * Math.PI / 4) * iw);
  g4.globalCompositeOperation = 'source-in'; g4.fillStyle = P.inner; g4.fillRect(0, 0, CBW, CBH);
  g4.globalCompositeOperation = 'destination-out'; g4.drawImage(CB3, 0, 0);
  g4.globalCompositeOperation = 'destination-in'; g4.drawImage(CB5, 0, 0); g4.globalCompositeOperation = 'source-over';
  c = main; c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(CB4, 0, 0); c.drawImage(CB3, 0, 0); c.restore();
  // neck + head
  const nb = B.at(1.0, 2), hd = p.head, ne = [lerp(nb[0], hd[0], 0.8), lerp(nb[1], hd[1], 0.8)];
  c.fillStyle = P.base; taper(nb, ne, 19, 15);
  headSil(p, P, hd, HSR);
  // cream throat, clipped to the neck
  c.save(); const dx = ne[0] - nb[0], dy = ne[1] - nb[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  c.beginPath(); c.moveTo(nb[0] + nx * 9.5, nb[1] + ny * 9.5); c.lineTo(ne[0] + nx * 7.5, ne[1] + ny * 7.5); c.lineTo(ne[0] - nx * 7.5, ne[1] - ny * 7.5); c.lineTo(nb[0] - nx * 9.5, nb[1] - ny * 9.5); c.closePath(); c.clip();
  c.fillStyle = P.cream; const tq = [lerp(nb[0], ne[0], 0.4) + nx * 8, lerp(nb[1], ne[1], 0.4) + ny * 8]; c.beginPath(); c.ellipse(tq[0], tq[1], 10, 4, Math.atan2(dy, dx), 0, TAU); c.fill();
  c.restore();
  return { B, tp, hl, fl };
}
/* body shading, already clipped to the body: tabby stripes, cream underside, top light */
function shadeBody3(B, p, P) {
  if (P.stripe) {
    c.strokeStyle = P.stripe; c.lineCap = 'round';
    [-0.06, 0.16, 0.38, 0.6, 0.8].forEach((u, i) => { const j = hash(i * 7.1) - 0.5, a = B.at(u + j * 0.03, B.top(u) + 1), b2 = B.at(u + 0.06, 2), d = B.at(u + 0.015 + j * 0.03, -5 - j * 6);
      c.lineWidth = (i === 0 ? 4.6 : 3.4) + j * 1.4; c.beginPath(); c.moveTo(a[0], a[1]); c.quadraticCurveTo(b2[0], b2[1], d[0], d[1]); c.stroke(); });
    c.lineWidth = 2.2; const a = B.at(0.95, 8), b = B.at(0.2, 9); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
  }
  if (P.patches) P.patches.forEach(([u, k, rx, ry, col]) => { const q = B.at(u, k); c.fillStyle = col; c.beginPath(); c.ellipse(q[0], q[1], rx, ry, Math.atan2(B.t[1], B.t[0]), 0, TAU); c.fill(); });
  // cream underside with a furry edge
  c.fillStyle = P.cream; c.beginPath(); let first = true;
  for (let u = -0.3; u <= 1.32; u += 0.02) { const w = (5.5 + 4.5 * Math.sin(clamp(u + 0.05) * Math.PI) + (Math.floor(u * 50) % 2 ? 0.55 : -0.2) + (u > 0.95 ? (u - 0.95) * 30 : 0)) * sm((u - 0.12) / 0.22) - 0.5, q = B.at(u, -B.bot(clamp(u, -0.14, 1.1)) + w); first ? c.moveTo(q[0], q[1]) : c.lineTo(q[0], q[1]); first = false; }
  const e1 = B.at(1.35, -40), e0 = B.at(-0.35, -40); c.lineTo(e1[0], e1[1]); c.lineTo(e0[0], e0[1]); c.closePath(); c.fill();
  // underside turns away from the light
  c.fillStyle = P.creamS; c.globalAlpha = 0.7; c.beginPath(); first = true;
  for (let u = -0.3; u <= 1.32; u += 0.04) { const q = B.at(u, -B.bot(clamp(u, -0.14, 1.1)) + 2.2 * sm((u - 0.1) / 0.2)); first ? c.moveTo(q[0], q[1]) : c.lineTo(q[0], q[1]); first = false; }
  c.lineTo(e1[0], e1[1]); c.lineTo(e0[0], e0[1]); c.closePath(); c.fill(); c.globalAlpha = 1;
  // chest ruff
  c.fillStyle = P.cream; const ch = B.at(1.15, -8); c.beginPath(); c.ellipse(ch[0], ch[1], 6.5, 9, 0.2, 0, TAU); c.fill();
  // top light
  c.fillStyle = P.light; c.beginPath(); c.moveTo(B.TP[0][0] + B.n[0] * 10, B.TP[0][1] + B.n[1] * 10); B.TP.forEach(q => c.lineTo(q[0] - B.n[0] * 5, q[1] - B.n[1] * 5)); const lq = B.TP[B.TP.length - 1]; c.lineTo(lq[0] + B.n[0] * 10, lq[1] + B.n[1] * 10); c.closePath(); c.fill();
}
/* near-leg shading on CB3 (source-atop): stripes on thigh/forearm/shin, lighter paws, a shadow under the thigh */
function shadeLegs3(B, hl, fl, p, P) {
  c.save(); c.globalCompositeOperation = 'source-atop';
  if (P.stripe) {
    c.strokeStyle = P.stripe; c.lineCap = 'round'; c.globalAlpha = 0.6;
    const ring = (a, b, u, w) => { const q = [lerp(a[0], b[0], u), lerp(a[1], b[1], u)], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * w, ny = dx / L * w; c.beginPath(); c.moveTo(q[0] + nx, q[1] + ny); c.lineTo(q[0] - nx, q[1] - ny); c.stroke(); };
    c.lineWidth = 2.2; ring(fl.el, fl.W, 0.35, 6); ring(fl.el, fl.W, 0.75, 5); ring(hl.kn, hl.hk, 0.5, 6); c.globalAlpha = 1;
  }
  c.fillStyle = P.cream; c.beginPath(); c.ellipse(fl.T2[0] + 1.2, fl.T2[1] - 2, 5.6, 3.4, fl.pa, 0, TAU); c.fill();
  c.beginPath(); c.ellipse(hl.toe[0] + 1.5, hl.toe[1] - 2, 6, 3.2, 0, 0, TAU); c.fill();
  c.restore();
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
  headSil(p, P, hd, HSS);
  return { body, hd, pawPt };
}
function shadeSit(info, p, P) {
  c.save(); c.globalCompositeOperation = 'source-atop';
  c.fillStyle = P.shade; c.globalAlpha = 0.35; c.beginPath(); c.moveTo(-38, -27); c.quadraticCurveTo(-36, -8, -20, -4); c.lineTo(-40, -2); c.closePath(); c.fill();
  c.beginPath(); c.ellipse(info.hd[0] - 5, info.hd[1] + 12, 11, 5, 0.1, 0, TAU); c.fill(); c.globalAlpha = 1;
  if (P.stripe) {
    c.strokeStyle = P.stripe; c.lineCap = 'round'; c.lineWidth = 3.6;
    [[[-31, -40], [-22, -34], [-16, -25]], [[-25, -52], [-16, -46], [-9, -38]], [[-16, -62], [-8, -56], [-2, -48]], [[-36, -24], [-28, -18], [-22, -9]], [[-6, -66], [0, -60]]].forEach(s => { smoothOpen(s); c.stroke(); });
    c.lineWidth = 3.2; [[-38, -4], [-24, 2], [-6, 3], [10, 1]].forEach(([x, y]) => { c.beginPath(); c.moveTo(x, y - 4); c.lineTo(x + 1, y + 3); c.stroke(); });
    c.lineWidth = 2.4; [[-25, 10], [-31, 15]].forEach(([y, w]) => { c.beginPath(); c.moveTo(14 - 5, y); c.lineTo(14 + 5, y + 1); c.stroke(); });
  }
  if (P.sitPatches) P.sitPatches.forEach(([x, y, rx, ry, col]) => { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, rx, ry, -0.3, 0, TAU); c.fill(); });
  // cream chest, belly and paws
  c.fillStyle = P.cream; c.beginPath(); c.ellipse(14, -50, 7, 18, 0.05, 0, TAU); c.fill(); c.beginPath(); c.ellipse(4, -14, 9, 12, 0.2, 0, TAU); c.fill();
  c.beginPath(); c.ellipse(17.5, -2.5, 5.8, 3.4, 0, 0, TAU); c.fill(); if (info.pawPt) { c.beginPath(); c.ellipse(info.pawPt[0] + 1, info.pawPt[1], 5.8, 4, -0.6, 0, TAU); c.fill(); }
  c.fillStyle = P.light; c.beginPath(); c.moveTo(-40, -26); c.quadraticCurveTo(-34, -52, -6, -72); c.lineTo(-2, -66); c.quadraticCurveTo(-26, -48, -32, -24); c.closePath(); c.fill();
  c.restore();
}
/* ---------- expressions ----------
   All face parameters are numbers (or [x,y]) so expressions blend with lp(). Merge one into any pose:
   { ...pose, ...ex('happy') } or lp-blend two with exMix('curious', 'surprised', u). */
const FACE0 = { turn: 0, eye: 1, happy: 0, lid: 0, pupil: 0.55, look: [0, 0], ear: 0, earDown: 0, mouth: 0, smile: 0, frown: 0, tongue: 0, blush: 0, whisk: 0, sparkle: 0 };
const EXPR3 = {
  neutral: {},
  happy: { happy: 1, smile: 1, blush: 0.6, ear: -0.08, whisk: 0.2 },
  content: { eye: 0.32, smile: 0.6, blush: 0.3, ear: 0.05 },
  curious: { eye: 1.15, pupil: 0.95, look: [1, -0.4], ear: -0.28, whisk: 0.35 },
  surprised: { eye: 1.32, pupil: 0.3, ear: -0.32, whisk: 0.5 },
  delighted: { eye: 1.2, pupil: 1.25, sparkle: 1, smile: 0.8, blush: 0.7, ear: -0.15, whisk: 0.3 },
  focused: { eye: 0.85, lid: 0.7, pupil: 1.1, ear: -0.22, whisk: 0.45 },
  sleepy: { eye: 0.3, lid: -0.35, ear: 0.18, whisk: -0.3 },
  annoyed: { eye: 0.5, lid: 0.85, ear: 0.3, earDown: 0.5, frown: 0.8, whisk: -0.5 },
  sad: { eye: 0.9, lid: -1, look: [-0.4, 0.6], ear: 0.3, earDown: 0.6, frown: 0.5, whisk: -0.6 },
  meow: { eye: 0.75, mouth: 0.75, ear: -0.05, smile: 0.2 },
  blep: { eye: 0.95, tongue: 0.55, ear: -0.05 },
  scared: { eye: 1.3, pupil: 1.3, ear: 0.4, earDown: 1, whisk: -0.7, frown: 0.6 },
};
function ex(name, w = 1) { const e = { ...FACE0, ...EXPR3[name] }; return w >= 1 ? e : lp(FACE0, e, w); }
function exMix(a, b, u) { return lp(ex(a), ex(b), clamp(u)); }
/* face details drawn on top of the outlined silhouette (head-local coords; see headView) */
function eye3(x, y, rx, ry, inner, q, P, sil, H) {
  const open = Math.max(0, q.eye);
  c.save(); c.translate(x, y);
  if (q.happy > 0.5) { c.strokeStyle = P.line; c.lineWidth = 1.3; c.lineCap = 'round'; c.beginPath(); c.moveTo(-rx * 0.95, 0.8); c.quadraticCurveTo(0, -3.8, rx * 0.95, 0.8); c.stroke(); c.restore(); return; }
  if (open < 0.22) { c.strokeStyle = P.line; c.lineWidth = 1.15; c.lineCap = 'round'; c.beginPath(); c.moveTo(-rx, 0.2); c.quadraticCurveTo(0, 1.8 - q.lid, rx, 0.2); c.stroke(); c.restore(); return; }
  c.rotate(-0.1 * inner); c.scale(inner, 1);           // from here +x points toward the nose
  const eh = ry * Math.min(open, 1.35);
  c.save(); c.beginPath(); c.ellipse(0, 0, rx, eh, 0, 0, TAU); c.clip();
  const ig = c.createLinearGradient(0, -eh, 0, eh); ig.addColorStop(0, sil ? P.eye : mix(P.eye, '#000000', 0.3)); ig.addColorStop(0.6, P.eye); ig.addColorStop(1, sil ? P.eye : mix(P.eye, '#ffffff', 0.35)); c.fillStyle = ig; c.fillRect(-rx, -eh, 2 * rx, 2 * eh);
  const pw = (0.7 + 1.9 * q.pupil) * (rx / 3.9), ph = eh * (0.72 + 0.25 * Math.min(1, q.pupil)), lx = (0.7 * (1 - H.tn) + q.look[0] * 1.3 * inner) * (rx / 3.9), ly = q.look[1] * 0.9;
  c.fillStyle = '#140c08'; c.beginPath(); c.ellipse(lx, ly, Math.min(pw, rx * 0.95), ph, 0, 0, TAU); c.fill();
  if (q.shine > 0) { const sg = c.createRadialGradient(lx, ly, 0, lx, ly, rx * 1.2); sg.addColorStop(0, `rgba(235,255,190,${q.shine})`); sg.addColorStop(1, `rgba(160,230,140,${q.shine * 0.5})`); c.globalCompositeOperation = 'lighter'; c.fillStyle = sg; c.fillRect(-rx, -eh, 2 * rx, 2 * eh); c.globalCompositeOperation = 'source-over'; }
  c.fillStyle = 'rgba(255,255,255,0.95)'; c.beginPath(); c.arc(lx + 0.9 * inner, ly - eh * 0.38, 0.85 + q.sparkle * 0.35, 0, TAU); c.fill();
  if (q.sparkle > 0) { c.globalAlpha = q.sparkle; c.beginPath(); c.arc(lx - 0.8 * inner, ly + eh * 0.35, 0.55, 0, TAU); c.fill(); c.globalAlpha = 1; }
  // upper lid: lid > 0 = focused/cross (inner corner low), < 0 = sad (outer corner low)
  const lf = Math.max(0, q.lid) * eh * 0.9, lb = Math.max(0, -q.lid) * eh * 0.9;
  c.fillStyle = P.base; c.beginPath(); c.moveTo(-rx - 1, -eh - 2); c.lineTo(rx + 1, -eh - 2); c.lineTo(rx + 1, -eh + lf); c.lineTo(-rx - 1, -eh + lb); c.closePath(); c.fill();
  c.restore();
  c.strokeStyle = P.line; c.lineWidth = 1.1; c.beginPath();
  if (lf > 0.05 || lb > 0.05) { c.moveTo(-rx, -eh + lb * 0.95); c.lineTo(rx, -eh + lf * 0.95); } else c.ellipse(0, 0, rx, eh, 0, Math.PI * 1.02, Math.PI * 1.98);
  c.stroke(); c.lineWidth = 0.5; c.beginPath(); c.ellipse(0, 0, rx, eh, 0, Math.PI * 0.15, Math.PI * 0.85); c.stroke();
  c.restore();
}
function face3(P, p, sil) {
  const q = { ...FACE0 }; for (const k in p) if (p[k] != null) q[k] = p[k];
  const H = headView(q), m = q.mouth || 0, ES = 1.12, front = Math.cos((1 - H.tn) * 0.45 * Math.PI);
  // inner ears (pink, with a cream tuft) on the ears that face us
  [-1, 1].forEach(s => { const e = earGeo(H, q, s), vis = clamp(H.d(s * 0.35, 1) * 1.4); if (e.dep < -2.5 || vis < 0.08) return;
    const mid = [(e.b1[0] + e.b2[0]) / 2, (e.b1[1] + e.b2[1]) / 2, (e.b1[2] + e.b2[2]) / 2], L3 = (u, a, b) => a.map((v, i) => v + (b[i] - v) * u);
    const ip = [L3(0.22, e.b1, e.b2), L3(0.78, e.b1, e.b2), L3(0.78, mid, e.tp)].map(v => L3(0.12, v, mid)).map(v => H.pr(...v));
    c.save(); c.globalAlpha *= vis; poly(ip, P.ear);
    if (!sil) { c.strokeStyle = 'rgba(255,248,236,0.75)'; c.lineWidth = 0.6; const r0 = H.pr(...L3(0.5, e.b1, e.b2)); [-1, 0, 1].forEach(k => { const r1 = H.pr(...L3(0.45, mid, e.tp).map((v, i) => v + (i === 0 ? k * 1.3 : 0))); c.beginPath(); c.moveTo(r0[0] + k, r0[1]); c.quadraticCurveTo(r0[0] + k * 1.5, (r0[1] + r1[1]) / 2, r1[0], r1[1]); c.stroke(); }); }
    c.restore(); });
  if (!sil) {
    c.save(); headPath(H, q); c.clip('nonzero');
    if (P.headPatches) P.headPatches.forEach(([x, y, z, r, col]) => { if (H.d(x, z) > -6) { const a = H.pr(x, y, z); disc(a[0], a[1], r, col); } });
    if (P.stripe) { c.strokeStyle = P.stripe; c.lineCap = 'round'; c.lineWidth = 1.4;
      [-1, 0, 1].forEach(k => { if (H.d(k * 2.4, 7) < -1) return; const a = H.pr(k * 2.7, -12.4, 5.2), b = H.pr(k * 2.1, -8.2, 8.4); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); });
      [-1, 1].forEach(s => { if (H.d(s, 0.2) < 0) return; const a = H.pr(s * 9.6, -0.6, 3), b = H.pr(s * 12.2, 1.6, -1.5); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }); }
    const mz = H.pr(0, 3.8, 10.6), ch = H.pr(0, 6.6, 8.2); c.fillStyle = P.belly; c.beginPath(); c.ellipse(mz[0], mz[1], 5.2 * (0.8 + 0.2 * front) + 0.6, 4.6, 0, 0, TAU); c.moveTo(ch[0] + 3.6, ch[1]); c.arc(ch[0], ch[1], 3.6, 0, TAU); c.fill();
    if (q.blush > 0) [-1, 1].forEach(s => { if (H.d(s * 0.6, 0.8) <= 0) return; const b = H.pr(s * 7.2, 2.6, 8.2); c.fillStyle = `rgba(240,120,120,${0.42 * q.blush})`; c.beginPath(); c.ellipse(b[0], b[1], 3.6 * (0.5 + 0.5 * clamp(H.d(s * 0.6, 0.8))), 1.6, 0, 0, TAU); c.fill(); });
    c.restore();
  }
  // eyes
  const N = H.pr(0, 1.1, 15.6);
  [-1, 1].forEach(s => { const fw = H.d(s * 0.55, 0.83); if (fw < 0.05) return; const E = H.pr(s * 5.4, -2.6, 8.7), inner = N[0] >= E[0] ? 1 : -1;
    eye3(E[0], E[1], 3.9 * ES * (0.3 + 0.7 * fw), 2.9 * ES, inner, q, P, sil, H); });
  // mouth (open)
  if (m > 0.05) { const Mo = H.pr(0, 5.6 + 2.2 * m, 13.6), rx = lerp(2.2, 3.8, front), ry = 0.8 + 3.2 * m;
    c.fillStyle = '#5a1f1c'; c.beginPath(); c.ellipse(Mo[0], Mo[1], rx, ry, 0, 0, TAU); c.fill();
    c.fillStyle = '#e58a8f'; c.beginPath(); c.ellipse(Mo[0], Mo[1] + ry * 0.45, rx * 0.68, ry * 0.42, 0, 0, TAU); c.fill();
    c.fillStyle = '#ffffff'; [-1, 1].forEach(s => { if (front < 0.3 && s < 0) return; const fx = Mo[0] + s * rx * 0.55 * (front < 0.3 ? 0 : 1); poly([[fx - 0.6, Mo[1] - ry * 0.85], [fx + 0.6, Mo[1] - ry * 0.85], [fx, Mo[1] - ry * 0.4]], '#ffffff'); }); }
  if (q.tongue > 0) { const tg = H.pr(0, 4.8 + q.tongue, 15); c.fillStyle = '#e58a8f'; c.beginPath(); c.ellipse(tg[0], tg[1], 1.3 + q.tongue * 1.1, 1.2 + q.tongue * 0.9, 0.3 * (1 - front), 0, TAU); c.fill(); }
  // nose: profile wedge ↔ front inverted triangle
  const ns = lp([[-0.2, -1.6], [1.6, -0.6], [0.6, 1]], [[-1.9, -1.2], [1.9, -1.2], [0, 1]], front);
  poly(ns.map(v => [N[0] + v[0], N[1] + v[1]]), P.nose);
  // mouth line: philtrum + the two halves of the 'ω' (smile curls the corners up, frown pulls them down)
  c.strokeStyle = P.line; c.lineWidth = 0.75; c.lineCap = 'round';
  const nb = H.pr(0, 2.2, 15.4), ph = H.pr(0, 3.4, 15.1); c.beginPath(); c.moveTo(nb[0], nb[1]); c.lineTo(ph[0], ph[1]); c.stroke();
  [-1, 1].forEach(s => { if (H.d(s * 3.6, 13) < -1.4) return; const cp = H.pr(s * 1.6, 4.6, 14.4), en = H.pr(s * 3.7, 4.3 + q.frown * 1.4 - q.smile * 0.4, 12.8), cu = H.pr(s * 4.6, 3.2 + q.frown * 2, 12.2);
    c.beginPath(); c.moveTo(ph[0], ph[1]); c.quadraticCurveTo(cp[0], cp[1], en[0], en[1]); if (q.smile > 0.05) c.quadraticCurveTo(lerp(en[0], cu[0], 0.5), en[1] + 0.2, lerp(en[0], cu[0], 0.9), en[1] - 1.3 * q.smile); c.stroke(); });
  // whiskers: forward/up when interested, drooping when down
  [-1, 1].forEach(s => { const far = H.d(s, 0.5) < 0; c.strokeStyle = sil ? `rgba(255,220,180,${far ? 0.15 : 0.35})` : `rgba(255,252,245,${far ? 0.3 : 0.75})`; c.lineWidth = 0.45;
    for (let k = 0; k < 3; k++) { const b0 = H.pr(s * 3.6, 3.2 + k * 0.7, 12.6), cp = H.pr(s * 10, 1.6 + k * 1.4 - q.whisk * 1.4, 11.5), en = H.pr(s * 17.5, 0.6 + k * 2.7 - q.whisk * 3 + Math.sin(T * 1.5) * 0.3, 8.5 + q.whisk * 3);
      c.beginPath(); c.moveTo(b0[0], b0[1]); c.quadraticCurveTo(cp[0], cp[1], en[0], en[1]); c.stroke(); } });
}
/* comic marks above the head: '!', '?', 'z', 'note', 'heart', 'drop', 'spark'. u = 0..1 pop-in progress */
function emote3(kind, x, y, s, u, a = 1) {
  if (a <= 0 || u <= 0) return; const pop = u < 1 ? easeOut(u) * (1 + 0.25 * Math.sin(u * Math.PI)) : 1;
  c.save(); c.translate(x, y - 6 * s * easeOut(u)); c.scale(s * pop, s * pop); c.globalAlpha *= a * clamp(u * 3);
  c.lineJoin = 'round'; c.lineCap = 'round'; const ink = '#3a2418', paper = '#fff8ec';
  const stroke = (w) => { c.strokeStyle = ink; c.lineWidth = w; c.stroke(); };
  if (kind === '!') { c.beginPath(); c.moveTo(-2.4, -22); c.lineTo(2.4, -22); c.lineTo(1, -7); c.lineTo(-1, -7); c.closePath(); c.fillStyle = paper; c.fill(); stroke(1.3); c.beginPath(); c.arc(0, -2, 2, 0, TAU); c.fill(); stroke(1.3); }
  else if (kind === '?') { c.beginPath(); c.moveTo(-5, -16); c.quadraticCurveTo(-5, -23, 0, -23); c.quadraticCurveTo(5.5, -23, 5, -17); c.quadraticCurveTo(4.5, -13, 0.5, -11.5); c.lineTo(0.5, -8); c.strokeStyle = ink; c.lineWidth = 4.6; c.stroke(); c.strokeStyle = paper; c.lineWidth = 2.2; c.stroke(); c.beginPath(); c.arc(0.5, -3, 1.9, 0, TAU); c.fillStyle = paper; c.fill(); stroke(1.2); }
  else if (kind === 'z') { [[0, 0, 1], [7, -9, 0.75], [12, -16, 0.55]].forEach(([dx, dy, k], i) => { const ph = clamp(u * 3 - i); if (ph <= 0) return; c.save(); c.translate(dx, dy - 3 * Math.sin(T * 2 + i)); c.scale(k, k); c.globalAlpha *= ph; c.beginPath(); c.moveTo(-4, -8); c.lineTo(4, -8); c.lineTo(-4, 0); c.lineTo(4, 0); c.strokeStyle = ink; c.lineWidth = 4; c.stroke(); c.strokeStyle = paper; c.lineWidth = 1.8; c.stroke(); c.restore(); }); }
  else if (kind === 'note') { c.translate(Math.sin(T * 3) * 2, 0); c.beginPath(); c.moveTo(1.5, -4); c.lineTo(1.5, -20); c.quadraticCurveTo(6, -17, 8, -12); c.strokeStyle = ink; c.lineWidth = 1.6; c.stroke(); c.beginPath(); c.ellipse(-1.5, -4, 3.4, 2.5, -0.4, 0, TAU); c.fillStyle = ink; c.fill(); }
  else if (kind === 'heart') { c.translate(0, -12); c.beginPath(); c.moveTo(0, 5); c.bezierCurveTo(-8, -1, -5, -9, 0, -4.5); c.bezierCurveTo(5, -9, 8, -1, 0, 5); c.fillStyle = '#ef7a86'; c.fill(); stroke(1.1); }
  else if (kind === 'drop') { c.translate(-10, -6); c.beginPath(); c.moveTo(0, -7); c.quadraticCurveTo(4.5, -1, 0, 2.5); c.quadraticCurveTo(-4.5, -1, 0, -7); c.fillStyle = '#bfe4ff'; c.fill(); stroke(1.1); }
  else if (kind === 'spark') { [[-12, -6, 0.8], [10, -12, 1], [2, -20, 0.6]].forEach(([dx, dy, k], i) => { const tw = 0.7 + 0.3 * Math.sin(T * 7 + i * 2); c.save(); c.translate(dx, dy); c.scale(k * tw, k * tw); c.beginPath(); for (let j = 0; j < 8; j++) { const r = j % 2 ? 1.4 : 5, an = j * Math.PI / 4; j ? c.lineTo(Math.cos(an) * r, Math.sin(an) * r) : c.moveTo(r, 0); } c.closePath(); c.fillStyle = '#fff3b8'; c.fill(); c.strokeStyle = ink; c.lineWidth = 0.9; c.stroke(); c.restore(); }); }
  c.restore();
}
function drawCat3(o) {
  cbufs(); const P = o.sil ? S3 : (o.coat ? COATS[o.coat] : C3), p = squashX(o.pose), k = S * o.s, fx = o.face || 1;
  const g = CB.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, CBW, CBH);
  g.setTransform(k * fx, 0, 0, k, COX, COY);
  const prev = c; c = g;
  if (p.sit) { const info = silSit(p, P); shadeSit(info, p, P); } else drawRig(p, P, k, fx);
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
  const hp = p.sit ? [8, -82 - Math.sin(T * 1.7) * 0.6] : p.head, fp = (p.eye ?? 1) > 0.3 && !p.happy && !o.noBlink && blinkAt(T, (o.bseed || 0) + 0.37) ? { ...p, eye: 0 } : p;
  c.save(); c.translate(hp[0], hp[1]); c.rotate(p.hr || 0); c.scale(p.sit ? HSS : HSR, p.sit ? HSS : HSR); face3(P, fp, o.sil); c.restore();
  c = prev; g2.setTransform(1, 0, 0, 1, 0, 0);
  // composite into scene
  c.save(); c.translate(o.x, o.y);
  if (o.shadow !== false) { c.save(); c.scale(o.s, o.s); c.translate(p.hip ? (p.hip[0] + p.sh[0]) / 2 * (o.face || 1) : -8 * (o.face || 1), 0); catShadow(p.hip ? Math.max(30, Math.abs(p.sh[0] - p.hip[0]) * 0.8 + 18) : 44, o.shadowA ?? 0.32); c.restore(); }
  c.drawImage(CB2, -COX / S, -COY / S, CBW / S, CBH / S);
  if (o.emote && c.getTransform().d > 0) { const e = o.emote; emote3(e.k, (hp[0] - 2) * o.s * fx, (hp[1] - 16) * o.s, o.s * (e.s || 1), e.u ?? 1, e.a ?? 1); }
  c.restore();
}
