import React, { useRef } from 'react'

export const useInitialRef = ref => {
	const isInit = useRef(false)

	const init = () => {
		if (isInit.current) return
		isInit.current = true
		if (typeof ref === 'function') {
			return ref()
		} else {
			return ref
		}
	}

	return useRef(init())
}
