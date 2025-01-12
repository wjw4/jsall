import { useEffect } from 'react'
import { useSafeState } from '@yoimu/react-common-lib'

export const useFetchSimpleList = (
	httpFunc,
	params,
	method = 'get',
	checkParamsExists = false,
) => {
	const [list, setList] = useSafeState([])

	useEffect(() => {
		if (checkParamsExists && params == null) return
		;(async () => {
			const { data } = await httpFunc(
				params ? (method === 'get' ? { params } : params) : undefined,
			)
			if (data.success) {
				setList(data.data)
			}
		})()
	}, [params])

	return [list, setList]
}
