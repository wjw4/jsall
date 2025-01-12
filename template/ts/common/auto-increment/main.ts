export type AutoIncrementInstance<T extends string | number> = {
  value: T
  next(): T
}

export const a_z = 'abcdefghijklmnopqrstuvwxyz'
export const A_Z = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const A_z = a_z + A_Z

export function autoIncrement<T extends string | number>(n: T): AutoIncrementInstance<T> {
  if (typeof n === 'number') {
    return {
      value: n,
      next() {
        ;(this.value as number)++
        return this.value
      },
    }
  }

  let idxes = [] as number[]
  let idx = 0

  return {
    value: n[0] as T,
    next() {
      if (idxes.length === 0) {
        idxes.push(0)
      } else {
        if (idxes[idx] + 1 === n.length) {
          if (idxes.length > 1) {
            for (let i = idx - 1; i >= 0; i--) {
              if (idxes[i] + 1 < n.length) {
                for (let j = i + 1; j < idxes.length; j++) {
                  idxes[j] = 0
                }
                idxes[i]++
                break
              } else if (i === 0) {
                idxes = Array((idx = idxes.length) + 1).fill(0)
              }
            }
          } else {
            idxes = Array((idx = idxes.length) + 1).fill(0)
          }
        } else {
          idxes[idx]++
        }
      }

      return idxes.reduce<string>((p, i) => p + n[i], '') as T
    },
  }
}
