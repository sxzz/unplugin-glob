import type { FilterPattern } from 'unplugin'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern | undefined
}

export type OptionsResolved = Required<Options>

export function resolveOption(options: Options): OptionsResolved {
  return {
    include: options.include || [/\.[cm]?[jt]sx?$/],
    exclude: options.exclude || [/node_modules/],
  }
}
