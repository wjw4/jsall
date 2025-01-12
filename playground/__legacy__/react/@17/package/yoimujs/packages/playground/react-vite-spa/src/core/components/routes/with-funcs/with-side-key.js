import { useEffect } from 'react'
import { useLayout } from '@/core/components/layout/service'

export const withSideKey = sideKey => () => {
	const setSideSelectedKeys = useLayout(e => e.setSideSelectedKeys)
	useEffect(() => {
		setSideSelectedKeys([sideKey])
	}, [])
}
