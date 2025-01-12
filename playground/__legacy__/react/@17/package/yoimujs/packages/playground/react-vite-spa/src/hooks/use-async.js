import { useCallback, useState } from 'react'

/**
 * @type {
 *   <T>(promiseFunc: () => Promise<T>, initialValue: any) => [any, boolean, () => Promise<void>]
 * }
 */
export const useAsync = (promiseFunc, initialValue = []) => {
	const [state, setState] = useState(initialValue)
	const [loading, setLoading] = useState(false)
	const run = useCallback(async () => {
		setLoading(true)
		const data = await promiseFunc()
		setLoading(false)
		setState(data)
	}, [promiseFunc])

	return [state, loading, run]
}
