import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { resolveOption } from './core/options'
import type { Options } from './core/options'

export default createUnplugin<Options>((options = {}) => {
  const opt = resolveOption(options)
  const filter = createFilter(opt.include, opt.exclude)

  const name = 'unplugin-export'
  return {
    name,
    enforce: undefined,

    transformInclude(id) {
      return filter(id)
    },

    transform(code, id) {
      // eslint-disable-next-line no-console
      console.log(code, id)
      return undefined
    },
  }
})
