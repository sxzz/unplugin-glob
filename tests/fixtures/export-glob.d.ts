/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="export-glob-global.d.ts" />
declare module 'export-glob/./mod/*.ts' {
  export const a: GlobExport.Exports0['a']
  export const foo: GlobExport.Exports0['foo']
}
declare module 'export-glob/./mod/*' {
  export const a: GlobExport.Exports1['a']
  export const foo: GlobExport.Exports1['foo']
}
declare module 'export-glob/./exclude-self.j*' {
}
