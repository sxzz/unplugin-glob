declare global {
  namespace GlobExport {
    type ExportsExcludeSelf0 = {};
    type ExportsExcludeSelf1 = typeof import('./mod/a') & typeof import('./mod/b');
  }
}

export {}