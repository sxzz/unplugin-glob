import path from 'node:path'
import { expect, test } from 'vitest'
import { rollup } from 'rollup'
import glob from 'fast-glob'
import Plugin from '../src/rollup'

test('resolve', async () => {
  const fixtures = await glob(['./fixtures/*.{js,ts}', '!**/*.d.ts'], {
    absolute: true,
    cwd: __dirname,
  })

  const bundle = await rollup({
    input: fixtures,
    plugins: [Plugin({ dts: path.resolve(__dirname, 'fixtures/glob') })],
  })
  const { output } = await bundle.generate({})
  expect(
    output.map((f) => {
      if (f.type === 'asset') return undefined
      else return f.code
    })
  ).toMatchSnapshot()
})
