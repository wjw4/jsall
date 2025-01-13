create-value-storage
===

> web storage 統一管理

## 使用

```typescript
import { createValueStorage } from 'create-value-storage'

// 不一定要有，但建議，因為我個人喜歡統一緩存前綴
const name = (name: string) => `my_${name}`

const storage = {
  // 存在 localStorage
  token: createValueStorage<string | null>(name('token'), null),
  // 存在 sessionStorage，json 格式會自動 stringify 存與 parse 取
  bookIdList: createValueStorage<number[]>(name('book_list'), [], sessionStorage),
}

// 首次的 storage 裡的值
storage.token.defaultValue // null
storage.bookIdList.defaultValue // []

// getItem() 取得當前 storage 裡的值
storage.token.getItem() // null
storage.bookIdList.getItem() // []

// setItem() 寫入數據到 storage
storage.token.setItem('test_token')
storage.token.getItem() // 'test_token'
storage.bookIdList.setItem([1, 2, 3])
storage.bookIdList.getItem() // [1, 2, 3]

// removeItem() 從 storage 移除
storage.token.removeItem()
storage.token.getItem() // null
storage.bookIdList.removeItem()
storage.bookIdList.getItem() // [] (響應的是 defaultValue)
```