import { useAuth } from '@/core/hooks/use-auth'

export default () => {
	const auth = useAuth(e => e.auth)

	return (
		<div>
			已登入
			<br />
			<br />
			帳號：{auth.account}
			<br />
			姓名：{auth.name}
		</div>
	)
}
