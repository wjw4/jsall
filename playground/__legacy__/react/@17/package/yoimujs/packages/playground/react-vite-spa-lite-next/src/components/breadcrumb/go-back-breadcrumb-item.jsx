import { useHistory } from 'react-router-dom'
import { Breadcrumb } from 'antd'

export const GoBackBreadcrumbItem = ({ children }) => {
	const history = useHistory()

	return (
		<Breadcrumb.Item>
			<a className="text-primary" onClick={() => history.goBack()}>
				{children}
			</a>
		</Breadcrumb.Item>
	)
}
