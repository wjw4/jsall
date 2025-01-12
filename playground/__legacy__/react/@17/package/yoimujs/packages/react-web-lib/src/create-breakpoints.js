import { useCallback, useEffect, useMemo, useRef } from 'react'

export const createBreakpoints = screens => {
	const _screens = screens

	const useBreakpoints = (range, callback, opts = {}) => {
		const { bootstrap = true, delay = 500 } = opts
		const breakpoints = useMemo(
			() => (typeof range === 'number' ? range : _screens[range] || 0),
			[range],
		)
		let timer = useRef(null)

		const onResize = useCallback(() => {
			if (timer.current != null) clearTimeout(timer.current)
			timer.current = setTimeout(() => {
				timer.current = null
				callback?.(window.innerWidth <= breakpoints)
			}, delay)
		}, [callback, breakpoints])

		useEffect(() => {
			if (bootstrap) {
				callback?.(window.innerWidth <= breakpoints)
			}
		}, [])

		useEffect(() => {
			window.addEventListener('resize', onResize)
			return () => window.removeEventListener('resize', onResize)
		}, [callback, onResize])
	}

	return { useBreakpoints }
}
