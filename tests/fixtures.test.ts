import { rolldownBuild, testFixtures } from '@sxzz/test-utils'
import { describe } from 'vitest'
import RolldownPlugin from '../src/rolldown.ts'

describe('fixtures', async () => {
  await testFixtures(
    './fixtures/*.{js,ts}',
    async (args, id) => {
      const { snapshot } = await rolldownBuild(id, [RolldownPlugin()])
      return snapshot
    },
    { cwd: import.meta.dirname, promise: true },
  )
})
