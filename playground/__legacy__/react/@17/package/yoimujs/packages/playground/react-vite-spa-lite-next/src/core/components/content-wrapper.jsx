import { useMemo } from 'react'
import { mergeWords } from '@yoimu/common-lib'

export const ContentWrapper = ({ className: pclassName, children }) => {
	const className = useMemo(
		() => mergeWords('p-4 bg-white shadow-md rounded-md m-4', pclassName),
		[pclassName],
	)

	return <main className={className}>{children}</main>
}
