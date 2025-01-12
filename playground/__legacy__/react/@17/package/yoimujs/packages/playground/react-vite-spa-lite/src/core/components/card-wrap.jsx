import { Version } from '@/core/components/layout/component/version'

export const CardWrap = ({ children }) => {
	return (
		<div className="bg-gray-200 min-w-max min-h-screen flex items-center justify-center">
			<div className="p-6 bg-white shadow-md rounded">{children}</div>
			<Version className={'absolute bottom-0 left-0 w-full'} />
		</div>
	)
}
