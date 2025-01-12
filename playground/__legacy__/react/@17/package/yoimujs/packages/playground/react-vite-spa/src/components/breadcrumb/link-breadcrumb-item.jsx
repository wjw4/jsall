import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

export const LinkBreadcrumbItem = ({ to, children }) => {
	return (
		<Breadcrumb.Item>
			<Link to={to} className="text-primary">
				{children}
			</Link>
		</Breadcrumb.Item>
	)
}
