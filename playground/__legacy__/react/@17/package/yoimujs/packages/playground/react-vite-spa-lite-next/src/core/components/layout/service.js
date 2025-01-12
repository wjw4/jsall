import { useLocalStorageState } from '@yoimu/react-web-lib'
import { createProvider, useSafeState } from '@yoimu/react-common-lib'

const service = () => {
	const [menuCollapsed, setMenuCollapsed] = useLocalStorageState(
		`${import.meta.env.VITE_PROJECT_NAME}_menu-collapsed`,
		false,
	)
	const [sideSelectedKeys, setSideSelectedKeys] = useSafeState([])

	return {
		menuCollapsed,
		setMenuCollapsed,
		sideSelectedKeys,
		setSideSelectedKeys,
	}
}

export const { Provider: LayoutProvider, inject: useLayout } =
	createProvider(service)
