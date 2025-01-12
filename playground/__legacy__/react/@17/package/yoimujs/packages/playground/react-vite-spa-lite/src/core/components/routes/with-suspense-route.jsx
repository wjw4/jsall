import { Suspense } from 'react'
import { RouteContent } from '@/core/components/routes/route-content'

export const withSuspenseRoute =
	(RouteComponent, Fallback, ...withFuncs) =>
	() => {
		withFuncs.forEach(e => e())

		return (
			<Suspense fallback={<Fallback />}>
				<RouteContent Component={RouteComponent} />
			</Suspense>
		)
	}
