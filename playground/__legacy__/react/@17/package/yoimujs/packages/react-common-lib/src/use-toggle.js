import { useCallback, useState } from 'react'

export const useToggle = (defaultValue = false) => {
	const [value, setValue] = useState(defaultValue)

	const toggleValue = useCallback(() => setValue(e => !e), [setValue])

	return [value, toggleValue, setValue]
}
