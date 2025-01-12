import { useMemo, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useAuth } from '@/core/hooks/use-auth'
import { useHttp } from '@/core/hooks/http/use-http'
import { useLoading } from '@yoimu/react-common-lib'

export default () => {
	const history = useHistory()
	const http = useHttp()
	const { loading: confirmLoading, useLoadingCall: useConfirmLoadingCall } =
		useLoading()
	const setAuth = useAuth(e => e.setAuth)
	const setToken = useAuth(e => e.setToken)

	const password2Rules = useMemo(
		() => [
			getFieldValue => (_, value) => {
				const password = getFieldValue('password')
				if (!value) {
					return Promise.reject(new Error('確認密碼為必填'))
				} else if (value?.length < 4 || value?.length > 20) {
					return Promise.reject(new Error('必須為4-20個字元'))
				} else if (value !== password) {
					return Promise.reject(new Error('與密碼不吻合'))
				}
				return Promise.resolve()
			},
		],
		[],
	)

	const onRegister = useConfirmLoadingCall(async _data => {
		const { success } = await { success: false }

		if (success) {
			setAuth(undefined)
			setToken(undefined)
			message.success('註冊成功')
			history.replace('/login')
		}
	})

	return (
		<>
			<div className="text-lg font-bold mb-4 text-center">註冊</div>
			<Form
				name={'register-form'}
				onFinish={onRegister}
				labelAlign={'left'}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<Form.Item
					label={'帳號'}
					name={'username'}
					rules={[{ required: true }, { type: 'email' }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input placeholder={'請輸入email'} />
				</Form.Item>
				<Form.Item
					label={'密碼'}
					name={'password'}
					rules={[{ required: true }, { min: 4, max: 10 }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						placeholder={'4-20位字元'}
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<Form.Item
					label={'確認密碼'}
					name={'password2'}
					required
					rules={password2Rules}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						placeholder={'請與密碼保持一致'}
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<div className={'text-right'}>
					<Link to={'/login'}>
						<Button className={'mr-2'}>返回登入</Button>
					</Link>
					<Button type={'primary'} htmlType={'submit'} loading={confirmLoading}>
						註冊
					</Button>
				</div>
			</Form>
		</>
	)
}
