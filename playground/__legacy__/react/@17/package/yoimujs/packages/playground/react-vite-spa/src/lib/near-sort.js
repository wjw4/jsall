export const nearSort = (current, direction, list) => {
	let next = -1
	let newList = [...list]
	if (direction === 'up') {
		next = current - 1
		newList.splice(current - 1, 2, newList[current], newList[current - 1])
	} else {
		next = current + 1
		newList.splice(current, 2, newList[current + 1], newList[current])
	}
	return [newList, next]
}
