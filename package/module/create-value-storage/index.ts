const emptyTexts = ['undefined', 'null']

export function createValueStorage<T>(
  key: string,
  defaultValue: T,
  storage: Storage = localStorage,
  ignoreEmptyText = true,
) {
  const _getItem = () => getItem(storage, key, defaultValue, ignoreEmptyText) as T

  return {
    defaultValue: _getItem(),
    getItem: _getItem,
    setItem: (value: T) => setItem(storage, key, value, ignoreEmptyText),
    removeItem: () => storage.removeItem(key),
  }
}

function getItem<T>(storage: Storage, key: string, defaultValue: T, ignoreEmptyText = true) {
  const value = storage.getItem(key)

  if (value == null) return defaultValue
  if (ignoreEmptyText && emptyTexts.includes(value)) return defaultValue

  try {
    return JSON.parse(value)
  } catch {
    return defaultValue
  }
}

function setItem(storage: Storage, key: string, value: any, ignoreEmptyText = true) {
  if (value == null) {
    storage.removeItem(key)
    return
  }

  try {
    const stringifyValue = JSON.stringify(value)

    if (ignoreEmptyText && emptyTexts.includes(stringifyValue)) {
      storage.removeItem(key)
      return
    }

    storage.setItem(key, stringifyValue)
  } catch {
    storage.removeItem(key)
  }
}