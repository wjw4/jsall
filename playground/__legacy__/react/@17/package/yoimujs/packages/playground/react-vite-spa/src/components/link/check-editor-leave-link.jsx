import { Link } from 'react-router-dom'
import { useLayout } from '@/core/components/layout/service'
import { createClassName } from '@yoimu/web-lib'
import { useMemo } from 'react'

export const CheckEditorLeaveLink = ({
	children,
	to,
	className,
	onClick: ponClick,
	...linkProps
}) => {
	const checkEditorLeave = useLayout(e => e.checkEditorLeave)
	const confirmRouteLeave = useLayout(e => e.confirmRouteLeave)
	const spanClassName = useMemo(
		() =>
			createClassName({
				'cursor-pointer': true,
				[className]: className != null,
			}),
		[className],
	)
	const onClick = () => {
		if (checkEditorLeave) {
			confirmRouteLeave(to)
		}
		ponClick?.()
	}

	return checkEditorLeave ? (
		<span className={spanClassName} onClick={onClick}>
			{children}
		</span>
	) : (
		<Link to={to} className={className} onClick={onClick} {...linkProps}>
			{children}
		</Link>
	)
}
