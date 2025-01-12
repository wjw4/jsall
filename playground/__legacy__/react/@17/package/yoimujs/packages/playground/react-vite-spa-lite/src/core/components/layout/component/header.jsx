import { Avatar, Button } from 'antd'
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { useLayout } from '@/core/components/layout/service'
import { useAuth } from '@/core/hooks/use-auth'

export const Header = () => {
	const setMenuCollapsed = useLayout(e => e.setMenuCollapsed)
	const auth = useAuth(e => e.auth)
	const logout = useAuth(e => e.logout)
	const onToggleCollapsed = () => setMenuCollapsed(e => !e)

	return (
		<div className="bg-white flex justify-between items-center py-2 px-2 shadow-md relative">
			<Button
				className="flex justify-center items-center"
				icon={<MenuOutlined />}
				onClick={onToggleCollapsed}
				size={'small'}
			>
				選單
			</Button>
			<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
				{import.meta.env.VITE_COMMON_APP_TITLE}
			</div>
			<div className="flex items-center">
				{auth != null ? (
					<>
						<Avatar
							className="flex items-center justify-center"
							size="small"
							icon={<UserOutlined />}
						/>
						<span className="ml-1 pr-2 mr-2 text-sm border-solid border-r-1 border-gray-300">
							{auth.account}
						</span>
					</>
				) : null}
				<Button
					className="flex items-center text-xs"
					icon={<LogoutOutlined />}
					size={'small'}
					onClick={logout}
				>
					{auth == null ? '登入' : '登出'}
				</Button>
			</div>
		</div>
	)
}
