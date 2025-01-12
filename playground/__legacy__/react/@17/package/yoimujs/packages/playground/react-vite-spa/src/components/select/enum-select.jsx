import { Select } from 'antd'

export const EnumSelect = ({
	Enum,
	all = false,
	label,
	allValue = null,
	className,
	onChange,
	value,
	optionFormat,
	disabled = false,
	filterOption,
	placeholder,
	allowClear,
}) => {
	return (
		<Select
			className={className}
			value={value}
			onChange={onChange}
			disabled={disabled}
			placeholder={placeholder}
			allowClear={allowClear}
		>
			{all ? <Select.Option value={allValue}>全部{label}</Select.Option> : null}
			{Enum.map((e, k, i) => {
				const hasElement =
					typeof filterOption === 'function' ? filterOption(e, k, i) : true

				return hasElement ? (
					<Select.Option key={e} value={e}>
						{optionFormat ? optionFormat(e) : Enum.t(e)}
					</Select.Option>
				) : null
			})}
		</Select>
	)
}
