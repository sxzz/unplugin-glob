import path from 'node:path'
import { createUnplugin } from 'unplugin'
import { createFilter, normalizePath } from '@rollup/pluginutils'
import glob from 'fast-glob'
import { resolveOption } from './core/options'
import { writeTypeDeclaration } from './core/dts'
import { ID_PREFIX } from './core/constants'
import type { Options } from './core/options'

export type GlobMap = Record<string /* name:pattern */, string[]>

export default createUnplugin<Options>((options = {}) => {
  const opt = resolveOption(options)
  const filter = createFilter(opt.include, opt.exclude)

  const map: GlobMap = {}

  const name = 'unplugin-glob'
  return {
    name,

    resolveId(id, src) {
      if (!id.startsWith(ID_PREFIX)) return
      if (!src || !filter(src)) return

      const [name, pattern] = id.replace(ID_PREFIX, '').split(':', 2)
      return `${ID_PREFIX}${name}:${src.replace(
        /:/g,
        (s) => `\\${s}`
      )}:${pattern}`
    },

    async load(id) {
      if (!id.startsWith(ID_PREFIX)) return

      const [name, src, pattern] = id
        .replace(ID_PREFIX, '')
        .split(/(?<!\\):/, 3)
      const filename = src.replace(/\\:/g, ':')

      const files = (
        await glob(pattern, {
          cwd: filename ? path.dirname(filename) : opt.root,
          absolute: true,
        })
      )
        .map((file) => normalizePath(file))
        .filter((file) => file !== normalizePath(filename))
        .sort()
      map[`${name}:${pattern}`] = files

      const contents = files.map((file) => `export * from '${file}'`).join('\n')

      if (opt.dts) await writeTypeDeclaration(map, opt.dts)

      return `${contents}\n`
    },

    vite: {
      configResolved(config) {
        opt.root = config.root
      },
    },
  }
})
