import { useEffect, useMemo, useRef } from 'react'
import { useInitialRef } from './use-initial-ref'

export const useCheckInjectReturn = (propReturnValue, checkKeys) => {
	const isEndRef = useRef(false)
	const checkRefs = useInitialRef(() =>
		checkKeys.reduce((p, k) => ((p[k] = false), p), {}),
	)
	const returnValue = useMemo(() => {
		if (isEndRef.current === true) return propReturnValue

		const inObject = {}
		for (const k in propReturnValue) {
			const e = propReturnValue[k]
			if (checkRefs.current[k] != null) {
				Object.defineProperty(inObject, k, {
					get() {
						checkRefs.current[k] = true
						return e
					},
				})
				continue
			}
			inObject[k] = e
		}

		return inObject
	}, [propReturnValue])

	useEffect(() => {
		isEndRef.current = true
	}, [])

	return [returnValue, checkRefs]
}
