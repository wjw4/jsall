# yoimu-js

---

## common-lib

```cmd
npm i @yoimu/common-lib
```

> 全平台

### stepPrice

> 數字加逗號

#### 類型

```typescript
function stepPrice(price: string | number, step?: number): string
```

#### 使用

```javascript
stepPrice(1000) // 1,000
stepPrice(1000, 2) // 10,00 第二個參數為幾位數打一個逗號，預設為千(3位)
```

### mergeWords

> 條件合併文字

#### 類型

```typescript
function mergeWords(...conditionTextArr: any[]): string
```

#### 使用

```javascript
mergeWords('a', 'b') // 'a b'
mergeWords('a', true ? 'b' : 'c') // 'a b'
mergeWords('a', true && 'b', false && 'c') // 'a b'
```

---

## web-lib

```cmd
npm i @yoimu/web-lib
```

> 網頁

### copyText

> 複製文字

#### 類型

```typescript
function copyText(value: number | string): string
```

#### 使用

```javascript
copyText("複製的文字")
```

### checkMobile

> 檢測是否是移動裝置，這僅檢測此，想要更全面的檢測建議套外部庫

#### 類型

```typescript
function checkMobile(): boolean
```

#### 使用

```javascript
checkMobile() // false
```

---

## react-common-lib

```cmd
npm i @yoimu/react-common-lib
```

> react 全平台

### useSafeState

> 使用同 useState，與其只差在使用該鉤子不會有內存泄露的問題

### 類型

同 useState

### 用法

同 useState

### useCacheState

> 使用同 useState，該鉤子會將數據緩存在內存，當你離開又回來組件你會看到數據仍是最後的數據

### 類型

```typescript
function useCacheState<T>(
  symbol: Symbol, // 唯一值
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>]
```

### 用法

```javascript
const sym = Symbol()
function Comp() {
  const [count, setCount] = useCacheState(sym, 0) // 調用同 useState
}
```

---

## react-web-lib

```cmd
npm i @yoimu/react-web-lib
```

> react 網頁

### useLocalStorageState

> 會自動將值紀錄在 localstorage 裡的 useState，目前是基本款，後續會提供可選配置

#### 類型

```typescript
function useLocalStorageState<T>(
  key: string, // localstorage 的名稱
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>]
```

#### 使用

```javascript
const [count, setCount] = useLocalStorageState('count', 0)
// 其他同 useState，可以看到 localStorage 的值會同步變動
```

### useSessionStorageState

> 同 [useLocalStorageState](https://github.com/yoimu-team/js#uselocalstoragestate) 只是將資料存到 sessionStorage

### useTitle

> 更換頁面 title

#### 類型

```typescript
function useTitle(title: string, restoreOnUnmount?: boolean): string
```

#### 使用

```javascript
function Component() {
  useTitle('hello yoimu') // 將頁面抬頭改成 hello yoimu
  // useTitle('hello yoimu', true) // 第 2 個參數預設為 false, 是否在頁面銷毀時返回上個標題
}
```

---

## playground/react-vite-spa-next-lite
## playground/react-vite-spa-next-i18n-lite
## playground/react-vite-spa-next-auth-lite
## playground/react-vite-spa-next
## playground/react-vite-spa-lite
## playground/react-vite-spa-i18n-lite
## playground/react-vite-spa-auth-lite
## playground/react-vite-spa

> spa 開發模板，已寫好 i18n 語法，如果項目不需要需要自行砍代碼，可察看以下教學

### 目錄結構

```shell
├─ build-script # 建制腳本，目前只用來進行版號轉換
├─ public # vite 預設的資源路徑
├─ src # 主目錄
│  ├─ components # 頁面用的組件目錄
│  ├─ core # 路由、身份等全局處理目錄
│  ├─ enums # 全局用的 enums(建議使用 declareEnum 撰寫)
│  ├─ hooks # 頁面用的鉤子函數
│  ├─ lib # 頁面用的非鉤子通用函數
│  └─ pages # 頁面目錄
├─ .env # 通用環境變量
├─ .env.development # 開發用環境變量
├─ .env.master # 正式線用環境變量
├─ .env.qa # 測試線用環境變量
├─ .gitignore
├─ .prettierrc
├─ .README.md
├─ .idea.config.js # 因為主要用 jetbrains 全家桶開發，這是用來配置 vite alias 給 ide 知道
├─ index.html
├─ package.json # 建議使用 pnpm 安裝
├─ postcss.config.js
├─ tailwind.config.js # 基本上配置同 antd 色系，預設 v3，所以全面使用 JIT
└─ vite.config.js # vite 配置
```

### core/app.jsx

預設有這幾隻 Provider：`I18nProvider` > `HttpProvider` > `AuthProvider` > `AuthHttpProvider`，使用 `useContextSelector` 撰寫

### 路由使用

> 路徑為 `src/core/routes.jsx `，全頁面路由統一放置於此，比較好管理，其中分別提供了四個路由方法，分別是`withPrivateRoute`, `withRoute`, `withSuspensePrivateRoute`, `withSuspenseRoute`，後兩者是前兩者的 Suspense 版本，通常選擇後者

* `withPrivateRoute` 創建私有路由，會透過 auth 驗證
* `withRoute` 創建公共路由

|
