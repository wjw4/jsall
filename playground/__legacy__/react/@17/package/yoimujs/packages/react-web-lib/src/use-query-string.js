import { useCallback, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSafeState } from '@yoimu/react-common-lib'

const getValue = (search, param) => new URLSearchParams(search).get(param)

const isNone = e => e == null || (typeof e === 'string' && e.trim() === '')

const transformQueryMapToString = (queryMap = {}) => {
	let first = true
	return Object.entries(queryMap).reduce((p, [k, e]) => {
		if (isNone(e)) {
			return p
		} else {
			if (first) {
				first = false
				return p + `?${k}=${e}`
			}
			return p + `&${k}=${e}`
		}
	}, '')
}

const initState = (initialState, location) => {
	const _state = { ...initialState }
	if (typeof _state === 'object') {
		for (let k in initialState) {
			const searchEl = getValue(location.search, k)
			if (searchEl != null) {
				switch (searchEl) {
					case /^L_/.test(searchEl):
						const strArrSearchEl = searchEl.replace(/^L_/, '[') + ']'
						_state[k] = JSON.parse(strArrSearchEl)
						break
					default:
						if (/^(0|[1-9][0-9]*|true|false)$/.test(searchEl)) {
							_state[k] = JSON.parse(searchEl)
						} else {
							_state[k] = searchEl
						}
						break
				}
			}
		}
	}
	return _state
}

const transformState = state => {
	let _state = null
	if (typeof state === 'object') {
		for (let k in state) {
			const e = state[k]
			if (e != null) {
				if (_state == null) _state = {}
				if (Array.isArray(e) && e.length) {
					_state[k] = `L_${e.join(',')}`
				} else {
					_state[k] = e
				}
			}
		}
	}
	return _state
}

export const useQueryString = (initialState = {}) => {
	const location = useLocation()
	const history = useHistory()
	const [state, setState] = useSafeState(initState(initialState, location))
	const isInitRef = useRef(true)
	const isInitReplaceRef = useRef(false)
	const isManualChangeLinkRef = useRef(true)
	const isUpdateReplaceRef = useRef(false)

	const checkThenUpdateHistory = useCallback((state, replace = false) => {
		const queryState = transformState(state)
		const fnPropName = replace ? 'replace' : 'push'
		if (queryState == null) {
			history[fnPropName](location.pathname)
		} else {
			history[fnPropName](encodeURI(transformQueryMapToString(queryState)))
		}
	}, [])

	const updateState = useCallback(
		(cb, { replace = false } = {}) => {
			const _state = typeof cb === 'function' ? cb(state) : cb
			if (isManualChangeLinkRef.current) isManualChangeLinkRef.current = false
			if (replace) isUpdateReplaceRef.current = true
			setState(_state)
		},
		[state],
	)

	useEffect(() => {
		if (!isInitRef.current) {
			if (!isManualChangeLinkRef.current) {
				checkThenUpdateHistory(state, isUpdateReplaceRef.current)
				isManualChangeLinkRef.current = false
				if (isUpdateReplaceRef.current) isUpdateReplaceRef.current = false
			}
		}
	}, [state])

	useEffect(() => {
		if (!isInitRef.current) {
			if (!isInitReplaceRef.current) {
				if (isManualChangeLinkRef.current) {
					setState(initState(initialState, location))
				} else {
					isManualChangeLinkRef.current = true
				}
			} else {
				isInitReplaceRef.current = false
			}
		} else {
			isInitRef.current = false
		}
	}, [location])

	useEffect(() => {
		if (!location.search) {
			const queryState = transformState(state)
			if (queryState != null) {
				isInitReplaceRef.current = true
				history.replace(encodeURI(transformQueryMapToString(queryState)))
			}
		}
	}, [])

	return [state, updateState]
}
