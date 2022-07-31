import type { FilterPattern } from '@rollup/pluginutils'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern | undefined
}

export type OptionsResolved = Required<Options>

export function resolveOption(options: Options): OptionsResolved {
  return {
    include: options.include || [/\.[jt]sx?$/],
    exclude: options.exclude || undefined,
  }
}
