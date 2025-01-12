export const mergeWords = (...conditionTextArr) => {
	if (!conditionTextArr) return ''

	let resultWord = ''
	let first = true
	for (let i = 0; i < conditionTextArr.length; i++) {
		const e = conditionTextArr[i]
		if (e) {
			if (first) {
				first = false
				resultWord += e
			} else {
				resultWord += ' ' + e
			}
		}
	}
	return resultWord
}
