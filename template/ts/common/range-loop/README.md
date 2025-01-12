range-loop
===

> 批次迴圈執行

```typescript
rangeLoop(
  // 數組資料
  [1, 2, 3, 4, 5, 6],
  // 每次執行幾筆
  3, 
  // 返回切割出來的數組資料
  (sliceList) => {
    console.log(sliceList)
    // 第一次 [1, 2, 3]
    // 第二次 [4, 5, 6]
  })

// rangeLoopAsync 執行邏輯同上，差在內部可以執行異步
rangeLoopAsync([1, 2, 3, 4, 5, 6], 3, async (sliceList) => {
  await myLog(sliceList)
  // 第一次 [1, 2, 3]
  // 第二次 [4, 5, 6]
})
```
