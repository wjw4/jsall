import {ProgressBar} from "./progress-bar.js";

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