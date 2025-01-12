const minimist = require('minimist')

/**
 * @return {<T extends object, Args = { [K in keyof T]: string }>(defaultArgs: Args) => Args}
 */
const getCommandArgs = defaultArgs => {
	const { _, ...args } = minimist(process.argv.slice(2))

	for (let k in defaultArgs) {
		if (args[k] == null) {
			args[k] = defaultArgs[k]
		}
	}

	console.log('command args:')
	console.log(args)

	return args
}

module.exports = getCommandArgs
