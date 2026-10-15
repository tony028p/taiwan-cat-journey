# v1 — 柔和手繪風（1 分鐘）

第一版：8 個景點、鉛筆線條每秒抖動 8 次、紙張紋理、音樂盒配樂。

- `anim.js`：全部的繪圖程式，`CatTour.draw(ctx, t, scale)`
- `render.html` / `render.cjs` / `shots.cjs`：算圖工具，用法和 v3 相同
- `music.py`：配樂合成

`render.html` 會讀取 `pkg/package/lxgwwenkaitc-bold.css` 這個字型（npm 套件 `lxgw-wenkai-tc-webfont@1.2.0`）。要重新算圖的話：

```bash
npm pack lxgw-wenkai-tc-webfont@1.2.0 && mkdir -p pkg && tar xzf lxgw-wenkai-tc-webfont-1.2.0.tgz -C pkg
```
