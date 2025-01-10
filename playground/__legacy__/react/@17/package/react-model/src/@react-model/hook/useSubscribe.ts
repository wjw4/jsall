import { UseSubscribe } from '../type'
import { useEffect } from 'react'
import { $$rm_store } from '../'
import {useForceUpdate} from "src/@react-model/hook/useForceUpdate";

export const useSubscribe: UseSubscribe = (name, emitFunc) => {
  const render = useForceUpdate()
  const pop = (): void => {
    const subscriber: Function[] = $$rm_store.subscribers[name]
    const removeSubscriberIndex: number = subscriber.findIndex(
      (f: Function) => f === emitFunc
    )
    if (removeSubscriberIndex !== -1) {
      subscriber.splice(removeSubscriberIndex, 1)
    }
  }

  useEffect(() => {
    let fn: Function
    if (emitFunc === undefined) fn = render;
    else fn = <T>(data: T) => emitFunc({data, render, pop})
    if ($$rm_store.subscribers[name] === undefined) {
      $$rm_store.subscribers[name] = [fn]
    } else {
      $$rm_store.subscribers[name].push(fn)
    }
    return pop
  }, [])

  return {
    pop,
  }
}
