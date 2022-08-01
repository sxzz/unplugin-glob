/* eslint-disable */
/// <reference path="ts-glob-global.d.ts" />
// @ts-expect-error
declare module 'glob:ts:./mod/**' {
  export const a: GlobExport.ExportsTs0['a']
  export const foo: GlobExport.ExportsTs0['foo']
}
