import { useSafeCallback } from './use-safe-callback'
import { useImmer } from 'use-immer'

export const useSafeImmer = initialValue => {
  const [state, setState] = useImmer(initialValue)
  const updateState = useSafeCallback(setState)

  return [state, updateState]
}
