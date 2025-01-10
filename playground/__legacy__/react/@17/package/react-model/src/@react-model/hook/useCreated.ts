import { UseCreated } from '../type'
import { useEffect } from 'react'

export const useCreated: UseCreated = (createFunc) => {
  useEffect(() => {
    ;(() => createFunc())()
  }, [])
}
