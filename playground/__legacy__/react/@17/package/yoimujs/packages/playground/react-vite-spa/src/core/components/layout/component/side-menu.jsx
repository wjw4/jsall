import { useMemo } from 'react'
import { Menu } from 'antd'
import {
	HomeOutlined,
	OrderedListOutlined,
	ScheduleOutlined,
} from '@ant-design/icons'
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
				<SubMenu key={'nesting'} title={'嵌套選單'}>
					<SubMenu key={'nesting-1'} title={'第二層'}>
						<Item key={'nesting-1-1'} icon={<ScheduleOutlined />}>
							<Link to={'/'}>公佈欄(第三層)</Link>
						</Item>
					</SubMenu>
					<Item key={'nesting-2'} icon={<OrderedListOutlined />}>
						<Link to={'/'}>公佈欄(第二層)</Link>
					</Item>
				</SubMenu>
			</Menu>
		),
		[menuCollapsed, selectedKeys],
	)
}
