import type { FilterPattern } from '@rollup/pluginutils'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern | undefined
  dts?: boolean | string
  root?: string
}

export type OptionsResolved = Required<Options>

export function resolveOption(options: Options): OptionsResolved {
  return {
    include: options.include || [/\.m?[jt]sx?$/],
    exclude: options.exclude || [/\.d\.ts$/],
    dts: options.dts ?? false,
    root: options.root ?? process.cwd(),
  }
}
