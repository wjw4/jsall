module.exports = {
	content: ['./index.html', './app.jsx', './src/**/*.{js,ts,jsx,tsx}'],
	corePlugins: {
		preflight: false,
	},
	theme: {
		screens: {
			'2xl': { max: '1535px' },
			xl: { max: '1279px' },
			lg: { max: '1023px' },
			md: { max: '767px' },
			sm: { max: '639px' },
			xs: { max: '424px' },
		},
		extend: {
			colors: {
				default: '#000000d9',
				'light-default': '#0000001a',
				success: '#52c41a',
				'light-success': '#52c41a1a',
				primary: '#1890ff',
				'hover-primary': '#40a9ff',
				'light-primary': '#1890ff1a',
				warning: '#faad14',
				'light-warning': '#faad141a',
				danger: '#ff4d4f',
				'light-danger': '#ff4d4f1a',
				secondary: '#00000073',
				disabled: '#00000040',
				'ant-border': 'rgba(0, 0, 0, 0.06)',
			},
			borderWidth: {
				1: '1px',
			},
			width: {
				fit: 'fit-content',
			},
			maxWidth: {
				'side-menu': '256px',
				// 'screen-2xl': '1536px',
				// 'screen-xl': '1280px',
				// 'screen-lg': '1024px',
				'screen-md': '768px',
				// 'screen-sm': '640px',
				// 'screen-xs': '425px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
