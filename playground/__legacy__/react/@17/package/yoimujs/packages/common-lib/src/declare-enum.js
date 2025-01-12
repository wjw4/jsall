/*
  使用範例
  申明：
  值(v) or [值(v), 翻譯(t), 描述(d)]
  declareEnum({ START: [0], END: [1] })
  declareEnum({ START: [0, '開始'], END: [1, '結束'] })
  declareEnum({ START: [0, '開始', 'START'], END: [1, '結束', 'END'] })
 */
export const declareEnum = (obj, typeBindValue) => {
	const keys = []
	let length = 0
	const map = callback => {
		if (!callback) return []

		const list = []
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i]
			list.push(callback(result[k], k, i))
		}
		return list
	}
	const result = { keys, length, map }

	if (typeof obj === 'object') {
		for (const k in obj) {
			const e = obj[k]

			keys.push(k)
			length += 1

			if (Array.isArray(e)) {
				const v = e[0]
				result[k] = v

				for (let i = 1; i < e.length; i++)
					switch (i) {
						case 1:
							if (result.t == null) result.t = {}
							result.t[v] = e[i]
							break
						case 2:
							if (result.d == null) result.d = {}
							result.d[v] = e[i]
							break
					}
			} else {
				result[k] = e
			}
		}
	}

	return result
}
