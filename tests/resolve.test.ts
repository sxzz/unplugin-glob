import { describe, expect, test } from 'vitest'
import { rollup } from 'rollup'
import glob from 'fast-glob'
import Plugin from '../src/rollup'

describe('resolve', async () => {
  const fixtures = await glob('./fixtures/*', {
    absolute: true,
    cwd: __dirname,
  })
  for (const fixture of fixtures) {
    test(fixture, async () => {
      const bundle = await rollup({
        input: fixture,
        plugins: [Plugin()],
      })
      const { output } = await bundle.generate({})
      expect(output[0].code).toMatchSnapshot()
    })
  }
})
