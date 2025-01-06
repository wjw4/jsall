import ansiEscapes from 'ansi-escapes'

process.stdout.write(ansiEscapes.cursorSavePosition)
process.stdout.write('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');

setTimeout(() => {
  process.stdout.write(ansiEscapes.cursorRestorePosition)
  process.stdout.write('████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 1000)

setTimeout(() => {
  process.stdout.write(ansiEscapes.cursorRestorePosition)
  process.stdout.write('███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 2000)

setTimeout(() => {
  process.stdout.write(ansiEscapes.cursorRestorePosition)
  process.stdout.write('██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 3000)

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