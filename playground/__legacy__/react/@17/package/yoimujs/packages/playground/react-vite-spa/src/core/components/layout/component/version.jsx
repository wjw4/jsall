import { useCallback, useEffect, useMemo } from 'react'
import { mergeWords } from '@yoimu/common-lib'
import { useCacheState } from '@yoimu/react-common-lib'

const VERSION_CACHE_SYMBOL = Symbol()

export const Version = ({ className: pclassName }) => {
	const className = useMemo(
		() => mergeWords('p-3 text-center', pclassName && pclassName),
		[pclassName],
	)
	const [version, setVersion] = useCacheState(VERSION_CACHE_SYMBOL, null)

	const setupVersion = useCallback(() => {
		if (version != null) return

		const envVersion = import.meta.env.VITE_APP_VERSION
		const reg = /^\d{4}\.\d{2}\.\d{2}\.[^.]+-/
		const matchPrefix = envVersion.match(reg)
		const consoleStyle =
			'color: #8969ee; font-weight: 900; line-height: 1.4; font-size: 16px;'
		let webVersion = import.meta.env.VITE_APP_VERSION
		if (matchPrefix != null) {
			webVersion = envVersion.replace(reg, '')
		}

		console.log(`%cWEB: ${envVersion}`, consoleStyle)
		setVersion(`WEB: ${webVersion}`)
	}, [])

	useEffect(setupVersion, [])

	return <div className={className}>{version}</div>
}
