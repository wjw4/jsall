import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
import reactSvgPlugin from 'vite-plugin-react-svg'
const path = require('path')

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		plugins: [
			react(),
			reactSvgPlugin({
				defaultExport: 'component',
				expandProps: 'end',
			}),
			styleImport({
				resolves: [AntdResolve()],
			}),
			createHtmlPlugin({
				minify: true,
				inject: {
					data: {
						title: process.env.VITE_COMMON_APP_TITLE,
					},
				},
			}),
		],
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		server: {
			port: process.env.VITE_PORT,
			proxy: {
				[process.env.VITE_API_BASE_URL]: {
					target: process.env.VITE_API_URL,
					changeOrigin: true,
				},
			},
		},
	})
}
