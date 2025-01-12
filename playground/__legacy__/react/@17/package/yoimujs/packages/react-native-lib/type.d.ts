import { Dispatch, SetStateAction } from 'react'

export function useAsyncStorageStore<T extends Object, K extends keyof T>(
	appName: string,
	initialStore: T,
): [T, (key: K, value: T[K]) => void]

export function useAsyncStorageState<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>, () => Promise<void>]
