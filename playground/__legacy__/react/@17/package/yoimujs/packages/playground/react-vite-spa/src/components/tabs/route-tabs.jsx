import { Tabs } from 'antd'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const RouteTabs = ({ tabs }) => {
	const { pathname } = useLocation()
	const history = useHistory()
	const [key] = useState(pathname)

	const onChangeTab = _key => {
		if (_key !== key) {
			history.push(_key)
		}
	}

	return (
		<Tabs className="-mb-4" defaultActiveKey={key} onChange={onChangeTab}>
			{tabs.map(e => (
				<Tabs.TabPane tab={e.tab} key={e.key} />
			))}
		</Tabs>
	)
}
