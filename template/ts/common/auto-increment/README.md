auto-increment
===

> 自增值

```typescript
// 數字版(就數字自增而已)
const numId = autoIncrement(0)
console.log(numId.value) // 0
console.log(numId.next()) // 1
console.log(numId.value) // 1
console.log(numId.next()) // 2
console.log(numId.next()) // 3


// 字串版，傳入的是字串，運行方式看下面應該就懂了
const enId = autoIncrement('ab')
console.log(enId.value) // a
console.log(enId.next()) // b
console.log(enId.next()) // aa
console.log(enId.next()) // ab
console.log(enId.next()) // ba
console.log(enId.next()) // bb
console.log(enId.next()) // aaa
console.log(enId.next()) // aab
// ...
```
