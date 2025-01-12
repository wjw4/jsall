import { Link, useHistory } from 'react-router-dom'
import { Breadcrumb, Typography } from 'antd'
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons'
import { useMemo } from 'react'
import { mergeWords } from '@yoimu/common-lib'

const { Item } = Breadcrumb
export const PageTitle = ({
	title: ptitle,
	just = false,
	back = false,
	onBack,
	icon: Icon,
	className: pclassName,
	children,
}) => {
	const className = useMemo(
		() => mergeWords('flex-1 bg-gray-100 px-2', pclassName),
		[],
	)
	const history = useHistory()
	const title = useMemo(() => ptitle || document.title, [ptitle])
	const _onGoBack = () => {
		onBack?.()
		history.goBack()
	}

	return (
		<Typography className={'mb-2'}>
			<Breadcrumb className={className}>
				<Item>
					<Link className="text-primary" to={'/'}>
						<HomeOutlined
							className={'inline-flex items-center fill-current text-primary'}
						/>
					</Link>
				</Item>
				{just ? (
					<Item>
						{Icon ? <Icon className={'inline-flex items-center mr-1'} /> : null}
						{title}
					</Item>
				) : (
					children
				)}
			</Breadcrumb>
			<div className="flex items-center mt-2">
				{back ? (
					<ArrowLeftOutlined
						className="text-base mr-3 flex items-center"
						onClick={_onGoBack}
					/>
				) : null}
				<Typography.Title level={3} className={'mb-0'}>
					{title}
				</Typography.Title>
			</div>
		</Typography>
	)
}
