/* v4 per-scene cat choreography (landmark scenes L0–L22). Each scene is a small story told in 3–5 beats: the cat
   notices something in the scene, reacts (expression + optional comic mark), interacts with it, then settles.
   Timing is in scene-local seconds (lt); props the cat touches are drawn here so they stay in sync with it. */
function sit3(lt, o = {}) { return { ...SITP, ...o }; }
/* grooming: sitting cat turns its head back over the shoulder and licks its flank with long tongue strokes */
function groom3(lt, t0, t1, o = {}) { const u = sm((lt - t0) / 0.5) * (1 - sm((lt - t1 + 0.5) / 0.5)), lick = Math.max(0, Math.sin((lt - t0) * 7)), stroke = Math.sin((lt - t0) * 7 - 0.6);
  return { ...ex('content'), ...o, sit: 1, ts: o.ts ?? 1.1, eye: u > 0.5 ? 0 : undefined, turn: 2 * u, hdx: -17 * u, hdy: (17 + stroke * 2.5) * u, hr: (0.55 + stroke * 0.12) * u, tongue: u > 0.6 ? 0.25 + 0.75 * lick : 0 }; }
function cross(qa, qb, u) { if (u <= 0) return drawCat3(qa); if (u >= 1) return drawCat3(qb); c.save(); c.globalAlpha *= 1 - u; drawCat3({ ...qa, shadow: false, emote: null }); c.restore(); c.save(); c.globalAlpha *= u; drawCat3(qb); c.restore(); }
function seqWalk(q, x0, sp, t, o = {}) { q.x = x0 + t * sp; q.pose = walkPose3(walkCyc3(t * sp, q.s, o.trot), o); return q; }
/* expression timeline: [[t0, 'name'], [t1, 'name2'], …] with short cross-fades */
function exSeq(lt, seq, d = 0.25) {
  let i = 0; while (i < seq.length - 1 && lt >= seq[i + 1][0]) i++;
  const cur = ex(seq[i][1]);
  return i > 0 && lt < seq[i][0] + d ? lp(ex(seq[i - 1][1]), cur, sm((lt - seq[i][0]) / d)) : cur;
}
/* comic marks: [[t0, t1, kind, scale?], …] */
function emo(q, lt, list) { for (const [t0, t1, k, sc] of list) if (lt >= t0 && lt < t1) q.emote = { k, u: clamp((lt - t0) / 0.35), a: 1 - sm((lt - t1 + 0.3) / 0.3), s: sc || 1 }; }
function emoAt(lt, list) { const q = {}; emo(q, lt, list); return q.emote; }
/* head turned toward the camera: [[t0, t1, amount], …] with 0.3 s ramps */
function turnAt(lt, list) { let v = 0; for (const [t0, t1, k] of list) v = Math.max(v, (k ?? 1) * sm((lt - t0) / 0.3) * (1 - sm((lt - t1 + 0.3) / 0.3))); return v; }
const mirrored = () => c.getTransform().d < 0;
/* world position of the nose tip (for props that land on the cat) */
function noseW(q) { const p = q.pose, f = q.face || 1, hs = p.sit ? HSS : HSR, h = p.sit ? [8 + (p.hdx || 0), -82 + (p.hdy || 0)] : headPos3(p), a = p.hr || 0, n = headView(p).pr(0, 0.8, 13.9);
  return [q.x + f * q.s * (h[0] + hs * (Math.cos(a) * n[0] - Math.sin(a) * n[1])), q.y + q.s * (h[1] + hs * (Math.sin(a) * n[0] + Math.cos(a) * n[1]))]; }
function pawW(q, k = 'fn') { const p = q.pose, f = q.face || 1; return [q.x + f * q.s * p[k][0] * (p.sit ? 1 : SPX), q.y + q.s * p[k][1] * (p.sit ? 1 : SPY)]; }
/* jump from a to b ([x, y] ground points): 0.22 s crouch before t0, flight t0..t1, 0.25 s landing after */
function jumpArc(q, lt, t0, t1, a, b, h) {
  const u = clamp((lt - t0) / (t1 - t0)); h = h ?? (22 + Math.max(0, a[1] - b[1]) * 0.35);
  if (lt < t0) { q.x = a[0]; q.y = a[1]; q.pose = lp(STAND3, CROUCH3, sm((lt - (t0 - 0.22)) / 0.22)); }
  else if (lt < t1) { q.x = lerp(a[0], b[0], u); q.y = lerp(a[1], b[1], u) - Math.sin(u * Math.PI) * h; q.pose = u < 0.6 ? lp(CROUCH3, LEAP3, sm(u / 0.35)) : lp(LEAP3, LAND3, sm((u - 0.6) / 0.4)); q.shadow = false; }
  else { q.x = b[0]; q.y = b[1]; q.pose = lp(LAND3, STAND3, sm((lt - t1) / 0.25)); }
  return q;
}
const bumpT = (t, a, b) => Math.sin(Math.PI * clamp((t - a) / (b - a)));

/* ---------- props ---------- */
function gull(x, y, s, o = {}) {
  c.save(); c.translate(x, y); c.scale(s * (o.face || 1), s);
  if (o.fly == null) {
    const bob = Math.sin(T * 3) * 0.6; line(-2, 0, -2.5, -8, '#e4a54a', 1.4); line(2.5, 0, 2, -8, '#e4a54a', 1.4);
    poly([[-11, -14], [-21, -17], [-20, -11]], '#2b2b2e'); oval(0, -14, 12.5, 7, -0.12, '#f5f4ef'); oval(-3, -15.5, 10.5, 4.6, -0.2, '#9aa4ad');
    c.save(); c.translate(9.5, -21 + bob); disc(0, 0, 5.4, '#f8f8f4'); poly([[4, 0], [11, 1.5], [4, 2.4]], '#f0b030'); disc(1.6, -1.4, 0.9, '#222'); c.restore();
  } else {
    const f = Math.sin(o.fly); oval(0, 0, 12, 5, -0.2, '#f5f4ef'); disc(10, -4, 4.8, '#f8f8f4'); poly([[14, -4], [20, -2.5], [14, -2]], '#f0b030'); poly([[-10, 0], [-19, -3], [-17, 3]], '#2b2b2e');
    c.fillStyle = '#c3cbd2'; c.beginPath(); c.moveTo(4, -3); c.quadraticCurveTo(-2, -3 - 16 * f, -18, -4 - 22 * f); c.quadraticCurveTo(-6, -2 - 6 * f, -6, -1); c.closePath(); c.fill();
    poly([[-18, -4 - 22 * f], [-13, -3 - 16 * f], [-15, -1 - 19 * f]], '#2b2b2e');
  }
  c.restore();
}
function crab(x, y, s, t, o = {}) {
  c.save(); c.translate(x, y); c.scale(s * (o.face || 1), s); const col = o.col || '#d9573a', wv = o.wave || 0;
  c.strokeStyle = mix(col, '#000000', 0.25); c.lineWidth = 1.3; c.lineCap = 'round';
  for (let k = 0; k < 3; k++) for (const sd of [-1, 1]) { const ph = Math.sin(t * 18 + k * 2 + sd) * 1.5; c.beginPath(); c.moveTo(sd * 4, -5); c.lineTo(sd * (9 + k * 2), -7 + ph); c.lineTo(sd * (11 + k * 2.5), 0); c.stroke(); }
  oval(0, -6, 9, 5.5, 0, col); oval(-1, -8, 6, 2.5, 0, 'rgba(255,255,255,0.2)');
  line(-3, -10, -3.5, -15, '#3a2a24', 1.1); line(3, -10, 3.5, -15, '#3a2a24', 1.1); disc(-3.5, -15.5, 1.4, '#1a1412'); disc(3.5, -15.5, 1.4, '#1a1412');
  c.save(); c.translate(9, -9); c.rotate(-0.4 - wv * 0.9); oval(4, -1, 5, 3.4, 0, mix(col, '#ffffff', 0.15)); poly([[7, -3], [11, -5 - wv * 2], [9, -1]], mix(col, '#ffffff', 0.15)); c.restore();
  c.restore();
}
function koi(x, y, s, ang, f = 1) {
  c.save(); c.translate(x, y); c.scale(f, 1); c.rotate(ang); c.scale(s, s);
  poly([[-14, 0], [-22, -6], [-20, 0], [-22, 6]], '#f08a3a'); oval(0, 0, 15, 5.5, 0, '#fbf3e8'); oval(3, -1.5, 7, 3.6, 0.2, '#ee6a2a'); oval(-7, 1, 4, 2.4, 0, '#ee6a2a');
  poly([[-2, -5], [4, -9], [6, -4]], '#f4a060'); disc(11, -1.2, 0.9, '#222'); c.restore();
}
function dragonfly(x, y, s, t, f = 1) {
  c.save(); c.translate(x, y); c.scale(s * f, s); const fl = 0.6 + 0.4 * Math.sin(t * 60);
  c.fillStyle = 'rgba(220,240,255,0.55)'; c.strokeStyle = 'rgba(80,110,130,0.6)'; c.lineWidth = 0.5;
  [[-1, -2, 9 * fl, -0.25], [-2.5, -2, 8 * fl, -0.5], [-1, 1, 8 * fl, 0.25], [-2.5, 1, 7 * fl, 0.5]].forEach(([wx, wy, l, a]) => { c.save(); c.translate(wx, wy); c.rotate(a + Math.PI / 2 * Math.sign(wy) * 0.9); c.beginPath(); c.ellipse(l / 2, 0, l / 2, 1.6, 0, 0, TAU); c.fill(); c.stroke(); c.restore(); });
  line(-14, 0, 0, 0, '#2f7a8c', 1.6); disc(1.5, 0, 2.2, '#2f6070'); disc(2.6, -0.8, 0.9, '#9fe0ff'); c.restore();
}
function blossom(x, y, s, rot) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  for (let k = 0; k < 5; k++) { c.save(); c.rotate(k * TAU / 5); oval(0, -3.2, 2.2, 3.2, 0, '#fffaf2'); c.restore(); }
  disc(0, 0, 1.4, '#e8b04a'); disc(0, 0, 0.6, '#c0603a'); c.restore();
}
function persimmon(x, y, r, rot) {
  c.save(); c.translate(x, y); c.rotate(rot);
  const g = c.createRadialGradient(-r * 0.35, -r * 0.35, 0, 0, 0, r); g.addColorStop(0, '#f7b55a'); g.addColorStop(0.7, '#d9742a'); g.addColorStop(1, '#a24e1c');
  c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, r, r * 0.9, 0, 0, TAU); c.fill();
  for (let k = 0; k < 4; k++) { c.save(); c.rotate(k * TAU / 4); poly([[0, -r * 0.75], [r * 0.25, -r * 1.05], [-r * 0.25, -r * 1.05]], '#6b5a2a'); c.restore(); }
  disc(0, -r * 0.9, r * 0.18, '#4e3f1c'); c.restore();
}
function ripple(x, y, u, rgb, s = 1, n = 3) {
  for (let k = 0; k < n; k++) { const v = u * 1.4 - k * 0.22; if (v <= 0 || v > 1) continue;
    c.strokeStyle = `rgba(${rgb},${0.7 * (1 - v)})`; c.lineWidth = 1.4 * s; c.beginPath(); c.ellipse(x, y, (6 + 46 * v) * s, (1.5 + 9 * v) * s, 0, 0, TAU); c.stroke(); }
}
function puff(x, y, u, s = 1, col = '242,240,234') {
  const r = rng(Math.floor(x));
  for (let k = 0; k < 7; k++) { const v = clamp(u * 1.2 - k * 0.05), a = (1 - v) * 0.7; if (a <= 0) continue; const dx = (r() - 0.5) * 30 * v, dy = -60 * v - r() * 20 * v;
    c.fillStyle = `rgba(${col},${a})`; c.beginPath(); c.arc(x + dx * s, y + dy * s, (6 + 18 * v) * s * (0.7 + r() * 0.5), 0, TAU); c.fill(); }
}

