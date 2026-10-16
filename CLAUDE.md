# CLAUDE.md

Guidance for Claude Code (and other coding agents) working in this repository.

## What this is

"小貓環島記" — a 231-second animated short drawn entirely in procedural Canvas 2D. A tabby cat travels clockwise round Taiwan's 22 counties/cities. There are no image or video assets: every frame is generated from code, and the score is synthesized in Python.

The same JS runs in two places:
- **Live**: `index.html` (player) falls back to drawing the film in real time if the video can't load.
- **Offline render**: `tools/render.cjs` loads `render.html` in headless Chromium (Playwright), calls `frame(t)` for every frame, and pipes JPEGs to ffmpeg.

## Commands

```bash
npm install && npx playwright install chromium
pip install -r requirements.txt
npm run music                 # -> build/music.wav  (must exist before render)
npm run render                # -> build/film.mp4   (~0.4 s/frame at 1080p, ~40 min)
FROM=213.5 OUT=build/tail.mp4 node tools/render.cjs   # re-render only the tail (see docs/PIPELINE.md to splice)
npm run shots                 # one still per scene -> build/shots/
node tools/shots.cjs 40 41.5  # stills at given seconds
node tools/posesheet.cjs      # gait cycles, poses, expressions -> build/posesheet.png
for f in src/*.js; do node --check $f; done   # syntax check (run after every edit)
```

There is no test suite. The verification loop is: syntax-check → `tools/shots.cjs` at the times you touched → look at the stills. Check a few frames *inside* any motion you changed, not just one per scene. For rig/gait changes look at `tools/posesheet.cjs` first.

Playwright must match the pre-installed browser build; if `npx playwright install` is not possible, `npm install --no-save playwright@<version matching /opt/pw-browsers>`. Headless Chromium provides WebGL through SwiftShader, so the offline render uses the GPU grade too.

## Hard rules

1. **Deterministic.** `draw(ctx, t)` must produce the same pixels for the same `t`. Never use `Math.random()` or `Date`; use `rng(seed)` / `hash(n)` from `core.js`. Anything animated derives from `T` (global time) or `lt` (scene-local time).
2. **Logical coordinates.** Everything is drawn in a 1280×720 logical space; `S` is the device scale (1.5 for 1080p). Picture area is y ∈ [BAR, H−BAR] = [92, 628]; the black letterbox bars carry the subtitles.
3. **Script load order matters** (see `render.html`, and the `srcs` list in `index.html`): `core → gl → cat2 → cat3 → scenesA → scenesB → transitions → actions3 → main`. Later files deliberately override earlier globals (`actCat` in `actions3.js` replaces the one in `cat2.js`). Top-level `const` names are shared across classic scripts, so don't redeclare them.
4. **Colours passed to `mix()`/`rgba()`/`toA()` must be 6-digit hex** (`#ffffff`, not `#fff`) or `rgba(...)`. 3-digit hex silently produces wrong colours (this caused blue "clouds" once).
5. **`mountain()` with a custom `fn`** has no `base`; pass `bottom` or let the code infer it. Non-finite gradient stops throw.
6. Don't commit renders (`build/`, masters). The only videos in git are `media/film-720p.mp4` (player) and `media/film-1080p.mp4` (download link on the page, ~85 MB — must stay under GitHub's 100 MB limit; replace it only when the film is final, each replacement adds its size to the git history).
7. Reference photos/GIFs were only *looked at*; none are in the repo. Don't add copyrighted images, and don't reproduce characters from other films — the cat is an original design.

## Architecture

