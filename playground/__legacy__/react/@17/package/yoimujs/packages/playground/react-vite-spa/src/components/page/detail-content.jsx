import { Divider } from 'antd'
import { useMemo } from 'react'

export const DetailContent = ({ className: pclassName, children }) => {
	const className = useMemo(
		() => (pclassName ? pclassName : undefined),
		[pclassName],
	)

	return (
		<div className={className}>
			<Divider />
			{children}
		</div>
	)
}
