create-callback-watcher
===

> 用來處理多個回調最後結束的方法

```typescript
const cbWatcher = createCallbackWatcher()

cbWatcher.complete = () => {
  // 所有 callnack 結束時調用
  // 也就是當 callApi1, callApi2 都回調時將會觸發 complete
  console.log(last)
}

// 在回掉函數前調用 go
cbWatcher.go()
callApi1(() => {
  console.log('callApi')
  // 回調後調用 done
  cbWatcher.done()
})

// go 返回的就是 done，所以也可以這麼做
callApi2(cbWatcher.go())
```
