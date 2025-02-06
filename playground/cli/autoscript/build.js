import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cpuCount = os.cpus().length

const js2ExeNameMap = {
  '0_regex-update-file.js': '0_通用檔案處理',
  '1_change-file-locale.js': '1_切換png目錄檔案語系',
  '2_recur-change-file-locale.js': '2_切換指定目錄下的檔案語系',
  '3_copy-locale-img-files.js': '3_將目錄下的語系圖檔換語系複製一份',
  '4_delete-locale-img-files.js': '4_將目錄下的語系圖檔刪除',
}
const appInput = path.relative(__dirname, path.join(__dirname, 'work/l8/js/app'))
const inputs = fs.readdirSync(appInput)
  .filter(e => !!js2ExeNameMap[e])
  .map(e => path.join(appInput, e))
const distDir = './dist'
const distExeDir = './dist-exe'

if (fs.existsSync(distDir)) fs.rmdirSync(distDir, { recursive: true })
fs.mkdirSync(distDir)

if (fs.existsSync(distExeDir)) fs.rmdirSync(distExeDir, { recursive: true })
fs.mkdirSync(distExeDir)

async function executeWithConcurrency (tasks, concurrency = cpuCount)  {
  const loopCount = Math.ceil(tasks.length / concurrency)

  console.log('tasks:', tasks.length, ',', 'concurrency:', concurrency)

  for (let i = 0; i < loopCount; i++) {
    const executing = []

    for (let j = 0; j < concurrency; j++) {
      const current = j+i*concurrency
      if (current >= tasks.length) break
      executing.push(tasks[current]())
    }

    await Promise.all(executing)
  }
}

executeWithConcurrency(
  inputs.map(task => () => buildTask(task))
)
  .then(() => {
    fs.copyFileSync(
      path.join(__dirname, 'work/l8/_config.txt'),
      path.join(distExeDir, '_config.txt'),
    )
    console.log(`複製配置檔到 ${distExeDir}`)
    console.log('所有任務已完成')
  })
  .catch((err) => console.error('處理過程中發生錯誤:', err));

async function buildTask (input) {
  const inputFilename = path.basename(input)
  const outfileJs = path.join(distDir, inputFilename) // 輸出為同名文件

  await Bun.build({
    entryPoints: [input],
    outdir: distDir,
    minify: true,
    target: 'node',
    format: 'cjs',
  })
  console.log(`已打包成單一JS文件: ${input} -> ${outfileJs}`)

  await new Promise((resolve, reject) => {
    const outfileExe = path.join(
      distExeDir,
      '腳本',
      js2ExeNameMap[inputFilename]
    )

    exec(
      `bun build ${outfileJs} --compile --outfile ${outfileExe} --no-dce`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`生成 ${outfileExe} 時發生錯誤:`, error.message);
          reject(error)
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }

        console.log(`已生成二進制: ${outfileExe}`);
        resolve()
      }
    )
  })
}
