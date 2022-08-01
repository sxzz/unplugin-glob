/* eslint-disable */
/// <reference path="import-all-glob-global.d.ts" />
// @ts-expect-error
declare module 'glob:import-all:./mod/**' {
  export const a: GlobExport.ExportsImportAll0['a']
  export const foo: GlobExport.ExportsImportAll0['foo']
}
