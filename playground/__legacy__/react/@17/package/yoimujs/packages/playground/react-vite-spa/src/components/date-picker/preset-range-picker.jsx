import { DatePicker } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { mtime } from '@yoimu/common-lib'
import { createClassName } from '@yoimu/web-lib'

const { RangePicker } = DatePicker
export const PresetRangePicker = ({
	className,
	defaultValue,
	value: propValue,
	onChange: onPropChange,
	limitRangeKeys,
	...args
}) => {
	const [value, setValue] = useState(propValue || defaultValue || null)

	const onChange = (mts, ts) => {
		if (propValue === undefined) {
			setValue(mts)
		}
		onPropChange?.(mts, ts)
	}

	const ranges = useMemo(() => {
		const _ranges = {}
		const _limitRangeKeys = limitRangeKeys
			? limitRangeKeys
			: ['今天', '昨天', '過去七天', '上個月', '本月']
		_limitRangeKeys.forEach(k => {
			switch (k) {
				case '今天':
					_ranges[k] = mtime.today()
					break
				case '昨天':
					_ranges[k] = mtime.yesterday()
					break
				case '過去七天':
					_ranges[k] = mtime.pastWeek()
					break
				case '上個月':
					_ranges[k] = mtime.pastMonth()
					break
				case '本月':
					_ranges[k] = mtime.thisMonth()
					break
			}
		})
		return _ranges
	}, [limitRangeKeys])

	useEffect(() => {
		setValue(propValue)
	}, [propValue])

	return (
		<RangePicker
			className={createClassName({
				[className]: className != null,
			})}
			ranges={ranges}
			value={value}
			onChange={onChange}
			{...args}
		/>
	)
}
