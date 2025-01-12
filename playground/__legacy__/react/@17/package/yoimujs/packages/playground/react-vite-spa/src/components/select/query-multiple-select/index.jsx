import { Select } from 'antd'
import { createClassName } from '@yoimu/web-lib'
import { useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'

export const QueryMultipleSelect = ({
	className: pclassName,
	value: pvalue,
	onChange: ponChange,
	placeholder,
	allowClear,
	valueKey = 'id',
	nameKey = 'name',
	deepKey,
	list: plist,
	...rest
}) => {
	const className = useMemo(() =>
		createClassName(
			{
				[styles.QueryMultipleSelect]: true,
				[pclassName]: pclassName != null,
			},
			[pclassName],
		),
	)

	const [value, setValue] = useState(null)

	const valueList = useMemo(
		() =>
			!value
				? undefined
				: String(value)
						.split(',')
						.map(e => Number(e)),
		[value],
	)

	const list = useMemo(() => {
		if (deepKey == null) {
			return plist
		} else {
			const newList = []
			const deepSetNode = (_list, level) => {
				if (!_list?.length) return
				_list.forEach(e => {
					newList.push({ ...e, __level: level * 4 })
					if (Array.isArray(e[deepKey])) {
						deepSetNode(e[deepKey], level + 1)
					}
				})
			}
			deepSetNode(plist, 0)
			return newList
		}
	}, [plist])

	const onChange = e => {
		if (e != null) {
			const newValue = e.join(',')
			setValue(newValue)
			ponChange?.(newValue)
		} else {
			setValue(null)
			ponChange?.(null)
		}
	}

	useEffect(() => setValue(pvalue), [pvalue])

	return (
		<Select
			className={className}
			placeholder={placeholder}
			value={valueList}
			onChange={onChange}
			mode={'multiple'}
			allowClear={allowClear}
		>
			{list?.map(e => (
				<Select.Option value={e[valueKey]} key={e[valueKey]}>
					{deepKey != null ? (
						<span className={`levelSelectOptionSpan ml-${e.__level}`}>
							{e[nameKey]}
						</span>
					) : (
						e[nameKey]
					)}
				</Select.Option>
			))}
		</Select>
	)
}
