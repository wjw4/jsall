import { useEffect, useState } from 'react'

/**
 * @type {
 *   <T>(props: {
 *     defaultValue: T,
 *     value: T,
 *     onChange?: (e: T, el: any) => void
 *   }) => [value: T, _onChange: (e: T, el: any) => void]
 * }
 */
export const useCommonSelectState = ({
	defaultValue,
	value: propValue,
	onChange,
}) => {
	const [value, setValue] = useState(defaultValue)

	const _onChange = (e, el) => {
		setValue(e)
		onChange?.(e, el)
	}

	useEffect(() => setValue(propValue ?? defaultValue), [propValue])

	return [value, _onChange]
}
