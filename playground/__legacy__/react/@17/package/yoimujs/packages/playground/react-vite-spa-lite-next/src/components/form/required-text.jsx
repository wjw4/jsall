export const RequiredText = ({ className, children, required = true }) => {
	return (
		<div className={className ? ' ' + className : ''}>
			{required ? <span className={`mr-1 text-danger`}>*</span> : null}
			{children}
		</div>
	)
}
