export const FormItemValue = ({ children, value }) => {
	return <>{children ? children(value) : value}</>
}
