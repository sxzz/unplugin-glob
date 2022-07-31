import path from 'node:path'
import { writeFile } from 'node:fs/promises'
import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import glob from 'fast-glob'
import { resolveOption } from './core/options'
import { parsePattern } from './core/utils'
import { getTypeDeclaration } from './core/dts'
import type { Options } from './core/options'

export default createUnplugin<Options>((options = {}) => {
  const opt = resolveOption(options)
  const filter = createFilter(opt.include, opt.exclude)
  const root = process.cwd()

  const map: Record<string, string[]> = {}

  const name = 'unplugin-export'
  return {
    name,
    enforce: undefined,

    resolveId(id, src) {
      if (!src || !filter(src)) return
      if (!id.startsWith('export-glob/')) return
      const pattern = id.replace('export-glob/', '')
      return `/export-glob${src}?pattern=${pattern}`
    },

    async load(id) {
      if (!id.startsWith('/export-glob')) return

      const { src, pattern } = parsePattern(id.replace('/export-glob', ''))

      const files = (
        await glob(pattern, {
          cwd: src ? path.dirname(src) : root,
          absolute: true,
        })
      ).filter((file) => file !== src)
      map[pattern] = files

      const contents = files.map((file) => `export * from '${file}'`).join('\n')

      return `${contents}\n`
    },

    async buildEnd() {
      if (!opt.dts) return
      if (opt.dts === true) opt.dts = path.resolve(root, 'export-glob')

      const { global, declare } = await getTypeDeclaration(map, opt.dts)
      await writeFile(`${opt.dts}.d.ts`, declare, 'utf-8')
      await writeFile(`${opt.dts}-global.d.ts`, global, 'utf-8')
    },
  }
})
