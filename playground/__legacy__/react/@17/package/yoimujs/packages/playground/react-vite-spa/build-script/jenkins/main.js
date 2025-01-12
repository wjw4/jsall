const { execSync } = require('child_process')
const getCommandArgs = require('../lib/get-command-args')

const defaultArgs = {
	branch: 'qa',
	gitTag: 'nil',
	mode: '',
	packageManager: 'npm',
	appVersionPrefixRemoveRegExp: null,
}
const { branch, mode, gitTag, packageManager, appVersionPrefixRemoveRegExp } =
	getCommandArgs(defaultArgs)
let chooseGitTag = gitTag

console.log(`jenkins git parameter git_tag: ${chooseGitTag}`)

if (chooseGitTag === 'nil') {
	latestTagBuffer = execSync('git describe --abbrev=0 --tags')
	chooseGitTag = latestTagBuffer.toString().trim()
}

console.log(`版號獲取成功: ${chooseGitTag}, 開始拉取並切換代碼源`)

execSync(`git pull origin ${branch}`, { stdio: 'inherit' })
execSync(`git checkout ${chooseGitTag}`, { stdio: 'inherit' })

console.log(`${chooseGitTag} tag 分支切換完成, 開始安裝依賴`)

execSync('npm install', { stdio: 'inherit' })

console.log(`安裝依賴完成，開始打包專案`)

execSync(
	`node build-script/build.js --appVersion=${chooseGitTag} --mode=${mode} --packageManager=${packageManager} --appVersionPrefixRemoveRegExp=${appVersionPrefixRemoveRegExp}`,
	{ stdio: 'inherit' },
)

console.log(`打包完成，將資源壓縮送至 server`)

execSync('cd dist && tar zvcf web.tar.gz *', { stdio: 'inherit' })
