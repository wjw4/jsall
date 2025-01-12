import { useCallback, useEffect, useRef } from 'react'

export const useSafeCallback = updater => {
	const isMounted = useRef(true)

	const updateState = useCallback(
		callback => {
			if (isMounted.current) {
				updater(callback)
			}
		},
		[updater],
	)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return updateState
}
