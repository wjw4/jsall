import { Select } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { regions } from '@/lib/regions'
import { createClassName } from '@yoimu/web-lib'

export const RegionSelect = ({
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

	const isMutableChangeRef = useRef(false)
	const [value, setValue] = useState(() => [
		regions[0].value,
		regions[0].township[0].value,
	])
	const [regionCurrent, setRegionCurrent] = useState(0)

	const changeValueByPropValue = useCallback(() => {
		if (isMutableChangeRef.current) {
			isMutableChangeRef.current = false
		} else {
			const newValue = []
			const [region, township] = pvalue
			let newRegionCurrent = 0
			if (region != null) {
				const regionCurrent = regions.findIndex(e => e.value === region)
				if (regionCurrent > -1) {
					newRegionCurrent = regionCurrent
					newValue[0] = regions[regionCurrent].value
					const townshipCurrent = regions[regionCurrent].township.findIndex(
						e => e.value === township,
					)
					if (townshipCurrent > -1) {
						newValue[1] = regions[regionCurrent].township[townshipCurrent].value
					} else {
						newValue[1] = regions[regionCurrent].township[0].value
					}
				} else {
					newValue[0] = regions[0].value
					newValue[1] = regions[0].township[0].value
				}
			} else {
				newValue[0] = regions[0].value
				newValue[1] = regions[0].township[0].value
			}
			setRegionCurrent(newRegionCurrent)
			setValue(newValue)
		}
	}, [pvalue, setValue, setRegionCurrent])

	const onChange = useCallback(
		([region, township]) => {
			const [_region] = value
			const newValue = [region || _region]
			if (region != null) {
				const newRegionCurrent = regions.findIndex(e => e.value === region)
				setRegionCurrent(newRegionCurrent)
				newValue[1] = regions[newRegionCurrent].township[0].value
			} else if (township != null) {
				newValue[1] = township
			}
			isMutableChangeRef.current = true
			setValue(newValue)
			ponChange?.(newValue)
		},
		[ponChange, value, setValue, setRegionCurrent],
	)

	useEffect(changeValueByPropValue, [pvalue])

	return useMemo(
		() => (
			<div className={className}>
				<Select
					className={'mr-2'}
					value={value[0]}
					options={regions}
					onChange={e => onChange([e, null])}
				/>
				<Select
					value={value[1]}
					options={regions[regionCurrent].township}
					onChange={e => onChange([null, e])}
				/>
			</div>
		),
		[regions, className, value, regionCurrent, onChange],
	)
}
