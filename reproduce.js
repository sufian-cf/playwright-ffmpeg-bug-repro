const { chromium } = require('playwright');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function main() {
  const videoDir = path.join(__dirname, 'output');
  fs.mkdirSync(videoDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    isMobile: true,
    recordVideo: {
      dir: videoDir,
      size: { width: 390, height: 844 },
    },
  });

  console.log('Opening first page...');
  const page = await context.newPage();
  await page.goto('https://example.com');
  await page.close();
  console.log('First page closed');

  console.log('Opening second page...');
  const page2 = await context.newPage();
  await page2.goto('https://example.com');
  await page2.close();
  console.log('Second page closed');

  console.log('Closing context...');
  await context.close();
  console.log('Closing browser...');
  await browser.close();
  console.log('All cleaned up, process should exit -- if this hangs, the bug is present and ffmpeg is orphaned.');
}

main().catch(err => {
  console.error('[reproduce] Error:', err.message);
  process.exit(1);
});
