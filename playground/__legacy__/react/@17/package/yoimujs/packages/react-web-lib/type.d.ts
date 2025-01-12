import { Dispatch, SetStateAction } from 'react'

export function useLocalStorageState<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>]

export function useSessionStorageState<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>]

export function createBreakpoints<T extends object, K extends keyof T>(
	screens: T,
): {
	useBreakpoints: (
		range: K | number,
		callback: (is: boolean) => void,
		opts?: { boostrap?: boolean; delay?: number },
	) => void
}

export function useQueryString<T extends object>(
	initialState: T,
): [T, (value: SetStateAction<T>, options?: { replace?: boolean }) => void]

export function useTitle(title: string, restoreOnUnmount?: boolean): string
