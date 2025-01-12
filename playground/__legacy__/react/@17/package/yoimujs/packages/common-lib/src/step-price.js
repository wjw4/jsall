export const stepPrice = (() => {
	const stepRegs = {}
	const createStepReg = step => {
		const sp = Array.from(new Array(step), (_, i) => i).reduce(
			p => p + '\\d',
			'',
		)
		stepRegs[step] = new RegExp(`(\\d)(?=(${sp})+(?!\\d))`, 'g')
		return stepRegs[step]
	}
	return (price, step = 3) => {
		let _price = price

		if (typeof price === 'number') _price = String(price)

		if (typeof _price === 'string') {
			const priceReg = stepRegs[step] || createStepReg(step)
			let sptPrices = []
			if (_price.includes('.')) {
				sptPrices = _price.split('.')
			}
			if (sptPrices.length) {
				_price = sptPrices[0].replace(priceReg, '$1,') + '.' + sptPrices[1]
			} else {
				_price = _price.replace(priceReg, '$1,')
			}
		}
		return _price
	}
})()
