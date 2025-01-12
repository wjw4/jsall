import { useState } from 'react'
import { message } from 'antd'
import { createProvider } from '@yoimu/react-common-lib'
import { useSessionStorageState } from '@yoimu/react-web-lib'
import {
	HashRouter,
	Link,
	Navigate,
	useNavigate,
	useRoutes,
} from 'react-router-dom'

const service = () => {
	const [token, setToken] = useSessionStorageState('best__token', null)

	return {
		token,
		setToken,
	}
}

const { Provider: AuthProvider, inject: useAuth } = createProvider(service)

const LoginPage = () => {
	const [value, setValue] = useState('123')
	const setToken = useAuth(e => e.setToken)
	const navigate = useNavigate()
	const onLogin = () => {
		if (value === '123') {
			setToken('123')
			message.success('登入成功')
			navigate('/private', { replace: true })
			return
		}
		message.success('帳號錯誤')
	}

	return (
		<div>
			<input
				value={value}
				onChange={ev => setValue(ev.target.value)}
				placeholder={'輸入 123 即可成功登入'}
			/>
			<button onClick={onLogin}>登入</button>
		</div>
	)
}

const PrivatePage = () => {
	return (
		<>
			<div className={'text-3xl mb-4 font-bold'}>PrivatePage</div>
		</>
	)
}

const PublicPage = () => {
	return (
		<>
			<div className={'text-3xl mb-4 font-bold'}>PublicPage</div>
		</>
	)
}

const AuthContent = ({ element }) => {
	const token = useAuth(e => e.token)

	if (token == null) {
		return <Navigate to="/login" replace />
	}

	return element
}

const routes = [
	{
		path: '/',
		element: <PublicPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/private',
		element: <AuthContent element={<PrivatePage />} />,
	},
]

const Router = () => {
	return useRoutes(routes)
}

export const AuthApp = () => {
	return (
		<HashRouter>
			<AuthProvider>
				<div className={'text-3xl mb-4 font-bold'}>auth app</div>
				<div className={'mb-2 border-gray-500 border-t-1 border-b-1'}>
					<Link className={'mr-4'} to={'/login'}>
						登入
					</Link>
					<Link className={'mr-4'} to={'/'}>
						公共路由
					</Link>
					<Link className={'!line-through'} to={'/private'}>
						私有路由
					</Link>
				</div>
				<Router />
			</AuthProvider>
		</HashRouter>
	)
}

/*


import { useState } from 'react'
import { message } from 'antd'
import { createProvider } from '@yoimu/react-common-lib'
import { useSessionStorageState } from '@yoimu/react-web-lib'
import { HashRouter, Link, useNavigate, useRoutes } from 'react-router-dom'

const service = () => {
	const [token, setToken] = useSessionStorageState('best__token', null)

	return {
		token,
		setToken,
	}
}

const { Provider: AuthProvider, inject: useAuth } = createProvider(service)

const LoginPage = () => {
	const [value, setValue] = useState('123')
	const setToken = useAuth(e => e.setToken)
	const navigate = useNavigate()
	const onLogin = () => {
		if (value === '123') {
			setToken('123')
			message.success('登入成功')
			navigate('/private', { replace: true })
			return
		}
		message.success('帳號錯誤')
	}

	return (
		<div>
			<input
				value={value}
				onChange={ev => setValue(ev.target.value)}
				placeholder={'輸入 123 即可成功登入'}
			/>
			<button onClick={onLogin}>登入</button>
		</div>
	)
}

const PrivatePage = () => {
	return (
		<>
			<div className={'text-3xl mb-4 font-bold'}>PrivatePage</div>
		</>
	)
}

const PublicPage = () => {
	return (
		<>
			<div className={'text-3xl mb-4 font-bold'}>PublicPage</div>
		</>
	)
}

const AuthContent = ({ element }) => {
	const navigate = useNavigate()
	const token = useAuth(e => e.token)

	console.log({ token })
	if (token == null) {
		return navigate('/login', { replace: true })
	}

	return element
}

const routes = [
	{
		path: '/',
		element: <PublicPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/private',
		element: <AuthContent element={<PrivatePage />} />,
	},
]

const Router = () => {
	return useRoutes(routes)
}

export const AuthApp = () => {
	return (
		<HashRouter>
			<AuthProvider>
				<div className={'text-3xl mb-4 font-bold'}>auth app</div>
				<div className={'mb-2 border-gray-500 border-t-1 border-b-1'}>
					<Link className={'mr-4'} to={'/login'}>
						登入
					</Link>
					<Link className={'mr-4'} to={'/'}>
						公共路由
					</Link>
					<Link className={'!line-through'} to={'/private'}>
						私有路由
					</Link>
				</div>
				<Router />
			</AuthProvider>
		</HashRouter>
	)
}



 */
