import { DatePicker } from 'antd'
import { useMemo, useState } from 'react'
import moment from 'moment'
import { createClassName } from '@yoimu/web-lib'

export const QueryDatePicker = ({
	className: propClassName,
	value: propValue,
	onChange: onPropChange,
	...propDatePickerProps
}) => {
	const className = useMemo(
		() =>
			createClassName({
				[propClassName]: propClassName != null,
			}),
		[propClassName],
	)
	const datePickerProps = useMemo(
		() => propDatePickerProps || {},
		[propDatePickerProps],
	)

	const [value, setValue] = useState(propValue)
	const _value = useMemo(
		() => (typeof value === 'string' ? moment(value) : null),
		[value],
	)

	const onChange = (_, strDate) => {
		setValue(strDate)
		onPropChange?.(strDate)
	}

	return (
		<DatePicker
			{...datePickerProps}
			className={className}
			value={_value}
			onChange={onChange}
		/>
	)
}
