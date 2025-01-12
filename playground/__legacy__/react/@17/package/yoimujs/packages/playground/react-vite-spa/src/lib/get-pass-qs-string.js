export const getPassQsString = (qs, excludeKeys = []) => {
	const excludeMap = {}
	excludeKeys.forEach(k => {
		excludeMap[k] = true
	})

	let prefix = '?'
	let resultString = ''
	for (const k in qs) {
		if (excludeMap[k]) continue

		const e = qs[k]
		if (e != null) {
			resultString += `${prefix}${k}=${e}`
			if (prefix === '?') {
				prefix = '&'
			}
		}
	}

	return resultString
}
