import * as all from 'glob:import-all:./mod/**'

console.log(all.a)
console.log(all.foo)

export * from 'glob:import-all:./mod/**'
