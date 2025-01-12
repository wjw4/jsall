import { useMitt } from '@/core/hooks/use-mitt'
import { useCallback, useRef, useState } from 'react'

export const createMittModal = uuid => {
	return {
		useShowModal() {
			const { emit } = useMitt()

			return useCallback(
				event => {
					emit(uuid, event)
				},
				[emit],
			)
		},
		useOnModal() {
			const { on } = useMitt()
			const [visible, setVisible] = useState(false)
			const eventRef = useRef(null)
			const modalVisibleCallbackRef = useRef(null)

			const handler = useCallback(event => {
				eventRef.current = event
				setVisible(true)
				modalVisibleCallbackRef.current?.(event)
			}, [])

			const useModalVisible = useCallback(callback => {
				modalVisibleCallbackRef.current = callback
			}, [])

			const close = useCallback(() => {
				eventRef.current = null
				setVisible(false)
			}, [setVisible])

			on(uuid, handler)

			return {
				useModalVisible,
				eventRef,
				visible,
				close,
			}
		},
	}
}
