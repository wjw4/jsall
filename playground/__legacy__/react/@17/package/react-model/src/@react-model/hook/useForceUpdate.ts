import { UseForceUpdate } from '../type'
import { useState } from 'react'

export const useForceUpdate: UseForceUpdate = () => {
  const [, forceUpdate] = useState(0)
  return () => forceUpdate((i: number) => i + 1)
}
