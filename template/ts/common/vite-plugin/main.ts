import { type Plugin } from 'vite'

export type ModuleOptions = {}

const PLUGIN_NAME = 'plugin-name'
const FULL_PLUGIN_NAME = `vite-plugin-${PLUGIN_NAME}`
const V_MODULE_NAME = `~${PLUGIN_NAME}`
const V_MODULE_ID = `@@${V_MODULE_NAME}`

export function MODULE_NAME(options?: ModuleOptions): any {
	const _options = options || {}

	const plugin: Plugin = {
		name: FULL_PLUGIN_NAME,
		enforce: 'pre',
		config() {},
		resolveId(id) {
			if (id === V_MODULE_NAME) {
				return V_MODULE_ID
			}
		},
		load(id) {
			if (id === V_MODULE_ID) {
				return `console.log(${PLUGIN_NAME})`
			}
		},
	}

	return plugin
}
