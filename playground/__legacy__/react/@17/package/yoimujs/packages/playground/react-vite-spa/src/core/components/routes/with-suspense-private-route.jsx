import { Suspense } from 'react'
import { AuthComponent } from '@/core/components/routes/component/auth-component'

export const withSuspensePrivateRoute =
	(routeComponent, Fallback, ...withFuncs) =>
	() => {
		withFuncs.forEach(e => e())

		return (
			<Suspense fallback={<Fallback />}>
				<AuthComponent component={routeComponent} />
			</Suspense>
		)
	}
