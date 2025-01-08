import {useEffect, useState} from "react";

interface ISub {
  name: Symbol
  keys: string[] | undefined
  update: () => void
}

interface IMemoryOption<T> {
  prefix: string
  key: (keyof T)[]
}

interface IMemoryKeys {
  [key: string]: boolean
}

type TMemoryKeys = IMemoryKeys | undefined

export function createModel<T extends object>(data: T, memoryOption?: IMemoryOption<T>): T & { __sub: ISub[], __p: string | undefined, __mk: TMemoryKeys } {
  let _memoryKeys: TMemoryKeys = undefined
  let _prefix: string | undefined = undefined
  if (memoryOption) {
    _memoryKeys = {}
    _prefix = memoryOption.prefix
    memoryOption.key.forEach(key => {
      const stateKey = `${_prefix}__${key}`
      const state = localStorage.getItem(stateKey)
      ;(_memoryKeys as any)[key] = true
      if (state) data[key] = JSON.parse(state)
      else localStorage.setItem(stateKey, JSON.stringify(data[key]))
    })
  }

  const _data = new Proxy(Object.assign(data, {__sub: [], __p: _prefix, __mk: _memoryKeys}), {
    set: (obj, prop, val) => {
      (data as any)[prop] = val
      if (_data.__mk && (_data.__mk as any)[prop]) {
        const storageKey = `${_data.__p}__${prop as string}`;
        val === undefined ? localStorage.removeItem(storageKey) : localStorage.setItem(storageKey, JSON.stringify(val))
      }
      ;
      (_data.__sub as ISub[]).forEach(({keys, update}) => (!keys || (keys.length > 0 && keys.some(key => key === prop))) && update())
      return true
    }
  })

  return _data
}

export function useWatch<T extends { __sub: ISub[] }>(list: (T | [T, ...string[]])[]) {
  const [names] = useState<Symbol[]>([])
  const [, setState] = useState(0)
  useEffect(() => {
    list.forEach((prop, i) => {
      const isPropArray = Array.isArray(prop)
      const data = isPropArray ? (prop as [T, ...string[]])[0] : prop as T
      names.push(Symbol('update'))
      data.__sub.push({
        name: names[i], keys: isPropArray ? (prop as [T, ...string[]]).slice(1) as string[] : undefined, update() {
          setState(s => s + 1)
        }
      })
    })
    return () => {
      list.forEach((prop, i) => {
        const isPropArray = Array.isArray(prop)
        const data = isPropArray ? (prop as [T, ...string[]])[0] : prop as T
        data.__sub.splice(data.__sub.findIndex(s => s.name === names[i]), 1)
      })
    }
  }, [])
}

export function useChange<T, K extends keyof T>(data: T, key: K): [T[K], (value: T[K]) => void] {
  const [state, setState] = useState<T[K]>(data[key])
  const update = (value: T[K]) => {
    data[key] = value
    setState(value)
  }
  return [state, update]
}