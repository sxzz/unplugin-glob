import path from 'node:path'
import { build } from 'esbuild'
import glob from 'fast-glob'
import { rollup } from 'rollup'
import Esbuild from 'rollup-plugin-esbuild'
import { describe, expect, test } from 'vitest'
import EsBuildPlugin from '../src/esbuild'
import RollupPlugin from '../src/rollup'

describe('resolve', async () => {
  const fixtures = await glob(['./fixtures/*.{js,ts}', '!**/*.d.ts'], {
    absolute: true,
    cwd: __dirname,
  })
  for (const fixture of fixtures) {
    const ext = path.extname(fixture)
    const filename = path.basename(fixture, ext)

    test(`Rollup: ${filename}`, async () => {
      const bundle = await rollup({
        input: fixture,
        treeshake: false,
        plugins: [
          RollupPlugin({
            dts: path.resolve(path.dirname(fixture), `${filename}-glob`),
          }),
          Esbuild(),
        ],
      })
      const { output } = await bundle.generate({})
      expect(output[0].code).toMatchSnapshot()
    })

    test(`esbuild: ${filename}`, async () => {
      const bundle = await build({
        entryPoints: [fixture],
        treeShaking: false,
        bundle: true,
        write: false,
        plugins: [
          EsBuildPlugin({
            dts: path.resolve(path.dirname(fixture), `${filename}-glob`),
          }),
        ],
      })
      const { outputFiles } = bundle
      expect(outputFiles[0].text).toMatchSnapshot()
    })
  }
})
