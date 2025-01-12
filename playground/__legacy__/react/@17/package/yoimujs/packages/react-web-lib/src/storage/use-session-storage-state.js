import { getStorageItem, useUpdateStorage } from './helper'
import { useSafeState } from '@yoimu/react-common-lib'

export const useSessionStorageState = (key, initialValue) => {
	const [state, setState] = useSafeState(
		getStorageItem(key, initialValue, sessionStorage),
	)
	useUpdateStorage(key, state, sessionStorage)
	return [state, setState]
}
