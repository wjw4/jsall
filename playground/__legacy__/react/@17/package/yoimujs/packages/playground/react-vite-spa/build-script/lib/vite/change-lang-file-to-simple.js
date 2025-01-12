const { toSimple } = require('@yoimu/common-lib')
const fs = require('fs')
const path = require('path')

const LOCALE_FILE_PATH = '../../../src/core/i18n'

const changeLangFileToSimple = ({ mode = 'development' } = {}) => {
	if (mode !== 'development') {
		console.log('寫入簡體語系...')
		const twFilePath = path.resolve(__dirname, `${LOCALE_FILE_PATH}/zh_TW.json`)
		const cnFilePath = path.resolve(__dirname, `${LOCALE_FILE_PATH}/zh_CN.json`)
		const twLangStr = fs.readFileSync(twFilePath).toString()
		fs.writeFileSync(cnFilePath, toSimple(twLangStr))
		console.log('寫入簡體語系完成')
	}
}

module.exports = { changeLangFileToSimple }
