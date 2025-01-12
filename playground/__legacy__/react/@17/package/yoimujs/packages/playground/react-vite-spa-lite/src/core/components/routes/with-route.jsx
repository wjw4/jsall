import { RouteContent } from '@/core/components/routes/route-content'

export const withRoute =
	(routeComponent, ...withFuncs) =>
	() => {
		withFuncs.forEach(e => e())

		return <RouteContent Component={routeComponent} />
	}
