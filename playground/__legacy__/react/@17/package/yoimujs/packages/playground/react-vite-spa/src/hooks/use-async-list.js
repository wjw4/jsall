import { useEffect, useState } from 'react'
import { useQueryString } from '@yoimu/react-web-lib'
import { useAsync } from '@/hooks/use-async'

/**
 * @type {
 *   <T extends Object, K extends keyof T>(httpFunc: (params?: any) => Promise<any>, initQueryString: T) => {
 *     getList: () => Promise<void>,
 *     dataSource: any[],
 *     total: number,
 *     loading: boolean,
 *     queryString: T,
 *     search: T,
 *     onSearch: () => void,
 *     onChangeSearch: (key: K) => (value: T[K]) => void,
 *     onChangeTable: (pagination: { pageSize: number, current: number }) => void,
 *   }
 * }
 */
export const useAsyncList = (httpFunc, initQueryString) => {
	const [queryString, setQueryString] = useQueryString({
		number: 1,
		size: 10,
		...initQueryString,
	})
	const [search, setSearch] = useState({ ...queryString })
	const [[dataSource, total], loading, getList] = useAsync(async () => {
		const { data } = await httpFunc(queryString)
		return [data.data?.content ?? [], data.data?.totalElements ?? 0]
	})
	const onChangeSearch = key => value =>
		setSearch(e => {
			if (Array.isArray(key)) {
				const _e = { ...e }
				key.forEach((k, i) => (_e[k] = value[i]))
				return _e
			} else {
				return { ...e, [key]: value ?? null }
			}
		})
	const onSearch = () => setQueryString({ ...search, number: 1 })
	const onChangeTable = pagination => {
		setQueryString(e => ({
			...e,
			size: pagination.pageSize,
			number: e.size !== pagination.pageSize ? 1 : pagination.current,
		}))
	}

	useEffect(getList, [queryString])

	return {
		getList,
		dataSource,
		total,
		loading,
		queryString,
		search,
		onSearch,
		onChangeSearch,
		onChangeTable,
	}
}
