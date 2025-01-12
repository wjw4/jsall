import { DatePicker } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { createClassName } from '@yoimu/web-lib'
import moment from 'moment'

const MonthExtraFooter = ({ onChange }) => {
	return (
		<div className={'flex items-center justify-between'}>
			<span
				className="text-primary cursor-pointer"
				onClick={() => onChange?.(null)}
			>
				清除
			</span>
			<span
				className="text-primary cursor-pointer"
				onClick={() => onChange?.(moment())}
			>
				本月
			</span>
		</div>
	)
}

export const QueryYearMonthPicker = ({
	className: propClassName,
	value: propValue,
	onChange: onPropChange,
}) => {
	const className = useMemo(
		() =>
			createClassName({
				[propClassName]: propClassName != null,
			}),
		[propClassName],
	)
	const [value, setValue] = useState(null)
	const momentDate = useMemo(() => {
		if (!value) return null
		if (!value.year || !value.month) return null
		return moment(`${value.year}-${value.month}`)
	}, [value])

	const onChangeValue = v => {
		if (v) {
			const newValue = { year: v.year(), month: v.month() + 1 }
			setValue(newValue)
			onPropChange?.(newValue)
		} else {
			setValue(null)
			onPropChange?.({ year: null, month: null })
		}
	}

	useEffect(() => setValue(propValue), [propValue])

	return (
		<DatePicker.MonthPicker
			className={className}
			placeholder={'----年--月'}
			value={momentDate}
			onChange={onChangeValue}
			renderExtraFooter={() => <MonthExtraFooter onChange={onChangeValue} />}
		/>
	)
}
