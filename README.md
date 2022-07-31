# unplugin-export [![npm](https://img.shields.io/npm/v/unplugin-export.svg)](https://npmjs.com/package/unplugin-export)

[![Unit Test](https://github.com/sxzz/unplugin-export/actions/workflows/unit-test.yml/badge.svg)](https://github.com/sxzz/unplugin-export/actions/workflows/unit-test.yml)

Starter template for [unplugin](https://github.com/unjs/unplugin).

## Installation

```bash
npm i unplugin-export
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginExport from 'unplugin-export/vite'

export default defineConfig({
  plugins: [UnpluginExport()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginExport from 'unplugin-export/rollup'

export default {
  plugins: [UnpluginExport()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [require('unplugin-export/esbuild')()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [require('unplugin-export/webpack')()],
}
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [require('unplugin-export/webpack')()],
  },
}
```

<br></details>

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [三咲智子](https://github.com/sxzz)
