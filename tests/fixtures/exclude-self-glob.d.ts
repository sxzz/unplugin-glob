/* eslint-disable */
/// <reference path="exclude-self-glob-global.d.ts" />
declare module 'glob:exclude-self:./exclude-self.j*' {
}
declare module 'glob:exclude-self:./mod/*' {
  export const a: GlobExport.ExportsExcludeSelf1['a']
  export const foo: GlobExport.ExportsExcludeSelf1['foo']
}
