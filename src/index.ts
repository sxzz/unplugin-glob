import path from 'node:path'
import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import glob from 'fast-glob'
import { resolveOption } from './core/options'
import { parsePattern } from './core/utils'
import type { Options } from './core/options'

export default createUnplugin<Options>((options = {}) => {
  const opt = resolveOption(options)
  const filter = createFilter(opt.include, opt.exclude)
  const root = process.cwd()

  const name = 'unplugin-export'
  return {
    name,
    enforce: undefined,

    resolveId(id, src) {
      if (!src || !filter(src)) return
      const [pattern, rawQuery] = id.split(`?`, 2)
      if (rawQuery !== 'glob') return
      return `/export-glob${src}?pattern=${pattern}`
    },

    async load(id) {
      if (!id.startsWith('/export-glob')) return

      const { src, pattern } = parsePattern(id.replace('/export-glob', ''))

      const files = await glob(pattern, {
        cwd: src ? path.dirname(src) : root,
        absolute: true,
      })

      const contents = files
        .map((file) => {
          return `export * from '${file}'`
        })
        .join('\n')

      return `${contents}\n`
    },
  }
})
