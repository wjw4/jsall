import { Publish } from '../type'
import { $$rm_store } from '../'

export const publish: Publish = <T>(name: string, action: T) => {
  $$rm_store.subscribers[name] &&
    $$rm_store.subscribers[name].forEach((func: Function) => {
      func(action)
    })
}
