// Contact sheet of the cat rig: one gait cycle per row, plus static poses and expressions.
// usage: node tools/posesheet.cjs [out.png] [frames-per-row]   (default build/posesheet.png, 8)
(async () => {
  const { chromium } = require('playwright'); const fs = require('fs');
  const out = process.argv[2] || 'build/posesheet.png', N = +(process.argv[3] || 8);
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + process.cwd() + '/render.html?s=1'); await p.evaluate(() => window.ready);
  const d = await p.evaluate(N => {
    const rows = [
      ['walk', u => walkPose3(u)], ['trot', u => walkPose3(u, { trot: 1 })], ['gallop', u => gallopPose3(u)],
      ['poses', u => [STAND3, CROUCH3, LEAP3, LAND3, STRETCH3, LOAF3, SLEEP3, sit3(0)][Math.floor(u * 8)]],
    ];
    if (typeof EXPR3 !== 'undefined') { const ks = Object.keys(EXPR3), EM = ['!', '?', 'z', 'note', 'heart', 'drop', 'spark'];
      for (let r = 0; r < Math.ceil(ks.length / N); r++) rows.push(['', u => { const j = r * N + Math.round(u * N); const k = ks[j]; return k ? { ...sit3(0), ...ex(k), name: k, emote: EM[j % EM.length] } : null; }]); }
    const cw = 170, rh = 200, Wd = cw * N + 40, Hd = rh * rows.length + 20;
    const cv = document.createElement('canvas'); cv.width = Wd * 1.5; cv.height = Hd * 1.5; const x = cv.getContext('2d');
    const prevS = S; S = 1.5; x.setTransform(1.5, 0, 0, 1.5, 0, 0); x.fillStyle = '#e8e4dc'; x.fillRect(0, 0, Wd, Hd);
    rows.forEach(([n, f], r) => { for (let i = 0; i < N; i++) { const u = i / N, pose = f(u); c = x; T = u; if (!pose) continue;
      drawCat3({ x: 85 + i * cw, y: 150 + r * rh, s: n ? 1.05 : 1.5, pose, noBlink: true, emote: pose.emote && { k: pose.emote } });
      c.fillStyle = '#333'; c.font = '12px sans-serif'; c.fillText(n + ' ' + (pose.name || u.toFixed(3)), 30 + i * cw, 172 + r * rh); } });
    S = prevS; return cv.toDataURL('image/png');
  }, N);
  fs.mkdirSync(require('path').dirname(out), { recursive: true });
  fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64'));
  console.log(out, errs.join('\n') || 'no errors'); await b.close();
})();
