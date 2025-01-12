import { useMemo } from 'react'
import { useAuth } from '@/core/hooks/use-auth'
import { useMitt } from '@/core/hooks/use-mitt'
import { AUTHORIZATION_FAILED } from '@/core/mitt-type'
import { message } from 'antd'
import { createHttp, NO_AUTH, NO_ERROR_MESSAGE } from '@/core/hooks/http/lib'
import { injectApis } from '@/core/hooks/http/apis'
import { createProvider } from '@yoimu/react-common-lib'

const service = () => {
	const token = useAuth(e => e.token)
	const { emit } = useMitt()

	return useMemo(() => {
		const { instance } = createHttp()

		instance.interceptors.request.use(
			config => {
				if (config?.NO_AUTH === NO_AUTH) return config

				if (token != null) config.headers['Authorization'] = `Bearer ${token}`

				return config
			},
			error => {
				return Promise.resolve(error)
			},
		)

		instance.interceptors.response.use(
			response => {
				return response
			},
			error => {
				// 統一 try/catch
				const res = error.response
				if (res) {
					if (res.config.NO_ERROR_MESSAGE == null)
						if (res.data && res.data.message) message.error(res.data.message)

					if (res.status === 401 || res.status === 403)
						emit(AUTHORIZATION_FAILED)
				}
				return Promise.resolve(res)
			},
		)

		return { instance, ...injectApis(instance) }
	}, [token])
}

export const { Provider: HttpProvider, inject: useHttp } =
	createProvider(service)

// TODO 缺 401 403 cancel api
