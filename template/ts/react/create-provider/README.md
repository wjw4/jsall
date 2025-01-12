create-provider
===

> 有類型推斷的 react context

```typescript jsx
// 如範例，應該不用解釋了
const { useProvider, Provider } = createProvider(() => {
  const [count, setCount] = useState(0)
  
  return {
    count,
    setCount,
  }
})

function Counter () {
  const { count, setCount } = useProvider()
  
  return (
    <button onClick={() => setCount(e => e + 1)}>count: {count}</button>
  )
}

function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  )
}
```
