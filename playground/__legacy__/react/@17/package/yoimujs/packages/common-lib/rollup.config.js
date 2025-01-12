import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const projectPath = `${process.cwd()}/packages/common-lib`

export default {
	input: `${projectPath}/index.js`,
	output: [
		{
			file: `${projectPath}/${pkg.main}`,
			format: 'cjs',
		},
		{
			file: `${projectPath}/${pkg.module}`,
			format: 'esm',
		},
	],
	plugins: [commonjs(), resolve()],
}
