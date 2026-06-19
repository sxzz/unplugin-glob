import { dirname } from 'node:path'
import { glob, isDynamicPattern } from 'tinyglobby'
import {
  createUnplugin,
  type UnpluginInstance,
  type UnpluginOptions,
} from 'unplugin'
import { createFilter } from 'unplugin-utils'
import { resolveOption, type Options } from './core/options.ts'

const name = 'unplugin-glob'
const GLOB_RE = /[*?[\]{}()!+@]/

export const Glob: UnpluginInstance<Options | undefined, false> =
  createUnplugin((rawOptions = {}) => {
    const options = resolveOption(rawOptions)
    const filter = createFilter(options.include, options.exclude)

    const context: UnpluginOptions = {
      name,
      resolveId: {
        filter: { id: GLOB_RE },
        handler(id, importer) {
          if (!importer || !filter(importer)) return
          if (!isDynamicPattern(id)) return
          return `${name}:${dirname(importer)}?${id}`
        },
      },
      load: {
        filter: {
          id: new RegExp(`^${name}:`),
        },
        async handler(id) {
          const [cwd, pattern] = id.slice(name.length + 1).split('?', 2)
          const files = await glob(pattern, {
            cwd,
            absolute: true,
          })
          return files
            .map((file) => `export * from ${JSON.stringify(file)}`)
            .join('\n')
        },
      },
    }

    return context
  })
