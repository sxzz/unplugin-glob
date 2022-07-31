# unplugin-glob [![npm](https://img.shields.io/npm/v/unplugin-glob.svg)](https://npmjs.com/package/unplugin-glob)

[![Unit Test](https://github.com/sxzz/unplugin-glob/actions/workflows/unit-test.yml/badge.svg)](https://github.com/sxzz/unplugin-glob/actions/workflows/unit-test.yml)

Imports or exports files using glob match for ES Module.

## Installation

```bash
npm i unplugin-glob
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginGlob from 'unplugin-glob/vite'

export default defineConfig({
  plugins: [UnpluginGlob()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginGlob from 'unplugin-glob/rollup'

export default {
  plugins: [UnpluginGlob()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [require('unplugin-glob/esbuild')()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [require('unplugin-glob/webpack')()],
}
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [require('unplugin-glob/webpack')()],
  },
}
```

<br></details>

## Usage

```ts
import * as all from 'glob/./some-path/*.js'

console.log(all.sth)

export * from 'glob/./some-path/**'
```

## Configuration

```ts
AutoImport({
  // targets to resolve
  include: [/\.m?[jt]sx?$/],
  exclude: options.exclude || [/\.d\.ts$/],

  root: process.cwd(),

  // Filepath to generate corresponding .d.ts files.
  // Defaults to both './glob.d.ts' and 'glob-global.d.ts' when provided `true`.
  // Set `false` to disable.
  dts: false, // boolean or string
})
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [三咲智子](https://github.com/sxzz)
