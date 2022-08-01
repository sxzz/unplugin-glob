/* eslint-disable */
declare global {
  namespace GlobExport {
    type ExportsBasic0 = typeof import('./mod/a') & typeof import('./mod/b');
  }
}

export {}