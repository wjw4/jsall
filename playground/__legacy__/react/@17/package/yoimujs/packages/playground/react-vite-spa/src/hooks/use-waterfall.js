import { useCallback, useEffect, useRef } from 'react'
import { useCheckInjectReturn, useSafeState } from '@yoimu/react-common-lib'
import produce from 'immer'

/**
 * 瀑布流獲取數據
 * @type {
 *   (
 *   	getList: (params: { pageSize: number, pageNumber: number }) => Promise<void>,
 *   	options: {
 *   		createdRun?: boolean,
 *   		size?: number,
 *   		range?: number,
 *   		el?: window | HTMLElement,
 *   		disabled?: boolean
 *   	}) => {
 *     list: any[],
 *     setList: (getter: (e: any[]) => any[] | any[]) => void,
 *     loading: boolean,
 *     start: () => void,
 *     end: () => void,
 *     run: (reset: boolean) => Promise<void>,
 *   }
 * }
 */
export const useWaterfall = (getList, options = {}) => {
	const {
		createdRun = true,
		size = 18,
		range = 0.95,
		el = window,
		disabled = false,
	} = options
	const [isEnd, setIsEnd] = useSafeState(false)
	const [list, setList] = useSafeState([])
	const [loading, setLoading] = useSafeState(false)
	const loadingRef = useRef(false)
	const pagination = useRef({
		total: 0,
		size,
		number: 0,
	})
	const start = () => setIsEnd(false)
	const end = () => setIsEnd(true)

	const run = useCallback(
		async (reset = false) => {
			loadingRef.current = true
			if (checkInjectRef.current.loading) {
				setLoading(true)
			}
			setIsEnd(true)
			if (reset) pagination.current.number = 0
			const { status, data } = await getList(
				{
					pageSize: size,
					pageNumber: pagination.current.number,
				},
				reset,
			)
			pagination.current.total = data.totalElements ?? 0
			if (status === 200) {
				if (reset) {
					setList(data.content)
				} else {
					setList(
						produce(e => {
							if (data.content != null) {
								data.content.forEach(f => {
									e.push(f)
								})
							}
						}),
					)
				}
				if (
					!(
						pagination.current.number * pagination.current.size >=
						pagination.current.total
					)
				) {
					pagination.current.number = pagination.current.number + 1
					setIsEnd(false)
				}
			} else {
				pagination.current.number = 0
			}
			loadingRef.current = false
			if (checkInjectRef.current.loading) {
				setLoading(false)
			}
		},
		[getList],
	)

	const _onScroll = useCallback(async () => {
		const { pageYOffset, innerHeight, scrollTop, clientHeight } = el
		const { scrollHeight } = el instanceof Window ? document.body : el
		const yOffset = pageYOffset ?? scrollTop
		const elHeight = innerHeight ?? clientHeight
		const st = yOffset + elHeight
		const r = st / scrollHeight
		if (!loadingRef.current && !disabled && r > range) {
			run()
		}
	}, [getList, range])

	useEffect(() => {
		if (createdRun && !disabled) run()
	}, [])

	useEffect(() => {
		if (getList != null && !isEnd && el != null) {
			el.addEventListener('scroll', _onScroll)
			return () => el.removeEventListener('scroll', _onScroll)
		}
	}, [getList, _onScroll, isEnd, el])

	const [returnValue, checkInjectRef] = useCheckInjectReturn(
		{ list, setList, loading, start, end, run },
		['list', 'loading'],
	)

	return returnValue
}
