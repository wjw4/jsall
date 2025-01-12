import { useLocalStorageState } from '@yoimu/react-web-lib'
import { createProvider, useSafeState } from '@yoimu/react-common-lib'
import { Modal } from 'antd'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const service = () => {
	const history = useHistory()
	const [menuCollapsed, setMenuCollapsed] = useLocalStorageState(
		`${import.meta.env.VITE_PROJECT_NAME}_menu-collapsed`,
		false,
	)
	const [sideSelectedKeys, setSideSelectedKeys] = useSafeState([])
	const [checkEditorLeave, setCheckEditorLeave] = useSafeState(false)

	const confirmRouteLeave = useCallback(
		pathname => () => {
			if (!checkEditorLeave) return

			Modal.confirm({
				title: '尚未進行儲存，確認離開本頁面嗎？',
				okText: '是',
				cancelText: '否',
				onOk() {
					history.push(pathname)
				},
			})
		},
		[checkEditorLeave],
	)

	return {
		menuCollapsed,
		setMenuCollapsed,
		sideSelectedKeys,
		setSideSelectedKeys,
	}
}

export const { Provider: LayoutProvider, inject: useLayout } =
	createProvider(service)
