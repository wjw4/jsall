const fs = require('fs')

const projectRoot = process.cwd()
const changeFilesPath = `${projectRoot}/build-script/change-files`

const changeRootHtml = ({ mode }) => {
	if (mode === 'master') {
		console.log('master: 開始轉換 index.html 內容')
		fs.writeFileSync(
			`${projectRoot}/index.html`,
			fs.readFileSync(`${changeFilesPath}/index.master.html`),
		)
		console.log('master: 轉換 index.html 內容完畢')
	}
}

module.exports = { changeRootHtml }
