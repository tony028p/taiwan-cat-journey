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
npm run render                # -> build/film.mp4   (~0.22 s/frame at 1080p, ~20 min)
npm run shots                 # one still per scene -> build/shots/
node tools/shots.cjs 40 41.5  # stills at given seconds
for f in src/*.js; do node --check $f; done   # syntax check (run after every edit)
```

There is no test suite. The verification loop is: syntax-check → `tools/shots.cjs` at the times you touched → look at the stills. Check a few frames *inside* any motion you changed, not just one per scene.

## Hard rules

1. **Deterministic.** `draw(ctx, t)` must produce the same pixels for the same `t`. Never use `Math.random()` or `Date`; use `rng(seed)` / `hash(n)` from `core.js`. Anything animated derives from `T` (global time) or `lt` (scene-local time).
2. **Logical coordinates.** Everything is drawn in a 1280×720 logical space; `S` is the device scale (1.5 for 1080p). Picture area is y ∈ [BAR, H−BAR] = [92, 628]; the black letterbox bars carry the subtitles.
3. **Script load order matters** (see `render.html`): `core → cat2 → cat3 → scenesA → scenesB → transitions → actions3 → main`. Later files deliberately override earlier globals (`actCat` in `actions3.js` replaces the one in `cat2.js`). Top-level `const` names are shared across classic scripts, so don't redeclare them.
4. **Colours passed to `mix()`/`rgba()`/`toA()` must be 6-digit hex** (`#ffffff`, not `#fff`) or `rgba(...)`. 3-digit hex silently produces wrong colours (this caused blue "clouds" once).
5. **`mountain()` with a custom `fn`** has no `base`; pass `bottom` or let the code infer it. Non-finite gradient stops throw.
6. Don't commit renders (`build/`, masters). `media/film-720p.mp4` is the only video in git.
7. Reference photos/GIFs were only *looked at*; none are in the repo. Don't add copyrighted images, and don't reproduce characters from other films — the cat is an original design.

## Architecture

### Timeline (`main.js`)
- `SCENES` (landmarks, from `scenesA/B.js`) and `TRANS` (from `transitions.js`) are interleaved into `FILM`: `L0, T0, L1, T1, … , T21, L22`.
- Durations: `L0` 8 s, landmark 6 s, transition `dur` (3.6 s), final landmark 9 s. `PRE` = 1 s of black, then 8 s of credits. `STARTS` is computed — never hard-code times in scenes.
- Adjacent scenes cross-fade over `XF*2` = 1 s; both are rendered into `bufA/bufB` during the overlap, so a scene must draw correctly for `lt` slightly < 0 and > `dur`.
- `post()` adds bloom, soft-light grade, vignette and film grain, then bars, location card (`locCard`), subtitles and title/credits are drawn on top.
- If you change durations, re-time `tools/music3.py` (section start times are printed when it runs) and the `STARTS` array in `index.html`.

### Scenes
A scene object: `{ id, county, place, en, ll, sub:[zh,en], sub2?, cam:[z0,z1,x0,x1,y0,y1], via?, dur?, final?, draw(lt) }`.

Inside `draw(lt)` use the layer helpers from `core.js`:
- `L(key, depth, painter, {blur, dx, alpha})` — static layer, painted **once** into an offscreen canvas and cached per scene, then drawn with the camera transform for its `depth` (0 = far, 1 = near). Put anything expensive (textures, thousands of dabs) here.
- `R(key, depth, axisY, alpha, painter)` — mirrored, blurred reflection of a cached layer (water).
- `D(depth, fn)` — dynamic per-frame drawing with the same camera transform (water shimmer, birds, rain, the cat).
- Painters: `sky`, `mountain`, `cumulus`, `stratus`, `glow`, `godrays`, `shimmer`, `flock`, `grassTufts`, plus landmark helpers (`tower101`, `pagoda`, `lighthouse`, `boat`, `windLion`, `minnanHouse`, `trainWindow`, …).
- Caches for scenes more than one index away are dropped automatically.

### The cat (`cat3.js`, `actions3.js`)
- **Rig**: a pose is plain data — `hip`, `sh` (shoulder), `arch`, `head`, `hr` (head rotation), four paw targets `fn/ff/hn/hf = [x, y, flex]`, `tail = [baseAngle, curl, waveAmp, waveFreq, onGround]`, face params `eye/mouth/tongue/ear`, `g` (girth). Legs are solved with 2-bone IK. Sitting uses a separate silhouette (`SITP`, `pose.sit = 1`).
- **Poses**: `STAND3, CROUCH3, LEAP3, LAND3, STRETCH3, LOAF3, SLEEP3, SITP`; generators `walkPose3(cycles, {trot, low, ear, eye, hr, tail})`, `gallopPose3(cycles)`. Blend any two rig poses with `lp(a, b, u)`. Sit↔rig can't be blended — use `cross(qa, qb, u)` (a short dissolve).
- **No foot sliding**: convert distance to gait cycles with `walkCyc3(dist, scale, trot)` / `gallopCyc3(dist, scale)`.
- **Rendering**: `drawCat3` paints the whole cat in flat colour into an offscreen buffer (far legs darker), applies cel shading with `source-atop`, builds a single outer outline by dilating the silhouette, adds an optional rim light, then draws the face on top. This is what makes the legs grow seamlessly out of the body; don't draw limbs with their own outlines.
- **Choreography**: `actCat(o)` in `actions3.js` switches on the landmark id (`L0`…`L22`) and strings actions together by `lt`. Transitions call `drawCat3` directly.

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
- Cat is always in side view (profile head); there is no front-facing head.
- Text uses the system serif CJK font (Noto Serif CJK TC on Linux). On other systems the fallback font changes the look of titles.
- Rendering is CPU-bound (~0.2 s/frame). Splitting `render.cjs` into parallel chunks by time range would speed it up.
