/* eslint-disable */
/// <reference path="exclude-self-glob-global.d.ts" />
declare module 'glob:./exclude-self.j*' {
}
declare module 'glob:./mod/*' {
  export const a: GlobExport.Exports1['a']
  export const foo: GlobExport.Exports1['foo']
}
