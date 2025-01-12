import { useMemo, useState } from 'react'

export const useMethods = (initialValue, methods) => {
	const [state, setState] = useState(initialValue)
	const bindMethods = useMemo(
		() =>
			Object.entries(methods).reduce(
				(p, [name, fn]) => (
					(p[name] = (...args) => setState(state => fn(state, ...args))), p
				),
				{},
			),
		[methods],
	)
	return [state, bindMethods]
}
