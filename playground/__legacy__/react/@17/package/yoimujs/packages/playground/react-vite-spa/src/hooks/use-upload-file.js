import { useCallback } from 'react'
import { message } from 'antd'
import { useHttp } from '@/core/hooks/http/use-http'

export const useUploadFile = () => {
	const http = useHttp()

	const upload = useCallback(
		async file => {
			const formData = new FormData()
			formData.append('file', file)

			const { data } = await http.file.upload(formData)
			if (data.success) {
				message.success('上傳成功')
				return { success: true, id: data.data.id, name: file.name }
			}
			return { success: false, id: null, name: file.name }
		},
		[http],
	)

	return {
		upload,
	}
}
