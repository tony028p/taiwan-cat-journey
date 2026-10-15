/* v3 per-scene cat choreography (landmark scenes L0–L22). Each scene strings 2–4 actions together. */
function sit3(lt, o = {}) { return { ...SITP, ...o, eye: o.eye ?? (blinkAt(lt, o.seed || 0) ? 0 : 1) }; }
function cross(qa, qb, u) { if (u <= 0) return drawCat3(qa); if (u >= 1) return drawCat3(qb); c.save(); c.globalAlpha *= 1 - u; drawCat3({ ...qa, shadow: false }); c.restore(); c.save(); c.globalAlpha *= u; drawCat3(qb); c.restore(); }
function seqWalk(q, x0, sp, t, o = {}) { q.x = x0 + t * sp; q.pose = walkPose3(walkCyc3(t * sp, q.s, o.trot), o); return q; }
function actCat(o) {
  const id = SC.sc.id || ('L' + SC.i), lt = SC.lt, ld = +id.slice(1);
  const F = { 1: 1.2, 2: 1.15, 3: 1.05, 4: 1.15, 5: 1.25, 6: 1.15, 7: 1.3, 8: 1.15, 9: 1.15, 11: 1.15, 12: 1.2, 13: 1.15, 14: 1.1, 15: 1.15, 16: 1.2, 17: 1.15 }[ld] || 1;
  let q = { ...o, s: o.s * F }; delete q.pose;
  const s = q.s;
  switch (ld) {
    case 0: { // dawn on Xiangshan: sit, ear twitch, yawn, rise and stretch, walk off
      if (lt < 5.4) { const y = sm((lt - 3.9) / 0.35) * (1 - sm((lt - 5.0) / 0.4)); q.pose = sit3(lt, { hr: lerp(-0.06, -0.55, y), mouth: y, eye: y > 0.3 ? 0 : undefined, ear: Math.sin(lt * 9) > 0.96 ? 0.3 : 0, ts: 1.1 }); return drawCat3(q); }
      const u = sm((lt - 5.4) / 0.35), st = sm((lt - 5.7) / 0.7) * (1 - sm((lt - 6.9) / 0.6));
      const qb = { ...q, x: q.x + 8, pose: lp(STAND3, STRETCH3, st) }; if (lt > 7.2) { seqWalk(qb, q.x + 8, 32, lt - 7.2); }
      return cross({ ...q, pose: sit3(lt, { hr: -0.1 }) }, qb, u);
    }
    case 1: { // Jiufen: trot through rain, stop under the eaves, shake off, look up at the lanterns
      const stopT = 3.2, d = lt < stopT ? lt * 46 : stopT * 46 + (1 - Math.exp(-(lt - stopT) * 5)) * 9; q.x = 600 + d;
      if (lt < stopT) q.pose = walkPose3(walkCyc3(lt * 46, s, true), { trot: 1, ear: 0.25 });
      else { const u = lt - stopT - 0.4, sh = u > 0 && u < 0.8 ? Math.sin(u * 42) * 0.45 * (1 - u / 0.8) : 0, look = sm((lt - 4.7) / 0.5);
        q.pose = { ...STAND3, hr: sh - look * 0.55, eye: Math.abs(sh) > 0.1 ? 0 : 1, ear: Math.abs(sh) * 0.8, hip: [-34, -50 + Math.abs(sh) * 4], tail: [-1.75, 0.12, 0.06 + Math.abs(sh) * 0.3, 8, 0] };
        if (u > 0 && u < 1.3) { const xx = q.x, yy = q.y; q.after = () => shakeDrops(xx + 40 * s, yy - 58 * s, s, clamp(u / 1.3)); } }
      break;
    }
    case 2: { // Keelung: stalk the gull — crouch, butt-wiggle, pounce, miss, look around
      q.x = 250; q.y = 594;
      if (lt < 4.2) { const u = sm(lt / 0.8), wig = lt > 2.3 ? Math.sin(lt * 24) * 3 : 0; q.pose = lp(STAND3, CROUCH3, u); q.pose.hip = [q.pose.hip[0] + wig, q.pose.hip[1] - Math.abs(wig) * 0.5]; q.pose.hr = -0.25 - lt * 0.03; q.pose.tail = [-2.95, -0.02, 0.2, 7, 0]; }
      else if (lt < 4.85) { const u = (lt - 4.2) / 0.65; q.pose = lp(CROUCH3, LEAP3, sm(u * 2)); q.x = 250 + u * 90; q.y = 594 - Math.sin(u * Math.PI) * 60; q.shadowA = 0.18; }
      else { const u = sm((lt - 4.85) / 0.25); q.pose = lp(LAND3, { ...STAND3, hr: Math.sin((lt - 5) * 3) * 0.3 }, u); q.x = 340; }
      break;
    }
    case 3: { // Yilan: wash face, then watch the sunrise
      const g = lt > 1.2 && lt < 4.2, ph = (lt - 1.2) * 5.5, a = g ? 0.5 + 0.5 * Math.sin(ph) : 0, wash = lt > 2.8;
      q.pose = sit3(lt, g ? (wash ? { hr: 0.15 + a * 0.25, eye: 0, paw: [22 + a * 4, -86 + a * 8, 1] } : { hr: 0.45 + a * 0.1, tongue: a, eye: 0, paw: [24, -72 + a * 4, 1] }) : { hr: lt > 4.2 ? -0.12 : -0.05, ts: 1.4 });
      break;
    }
    case 4: { // Qingshui: balance walk on the railing, pause to look down at the surf, carry on
      const t = lt < 2.4 ? lt : lt < 3.8 ? 2.4 : lt - 1.4, d = t * 30; q.x = d; q.y = 498 + (q.x + 90) * 22 / 390 - 2;
      q.pose = lt >= 2.4 && lt < 3.8 ? lp(walkPose3(walkCyc3(2.4 * 30, s)), { ...STAND3, hr: 0.55, head: [56, -60] }, sm((lt - 2.4) / 0.4) * (1 - sm((lt - 3.4) / 0.4)))
        : walkPose3(walkCyc3(d, s), { tail: [-2.95, 0.04, 0.14, 1.4, 0], hr: 0.12 });
      break;
    }
    case 5: { // Taitung: walk, spot butterfly, crouch, pounce, land and watch it flutter off
      const bx = 640 + Math.sin(lt * 1.3) * 60 + lt * 22, by = 520 + Math.sin(lt * 2.7) * 25 - sm((lt - 4.2) / 1.5) * 110;
      if (lt < 2.4) seqWalk(q, 250, 30, lt);
      else if (lt < 3.8) { const u = sm((lt - 2.4) / 0.5); q.x = 250 + 72; q.pose = lp(STAND3, CROUCH3, u); q.pose.hip = [q.pose.hip[0] + (lt > 3 ? Math.sin(lt * 24) * 3 : 0), q.pose.hip[1]]; q.pose.hr = -0.3; }
      else if (lt < 4.5) { const u = (lt - 3.8) / 0.7; q.pose = lp(CROUCH3, LEAP3, sm(u * 1.6)); q.x = 322 + u * 130; q.y = 582 - Math.sin(u * Math.PI) * 80; q.shadowA = 0.15; }
      else { const u = sm((lt - 4.5) / 0.3); q.pose = lp(LAND3, { ...STAND3, hr: -0.55, head: [56, -76] }, u); q.x = 452; }
      q.after = () => butterfly(bx, by, 1.3, lt); break;
    }
    case 6: { // Eluanbi: walk the cape at sunset, then sit to watch
      const f = x2 => 470 - 120 * sm((x2 - 520) / 500) - fbm1(x2 * 0.01 + 3) * 16;
      if (lt < 3.6) { seqWalk(q, 500, 26, lt); q.y = Math.min(f(q.x), 560) + 2; return drawCat3(q); }
      const x = 500 + 3.6 * 26, qa = { ...q, x, y: Math.min(f(x), 560) + 2, pose: { ...STAND3, hr: -0.2 } };
      return cross(qa, { ...qa, x: x + 6, pose: sit3(lt, { hr: -0.15, ts: 1.0 }) }, sm((lt - 3.7) / 0.3));
    }
    case 7: { // Lotus Pond: walk the zigzag bridge, stop, peer down at the koi
      if (lt < 3.8) seqWalk(q, 330, 28, lt); else { q.x = 330 + 3.8 * 28; q.pose = lp(walkPose3(walkCyc3(3.8 * 28, s)), { ...STAND3, hr: 0.6, head: [56, -52], tail: [-1.6, 0.14, 0.12, 4, 0] }, sm((lt - 3.8) / 0.5)); }
      q.y = 548 + (q.x - 300) / 460 * 42 - 1; break;
    }
    case 8: { // Penghu: loafing in the breeze, ears flicking, dozing off
      const doze = sm((lt - 3.5) / 1.5); const pp = lp(LOAF3, SLEEP3, doze); pp.eye = doze > 0.5 ? 0 : (blinkAt(lt, 8) ? 0 : 1); pp.ear = Math.max(0, Math.sin(lt * 3.3)) > 0.97 ? 0.45 : pp.ear; pp.hr = (pp.hr || 0) + Math.sin(lt * 0.5) * 0.05;
      q.pose = pp; q.y = 546; q.x = 220; break;
    }
    case 9: { const tr = lt > 3.2; q.cyc = tr ? walkCyc3(3.2 * 26, s) + walkCyc3((lt - 3.2) * 44, s, true) : walkCyc3(lt * 26, s); q.pose = walkPose3(q.cyc, tr ? { trot: 1 } : {}); break; }
    case 10: { const y = sm((lt - 2.4) / 0.4) * (1 - sm((lt - 3.7) / 0.5)); q.pose = sit3(lt, { hr: lerp(-0.1, -0.6, y), mouth: y, eye: y > 0.3 ? 0 : undefined, seed: 9 }); break; }
    case 11: { // Hinoki: big stretch on the porch, then stroll off
      if (lt < 2.6) { const u = sm(lt / 0.9) * (1 - sm((lt - 1.9) / 0.7)); q.pose = lp(STAND3, STRETCH3, u); q.pose.mouth = Math.max(0, u - 0.6) * 2; q.x = 230; }
      else seqWalk(q, 230, 30, lt - 2.6);
      break;
    }
    case 12: { q.x = 300 + lt * 95; q.pose = gallopPose3(gallopCyc3(lt * 95, s)); q.y = 594; break; }
    case 13: { seqWalk(q, 300, 22, lt, { tail: [-1.65, 0.15, 0.05, 1.2, 0] }); q.y = 598; break; }
    case 14: { const ph = lt * 4.5, a = 0.5 + 0.5 * Math.sin(ph), wash = lt > 3.4;
      q.pose = sit3(lt, wash ? { hr: 0.15 + a * 0.25, eye: 0, paw: [22 + a * 4, -86 + a * 8, 1] } : { hr: 0.5, tongue: a, eye: 0.15, paw: [24, -72 + a * 3, 1] }); break; }
    case 15: { q.cyc = walkCyc3(lt * 28, s); q.pose = walkPose3(q.cyc); break; }
    case 16: { const sw = Math.max(0, Math.sin(lt * 2.2 - 1)); q.pose = sit3(lt, { hr: -0.35 - sw * 0.1, paw: sw > 0.05 ? [30 + sw * 14, -50 - sw * 40, 1] : null, ts: 2.4 }); q.x = 470; q.y = 600; break; }
    case 17: { seqWalk(q, 280, 22, lt, { low: 9, ear: 0.5, eye: 0.35, hr: 0.12, tail: [-2.9, 0.03, 0.16, 2.6, 0] }); break; }
    case 18: { const look = lt < 2 ? -0.18 : lt < 3.5 ? lerp(-0.18, 0.25, sm((lt - 2) / 0.6)) : lerp(0.25, -0.1, sm((lt - 3.8) / 0.6)); q.pose = sit3(lt, { hr: look, ts: 2.0 }); break; }
    case 19: { const u = clamp((lt - 0.5) / 5.5); q.pose = sit3(lt, { hr: -0.15 - u * 0.6, ts: 1.8 }); break; }
    case 20: { q.pose = sit3(lt, { hr: lt < 3 ? 0.35 : lerp(0.35, -0.1, sm((lt - 3) / 0.8)), eye: lt > 4.5 && lt < 5.4 ? 0 : undefined }); break; }
    case 21: { q.x = 150; q.y = 551;
      if (lt < 4.3) { const tap = Math.max(0, Math.sin(lt * 2.6)); q.pose = lp(STAND3, CROUCH3, 0.8); q.pose.fn = [44 + tap * 20, -tap * 10, tap]; q.pose.hr = 0.35; q.pose.head = [56, -40]; }
      else if (lt < 4.8) { const u = (lt - 4.3) / 0.5; q.pose = lp(CROUCH3, LEAP3, sm(u * 2)); q.face = -1; q.x = 150 - u * 40; q.y = 551 - Math.sin(u * Math.PI) * 40; }
      else { q.pose = lp(LAND3, { ...STAND3, hr: 0.2 }, sm((lt - 4.8) / 0.3)); q.face = -1; q.x = 110; }
      break; }
    case 22: { // home: walk in, curl up, fall asleep
      if (lt < 2.4) { seqWalk(q, 250, 30, lt); return drawCat3(q); }
      const x = 250 + 2.4 * 30, sl = sm((lt - 3.2) / 2.5), pp = lp(LOAF3, SLEEP3, sl); pp.eye = lt > 5.6 ? 0 : (lt > 4.3 ? 0.35 : (blinkAt(lt, 20) ? 0 : 1));
      return cross({ ...q, x, pose: { ...STAND3, hr: -0.1 } }, { ...q, x: x + 10, pose: pp }, sm((lt - 2.4) / 0.4));
    }
    default: q.pose = q.pose0 === 'sit' ? sit3(lt, { hr: q.look || 0 }) : walkPose3(walkCyc3(lt * 28, s));
  }
  drawCat3(q); if (q.after) q.after();
}
