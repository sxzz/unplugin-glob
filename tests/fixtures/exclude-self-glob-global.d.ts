declare global {
  namespace GlobExport {
    type Exports0 = {};
    type Exports1 = typeof import('./mod/a') & typeof import('./mod/b');
  }
}

export {}