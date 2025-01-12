import axios, { AxiosInstance } from 'axios'

// config 帶入 key-value 用
export const NO_AUTH = 0 // header 不會傳 auth 出去
export const NO_ERROR_MESSAGE = 1 // api 返回報錯不會自動跳錯誤訊息窗

/**
 * @return {{instance: AxiosInstance}}
 */
export const createHttp = () => ({
	instance: axios.create({
		baseURL: import.meta.env.VITE_API_BASE_URL,
	}),
})
