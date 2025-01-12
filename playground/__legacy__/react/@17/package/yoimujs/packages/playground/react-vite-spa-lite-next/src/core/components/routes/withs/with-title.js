import { useTitle } from '@yoimu/react-web-lib'

export const withTitle = title => () => {
	useTitle(`${title} | ${import.meta.env.VITE_COMMON_APP_TITLE}`)
}
