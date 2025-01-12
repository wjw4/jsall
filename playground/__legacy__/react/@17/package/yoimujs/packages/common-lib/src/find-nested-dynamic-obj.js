export const findNestedDynamicObj = (obj, key) => {
	if (typeof obj !== 'object') {
		console.warn(`[findNestedDynamicObj::warn] obj 請傳 {}`)
		return key
	}
	const _key = typeof key === 'string' ? key : String(key)
	const ks = _key.split('.')
	let el = obj[_key] || key

	if (typeof el !== 'object' && ks.length < 2) {
		return el
	}

	el = obj[ks[0]]
	for (let i = 1; i < ks.length; i++) {
		if (el == null) {
			break
		}

		const k = ks[i]
		el = el[k] || key

		if (typeof el !== 'object') {
			if (i !== ks.length - 1) {
				el = key
			}
			break
		}
	}

	return el || key
}
