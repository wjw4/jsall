import { useState } from 'react'
import { useSafeCallback } from './use-safe-callback'

export const useSafeState = initialValue => {
	const [state, setState] = useState(initialValue)
	const updateState = useSafeCallback(setState)

	return [state, updateState]
}
