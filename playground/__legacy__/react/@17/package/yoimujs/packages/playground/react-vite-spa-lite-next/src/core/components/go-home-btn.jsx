import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const GoHomeBtn = () => {
	return (
		<Link to={'/'}>
			<Button type="primary">回首頁</Button>
		</Link>
	)
}
