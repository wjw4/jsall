import {
	HashRouter,
	Outlet,
	useParams,
	useRoutes,
	useSearchParams,
} from 'react-router-dom'
import { useEffect } from 'react'
import moment from 'moment'

const NotFound = () => {
	return <h1>not found 404!</h1>
}

const HomePage = () => {
	return <h1>hello react</h1>
}

const DetailPage2 = () => {
	return (
		<>
			<h1>DetailPage2</h1>
		</>
	)
}

const ListPage = () => {
	return (
		<>
			<h1>ListPage</h1>
		</>
	)
}

const DetailPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useParams()
	console.log({ searchParams, params, name: searchParams.get('name') })

	useEffect(() => {
		setTimeout(() => {
			console.log('update search params')
			const newSearchParams = new URLSearchParams()
			newSearchParams.append('name', 'frank')
			newSearchParams.append('age', '25')
			newSearchParams.append('now', `${Date.now()}`)
			setSearchParams(newSearchParams)
		}, 3000)
	}, [])
	return (
		<>
			<h1>DetailPage</h1>
		</>
	)
}

const Layout = () => {
	return (
		<>
			<div className={'mb-2'}>
				current date: {moment().format('YYYY/MM/DD HH:mm:ss')}
			</div>
			<Outlet />
		</>
	)
}

const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'list',
				element: <ListPage />,
			},
			{
				path: 'list/:id',
				element: <DetailPage />,
			},
			{
				path: 'list/detail',
				element: <DetailPage2 />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]

const Routes = () => useRoutes(routes)

export const V6RouterFirstApp = () => {
	return (
		<HashRouter>
			<Routes />
		</HashRouter>
	)
}
