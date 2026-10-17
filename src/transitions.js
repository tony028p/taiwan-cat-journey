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
    sky([[0, '#6d9cc8'], [1, '#d7e4e6']]);
    c.fillStyle = vg(380, 560, [[0, '#2f8db0'], [1, '#1f6f8f']]); c.fillRect(-M, 380, W + 2 * M, 300); shimmer(382, 520, 120, '255,255,255', 331, { a: 0.4 });
    const off = lt * 260; const f = x => 300 + 140 * Math.abs(Math.sin((x + off) * 0.004)) + fbm1((x + off) * 0.01) * 40;
    c.beginPath(); c.moveTo(-M, H); for (let x = -M; x <= W + M; x += 6) { const y = f(x); c.lineTo(x, (x + off) % 900 < 520 ? y : 420); } c.lineTo(W + M, H); c.closePath(); c.fillStyle = vg(250, 520, [[0, '#4f7a4a'], [1, '#3a5d3c']]); c.fill();
    c.fillStyle = '#6b6b6b'; c.fillRect(-M, 500, W + 2 * M, 40); for (let x = -mod(off * 2, 80); x < W; x += 80) { c.fillStyle = '#4a4a4a'; c.fillRect(x, 500, 6, 40); }
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
/* T5 多良車站 */
V('T5', '臺東縣 · 太麻里', '多良車站', 'Duoliang Station', '22.51°N 120.96°E', ['多良車站，離太平洋最近的月台。', 'Duoliang — the platform closest to the Pacific.'], [1.02, 1.06, 0, 0, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#3f7fc4'], [1, '#cfe2ef']]); cumulus(900, 200, 300, 60, 351, '#ffffff', '#cad5e0', -0.3); }, { blur: 2 });
  L('sea', 0.12, () => { c.fillStyle = vg(330, H, [[0, '#1f5f9e'], [0.5, '#2f86b7'], [1, '#4aa7c4']]); c.fillRect(-M, 330, W + 2 * M, H); c.fillStyle = 'rgba(255,255,255,0.7)'; c.fillRect(-M, 500, W + 2 * M, 4); c.fillStyle = vg(500, 540, [[0, '#7a7a7a'], [1, '#5a5a5a']]); c.fillRect(-M, 504, W + 2 * M, 40); });
  D(0.12, () => shimmer(332, 495, 200, '255,255,255', 352, { a: 0.4 }));
  L('track', 0.5, () => { mountain({ fn: x => 380 + (x < 200 ? 0 : (x - 200) * 0.0) + fbm1(x * 0.01 + 9) * 20 - (x < 260 ? (260 - x) * 0.8 : 0), floor: 560, top: '#4a7a46', bot: '#3d6339', tex: 'forest', dark: '#2f4f2e', mid: '#4a7a46', light: '#8fb47a', depth: 60, n: 500, r: 4, seed: 353 }); c.fillStyle = '#6f6a62'; c.fillRect(-M, 540, W + 2 * M, 14); c.fillStyle = '#3e3a36'; c.fillRect(-M, 538, W + 2 * M, 3); c.fillRect(-M, 548, W + 2 * M, 3); });
  D(0.5, () => { const tx = -900 + lt * 520; for (let k = 0; k < 5; k++) { const x = tx + k * 150; c.fillStyle = '#f4f3ef'; c.beginPath(); c.roundRect(x, 492, 146, 46, 8); c.fill(); c.fillStyle = '#d23a2e'; c.fillRect(x, 520, 146, 6); c.fillStyle = '#2a3440'; c.fillRect(x + 8, 500, 130, 12); } });
  L('plat', 0.95, () => { c.fillStyle = vg(590, H, [[0, '#9a9690'], [1, '#5f5c58']]); c.fillRect(-M, 600, W + 2 * M, 200); c.strokeStyle = '#2f6fb0'; c.lineWidth = 4; line(-M, 572, W + M, 572, '#2f6fb0', 5); line(-M, 588, W + M, 588, '#2f6fb0', 3); for (let x = -M; x < W + M; x += 26) line(x, 572, x, 602, '#2f6fb0', 2.4); });
  D(0.95, () => drawCat3({ x: 520, y: 572, s: 1.0, pose: sit3(lt, { ...exSeq(lt, [[0, 'content'], [1.4, 'surprised'], [2.4, 'happy']]), hr: lt > 1.4 && lt < 2.6 ? -0.15 : -0.05, ts: 1.6 }), emote: emoAt(lt, [[1.4, 2.3, '!']]), shadow: false }));
});
/* T6 高屏溪斜張橋 */
V('T6', '屏東 → 高雄', '高屏溪斜張橋', 'Kao-Ping Hsi Bridge', '22.64°N 120.43°E', ['跨過高屏溪，就到高雄了。', 'Across the Gaoping River lies Kaohsiung.'], [1.02, 1.06, -20, 20, 0, 0], function (lt) {
  L('sky', 0, () => { sky([[0, '#5b8ec7'], [1, '#eae3d0']]); cumulus(250, 210, 300, 60, 361, '#ffffff', '#cdd3d9', 0.3); }, { blur: 2 });
  L('far', 0.06, () => mountain({ base: 390, amp: 60, f: 0.003, seed: 362, top: '#8d9fb6', bot: '#a8b2b8', haze: 'rgba(230,230,220,0.5)' }), { blur: 1 });
  L('br', 0.25, () => { c.fillStyle = vg(400, H, [[0, '#9fb2b0'], [1, '#6f8582']]); c.fillRect(-M, 410, W + 2 * M, H); c.fillStyle = '#d9d6cc'; c.fillRect(-M, 400, W + 2 * M, 9); for (let x = -40; x < W + M; x += 70) { c.fillStyle = '#bdb9ae'; c.fillRect(x, 409, 7, 26); }
    const px = 760, py = 400, top = 120; poly([[px - 26, py], [px - 6, top], [px + 6, top], [px + 26, py]], '#e8e4da'); c.fillStyle = '#d8d3c6'; c.fillRect(px - 18, 290, 36, 8);
    c.strokeStyle = 'rgba(80,80,80,0.75)'; c.lineWidth = 1; for (let k = 0; k < 14; k++) { const t = top + 6 + k * 4; c.beginPath(); c.moveTo(px, t); c.lineTo(px - 60 - k * 34, py); c.stroke(); c.beginPath(); c.moveTo(px, t); c.lineTo(px + 50 + k * 24, py); c.stroke(); } });
  D(0.25, () => { shimmer(412, 560, 120, '255,255,255', 363, { a: 0.3 }); const cx = mod(lt * 140, 1600) - 200; c.fillStyle = '#c9402f'; c.fillRect(cx, 392, 20, 8); c.fillStyle = '#2f5f9a'; c.fillRect(1200 - mod(lt * 170, 1600), 392, 22, 8); });
  L('levee', 0.9, () => { c.fillStyle = vg(570, H, [[0, '#7b9050'], [1, '#43582a']]); c.fillRect(-M, 580, W + 2 * M, 200); c.fillStyle = '#c9c0a8'; c.fillRect(-M, 594, W + 2 * M, 12); });
  D(0.9, () => { const r = rng(364); for (let k = 0; k < 50; k++) { const x = r() * (W + 2 * M) - M, h = 40 + r() * 50, sw = Math.sin(T * 1.4 + x * 0.01) * 8; c.strokeStyle = 'rgba(110,100,60,0.9)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, 640); c.quadraticCurveTo(x + sw * 0.3, 640 - h * 0.6, x + sw, 640 - h); c.stroke(); oval(x + sw + 3, 640 - h + 6, 3.5, 11, 0.4 + sw * 0.03, 'rgba(240,225,200,0.8)'); }
    const q = { x: 280 + lt * 30, y: 598, s: 1.0 }; q.pose = { ...walkPose3(walkCyc3(lt * 30, 1)), ...ex('content', 0.7) }; drawCat3(q); });
});
/* T7 渡輪 */
V('T7', '臺灣海峽', '高雄 → 馬公 渡輪', 'Ferry to Penghu', '23.00°N 120.00°E', ['第一次搭船，風好大。', 'First time on a ferry. So windy!'], [1.02, 1.05, 0, 0, 0, 4], function (lt) {
  const roll = Math.sin(lt * 1.2) * 0.012;
  L('sky', 0, () => { sky([[0, '#4d8acb'], [1, '#d6e6ef']]); cumulus(400, 200, 400, 60, 371, '#ffffff', '#cbd6e2', 0.3); }, { blur: 2 });
  D(0.1, () => { c.save(); c.translate(640, 400); c.rotate(roll); c.translate(-640, -400); c.fillStyle = vg(360, H, [[0, '#1d5e95'], [1, '#2a7fb0']]); c.fillRect(-M - 100, 360, W + 2 * M + 200, 500); c.fillStyle = '#6d7f8a'; c.beginPath(); c.ellipse(1000, 362, 120, 7, 0, Math.PI, 0); c.fill(); c.beginPath(); c.ellipse(1180, 362, 70, 5, 0, Math.PI, 0); c.fill(); shimmer(362, 600, 220, '255,255,255', 372, { a: 0.45, sp: 3 }); c.restore();
    for (let k = 0; k < 5; k++) { const u = mod(lt * 0.5 + k / 5, 1); c.strokeStyle = `rgba(255,255,255,${0.5 * (1 - u)})`; c.lineWidth = 2; c.beginPath(); c.moveTo(-M, 470 + u * 120); c.quadraticCurveTo(300, 460 + u * 130, 700, 480 + u * 110); c.stroke(); } flock(3, 700, 220, -30, 0.9, 'rgba(255,255,255,0.95)', 373, lt); });
  L('deck', 0.95, () => { c.fillStyle = vg(560, H, [[0, '#d7d2c4'], [1, '#9b9484']]); c.fillRect(-M, 570, W + 2 * M, 200); for (let k = 0; k < 30; k++) line(-M + k * 50, 570, -M + k * 60, H, 'rgba(120,110,95,0.5)', 1);
    c.strokeStyle = '#f4f4f2'; line(-M, 520, W + M, 520, '#f4f4f2', 5); line(-M, 545, W + M, 545, '#f4f4f2', 3); for (let x = -M; x < W + M; x += 60) line(x, 520, x, 572, '#f4f4f2', 4); });
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
  D(0.1, () => { [[420, 170, '#e74c3c', 0], [760, 120, '#f39c12', 1], [1020, 200, '#3498db', 2]].forEach(([x, y, col, k]) => { const xx = x + Math.sin(T * 0.8 + k) * 20, yy = y + Math.cos(T * 1.1 + k) * 10; c.save(); c.translate(xx, yy); c.rotate(Math.sin(T + k) * 0.1);
      if (k === 1) { oval(0, 0, 50, 30, 0, col); disc(-16, -6, 6, '#ffffff'); disc(-16, -6, 3, '#222'); for (let t = 0; t < 6; t++) { c.strokeStyle = col; c.lineWidth = 6; c.beginPath(); c.moveTo(-30 + t * 12, 20); c.quadraticCurveTo(-30 + t * 12 + Math.sin(T * 4 + t) * 10, 60, -30 + t * 12 + Math.sin(T * 3 + t) * 16, 100); c.stroke(); } }
      else { poly([[0, -40], [30, 0], [0, 46], [-30, 0]], col); line(0, -40, 0, 46, 'rgba(255,255,255,0.7)', 1.5); line(-30, 0, 30, 0, 'rgba(255,255,255,0.7)', 1.5); c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 46); for (let t = 1; t < 8; t++) c.lineTo(Math.sin(T * 5 + t) * 8, 46 + t * 12); c.stroke(); }
      c.restore(); line(xx, yy + 40, 300 + k * 120, 600, 'rgba(255,255,255,0.5)', 0.8); }); });
  L('shore', 0.4, () => { c.fillStyle = vg(400, 470, [[0, '#4a8fb0'], [1, '#6fb2c4']]); c.fillRect(-M, 420, W + 2 * M, 60); c.fillStyle = vg(470, H, [[0, '#d8c9a2'], [1, '#a99a74']]); c.fillRect(-M, 470, W + 2 * M, H); for (let x = -M; x < W + M; x += 200) { line(x + 80, 470, x + 80, 300, '#e8e8e8', 3); for (let k = 0; k < 3; k++) { c.save(); c.translate(x + 80, 300); c.rotate(T * 2 + k * TAU / 3 + x); poly([[0, -2], [40, 0], [0, 2]], '#f2f2f2'); c.restore(); } } });
  D(0.4, () => { grassTufts(560, 620, 100, ['#b8a868', '#8f8a4c'], 472, 3, 18); drawCat3({ x: 520, y: 604, s: 1.15, pose: sit3(lt, { ...ex('delighted'), hr: -0.55 + Math.sin(lt * 1.3) * 0.15, ear: 0.35, ts: 3 }), emote: emoAt(lt, [[1.0, 2.6, 'spark']]) }); });
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
  D(0, () => { sky([[0, '#0a1024'], [1, '#2a2846']]); const r = rng(511); c.fillStyle = '#0f1226'; c.fillRect(-M, 380, W + 2 * M, H);
    for (let k = 0; k < 900; k++) { const x = mod(r() * 1800 - lt * 90 * (1 + r()), 1800) - 200, y = 390 + Math.pow(r(), 0.8) * 300; disc(x, y, 0.8 + r() * 1.4, `rgba(255,${190 + r() * 60},${120 + r() * 80},${0.5 + r() * 0.5})`); }
    tower101(820 - lt * 40, 470, 120, { light: '#4a5a7a', dark: '#262c44', night: true });
    c.save(); c.fillStyle = '#d8d4cc'; c.beginPath(); c.rect(-M, 0, W + 2 * M, H); c.ellipse(640, 360, 210, 270, 0, 0, TAU); c.fill('evenodd'); c.strokeStyle = '#bdb8ae'; c.lineWidth = 26; c.beginPath(); c.ellipse(640, 360, 220, 280, 0, 0, TAU); c.stroke(); c.restore(); });
  D(1, () => drawCat3({ x: 470, y: 640, s: 1.4, pose: sit3(lt, { ...ex('happy'), hr: 0.05, ear: -0.1, turn: turnAt(lt, [[1.0, 3.2, 1]]) }), emote: emoAt(lt, [[1.2, 3.0, 'heart']]), shadow: false }));
});
