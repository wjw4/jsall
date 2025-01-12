import { Header } from '@/core/components/layout/component/header'
import { SideMenu } from '@/core/components/layout/component/side-menu'
import { Version } from '@/core/components/layout/component/version'
import { LayoutProvider } from '@/core/components/layout/service'
import { RouteContent } from '@/core/components/routes/route-content'

export const Layout = () => {
	return (
		<LayoutProvider>
			<div className="bg-gray-200 min-w-full min-h-screen flex flex-col">
				<Header />
				<div className="flex flex-1">
					<SideMenu />
					<div className="flex-1 flex flex-col">
						<div className="flex-1">
							<RouteContent />
						</div>
						<Version />
					</div>
				</div>
			</div>
		</LayoutProvider>
	)
}
