import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import { ErrorBoundary } from '@/core/components/error-boundary'

export const RouteContent = ({ Component }) => {
	return (
		<ConfigProvider locale={zhTW}>
			<ErrorBoundary>
				<Component />
			</ErrorBoundary>
		</ConfigProvider>
	)
}
