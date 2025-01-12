const { exec } = require('child_process')
const fs = require('fs')
const moment = require('moment')
const getCommandArgs = require('./lib/get-command-args')

const defaultArgs = {
	appVersion: '最新', // string 版號名稱
	mode: '', // string build 指令 : 後的名稱
	packageManager: 'npm', // npm | yarn | pnpm 包管理器
	appVersionPrefixRemoveRegExp: null, // string? 要移除的前綴正則
}
const { appVersion, mode, packageManager, appVersionPrefixRemoveRegExp } =
	getCommandArgs(defaultArgs)

let newAppVersion =
	appVersionPrefixRemoveRegExp != null
		? (appVersion || '').replace(new RegExp(appVersionPrefixRemoveRegExp), '')
		: appVersion

const envFileName = '.env'
const envFile = fs.readFileSync(envFileName)
const envFileString = envFile.toString()
const newEnvFileString = envFileString.replace(
	/VITE_APP_VERSION=.*/,
	`VITE_APP_VERSION=${moment().format('YY.MM.DD.')}${newAppVersion}`,
)

fs.writeFileSync(envFileName, newEnvFileString)

const build = exec(`${packageManager} run build${mode ? `:${mode}` : ''}`)
build.stdout.on('data', data => console.log(data))
build.stderr.on('data', data => console.error(data))
build.on('close', code => console.log(`child process exited with code ${code}`))
