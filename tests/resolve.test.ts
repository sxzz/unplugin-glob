import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { rollup } from 'rollup'
import { build } from 'esbuild'
import glob from 'fast-glob'
import Esbuild from 'rollup-plugin-esbuild'
import RollupPlugin from '../src/rollup'
import EsBuildPlugin from '../src/esbuild'

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

    test(`EsBuild: ${filename}`, async () => {
      const bundle = await build({
        entryPoints: [fixture],
        treeShaking: false,
        bundle: true,
        write: false,
        plugins: [
          EsBuildPlugin({
            dts: path.resolve(path.dirname(fixture), `${filename}-glob`),
          }) as any,
        ],
      })
      const { outputFiles } = bundle
      expect(outputFiles[0].text).toMatchSnapshot()
    })
  }
})
