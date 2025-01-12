export const insertAfter = (newNode, existingNode) => {
	const parent = existingNode.parentNode

	if (parent.lastChild === existingNode) {
		parent.append(newNode)
	} else {
		parent.insertBefore(newNode, existingNode.nextSibling)
	}
}
