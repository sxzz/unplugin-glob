/* eslint-disable */
/// <reference path="ts-glob-global.d.ts" />
// @ts-expect-error
declare module 'glob:./mod/**' {
  export const a: GlobExport.Exports0['a']
  export const foo: GlobExport.Exports0['foo']
}
