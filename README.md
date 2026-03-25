# Playwright repro

1. `npm ci` (node version shouldn't matter, I reproduced with v22.19.0)
2. `node reproduce.js`
3. The process should hang, and there should be a ffmpeg child process of the node process running

It'll look something like this:

```
$ pstree 
# ...other processes omitted...
 \-+= 97910 sufian node reproduce.js
   \--= 97969 sufian /Users/sufian/Library/Caches/ms-playwright/ffmpeg-1011/ffmpeg-mac -loglevel error -f image2pipe -avioflags direct -fpsprobesize 0 -probesize 32 -analyzeduration 0 -c:v mjpeg -i pipe:0 -y -an -r 25 -c:v vp8 -qmin 0 -qmax 50 -crf 8 -deadline realtime -speed 8 -b:v 1M -threads 1 -vf pad=390:844:0:0:gray,crop=390:844:0:0 /Users/sufian/dev/playwright-ffmpeg-bug/output/6dbb92459ea57d1b74cc292e41fa2348.webm
```
