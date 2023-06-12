import path from 'node:path'
import { type FilterPattern } from '@rollup/pluginutils'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern | undefined
  dts?: boolean | string
  root?: string
}

export type OptionsResolved = Omit<Required<Options>, 'dts'> & {
  dts: string | false
}

export function resolveOption(options: Options): OptionsResolved {
  const root = options.root ?? process.cwd()

  let dts: string | false
  if (options.dts === true) dts = path.resolve(root, 'glob')
  else dts = options.dts ?? false

  return {
    include: options.include || [/\.m?[jt]sx?$/],
    exclude: options.exclude || [/\.d\.ts$/],
    dts,
    root,
  }
}
