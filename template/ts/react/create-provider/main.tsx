import { createContext, ReactNode, useContext } from 'react'

export function createProvider<T>(createContextValue: () => T) {
	const contextValue = createContextValue()
	const context = createContext(contextValue)

	function useProvider(): T {
		return useContext(context)
	}

	function Provider({ children }: { children: ReactNode }) {
		return <context.Provider value={contextValue}>{children}</context.Provider>
	}

	return {
		Provider,
		useProvider,
	}
}
