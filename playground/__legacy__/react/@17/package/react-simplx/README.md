# react-simplx(過去寫的蠢東西)

簡單的 react 狀態管理(僅 3 支 API)

[TS 範例](https://codesandbox.io/s/react-simplx--ts-crmum?file=/src/App.tsx) | [JS 範例](https://codesandbox.io/s/react-simplx--js-xivj8?file=/src/App.js)


|名稱|敘述|參數|回傳值|
|-|-|-|-|
|createModel|創建數據用，第二個參數為本地持久保存參數|`data: T extends object, memoryOption?: { prefix: string, key: (keyof T)[] }`|`T`|
|useWatch|監聽 createModel 的數據，更新畫面|`(T \| [T, ...string[]])[]`|`void`|
|useChange|改變值並渲染畫面|`data: T, key: K`|`[T[K], (value: T[K]) => void]`|
