/* 22 travel interludes along the real routes between stops. Each is drawn from reference photos of that place. */
const TRANS = [];
function V(id, county, place, en, ll, sub, cam, draw) { TRANS.push({ id, via: true, county, place, en, ll, sub, cam, dur: 3.6, draw }); }
function trainWindow(lt, outside, wall = '#cfc6b6', frame = '#7d7468') {
  outside();
  c.save(); c.fillStyle = wall; c.beginPath(); c.rect(-M, 0, W + 2 * M, H); const x0 = 250, y0 = 150, w = 760, h = 360, r = 40;
  c.moveTo(x0 + r, y0); c.arcTo(x0 + w, y0, x0 + w, y0 + h, r); c.arcTo(x0 + w, y0 + h, x0, y0 + h, r); c.arcTo(x0, y0 + h, x0, y0, r); c.arcTo(x0, y0, x0 + w, y0, r); c.closePath();
  c.fill('evenodd'); c.strokeStyle = frame; c.lineWidth = 14; c.beginPath(); c.roundRect(x0, y0, w, h, r); c.stroke();
  c.fillStyle = 'rgba(255,255,255,0.06)'; c.beginPath(); c.moveTo(x0 + 60, y0 + 10); c.lineTo(x0 + 220, y0 + 10); c.lineTo(x0 + 120, y0 + h - 10); c.lineTo(x0 - 40, y0 + h - 10); c.closePath(); c.fill();
  c.fillStyle = vg(500, H, [[0, mix(wall, '#000000', 0.25)], [1, mix(wall, '#000000', 0.5)]]); c.fillRect(-M, 520, W + 2 * M, 200);
  c.fillStyle = mix(wall, '#000000', 0.15); c.fillRect(220, 506, 820, 18); c.restore();
}

/* T0 新北 陰陽海 — Shuinandong: the green hillside of the Thirteen Levels smelter ruins (grey terraces stepping down,
   the arched wall, the long flues climbing the ridge), the bay where golden mineral water meets the blue sea behind a
   breakwater, Keelung Mountain in the haze, and the coast road */
