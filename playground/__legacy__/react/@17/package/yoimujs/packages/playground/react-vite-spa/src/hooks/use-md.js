import { useMitt } from '@/core/hooks/use-mitt'
import { useState } from 'react'
import { SCREEN_MD_TO_CALL } from '@/core/mitt-type'
import { breakScreens, useBreakpoints } from '@/hooks/use-breakpoints'

export const useInitMdBreakPoints = () => {
	const { emit } = useMitt()
	useBreakpoints('md', isMd => emit(SCREEN_MD_TO_CALL, isMd), { delay: 0 })
}

export const useMd = () => {
	const [isMd, setIsMd] = useState(window.innerWidth <= breakScreens.md)
	const { on } = useMitt()

	on(SCREEN_MD_TO_CALL, setIsMd)

	return [isMd, setIsMd]
}
