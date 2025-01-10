# @react-model

檔案尚未整理

# hook

## useSubscribe

**事件訂閱**：當收到 `publish` 的通知時觸發訂閱的方法，所以會與 `publish` 搭配使用，會自動回收訂閱事件，所以不用手動回收(`pop`)

### 類型

```typescript
interface UseSubscribe {
  // pop 為取消訂閱事件
  (name: string, emitFunction: Function): { pop: () => void }
}
```

### 範例

- 一般訂閱

```typescript
import React from 'react'
import { useForceUpdate, useSubscribe } from '@react-model'

const App = () => {
  // 每次收到 publish('update-app') 的通知時，觸發頁面重新渲染
  const forceUpdate = useForceUpdate()
  useSubscribe('update-app', forceUpdate)
  // ...
}
```

- 一次性訂閱

```typescript
import React from 'react'
import { useForceUpdate, useSubscribe } from '@react-model'

const App = () => {
  const forceUpdate = useForceUpdate()
  // pop 為取消訂閱
  // 當收到通知時取消該訂閱的綁定並將頁面重新渲染
  const subscriber = useSubscribe('update-app', () => {
    subscriber.pop()
    forceUpdate()
  })
  // ...
}
```

- 接收 publish 的數據

```typescript
import { publish, useSubscribe } from '@react-model'

const App = () => {
  // useSubscribe 的 callback 可以接收一個值(action)
  useSubscribe('print', (word: string) => console.log(word))

  return (
    <div>
      <button onClick={() => publish('print', 'hello world!')}>
        點擊打印 hello world!
      </button>
    </div>
  )
}
```

## useCreated

首次加載觸發的鉤子，僅觸發一次(不需要 await 建議使用 `useEffect`)

### 類型

```typescript
interface UseCreated {
  (createFunc: Function): void
}
```

### 範例

```typescript
import React from 'react'
import { useCreated } from '@react-model'

const App = () => {
  useCreated(async () => {
    await callApi()
    // ...
  })
  // ...
}
```

## useDestory

組件銷毀時觸發的鉤子

ps：

- **useSubscribe 會自動回收，不用在此 pop**
- **DOM 事件的綁定清除，請使用 `useEffect` 處理**

### 類型

```typescript
interface UseDestory {
  (destroyFunc: Function): void
}
```

### 範例

```typescript
import React from 'react'
import { useDestory } from '@react-model'

const timer = setInterval(() => {
  console.log(new Date())
}, 1000)

const App = () => {
  useDestory(() => clearInterval(timer))
  // ...
}
```

## useForceUpdate

組件重新渲染鉤子

### 類型

```typescript
interface ForceUpdate {
  (): void
}
interface UseForceUpdate {
  (): ForceUpdate
}
```

### 範例

```typescript
import React from 'react'
import { useForceUpdate } from '@react-model'

const App = () => {
  const forceUpdate = useForceUpdate()

  return (
    <div>
      {/* 點擊按鈕重新渲染 App 組件 */}
      <button onClick={forceUpdate}>重新渲染</button>
    </div>
  )
}
```

## useResetWithKey

刷新表單的 default 值

### 類型

```typescript
interface UseResetWithKey {
  (): [string, () => void]
}
```

### 範例

```typescript
import { Input, Button } from 'antd'
import { useResetWithKey } from '@react-model'

const App = () => {
  const [resetKey, reset] = useResetWithKey()

  // resetKey 綁定要刷新的範圍
  return (
    <div key={resetKey}>
      {/* 如果沒有綁 value 走的是 defaultValue，這時要清空 default 數據就必須使用此 hook */}
      <Input />
      {/* 調用 reset 來刷新表單 */}
      <Button onClick={reset}>刷新 input</Button>
    </div>
  )
}
```

---

# function

## publish

**通知**：通知使用 useScribe 訂閱的對象，使之觸發訂閱其方法，可以傳遞一個參數

### 類型

```typescript
interface Publish {
  <T>(name: string, action?: T): void
}
```

### 範例

```typescript
// 基本款
publish('render-Header')
// 帶參數
publish<{ length: number }>('render-Header', 'hello world')
```

## memorize

永久化數據儲存(記憶在 localStorage (預設) / sessionStorage 裡)

- (storage key 名稱, 初始值, 暫存的 storage name(session, local))

### 類型

```typescript
interface Memorize {
  <T>(key: string, initial?: T, storageName?: string): [T, (data: T) => string]
}
```

### 範例

建議使用 getter / setter 實現，比較省事，但具體沒有限制使用方式

```typescript
class User {
  constructor(name: string) {
    this.name = name
  }
  get name(): string {
    const [name] = memorize<string>('name')
    return name
  }
  set name(name: string) {
    const [, setName] = memorize<string>('name')
    setName(name)
  }
}

// 此時 localStorage 裡將出現 rm_name frank 的數據
const user = new User('frank')
```

或者是使用函數的方式

```typescript
// 第二個參數為初始值，此為 frank
var name = memorize<string>('name', 'frank')[0]
var setName = (name: string) => memorize<string>('name')[1](name)

setName('frank')
```

## resetMemory

清除所有由 memorize 儲存的數據

### 類型

```typescript
interface ResetMemory {
  (): void
}
```

### 範例

```typescript
resetMemory()
```
