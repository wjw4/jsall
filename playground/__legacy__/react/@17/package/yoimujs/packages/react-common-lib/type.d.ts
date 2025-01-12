import {
	DependencyList,
	Dispatch,
	EffectCallback,
	MutableRefObject,
	ReactElement,
	SetStateAction,
} from 'react'
import { ImmerHook } from 'use-immer'

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...0[]]

type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}${'' extends P ? '' : '.'}${P}`
		: never
	: never

type Paths<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
	? {
			[K in keyof T]-?: K extends string | number
				? `${K}` | (Paths<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
				: never
	  }[keyof T]
	: ''

type ServiceProvider = (prop: { children: ReactElement }) => ReactElement
type ServiceInject1<T> = <V>(getter: (e: T) => V) => V
type ServiceInject2<T> = () => T
type ServiceInject<T> = ServiceInject1<T> & ServiceInject2<T>
type ContextServiceInject<T> = () => T
type ProviderHOC = (children: ReactElement) => ReactElement

export function createI18n<
	T extends object,
	K extends keyof T,
	KS extends Join<Paths<T, 5>, ''>,
	i18nT extends (nestedKey: KS, replaceArrayStr?: string[]) => string,
>(options: {
	locale: K
	messages: T
	localStorageKey: string
	sessionStorageKey: string
}): {
	t: i18nT
	Provider: ServiceProvider
	inject: ServiceInject<{
		locale: string
		changeLocale: Dispatch<SetStateAction<string>>
		t: i18nT
	}>
}

type CreateLangTranslate = <T = string>(text: T, replaceArgs?: any[]) => T
export function createLang<T extends object>(options: {
	defaultLocale: string
	languages: object
	typeBindObj: T
}): {
	langRef: { current: T }
	t: CreateLangTranslate
	Provider: ServiceProvider
	inject: ServiceInject<{
		lang: T
		t: CreateLangTranslate
		locale: string
		changeLocale: (locale: string) => void
	}>
}

export function createMitt(): {
	useMitt: () => {
		emit: (type: any, event: any) => void
		on: (type: any, handler: Function) => void
	}
}

export function createProvider<T>(
	providerService: () => T,
	HOC?: ProviderHOC,
): {
	Provider: ServiceProvider
	inject: ServiceInject<T>
}

export function createContextProvider<T>(
	providerService: () => T,
	HOC?: ProviderHOC,
): {
	Provider: ServiceProvider
	inject: ContextServiceInject<T>
}

export function useCacheState<T>(
	symbol: Symbol,
	initialValue: T,
): [T, (arg: T | ((arg: T) => T)) => void]

export function useCacheImmer<S = any>(
	initialValue: S | (() => S),
): ImmerHook<S>

export function useDebounce<T>(callback: T, deps: any[], delay?: number): void

// TODO type 沒意外是錯的
export function useDebounceFunc(
	callback: Function[],
	delay?: number,
): [(...args: any) => void, () => void]

// TODO 該類型應該是錯的，這 hook 沒啥用，先寫著放著
export function useMethods<
	T,
	U extends { [funName: string]: (state: T, ...args: any) => T },
>(initialValue: T, methods: U): { [key in keyof T]: (...args: any) => T }

export function useSafeState<S = any>(
	initialValue: S | (() => S),
): [S, Dispatch<SetStateAction<S>>]

export function useSafeImmer<S = any>(initialValue: S | (() => S)): ImmerHook<S>

export function useSafeCallback<F extends Function>(updater: F): F

export function useInitialRef<T>(
	initialValue: T | (() => T),
): MutableRefObject<T>

export function useToggle<T>(
	initialState: T | (() => T),
): [T, () => void, Dispatch<SetStateAction<T>>]

export function useEditorList<T extends object, K extends keyof T>(
	initialValueFunc: () => T,
	init?: boolean,
): [
	T[],
	Dispatch<SetStateAction<T[]>>,
	{
		create: () => void
		editByIndex: (index: number, value: T) => void
		editKeyValueByIndex: (index: number, key: K, value: T[K]) => void
		removeByIndex: (index: number, removeNum?: number) => void
		removeByKeyValue: (key: K, value: T[K]) => void
	},
]

export function useCheckInjectReturn<T extends object, K extends keyof T>(
	returnValue: T,
	checkKeys: K[],
): [
	T,
	{
		current: {
			[P in K]: boolean
		}
	},
]

export function useForceUpdate(): () => void

type LoadingProps<N> = { num?: N; loadingCall?: boolean }

type LoadingCallFuncReturn<T> = () => Promise<{
	success: boolean
	data: T | Error
}>

type LoadingCall = <T>(
	callback: (...args: any[]) => any,
) => LoadingCallFuncReturn<T>

type LoadingCallback = <T>(
	callback: (...args: any[]) => any,
	deps?: DependencyList,
) => LoadingCallFuncReturn<T>

type LoadingEffect = <T = any>(
	callback: EffectCallback,
	deps?: DependencyList,
) => void

export function useLoading<N = 1>(
	props?: LoadingProps<N>,
): N extends 1
	? {
			loading: boolean
			useLoadingCall: LoadingCall
			useLoadingCallback: LoadingCallback
			useLoadingEffect: LoadingEffect
	  }
	: N extends 2
	? {
			loading: boolean
			useLoadingCall: LoadingCall
			useLoadingCallback: LoadingCallback
			useLoadingEffect: LoadingEffect
			loading2: boolean
			useLoadingCall2: LoadingCall
			useLoadingCallback2: LoadingCallback
			useLoadingEffect2: LoadingEffect
	  }
	: N extends 3
	? {
			loading: boolean
			useLoadingCall: LoadingCall
			useLoadingCallback: LoadingCallback
			useLoadingEffect: LoadingEffect
			loading2: boolean
			useLoadingCall2: LoadingCall
			useLoadingCallback2: LoadingCallback
			useLoadingEffect2: LoadingEffect
			loading3: boolean
			useLoadingCall3: LoadingCall
			useLoadingCallback3: LoadingCallback
			useLoadingEffect3: LoadingEffect
	  }
	: N extends 4
	? {
			loading: boolean
			useLoadingCall: LoadingCall
			useLoadingCallback: LoadingCallback
			useLoadingEffect: LoadingEffect
			loading2: boolean
			useLoadingCall2: LoadingCall
			useLoadingCallback2: LoadingCallback
			useLoadingEffect2: LoadingEffect
			loading3: boolean
			useLoadingCall3: LoadingCall
			useLoadingCallback3: LoadingCallback
			useLoadingEffect3: LoadingEffect
			loading4: boolean
			useLoadingCall4: LoadingCall
			useLoadingCallback4: LoadingCallback
			useLoadingEffect4: LoadingEffect
	  }
	: N extends 5
	? {
			loading: boolean
			useLoadingCall: LoadingCall
			useLoadingCallback: LoadingCallback
			useLoadingEffect: LoadingEffect
			loading2: boolean
			useLoadingCall2: LoadingCall
			useLoadingCallback2: LoadingCallback
			useLoadingEffect2: LoadingEffect
			loading3: boolean
			useLoadingCall3: LoadingCall
			useLoadingCallback3: LoadingCallback
			useLoadingEffect3: LoadingEffect
			loading4: boolean
			useLoadingCall4: LoadingCall
			useLoadingCallback4: LoadingCallback
			useLoadingEffect4: LoadingEffect
			loading5: boolean
			useLoadingCall5: LoadingCall
			useLoadingCallback5: LoadingCallback
			useLoadingEffect5: LoadingEffect
	  }
	: never
