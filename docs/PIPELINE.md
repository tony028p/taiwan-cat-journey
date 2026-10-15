# 製作流程 Pipeline

## 1. 配樂

```bash
python3 tools/music3.py      # -> build/music.wav（44.1 kHz 立體聲，231.2 秒）
```

執行時會印出各段落的起始秒數（承、轉、合、尾聲），用來對照畫面時間軸。

## 2. 逐格算圖

```bash
node tools/render.cjs        # -> build/film.mp4
```

- `render.html?s=1.5` 代表以 1.5 倍縮放（1280×720 邏輯座標 → 1920×1080）。
- 每格呼叫 `frame(t)`，取得 JPEG（品質 0.94），用 `image2pipe` 交給 ffmpeg：H.264 `-preset slow -crf 16`，AAC 192k。母片約 250MB。
- 速度約每格 0.3 秒（無 GPU 的 headless Chromium 以 SwiftShader 執行 WebGL），總共 5,549 格（24 fps）。

### 只重算結尾（或任何一段到片尾）

只改了後面的場景時，不必整部重算：

```bash
FROM=213.5 OUT=build/tail.mp4 node tools/render.cjs     # 從 213.5 秒算到片尾，只有畫面
# 把原母片前 213.5×24 = 5124 格接上新的尾段，再配上音樂
ffmpeg -i build/film.mp4 -i build/tail.mp4 -i build/music.wav -filter_complex \
  "[0:v]trim=end_frame=5124,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[v]" \
  -map "[v]" -map 2:a -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart build/film_spliced.mp4
```

FROM 要比改動的場景早至少 0.5 秒（交叉淡化）。

## 3. 其他版本

```bash
# 網頁版 720p（< 15MB）
ffmpeg -i build/film.mp4 -vf "scale=1280:720:flags=lanczos,hqdn3d=2:2:4:4" \
  -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -c:a aac -b:a 112k -movflags +faststart media/film-720p.mp4

# 30MB 以內的 1080p（兩階段編碼）
ffmpeg -i build/film.mp4 -vf "hqdn3d=1.5:1.5:3:3" -c:v libx264 -preset slow -b:v 830k -maxrate 1600k -bufsize 3000k -pass 1 -an -f mp4 /dev/null
ffmpeg -i build/film.mp4 -vf "hqdn3d=1.5:1.5:3:3" -c:v libx264 -preset slow -b:v 830k -maxrate 1600k -bufsize 3000k -pass 2 \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart film_30mb.mp4
```

膠片顆粒會讓壓縮效率變差，所以小檔案版本先用 `hqdn3d` 輕微降噪。

## 4. 大檔案分割與合併

傳輸管道有單檔上限時，可以把母片切成多塊，再在 Windows 上合併：

```bash
# 先轉成「分段式 MP4」：每個片段的位移都相對於自己的 moof，
# 檔頭前面如果被插入其他資料（例如內容來源憑證），也不會讓位移錯亂
ffmpeg -i build/film.mp4 -c copy -movflags +frag_keyframe+empty_moov+default_base_moof film_frag.mp4
split -b 19m -d -a 2 film_frag.mp4 CatTaiwan_master.mp4.part
```

合併用的 `merge_master.bat`：

```bat
@echo off
cd /d "%~dp0"
copy /b CatTaiwan_master.mp4.part00 + CatTaiwan_master.mp4.part01 + ... CatTaiwan_master_1080p.mp4
```

macOS / Linux：`cat CatTaiwan_master.mp4.part* > CatTaiwan_master_1080p.mp4`

合併後可以用 `sha256sum` 和原檔比對雜湊值。

## 5. 放到 GitHub

- 母片太大，不建議放進 git（GitHub 單檔上限 100MB）。可以放在 GitHub Releases 的附件（單檔上限 2GB），或改用 Git LFS。
- `media/film-720p.mp4` 約 12MB，可以直接放進 repo，讓 GitHub Pages 上的 `index.html` 直接播放。
- 開啟 GitHub Pages：Settings → Pages → Build and deployment → Source 選「Deploy from a branch」，分支選 `main`、資料夾 `/ (root)`。repo 根目錄有 `.nojekyll`，檔案會原樣發布。
- Pages 的限制：網站總大小 1GB、每月流量約 100GB（軟性上限）、單檔 100MB。720p 影片約 12MB，沒有問題；每次重新算圖替換影片，git 歷史會多一份，偶爾更新沒關係。
