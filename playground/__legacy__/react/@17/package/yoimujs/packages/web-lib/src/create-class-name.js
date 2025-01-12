export const createClassName = (obj, ...classNames) => {
	let className = classNames.join(' ')
	for (const k in obj) {
		if (obj[k] === true) {
			className += ' ' + k
		}
	}
	return className
}
