import { useCallback, useEffect, useState } from 'react'
import { createProvider } from './create-provider'
import { findNestedDynamicObj } from '@yoimu/common-lib'
import {
	useLocalStorageState,
	useSessionStorageState,
} from '@yoimu/react-web-lib'

const translate = (messages, nestedKey, replaceArrayStr = []) => {
	let v = findNestedDynamicObj(messages, nestedKey)
	if (v == null) return nestedKey
	if (typeof v !== 'object') {
		replaceArrayStr.forEach((e, i) => {
			v = v.replace(new RegExp(`\\{${i}\\}`, 'g'), e)
		})
	}
	return v
}

const service =
	({
		messages,
		locale: initialLocale,
		localStorageKey,
		sessionStorageKey,
		_setLocale,
		t: _t,
	}) =>
	() => {
		const [locale, changeLocale] =
			localStorageKey != null
				? useLocalStorageState(localStorageKey, initialLocale)
				: sessionStorageKey != null
				? useSessionStorageState(sessionStorageKey, initialLocale)
				: useState(initialLocale)

		const t = useCallback(
			(nestedKey, replaceArrayStr = []) =>
				translate(messages[locale], nestedKey, replaceArrayStr),
			[locale],
		)

		useEffect(() => {
			_setLocale(locale)
		}, [locale])

		return {
			locale,
			changeLocale,
			t,
		}
	}

export const createI18n = ({
	locale,
	messages,
	localStorageKey,
	sessionStorageKey,
} = {}) => {
	let _locale = locale
	const _setLocale = locale => (_locale = locale)

	const t = (nestedKey, replaceArrayStr = []) =>
		translate(messages[_locale], nestedKey, replaceArrayStr)

	return {
		t,
		...createProvider(
			service({
				locale,
				localStorageKey,
				sessionStorageKey,
				messages,
				_setLocale,
			}),
		),
	}
}
