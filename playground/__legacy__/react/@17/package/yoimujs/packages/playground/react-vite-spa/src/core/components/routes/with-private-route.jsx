import { AuthComponent } from '@/core/components/routes/component/auth-component'

export const withPrivateRoute =
	(routeComponent, ...withFuncs) =>
	() => {
		withFuncs.forEach(e => e())

		return <AuthComponent component={routeComponent} />
	}
