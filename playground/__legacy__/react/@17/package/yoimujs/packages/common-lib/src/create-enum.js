export const createEnum = obj => {
	const translation = {}
	const reverseEnum = {}
	const $enum = {}
	const keys = []
	const t = val => translation[val]
	const key = val => reverseEnum[val]
	const map = callback =>
		callback ? keys.map((k, i) => callback($enum[k], k, i)) : keys
	const reduce = (callback, initialValue) => {
		let previous = initialValue
		keys.map((k, i) => {
			previous = callback(previous, $enum[k], k, i)
		})
		return previous
	}

	function addEnum(key, val) {
		if (Array.isArray(val)) {
			const [v, t] = val
			translation[v] = t
			$enum[key] = v
			reverseEnum[v] = key
		} else {
			$enum[key] = val
			reverseEnum[val] = key
		}
		keys.push(key)
	}

	for (const k in obj) {
		addEnum(k, obj[k])
	}

	return { ...$enum, t, key, keys, map, reduce }
}
