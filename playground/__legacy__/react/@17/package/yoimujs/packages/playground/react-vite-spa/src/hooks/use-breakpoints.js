import { createBreakpoints } from '@yoimu/react-web-lib'

export { useBreakpoints, breakScreens }

const breakScreens = {
	'2xl': 1535,
	xl: 1279,
	lg: 1023,
	md: 767,
	sm: 639,
	xs: 424,
}
const { useBreakpoints } = createBreakpoints(breakScreens)
