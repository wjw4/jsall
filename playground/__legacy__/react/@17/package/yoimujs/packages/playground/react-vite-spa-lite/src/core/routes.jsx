import { lazy } from 'react'
import { Switch } from 'react-router-dom'
import { withTitle } from '@/core/components/routes/with-funcs/with-title'
import { withSuspenseRoute } from '@/core/components/routes/with-suspense-route'
import { RouteWrapper } from '@/core/components/routes/route-wrapper'
import { LayoutFallback } from '@/core/components/fallback/layout-fallback'
import { CardWrap } from '@/core/components/card-wrap'
import { withSuspensePrivateRoute } from '@/core/components/routes/with-suspense-private-route'
import { Layout } from '@/core/components/layout'
import { withSideKey } from '@/core/components/routes/with-funcs/with-side-key'

export const Routes = () => {
	return (
		<Switch>
			<RouteWrapper
				path={'/login'}
				exact
				component={withSuspenseRoute(
					lazy(() => import('@/pages/login')),
					LayoutFallback,
					withTitle('登入'),
				)}
				layout={CardWrap}
			/>

			<RouteWrapper
				path={'/'}
				exact
				component={withSuspensePrivateRoute(
					lazy(() => import('@/pages/home')),
					LayoutFallback,
					withTitle('首頁'),
					withSideKey('/'),
				)}
				layout={Layout}
			/>

			<RouteWrapper
				component={withSuspenseRoute(
					lazy(() => import('@/core/components/not-found')),
					LayoutFallback,
					withTitle('找不到頁面'),
				)}
				layout={CardWrap}
			/>
		</Switch>
	)
}
