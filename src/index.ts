import path, { dirname } from 'node:path'
import { createFilter, normalizePath } from '@rollup/pluginutils'
import glob from 'fast-glob'
import { createUnplugin, type UnpluginOptions } from 'unplugin'
import { ID_PREFIX } from './core/constants'
import { writeTypeDeclaration } from './core/dts'
import { resolveOption, type Options } from './core/options'

export type GlobMap = Record<string /* name:pattern */, string[]>

const name = 'unplugin-glob'
const DRIVER_DIVIDER = '[DRIVER_DIVIDER]'
const DRIVER_DIVIDER_REGEXP = /\[DRIVER_DIVIDER\]/g

export default createUnplugin<Options>((options = {}) => {
  const opt = resolveOption(options)
  const filter = createFilter(opt.include, opt.exclude)
  const map: GlobMap = {}

  const resolveId = (id: string, src: string | undefined) => {
    if (!src || !filter(src)) return

    const [name, pattern] = id.replace(ID_PREFIX, '').split(':', 2)
    return `${ID_PREFIX}${name}:${src.replaceAll(
      ':',
      DRIVER_DIVIDER,
    )}:${pattern}`
  }

  const load = async (id: string) => {
    const [name, src, pattern] = id.replace(ID_PREFIX, '').split(':', 3)
    const filename = src.replaceAll(DRIVER_DIVIDER_REGEXP, ':')

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
  }

  const context: UnpluginOptions = {
    name,

    resolveId(id, importer) {
      if (!id.startsWith(ID_PREFIX)) return
      return resolveId(id, importer)
    },
    load(id) {
      if (!id.startsWith(ID_PREFIX)) return
      return load(id)
    },

    vite: {
      configResolved(config) {
        opt.root = config.root
      },
    },

    esbuild: {
      setup(build) {
        build.onResolve(
          { filter: new RegExp(`^${ID_PREFIX}`) },
          ({ path, importer }) => {
            const id = resolveId(path, importer)
            if (id) return { path: id, namespace: name }
          },
        )

        build.onLoad(
          { filter: new RegExp(`^${ID_PREFIX}`), namespace: name },
          async ({ path }) => {
            // eslint-disable-next-line unused-imports/no-unused-vars
            const [_, src] = path.replace(ID_PREFIX, '').split(':', 2)
            return {
              contents: await load(path),
              resolveDir: dirname(src),
            }
          },
        )
      },
    },
  }

  return context
})
