import { useEffect } from 'react'
import { useLayout } from '@/core/components/layout/service'

export const withEditorCheckLeave = () => {
	const setCheckEditorLeave = useLayout(e => e.setCheckEditorLeave)

	useEffect(() => {
		setCheckEditorLeave(true)
		return () => {
			setCheckEditorLeave(false)
		}
	}, [])
}
