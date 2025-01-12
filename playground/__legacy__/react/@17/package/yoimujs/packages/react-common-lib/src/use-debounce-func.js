import { useCallback, useRef } from 'react'

export const useDebounceFunc = (callback, delay = 500) => {
	const timeout = useRef(null)

	const _clearTimeout = useCallback(() => {
		if (timeout.current != null) {
			clearTimeout(timeout.current)
		}
	}, [])

	const debounceFunc = useCallback(
		(...args) => {
			_clearTimeout()
			timeout.current = setTimeout(() => {
				callback(...args)
				timeout.current = null
			}, delay)
		},
		[callback, delay, _clearTimeout],
	)

	return [debounceFunc, _clearTimeout]
}
