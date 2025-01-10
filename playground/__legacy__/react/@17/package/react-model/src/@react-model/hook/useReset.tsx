import React, {FC, Fragment, useState} from 'react'
import { UseResetWithKey } from '../type'

export const useReset: UseResetWithKey = () => {
  const [i, setI] = useState(0)
  const reset = () => setI((i: number) => i + 1)
  const ResetContext: FC = ({children}) => <Fragment key={i + ''}>{children}</Fragment>
  return [ResetContext, reset]
}
