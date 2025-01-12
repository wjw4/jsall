import { Button, Form, Input, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/core/hooks/use-auth'
import { useHttp } from '@/core/hooks/http/use-http'
import { useLoading } from '@yoimu/react-common-lib'

const initialUsername = import.meta.env.VITE_USERNAME
const initialPassword = import.meta.env.VITE_PASSWORD

export default () => {
	const navigate = useNavigate()
	const http = useHttp()
	const setAuth = useAuth(e => e.setAuth)
	const setToken = useAuth(e => e.setToken)
	const { loading: confirmLoading, useLoadingCall: useConfirmLoadingCall } =
		useLoading()

	const onLogin = useConfirmLoadingCall(async d => {
		const { success, accessToken, ...profile } = await http.fake.login({
			username: d.username,
		})

		if (success) {
			setAuth(profile)
			setToken(accessToken)
			message.success('登入成功')
			navigate('/', { replace: true })
		}
	})

	return (
		<>
			<div className="text-lg font-bold mb-4 text-center">登入</div>
			<Form name={'login-form'} onFinish={onLogin}>
				<Form.Item
					label={'帳號'}
					name={'username'}
					initialValue={initialUsername}
					rules={[{ required: true }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={'密碼'}
					name={'password'}
					initialValue={initialPassword}
					rules={[{ required: true }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<div className="text-right">
					<Button type="primary" htmlType="submit" loading={confirmLoading}>
						登入
					</Button>
				</div>
			</Form>
		</>
	)
}
