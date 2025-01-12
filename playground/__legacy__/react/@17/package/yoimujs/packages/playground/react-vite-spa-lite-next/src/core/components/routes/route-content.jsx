import { ErrorBoundary } from '@/core/components/error-boundary'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import moment from 'moment'
import 'moment/dist/locale/zh-tw'
import { useEffect, Suspense } from 'react'
import { LayoutFallback } from '@/core/components/fallback/layout-fallback'
import { Outlet } from 'react-router-dom'

export const RouteContent = () => {
	useEffect(() => {
		moment.locale('zh-tw')
	}, [])

	return (
		<ConfigProvider locale={zhTW}>
			<ErrorBoundary>
				<Suspense fallback={<LayoutFallback />}>
					<Outlet />
				</Suspense>
			</ErrorBoundary>
		</ConfigProvider>
	)
}
