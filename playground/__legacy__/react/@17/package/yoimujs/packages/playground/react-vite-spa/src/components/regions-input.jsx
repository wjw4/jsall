import { RegionSelect } from '@/components/select/region-select'
import { Input } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClassName } from '@yoimu/web-lib'

export const initialRegionsInputValue = ['台北市', '中正區', null]

export const RegionsInput = ({
	className: propClassName,
	value: pvalue,
	onChange: ponChange,
}) => {
	const className = useMemo(
		() =>
			createClassName({
				'flex items-center': true,
				[propClassName]: propClassName != null,
			}),
		[propClassName],
	)

	const [value, setValue] = useState(() => initialRegionsInputValue)

	const onChangeSelect = useCallback(
		e => {
			const newValue = [...e, value[2]]
			setValue(newValue)
			ponChange?.(newValue)
		},
		[value, setValue],
	)

	const onChangeInput = useCallback(
		ev => {
			const newValue = [value[0], value[1], ev.target.value]
			setValue(newValue)
			ponChange?.(newValue)
		},
		[value, setValue],
	)

	useEffect(() => {
		setValue(pvalue || initialRegionsInputValue)
	}, [pvalue])

	return (
		<div className={className}>
			<RegionSelect
				className={'mr-2'}
				value={value.slice(0, 2)}
				onChange={onChangeSelect}
			/>
			<Input value={value[2]} onChange={onChangeInput} />
		</div>
	)
}
