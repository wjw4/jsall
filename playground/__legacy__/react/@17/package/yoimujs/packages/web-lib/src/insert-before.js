export const insertBefore = (newNode, existingNode) => {
	const parent = existingNode.parentNode

	if (parent.firstChild === existingNode) {
		parent.prepend(newNode)
	} else {
		parent.insertBefore(newNode, existingNode)
	}
}
