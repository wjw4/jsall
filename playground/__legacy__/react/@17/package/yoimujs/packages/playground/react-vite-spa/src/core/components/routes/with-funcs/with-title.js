import { useTitle } from '@yoimu/react-web-lib'

export const withTitle = title => () => {
	useTitle(title)
}
