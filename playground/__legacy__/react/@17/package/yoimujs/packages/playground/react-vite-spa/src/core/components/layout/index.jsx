import { Header } from '@/core/components/layout/component/header'
import { SideMenu } from '@/core/components/layout/component/side-menu'
import { Version } from '@/core/components/layout/component/version'
import { LayoutProvider } from '@/core/components/layout/service'
import { ContentWrapper } from '@/core/components/content-wrapper'

export const Layout = ({ children }) => {
	return (
		<LayoutProvider>
			<div className="bg-gray-200 min-w-full min-h-screen flex flex-col">
				<Header />
				<div className="flex flex-1">
					<SideMenu />
					<div className="flex-1 flex flex-col">
						<div className="flex-1">
							<ContentWrapper>{children}</ContentWrapper>
						</div>
						<Version />
					</div>
				</div>
			</div>
		</LayoutProvider>
	)
}