function yyTerraces() {
  // hillside on the left, rising off the top of the frame
  c.fillStyle = vg(120, 520, [[0, '#55804e'], [1, '#3e6440']]); c.beginPath(); c.moveTo(-M, 520); c.lineTo(-M, 150); c.bezierCurveTo(200, 120, 420, 230, 560, 470); c.lineTo(620, 520); c.closePath(); c.fill();
  const r = rng(305); c.save(); c.beginPath(); c.moveTo(-M, 520); c.lineTo(-M, 150); c.bezierCurveTo(200, 120, 420, 230, 560, 470); c.lineTo(620, 520); c.closePath(); c.clip();
  for (let k = 0; k < 900; k++) { const x = r() * 760 - M, y = 60 + r() * 460; oval(x, y, 3 + r() * 5, 2 + r() * 3, 0, mix('#2e4c30', '#8fb57a', r(), 0.85)); }
  // thirteen grey terraces stepping down the slope (top-left to lower-right), overgrown on their treads
  for (let k = 0; k < 13; k++) { const u = k / 12, x0 = 150 + u * 250 - hash(k * 3) * 20, y0 = 236 + u * 220, w = 190 - u * 40 + hash(k) * 30, h = 15;
    c.fillStyle = mix('#a9a59c', '#8a867e', hash(k)); c.fillRect(x0, y0, w, h); c.fillStyle = 'rgba(255,255,250,0.25)'; c.fillRect(x0, y0, w, 2);
    c.fillStyle = 'rgba(40,38,34,0.45)'; c.fillRect(x0, y0 + h - 5, w, 5); for (let a = 0; a < w / 14; a++) { c.fillStyle = 'rgba(40,38,34,0.35)'; c.fillRect(x0 + 4 + a * 14, y0 + 4, 6, 6); }
    for (let t = 0; t < 7; t++) oval(x0 + r() * w, y0 - 2 + r() * 4, 5 + r() * 8, 3 + r() * 3, 0, mix('#46703e', '#9cc07c', r(), 0.95)); }
  // the arched ruin wall near the top
  c.fillStyle = '#7d7972'; c.fillRect(170, 196, 170, 40); c.fillStyle = 'rgba(30,28,26,0.55)'; for (let a = 0; a < 9; a++) { c.beginPath(); c.moveTo(180 + a * 18, 232); c.lineTo(180 + a * 18, 214); c.arc(186 + a * 18, 214, 6, Math.PI, 0); c.lineTo(192 + a * 18, 232); c.closePath(); c.fill(); }
  c.fillStyle = '#6a6660'; c.fillRect(170, 192, 170, 5); for (let t = 0; t < 26; t++) oval(170 + r() * 170, 192 + r() * 6, 4 + r() * 7, 2 + r() * 3, 0, mix('#46703e', '#9cc07c', r(), 0.95));
  // the long flues climbing over the ridge
  c.strokeStyle = '#8c887f'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(300, 230); c.quadraticCurveTo(200, 180, 60, 150); c.stroke(); c.beginPath(); c.moveTo(330, 240); c.quadraticCurveTo(260, 200, 150, 150); c.stroke();
  c.strokeStyle = 'rgba(40,38,34,0.4)'; c.lineWidth = 2; c.beginPath(); c.moveTo(304, 234); c.quadraticCurveTo(204, 184, 64, 154); c.stroke();
  // lower buildings by the shore
  c.fillStyle = '#cfc9bb'; c.fillRect(420, 476, 70, 26); poly([[416, 476], [455, 462], [494, 476]], '#8a5a44'); c.fillStyle = '#b8b2a4'; c.fillRect(470, 486, 60, 18);
  c.restore();
}
V('T0', '新北市 · 瑞芳', '陰陽海', 'Yin-Yang Sea', '25.12°N 121.86°E', ['沿著海岸往東，海一半藍、一半金。', 'Heading east along the coast — the sea is half blue, half gold.'], [1.02, 1.06, 30, -30, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#6fa2d2'], [0.55, '#c8dce6'], [1, '#e9e8dc']]); cumulus(980, 170, 380, 70, 301, '#ffffff', '#c9d1db', -0.3); stratus(700, 260, 900, 40, 'rgba(255,255,255,0.45)'); }, { blur: 2 });
  // Keelung Mountain: the pyramid peak in the haze, with the ridge behind
  L('far', 0.06, () => { mountain({ fn: x => 372 - 92 * Math.max(0, 1 - Math.abs(x - 1080) / 130) - 24 * Math.max(0, 1 - Math.abs(x - 880) / 240) - fbm1(x * 0.01 + 3) * 10, floor: 380, top: '#7f9ca6', bot: '#9fb4b8', haze: 'rgba(220,232,236,0.5)', bottom: 380 }); }, { blur: 1.4 });
  // the sea: open blue, with the golden-brown mineral water filling the bay and bleeding out past the breakwater
  L('sea', 0.15, () => { const hz = 372; c.fillStyle = vg(hz, H, [[0, '#6b9cbb'], [0.3, '#3d86b0'], [1, '#2a6f96']]); c.fillRect(-M, hz, W + 2 * M, H);
    // breakwater
    c.fillStyle = '#9a968c'; c.beginPath(); c.moveTo(700, 498); c.lineTo(1140, 452); c.lineTo(1150, 460); c.lineTo(710, 506); c.closePath(); c.fill(); const r = rng(306); for (let k = 0; k < 60; k++) disc(700 + r() * 440, 498 - r() * 44 + (r() - 0.5) * 6, 2 + r() * 3, mix('#b8b4aa', '#6e6a62', r()));
 }, { blur: 0.4 });
  L('shallow', 0.15, () => { oval(940, 500, 220, 30, -0.1, 'rgba(90,200,200,0.55)'); oval(1050, 520, 200, 40, -0.1, 'rgba(110,210,205,0.5)'); }, { blur: 12 });
  L('gold', 0.15, () => { [[620, 540, 300, 60, 0.95], [700, 500, 260, 40, 0.8], [820, 478, 220, 22, 0.55], [560, 580, 260, 50, 0.95]].forEach(([x, y, rx, ry, a]) => oval(x, y, rx, ry, -0.06, `rgba(204,152,66,${a})`));
    c.strokeStyle = 'rgba(220,175,96,0.7)'; c.lineWidth = 5; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(760 + k * 50, 470 + k * 6); c.quadraticCurveTo(800 + k * 50, 456 + k * 6, 850 + k * 50, 472 + k * 8); c.stroke(); } }, { blur: 14, alpha: 0.95 });
  L('shore', 0.17, () => { const r = rng(307); c.fillStyle = vg(540, 590, [[0, '#8a867a'], [1, '#64605a']]); c.beginPath(); c.moveTo(360, 592); c.quadraticCurveTo(480, 548, 690, 556); c.lineTo(700, 592); c.closePath(); c.fill();
    for (let k = 0; k < 50; k++) oval(380 + r() * 310, 556 + r() * 30, 4 + r() * 9, 3 + r() * 5, r(), mix('#5a564e', '#9a968a', r())); });
  D(0.15, () => { shimmer(380, 470, 140, '255,255,255', 302, { a: 0.4 }); for (let k = 0; k < 5; k++) { const u = mod(lt * 0.4 + k / 5, 1); c.strokeStyle = `rgba(255,255,255,${(1 - u) * 0.6})`; c.lineWidth = 2; c.beginPath(); c.moveTo(390 + k * 60, 540 - u * 8); c.quadraticCurveTo(420 + k * 60, 532 - u * 12, 450 + k * 60, 540 - u * 8); c.stroke(); } });
  L('hills', 0.3, () => yyTerraces());
  // haze in front of the hillside
  L('haze', 0.32, () => { const g = c.createLinearGradient(0, 300, 0, 560); g.addColorStop(0, 'rgba(225,235,238,0)'); g.addColorStop(1, 'rgba(225,235,238,0.25)'); c.fillStyle = g; c.fillRect(-M, 300, W + 2 * M, 260); });
  L('road', 0.9, () => { c.fillStyle = vg(560, H, [[0, '#5a5a5e'], [1, '#2e2e32']]); c.fillRect(-M, 590, W + 2 * M, 200); for (let k = 0; k < 20; k++) c.fillStyle = '#f2e7c6', c.fillRect(-M + k * 120, 640, 60, 4);
    c.fillStyle = '#c9c9c9'; c.fillRect(-M, 572, W + 2 * M, 8); c.fillStyle = '#8f8f8f'; c.fillRect(-M, 580, W + 2 * M, 4); for (let k = 0; k < 30; k++) c.fillRect(-M + k * 60, 572, 5, 22); });
  D(0.9, () => { const q = { x: 200 + lt * 46, y: 574, s: 1.0 }; q.pose = { ...walkPose3(walkCyc3(lt * 46, 1, true), { trot: 1 }), ...ex('happy', 0.8) }; q.emote = emoAt(lt, [[1.0, 2.6, 'note']]); drawCat3(q); });
});
/* T1 基隆港 */
V('T1', '基隆市', '基隆港', 'Port of Keelung', '25.13°N 121.74°E', ['港口的大船，要開去好遠的地方。', 'The big ships in the harbour are bound for faraway places.'], [1.02, 1.06, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#88a9c6'], [1, '#e2e2da']]); cumulus(350, 200, 320, 60, 311, '#ffffff', '#c9cfd8', 0.3); }, { blur: 2 });
  L('hill', 0.1, () => { mountain({ base: 340, amp: 110, f: 0.004, seed: 312, top: '#5e7d63', bot: '#6f8a72', tex: 'forest', dark: '#466048', mid: '#5f7d5c', light: '#9db48d', depth: 160, n: 1500, r: 3 });
    c.fillStyle = '#ffffff'; c.font = `700 22px Arial, sans-serif`; c.save(); c.translate(520, 268); c.rotate(-0.05); c.fillText('K E E L U N G', 0, 0); c.restore();
    // dense city climbing the hillsides round the inner harbour
    const r = rng(315); for (let row = 4; row >= 0; row--) for (let x = -M; x < W + M; x += 14 + r() * 18) { const y = 402 - row * 11 - (1 - Math.abs(x - 640) / 900) * row * 4, h = 10 + r() * 16, w = 12 + r() * 16;
      c.fillStyle = mix('#c8ccc8', '#ece6d8', r()); c.fillRect(x, y - h, w, h + 2); c.fillStyle = 'rgba(80,90,100,0.35)'; for (let yy = y - h + 3; yy < y; yy += 5) c.fillRect(x + 2, yy, w - 4, 1.4); }
    skyline(404, 313, '#b8bcbe', '#e2ddd2', { hmin: 20, hvar: 60 }); c.fillStyle = '#d8d4cc'; c.fillRect(100, 300, 26, 104); c.fillRect(1100, 290, 30, 114); });
  L('port', 0.3, () => { c.fillStyle = vg(400, H, [[0, '#4f7584'], [1, '#2c4b57']]); c.fillRect(-M, 402, W + 2 * M, H);
    [[880, 1.0], [1010, 0.9], [1120, 1.05]].forEach(([x, s]) => { c.save(); c.translate(x, 402); c.scale(s, s); c.fillStyle = '#c9402f'; c.fillRect(-30, -150, 6, 150); c.fillRect(24, -150, 6, 150); c.fillRect(-60, -160, 130, 10); c.fillRect(-30, -110, 60, 6); c.fillStyle = '#e8e8e8'; c.fillRect(40, -170, 30, 16); c.restore(); });
    for (let k = 0; k < 24; k++) { c.fillStyle = ['#c0392b', '#2c6e9b', '#d4a017', '#3f8b5a', '#7f8c8d'][k % 5]; c.fillRect(830 + (k % 8) * 26, 392 - Math.floor(k / 8) * 11, 24, 10); } });
  D(0.3, () => { shimmer(405, H, 150, '255,255,255', 314, { a: 0.3 }); const sx = 720 - lt * 6; c.save(); c.translate(sx, 470);
    // cruise ship: tall white superstructure in tiers, rows of balconies, blue hull stripe, funnel
    c.fillStyle = '#1e3a5a'; c.beginPath(); c.moveTo(-300, -10); c.lineTo(280, -10); c.lineTo(320, -40); c.lineTo(-310, -36); c.closePath(); c.fill();
    c.fillStyle = '#f6f6f4'; c.beginPath(); c.moveTo(-310, -36); c.lineTo(320, -40); c.lineTo(300, -70); c.lineTo(-300, -70); c.closePath(); c.fill();
    for (let tier = 0; tier < 5; tier++) { const x0 = -280 + tier * 18, x1 = 250 - tier * 34, y0 = -70 - tier * 16; c.fillStyle = tier % 2 ? '#eeeeec' : '#fafafa'; c.fillRect(x0, y0 - 16, x1 - x0, 16); c.fillStyle = 'rgba(40,70,100,0.7)'; for (let w = x0 + 4; w < x1 - 4; w += 7) c.fillRect(w, y0 - 12, 4, 7); }
    c.fillStyle = '#1e3a5a'; c.fillRect(140, -160, 34, 30); c.fillStyle = '#d23a2e'; c.fillRect(140, -168, 34, 8); c.fillStyle = 'rgba(30,50,80,0.85)'; c.fillRect(230, -128, 50, 10);
    c.restore(); });
  L('fg', 0.95, () => { c.fillStyle = vg(580, H, [[0, '#8a8580'], [1, '#4c4844']]); c.fillRect(-M, 586, W + 2 * M, 200); c.fillStyle = '#2e2c2b'; c.fillRect(250, 548, 40, 42); c.beginPath(); c.ellipse(270, 548, 26, 8, 0, 0, TAU); c.fill(); });
  D(0.95, () => drawCat3({ x: 262, y: 542, s: 1.05, pose: sit3(lt, { ...exSeq(lt, [[0, 'curious'], [1.2, 'delighted'], [2.6, 'content']]), look: [0.8, -0.3], hr: -0.05 + Math.sin(lt * 0.6) * 0.1 }), emote: emoAt(lt, [[1.2, 2.6, 'spark']]), shadow: false }));
});
/* T2 東北角 鼻頭角 */
V('T2', '新北市 · 東北角', '鼻頭角', 'Bitou Cape', '25.13°N 121.92°E', ['海浪把岩石刻成了一格一格的豆腐。', 'The waves have carved the rocks into blocks like tofu.'], [1.03, 1.07, 40, -40, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#6b9ac8'], [1, '#dfe6e6']]); }, {});
  L('cape', 0.12, () => { mountain({ fn: x => x > 700 ? 380 - (x - 700) * 0.45 - fbm1(x * 0.01 + 2) * 30 : 420, floor: 420, top: '#5f805c', bot: '#7b8e70', tex: 'forest', dark: '#3f5c3e', mid: '#5c7c55', light: '#9db88a', depth: 120, n: 900, r: 3, seed: 321 }); lighthouse(1120, 214, 40); });
  L('sea', 0.2, () => { c.fillStyle = vg(420, H, [[0, '#3b7fa6'], [1, '#2d6d8b']]); c.fillRect(-M, 420, W + 2 * M, H); });
  D(0.2, () => { shimmer(422, 560, 160, '255,255,255', 322, { a: 0.4 }); for (let k = 0; k < 4; k++) { const u = mod(lt * 0.4 + k / 4, 1); c.strokeStyle = `rgba(255,255,255,${0.6 * Math.sin(u * Math.PI)})`; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-M, 548 - u * 20); for (let x = -M; x < W + M; x += 30) c.lineTo(x, 548 - u * 20 + Math.sin(x * 0.03 + k) * 4); c.stroke(); } });
  L('rocks', 0.85, () => { const r = rng(323); for (let row = 0; row < 3; row++) for (let k = 0; k < 16; k++) { const x = -M + k * 100 + row * 40 + r() * 20, y = 560 + row * 30, w = 92, h = 22 + row * 6; poly([[x, y], [x + w, y - 4], [x + w + 6, y + h], [x + 4, y + h + 4]], mix('#c8b48c', '#9b8763', r())); line(x + 2, y + 2, x + w, y - 2, 'rgba(255,245,220,0.6)', 1.5); } });
  D(0.85, () => { const u = mod(lt / 1.2, 1), x = 40 + lt * 190; const q = { x, y: 560 - Math.sin(u * Math.PI) * 26, s: 0.95, pose: { ...gallopPose3(gallopCyc3(lt * 190, 0.95)), ...ex('happy'), ear: 0.4 } }; drawCat3(q); });
});
/* T3 蘇花 by train */
V('T3', '宜蘭 → 花蓮', '蘇花海岸 · 臺鐵', 'Along the Suhua coast by train', '24.30°N 121.75°E', ['搭上火車，沿著蘇花海岸的懸崖往南。', 'By train, south along the cliffs of the Suhua coast.'], [1.0, 1.02, 0, 0, 0, 0], function (lt) {
  D(0, () => trainWindow(lt, () => {
    sky([[0, '#5e98cc'], [1, '#d7e6ea']]); cumulus(860, 200, 300, 50, 333, '#ffffff', '#ccd6e0', 0.2);
    // the Pacific: deep blue far out, turquoise in, a white surf line and a strip of grey gravel beach
    c.fillStyle = vg(330, 470, [[0, '#2a7cb8'], [0.6, '#2f9cc4'], [1, '#5fc4c8']]); c.fillRect(-M, 330, W + 2 * M, 200); shimmer(332, 440, 120, '255,255,255', 331, { a: 0.4 });
    const off = lt * 260;
    for (let w = 0; w < 3; w++) { const u = mod(lt * 0.5 + w / 3, 1); c.strokeStyle = `rgba(255,255,255,${0.8 * (1 - u)})`; c.lineWidth = 3; c.beginPath(); for (let x = -M; x <= W + M; x += 10) { const y = 462 - u * 10 + Math.sin((x + off) * 0.02 + w) * 3; x === -M ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
    c.fillStyle = vg(462, 500, [[0, '#b8b4aa'], [1, '#8e8a80']]); c.fillRect(-M, 466, W + 2 * M, 40);
    // cliffs on the right side of the line, sliding past (distant headlands slow, near cliff fast)
    const ridge = (x, o, sp, base, amp) => base - amp * Math.abs(Math.sin((x + o * sp) * 0.003)) - fbm1((x + o * sp) * 0.006) * 50 + (sp === 1 ? Math.max(0, 880 - x) * 0.55 : 0);
    c.fillStyle = '#7f9faa'; c.beginPath(); c.moveTo(W + M, 340); for (let x = W + M; x >= 300; x -= 8) c.lineTo(x, Math.min(340, ridge(x, off, 0.15, 330, 120) + (x - 300) * 0.02)); c.lineTo(300, 340); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(-M, H); for (let x = -M; x <= W + M; x += 6) c.lineTo(x, ridge(x, off, 1, 300, 180)); c.lineTo(W + M, H); c.closePath(); c.fillStyle = vg(120, 500, [[0, '#3f6e3a'], [0.6, '#4a7444'], [1, '#6a6a60']]); c.fill();
    const r = rng(Math.floor(off / 400)); c.save(); c.beginPath(); c.moveTo(-M, H); for (let x = -M; x <= W + M; x += 6) c.lineTo(x, ridge(x, off, 1, 300, 180)); c.lineTo(W + M, H); c.closePath(); c.clip();
    for (let k = 0; k < 140; k++) { const x = mod(r() * 1600 - off, 1600) - 160, y = 160 + r() * 340; c.fillStyle = r() < 0.35 ? 'rgba(150,146,136,0.6)' : mix('#2e5a2c', '#7fae5c', r(), 0.8); c.beginPath(); c.ellipse(x, y, 10 + r() * 20, 6 + r() * 12, 0, 0, TAU); c.fill(); }
    c.restore();
    // track bed + tunnel portal sweeping by
    c.fillStyle = '#6b6b6b'; c.fillRect(-M, 500, W + 2 * M, 40); for (let x = -mod(off * 2, 80); x < W; x += 80) { c.fillStyle = '#4a4a4a'; c.fillRect(x, 500, 6, 40); }
    const tp = mod(off * 1.6, 2600) - 400; if (tp < 1400) { c.fillStyle = '#9a968c'; c.fillRect(tp - 10, 300, 160, 240); c.fillStyle = '#121212'; c.beginPath(); c.moveTo(tp + 20, 540); c.lineTo(tp + 20, 400); c.arc(tp + 70, 400, 50, Math.PI, 0); c.lineTo(tp + 120, 540); c.closePath(); c.fill(); }
  }, '#d8cfc0', '#857a6c'));
  D(1, () => drawCat3({ x: 470, y: 512, s: 1.25, pose: sit3(lt, { ...ex('delighted'), hr: -0.05, ear: -0.1, turn: turnAt(lt, [[1.6, 3.0, 0.9]]) }), emote: emoAt(lt, [[0.8, 2.4, 'spark']]), shadow: false }));
});
/* T4 花東縱谷 */
V('T4', '花蓮 → 臺東', '花東縱谷', 'Huadong Valley', '23.40°N 121.35°E', ['縱谷好長，長到可以一直跑。', 'The rift valley is long enough to run and run.'], [1.02, 1.05, 0, 0, 0, 0], function (lt) {
  const off = lt * 120;
  L('sky', 0, () => { sky([[0, '#4c87c4'], [1, '#dbe8ee']]); cumulus(300, 170, 380, 70, 341, '#ffffff', '#c7d2df', 0.3); cumulus(1000, 150, 330, 70, 342, '#ffffff', '#c7d2df', 0.3); }, { blur: 2 });
  L('cr', 0.05, () => mountain({ base: 330, amp: 130, f: 0.003, seed: 343, top: '#6c86a8', bot: '#8ea2b4', haze: 'rgba(210,225,235,0.5)', peak: 1.3 }), { blur: 1 });
  L('cr2', 0.12, () => mountain({ base: 380, amp: 50, f: 0.005, seed: 344, top: '#5f8a64', bot: '#73986f', tex: 'forest', dark: '#4a6f50', mid: '#5f8a60', light: '#9cbf88', depth: 60, n: 900, r: 3 }), { blur: 0.6, dx: -off * 0.05 });
  L('fields', 0.5, () => { c.fillStyle = vg(390, H, [[0, '#7dbb4f'], [1, '#4f9a2d']]); c.fillRect(-M, 390, W + 2 * M, H); for (let k = 0; k < 9; k++) { const y = 390 + Math.pow(k / 9, 1.7) * 330; line(-M, y, W + M, y, 'rgba(60,110,40,0.5)', 1 + k * 0.4); } });
  D(0.5, () => { c.fillStyle = '#8a8378'; c.fillRect(-M, 448, W + 2 * M, 10); c.fillStyle = '#4b4540'; c.fillRect(-M, 456, W + 2 * M, 3); for (let x = -mod(off, 40) - M; x < W + M; x += 40) c.fillRect(x, 448, 3, 10);
    const tx = 1500 - lt * 420; for (let k = 0; k < 6; k++) { const x = tx + k * 92; c.fillStyle = '#f2f2ee'; c.beginPath(); c.roundRect(x, 418, 88, 30, 6); c.fill(); c.fillStyle = '#e07a2c'; c.fillRect(x, 436, 88, 4); c.fillStyle = '#2b3b4a'; c.fillRect(x + 6, 424, 76, 8); }
    c.save(); c.globalCompositeOperation = 'lighter'; for (let w = 0; w < 5; w++) { const u = mod(lt * 0.3 + w / 5, 1), y = 470 + u * 240; c.fillStyle = `rgba(230,255,170,${0.1 * Math.sin(u * Math.PI)})`; c.fillRect(-M, y - 10, W + 2 * M, 20); } c.restore(); });
  L('path', 0.95, () => { c.fillStyle = vg(590, H, [[0, '#b8a888'], [1, '#8a7a5c']]); c.fillRect(-M, 596, W + 2 * M, 200); });
  D(0.95, () => { grassTufts(590, 600, 80, ['#4f8a2c', '#6fa83f'], 345, 1.2, 14); drawCat3({ x: 60 + lt * 210, y: 600, s: 1.0, pose: { ...gallopPose3(gallopCyc3(lt * 210, 1)), ...ex('happy'), ear: 0.4 }, emote: emoAt(lt, [[1.0, 2.6, 'note']]) }); });
});
/* T5 多良車站 — per photos: from the station's hillside deck, the South-Link line runs straight along the Pacific shore
   into a tunnel under the green headland; red railing on the seaward platform edge, pebble beach and surf below, catenary
   masts, and an orange diesel locomotive hauling orange coaches toward us. Drawn as a one-point perspective. */
const T5VP = [1060, 360], T5F = 600, T5CY = 5;
function t5P(X, Y, Z) { return [T5VP[0] + T5F * X / Z, T5VP[1] + T5F * (T5CY - Y) / Z]; }
function t5Strip(X0, X1, Y, z0, z1, col) { poly([t5P(X0, Y, z0), t5P(X1, Y, z0), t5P(X1, Y, z1), t5P(X0, Y, z1)], col); }
function t5Train(zf) {
  // cars from the far end so nearer ones overlap; clipped at the tunnel mouth (Z = 330)
  const cars = [[17, 1]]; for (let k = 0; k < 6; k++) cars.push([20, 0]);
  let z = zf; const list = []; cars.forEach(([len, loco]) => { list.push([z, z + len, loco]); z += len + 1.2; });
  const XL = -19.8, XR = -16.8, Y0 = 0.55, Y1 = 4.2;
  for (let i = list.length - 1; i >= 0; i--) { let [z0, z1, loco] = list[i]; if (z0 > 330) continue; z1 = Math.min(z1, 330);
    const body = loco ? '#e4602a' : '#c8612e', band = loco ? '#f2c94a' : '#efdcb5';
    // right side
    poly([t5P(XR, Y0, z0), t5P(XR, Y1, z0), t5P(XR, Y1, z1), t5P(XR, Y0, z1)], body);
    poly([t5P(XR, 1.6, z0), t5P(XR, 1.9, z0), t5P(XR, 1.9, z1), t5P(XR, 1.6, z1)], band);
    if (!loco) { poly([t5P(XR, 2.4, z0 + 0.6), t5P(XR, 3.3, z0 + 0.6), t5P(XR, 3.3, z1 - 0.6), t5P(XR, 2.4, z1 - 0.6)], '#2a2f36');
      for (let w = z0 + 2; w < z1 - 1; w += 2.2) { const a = t5P(XR, 2.4, w), b = t5P(XR, 3.3, w); line(a[0], a[1], b[0], b[1], 'rgba(200,120,80,0.8)', Math.max(0.6, 140 / w)); } }
    else { poly([t5P(XR, 2.5, z0 + 0.5), t5P(XR, 3.5, z0 + 0.5), t5P(XR, 3.5, z0 + 2.6), t5P(XR, 2.5, z0 + 2.6)], '#2a2f36');
      for (let v = z0 + 4; v < z1 - 1; v += 1.6) { const a = t5P(XR, 2.2, v), b = t5P(XR, 3.6, v); line(a[0], a[1], b[0], b[1], 'rgba(120,40,10,0.45)', Math.max(0.5, 90 / v)); } }
    // roof
    poly([t5P(XL, Y1, z0), t5P(XR, Y1, z0), t5P(XR, Y1, z1), t5P(XL, Y1, z1)], loco ? '#b6532a' : '#8f8c86');
    // bogies
    poly([t5P(XR - 0.2, 0, z0 + 0.5), t5P(XR - 0.2, Y0, z0 + 0.5), t5P(XR - 0.2, Y0, z1 - 0.5), t5P(XR - 0.2, 0, z1 - 0.5)], '#26221f');
    if (i === 0) { // locomotive face with yellow chevrons, cab windows, headlight
      const f = [t5P(XL, Y0, z0), t5P(XR, Y0, z0), t5P(XR, Y1, z0), t5P(XL, Y1, z0)]; poly(f, '#ea6a2e');
      const q = (u, v) => [lerp(lerp(f[0][0], f[1][0], u), lerp(f[3][0], f[2][0], u), v), lerp(lerp(f[0][1], f[1][1], u), lerp(f[3][1], f[2][1], u), v)];
      for (let k = 0; k < 3; k++) poly([q(0, 0.1 + k * 0.13), q(0.5, 0.2 + k * 0.13), q(1, 0.1 + k * 0.13), q(1, 0.16 + k * 0.13), q(0.5, 0.26 + k * 0.13), q(0, 0.16 + k * 0.13)], '#f4d03a');
      poly([q(0.12, 0.62), q(0.46, 0.62), q(0.46, 0.84), q(0.12, 0.84)], '#283038'); poly([q(0.54, 0.62), q(0.88, 0.62), q(0.88, 0.84), q(0.54, 0.84)], '#283038');
      const hl = q(0.5, 0.52), rr = Math.max(1, 260 / z0); glow(hl[0], hl[1], rr * 5, '255,240,200', 0.6); disc(hl[0], hl[1], rr, '#fffbe8'); }
  }
}
V('T5', '臺東縣 · 太麻里', '多良車站', 'Duoliang Station', '22.51°N 120.96°E', ['多良車站，離太平洋最近的月台。', 'Duoliang — the platform closest to the Pacific.'], [1.02, 1.06, 0, 0, 0, 0], function (lt) {
  const hz = T5VP[1];
  L('sky', 0, () => { sky([[0, '#2f76c6'], [0.45, '#6fa7dc'], [0.62, '#cfe4f2'], [1, '#e8f1f4']]); cumulus(300, 170, 420, 70, 351, '#ffffff', '#c3d0de', 0.3); cumulus(760, 230, 300, 46, 354, '#ffffff', '#c9d5e1', 0.3); cumulus(120, 300, 360, 26, 355, '#ffffff', '#d4dde6', 0.3); }, { blur: 1.5 });
  // the Pacific: deep blue at the horizon, turquoise over the shelf; the pebble beach, embankment and the two tracks
  L('sea', 0.12, () => { c.fillStyle = vg(hz, H, [[0, '#2a6fb0'], [0.18, '#2e82bd'], [0.5, '#38a6c4'], [1, '#56c0c6']]); c.fillRect(-M, hz, W + 2 * M, H);
    c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(-M, hz, W + 2 * M, 1.5);
    c.fillStyle = 'rgba(120,150,170,0.55)'; c.beginPath(); c.moveTo(880, hz + 1); c.quadraticCurveTo(960, hz - 18, 1060, hz - 10); c.lineTo(1060, hz + 1); c.fill();
    poly([t5P(-34, -1, 9), t5P(-23, -1, 9), t5P(-23, -1, 2000), t5P(-34, -1, 2000)], '#a8a296');
    const r = rng(356); for (let k = 0; k < 900; k++) { const X = -34 + r() * 11, Z = 9 + Math.pow(r(), 2.2) * 300, p = t5P(X, -1, Z), rr = Math.max(0.4, 9 / Z); disc(p[0], p[1], rr, r() < 0.5 ? '#c9c4b8' : '#7e796f'); }
    poly([t5P(-23, -1, 9), t5P(-21.6, 0.9, 9), t5P(-21.6, 0.9, 2000), t5P(-23, -1, 2000)], '#8c877e');
    t5Strip(-21.6, -19.9, 0.9, 9, 2000, '#bdb8ac');
    t5Strip(-19.9, -12.5, 0, 9, 2000, '#7b7066');
    for (const X of [-18.3, -14.6]) { for (let Z = 9; Z < 600; Z += 0.65) { const a = t5P(X - 1.1, 0, Z), b = t5P(X + 1.1, 0, Z); if (b[1] - a[1] > 0.4 || Z < 100) line(a[0], a[1], b[0], b[1], 'rgba(70,58,48,0.8)', Math.max(0.5, 30 / Z)); }
      for (const g of [-0.54, 0.54]) { const a = t5P(X + g, 0.15, 9), b = t5P(X + g, 0.15, 2000); line(a[0], a[1], b[0], b[1], '#5a524c', 2); line(a[0], a[1] - 1, b[0], b[1], 'rgba(230,225,215,0.7)', 1); } }
  });
  D(0.12, () => { // surf lines washing along the beach
    poly([t5P(-36.5, -1, 9), t5P(-34, -1, 9), t5P(-34, -1, 2000), t5P(-36.5, -1, 2000)], 'rgba(235,250,250,0.35)');
    for (let w = 0; w < 4; w++) { const u = mod(lt * 0.35 + w / 4, 1), X = -36.5 + u * 2.5, a = Math.sin(u * Math.PI);
      c.strokeStyle = `rgba(255,255,255,${0.85 * a})`; c.lineWidth = 2.5; c.beginPath(); for (let Z = 12; Z < 900; Z *= 1.08) { const p = t5P(X - Math.sin(Z * 0.3 + w) * 0.4, -1, Z); Z === 12 ? c.moveTo(p[0], p[1]) : c.lineTo(p[0], p[1]); } c.stroke(); }
    shimmer(hz + 3, 560, 160, '255,255,255', 352, { a: 0.35 }); });
  // the headland the line tunnels under, with the portal
  L('hill', 0.2, () => { const foot = Z => t5P(-12.5, 0, Z); const ridge = x => hz - 6 - Math.max(0, x - 905) * 0.72 - fbm1(x * 0.012 + 3) * 26;
    const f0 = foot(9.5), f1 = foot(330);
    c.save(); c.beginPath(); c.moveTo(f0[0], H + 20); c.lineTo(f0[0], f0[1]); c.lineTo(f1[0], f1[1]); for (let x = 905; x <= W + M; x += 6) c.lineTo(x, Math.min(f1[1], ridge(x))); c.lineTo(W + M, H + 20); c.closePath(); c.clip();
    mountain({ fn: x => Math.min(H - 10, ridge(Math.max(905, x))), floor: H + 20, top: '#3f7a3c', bot: '#2f5e30', tex: 'forest', dark: '#24482a', mid: '#3f7a3c', light: '#9cc47a', depth: 560, n: 2600, r: 6, seed: 353 });
    c.fillStyle = vg(100, 600, [[0, 'rgba(190,215,230,0)'], [0.55, 'rgba(190,215,230,0.4)'], [1, 'rgba(190,215,230,0)']]); c.fillRect(-M, 92, W + 2 * M, 520); c.restore();
    const pa = t5P(-21, 0, 330), pb = t5P(-12, 0, 330), pt = t5P(-16.5, 7, 330); c.fillStyle = '#bdb6a8'; c.fillRect(pa[0] - 4, pt[1] - 6, pb[0] - pa[0] + 8, pa[1] - pt[1] + 6);
    c.fillStyle = '#141412'; c.beginPath(); c.moveTo(pa[0] + 1, pa[1]); c.lineTo(pa[0] + 1, lerp(pa[1], pt[1], 0.55)); c.quadraticCurveTo((pa[0] + pb[0]) / 2, pt[1] - 2, pb[0] - 1, lerp(pa[1], pt[1], 0.55)); c.lineTo(pb[0] - 1, pb[1]); c.fill(); });
  // catenary masts on the hillside side, arms reaching over the tracks
  L('cat', 0.2, () => { for (let Z = 330; Z >= 20; Z -= 45) { const a = t5P(-12.6, 0, Z), b = t5P(-12.6, 7.6, Z), e = t5P(-19, 7.2, Z); line(a[0], a[1], b[0], b[1], '#8e9196', Math.max(1, 70 / Z)); line(b[0], b[1], e[0], e[1], '#8e9196', Math.max(0.8, 40 / Z)); }
    for (const X of [-18.3, -14.6]) { const a = t5P(X, 6.6, 12), b = t5P(X, 6.6, 330); line(a[0], a[1], b[0], b[1], 'rgba(50,50,55,0.6)', 1); } });
  // the train, then the red railing on the seaward platform edge
  D(0.2, () => { t5Train(95 - lt * 20);
    for (let Z = 330; Z >= 9.5; Z -= 2.5) { const a = t5P(-21.6, 0.9, Z), b = t5P(-21.6, 2.0, Z); line(a[0], a[1], b[0], b[1], '#d4352b', Math.max(0.6, 26 / Z)); }
    for (const Y of [2.0, 1.45]) { const a = t5P(-21.6, Y, 9.5), b = t5P(-21.6, Y, 330); line(a[0], a[1], b[0], b[1], '#e2433a', Y === 2 ? 3 : 2); } });
  // the station's viewing deck in the foreground, blue railing
  L('plat', 0.95, () => { poly([[600, H + 40], [700, 588], [W + M, 588], [W + M, H + 40]], '#a8a49c'); c.fillStyle = vg(588, H, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.25)']]); c.fillRect(600, 588, W, 60);
    for (let x = 720; x < W + M; x += 40) line(x, 588, x - 30, H, 'rgba(90,85,78,0.35)', 1);
    line(700, 588, W + M, 588, '#7b776f', 3);
    for (let x = 712; x < W + M; x += 34) line(x, 588, x, 546, '#2f86c8', 3); line(706, 548, W + M, 548, '#3a96d6', 5); line(706, 568, W + M, 568, '#2f86c8', 3);
    line(600, H + 10, 700, 588, '#7b776f', 3); for (let u = 0.1; u < 1; u += 0.25) { const x = lerp(600, 700, u), y = lerp(H + 10, 588, u); line(x, y, x, y - 42, '#2f86c8', 3); } line(612, 610, 704, 548, '#3a96d6', 5);
    bushes(16, 560, 720, x => 600 + (720 - x) * 0.3, 357, '#2f5a2c', '#5f9446', 18); });
  D(0.95, () => drawCat3({ x: 880, y: 606, s: 1.0, face: -1, pose: sit3(lt, { ...exSeq(lt, [[0, 'content'], [1.4, 'surprised'], [2.4, 'happy']]), hr: lt > 1.4 && lt < 2.6 ? -0.12 : -0.02, ts: 1.6 }), emote: emoAt(lt, [[1.4, 2.3, '!']]), shadow: false }));
});
/* T6 高屏溪斜張橋 — per photos (blue hour, from the wooded bank): the asymmetric single-pylon cable-stayed bridge, an
   inverted-Y pylon floodlit white and blue with a red beacon, the long main span's cables lit pink-red fanning down one side
   and the denser back stays on the other, orange deck lamps and light trails, the wide braided riverbed below. */
const T6D = x => 452 + (x + 60) / 1400 * 86, T6TH = x => 5 + (x + 60) / 1400 * 15, T6PX = 430;
V('T6', '屏東 → 高雄', '高屏溪斜張橋', 'Kao-Ping Hsi Bridge', '22.64°N 120.43°E', ['跨過高屏溪，就到高雄了。', 'Across the Gaoping River lies Kaohsiung.'], [1.02, 1.06, -20, 20, 0, 0], function (lt) {
  const hz = 440;
  L('sky', 0, () => { sky([[0, '#0a1844'], [0.35, '#183a82'], [0.62, '#3f62a8'], [0.8, '#8a8fb8'], [1, '#c99a8a']]); glow(140, hz, 520, '255,150,90', 0.22); glow(1100, hz, 360, '255,170,120', 0.1); stars(90, 361, 300, 0.5); });
  // far hills on the Kaohsiung side with the city's lights along the horizon
  L('far', 0.06, () => { mountain({ base: hz, amp: 34, f: 0.004, seed: 362, top: '#1e2c56', bot: '#26335e', floor: hz + 2 });
    const r = rng(365); for (let k = 0; k < 260; k++) { const x = r() * (W + 2 * M) - M, y = hz - 2 - r() * 10 * r(); disc(x, y, 0.6 + r(), `rgba(255,${180 + r() * 60 | 0},${110 + r() * 60 | 0},${0.4 + r() * 0.5})`); } }, { blur: 0.6 });
  // braided riverbed: grey sand bars and channels holding the sky
  L('river', 0.15, () => { c.fillStyle = vg(hz, H, [[0, '#4a5574'], [1, '#2a3048']]); c.fillRect(-M, hz, W + 2 * M, H);
    const r = rng(366); for (let k = 0; k < 16; k++) { const y = hz + 4 + Math.pow(r(), 1.4) * 190, x = r() * (W + 2 * M) - M, w = 120 + r() * 520, h = 2 + (y - hz) * 0.05 * (0.5 + r());
      c.fillStyle = vg(y - h, y + h, [[0, '#7c8dbc'], [1, '#5a6a9a']]); c.beginPath(); c.ellipse(x, y, w, h, 0, 0, TAU); c.fill(); }
    for (let k = 0; k < 700; k++) { const y = hz + r() * 200; disc(r() * (W + 2 * M) - M, y, 0.6 + (y - hz) * 0.01, 'rgba(20,24,40,0.25)'); } });
  D(0.15, () => { shimmer(hz + 6, 620, 90, '160,180,240', 367, { a: 0.25 });
    // reflections of the lit pylon and lamps in the channels
    c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 18; k++) { const y = 520 + k * 6, w = 6 + Math.sin(T * 2 + k) * 3; c.fillStyle = `rgba(200,230,255,${0.12 * (1 - k / 18)})`; c.fillRect(T6PX - w + Math.sin(k + T * 3) * 3, y, w * 2, 2); } c.restore(); });
  // the bridge: piers, deck, pylon and the two fans of stay cables (all floodlit)
  L('br', 0.25, () => {
    for (let x = -40, k = 0; x < W + M; k++) { const y = T6D(x), th = T6TH(x), w = 4 + th * 0.5; c.fillStyle = vg(y, y + 70 + th * 3, [[0, '#9aa8c8'], [1, '#3c4668']]); c.fillRect(x - w / 2, y + th, w, 62 + th * 3); x += 60 + k * 14; }
    c.beginPath(); c.moveTo(-M, T6D(-M)); c.lineTo(W + M, T6D(W + M)); c.lineTo(W + M, T6D(W + M) + T6TH(W + M)); c.lineTo(-M, T6D(-M) + T6TH(-M)); c.closePath(); c.fillStyle = hg(-M, W + M, [[0, '#4a5680'], [1, '#6a76a0']]); c.fill();
    line(-M, T6D(-M), W + M, T6D(W + M), '#c8d4ee', 2); line(-M, T6D(-M) - 4, W + M, T6D(W + M) - 9, 'rgba(200,215,245,0.6)', 1.2);
    // inverted-Y pylon: two legs straddle the deck and meet in one mast
    const yb = 528, yj = 300, yt = 118, px = T6PX;
    const leg = (x0, x1, w0, w1) => { poly([[x0 - w0, yb], [x1 - w1, yj], [x1 + w1, yj], [x0 + w0, yb]]); };
    c.fillStyle = hg(px - 60, px + 60, [[0, '#f2fbff'], [0.5, '#bfe2ff'], [1, '#6f96d8']]); leg(px - 50, px - 3, 8, 5); c.fill(); leg(px + 52, px + 3, 8, 5); c.fill();
    poly([[px - 8, yj + 4], [px - 4.5, yt], [px + 4.5, yt], [px + 8, yj + 4]]); c.fill();
    c.fillStyle = 'rgba(40,60,120,0.35)'; poly([[px + 1, yj + 4], [px + 1, yt], [px + 4.5, yt], [px + 8, yj + 4]]); c.fill();
    // stay cables: back stays to the left (denser, shorter), main span to the right (long fan, lit pink-red)
    c.save(); c.globalCompositeOperation = 'lighter'; c.lineWidth = 1.1;
    for (let k = 0; k < 15; k++) { const ym = yt + 22 + k * 11, xa = 395 - (14 - k) * 24; c.strokeStyle = `rgba(170,220,255,${0.5 + k * 0.02})`; c.beginPath(); c.moveTo(px - 2, ym); c.lineTo(xa, T6D(xa)); c.stroke(); }
    for (let k = 0; k < 15; k++) { const ym = yt + 22 + k * 11, xa = 500 + (14 - k) * 62 + (14 - k) * (14 - k) * 3; c.strokeStyle = `rgba(255,${110 + k * 6},${150 + k * 4},${0.55})`; c.beginPath(); c.moveTo(px + 2, ym); c.lineTo(xa, T6D(xa)); c.stroke(); }
    glow(px, yt + 120, 160, '120,180,255', 0.22); glow(px, yj + 60, 120, '180,220,255', 0.18); c.restore();
  });
  // deck lamps, light trails and the beacon
  D(0.25, () => { c.save(); c.globalCompositeOperation = 'lighter';
    for (let x = -M, k = 0; x < W + M; k++) { const y = T6D(x) - 6 - T6TH(x) * 0.3; disc(x, y, 1 + T6TH(x) * 0.08, '#ffd08a'); glow(x, y + 3, 8 + T6TH(x), '255,170,90', 0.35); x += 26 + k * 2.5; }
    for (let k = 0; k < 9; k++) { const sp = k % 2 ? 1 : -1, u = mod(lt * (0.25 + 0.04 * k) * sp + k * 0.13, 1), x0 = lerp(-M, W + M, u), len = 40 + T6TH(x0) * 6, col = sp > 0 ? '255,245,225' : '255,70,60';
      const g = c.createLinearGradient(x0 - len * sp, 0, x0, 0); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},0.85)`); c.strokeStyle = g; c.lineWidth = 1.2 + T6TH(x0) * 0.1;
      const yy = x => T6D(x) - 2 + (sp > 0 ? 0 : -2); c.beginPath(); c.moveTo(x0 - len * sp, yy(x0 - len * sp)); c.lineTo(x0, yy(x0)); c.stroke(); }
    const bl = 0.6 + 0.4 * Math.sin(T * 4); glow(T6PX, 116, 26, '255,70,50', 0.9 * bl); disc(T6PX, 116, 2.4, '#ff6a50'); c.restore(); });
  // the wooded bank in the foreground: silver grass, tree silhouettes, the cat on the path
  L('levee', 0.9, () => { c.fillStyle = vg(570, H, [[0, '#1c2440'], [1, '#0c1020']]); c.fillRect(-M, 588, W + 2 * M, 200); c.fillStyle = '#3c4462'; c.fillRect(-M, 598, W + 2 * M, 8);
    bushes(40, -M, 260, x => 560 + Math.abs(x - 60) * 0.1, 368, '#0b1020', '#1a2240', 34); bushes(26, 1080, W + M, x => 560 - (x - 1080) * 0.25, 369, '#0b1020', '#1a2240', 38);
    c.fillStyle = '#080c18'; c.beginPath(); c.moveTo(W + M, 92); c.lineTo(1190, 92); c.quadraticCurveTo(1150, 240, 1210, 420); c.lineTo(W + M, 520); c.fill();
    const r = rng(370); for (let k = 0; k < 140; k++) { const x = 1140 + r() * 200, y = 92 + r() * 380; oval(x, y, 10 + r() * 18, 6 + r() * 10, r() * 3, mix('#070a14', '#16203a', r())); } });
  D(0.9, () => { const r = rng(364); for (let k = 0; k < 46; k++) { const x = r() * (W + 2 * M) - M, h = 40 + r() * 50, sw = Math.sin(T * 1.4 + x * 0.01) * 8; c.strokeStyle = 'rgba(40,46,70,0.95)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, 640); c.quadraticCurveTo(x + sw * 0.3, 640 - h * 0.6, x + sw, 640 - h); c.stroke(); oval(x + sw + 3, 640 - h + 6, 3.5, 11, 0.4 + sw * 0.03, 'rgba(190,200,235,0.55)'); }
    const q = { x: 280 + lt * 30, y: 598, s: 1.0, haze: '16,24,66,0.55', rim: '170,205,255' }; q.pose = { ...walkPose3(walkCyc3(lt * 30, 1)), ...ex('content', 0.7), hr: -0.12 }; drawCat3(q); });
});
/* T7 渡輪 — per photos of the Taiwan-Hwa (臺華輪): on the open side deck — white superstructure with portholes, a life
   ring and the blue-and-red livery stripe, an orange lifeboat hanging from its davits overhead, the white multi-rail
   railing, painted steel deck with a round bench — and outside, the white wake churning back toward Kaohsiung's
   skyline (85 Sky Tower) sinking into the haze. The ship rolls gently. */
function t7Skyline(hz) {
  c.fillStyle = 'rgba(120,140,160,0.55)'; const r = rng(374);
  for (let x = 40; x < 520; x += 6 + r() * 12) { const h = 3 + r() * 14 * (1 - Math.abs(x - 260) / 300); c.fillRect(x, hz - h, 5 + r() * 8, h); }
  // 85 Sky Tower: two shafts that join high up, with the spire on top
  c.fillStyle = 'rgba(118,138,160,0.55)'; c.fillRect(246, hz - 52, 6, 52); c.fillRect(262, hz - 52, 6, 52); c.fillRect(246, hz - 70, 22, 20); c.fillRect(252, hz - 86, 10, 18); c.fillRect(256, hz - 96, 2, 12);
  // harbour cranes
  c.strokeStyle = 'rgba(120,140,160,0.6)'; c.lineWidth = 1.2; for (const x of [380, 410, 440]) { c.beginPath(); c.moveTo(x, hz); c.lineTo(x, hz - 18); c.lineTo(x - 14, hz - 18); c.moveTo(x, hz - 18); c.lineTo(x + 6, hz - 22); c.stroke(); }
}
V('T7', '臺灣海峽', '高雄 → 馬公 渡輪', 'Ferry to Penghu', '23.00°N 120.00°E', ['第一次搭船，風好大。', 'First time on a ferry. So windy!'], [1.02, 1.05, 0, 0, 0, 4], function (lt) {
  const roll = Math.sin(lt * 1.2) * 0.012, hz = 372;
  L('sky', 0, () => { sky([[0, '#3f7fc6'], [0.55, '#9cc4e4'], [1, '#e2eef4']]); cumulus(380, 200, 420, 64, 371, '#ffffff', '#c6d3e1', 0.3); cumulus(900, 250, 300, 40, 375, '#ffffff', '#ccd8e4', 0.3); }, { blur: 1.5 });
  D(0.1, () => { c.save(); c.translate(640, 420); c.rotate(roll); c.translate(-640, -420);
    c.fillStyle = vg(hz, H, [[0, '#2f6fa6'], [0.3, '#1f5f98'], [1, '#2a86b4']]); c.fillRect(-M - 100, hz, W + 2 * M + 200, 500);
    c.fillStyle = 'rgba(230,240,248,0.5)'; c.fillRect(-M - 100, hz - 1, W + 2 * M + 200, 2); t7Skyline(hz);
    shimmer(hz + 3, 600, 200, '255,255,255', 372, { a: 0.4, sp: 3 });
    // the wake: a wide band of churned turquoise and white foam streaming back from the hull, narrowing into the distance
    const wy = x => lerp(hz + 8, 540, clamp((x + 60) / 1300)), ww = x => lerp(3, 46, clamp((x + 60) / 1300));
    c.fillStyle = 'rgba(110,200,210,0.35)'; c.beginPath(); for (let x = -M; x <= W + M; x += 20) c.lineTo(x, wy(x) - ww(x) * 1.4); for (let x = W + M; x >= -M; x -= 20) c.lineTo(x, wy(x) + ww(x) * 0.6); c.fill();
    const r = rng(376); for (let k = 0; k < 190; k++) { const u = mod(r() - lt * (0.08 + r() * 0.05), 1), x = lerp(-M, W + M, Math.pow(u, 0.8)), g = (r() + r() + r()) / 3 - 0.5, y = wy(x) - ww(x) * 0.4 + g * ww(x) * 2.4, l = 6 + ww(x) * (0.4 + r());
      c.strokeStyle = `rgba(255,255,255,${0.5 + r() * 0.4})`; c.lineWidth = 1 + ww(x) * 0.06; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x - l * 0.5, y - 2, x - l, y + 1); c.stroke(); }
    // diverging wave of the wake
    for (let k = 0; k < 3; k++) { const ph = mod(lt * 0.4 + k / 3, 1); c.strokeStyle = `rgba(255,255,255,${0.35 * Math.sin(ph * Math.PI)})`; c.lineWidth = 1.5; c.beginPath(); c.moveTo(W + M, 470 - k * 14 - ph * 10); c.quadraticCurveTo(700, 440 - k * 8 - ph * 6, 80, hz + 14 + k * 3); c.stroke(); }
    c.restore(); flock(3, 700, 220, -30, 0.9, 'rgba(255,255,255,0.95)', 373, lt); });
  // the ship: superstructure on the right, lifeboat overhead, railing and deck
  L('deck', 0.95, () => {
    // deck overhead: the upper deck's edge and an orange lifeboat in its davits
    c.fillStyle = vg(92, 132, [[0, '#d8dcdf'], [1, '#f4f5f4']]); c.beginPath(); c.moveTo(560, 92); c.lineTo(W + M, 92); c.lineTo(W + M, 150); c.lineTo(980, 132); c.lineTo(560, 112); c.fill();
    line(560, 112, 980, 132, '#9aa2a8', 2);
    for (const x of [700, 930]) { line(x, 112, x - 20, 150, '#e8eaea', 6); line(x - 20, 150, x - 20, 168, '#9aa2a8', 2); }
    c.fillStyle = '#ef7a2a'; c.beginPath(); c.moveTo(640, 166); c.quadraticCurveTo(650, 204, 700, 208); c.lineTo(930, 208); c.quadraticCurveTo(980, 204, 990, 166); c.closePath(); c.fill();
    c.fillStyle = '#f59a50'; c.fillRect(640, 160, 350, 10); c.fillStyle = '#ffffff'; c.fillRect(640, 158, 350, 4); c.fillStyle = 'rgba(120,50,10,0.35)'; c.fillRect(660, 196, 300, 4);
    // superstructure wall with portholes, door, life ring and the livery stripe
    c.fillStyle = hg(1010, W + M, [[0, '#e9ecec'], [1, '#ffffff']]); c.fillRect(1010, 140, W + M - 1010, 460); line(1010, 140, 1010, 600, '#c4c9cc', 3);
    for (const [x, y] of [[1060, 220], [1140, 220], [1220, 220]]) { disc(x, y, 13, '#9aa3aa'); disc(x, y, 10, '#36505f'); disc(x - 3, y - 3, 3, 'rgba(255,255,255,0.6)'); }
    c.fillStyle = '#c7ccd0'; c.beginPath(); c.roundRect(1110, 300, 74, 220, 14); c.fill(); c.fillStyle = '#aab1b6'; c.beginPath(); c.roundRect(1118, 308, 58, 204, 10); c.fill(); disc(1168, 420, 4, '#555c62');
    disc(1060, 360, 24, '#ef6a2a'); disc(1060, 360, 13, '#e9ecec'); c.fillStyle = '#ffffff'; for (let a = 0; a < 4; a++) { c.save(); c.translate(1060, 360); c.rotate(a * Math.PI / 2 + 0.4); c.fillRect(13, -5, 11, 10); c.restore(); }
    c.fillStyle = '#1f4fa0'; c.fillRect(1010, 540, W + M - 1010, 14); c.fillStyle = '#d6332b'; c.fillRect(1010, 557, W + M - 1010, 5);
    // painted steel deck
    c.fillStyle = vg(570, H, [[0, '#5b6f80'], [1, '#3a4a5a']]); c.fillRect(-M, 572, W + 2 * M, 200); for (let k = 0; k < 30; k++) line(-M + k * 50, 572, -M + k * 64 - 140, H + 30, 'rgba(30,40,50,0.35)', 1);
    c.fillStyle = 'rgba(255,255,255,0.08)'; c.fillRect(-M, 572, W + 2 * M, 6);
    // deck edge with the livery stripe, then the white railing
    c.fillStyle = '#e9ecec'; c.fillRect(-M, 560, 1010 + M, 12); c.fillStyle = '#1f4fa0'; c.fillRect(-M, 564, 1010 + M, 4);
    for (const [y, w] of [[512, 6], [528, 3], [543, 3], [557, 3]]) line(-M, y, 1010, y, '#f6f7f6', w);
    for (let x = -M + 20; x < 1010; x += 58) { line(x, 510, x, 562, '#f6f7f6', 4); line(x + 2, 512, x + 2, 562, 'rgba(120,130,140,0.4)', 1); }
    // round bench (orange ring with a wooden seat)
    c.fillStyle = '#d6562e'; c.beginPath(); c.ellipse(170, 600, 90, 18, 0, 0, TAU); c.fill(); c.fillStyle = '#566a7b'; c.beginPath(); c.ellipse(170, 600, 78, 13, 0, 0, TAU); c.fill();
    c.fillStyle = '#b57a46'; c.fillRect(112, 582, 116, 9); c.fillStyle = '#d29a62'; c.fillRect(112, 582, 116, 2); c.fillStyle = '#8a5a32'; c.fillRect(118, 591, 6, 11); c.fillRect(216, 591, 6, 11);
  });
  D(0.95, () => drawCat3({ x: 420, y: 588, s: 1.1, pose: sit3(lt, { ...ex('annoyed'), earDown: 1, hr: -0.1 + Math.sin(lt * 9) * 0.02, ts: 4, turn: turnAt(lt, [[1.4, 3.0, 0.85]]) }), emote: emoAt(lt, [[0.9, 2.6, 'drop']]) }));
});
/* T8 澎湖跨海大橋 — shallow turquoise lagoon over reef patches, the long low bridge running away to Xiyu on the horizon,
   the white arch at this end, people fishing off the railing */
V('T8', '澎湖縣 · 白沙', '澎湖跨海大橋', 'Penghu Great Bridge', '23.65°N 119.53°E', ['澎湖跨海大橋，把兩座島連在一起。', 'The Penghu Great Bridge joins two islands together.'], [1.03, 1.08, 0, 0, 0, 0], function (lt) {
  SC.sc.sun = SC.sc.sun || (() => [1000, 110, 0.5]);
  L('sky', 0, () => { sky([[0, '#2f7cc8'], [0.55, '#8cc4e6'], [1, '#e2f2f6']]); cumulus(260, 200, 340, 60, 381, '#ffffff', '#c9d6e2', 0.3); cumulus(820, 170, 420, 70, 383, '#ffffff', '#cdd8e3', 0.3); }, { blur: 1.5 });
  L('sea', 0.1, () => { const hz = 410; c.fillStyle = vg(hz, H, [[0, '#2b7fb8'], [0.25, '#2f9cc4'], [0.6, '#43bfc6'], [1, '#7fdcd0']]); c.fillRect(-M, hz, W + 2 * M, H);
    // reef and sand patches seen through the shallow water, flattened by perspective
    const r = rng(384); for (let k = 0; k < 70; k++) { const y = hz + 20 + Math.pow(r(), 0.7) * 260, x = r() * (W + 2 * M) - M, sc = (y - hz) / 260; oval(x, y, (20 + r() * 60) * sc, (3 + r() * 6) * sc, 0, r() < 0.55 ? `rgba(30,70,90,${0.25 + r() * 0.2})` : `rgba(220,240,220,${0.18 + r() * 0.15})`); }
    // Xiyu, low on the horizon, with a few white houses
    c.fillStyle = '#7d9a96'; c.beginPath(); c.moveTo(-M, hz); c.bezierCurveTo(100, hz - 14, 420, hz - 18, 700, hz - 6); c.lineTo(760, hz); c.closePath(); c.fill(); for (let k = 0; k < 18; k++) { c.fillStyle = 'rgba(240,240,236,0.8)'; c.fillRect(60 + k * 34 + r() * 10, hz - 10 - r() * 6, 5, 4); }
    c.fillStyle = 'rgba(230,240,245,0.5)'; c.fillRect(-M, hz - 22, W + 2 * M, 22); }, { blur: 0.6 });
  D(0.1, () => shimmer(420, H, 260, '255,255,255', 382, { a: 0.5, xc: 1000, spread: 900 }));
  // the bridge running away to the left: deck on many short piers, shrinking into the haze
  L('far', 0.3, () => { const A = [1380, 486], B = [-260, 416];
    for (let k = 0; k <= 46; k++) { const u = Math.pow(k / 46, 0.62), x = lerp(A[0], B[0], u), y = lerp(A[1], B[1], u), sc = lerp(1, 0.18, u), hz = clamp(u * 1.3);
      c.fillStyle = mix('#c8c4b8', '#dce8ee', hz); c.fillRect(x - 3 * sc, y, 6 * sc, 26 * sc); c.fillStyle = `rgba(40,80,100,${0.25 * (1 - hz)})`; c.fillRect(x - 3 * sc, y + 26 * sc, 6 * sc, 4 * sc); }
    c.fillStyle = vg(410, 490, [[0, '#dfe9ec'], [1, '#e9e6de']]); c.beginPath(); c.moveTo(A[0], A[1] - 14); c.lineTo(B[0], B[1] - 3); c.lineTo(B[0], B[1]); c.lineTo(A[0], A[1]); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(120,130,140,0.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(A[0], A[1] - 18); c.lineTo(B[0], B[1] - 4); c.stroke(); });
  // white arch at this end of the bridge
  L('arch', 0.55, () => { const ped = (x) => { c.fillStyle = vg(500, 560, [[0, '#b8b0a0'], [1, '#8a8274']]); c.fillRect(x - 46, 506, 92, 52); c.fillStyle = '#6a3a2c'; c.fillRect(x - 46, 506, 92, 8); const r = rng(x); for (let k = 0; k < 14; k++) { c.strokeStyle = 'rgba(80,74,64,0.5)'; c.lineWidth = 0.8; c.strokeRect(x - 46 + (k % 7) * 13, 516 + Math.floor(k / 7) * 20, 13, 20); } };
    c.strokeStyle = '#f7f6f2'; c.lineWidth = 28; c.beginPath(); c.moveTo(720, 512); c.bezierCurveTo(760, 160, 1160, 160, 1200, 512); c.stroke(); c.strokeStyle = 'rgba(150,150,145,0.4)'; c.lineWidth = 5; c.beginPath(); c.moveTo(734, 512); c.bezierCurveTo(774, 176, 1146, 176, 1186, 512); c.stroke(); ped(720); ped(1200);
    c.fillStyle = '#4a4a4a'; c.font = `700 22px ${FONTS}`; c.textAlign = 'center'; c.save(); c.translate(1080, 262); c.rotate(0.38); c.fillText('澎 湖 跨 海 大 橋', 0, 0); c.restore(); });
  // our deck: railing in front of the sea, road surface
  L('deck', 0.6, () => { c.fillStyle = vg(556, H, [[0, '#a6a49e'], [1, '#5c5a55']]); c.fillRect(-M, 556, W + 2 * M, 200); c.fillStyle = '#f2f0ea'; c.fillRect(-M, 552, W + 2 * M, 8);
    for (let x = -M; x < W + M; x += 36) { c.fillStyle = '#e9e7e0'; c.fillRect(x, 512, 6, 44); c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x + 5, 514, 2, 42); }
    c.fillStyle = '#f7f6f2'; c.fillRect(-M, 508, W + 2 * M, 6); c.fillStyle = '#4f8fb8'; c.fillRect(-M, 530, W + 2 * M, 3);
    const r = rng(385); for (let k = 0; k < 300; k++) disc(r() * (W + 2 * M) - M, 566 + r() * 70, 0.6 + r(), `rgba(${r() < 0.5 ? '60,58,54' : '220,218,210'},0.35)`); line(-M, 600, W + M, 600, 'rgba(255,255,255,0.65)', 3); });
  D(0.6, () => { const q = { x: 300 + lt * 70, y: 560, s: 0.95 }; q.pose = { ...walkPose3(walkCyc3(lt * 70, 0.95, true), { trot: 1 }), ...ex('happy', 0.8) }; drawCat3(q); });
  D(1, () => { c.save(); c.filter = `blur(${6 * S}px)`; c.fillStyle = 'rgba(240,238,232,0.9)'; c.fillRect(-M, 640, W + 2 * M, 14); c.restore(); });
});
/* T9 北回歸線標誌 */
V('T9', '嘉義縣 · 水上', '北回歸線標誌', 'Tropic of Cancer Monument', '23.46°N 120.42°E', ['北回歸線上，夏至正午的影子會消失。', 'On the Tropic of Cancer, shadows vanish at noon on midsummer’s day.'], [1.02, 1.08, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#3f7cc6'], [1, '#e1ecf0']]); cumulus(1050, 200, 300, 70, 391, '#ffffff', '#cbd6e2', -0.3); }, { blur: 2 });
  L('mon', 0.4, () => { c.fillStyle = vg(450, H, [[0, '#7fae5a'], [1, '#4f7e34']]); c.fillRect(-M, 470, W + 2 * M, H); bushes(40, -M, W + M, () => 470, 392, '#3f6a32', '#6f9a4e', 18);
    // Sun Exploration Hall: a broad white dome on a wide base, a glass band, a grand central stair
    const x = 600, y = 470; c.fillStyle = vg(y - 60, y, [[0, '#f0f0ec'], [1, '#c9c9c2']]); c.fillRect(x - 230, y - 60, 460, 60);
    c.fillStyle = hg(x - 210, x + 210, [[0, '#ffffff'], [0.6, '#e6e8e8'], [1, '#bfc4c6']]); c.beginPath(); c.moveTo(x - 210, y - 60); c.quadraticCurveTo(x - 190, y - 230, x - 40, y - 250); c.lineTo(x + 40, y - 250); c.quadraticCurveTo(x + 190, y - 230, x + 210, y - 60); c.closePath(); c.fill();
    c.fillStyle = 'rgba(70,110,150,0.85)'; c.beginPath(); c.moveTo(x - 140, y - 150); c.quadraticCurveTo(x, y - 168, x + 140, y - 150); c.lineTo(x + 150, y - 128); c.quadraticCurveTo(x, y - 146, x - 150, y - 128); c.closePath(); c.fill();
    for (let k = 0; k < 14; k++) line(x - 130 + k * 20, y - 162 + Math.abs(k - 6.5) * 1.2, x - 132 + k * 20, y - 132 + Math.abs(k - 6.5) * 1, 'rgba(230,240,250,0.6)', 1);
    c.fillStyle = '#f7f7f4'; c.fillRect(x - 46, y - 268, 92, 20); c.fillStyle = '#d0d4d6'; c.fillRect(x - 46, y - 252, 92, 4);
    // central staircase
    for (let k = 0; k < 10; k++) { const yy = y - 6 - k * 6, w = 120 - k * 6; c.fillStyle = k % 2 ? '#d8d6ce' : '#c6c4bc'; c.fillRect(x - w / 2, yy, w, 6); }
    c.fillStyle = '#3d5a8a'; c.fillRect(x - 30, y - 96, 60, 36);
    // the white monument: a tall slender tower with a ball and arrow on top
    const mx = 930; c.fillStyle = hg(mx - 14, mx + 14, [[0, '#ffffff'], [1, '#c9cbc8']]); c.beginPath(); c.moveTo(mx - 16, y); c.lineTo(mx - 8, y - 270); c.lineTo(mx + 8, y - 270); c.lineTo(mx + 16, y); c.closePath(); c.fill();
    c.fillStyle = '#d8d8d2'; c.fillRect(mx - 26, y - 24, 52, 24); disc(mx, y - 280, 12, '#f2f2ee'); line(mx, y - 292, mx, y - 320, '#e8e8e2', 3); poly([[mx - 8, y - 314], [mx, y - 330], [mx + 8, y - 314]], '#e8e8e2');
    line(mx, y - 280, mx + 40, y - 280, '#d0d0ca', 2);
    // palms and trees around the hall
    [[300, y], [380, y], [860, y], [1060, y], [1140, y]].forEach(([px, py], k) => { line(px, py, px + 4, py - 90 - k * 6, '#6a5a44', 4); for (let a = 0; a < 7; a++) { const an = -Math.PI / 2 + (a - 3) * 0.5; c.strokeStyle = '#3f7a3a'; c.lineWidth = 4; c.beginPath(); c.moveTo(px + 4, py - 90 - k * 6); c.quadraticCurveTo(px + 4 + Math.cos(an) * 30, py - 90 - k * 6 + Math.sin(an) * 18, px + 4 + Math.cos(an) * 46, py - 90 - k * 6 + Math.sin(an) * 10 + 14); c.stroke(); } }); });
  D(0.4, () => { const t = Math.min(lt, 2.2), q = { x: 380 + t * 34, y: 520, s: 1.0 }; q.pose = lt < 2.2 ? walkPose3(walkCyc3(t * 34, 1)) : lp(walkPose3(walkCyc3(2.2 * 34, 1)), { ...STAND3, hr: -0.75, head: [52, -74] }, sm((lt - 2.2) / 0.5)); Object.assign(q.pose, exSeq(lt, [[0, 'neutral'], [2.2, 'curious']])); q.emote = emoAt(lt, [[2.4, 3.6, '?']]); drawCat3(q); });
});
/* T10 阿里山林鐵 */
V('T10', '嘉義縣 · 竹崎', '阿里山林鐵 · 獨立山', 'Alishan Forest Railway', '23.48°N 120.60°E', ['林鐵繞著獨立山轉了三圈，才慢慢下山。', 'The forest railway spirals three times round Dulishan on its way down.'], [1.0, 1.02, 0, 0, 0, 0], function (lt) {
  D(0, () => trainWindow(lt, () => { sky([[0, '#9cc0d8'], [1, '#e6eee8']]); const off = lt * 140;
    mountain({ base: 300, amp: 90, f: 0.004, seed: 401, top: '#6f8f86', bot: '#86a196', haze: 'rgba(220,230,230,0.5)' });
    const r = rng(402); for (let k = 0; k < 70; k++) { const x = mod(r() * 1600 - off, 1600) - 160, y = 320 + r() * 260, h = 60 + r() * 120; poly([[x - h * 0.2, y], [x, y - h], [x + h * 0.2, y]], mix('#1f3f2e', '#3d6b4a', r())); }
    c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(-M, 380, W + 2 * M, 60);
    for (let k = 0; k < 40; k++) { const x = mod(r() * 1600 - off * 2.2, 1600) - 160; c.fillStyle = mix('#173022', '#2d4f38', r()); c.fillRect(x, 300, 7, 260); } }, '#7a3a2c', '#4e2a20'));
  D(1, () => drawCat3({ x: 520, y: 512, s: 1.25, pose: sit3(lt, { ...ex('content'), hr: 0.08 + Math.sin(lt * 1.5) * 0.06 }), emote: emoAt(lt, [[1.2, 2.8, 'note']]), shadow: false }));
});
/* T11 高鐵 */
V('T11', '嘉義 → 雲林', '台灣高鐵', 'Taiwan High Speed Rail', '23.74°N 120.42°E', ['高鐵一眨眼就不見了。', 'The bullet train is gone in the blink of an eye.'], [1.02, 1.05, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#5f95cc'], [1, '#e7ebe2']]); cumulus(600, 190, 500, 70, 411, '#ffffff', '#cbd5df', 0.2); }, { blur: 2 });
  L('far', 0.08, () => { mountain({ base: 410, amp: 30, f: 0.003, seed: 412, top: '#93a6b8', bot: '#aab6bc' }); bushes(80, -M, W + M, () => 418, 413, '#5d7a4c', '#86a36a', 12); }, { blur: 1 });
  L('via', 0.35, () => { c.fillStyle = vg(420, H, [[0, '#8fbf5e'], [1, '#5f9a36']]); c.fillRect(-M, 420, W + 2 * M, H); for (let k = 0; k < 8; k++) { const y = 420 + Math.pow(k / 8, 1.7) * 300; line(-M, y, W + M, y, 'rgba(60,100,40,0.4)', 1); }
    c.fillStyle = '#d6d3cb'; c.fillRect(-M, 360, W + 2 * M, 18); c.fillStyle = '#b8b4aa'; c.fillRect(-M, 378, W + 2 * M, 5); for (let x = -40; x < W + M; x += 120) { c.fillStyle = '#c9c5bc'; c.fillRect(x, 383, 16, 60); line(x + 8, 360, x + 8, 300, '#8a8a8a', 2); line(x - 10, 304, x + 26, 304, '#8a8a8a', 2); } line(-M, 306, W + M, 306, 'rgba(60,60,60,0.6)', 1); });
  D(0.35, () => { const u = clamp((lt - 0.8) / 1.0), x = lerp(-1400, 1600, u); c.save(); c.translate(x, 336); c.fillStyle = '#f7f7f4'; c.beginPath(); c.moveTo(0, 24); c.lineTo(0, 4); c.lineTo(1080, 4); c.quadraticCurveTo(1150, 6, 1180, 24); c.closePath(); c.fill(); c.fillStyle = '#e8792c'; c.fillRect(0, 16, 1170, 4); c.fillStyle = '#2b3846'; for (let k = 0; k < 40; k++) c.fillRect(20 + k * 26, 8, 16, 6); c.restore();
    if (u > 0 && u < 1) { c.save(); c.globalAlpha = 0.3; c.fillStyle = '#ffffff'; c.fillRect(x - 200, 340, 200, 16); c.restore(); } });
  L('fg', 0.95, () => { c.fillStyle = vg(590, H, [[0, '#7aa84c'], [1, '#4f7a2c']]); c.fillRect(-M, 600, W + 2 * M, 200); });
  D(0.95, () => { const u = clamp((lt - 0.9) / 1.0); drawCat3({ x: 620, y: 606, s: 1.15, face: -1, pose: sit3(lt, { ...exSeq(lt, [[0, 'neutral'], [0.9, 'surprised'], [2.1, 'curious']]), hr: lerp(0.3, -0.5, sm(u)), ear: u > 0.1 && u < 0.9 ? 0.3 : 0, ts: 3 }), emote: emoAt(lt, [[0.95, 1.8, '!'], [2.2, 3.4, '?']]) }); grassTufts(600, 640, 100, ['#5f8f35', '#86b452'], 414, 1, 14); });
});
/* T12 八卦山大佛 — the bronze-brown seated Buddha on a golden lotus throne, temple roofs and palms, blue sky */
V('T12', '彰化縣', '八卦山大佛', 'Great Buddha of Baguashan', '24.08°N 120.55°E', ['八卦山的大佛，在山上看了好久的風景。', 'The Great Buddha of Baguashan has watched over this view for a long time.'], [1.02, 1.07, 20, -20, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#3f82c8'], [0.6, '#a8cce6'], [1, '#e6eef0']]); cumulus(300, 200, 360, 70, 421, '#ffffff', '#ccd6e2', 0.3); cumulus(1060, 170, 300, 56, 423, '#ffffff', '#ccd6e2', 0.3); }, { blur: 1.5 });
  L('temple', 0.2, () => { const r = rng(424); [[160, 430, 220], [1040, 420, 240]].forEach(([x, y, w]) => { c.fillStyle = '#e8dcc0'; c.fillRect(x, y - 60, w, 60); for (let k = 0; k < 3; k++) { poly([[x - 20 + k * 8, y - 60 - k * 26], [x + w / 2, y - 92 - k * 26], [x + w + 20 - k * 8, y - 60 - k * 26], [x + w + 8 - k * 8, y - 52 - k * 26], [x + 12 + k * 8, y - 52 - k * 26]], '#c0412e'); c.fillStyle = '#9a8a6a'; c.fillRect(x + 10 + k * 8, y - 52 - k * 26, w - 20 - k * 16, 26); } }); c.fillStyle = vg(470, H, [[0, '#7aa858'], [1, '#4f7e34']]); c.fillRect(-M, 470, W + 2 * M, H); bushes(40, -M, W + M, () => 470, 425, '#3a6a32', '#6f9a4e', 22); }, { blur: 0.8 });
  L('buddha', 0.4, () => { const x = 650, y = 500;
    // lotus throne: layered golden petals
    for (let row = 0; row < 3; row++) for (let k = -6; k <= 6; k++) { const px = x + k * (26 - row * 4), py = y - row * 18; c.fillStyle = hg(px - 18, px + 18, [[0, '#f4c84a'], [1, '#c48a1e']]); c.beginPath(); c.moveTo(px - 16 + row * 2, py); c.quadraticCurveTo(px, py - 40 + row * 4, px + 16 - row * 2, py); c.closePath(); c.fill(); }
    c.fillStyle = '#b8862a'; c.fillRect(x - 170, y, 340, 16);
    // seated figure: crossed legs, robe, torso, shoulders, head with curls and ushnisha
    const br = (a, b) => hg(x - 120, x + 120, [[0, a], [0.55, b], [1, '#4a2e1a']]);
    c.fillStyle = br('#a0683a', '#7a4a28'); c.beginPath(); c.ellipse(x, y - 52, 128, 40, 0, 0, TAU); c.fill();
    // torso: broad rounded shoulders tapering to the waist, arms down to the lap
    c.beginPath(); c.moveTo(x - 110, y - 62); c.bezierCurveTo(x - 118, y - 150, x - 104, y - 214, x - 34, y - 232); c.lineTo(x + 34, y - 232); c.bezierCurveTo(x + 104, y - 214, x + 118, y - 150, x + 110, y - 62); c.closePath(); c.fill();
    c.fillStyle = 'rgba(40,22,10,0.25)'; c.beginPath(); c.moveTo(x + 40, y - 228); c.bezierCurveTo(x + 104, y - 210, x + 118, y - 150, x + 110, y - 62); c.lineTo(x + 60, y - 70); c.bezierCurveTo(x + 70, y - 140, x + 60, y - 200, x + 40, y - 228); c.closePath(); c.fill();
    c.fillStyle = br('#a86e3e', '#80502c'); c.beginPath(); c.ellipse(x, y - 236, 34, 14, 0, 0, TAU); c.fill();
    c.strokeStyle = 'rgba(60,34,16,0.5)'; c.lineWidth = 3; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(x - 70 + k * 6, y - 200 + k * 26); c.quadraticCurveTo(x, y - 180 + k * 26, x + 70 - k * 6, y - 200 + k * 26); c.stroke(); }
    c.fillStyle = br('#a86e3e', '#80502c'); c.beginPath(); c.ellipse(x, y - 284, 38, 46, 0, 0, TAU); c.fill(); [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(x + sd * 38, y - 270, 8, 22, sd * 0.1, 0, TAU); c.fill(); });
    const r = rng(426); for (let k = 0; k < 46; k++) disc(x + (r() - 0.5) * 66, y - 312 - r() * 20, 5, '#5a3820'); disc(x, y - 336, 13, '#5a3820');
    c.fillStyle = 'rgba(255,230,180,0.3)'; c.beginPath(); c.ellipse(x - 18, y - 290, 9, 20, 0.2, 0, TAU); c.fill();
    c.strokeStyle = 'rgba(50,28,12,0.7)'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x - 18, y - 286); c.quadraticCurveTo(x - 10, y - 282, x - 4, y - 286); c.moveTo(x + 4, y - 286); c.quadraticCurveTo(x + 10, y - 282, x + 18, y - 286); c.stroke(); line(x, y - 284, x - 2, y - 268, 'rgba(50,28,12,0.4)', 2); line(x - 6, y - 260, x + 6, y - 260, 'rgba(50,28,12,0.55)', 2);
    // hands in the lap
    c.fillStyle = br('#b07444', '#86542e'); c.beginPath(); c.ellipse(x, y - 96, 46, 16, 0, 0, TAU); c.fill(); });
  L('path', 0.9, () => { c.fillStyle = vg(580, H, [[0, '#a89c88'], [1, '#6a604e']]); c.fillRect(-M, 590, W + 2 * M, 200); for (let x = -M; x < W + M; x += 90) line(x, 560, x, 594, '#8a8070', 4); line(-M, 560, W + M, 560, '#8a8070', 3); });
  D(0.9, () => { const q = { x: 260 + lt * 28, y: 594, s: 1.0 }; q.pose = { ...walkPose3(walkCyc3(lt * 28, 1), { hr: -0.15 }), ...ex('content') }; drawCat3(q); });
});
/* T13 集集綠色隧道 */
V('T13', '南投縣 · 集集', '綠色隧道', 'Jiji Green Tunnel', '23.83°N 120.78°E', ['集集的樟樹，排成了一條綠色隧道。', 'In Jiji, camphor trees arch over the road into a green tunnel.'], [1.02, 1.05, 30, -30, 0, 0], function (lt) {
  L('bg', 0, () => { sky([[0, '#cfe0c0'], [1, '#e8ead9']]); const r = rng(431); for (let k = 0; k < 1400; k++) { const x = r() * (W + 2 * M) - M, y = r() * 330; oval(x, y, 8 + r() * 18, 6 + r() * 12, 0, mix('#2f5a2a', '#9cc06a', r() * (y < 150 ? 0.7 : 1), 0.85)); } }, { blur: 1.5 });
  L('trees', 0.5, () => { for (let x = -M; x < W + M; x += 110) { c.strokeStyle = '#4a3a2c'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, 600); c.quadraticCurveTo(x + 10, 400, x + 60, 220); c.stroke(); c.lineWidth = 7; c.beginPath(); c.moveTo(x + 30, 380); c.quadraticCurveTo(x + 90, 300, x + 150, 250); c.stroke(); }
    c.fillStyle = vg(450, 620, [[0, '#6f6a60'], [1, '#55514a']]); c.fillRect(-M, 520, W + 2 * M, 30); c.fillStyle = '#4a463f'; c.fillRect(-M, 550, W + 2 * M, 4); });
  D(0.5, () => { const x = 1500 - lt * 360; c.fillStyle = '#f2c230'; c.beginPath(); c.roundRect(x, 470, 210, 50, 8); c.fill(); c.fillStyle = '#2b3846'; for (let k = 0; k < 6; k++) c.fillRect(x + 14 + k * 32, 480, 22, 14); c.fillStyle = '#d8a020'; c.fillRect(x, 506, 210, 6);
    c.save(); c.globalCompositeOperation = 'lighter'; const r = rng(432); for (let k = 0; k < 40; k++) { const xx = r() * W, yy = 540 + r() * 80, a = 0.15 + 0.1 * Math.sin(T * 0.8 + k); oval(xx + Math.sin(T * 0.5 + k) * 6, yy, 16 + r() * 30, 4 + r() * 5, 0, `rgba(255,240,180,${a})`); } c.restore(); });
  L('road', 0.95, () => { c.fillStyle = vg(560, H, [[0, '#5d5a55'], [1, '#3a3834']]); c.fillRect(-M, 560, W + 2 * M, 200); for (let k = 0; k < 14; k++) c.fillStyle = '#e9d9a8', c.fillRect(-M + k * 130, 640, 70, 4); });
  D(0.95, () => { const q = { x: 200 + lt * 46, y: 600, s: 1.05 }; q.pose = { ...walkPose3(walkCyc3(lt * 46, 1.05, true), { trot: 1 }), ...ex('happy', 0.8) }; drawCat3(q); });
});
/* T14 彩虹眷村 */
V('T14', '臺中市 · 南屯', '彩虹眷村', 'Rainbow Village', '24.13°N 120.61°E', ['彩虹眷村，每一面牆都畫滿了顏色。', 'At Rainbow Village, every wall is painted in colour.'], [1.02, 1.06, 20, -20, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#5b96d0'], [1, '#e6eef0']]); }, {});
  L('wall', 0.45, () => { const cols = ['#f4d03f', '#e74c3c', '#3498db', '#2ecc71', '#ffffff', '#e67e22', '#9b59b6', '#1abc9c', '#f78fb3', '#d62828'];
    const r = rng(441), house = (x0, w, yTop, yb) => {
      // grey tiled roof with an overhang
      c.fillStyle = '#6e6a66'; c.beginPath(); c.moveTo(x0 - 20, yTop); c.lineTo(x0 + w / 2, yTop - 60); c.lineTo(x0 + w + 20, yTop); c.closePath(); c.fill(); for (let k = 0; k < 18; k++) line(x0 - 14 + k * (w + 28) / 18, yTop - 2, x0 + w / 2, yTop - 58, 'rgba(40,38,36,0.35)', 1);
      // wall: base colour then dense folk-art motifs
      c.fillStyle = cols[Math.floor(r() * 4)]; c.fillRect(x0, yTop, w, yb - yTop); c.save(); c.beginPath(); c.rect(x0, yTop, w, yb - yTop); c.clip();
      for (let k = 0; k < Math.floor(w * 0.75); k++) { const x = x0 + r() * w, y = yTop + r() * (yb - yTop), t = r(); c.fillStyle = cols[Math.floor(r() * cols.length)]; c.strokeStyle = cols[Math.floor(r() * cols.length)];
        if (t < 0.18) { c.lineWidth = 3; c.beginPath(); c.arc(x, y, 6 + r() * 8, 0, TAU); c.stroke(); }
        else if (t < 0.36) { c.fillRect(x, y, 10 + r() * 22, 4 + r() * 4); }
        else if (t < 0.5) { c.lineWidth = 2.5; c.beginPath(); for (let z = 0; z < 6; z++) c.lineTo(x + z * 6, y + (z % 2 ? -6 : 0)); c.stroke(); }
        else if (t < 0.62) { c.beginPath(); c.moveTo(x, y - 8); c.lineTo(x + 7, y + 6); c.lineTo(x - 7, y + 6); c.closePath(); c.fill(); }
        else { c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 10, y - 10, x + 20, y); c.stroke(); } }
      // big painted characters: round faces with whiskers and cat ears, and red Chinese characters
      for (let k = 0; k < Math.floor(w / 110); k++) { const fx = x0 + 50 + k * 110 + r() * 20, fy = yTop + 50 + r() * (yb - yTop - 100), fc = cols[Math.floor(r() * cols.length)];
        c.fillStyle = '#ffffff'; c.beginPath(); c.arc(fx, fy, 30, 0, TAU); c.fill(); c.fillStyle = fc; c.beginPath(); c.arc(fx, fy, 25, 0, TAU); c.fill();
        poly([[fx - 22, fy - 14], [fx - 16, fy - 34], [fx - 6, fy - 22]], fc); poly([[fx + 22, fy - 14], [fx + 16, fy - 34], [fx + 6, fy - 22]], fc);
        disc(fx - 9, fy - 4, 5, '#ffffff'); disc(fx + 9, fy - 4, 5, '#ffffff'); disc(fx - 9, fy - 4, 2.5, '#111111'); disc(fx + 9, fy - 4, 2.5, '#111111');
        c.strokeStyle = '#111111'; c.lineWidth = 2; c.beginPath(); c.arc(fx, fy + 6, 8, 0.2, Math.PI - 0.2); c.stroke(); for (let wk = -1; wk <= 1; wk += 2) for (let z = 0; z < 2; z++) line(fx + wk * 12, fy + 4 + z * 4, fx + wk * 30, fy + z * 6, '#111111', 1); }
      c.font = `900 26px ${FONTS}`; c.fillStyle = '#d62828'; c.textAlign = 'center'; ['福', '樂', '愛', '平', '安'].forEach((ch, k) => { if (r() < 0.6) c.fillText(ch, x0 + 30 + r() * (w - 60), yTop + 30 + r() * (yb - yTop - 40)); });
      c.restore();
      // a door
      c.fillStyle = '#3a6ea8'; c.fillRect(x0 + w * 0.42, yb - 110, 46, 110); c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.strokeRect(x0 + w * 0.42 + 6, yb - 100, 34, 90); };
    house(-M, 520, 300, 598); house(560, 380, 320, 598); house(990, 460, 300, 598);
    // painted ground: concentric colour rings and stripes
    c.fillStyle = '#c9c0ad'; c.fillRect(-M, 598, W + 2 * M, 200); for (let k = 0; k < 9; k++) { c.strokeStyle = cols[k]; c.lineWidth = 6; c.beginPath(); c.ellipse(640, 660, 520 - k * 40, 60 - k * 5, 0, 0, TAU); c.stroke(); } });
  D(0.45, () => { const q = { x: 300 + lt * 30, y: 604, s: 1.15 }; q.pose = { ...walkPose3(walkCyc3(lt * 30, 1.15), { hr: lt > 1.5 && lt < 2.6 ? -0.3 : 0 }), ...exSeq(lt, [[0, 'content'], [1.5, 'delighted']]) }; q.emote = emoAt(lt, [[1.6, 2.9, 'spark']]); drawCat3(q); });
});
/* T15 勝興車站 */
V('T15', '苗栗縣 · 三義', '勝興車站', 'Shengxing Station', '24.39°N 120.78°E', ['勝興車站，舊山線海拔最高的車站。', 'Shengxing — the highest station on the old mountain line.'], [1.02, 1.07, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#8fb3cf'], [1, '#e7ece4']]); stratus(600, 220, 1200, 70, 'rgba(255,255,255,0.6)'); });
  L('mtn', 0.1, () => mountain({ base: 360, amp: 100, f: 0.004, seed: 451, top: '#5f8463', bot: '#729673', tex: 'forest', dark: '#466a4a', mid: '#5f8463', light: '#9dbb8c', depth: 140, n: 1600, r: 3.5 }), { blur: 0.8 });
  L('stn', 0.45, () => { const x = 430, y = 520;
    // old-street shops on the slope behind
    for (let k = 0; k < 6; k++) { const sx = 40 + k * 90 + (k > 2 ? 520 : 0), sy = 430 - (k % 3) * 20; c.fillStyle = '#7a5a3e'; c.fillRect(sx, sy - 60, 80, 60); poly([[sx - 8, sy - 60], [sx + 40, sy - 84], [sx + 88, sy - 60]], '#4a4a50'); c.fillStyle = '#d24a3a'; c.fillRect(sx + 6, sy - 40, 68, 10); }
    // station house: dark-stained wooden clapboard walls, white-framed lattice windows, deep gabled eaves
    c.fillStyle = vg(y - 130, y, [[0, '#8a6a46'], [1, '#6a4e32']]); c.fillRect(x, y - 130, 380, 130); for (let yy = y - 128; yy < y; yy += 8) line(x, yy, x + 380, yy, 'rgba(40,26,14,0.45)', 1.2);
    for (let k = 0; k < 5; k++) { const wx = x + 22 + k * 72; c.fillStyle = '#f2ead8'; c.fillRect(wx, y - 104, 48, 56); c.strokeStyle = '#3a2a1a'; c.lineWidth = 3; c.strokeRect(wx, y - 104, 48, 56); for (let g = 1; g < 3; g++) { line(wx + g * 16, y - 104, wx + g * 16, y - 48, '#3a2a1a', 1.5); line(wx, y - 104 + g * 18.6, wx + 48, y - 104 + g * 18.6, '#3a2a1a', 1.5); } }
    c.fillStyle = '#5a3d2a'; for (let k = 0; k < 7; k++) c.fillRect(x - 4 + k * 64, y - 130, 8, 130);
    poly([[x - 40, y - 126], [x + 80, y - 200], [x + 300, y - 200], [x + 420, y - 126], [x + 404, y - 118], [x - 24, y - 118]], '#3a3c44'); for (let k = 0; k < 30; k++) line(x - 30 + k * 15, y - 122, x + 80 + k * 7.4, y - 198, 'rgba(20,20,25,0.4)', 1);
    // gable end board and the signboard 「勝興車站」
    poly([[x + 150, y - 200], [x + 190, y - 230], [x + 230, y - 200]], '#3a3c44'); c.fillStyle = '#f7f2e4'; c.fillRect(x + 110, y - 170, 160, 30); c.strokeStyle = '#2a4a8a'; c.lineWidth = 3; c.strokeRect(x + 110, y - 170, 160, 30);
    c.fillStyle = '#1e3a7a'; c.font = `900 20px ${FONTS}`; c.textAlign = 'center'; c.fillText('勝 興 車 站', x + 190, y - 148);
    // platform, rails on sleepers, an old signal post
    c.fillStyle = vg(y, H, [[0, '#a59c8c'], [1, '#6a645a']]); c.fillRect(-M, y, W + 2 * M, 200); c.fillStyle = '#c8bfa8'; c.fillRect(-M, y, W + 2 * M, 12);
    c.fillStyle = '#5a5048'; for (let k = 0; k < 40; k++) c.fillRect(-M + k * 40, 570, 18, 28); c.fillStyle = '#8a8a8a'; c.fillRect(-M, 572, W + 2 * M, 5); c.fillRect(-M, 590, W + 2 * M, 5);
    line(1000, y + 10, 1000, y - 150, '#3a3a3a', 5); c.fillStyle = '#c0392b'; c.fillRect(992, y - 150, 50, 14); c.fillStyle = '#f2f2f2'; c.fillRect(1018, y - 150, 6, 14); });
  D(0.45, () => drawCat3({ x: 320, y: 548, s: 1.0, pose: lt < 2.1 ? sit3(lt, groom3(lt, 0.1, 2.15)) : sit3(lt, { ...exSeq(lt, [[0, 'content'], [2, 'curious']]), hr: lt > 2 ? 0.25 : -0.1, ts: 1.4 }), emote: emoAt(lt, [[2.2, 3.4, 'note']]) }));
});
/* T16 客家茶園 */
V('T16', '新竹縣 · 峨眉', '客家茶園', 'Hakka tea hills', '24.69°N 121.01°E', ['客家的茶山，一排一排綠到天邊。', 'Hakka tea hills — row after row, green all the way to the sky.'], [1.03, 1.07, 30, -30, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#9cc0d8'], [1, '#eef0e4']]); stratus(400, 250, 900, 60, 'rgba(255,255,255,0.6)'); });
  L('far', 0.08, () => mountain({ base: 330, amp: 70, f: 0.004, seed: 461, top: '#8aa6a0', bot: '#a6b8ae', haze: 'rgba(230,236,228,0.6)' }), { blur: 1.2 });
  L('tea', 0.5, () => { const f = x => 380 + Math.sin(x * 0.004) * 40 + fbm1(x * 0.006 + 3) * 30; mountain({ fn: f, top: '#6f9a4a', bot: '#5a8a3a', seed: 462 });
    for (let k = 0; k < 18; k++) { c.strokeStyle = k % 2 ? '#4f7f2e' : '#88b65a'; c.lineWidth = 7 + k * 0.8; c.beginPath(); for (let x = -M; x <= W + M; x += 20) { const y = f(x) + 12 + k * (14 + k * 1.1) + Math.sin(x * 0.006 + k * 0.3) * (10 + k); x === -M ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
    minnanHouse(980, 400, 140, 40, 0.7); });
  D(0.5, () => { const q = { x: 240 + lt * 28, y: 600, s: 1.05 }; q.pose = { ...walkPose3(walkCyc3(lt * 28, 1.05)), ...ex('content', 0.8) }; drawCat3(q); });
});
/* T17 南寮 17 公里海岸 風箏 */
V('T17', '新竹市', '南寮 · 十七公里海岸', 'Nanliao kites', '24.85°N 120.92°E', ['新竹的風，讓風箏飛得好高。', 'Hsinchu’s famous wind sends the kites soaring.'], [1.02, 1.06, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#3f86c8'], [1, '#d9e8ee']]); cumulus(250, 230, 300, 60, 471, '#ffffff', '#cad5e0', 0.3); }, { blur: 2 });
  D(0.1, () => { const K = [[300, 190, 'octo', '#f39c12'], [520, 140, 'fish', '#3fa0d8'], [760, 200, 'dragon', '#e74c3c'], [960, 130, 'whale', '#5b7fd8'], [1120, 220, 'octo', '#e84393'], [640, 300, 'fish', '#2ecc71'], [200, 320, 'dia', '#f1c40f'], [880, 330, 'dia', '#9b59b6'], [420, 260, 'dia', '#e67e22'], [1060, 300, 'fish', '#e74c3c']];
    K.forEach(([x, y, kind, col], k) => { const xx = x + Math.sin(T * 0.7 + k) * 18, yy = y + Math.cos(T * 0.9 + k) * 10, sc = y > 280 ? 0.6 : 1; c.save(); c.translate(xx, yy); c.scale(sc, sc); c.rotate(Math.sin(T * 0.8 + k) * 0.08);
      if (kind === 'octo') { oval(0, 0, 40, 30, 0, col); disc(-12, -4, 6, '#ffffff'); disc(12, -4, 6, '#ffffff'); disc(-12, -4, 3, '#222'); disc(12, -4, 3, '#222'); for (let t = 0; t < 7; t++) { c.strokeStyle = col; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(-30 + t * 10, 20); c.quadraticCurveTo(-30 + t * 10 + Math.sin(T * 3 + t) * 12, 70, -34 + t * 10 + Math.sin(T * 2 + t) * 16, 120); c.stroke(); } }
      else if (kind === 'fish') { c.fillStyle = col; c.beginPath(); c.ellipse(0, 0, 50, 20, 0, 0, TAU); c.fill(); poly([[44, 0], [76, -20 + Math.sin(T * 4) * 5], [76, 20 + Math.sin(T * 4) * 5]], col); disc(-30, -4, 6, '#ffffff'); disc(-30, -4, 3, '#222'); c.strokeStyle = 'rgba(255,255,255,0.6)'; c.lineWidth = 2; for (let t = 0; t < 4; t++) { c.beginPath(); c.arc(-6 + t * 12, 0, 10, -1, 1); c.stroke(); } }
      else if (kind === 'dragon') { c.strokeStyle = col; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); for (let t = 0; t <= 10; t++) { const px = t * 22, py = Math.sin(T * 2 + t * 0.8) * 12; t ? c.lineTo(px, py) : c.moveTo(px, py); } c.stroke(); c.strokeStyle = '#f1c40f'; c.lineWidth = 4; c.stroke(); oval(-10, 0, 22, 16, 0, col); disc(-16, -4, 4, '#ffffff'); disc(-16, -4, 2, '#222'); }
      else if (kind === 'whale') { c.fillStyle = col; c.beginPath(); c.ellipse(0, 0, 70, 30, 0, 0, TAU); c.fill(); c.fillStyle = '#e8f2ff'; c.beginPath(); c.ellipse(-8, 12, 54, 14, 0, 0, Math.PI); c.fill(); poly([[64, -4], [96, -26], [92, 10]], col); disc(-40, -6, 5, '#222'); }
      else { poly([[0, -30], [24, 0], [0, 34], [-24, 0]], col); line(0, -30, 0, 34, 'rgba(255,255,255,0.7)', 1.5); c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 34); for (let t = 1; t < 8; t++) c.lineTo(Math.sin(T * 3 + t) * 5, 34 + t * 8); c.stroke(); }
      c.restore(); line(xx, yy + 20, 200 + (k % 5) * 220, 560, 'rgba(255,255,255,0.4)', 0.7); }); });
  L('shore', 0.4, () => { c.fillStyle = vg(400, 470, [[0, '#4a8fb0'], [1, '#6fb2c4']]); c.fillRect(-M, 420, W + 2 * M, 60); c.fillStyle = vg(470, H, [[0, '#8fbf5a'], [1, '#5f8f38']]); c.fillRect(-M, 470, W + 2 * M, H); for (let x = -M; x < W + M; x += 200) { line(x + 80, 470, x + 80, 300, '#e8e8e8', 3); for (let k = 0; k < 3; k++) { c.save(); c.translate(x + 80, 300); c.rotate(T * 2 + k * TAU / 3 + x); poly([[0, -2], [40, 0], [0, 2]], '#f2f2f2'); c.restore(); } } });
  D(0.4, () => { grassTufts(560, 620, 100, ['#6f9f42', '#4f7f2a'], 472, 3, 14); drawCat3({ x: 520, y: 604, s: 1.15, pose: sit3(lt, { ...ex('delighted'), hr: -0.55 + Math.sin(lt * 1.3) * 0.15, ear: 0.35, ts: 3 }), emote: emoAt(lt, [[1.0, 2.6, 'spark']]) }); });
});
/* T18 永安漁港 彩虹橋 */
V('T18', '桃園市 · 新屋', '永安漁港彩虹橋', 'Rainbow Bridge, Yong’an', '24.99°N 121.01°E', ['永安漁港的彩虹橋，夜裡會一直換顏色。', 'Yong’an’s Rainbow Bridge keeps changing colour through the night.'], [1.02, 1.07, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#151c3a'], [0.6, '#3d3a6a'], [1, '#a46a7a']]); stars(80, 481, 300, 0.6); });
  L('town', 0.15, () => { skyline(470, 482, '#232540', '#2f3050', { hmin: 10, hvar: 50, win: 0.12 }); c.fillStyle = vg(470, H, [[0, '#1d2340'], [1, '#0d1226']]); c.fillRect(-M, 470, W + 2 * M, H); });
  D(0.4, () => { const cols = [[255, 80, 80], [255, 170, 60], [255, 230, 80], [90, 220, 120], [80, 170, 255], [170, 110, 255]], ph = Math.floor(T * 1.5);
    for (let k = 0; k < 7; k++) { const col = cols[(k + ph) % 6]; c.strokeStyle = `rgb(${col})`; c.lineWidth = 6; c.beginPath(); c.moveTo(260 + k * 3, 500); c.quadraticCurveTo(640, 260 + k * 8, 1020 - k * 3, 500); c.stroke(); c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(${col},0.25)`; c.lineWidth = 20; c.stroke(); c.restore();
      c.save(); c.beginPath(); c.rect(-M, 500, W + 2 * M, 200); c.clip(); c.globalAlpha = 0.35; c.strokeStyle = `rgb(${col})`; c.lineWidth = 6; c.beginPath(); c.moveTo(260 + k * 3, 500); c.quadraticCurveTo(640, 740 - k * 8, 1020 - k * 3, 500); c.stroke(); c.restore(); }
    c.fillStyle = '#1a1a26'; c.fillRect(240, 494, 800, 10); shimmer(505, H, 120, '255,200,150', 483, { a: 0.4, op: 'lighter' });
    const q = { x: 300 + lt * 70, y: 494, s: 0.85, sil: true, rim: '255,170,200', shadow: false }; q.pose = { ...walkPose3(walkCyc3(lt * 70, 0.85, true), { trot: 1 }), ...ex('happy', 0.8) }; drawCat3(q); });
});
/* T19 飛往金門 */
V('T19', '臺灣海峽上空', '飛往金門', 'Flying to Kinmen', '24.50°N 119.50°E', ['飛越臺灣海峽，去金門。', 'Up over the Taiwan Strait, bound for Kinmen.'], [1.0, 1.02, 0, 0, 0, 0], function (lt) {
  D(0, () => { sky([[0, '#5a8ccc'], [1, '#cfe2ee']]); c.fillStyle = vg(300, H, [[0, '#2f6fa8'], [1, '#2a5f90']]); c.fillRect(-M, 380, W + 2 * M, 400);
    const r = rng(491); for (let k = 0; k < 30; k++) { const x = mod(r() * 1800 - lt * 60 * (0.5 + r()), 1800) - 200, y = 300 + r() * 280; cumulus(x, y, 120 + r() * 160, 30 + r() * 30, 492 + k, '#ffffff', '#c9d6e2', 0.2); }
    c.fillStyle = '#c9ccd2'; poly([[600, 560], [1200, 470], [1250, 485], [700, 600]], '#cfd2d8'); poly([[1150, 478], [1180, 440], [1196, 444], [1186, 482]], '#b2b6bd');
    c.save(); c.fillStyle = '#e9e6e0'; c.beginPath(); c.rect(-M, 0, W + 2 * M, H); c.ellipse(640, 360, 210, 270, 0, 0, TAU); c.fill('evenodd'); c.strokeStyle = '#cfcac0'; c.lineWidth = 26; c.beginPath(); c.ellipse(640, 360, 220, 280, 0, 0, TAU); c.stroke(); c.restore(); });
  D(1, () => drawCat3({ x: 470, y: 640, s: 1.4, pose: sit3(lt, { ...ex('delighted'), hr: 0.1, ear: -0.1, turn: turnAt(lt, [[1.8, 3.6, 0.7]]) }), emote: emoAt(lt, [[0.8, 2.4, 'spark']]), shadow: false }));
});
/* T20 夜航 */
V('T20', '臺灣海峽', '夜航往馬祖', 'Night boat to Matsu', '25.60°N 120.00°E', ['夜裡的船，往更北邊的島。', 'A night boat to the islands further north.'], [1.02, 1.05, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#05070f'], [1, '#162038']]); stars(400, 501, 420, 0.9); });
  D(0, () => { disc(980, 140, 24, '#f6f0d6'); glow(980, 140, 120, '255,250,220', 0.25); });
  D(0.15, () => { c.fillStyle = vg(400, H, [[0, '#0c1424'], [1, '#05080f']]); c.fillRect(-M, 400, W + 2 * M, H); shimmer(402, 600, 80, '255,245,210', 502, { xc: 980, spread: 160, a: 0.6, op: 'lighter' }); });
  L('deck', 0.95, () => { c.fillStyle = vg(560, H, [[0, '#3a3a44'], [1, '#1a1a22']]); c.fillRect(-M, 570, W + 2 * M, 200); line(-M, 520, W + M, 520, '#8a8a96', 4); for (let x = -M; x < W + M; x += 60) line(x, 520, x, 572, '#8a8a96', 3); glow(160, 500, 60, '255,210,150', 0.6); });
  D(0.95, () => drawCat3({ x: 560, y: 586, s: 1.1, sil: true, rim: '255,240,200', pose: sit3(lt, { ...ex('sleepy'), eye: lt > 1.4 ? 0 : 0.3, hr: -0.1 + sm((lt - 1.2) / 0.6) * 0.2, ts: 1.2 }), emote: emoAt(lt, [[1.5, 3.8, 'z']]), shadow: false }));
});
/* T21 降落松山 */
V('T21', '臺北市上空', '降落松山機場', 'Landing in Taipei', '25.07°N 121.55°E', ['看到 101 了，快到家了。', 'There’s Taipei 101. Almost home.'], [1.0, 1.02, 0, 0, 0, 0], function (lt) {
  D(0, () => { sky([[0, '#9fb4c8'], [1, '#dfe4e2']]); stratus(640, 260, 1200, 80, 'rgba(255,255,255,0.6)');
    mountain({ fn: x => 330 - 50 * Math.abs(Math.sin(x * 0.004)) - fbm1(x * 0.01) * 20, floor: 360, top: '#8a9ea4', bot: '#a8b6b8', bottom: 360, haze: 'rgba(220,226,228,0.5)' });
    const r = rng(511), ox = lt * 60; c.fillStyle = '#9aa29a'; c.fillRect(-M, 350, W + 2 * M, H);
    for (let k = 0; k < 900; k++) { const x = mod(r() * 1800 - ox * (0.4 + r() * 0.6), 1800) - 200, y = 352 + Math.pow(r(), 0.8) * 330, sz = 2 + (y - 350) * 0.05; c.fillStyle = mix('#c8c6be', '#eceae2', r()); c.fillRect(x, y, sz * (1 + r()), sz * 0.7); }
    c.strokeStyle = 'rgba(80,90,90,0.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-M, 520); c.quadraticCurveTo(640, 470 + Math.sin(lt) * 4, W + M, 540); c.stroke();
    tower101(840 - lt * 24, 352, 110, { light: '#8a9aa8', dark: '#5a6878' });
    // wing tip in the lower left of the window
    c.fillStyle = '#e8eaec'; c.beginPath(); c.moveTo(420, 520); c.lineTo(820, 470); c.lineTo(830, 486); c.lineTo(440, 560); c.closePath(); c.fill(); c.fillStyle = '#2a4a8a'; c.beginPath(); c.moveTo(800, 470); c.lineTo(840, 430); c.lineTo(846, 480); c.closePath(); c.fill();
    c.save(); c.fillStyle = '#d8d4cc'; c.beginPath(); c.rect(-M, 0, W + 2 * M, H); c.ellipse(640, 360, 210, 270, 0, 0, TAU); c.fill('evenodd'); c.strokeStyle = '#bdb8ae'; c.lineWidth = 26; c.beginPath(); c.ellipse(640, 360, 220, 280, 0, 0, TAU); c.stroke(); c.restore(); });
  D(1, () => drawCat3({ x: 470, y: 640, s: 1.4, pose: sit3(lt, { ...ex('happy'), hr: 0.05, ear: -0.1, turn: turnAt(lt, [[1.0, 3.2, 1]]) }), emote: emoAt(lt, [[1.2, 3.0, 'heart']]), shadow: false }));
});
