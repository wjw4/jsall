import readline from 'readline'

// 攔截未捕獲同步異常
process.on('uncaughtException', (error) => {
  console.error(`捕獲未捕獲異常：${error.message}`);
  console.error(error);
  lockCmd()
});

// 攔截未處理的 Promise 拋出的錯誤
process.on('unhandledRejection', (reason) => {
  console.error(`捕獲未處理的 Promise 錯誤：${reason}`);
  lockCmd()
});

// 鎖住命令行的方法
function lockCmd () {
  console.log('檢測到異常，程序將保持掛起狀態。按 Ctrl+C 退出。');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // 保持偵聽，直到手動結束應用
  rl.question('', () => {
    rl.close();
  });
}