### Timeline (`main.js`)
- `SCENES` (landmarks, from `scenesA/B.js`) and `TRANS` (from `transitions.js`) are interleaved into `FILM`: `L0, T0, L1, T1, … , T21, L22`.
- Durations: `L0` 8 s, landmark 6 s, transition `dur` (3.6 s), final landmark 9 s. `PRE` = 1 s of black, then 8 s of credits. `STARTS` is computed — never hard-code times in scenes.
- Adjacent scenes cross-fade over `XF*2` = 1 s; both are rendered into `bufA/bufB` during the overlap, so a scene must draw correctly for `lt` slightly < 0 and > `dur`.
- `post()` grades the frame: with WebGL it calls `GLX.post` (`gl.js`: bright-pass bloom, halation, light scattering toward the scene's `sun`, soft-light grade, paper texture, vignette, grain); without WebGL it falls back to the Canvas 2D bloom/soft-light/vignette/grain. Then bars, location card (`locCard`), subtitles and title/credits are drawn on top.
- If you change durations, re-time `tools/music3.py` (section start times are printed when it runs) and the `STARTS` array in `index.html`.

### Scenes
A scene object: `{ id, county, place, en, ll, sub:[zh,en], sub2?, sub3?, cam:[z0,z1,x0,x1,y0,y1], via?, dur?, final?, sun?(lt) → [x, y, strength], draw(lt) }`. `sun` (logical coords) drives the light-scattering pass.

Inside `draw(lt)` use the layer helpers from `core.js`:
- `L(key, depth, painter, {blur, dx, alpha})` — static layer, painted **once** into an offscreen canvas and cached per scene, then drawn with the camera transform for its `depth` (0 = far, 1 = near). Put anything expensive (textures, thousands of dabs) here.
- `R(key, depth, axisY, alpha, painter, blur, o)` — mirrored, blurred reflection of a cached layer (water). With WebGL the reflection gets animated ripples (`GLX.ripple`); `o.ripple` scales them, `0` turns them off.
- `D(depth, fn)` — dynamic per-frame drawing with the same camera transform (water shimmer, birds, rain, the cat).
- Painters: `sky`, `mountain`, `cumulus`, `stratus`, `glow`, `godrays`, `shimmer`, `flock`, `grassTufts`, plus landmark helpers (`tower101`, `pagoda`, `lighthouse`, `boat`, `windLion`, `minnanHouse`, `trainWindow`, …).
- Caches for scenes more than one index away are dropped automatically.

### The cat (`cat3.js`, `actions3.js`)
- **Rig**: a pose is plain data — `hip`, `sh` (shoulder), `arch`, `head`, `hr` (head rotation), `turn` (head yaw: 0 profile → 1 facing the camera), four paw targets `fn/ff/hn/hf = [x, y, flex]`, `tail = [baseAngle, curl, waveAmp, waveFreq, onGround]` (+ optional `tailPh` to drive the wave from the gait, `tailW` thickness), `sb`/`hb` (shoulder-blade / hip bump on the topline), `g` (girth), plus the face parameters below. Legs are solved with 2-bone IK. Sitting uses a separate silhouette (`SITP`, `pose.sit = 1`).
- **Poses**: `STAND3, CROUCH3, LEAP3, LAND3, STRETCH3, LOAF3, SLEEP3, SCARED3` (arched “Halloween cat”), `REAR3`, `LOAFT3`/`SLEEPT3` (loaf with the front paws tucked under the chest — `tuck: 1` draws the near forearm behind the body), `SITP`; `groom3(lt, t0, t1)` (actions3.js) is a sitting overlay that turns the head back over the shoulder (`turn` → 2, `hdx/hdy`) and licks the flank; generators `walkPose3(cycles, {trot, low, ear, eye, hr, tail})` (secondary motion — withers/pelvis height, shoulder-blade bump, head nod — is derived from which legs bear weight) and `gallopPose3(cycles)` (transverse lope; spine length changes ≤ ~11%, never stretch the body). Blend any two rig poses with `lp(a, b, u)`. Sit↔rig can't be blended — use `cross(qa, qb, u)` (a short dissolve).
- **Compact torso**: rig poses are authored long and drawn compressed along x by `SPX` and lowered by `SPY` (`squashX` in `drawCat3`), with the leg bones shortened by `LEG` to match; `walkCyc3`/`gallopCyc3` and `noseW`/`pawW` already account for it. The torso is a full tube: the belly (`bot` in `bodyGeom3`) is one nearly level line with a slight pouch before the haunch, deepening only into the chest — never pinch the waist (it reads as a thin, stilt-legged cat when walking); belly-to-ground ≈ torso depth. Proportions and gait were checked frame by frame against reference walk cycles (hand-drawn and real cats, looked at only — not in the repo): torso ≈ 1.6× withers height, a long stride (`WSX3`/`TSX3`: legs swing well fore and aft as an inverted V), head carried forward just above the topline (`WHX3`/`WHY3`), tail rising from the top of the rump. Hind paws stand under the rump (`hn`/`hf` ≈ −38/−44), not under the middle of the body. Hind leg: short broad thigh (17.5) painted with the body, shin 19, long near-vertical metatarsal (hock ≈ 17.5 up) — keep the knee tucked up under the haunch, a low knee + low hock reads as a bird leg. `hindWeb` fills the notch between rump and shin so the back of the hind leg is one convex line from the rump to the heel; the inner contour is also cut away around the elbow and knee so no line shows where a leg leaves the body. The head sits low on the shoulders (`headPos3` pulls it 20% toward the withers). Head size `HSR`/`HSS` ≈ 1.3 (torso ≈ 2.4 head lengths; a real cat is ≈ 4) and eye scale `EYE3` ≈ 0.85 (eye ≈ 0.22 of head height, eyes about one eye-width apart), ear tip `EARH` ≈ −20 (ear ≈ 0.4 of the skull height, set wide at 10 and 2 o'clock; tips rounded, a turned ear is kept ≥ 2/3 wide); the skull is wider than tall and the cheeks round, no square jowls — bigger reads as a chibi, not an elegant cat.
- **No foot sliding**: convert distance to gait cycles with `walkCyc3(dist, scale, trot)` / `gallopCyc3(dist, scale)`. A gallop needs ≈200 px/s to read as running.
- **Rendering** (`drawRig`): far legs (darker `far` colour) → tail → body, with the **haunch and both near upper limbs painted into the body pass** so stripes and the cream underside run across them → the near upper arm painted *after* the body shading (clipped below the stripes) so the leg is one colour from shoulder to paw, one cream bib from chin to chest → near *lower* legs on their own layer (`CB3`) with a thin inner contour (`CB4`), kept only where it crosses a far leg (`CB5` holds the far legs) → neck and head. Then one outer outline by dilating the silhouette, optional rim light, face on top. Don't draw the thigh as a separate shape (it reads as a drumstick) and don't give limbs their own outlines. The cream belly stops before the haunch.
- **Head**: a small 3D model (`headView`, `earGeo`, `headPath`: skull, cheeks + fur tufts, muzzle, chin, ears) projected at yaw `turn` (0 profile, 1 front, 2 looking back over the shoulder); no cheek tufts — they read as a growth; `headPath` merges skull, cheeks, muzzle and chin into one smooth contour (radial max → closing → blur), never draw the head as a union of separate circles (bumpy outline); `headSil` fills it into the silhouette and `face3`/`eye3` draw the features, so every expression works in profile, three-quarter and front view. `turnAt(lt, [[t0, t1, amount]])` ramps a look at the camera.
- **Expressions**: every face parameter is numeric so they blend — `turn, eye, happy, lid, pupil, look:[x,y], ear, earDown, mouth, smile, frown, tongue, blush, whisk, sparkle, shine`. Presets in `EXPR3` (`happy, content, curious, surprised, delighted, focused, sleepy, annoyed, sad, meow, blep, scared`); use `{...pose, ...ex('happy')}`, `exMix(a, b, u)` or a timeline `exSeq(lt, [[t0,'curious'], [t1,'happy']])`. Blinking is automatic (`noBlink: true` to disable).
- **Other cats**: `drawCat3({ ..., coat: 'black' | 'white' | 'grey' | 'calico' | 'tuxedo' })` uses `COATS[coat]` (patches via `patches`/`sitPatches`/`headPatches`). Friends are drawn inside the landmark's `actCat` case (in `q.before`/`q.after`) so they share its timing and are mirrored into reflections with it. `dreamBubble()` shows all five at the end.
- **Comic marks**: `emote3(kind, …)` draws `! ? z note heart drop spark` above the head; set `q.emote` via `emo(q, lt, [[t0, t1, kind]])` or `emoAt(lt, list)`. They are skipped in mirrored (reflection) draws.
- **Choreography**: `actCat(o)` in `actions3.js` switches on the landmark id (`L0`…`L22`); each scene is a 3–5 beat story timed to its subtitle. Props the cat touches (gull, crab, koi, dragonfly, blossom, persimmon, puddle, ripples, steam) are drawn there via `q.before`/`q.after` so they stay in sync. Helpers: `noseW(q)` (world nose position), `jumpArc(q, lt, t0, t1, from, to)` (crouch → leap → land onto an object), `bumpT`, `mirrored()`. Transitions call `drawCat3` directly but use the same `ex`/`emoAt` helpers.

### GPU effects (`gl.js`)
- `GLX` owns one WebGL1 context and a canvas the size of a scene layer. `GLX.ok` is false when WebGL is missing; every caller checks it and falls back to Canvas 2D.
- Shaders read only uniforms (`t`, sun, …), so frames stay deterministic. Cached layer textures are pruned with the scene caches each frame.

### Music (`tools/music3.py`)
Additive-synthesis piano, detuned-saw strings, celesta and timpani, FFT-convolution reverb. Structure: 起 (solo piano) → 承 (arpeggios + strings) → 轉 (relative-minor theme B, building) → 合 (theme A up a whole tone, full) → coda. All melodies are original.

## Adding a stop or interlude
1. Add a scene object to `SCENES` (landmark) or call `V(...)` in `transitions.js`.
2. Keep the ground line inside the picture area and leave space top-left for the location card.
3. For a landmark, add a `case` to `actCat` with its cat choreography.
4. Update `ROUTE` in `main.js` (credits map) and the stop list in `index.html` if the route changes.
5. `node --check`, then `tools/shots.cjs` at several `lt` values, then re-time the music.

## Known limitations / ideas
- Illustrated, not photoreal. Some interludes (tea hills, HSR) are simpler than the landmarks.
- The body is always in side view; only the head turns toward the camera.
- Text uses the system serif CJK font (Noto Serif CJK TC on Linux). On other systems the fallback font changes the look of titles.
- Rendering is CPU-bound (~0.3 s/frame at 1080p with software WebGL). Splitting `render.cjs` into parallel chunks by time range would speed it up.
- The cat is small in most shots; expressions rely on the comic marks and head turns. Close-up shots would show them better.
