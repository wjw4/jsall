import { useMemo } from 'react'
import { Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useLayout } from '@/core/components/layout/service'

const { SubMenu, Item } = Menu

export const SideMenu = () => {
	const menuCollapsed = useLayout(e => e.menuCollapsed)
	const selectedKeys = useLayout(e => e.sideSelectedKeys)

	return useMemo(
		() => (
			<Menu
				className="max-w-side-menu"
				mode="inline"
				theme={'dark'}
				inlineCollapsed={menuCollapsed}
				selectedKeys={selectedKeys}
			>
				<Item key={'/'} icon={<HomeOutlined />}>
					<Link to={'/'}>首頁</Link>
				</Item>
			</Menu>
		),
		[menuCollapsed, selectedKeys],
	)
}
