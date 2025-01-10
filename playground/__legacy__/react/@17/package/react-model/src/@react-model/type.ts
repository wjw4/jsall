import {FC} from "react";

export interface EmitFunctionReturn {
  pop: pop
}
export interface pop {
  (): void
}
export interface UseSubscribe {
  (name: string, emitFunction?: (source: { data: any, render: ForceUpdate, pop: pop }) => void): EmitFunctionReturn
}
export interface UseCreated {
  (createFunc: Function): void
}
export interface UseDestroy {
  (destroyFunc: Function): void
}
export interface ForceUpdate {
  (): void
}
export interface UseForceUpdate {
  (): ForceUpdate
}
export interface UseResetWithKey {
  (): [FC, () => void]
}
export interface Publish {
  <T>(name: string, action?: T): void
}
export interface Memorize {
  <T>(key: string, initial?: T, storageKey?: string, storageName?: 'localStorage' | 'sessionStorage'): [T, (data: T) => T]
}
export interface SetStoragePrefix {
  (prefix: string): void
}
