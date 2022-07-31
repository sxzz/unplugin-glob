/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="glob-global.d.ts" />
declare module 'glob/./exclude-self.j*' {
}
declare module 'glob/./mod/*' {
  export const a: GlobExport.Exports1['a']
  export const foo: GlobExport.Exports1['foo']
}
declare module 'glob/./mod/*.ts' {
  export const a: GlobExport.Exports2['a']
  export const foo: GlobExport.Exports2['foo']
}
declare module 'glob/./mod/**' {
  export const a: GlobExport.Exports3['a']
  export const foo: GlobExport.Exports3['foo']
}
