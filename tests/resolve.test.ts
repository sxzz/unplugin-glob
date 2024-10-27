import path from 'node:path'
import glob from 'fast-glob'
import { rollup } from 'rollup'
import Esbuild from 'rollup-plugin-esbuild'
import { describe, expect, test } from 'vitest'
import Plugin from '../src/rollup'

describe('resolve', async () => {
  const fixtures = await glob(['./fixtures/*.{js,ts}', '!**/*.d.ts'], {
    absolute: true,
    cwd: __dirname,
  })
  for (const fixture of fixtures) {
    const ext = path.extname(fixture)
    const filename = path.basename(fixture, ext)

    test(filename, async () => {
      const bundle = await rollup({
        input: fixture,
        treeshake: false,
        plugins: [
          Plugin({
            dts: path.resolve(path.dirname(fixture), `${filename}-glob`),
          }),
          Esbuild(),
        ],
      })
      const { output } = await bundle.generate({})
      expect(output[0].code).toMatchSnapshot()
    })
  }
})
