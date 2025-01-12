import { Result } from 'antd'
import { GoHomeBtn } from '@/core/components/go-home-btn'

export const NoRolePermission = () => {
	return (
		<Result
			status="403"
			title="403"
			subTitle="很抱歉，您沒有訪問該頁面的權限。"
			extra={<GoHomeBtn />}
		/>
	)
}
