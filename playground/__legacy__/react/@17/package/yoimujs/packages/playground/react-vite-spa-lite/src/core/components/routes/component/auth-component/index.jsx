import { Redirect } from 'react-router-dom'
import { useValidateAuth } from '@/core/hooks/use-validate-auth'
import { EAuthCode } from '@/core/hooks/use-auth'
import { RouteContent } from '@/core/components/routes/route-content'
import { IdentityAuthing } from '@/core/components/routes/component/auth-component/identity-authing'

export const AuthComponent = ({ component: RouteComponent }) => {
	const code = useValidateAuth()

	return code === EAuthCode.validating ? (
		<IdentityAuthing />
	) : code === EAuthCode.authError || code === EAuthCode.notLogin ? (
		<Redirect to={'/login'} />
	) : (
		<RouteContent Component={RouteComponent} />
	)
}
