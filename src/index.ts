import path from 'node:path'
import { createUnplugin } from 'unplugin'
import { createFilter, normalizePath } from '@rollup/pluginutils'
import glob from 'fast-glob'
import { resolveOption } from './core/options'
import { parsePattern } from './core/utils'
import { writeTypeDeclaration } from './core/dts'
import type { Options } from './core/options'

export default createUnplugin<Options>((options = {}) => {
  const opt = resolveOption(options)
  const filter = createFilter(opt.include, opt.exclude)

  const map: Record<string, string[]> = {}

  const name = 'unplugin-glob'
  const ID_PREFIX = 'glob:'
  return {
    name,

    resolveId(id, src) {
      if (!src || !filter(src)) return
      if (!id.startsWith('glob/')) return
      const pattern = id.replace('glob/', '')
      return `${ID_PREFIX}${src}?pattern=${pattern}`
    },

    async load(id) {
      if (!id.startsWith(ID_PREFIX)) return

      const { src, pattern } = parsePattern(id.replace(ID_PREFIX, ''))

      const files = (
        await glob(pattern, {
          cwd: src ? path.dirname(src) : opt.root,
          absolute: true,
        })
      )
        .map((file) => normalizePath(file))
        .filter((file) => file !== src)
        .sort()
      map[pattern] = files

      const contents = files.map((file) => `export * from '${file}'`).join('\n')

      return `${contents}\n`
    },

    async buildEnd() {
      if (!opt.dts) return
      if (opt.dts === true) opt.dts = path.resolve(opt.root, 'glob')

      writeTypeDeclaration(map, opt.dts)
    },
  }
})
