import { Navigate, useRoutes } from 'react-router-dom'
import { Layout } from '@/core/components/layout'
import { lazy } from 'react'
import { useAuth } from '@/core/hooks/use-auth'
import { CardWrap } from '@/core/components/card-wrap'
import { withTitle } from '@/core/components/routes/withs/with-title'

export { Routes }

const WithComponent = ({ element: Element, withs = [] }) => {
	for (let i = 0; i < withs.length; i++) withs[i]()

	return <Element />
}

/** @type {RouteObject[]} 公共路由 */
const commonRoutes = [
	{
		path: '/',
		element: <CardWrap />,
		children: [
			{
				path: '/',
				element: (
					<WithComponent
						element={lazy(() => import('@/pages/home'))}
						withs={[withTitle('首頁')]}
					/>
				),
			},
		],
	},
]

/** @type {RouteObject[]} 登入前路由 */
const routes = [
	{
		path: '/',
		element: <CardWrap />,
		children: [
			{
				path: 'login',
				element: (
					<WithComponent
						element={lazy(() => import('@/pages/login'))}
						withs={[withTitle('登入')]}
					/>
				),
			},
			{
				path: '/',
				element: <Navigate to={'login'} />,
			},
			{
				path: '*',
				element: <Navigate to={'login'} />,
			},
		],
	},
]

/** @type {RouteObject[]} 登入後路由 */
const authRoutes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/home',
				element: (
					<WithComponent
						element={lazy(() => import('@/pages/home'))}
						withs={[withTitle('首頁')]}
					/>
				),
			},
			{
				path: '*',
				element: <Navigate to={'home'} />,
			},
		],
	},
]

const Routes = () => {
	const auth = useAuth(e => e.auth)
	console.log(123, auth == null)
	return auth == null ? useRoutes(routes) : useRoutes(authRoutes)
}

// export const Routes = () => {
// 	return (
// 		<Switch>
// 			{/*<RouteWrapper*/}
// 			{/*	path={'/login'}*/}
// 			{/*	exact*/}
// 			{/*	component={withSuspenseRoute(*/}
// 			{/*		lazy(() => import('@/pages/login')),*/}
// 			{/*		LayoutFallback,*/}
// 			{/*		withTitle('登入'),*/}
// 			{/*	)}*/}
// 			{/*	layout={CardWrap}*/}
// 			{/*/>*/}
//
// 			{/*<RouteWrapper*/}
// 			{/*	path={'/'}*/}
// 			{/*	exact*/}
// 			{/*	component={withSuspensePrivateRoute(*/}
// 			{/*		lazy(() => import('@/pages/home')),*/}
// 			{/*		LayoutFallback,*/}
// 			{/*		withTitle('首頁'),*/}
// 			{/*		withSideKey('/'),*/}
// 			{/*	)}*/}
// 			{/*	layout={Layout}*/}
// 			{/*/>*/}
//
// 			{/*<RouteWrapper*/}
// 			{/*	component={withSuspenseRoute(*/}
// 			{/*		lazy(() => import('@/core/components/not-found')),*/}
// 			{/*		LayoutFallback,*/}
// 			{/*		withTitle('找不到頁面'),*/}
// 			{/*	)}*/}
// 			{/*	layout={CardWrap}*/}
// 			{/*/>*/}
// 		</Switch>
// 	)
// }
