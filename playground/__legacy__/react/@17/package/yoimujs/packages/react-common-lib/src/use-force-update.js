import { useCallback } from 'react'
import { useSafeState } from './use-safe-state'

export const useForceUpdate = () => {
	const [, setCount] = useSafeState(0)
	return useCallback(() => setCount(e => e + 1), [])
}
