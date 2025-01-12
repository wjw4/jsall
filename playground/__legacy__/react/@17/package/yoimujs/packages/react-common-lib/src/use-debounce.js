import { useEffect } from 'react'

export const useDebounce = (callback, deps, delay = 500) => {
	useEffect(() => {
		const handler = setTimeout(() => callback(), delay)
		return () => clearTimeout(handler)
	}, [...(deps ?? []), delay])
}
