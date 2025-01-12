const acorn = require('acorn')
const fs = require('fs')
const { declareEnum } = require('@yoimu/common-lib')

const acornConfig = { ecmaVersion: 6, sourceType: 'module' }
const appleEnum = fs.readFileSync('./apple.enum.js').toString()
const fileParse = acorn.parse(appleEnum, acornConfig)

const allEnums = {}

fileParse.body?.forEach(e => {
	const _e = e.type === 'ExportNamedDeclaration' ? e.declaration : e
	if (_e.type !== 'VariableDeclaration') return
	for (let i = 0; i < _e.declarations; i++) {
		if (f.init?.callee?.name !== 'declareEnum') return

		const { name } = f.id
		const { arguments: args } = f.init
		if (!Array.isArray(args) || args[0] == null) return
		const { start: argStart, end: argEnd } = args[0]

		const [enums] = args
		if (!Array.isArray(enums.properties) || enums.properties == null) return

		const { properties } = enums
		const aotEnums = { __aot: true }
		properties.forEach(h => {
			const { name: keyName } = h.key
			const { value } = h
			const { type, elements, value: valueVal } = value
			switch (type) {
				case 'ArrayExpression':
					aotEnums[keyName] = elements.map(j => j.value)
					break
				case 'Literal':
					aotEnums[keyName] = valueVal
			}
		})
		allEnums[name] = declareEnum(aotEnums)
		fs.writeFileSync('./apple.enum.js')
		console.log(appleEnum.substring(argStart, argEnd))
	}
})

console.log(fileParse)
console.log(allEnums)
