import https from 'node:https';
import fs from 'node:fs';
import {ProgressBar} from "./progress-bar.js";

const downloadURLs = {
  linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
  darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
  win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
  win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
}

https.get(downloadURLs.darwin, response => {
  try {
    fs.lstatSync('./dist')
  } catch {
    fs.mkdirSync('./dist')
  }

  const file = fs.createWriteStream('./dist/chromium.zip');
  response.pipe(file);

  /** @desc 資源總長度 */
  const totalBytes = parseInt(response.headers['content-length']!, 10);
  let value = 0

  const bar = new ProgressBar({
    format: '{bar} {percent}% || {current}/{total}',
    barCompleteChar: '█',
    barCompleteColorHex: '#ff8000',
    barIncompleteChar: '░',
    barIncompleteColorHex: '#ffe4c5',
    hideCursor: true,
  })

  bar.start(totalBytes)

  response.on('data', function (chunk) {
    value += chunk.length
    bar.update(value)
  });
});

/* 基本款
const bar = new ProgressBar({
  format: '{bar} {percent}% || {current}/{total}',
  barCompleteChar: '█',
  barCompleteColorHex: '#ff8000',
  barIncompleteChar: '░',
  barIncompleteColorHex: '#ffe4c5',
  hideCursor: true,
})
bar.start(72)

let value = 0;
const timer = setInterval(function(){
  value++;

  bar.update(value)

  if (value >= bar.getTotal()){
    clearInterval(timer);

    bar.stop();
  }
}, 20);

// write(ansiEscapes.cursorHide)
// write(ansiEscapes.cursorSavePosition)
// write(ansiEscapes.cursorRestorePosition)
// write('█░')
*/



/* 模擬實現的代碼
import { Bar } from 'cli-progress';

const bar = new Bar({
    format: '進度：{bar} | {percentage}% || {value}/{total} || 速度: {speed}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

bar.start(200, 0, {
    speed: "0"
});

let value = 0;

const timer = setInterval(function(){
    value++;

    bar.update(value, {
        speed: (60 * Math.random()).toFixed(2) +  "Mb/s"
    });

    if (value >= bar.getTotal()){
        clearInterval(timer);

        bar.stop();
    }
}, 20);
 */