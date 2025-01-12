import { Version } from '@/core/components/layout/component/version'
import { RouteContent } from '@/core/components/routes/route-content'

export const CardWrap = () => {
	return (
		<div className="bg-gray-200 min-w-max min-h-screen flex items-center justify-center">
			<div className="p-6 bg-white shadow-md rounded">
				<RouteContent />
			</div>
			<Version className={'absolute bottom-0 left-0 w-full'} />
		</div>
	)
}
