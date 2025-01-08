import readline from "node:readline";
import ansiEscapes from 'ansi-escapes'

// ansi 指令有哪些可以從這查閱
// https://www2.ccs.neu.edu/research/gpc/VonaUtils/vona/terminal/vtansi.htm

/*
// 比方說這是擦除
console.log('123\u001B[1K456')

console.log(process.stdout.rows, process.stdout.columns)

const repeatCount = process.stdout.rows - 2;
const blank = repeatCount > 0 ? ' \n'.repeat(repeatCount) : '';
console.log(blank);
 */

// 類似 vite 的 cli 光標移動到最上且擦除以下
// 光標移動到第 x, y 0
readline.cursorTo(process.stdout, 0, 0);
// 清除以下的log
readline.clearScreenDown(process.stdout);

/*
**`console.log`**:
  - 用於直接將訊息輸出到終端。
  - 每次都會換行，簡單但缺乏控制細節。
  - 適合一般的訊息輸出，但對於動態修改輸出內容（例如光標移動或清除文字）很有限。

範例：
```javascript
console.log('Hello World');
```


**`process.stdout.write`**:
  - 是一種更底層的操作，比 `console.log` 更靈活。
  - 不會自動換行，適合需要更精細控制的輸出場景。
  - 缺少高階功能（例如光標控制），需要結合 ANSI 字元序列或其他模組（如 `ansiEscapes`）進行更細緻的操控。

範例：
```javascript
process.stdout.write('Hello World');
process.stdout.write(' No newline here.');
```


**`readline` 模組功能比較**:
  - `readline` 模組是專為 CLI 應用設計的，除了支援直接輸出，還支援：
    - 動態操作輸出，例如光標移動 (`cursorTo`) 和內容清除 (`clearScreenDown`)。
    - 讀取用戶輸入（同步或非同步）。
    - 建立互動式問答界面。

  - 與 `console.log`、`process.stdout.write` 相比，`readline` 模組更適合需要操控螢幕輸出的場景，尤其是建立像 CLI 工具或動態 TUI（文本用戶界面）時。

核心方法範例：
```javascript
import readline from 'node:readline';

// 將光標移動到指定座標
readline.cursorTo(process.stdout, 0, 0);

// 清除游標下方所有文字
readline.clearScreenDown(process.stdout);
```

**應用場合比較**

- `console.log`: 適合簡單輸出訊息到終端（例如打印錯誤資訊或結果）。
- `process.stdout.write`: 適合需要更精細輸出控制但不需要光標操控的場合。
- `readline`: 適合建立更複雜的 CLI 工具，例如更新終端顯示內容、建立互動式問答或侦听用户输入。

總結而言，`readline` 提供了一套強大的 API，專注於控制終端輸入輸出，而 `console.log` 與 `process.stdout.write` 則較為基本、有限。
 */