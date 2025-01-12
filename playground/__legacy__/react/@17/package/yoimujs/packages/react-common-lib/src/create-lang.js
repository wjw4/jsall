import { useCallback, useMemo } from 'react'
import { createProvider } from './create-provider'
import { useSafeState } from './use-safe-state'

// 將 {0, 1, ...} 值轉換
const t = (text, replaceArgs = []) => {
	if (!text) return text
	if (Array.isArray(replaceArgs) && replaceArgs.length > 0) {
		for (let i = 0; i < replaceArgs.length; i++) {
			text = text.replace(new RegExp(`\\{${i}\\}`, 'g'), replaceArgs[i])
		}
	}
	return text
}

const useService =
	({ defaultLocale, languages, langRef }) =>
	() => {
		const [locale, setLocale] = useSafeState(defaultLocale)
		const lang = useMemo(() => languages[locale] || {}, [locale])
		const changeLocale = useCallback(
			plocale => {
				langRef.current = languages[plocale] || {}
				setLocale(plocale)
			},
			[languages, langRef, setLocale],
		)

		return {
			lang,
			t,
			locale,
			changeLocale,
		}
	}

export const createLang = ({
	defaultLocale,
	languages: plangauges,
	typeBindObj,
} = {}) => {
	const languages = plangauges || {}
	const _defaultLocale =
		languages[defaultLocale] != null ? defaultLocale : Object.keys(languages)[0]
	const langRef = { current: languages[_defaultLocale] || {} }

	return {
		langRef,
		t,
		...createProvider(
			useService({ defaultLocale: _defaultLocale, languages, langRef }),
		),
	}
}
