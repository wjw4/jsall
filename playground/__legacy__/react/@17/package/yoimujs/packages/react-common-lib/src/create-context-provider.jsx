import React, { useContext, createContext } from 'react'

export const createContextProvider = (providerService, HOC) => {
	const context = createContext(null)
	const Provider = ({ children }) => (
		<context.Provider value={providerService()}>
			{HOC ? HOC(children) : children}
		</context.Provider>
	)
	const inject = () => useContext(context)

	return {
		Provider,
		inject,
	}
}
