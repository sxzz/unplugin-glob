declare global {
  namespace GlobExport {
    type ExportsTs0 = typeof import('./mod/a') & typeof import('./mod/b');
  }
}

export {}