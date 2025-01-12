import { useCallback } from 'react'
import { message } from 'antd'
import { downloadBlob } from '@yoimu/web-lib'

export const useExportFile = () => {
	const exportExcel = useCallback(
		async (httpFunc, filename, successMessage, extension = 'xlsx') => {
			const res = await httpFunc()
			if (res.status === 200) {
				message.success(successMessage)
				downloadBlob(res.data, filename, extension)
			}
		},
		[],
	)

	return [exportExcel]
}
