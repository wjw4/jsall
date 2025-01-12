import React from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

const defaultGetter = e => e

export const createProvider = (providerService, HOC) => {
	const context = createContext(null)
	const Provider = ({ children }) => (
		<context.Provider value={providerService()}>
			{HOC ? HOC(children) : children}
		</context.Provider>
	)
	const inject = (getter = defaultGetter) => useContextSelector(context, getter)

	return {
		Provider,
		inject,
	}
}
