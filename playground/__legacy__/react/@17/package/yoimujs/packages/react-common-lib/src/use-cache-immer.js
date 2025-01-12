import { useEffect } from 'react'
import { useSafeImmer } from './use-safe-immer'

const CACHE_STATE = {}

export const useCacheImmer = (symbol, initialState) => {
  const [state, setState] = useSafeImmer(CACHE_STATE[symbol] ?? initialState)

  useEffect(() => {
    CACHE_STATE[symbol] = state
  }, [state])

  return [state, setState]
}
