// 有傳 total 表示 reverse
export const TableColumnSerialNumber = ({
	index,
	current,
	pageSize,
	total,
}) => {
	const currentIndex = (current - 1) * pageSize + index
	return total == null ? currentIndex + 1 : total - currentIndex
}
