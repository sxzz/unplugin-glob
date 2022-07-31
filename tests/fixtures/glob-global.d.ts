declare global {
  namespace GlobExport {
    type Exports0 = {};
    type Exports1 = typeof import('./mod/a') & typeof import('./mod/b');
    type Exports2 = typeof import('./mod/a') & typeof import('./mod/b');
    type Exports3 = typeof import('./mod/a') & typeof import('./mod/b');
  }
}

export {}