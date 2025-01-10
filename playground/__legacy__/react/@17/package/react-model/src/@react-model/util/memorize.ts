import { Memorize } from '../type'
export const memorize: Memorize = <T>(
  key: string,
  initial?: T,
  storageKey?: string,
  storageName?: 'localStorage' | 'sessionStorage'
) => {
  const _storageName: 'localStorage' | 'sessionStorage' = !storageName ? 'localStorage' : storageName
  const _storageKey = !storageKey ? `rm_${key}` : storageKey
  const win = window as any
  const storage = win[_storageName]
  const storageElement = storage[_storageKey];
  const setStorageVal = (data: T): T => {
    if(data !== undefined) storage.setItem(_storageKey, JSON.stringify(data))
    return data
  }
  if (!initial && !storageElement) setStorageVal(initial!)
  return [storageElement ? JSON.parse(storageElement) : initial, setStorageVal]
}

import {$$rm_store} from "@react-model";
