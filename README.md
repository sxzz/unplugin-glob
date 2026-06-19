# unplugin-glob

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Imports or exports files using glob match for ES Module.

# Features

- ⚡️ Supports Vite, Rollup, and Rolldown, powered by [unplugin](https://github.com/unjs/unplugin).
- 🦾 Full TypeScript support.

## Usage

```ts
import * as mods from './some-path/*.js'
console.log(mods.foo)

export * from './some-path/**'
```

## Installation

```bash
npm i -D unplugin-glob
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-glob/vite'

export default defineConfig({
  plugins: [Starter()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-glob/rollup'

export default {
  plugins: [Starter()],
}
```

<br></details>

<details>
<summary>Rolldown / tsdown</summary><br>

```ts
// rolldown.config.ts / tsdown.config.ts
import Starter from 'unplugin-glob/rolldown'

export default {
  plugins: [Starter()],
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

[MIT](./LICENSE) License © 2025-PRESENT [Kevin Deng](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-glob.svg
[npm-version-href]: https://npmjs.com/package/unplugin-glob
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-glob
[npm-downloads-href]: https://www.npmcharts.com/compare/unplugin-glob?interval=30
[unit-test-src]: https://github.com/sxzz/unplugin-glob/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/sxzz/unplugin-glob/actions/workflows/unit-test.yml
