import { UseDestroy } from '../type'
import { useEffect } from 'react'

export const useDestroy: UseDestroy = (destroyFunc) => {
  useEffect(() => () => destroyFunc(), [])
}
