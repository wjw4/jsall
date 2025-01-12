import { Link } from 'react-router-dom'

export const SafeLink = ({
	children,
	to,
	href,
	target,
	className,
	onClick,
	...linkProps
}) => {
	// 優先級 href -> to
	return href != null ? (
		<a
			className={className}
			href={href}
			target={target}
			onClick={onClick}
			{...linkProps}
		>
			{children}
		</a>
	) : to != null ? (
		<Link to={to} className={className} onClick={onClick} {...linkProps}>
			{children}
		</Link>
	) : (
		<span className={className} onClick={onClick}>
			{children}
		</span>
	)
}
