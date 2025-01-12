import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export default () => {
	return (
		<Result
			status="404"
			title="404"
			subTitle={'抱歉，該頁面不存在。'}
			extra={
				<Link to={'/'}>
					<Button type="primary">回首頁</Button>
				</Link>
			}
		/>
	)
}