function bicycle(x, y, s, col = '#3f8f8a') {
  c.save(); c.translate(x, y); c.scale(s, s); c.lineCap = 'round'; c.lineJoin = 'round';
  [[-26, -13], [26, -13]].forEach(([wx, wy]) => { c.strokeStyle = '#2b2b2e'; c.lineWidth = 2.6; c.beginPath(); c.arc(wx, wy, 13, 0, TAU); c.stroke(); c.strokeStyle = 'rgba(80,80,85,0.6)'; c.lineWidth = 0.6; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; line(wx, wy, wx + Math.cos(a) * 12, wy + Math.sin(a) * 12, 'rgba(90,90,95,0.6)', 0.6); } disc(wx, wy, 1.6, '#555555'); });
  c.strokeStyle = col; c.lineWidth = 2.8; c.beginPath(); c.moveTo(-26, -13); c.lineTo(-6, -13); c.lineTo(-12, -34); c.lineTo(-26, -13); c.moveTo(-6, -13); c.lineTo(18, -34); c.lineTo(-12, -34); c.moveTo(26, -13); c.lineTo(18, -34); c.lineTo(16, -42); c.stroke();
  c.lineWidth = 2.2; c.strokeStyle = '#2b2b2e'; line(10, -44, 24, -44, '#2b2b2e', 2.2); oval(-13, -37, 7, 2.2, 0, '#3a2a24');
  c.restore();
}
function basket(x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); poly([[-11, -16], [11, -16], [9, 0], [-9, 0]], '#b8894e'); c.strokeStyle = 'rgba(90,60,30,0.6)'; c.lineWidth = 0.8; for (let k = 1; k < 4; k++) line(-11 + k * 0.5, -16 + k * 4, 11 - k * 0.5, -16 + k * 4, 'rgba(90,60,30,0.6)', 0.8); c.restore(); }
function paraglider(x, y, s, lt) {
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(lt * 0.8) * 0.05);
  c.fillStyle = '#d9573a'; c.beginPath(); c.ellipse(0, 0, 46, 13, 0, Math.PI, 0); c.ellipse(0, 0, 46, 6, 0, 0, Math.PI, true); c.fill();
  c.fillStyle = '#f2c14e'; c.beginPath(); c.ellipse(0, 0, 18, 12.4, 0, Math.PI, 0); c.ellipse(0, 0, 18, 5, 0, 0, Math.PI, true); c.fill();
  c.strokeStyle = 'rgba(40,30,40,0.6)'; c.lineWidth = 0.6; [-42, -22, 0, 22, 42].forEach(px => line(px, 2, 0, 46, 'rgba(40,30,40,0.6)', 0.6));
  c.restore();
}
/* thought bubble with the friends met along the way (ending) */
function dreamBubble(x, y, s, u) {
  if (u <= 0) return; c.save(); c.globalAlpha *= clamp(u * 2);
  [[x + 6, y + 30, 3], [x + 14, y + 16, 5]].forEach(([bx, by, r]) => disc(bx, by, r * s, 'rgba(255,250,240,0.85)'));
  const cx = x + 70 * s, cy = y - 40 * s; c.fillStyle = 'rgba(255,250,240,0.9)'; c.beginPath();
  [[-60, 6, 30], [-28, -16, 34], [12, -22, 36], [52, -10, 32], [70, 14, 26], [30, 22, 32], [-14, 24, 32], [-52, 22, 24]].forEach(([dx, dy, r]) => { c.moveTo(cx + (dx + r) * s, cy + dy * s); c.arc(cx + dx * s, cy + dy * s, r * s, 0, TAU); }); c.fill();
  ['black', 'white', 'grey', 'calico', 'tuxedo'].forEach((k, i) => { const P = COATS[k], pose = { ...ex('happy'), turn: 1, hr: Math.sin(T * 1.5 + i) * 0.08, ear: 0 }, hx = cx + (-58 + i * 29) * s, hy = cy + (6 - Math.sin(i / 4 * Math.PI) * 14) * s, hs = 0.95 * s;
    const pop = clamp(u * 5 - i * 0.6); if (pop <= 0) return; c.save(); c.translate(hx, hy); c.scale(hs * easeOut(pop), hs * easeOut(pop));
    c.save(); c.scale(1.08, 1.08); headSil(pose, { ...P, base: P.line }, [0, 0], 1); c.restore(); headSil(pose, P, [0, 0], 1); face3(P, pose, false); c.restore(); });
  c.restore();
}
function actCat(o) {
  const id = SC.sc.id || ('L' + SC.i), lt = SC.lt, ld = +id.slice(1);
  const F = { 1: 1.2, 2: 1.15, 3: 1.05, 4: 1.15, 5: 1.25, 6: 1.15, 7: 1.3, 8: 1.15, 9: 1.15, 11: 1.15, 12: 1.2, 13: 1.15, 14: 1.1, 15: 1.15, 16: 1.2, 17: 1.15 }[ld] || 1;
  let q = { ...o, s: o.s * F, bseed: ld }; delete q.pose;
  const s = q.s;
  switch (ld) {
    case 0: { // dawn on Xiangshan: dozing → ear twitch → wakes → yawn → stretch → walks off
      emo(q, lt, [[0.4, 2.5, 'z']]);
      if (lt < 5.4) { const y = sm((lt - 3.9) / 0.35) * (1 - sm((lt - 5.0) / 0.4)), wake = sm((lt - 2.5) / 0.5);
        q.pose = sit3(lt, { ...exSeq(lt, [[0, 'sleepy'], [2.6, 'neutral'], [3.7, 'sleepy']]), eye: lt < 2.5 ? 0 : (y > 0.3 ? 0 : undefined), hr: lerp(0.2 + Math.sin(lt * 1.3) * 0.03, -0.06, wake) + lerp(0, -0.5, y), mouth: y, ear: lt > 2.2 && lt < 2.45 ? -0.35 : (lt < 2.5 ? 0.15 : 0), ts: 1.1, turn: turnAt(lt, [[2.7, 3.8, 0.85]]) });
        return drawCat3(q); }
      const u = sm((lt - 5.4) / 0.35), st = sm((lt - 5.7) / 0.7) * (1 - sm((lt - 6.9) / 0.6));
      const qb = { ...q, x: q.x + 8, pose: { ...lp(STAND3, STRETCH3, st), ...ex('content') } }; if (lt > 7.2) { seqWalk(qb, q.x + 8, 32, lt - 7.2); Object.assign(qb.pose, ex('happy', 0.6)); }
      return cross({ ...q, pose: sit3(lt, { hr: -0.1 }) }, qb, u);
    }
    case 1: { // Jiufen: trots through the rain (grumpy), shakes off under the eaves — right next to a black cat sheltering there, who gets splashed.
      // Then both pat the puddle full of lantern reflections and look up at the red lanterns together.
      const stopT = 3.2, d = lt < stopT ? lt * 46 : stopT * 46 + (1 - Math.exp(-(lt - stopT) * 5)) * 9; q.x = 600 + d;
      const px = 600 + stopT * 46 + 9 + 74 * s, py = 614, ftap = bumpT(lt, 4.85, 5.2);
      const fq = { x: 905, y: 604, s, face: -1, coat: 'black', bseed: 11, rim: '255,160,90', pose: sit3(lt, { ...exSeq(lt, [[0, 'content'], [3.2, 'curious'], [3.65, 'annoyed'], [4.6, 'curious'], [5.4, 'delighted']]),
        hr: lt < 3.2 ? -0.25 + Math.sin(lt * 0.8) * 0.05 : lt < 3.65 ? 0.05 : lt < 4.5 ? 0.25 : lt < 5.6 ? 0.45 : lerp(0.45, -0.5, sm((lt - 5.6) / 0.4)), paw: ftap > 0.02 ? [lerp(16, 34, ftap), lerp(-10, -8, ftap), 1] : null, ts: 1.4 }) };
      emo(fq, lt, [[3.7, 4.5, 'drop'], [5.45, 6.4, 'note']]);
      q.before = () => { if (mirrored()) return; c.save(); c.beginPath(); c.ellipse(px, py, 64, 9, 0, 0, TAU); c.fillStyle = vg(py - 9, py + 9, [[0, 'rgba(70,40,48,0.9)'], [1, 'rgba(30,22,30,0.9)']]); c.fill(); c.clip(); glow(px + 14, py, 46, '255,80,45', 0.85 + 0.1 * Math.sin(T * 5)); glow(px - 26, py, 30, '255,150,80', 0.6); glow(px + 40, py, 20, '255,190,120', 0.5); c.globalAlpha = 0.85; oval(px + 14 + Math.sin(T * 1.6) * 2, py + 1, 7, 4, 0, '#ff6a40'); oval(px - 26, py + 1, 6, 3.4, 0, '#ff8a50'); c.globalAlpha = 1;
        line(px - 50, py - 4, px + 30, py - 4, 'rgba(255,210,170,0.3)', 1);
        if (lt > 5.1) ripple(px + 26, py, (lt - 5.1) / 1.1, '255,200,150', 0.7, 3); if (lt > 5.25) ripple(px - 14, py, (lt - 5.25) / 1.1, '255,200,150', 0.7, 4); c.restore(); drawCat3(fq); };
      if (lt < stopT) { q.pose = { ...walkPose3(walkCyc3(lt * 46, s, true), { trot: 1 }), ...ex('annoyed') }; break; }
      const u = lt - stopT - 0.4, sh = u > 0 && u < 0.8 ? Math.sin(u * 42) * 0.45 * (1 - u / 0.8) : 0;
      emo(q, lt, [[3.5, 4.4, 'drop'], [4.45, 5.1, '?'], [5.35, 6.4, 'spark']]);
      if (lt < 4.4) q.pose = { ...STAND3, ...ex('annoyed'), hr: sh, eye: Math.abs(sh) > 0.1 ? 0 : 0.5, ear: 0.3 + Math.abs(sh) * 0.8, hip: [-34, -50 + Math.abs(sh) * 4], tail: [-1.75, 0.12, 0.06 + Math.abs(sh) * 0.3, 8, 0] };
      else { const look = sm((lt - 4.4) / 0.3), tap = bumpT(lt, 4.95, 5.3), up = sm((lt - 5.7) / 0.4);
        q.pose = { ...STAND3, ...exSeq(lt, [[4.4, 'curious'], [5.3, 'surprised'], [5.75, 'delighted']]), head: [56, lerp(-72, -60, look * (1 - up))], hr: lerp(0, 0.5, look) * (1 - up) - up * 0.55,
          fn: [lerp(32, 52, tap), -tap * 12, tap * 0.8], sb: 2 + tap * 2 }; }
      if (u > 0 && u < 1.3) { const xx = q.x, yy = q.y; q.after = () => shakeDrops(xx + 40 * s, yy - 58 * s, s * 1.4, clamp(u / 1.3)); }
      break;
    }
    case 2: { // Keelung: a gull on the bollard — stalk, wiggle, pounce… it flies off, so the cat takes the bollard instead
      q.x = 250; q.y = 594; const gx = 451, gy = 562, go = lt - 3.1, top = [451, 563];
      q.after = () => { if (go < 0) gull(gx, gy, 0.95, { face: -1 }); else gull(gx + go * 150, gy - 14 - go * 120 + Math.sin(go * 3) * 6, 0.95, { fly: lt * 15 }); };
      emo(q, lt, [[0.4, 1.4, '!'], [3.8, 4.5, '?'], [5.25, 6.4, 'note']]);
      if (lt < 3.0) { const u = sm(lt / 0.7), wig = lt > 1.8 ? Math.sin(lt * 24) * 3 : 0; q.pose = { ...lp(STAND3, CROUCH3, u), ...exSeq(lt, [[0, 'curious'], [1.2, 'focused']]) }; q.pose.hip = [q.pose.hip[0] + wig, q.pose.hip[1] - Math.abs(wig) * 0.5]; q.pose.hr = -0.15 - lt * 0.02; q.pose.tail = [-2.95, -0.02, 0.2, 7, 0]; }
      else if (lt < 3.65) { const u = (lt - 3.0) / 0.65; q.pose = { ...lp(CROUCH3, LEAP3, sm(u * 2)), ...ex('focused'), ear: 0.3 }; q.x = 250 + u * 110; q.y = 594 - Math.sin(u * Math.PI) * 60; q.shadowA = 0.18; }
      else if (lt < 4.4) { const u = sm((lt - 3.65) / 0.25), lk = sm((lt - 3.8) / 0.4); q.pose = { ...lp(LAND3, { ...STAND3, hr: -0.6 * lk, head: [56, -74] }, u), ...exSeq(lt, [[3.65, 'surprised'], [4.1, 'sad']]), look: [0.6, -0.8] }; q.x = 360; }
      else if (lt < 5.25) { jumpArc(q, lt, 4.62, 5.0, [360, 594], top); Object.assign(q.pose, exSeq(lt, [[4.4, 'focused'], [5.0, 'happy']])); }
      else { const qa = { ...q, x: top[0], y: top[1], pose: { ...STAND3, ...ex('happy') } }; return cross(qa, { ...qa, x: top[0] - 4, shadow: false, pose: sit3(lt, { ...ex('content'), hr: -0.1, ts: 1.6, turn: turnAt(lt, [[5.4, 7, 0.9]]) }) }, sm((lt - 5.25) / 0.3)), q.after(); }
      break;
    }
    case 3: { // Yilan: a crab wanders up; one curious pat and it bolts — then back to washing, facing the sunrise
      const cx = lt < 2.2 ? lerp(640, 398, sm(lt / 2.2)) : lt < 2.85 ? 398 : 398 + (lt - 2.85) * 170, cy = 607 + (lt > 3.3 ? (lt - 3.3) * 14 : 0);
      q.after = () => { if (lt < 4.2) { c.save(); c.beginPath(); c.rect(cx - 40, 0, 80, 607); c.clip(); crab(cx, cy, 1.5, lt, { face: -1, col: '#a8483a', wave: lt > 2.2 && lt < 2.85 ? 0.5 + 0.5 * Math.sin(lt * 14) : 0 }); c.restore(); } };
      q.before = () => { if (mirrored()) return;   // Wai'ao is a surf beach with paragliders over the headland: two local cats are at it
        const sx = 1210 - lt * 75, sy = 492 + Math.sin(lt * 2.2) * 3;
        c.strokeStyle = 'rgba(255,235,215,0.75)'; c.lineWidth = 2; c.beginPath(); c.moveTo(sx + 10, sy + 2); c.quadraticCurveTo(sx + 60, sy - 6, sx + 120, sy + 4); c.stroke();
        oval(sx, sy + 1, 26, 3.6, -0.04, '#2c2433'); drawCat3({ x: sx + 2, y: sy - 1, s: 0.42, sil: true, rim: '255,175,120', face: -1, shadow: false, noBlink: true, pose: { ...lp(STAND3, CROUCH3, 0.45), hr: -0.1, tail: [-2.6, 0.05, 0.1, 3, 0] } });
        const gx = 470 + lt * 34, gy = 180 + Math.sin(lt * 0.9) * 6; paraglider(gx, gy, 0.8, lt); drawCat3({ x: gx + 2, y: gy + 52, s: 0.3, sil: true, rim: '255,175,120', shadow: false, noBlink: true, pose: sit3(lt, { hr: 0.2 }) }); };
      emo(q, lt, [[1.1, 2.2, '?'], [2.85, 3.6, '!']]);
      const tap = bumpT(lt, 2.45, 2.85), g = lt > 3.7 && lt < 5.0, a = g ? 0.5 + 0.5 * Math.sin((lt - 3.7) * 6) : 0;
      if (lt < 3.6) q.pose = sit3(lt, { ...exSeq(lt, [[0, 'neutral'], [1.0, 'curious'], [2.85, 'surprised']]), hr: lerp(-0.05, 0.42, sm((lt - 0.9) / 0.5)) * (1 - sm((lt - 3.0) / 0.5)), paw: tap > 0.02 ? [lerp(16, 33, tap), lerp(-6, -12, tap), 1] : null, look: [0.6, 0.5] });
      else if (g) q.pose = sit3(lt, { ...ex('content'), eye: 0, hr: 0.15 + a * 0.25, paw: [22 + a * 4, -86 + a * 8, 1] });
      else q.pose = sit3(lt, { ...ex('content'), hr: -0.12, ts: 1.4 });
      break;
    }
    case 4: { // Qingshui: tightrope along the railing, looks down — a long way down — wobbles, then carries on proudly
      const t = lt < 2.4 ? lt : lt < 3.8 ? 2.4 : lt - 1.4, d = t * 30; q.x = d; q.y = 498 + (q.x + 90) * 22 / 390 - 2;
      emo(q, lt, [[2.7, 3.7, 'drop'], [4.9, 6.2, 'note']]);
      const look = sm((lt - 2.4) / 0.4) * (1 - sm((lt - 3.4) / 0.4)), wob = lt > 2.8 && lt < 3.6 ? Math.sin(lt * 20) * (1 - (lt - 2.8) / 0.8) : 0;
      q.pose = lt >= 2.4 && lt < 3.8 ? { ...lp(walkPose3(walkCyc3(2.4 * 30, s)), { ...STAND3, hr: 0.55, head: [56, -60] }, look), ...exSeq(lt, [[2.4, 'surprised'], [2.75, 'scared']]), tail: [-1.75 + wob * 0.6, 0.12, 0.06, 1.6, 0] }
        : { ...walkPose3(walkCyc3(d, s), { tail: [-2.95, 0.04, 0.14, 1.4, 0], hr: 0.12 }), ...exSeq(lt, [[0, 'focused'], [3.8, 'neutral'], [4.6, 'happy']]) };
      q.x += wob * 2;
      break;
    }
    case 5: { // Taitung: cyclists rent bikes along Mr. Brown Avenue — a white cat waits by one. Both stalk the same butterfly,
      // pounce from opposite sides and bonk noses; the butterfly settles on our cat's nose and the two are friends.
      let bx = 640 + Math.sin(lt * 1.3) * 60 + lt * 22, by = 520 + Math.sin(lt * 2.7) * 25 - sm((lt - 4.2) / 1.5) * 110;
      emo(q, lt, [[1.7, 2.6, '!'], [4.5, 5.1, '!'], [5.5, 6.6, 'heart']]);
      if (lt < 2.4) { seqWalk(q, 250, 30, lt); Object.assign(q.pose, exSeq(lt, [[0, 'neutral'], [1.7, 'curious']])); }
      else if (lt < 3.8) { const u = sm((lt - 2.4) / 0.5); q.x = 250 + 72; q.pose = { ...lp(STAND3, CROUCH3, u), ...ex('focused') }; q.pose.hip = [q.pose.hip[0] + (lt > 3 ? Math.sin(lt * 24) * 3 : 0), q.pose.hip[1]]; q.pose.hr = -0.3; }
      else if (lt < 4.5) { const u = (lt - 3.8) / 0.7; q.pose = { ...lp(CROUCH3, LEAP3, sm(u * 1.6)), ...ex('focused') }; q.x = 322 + u * 130; q.y = 582 - Math.sin(u * Math.PI) * 80; q.shadowA = 0.15; }
      else { const u = sm((lt - 4.5) / 0.3), dn = sm((lt - 5.0) / 0.5), bk = bumpT(lt, 4.5, 4.9); q.pose = { ...lp(LAND3, { ...STAND3, hr: lerp(-0.2, -0.05, dn), head: [56, lerp(-74, -70, dn)] }, u), ...exSeq(lt, [[4.5, 'surprised'], [5.1, 'curious'], [5.45, 'delighted']]), look: [lerp(0.5, 1.1, dn), lerp(-0.4, 0.7, dn)], turn: turnAt(lt, [[5.5, 7, 0.6]]) }; q.x = 452 - bk * 6; }
      // the white cat
      const fq = { x: 700, y: 582, s, face: -1, coat: 'white', bseed: 5, shadowA: 0.25 };
      if (lt < 2.4) fq.pose = sit3(lt, { ...exSeq(lt, [[0, 'content'], [1.5, 'curious']]), hr: lt > 1.5 ? -0.3 : -0.05, ts: 1.3 });
      else if (lt < 3.8) { const w = lt > 3.0 ? Math.sin(lt * 26) * 3 : 0; fq.pose = { ...lp(STAND3, CROUCH3, sm((lt - 2.4) / 0.4)), ...ex('focused'), hr: -0.3 }; fq.pose.hip = [fq.pose.hip[0] + w, fq.pose.hip[1]]; }
      else if (lt < 4.5) { const u = (lt - 3.8) / 0.7; fq.pose = { ...lp(CROUCH3, LEAP3, sm(u * 1.6)), ...ex('focused') }; fq.x = 700 - u * 82; fq.y = 582 - Math.sin(u * Math.PI) * 50; fq.shadowA = 0.15; }
      else { const u = sm((lt - 4.5) / 0.3), bk = bumpT(lt, 4.5, 4.9); fq.pose = { ...lp(LAND3, { ...STAND3, hr: 0.05, head: [56, -70] }, u), ...exSeq(lt, [[4.5, 'surprised'], [5.2, 'curious'], [5.5, 'delighted']]), look: [1, 0.6] }; fq.x = 618 + bk * 6; }
      emo(fq, lt, [[1.5, 2.4, '?'], [4.5, 5.1, '!'], [5.7, 6.6, 'heart']]);
      if (lt > 4.6) { const n = noseW(q), v = sm((lt - 4.9) / 0.6); bx = lerp(bx, n[0] + 2, v); by = lerp(by, n[1] - 5, v); }
      const bt = lt > 5.5 ? 5.5 + (lt - 5.5) * 0.15 : lt;
      q.before = () => { bicycle(790, 590, 1.25); basket(822, 556, 1.25); };
      q.after = () => { if (lt > 2.3 && lt < 2.5) cross({ ...fq, pose: sit3(lt, { ...ex('curious'), hr: -0.3 }) }, { ...fq, pose: { ...STAND3, ...ex('focused') } }, (lt - 2.3) / 0.2); else drawCat3(fq); butterfly(bx, by, 1.3, bt); };
      break;
    }
    case 6: { // Eluanbi: a grey cat is already sitting on the cape watching the sun go down. Ours walks up, the lighthouse beam
      // sweeps over (!), it sits down beside the stranger and the two watch the sunset together.
      const f = x2 => 470 - 120 * sm((x2 - 520) / 500) - fbm1(x2 * 0.01 + 3) * 16, fx = 708;
      const fq = { x: fx, y: Math.min(f(fx), 560) + 2, s: s * 0.92, face: -1, sil: true, rim: '255,170,110', bseed: 6, shadow: false,
        pose: sit3(lt, { ...exSeq(lt, [[0, 'content'], [2.2, 'curious'], [4.4, 'happy'], [5.4, 'content']]), hr: lt > 2.2 && lt < 4.4 ? 0.12 : -0.15, ts: 1.0 }) };
      emo(fq, lt, [[2.2, 3.0, '?'], [4.5, 5.8, 'heart']]);
      emo(q, lt, [[3.05, 3.9, '!', 0.9]]);
      if (lt < 3.0) { seqWalk(q, 500, 40, lt); q.y = Math.min(f(q.x), 560) + 2; drawCat3(fq); return drawCat3(q); }
      const x = 500 + 3.0 * 40, lk = sm((lt - 3.0) / 0.35), qa = { ...q, x, y: Math.min(f(x), 560) + 2, pose: { ...STAND3, ...ex('surprised'), hr: -0.45 * lk, head: [56, -74] } };
      drawCat3(fq);
      return cross(qa, { ...qa, x: x - 4, face: -1, emote: null, pose: sit3(lt, { ...exSeq(lt, [[3.95, 'content'], [4.6, 'happy'], [5.4, 'content']]), hr: lt > 4.4 && lt < 5.3 ? 0.15 : -0.15, ts: 1.0 }) }, sm((lt - 3.95) / 0.3));
    }
    case 7: { // Lotus Pond: crosses the zigzag bridge, peers down — a koi leaps out right under its nose
      q.y = 548; const x0 = 330, xs = x0 + 3.8 * 28;
      emo(q, lt, [[3.9, 4.5, '?', 0.8], [4.6, 5.4, '!', 0.8], [5.5, 6.5, 'spark', 0.8]]);
      if (lt < 3.8) { seqWalk(q, x0, 28, lt); Object.assign(q.pose, ex('content', 0.6)); }
      else { const pr = sm((lt - 3.8) / 0.5), jump = bumpT(lt, 4.6, 5.05);
        q.x = xs - jump * 8; q.pose = { ...lp(lp(walkPose3(walkCyc3(3.8 * 28, s)), { ...STAND3, hr: 0.6, head: [56, -52], tail: [-1.6, 0.14, 0.12, 4, 0] }, pr), SCARED3, jump * 0.7), ...exSeq(lt, [[3.8, 'curious'], [4.6, 'scared'], [5.2, 'delighted']]) };
        q.y -= jump * 12; }
      q.y += (q.x - 300) / 460 * 42 - 1;
      const kt = (lt - 4.55) / 0.9;
      q.after = () => { if (kt > 0 && kt < 1) { const kx = xs + 92 - kt * 34, ky = 614 - Math.sin(kt * Math.PI) * 100; koi(kx, ky, 1.05, -Math.cos(kt * Math.PI) * 1.2, -1); }
        if (kt > 0) ripple(xs + 92, 614, kt * 0.8, '255,255,240', 0.8); if (kt > 1) ripple(xs + 58, 616, (kt - 1) * 0.9, '255,255,240', 0.8); };
      break;
    }
    case 8: { // Qimei: the Twin Hearts are where couples come for photos — a calico curls up against our cat; heads together,
      // they gaze at the two stone hearts and doze off side by side.
      const doze = sm((lt - 3.5) / 1.5), pp = { ...lp(LOAFT3, SLEEPT3, doze), ...exSeq(lt, [[0, 'content'], [3.4, 'sleepy']]) };
      pp.eye = doze > 0.5 ? 0 : (lt < 3.4 ? 0.35 : 0.3); pp.ear = Math.max(0, Math.sin(lt * 3.3)) > 0.97 ? 0.45 : pp.ear; pp.hr = (pp.hr || 0) + Math.sin(lt * 0.5) * 0.05;
      emo(q, lt, [[0.6, 2.4, 'heart'], [4.6, 7, 'z']]);
      q.pose = pp; q.y = 546; q.x = 220;
      const fd = sm((lt - 3.9) / 1.4), fp = { ...lp(LOAFT3, SLEEPT3, fd), ...exSeq(lt, [[0, 'happy'], [2.2, 'content'], [3.8, 'sleepy']]) };
      fp.eye = fd > 0.5 ? 0 : 0.4; fp.hr = (fp.hr || 0) + 0.12 + Math.sin(lt * 0.6 + 1) * 0.04; fp.head = [fp.head[0] + 2, fp.head[1] + 3];
      const fq = { x: 124, y: 538, s: s * 0.92, coat: 'calico', bseed: 8, pose: fp };
      emo(fq, lt, [[2.0, 3.6, 'heart'], [5.1, 7, 'z']]);
      q.before = () => drawCat3(fq); break;
    }
    case 9: { // Tainan: stops to look at its reflection in the salt pan, pats it, ripples — then trots off happy
      const walkD = Math.min(lt, 2.2) * 26, trD = Math.max(0, lt - 4.0) * 44; q.x = 300 + walkD + trD;
      emo(q, lt, [[2.4, 3.2, '?'], [3.4, 4.1, '!'], [4.4, 5.6, 'note']]);
      if (lt < 2.2) q.pose = walkPose3(walkCyc3(walkD, s));
      else if (lt < 4.0) { const lk = sm((lt - 2.2) / 0.4) * (1 - sm((lt - 3.7) / 0.3)), tap = bumpT(lt, 3.0, 3.4);
        q.pose = { ...lp(walkPose3(walkCyc3(walkD, s)), { ...STAND3, head: [56, -60], hr: 0.5 }, lk), ...exSeq(lt, [[2.2, 'curious'], [3.4, 'surprised'], [3.8, 'happy']]) }; q.pose.fn = [lerp(32, 54, tap), -tap * 14, tap]; }
      else { q.pose = { ...walkPose3(walkCyc3(walkD, s) + walkCyc3(trD, s, true), { trot: 1 }), ...ex('happy') }; }
      const rx = 300 + 2.2 * 26 + 54 * s;
      q.after = () => { if (!mirrored() && lt > 3.35) ripple(rx, q.y + 3, (lt - 3.35) / 1.6, '255,210,170', 1, 4); };
      break;
    }
    case 10: { // Alishan: watching the sunrise; the forest train whistles below — ears up — then a big yawn
      const tx = 1100 - lt * 40, y = sm((lt - 3.6) / 0.4) * (1 - sm((lt - 4.7) / 0.5)), turn = sm((lt - 2.1) / 0.3) * (1 - sm((lt - 3.3) / 0.4));
      q.after = () => { if (lt > 1.9 && lt < 3.4) { puff(tx + 6, 520, (lt - 1.9) / 1.5, 0.8); emote3('note', tx + 30, 500, 0.9, clamp((lt - 2.0) / 0.35), 1 - sm((lt - 3.0) / 0.3)); } };
      emo(q, lt, [[2.15, 2.9, '!', 0.9]]);
      q.pose = lt > 4.8 ? sit3(lt, groom3(lt, 4.85, 7.2, { seed: 9 })) : sit3(lt, { ...exSeq(lt, [[0, 'content'], [2.1, 'surprised'], [3.3, 'neutral'], [4.8, 'content']]), hr: lerp(-0.1, 0.18, turn) + lerp(0, -0.6, y), mouth: y, eye: y > 0.3 ? 0 : undefined, ear: turn > 0.1 ? -0.3 : 0, seed: 9 }); break;
    }
    case 11: { // Hinoki Village (people come to stroll the Japanese-era houses in yukata): big stretch, sniff and cheek-rub the cypress post,
      // then a tuxedo cat napping on the porch wakes up — a nose boop, the cat way of saying hello.
      const postX = 330, fx = 419;
      q.before = () => { if (mirrored()) return; [postX, postX + 330, postX + 660].forEach(px => { c.fillStyle = hg(px - 8, px + 8, [[0, '#b98a58'], [0.5, '#a0703f'], [1, '#6e4a28']]); c.fillRect(px - 8, 262, 16, 256); for (let k = 0; k < 6; k++) line(px - 5 + k * 2, 262, px - 5 + k * 2 + Math.sin(k) * 1.5, 518, 'rgba(70,40,20,0.3)', 0.7); c.fillStyle = '#5a3b22'; c.fillRect(px - 11, 510, 22, 8); }); };
      emo(q, lt, [[2.5, 3.3, 'spark'], [4.7, 6.2, 'heart']]);
      if (lt < 1.6) { const u = sm(lt / 0.6) * (1 - sm((lt - 1.1) / 0.5)); q.pose = { ...lp(STAND3, STRETCH3, u), ...exSeq(lt, [[0, 'sleepy'], [1.2, 'content']]) }; q.pose.mouth = Math.max(0, u - 0.6) * 2; q.x = 230; }
      else if (lt < 2.3) { seqWalk(q, 230, 30, lt - 1.6); Object.assign(q.pose, ex('curious')); }
      else if (lt < 3.7) { const x = 230 + 0.7 * 30, sn = sm((lt - 2.3) / 0.4), rub = lt > 3.0 ? Math.sin((lt - 3.0) * 7) : 0, rb = sm((lt - 3.0) / 0.3);
        q.x = x; q.pose = { ...lp(walkPose3(walkCyc3(0.7 * 30, s)), { ...STAND3, head: [58 + sn * 3, -66 - rub * 4 * rb], hr: lerp(0.1, -0.25 + rub * 0.12, rb) }, sn), ...exSeq(lt, [[2.3, 'curious'], [2.7, 'content'], [3.0, 'happy']]) }; }
      else if (lt < 4.5) { seqWalk(q, 251, 41, lt - 3.7); Object.assign(q.pose, ex('curious')); }
      else { const bp = sm((lt - 4.5) / 0.3) * (1 - sm((lt - 5.3) / 0.4)); q.x = 284; q.pose = { ...STAND3, ...exSeq(lt, [[4.5, 'curious'], [4.8, 'happy']]), head: [56 + bp * 4, -70 + bp * 3], hr: 0.1 }; }
      const wake = sm((lt - 3.9) / 0.4), fb = sm((lt - 4.55) / 0.3) * (1 - sm((lt - 5.3) / 0.4)), fp = { ...lp(SLEEP3, LOAF3, wake), ...exSeq(lt, [[0, 'sleepy'], [3.9, 'surprised'], [4.5, 'curious'], [4.8, 'happy']]) };
      fp.eye = wake < 0.3 ? 0 : undefined; fp.head = [fp.head[0] + fb * 5, fp.head[1] + fb * 2];
      const fq = { x: fx, y: 516, s, face: -1, coat: 'tuxedo', bseed: 12, rim: '255,230,180', pose: fp };
      emo(fq, lt, [[0.3, 3.8, 'z'], [3.95, 4.6, '!'], [4.9, 6.2, 'heart']]);
      q.after = () => drawCat3(fq);
      break;
    }
    case 12: { // Xiluo Bridge: a joyful gallop along the riverbank, ears back
      q.x = -90 + lt * 200; q.pose = { ...gallopPose3(gallopCyc3(lt * 200, s)), ...ex('happy'), ear: 0.4 }; q.y = 594;
      emo(q, lt, [[1.8, 3.4, 'note']]); break;
    }
    case 13: { // Roundhouse: strolling past the engines when one lets off steam — TOOT — Halloween-cat leap, then a huff
      const loX = 640, wt = 3.2, wd = Math.min(lt, wt) * 30 + Math.max(0, lt - 5.2) * 30; q.x = 300 + wd;
      q.after = () => { if (lt > 3.0 && lt < 5.2) { puff(loX, 320, (lt - 3.0) / 2, 1.2); emote3('note', loX + 30, 300, 1.2, clamp((lt - 3.05) / 0.3), 1 - sm((lt - 4.2) / 0.3)); } };
      emo(q, lt, [[3.3, 4.4, '!'], [4.8, 5.8, 'drop']]);
      if (lt < wt) { q.pose = walkPose3(walkCyc3(wd, s)); Object.assign(q.pose, ex('content', 0.6)); }
      else if (lt < 5.2) { const jump = bumpT(lt, 3.25, 3.75), puffd = sm((lt - 3.25) / 0.15) * (1 - sm((lt - 4.5) / 0.6));
        q.pose = { ...lp(STAND3, SCARED3, puffd), ...exSeq(lt, [[3.2, 'scared'], [4.5, 'annoyed']]), turn: turnAt(lt, [[3.3, 4.0, 0.7], [4.55, 5.3, 1]]) }; q.y -= jump * 26; q.shadowA = 0.32 - jump * 0.15; }
      else { q.pose = walkPose3(walkCyc3(wd, s)); Object.assign(q.pose, exSeq(lt, [[5.2, 'annoyed'], [5.9, 'neutral']])); }
      break;
    }
    case 14: { // Sun Moon Lake: a dragonfly hovers in front of its nose; cross-eyed, a swat, it's gone — pretend nothing happened
      emo(q, lt, [[2.0, 3.0, '?'], [3.35, 4.0, '!']]);
      const n0 = [230 + 31 * s, 580 - 81 * s]; let dx, dy;
      if (lt < 2.0) { const v = sm((lt - 0.6) / 1.4); dx = lerp(820, n0[0] + 22, v); dy = lerp(380, n0[1] - 6, v) + Math.sin(lt * 5) * 6; }
      else if (lt < 3.3) { dx = n0[0] + 22 + Math.sin(lt * 7) * 3; dy = n0[1] - 6 + Math.sin(lt * 11) * 2; }
      else { const v = (lt - 3.3); dx = n0[0] + 22 + v * 320; dy = n0[1] - 6 - v * 200; }
      q.after = () => { if (lt > 0.5 && lt < 5) dragonfly(dx, dy, 1.1, lt, lt < 2.0 || lt > 3.3 ? 1 : -1); };
      const swat = bumpT(lt, 3.05, 3.45), ph = lt * 4.5, a = 0.5 + 0.5 * Math.sin(ph);
      if (lt < 3.6) q.pose = sit3(lt, { ...exSeq(lt, [[0, 'content'], [1.2, 'curious'], [3.3, 'surprised']]), look: lt > 1.6 ? [1.2, 0.2] : [0.4, -0.2], hr: lt > 1.6 && lt < 3.3 ? -0.08 + Math.sin(lt * 2) * 0.05 : -0.05, paw: swat > 0.02 ? [lerp(16, 34, swat), lerp(-10, -84, swat), 1] : null });
      else if (lt < 5.2) q.pose = sit3(lt, groom3(lt, 3.55, 5.35));
      else q.pose = sit3(lt, { ...ex('blep'), eye: 0.7, turn: turnAt(lt, [[5.2, 7, 1]]) });
      break;
    }
    case 15: { // Gaomei: a fiddler crab pops out of its hole — the cat jumps back, sniffs, gets waved at, crab ducks away
      const gy = x2 => 560 - (x2 + M) * 20 / (W + 2 * M), stopT = 2.0, mv = lt < stopT ? lt : lt < 4.6 ? stopT : lt - 2.6;
      q.x = 280 + mv * 28; q.y = gy(q.x);
      const hx = 280 + stopT * 28 + 112 * s, hy = gy(hx), rise = sm((lt - 1.7) / 0.4) * (1 - sm((lt - 3.9) / 0.35));
      q.after = () => { if (mirrored()) return; oval(hx, hy + 1, 8, 2.2, 0, 'rgba(20,10,20,0.8)'); if (rise > 0) { c.save(); c.beginPath(); c.rect(hx - 45, 0, 90, hy + 1); c.clip(); crab(hx, hy + 22 * (1 - rise), 1.6, lt, { face: -1, col: '#4a2c3a', wave: lt > 2.4 && lt < 3.6 ? 0.5 + 0.5 * Math.sin(lt * 9) : 0 }); c.restore(); } };
      emo(q, lt, [[2.0, 2.8, '!'], [2.9, 3.8, '?'], [3.95, 4.5, '!']]);
      // a friend walks the sunset boardwalk with it, a few steps behind (reflected in the wet sand too)
      const fs = s * 0.9, fq = { x: q.x - 98, y: gy(q.x - 98), s: fs, sil: true, rim: '255,165,110', shadow: false, bseed: 15 };
      if (lt < stopT + 0.1 || lt >= 4.7) { fq.pose = walkPose3(walkCyc3(Math.max(0, mv - 0.1) * 28, fs) + 0.3); fq.x = 280 - 98 + Math.max(0, mv - 0.1) * 28; fq.y = gy(fq.x); Object.assign(fq.pose, ex(lt < stopT ? 'content' : 'happy', 0.7)); }
      else { const hp = bumpT(lt, 2.05, 2.4) + bumpT(lt, 3.95, 4.25); fq.x = 280 - 98 + (stopT - 0.1) * 28; fq.y = gy(fq.x) - hp * 12; fq.pose = { ...lp(STAND3, SCARED3, hp * 0.8), ...exSeq(lt, [[2.0, 'scared'], [2.6, 'curious'], [3.95, 'scared'], [4.4, 'happy']]), hr: -0.1 }; }
      emo(fq, lt, [[2.05, 2.8, '!'], [4.9, 6.2, 'note']]);
      q.before = () => drawCat3(fq);
      if (lt < stopT || lt >= 4.6) { q.pose = walkPose3(walkCyc3(mv * 28, s)); Object.assign(q.pose, ex(lt < stopT ? 'neutral' : 'happy', 0.7)); }
      else { const back = sm((lt - 2.0) / 0.2) * (1 - sm((lt - 2.8) / 0.4)), sniff = sm((lt - 2.9) / 0.4) * (1 - sm((lt - 3.9) / 0.15)), hop = bumpT(lt, 3.9, 4.2);
        q.pose = { ...STAND3, ...exSeq(lt, [[2.0, 'surprised'], [2.8, 'curious'], [3.9, 'surprised'], [4.3, 'neutral']]), head: [lerp(lerp(54, 46, back), 64, sniff), lerp(-72, -58, sniff)], hip: [-34 + back * 3, -50], hr: sniff * 0.25 };
        q.y -= hop * 10; q.x -= hop * 6; }
      break;
    }
    case 16: { // Longteng: swatting falling tung blossoms; one lands on its nose — cross-eyed — sneeze!
      const sw = lt < 2.6 ? Math.max(0, Math.sin(lt * 2.2 - 1)) : 0, sn = bumpT(lt, 3.9, 4.25);
      q.x = 470; q.y = 600;
      q.pose = sit3(lt, { ...exSeq(lt, [[0, 'delighted'], [2.6, 'curious'], [3.75, 'neutral'], [4.25, 'surprised'], [4.9, 'happy']]), look: lt > 2.9 && lt < 3.9 ? [1, 0.9] : [0.3, -0.3],
        hr: lt < 2.6 ? -0.35 - sw * 0.1 : lt < 3.75 ? lerp(-0.35, 0.05, sm((lt - 2.6) / 0.5)) - sm((lt - 3.5) / 0.3) * 0.25 + sn * 0.6 : sn * 0.6 - 0.05, paw: sw > 0.05 ? [30 + sw * 14, -50 - sw * 40, 1] : null, ts: 2.4,
        eye: lt > 3.6 && lt < 4.3 ? 0 : undefined, mouth: lt > 3.85 && lt < 4.3 ? sn * 0.7 : 0, turn: turnAt(lt, [[4.25, 5.6, 0.9]]) });
      emo(q, lt, [[4.25, 4.95, '!'], [5.0, 6.2, 'note']]);
      const n = noseW(q), lv = sm((lt - 2.6) / 0.9), fly = clamp((lt - 4.0) / 0.8);
      const bx = lt < 4.0 ? lerp(n[0] + 30, n[0] + 1, lv) + Math.sin(lt * 4) * 14 * (1 - lv) : n[0] + 2 + fly * 80, by = lt < 4.0 ? lerp(n[1] - 90, n[1] - 3, lv) : n[1] - 3 - Math.sin(fly * Math.PI) * 40 + fly * 50;
      q.after = () => { if (lt > 2.4 && fly < 1) blossom(bx, by, 1.15, lt * (lt < 3.5 || lt > 4 ? 2 : 0)); };
      break;
    }
    case 17: { // Xinpu: plodding into the autumn wind; a persimmon rolls up, gets a pat, rolls off — chase!
      const stopT = 2.6, x0 = 280, sx = x0 + stopT * 22, chase = Math.max(0, lt - 4.3);
      q.x = lt < stopT ? x0 + lt * 22 : sx + chase * 50;
      const r = 9, pStop = sx + 86 * s, pin = sm((lt - 1.4) / 1.6), pout = lt > 3.75 ? (1 - Math.exp(-(lt - 3.75) * 1.4)) * 180 + chase * 10 : 0, pxx = lerp(1000, pStop, pin) + pout, pyy = 612 - r;
      q.after = () => { if (lt > 1.4) persimmon(pxx, pyy, r, -(pxx - 1000) / r); };
      emo(q, lt, [[2.3, 3.1, '!'], [3.8, 4.8, 'spark'], [4.9, 6.2, 'note']]);
      if (lt < stopT) { q.pose = walkPose3(walkCyc3(lt * 22, s), { low: 9, ear: 0.5, eye: 0.35, hr: 0.12, tail: [-2.9, 0.03, 0.16, 2.6, 0] }); Object.assign(q.pose, exSeq(lt, [[0, 'annoyed'], [2.3, 'curious']]), { earDown: lt < 2.3 ? 1 : 0 }); }
      else if (lt < 4.3) { const sniff = sm((lt - 2.9) / 0.4), tap = bumpT(lt, 3.45, 3.8);
        q.pose = { ...STAND3, ...exSeq(lt, [[2.6, 'curious'], [3.75, 'delighted']]), head: [lerp(54, 62, sniff), lerp(-72, -56, sniff * (1 - tap))], hr: sniff * 0.3 * (1 - tap), fn: [lerp(32, 60, tap), -tap * 12, tap] }; }
      else { q.pose = walkPose3(walkCyc3(stopT * 22, s) + walkCyc3(chase * 50, s, true), { trot: 1 }); Object.assign(q.pose, ex('delighted')); }
      break;
    }
    case 18: { // East Gate at night: a passing scooter's headlight sweeps over — eyeshine! — then back to the gate
      const lx = 1240 - (lt - 1.8) * 520, lgt = lt > 1.8 && lt < 4.4 ? clamp(1 - Math.abs(lx - 900) / 260) : 0;
      q.before = () => { if (lt > 1.8 && lt < 4.4) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(lx, 585, 0, lx, 585, 220); g.addColorStop(0, 'rgba(255,240,200,0.32)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.fillRect(lx - 220, 400, 440, 300); c.restore(); glow(lx + 40, 590, 26, '255,250,225', 0.9); } };
      emo(q, lt, [[2.35, 3.2, '!']]);
      const follow = sm((lt - 2.6) / 0.6) * (1 - sm((lt - 4.4) / 0.6));
      q.pose = sit3(lt, { ...exSeq(lt, [[0, 'content'], [2.3, 'surprised'], [3.3, 'curious'], [4.6, 'content']]), shine: lgt, hr: lerp(-0.18, 0.05, follow), look: [lerp(0.2, 0.9, follow), 0], ts: 2.0, turn: turnAt(lt, [[2.2, 3.3, 0.8]]) });
      break;
    }
    case 19: { // Taoyuan: the plane roars overhead — ears flat — then it jumps onto the fence rail to watch it climb away
      const u = clamp((lt - 0.5) / 5.5), px = lerp(300, 1250, u), py = lerp(430 - 6, 120, Math.pow(u, 1.4)), rail = [446, 466];
      const seat = lt > 3.35, hx = seat ? rail[0] : q.x, hy = seat ? rail[1] : q.y, hd = [hx + 30 * q.s, hy - 82 * q.s];
      const ang = clamp(Math.atan2(py - hd[1], Math.max(30, px - hd[0])), -1.1, 0.2);
      emo(q, lt, [[0.6, 1.5, '!'], [3.7, 5.0, 'spark'], [5.0, 6.4, 'note']]);
      // the observation deck regular: a cat already on the rail, plane-spotting
      const fh = [540 + 30 * q.s * 0.92, 466 - 82 * q.s * 0.92], fang = clamp(Math.atan2(py - fh[1], Math.max(30, px - fh[0])), -1.1, 0.2);
      const fq = { x: 540, y: 466, s: q.s * 0.92, sil: true, rim: '255,175,120', shadow: false, bseed: 19, pose: sit3(lt, { ...exSeq(lt, [[0, 'content'], [3.2, 'surprised'], [3.9, 'happy']]), hr: lt > 3.2 && lt < 3.9 ? 0.25 : fang, ts: 1.5 }) };
      emo(fq, lt, [[3.25, 3.9, '!'], [4.1, 5.4, 'heart']]);
      drawCat3(fq);
      if (lt < 2.45) { q.pose = sit3(lt, { ...exSeq(lt, [[0, 'neutral'], [0.6, 'surprised'], [1.2, 'annoyed'], [2.0, 'curious']]), hr: ang * sm((lt - 0.8) / 0.6), ts: 1.8 }); break; }
      if (lt < 3.35) { const qa = { ...q, pose: sit3(lt, { ...ex('curious'), hr: ang, ts: 1.8 }) }, qb = jumpArc({ ...q }, lt, 2.85, 3.2, [q.x, q.y], rail); Object.assign(qb.pose, ex('focused'));
        return cross(qa, qb, sm((lt - 2.45) / 0.2)); }
      const qa = jumpArc({ ...q }, lt, 2.85, 3.2, [q.x, q.y], rail); Object.assign(qa.pose, ex('curious'));
      return cross(qa, { ...q, x: rail[0], y: rail[1], pose: sit3(lt, { ...exSeq(lt, [[3.35, 'curious'], [3.7, 'delighted']]), hr: ang, ts: 1.8 }) }, sm((lt - 3.35) / 0.25));
    }
    case 20: { // Kinmen: studies the Wind Lion, copies its roar, a gust flattens its ears — so it leaps up beside the lion
      emo(q, lt, [[0.5, 1.6, '?'], [2.0, 3.3, 'note'], [3.5, 4.3, 'drop'], [5.1, 6.4, 'heart']]);
      const roar = sm((lt - 1.9) / 0.3) * (1 - sm((lt - 3.2) / 0.3)), gust = bumpT(lt, 3.4, 4.9), base = [376, 548];
      q.face = -1;
      q.after = () => { if (gust > 0) { const r2 = rng(207); for (let k = 0; k < 16; k++) { const v = mod((lt - 3.4) * (1.2 + r2() * 0.6) + r2(), 1); c.save(); c.translate(1300 - v * 1500, 420 + r2() * 200 + Math.sin(v * 9 + k) * 20); c.rotate(v * 12 + k); oval(0, 0, 5, 2.2, 0, mix('#8a2f1e', '#c8a050', r2(), 0.85 * gust)); c.restore(); } } };
      if (lt < 4.1) q.pose = sit3(lt, { ...exSeq(lt, [[0, 'curious'], [1.9, 'meow'], [3.3, 'annoyed']]), hr: -0.3 - roar * 0.25 + gust * 0.15, mouth: roar * 0.85, eye: roar > 0.5 ? 0.6 : undefined, ts: 1.4 + gust * 4 });
      else if (lt < 4.95) { const qa = { ...q, pose: sit3(lt, { ...ex('annoyed'), hr: -0.15, ts: 4 }) }, qb = jumpArc({ ...q }, lt, 4.45, 4.8, [q.x, q.y], base); Object.assign(qb.pose, ex('focused'));
        cross(qa, qb, sm((lt - 4.1) / 0.2)); return q.after(); }
      else { const qa = jumpArc({ ...q }, lt, 4.45, 4.8, [q.x, q.y], base); Object.assign(qa.pose, ex('content'));
        cross(qa, { ...q, x: base[0], y: base[1], shadow: false, pose: sit3(lt, { ...ex('content'), hr: -0.3, ts: 1.2 }) }, sm((lt - 4.95) / 0.25)); return q.after(); }
      break;
    }
    case 21: { // Matsu: people wade in at night to make the Blue Tears glow. Ours taps the sea, a local cat across the cove taps back;
      // they take turns, the water lights up more and more, a big flash makes both hop back — then delight.
      q.x = 150; q.y = 551;
      const taps = [1.3, 2.1, 2.8, 3.5, 4.1], ftaps = [1.7, 2.45, 3.15, 3.8], fx = 366;
      const glowAt = (x, t0, big) => { const v = (lt - t0) / 1.2; if (v > 0 && v < 1) { c.save(); c.globalCompositeOperation = 'lighter'; glow(x, 556, 30 + v * 60 + (big ? 70 : 0), '90,200,255', (1 - v) * (big ? 0.95 : 0.5)); ripple(x, 556, v, '120,220,255', 1.2); c.restore(); } };
      q.after = () => { taps.forEach((t0, i) => glowAt(150 + 64 * q.s, t0, i === 4)); ftaps.forEach(t0 => glowAt(fx - 64 * q.s, t0, false)); };
      emo(q, lt, [[0.3, 1.2, '?'], [2.2, 3.4, 'spark'], [4.2, 4.9, '!'], [5.0, 6.2, 'heart']]);
      const hop = bumpT(lt, 4.3, 4.75), back = sm((lt - 4.3) / 0.45);
      if (lt < 4.3) { const tap = Math.max(0, ...taps.map(t0 => bumpT(lt, t0 - 0.3, t0))); q.pose = { ...lp(STAND3, CROUCH3, 0.8), ...exSeq(lt, [[0, 'curious'], [1.4, 'surprised'], [2.1, 'delighted']]) }; q.pose.fn = [44 + tap * 20, -tap * 10, tap]; q.pose.hr = 0.35; q.pose.head = [56, -40]; }
      else { q.pose = { ...lp(lp(CROUCH3, SCARED3, hop), STAND3, sm((lt - 4.8) / 0.4)), ...exSeq(lt, [[4.3, 'scared'], [4.85, 'surprised'], [5.2, 'delighted']]) }; q.x = 150 - back * 36; q.y = 551 - hop * 26; }
      const fq = { x: fx, y: 551, s: q.s * 0.95, face: -1, sil: true, rim: '90,190,255', shadow: false, bseed: 21 };
      if (lt < 4.3) { const tap = Math.max(0, ...ftaps.map(t0 => bumpT(lt, t0 - 0.3, t0))); fq.pose = { ...lp(STAND3, CROUCH3, lt < 1.2 ? sm(lt / 1.2) * 0.8 : 0.8), ...exSeq(lt, [[0, 'curious'], [1.8, 'delighted']]) }; fq.pose.fn = [44 + tap * 20, -tap * 10, tap]; fq.pose.hr = 0.35; fq.pose.head = [56, -40]; }
      else { fq.pose = { ...lp(lp(CROUCH3, SCARED3, hop), STAND3, sm((lt - 4.8) / 0.4)), ...exSeq(lt, [[4.3, 'scared'], [4.85, 'surprised'], [5.2, 'happy']]) }; fq.x = fx + back * 36; fq.y = 551 - hop * 26; }
      emo(fq, lt, [[1.0, 1.9, '!'], [2.6, 3.6, 'note'], [5.2, 6.4, 'heart']]);
      q.before = () => drawCat3(fq);
      break;
    }
    case 22: { // home: walks in, looks up at the city lights one more time, curls up, falls asleep — and dreams of the friends it made
      emo(q, lt, [[2.6, 3.8, 'heart'], [5.4, 6.1, 'z']]);
      if (lt < 2.4) { seqWalk(q, 250, 30, lt); Object.assign(q.pose, ex('content', 0.7)); return drawCat3(q); }
      const x = 250 + 2.4 * 30, lk = sm((lt - 2.4) / 0.4), sl = sm((lt - 4.2) / 2.5), pp = { ...lp(LOAFT3, SLEEPT3, sl), ...exSeq(lt, [[3.6, 'content'], [4.8, 'sleepy'], [6.4, 'content']]) };
      pp.eye = lt > 5.4 ? 0 : (lt > 4.8 ? 0.3 : 0.4);
      cross({ ...q, x, pose: { ...STAND3, ...ex('happy'), hr: -0.25 * lk, head: [56, -74], turn: turnAt(lt, [[2.5, 4.2, 0.55]]) } }, { ...q, x: x + 10, emote: q.emote, pose: pp }, sm((lt - 3.6) / 0.5));
      const du = clamp((lt - 6.0) / 2.2) * (1 - sm((lt - 8.7) / 0.5)); dreamBubble(x + 10 + 40 * q.s, q.y - 66 * q.s, 1.35, du);
      return;
    }
    default: q.pose = q.pose0 === 'sit' ? sit3(lt, { hr: q.look || 0 }) : walkPose3(walkCyc3(lt * 28, s));
  }
  if (q.before) q.before();
  drawCat3(q); if (q.after) q.after();
}
