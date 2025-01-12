import { DatePicker } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { mtime } from '@yoimu/common-lib'
import { createClassName } from '@yoimu/web-lib'

const { RangePicker } = DatePicker
export const QueryPresetRangePicker = ({
	className,
	value: propValue,
	onChange: onPropChange,
	limitRangeKeys,
	formatType,
	...args
}) => {
	const [value, setValue] = useState(propValue)
	const momentValue = useMemo(
		() => (value == null ? null : value?.map(e => moment(e || undefined))),
		[value],
	)

	const ranges = useMemo(() => {
		const _ranges = {}
		const _limitRangeKeys = limitRangeKeys
			? limitRangeKeys
			: ['今日', '本周', '本月', '今年']
		_limitRangeKeys.forEach(k => {
			switch (k) {
				case '今日':
					_ranges[k] = mtime.today()
					break
				case '本周':
					_ranges[k] = mtime.thisWeek()
					break
				case '本月':
					_ranges[k] = mtime.thisMonth()
					break
				case '今年':
					_ranges[k] = [
						moment()
							.year(new Date().getFullYear())
							.month(0)
							.date(1)
							.startOf('day'),
						moment().endOf('day'),
					]
					break
			}
		})
		return _ranges
	}, [limitRangeKeys])

	const onChange = (mts, ts) => {
		let newValue = ts

		if (newValue[0] === '') {
			newValue = [null, null]
		} else if (formatType != null) {
			if (Array.isArray(formatType)) {
				newValue = mts.map((e, i) => e.format(formatType[i]))
			} else {
				newValue = mts.map(e => e.format(formatType))
			}
		}

		if (propValue === undefined) {
			setValue(newValue)
		}
		onPropChange?.(newValue)
	}

	useEffect(() => {
		setValue(propValue)
	}, [propValue])

	return (
		<RangePicker
			className={createClassName({
				[className]: className != null,
			})}
			ranges={ranges}
			value={momentValue}
			onChange={onChange}
			{...args}
		/>
	)
}
