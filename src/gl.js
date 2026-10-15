/* GPU effects (WebGL 1), optional: if WebGL is unavailable GLX.ok stays false and the Canvas 2D paths in core/main
   are used instead. One context, one canvas sized like a scene layer ((W+2M)·S × H·S):
   - GLX.post(ctx, t, o)   final grade of the frame: bloom + halation, light scattering toward the sun, colour grade,
                            paper texture, vignette, film grain. Reads ctx.canvas, writes the result back into it.
   - GLX.ripple(lay, ...)  animated ripples for mirrored water reflections (used by R()).
   Everything depends only on the uniforms (t, sun, …), so frames stay deterministic. */
const GLX = (() => {
  let gl = null, cv = null, ok = false, CW = 0, CH = 0, FW = 0, FH = 0, quad = null, texSrc = null, fA = null, fB = null;
  const PR = {}, layerTex = new Map();
  const VS = 'attribute vec2 p; varying vec2 uv; void main() { uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }';
  const HEAD = 'precision highp float; varying vec2 uv;\n';
  const FS = {
    // bright pass + 4-tap downsample
    bright: `uniform sampler2D src; uniform vec2 px; uniform float th;
      void main() { vec3 c = (texture2D(src, uv + px * vec2(-1., -1.)).rgb + texture2D(src, uv + px * vec2(1., -1.)).rgb + texture2D(src, uv + px * vec2(-1., 1.)).rgb + texture2D(src, uv + px).rgb) * 0.25;
        float l = max(c.r, max(c.g, c.b)); gl_FragColor = vec4(c * smoothstep(th, th + 0.25, l), 1.); }`,
    blur: `uniform sampler2D src; uniform vec2 dir;
      void main() { vec3 a = texture2D(src, uv).rgb * 0.2270;
        a += (texture2D(src, uv + dir * 1.3846).rgb + texture2D(src, uv - dir * 1.3846).rgb) * 0.3162;
        a += (texture2D(src, uv + dir * 3.2308).rgb + texture2D(src, uv - dir * 3.2308).rgb) * 0.0703; gl_FragColor = vec4(a, 1.); }`,
    comp: `uniform sampler2D src, bloom, rays; uniform vec2 res; uniform float t, bk, grain; uniform vec2 sc;
      float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
        return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y); }
      void main() {
        vec2 q = uv * sc, dc = uv - 0.5; float r2 = dot(dc, dc);
        vec3 col = vec3(texture2D(src, q - dc * sc * 0.006 * r2).r, texture2D(src, q).g, texture2D(src, q + dc * sc * 0.006 * r2).b);
        vec3 b = texture2D(bloom, q).rgb;
        col = 1. - (1. - col) * (1. - b * bk);                         // bloom, screen
        col += b * b * vec3(0.30, 0.10, 0.03) * 0.55;                  // halation: warm fringe round highlights
        col += texture2D(rays, q).rgb;                                // light scattering toward the sun (low-res pass)
        col = mix(col, 0.8 + 0.2 * (1. - exp(-(col - 0.8) / 0.2)), step(0.8, col));   // soft shoulder above 0.8 only
        col = clamp(col, 0., 1.);
        float y = uv.y;                                                // grade: warm sky, cool ground (soft-light)
        vec3 g = mix(vec3(0.12, 0.27, 0.37), vec3(0.5), smoothstep(0.0, 0.45, y)); g = mix(g, vec3(1.0, 0.8, 0.63), smoothstep(0.5, 1.0, y) * 0.7);
        vec3 sl = mix(2. * col * g + col * col * (1. - 2. * g), sqrt(col) * (2. * g - 1.) + 2. * col * (1. - g), step(0.5, g));
        col = mix(col, sl, 0.4);
        float l = dot(col, vec3(0.299, 0.587, 0.114));
        col = mix(col * vec3(0.95, 0.99, 1.05), col * vec3(1.03, 1.0, 0.95), smoothstep(0.2, 0.8, l)); // split tone
        col = mix(col, col * col * (3. - 2. * col), 0.18);            // gentle S-curve
        vec2 pp = uv * res;                                            // paper tooth (static)
        float pap = vn(pp / 2.2) * 0.5 + vn(pp / 9.) * 0.3 + vn(pp / 40.) * 0.2; col *= 0.975 + 0.05 * pap;
        float dv = length(dc * res), f = clamp((dv - 0.35 * res.y) / (0.62 * res.x - 0.35 * res.y), 0., 1.); col *= mix(vec3(1.), vec3(0.275, 0.235, 0.216), f); // vignette (same curve as the 2D path)
        col += (hash(pp + fract(t * 24. * 0.6180339) * 341.7) - 0.5) * grain;  // grain + dither
        gl_FragColor = vec4(col, 1.); }`,
    scatter: `uniform sampler2D src; uniform vec3 sun;
      void main() { if (sun.z <= 0.) { gl_FragColor = vec4(0., 0., 0., 1.); return; }
        vec2 d = (uv - sun.xy) * 0.028, s = uv; vec3 acc = vec3(0.); float w = 1.;
        for (int i = 0; i < 28; i++) { s -= d; acc += texture2D(src, s).rgb * w; w *= 0.94; }
        gl_FragColor = vec4(acc * 0.011 * sun.z * vec3(1., 0.86, 0.66), 1.); }`,
    ripple: `uniform sampler2D src; uniform float t, axis, amp; uniform vec2 sc;
      void main() { vec2 q = uv * sc; float yTop = 1. - uv.y, d = max(axis - yTop, 0.), k = smoothstep(0., 0.025, d);
        float ph = 150. * sqrt(d) - t * 1.7;
        float n = sin(ph + sin(uv.x * 23. + t * 0.6) * 1.4) + 0.45 * sin(ph * 2.3 + uv.x * 47. - t * 1.2);
        vec2 off = vec2(n * amp * (0.0012 + d * 0.014) * k, n * amp * 0.0025 * k * d);
        gl_FragColor = texture2D(src, (uv + vec2(off.x, -off.y)) * sc); }`,
  };
  function compile(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  function program(fs) { const p = gl.createProgram(); gl.attachShader(p, compile(gl.VERTEX_SHADER, VS)); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, HEAD + fs)); gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); const loc = {}; return { p, u: n => loc[n] ?? (loc[n] = gl.getUniformLocation(p, n)) }; }
  function tex(w, h) { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]].forEach(([k, v]) => gl.texParameteri(gl.TEXTURE_2D, k, v));
    if (w) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null); return t; }
  function fbo(w, h) { const t = tex(w, h), f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); gl.bindFramebuffer(gl.FRAMEBUFFER, null); return { t, f, w, h }; }
  function upload(t, img) { gl.bindTexture(gl.TEXTURE_2D, t); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); }
  function run(pr, target, w, h, uni, texs) {
    gl.useProgram(pr.p); gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.f : null); gl.viewport(0, 0, w, h);
    texs.forEach(([name, t], i) => { gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t); gl.uniform1i(pr.u(name), i); });
    for (const k in uni) { const v = uni[k], l = pr.u(k); if (typeof v === 'number') gl.uniform1f(l, v); else if (v.length === 2) gl.uniform2fv(l, v); else gl.uniform3fv(l, v); }
    gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function init(cw, ch, fw, fh) {
    ok = false; layerTex.clear();
    try {
      cv = document.createElement('canvas'); cv.width = CW = cw; cv.height = CH = ch; FW = fw; FH = fh;
      gl = cv.getContext('webgl', { premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: false, alpha: true });
      if (!gl) return false;
      for (const k in FS) PR[k] = program(FS[k]);
      quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      texSrc = tex(); const bw = Math.ceil(fw / 4), bh = Math.ceil(fh / 4); fA = fbo(bw, bh); fB = fbo(bw, bh);
      ok = true;
    } catch (e) { console.warn('GLX disabled:', e.message); ok = false; }
    return ok;
  }
  /* frame grade; o.sun = [x, y, strength] in logical 1280×720 coords */
  function post(ctx, t, o = {}) {
    upload(texSrc, ctx.canvas);
    const bw = fA.w, bh = fA.h;
    run(PR.bright, fA, bw, bh, { px: [1 / FW, 1 / FH], th: 0.55 }, [['src', texSrc]]);
    for (const k of [1, 2.2]) { run(PR.blur, fB, bw, bh, { dir: [k / bw, 0] }, [['src', fA.t]]); run(PR.blur, fA, bw, bh, { dir: [0, k / bh] }, [['src', fB.t]]); }
    const sun = o.sun ? [o.sun[0] / W, 1 - o.sun[1] / H, o.sun[2]] : [0, 0, 0];
    run(PR.scatter, fB, bw, bh, { sun }, [['src', fA.t]]);
    run(PR.comp, null, FW, FH, { res: [FW, FH], t, bk: 0.35, grain: 0.035, sc: [1, 1] }, [['src', texSrc], ['bloom', fA.t], ['rays', fB.t]]);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(cv, 0, CH - FH, FW, FH, 0, 0, FW, FH); ctx.restore();
  }
  /* rippled copy of a cached reflection layer; axis = horizon y in logical coords. Returns [canvas, sx, sy, sw, sh]. */
  function ripple(lay, axis, t, amp = 1) {
    let tx = layerTex.get(lay); if (!tx) { tx = tex(); upload(tx, lay); layerTex.set(lay, tx); }
    run(PR.ripple, null, lay.width, lay.height, { t, axis: axis / H, amp, sc: [1, 1] }, [['src', tx]]);
    return [cv, 0, CH - lay.height, lay.width, lay.height];
  }
  /* drop textures of layers no longer cached */
  function prune(live) { for (const [lay, tx] of layerTex) if (!live.has(lay)) { gl.deleteTexture(tx); layerTex.delete(lay); } }
  return { init, post, ripple, prune, get ok() { return ok; } };
})();
