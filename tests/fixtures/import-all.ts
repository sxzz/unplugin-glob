import * as all from 'glob:./mod/**'

console.log(all.a)
console.log(all.foo)

export * from 'glob:./mod/**'
