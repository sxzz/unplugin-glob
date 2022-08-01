/* eslint-disable */
declare global {
  namespace GlobExport {
    type ExportsImportAll0 = typeof import('./mod/a') & typeof import('./mod/b');
  }
}

export {}