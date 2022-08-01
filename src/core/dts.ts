import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getExportsStatic } from 'pkg-exports'
import { ID_PREFIX } from './constants'
import { pascalCase } from './utils'
import type { GlobMap } from '..'

export async function getTypeDeclaration(map: GlobMap, filename: string) {
  function relatePath(filepath: string) {
    return path.relative(path.dirname(filename), filepath)
  }

  const globalPath = relatePath(`${filename}-global.d.ts`)

  let global = `declare global {
  namespace GlobExport {\n`

  let declare = `/* eslint-disable */
/// <reference path="${globalPath}" />\n`

  const sortedEntries = Object.entries(map).sort(([a], [b]) =>
    a.localeCompare(b)
  )

  for (const [idx, [id, files]] of sortedEntries.entries()) {
    const name = pascalCase(id.split(':')[0])
    const globalName = `Exports${name}${idx}`

    const exports = (
      await Promise.all(files.map((file) => getExportsStatic(`file://${file}`)))
    ).flat()

    let typing = files
      .map((file) => {
        const relative = `./${relatePath(file)}`.replace(/\.ts$/, '')
        return `typeof import('${relative}')`
      })
      .join(' & ')
    if (typing.length === 0) typing = '{}'

    global += `    type ${globalName} = ${typing};\n`

    if (id.split('*').length > 2) {
      declare += `// @ts-expect-error\n`
    }

    declare += `declare module '${ID_PREFIX}${id}' {\n`
    for (const exportName of exports) {
      declare += `  export const ${exportName}: GlobExport.${globalName}['${exportName}']\n`
    }
    declare += `}\n`
  }

  global += `  }\n}\n\nexport {}`

  return { global, declare }
}

export async function writeTypeDeclaration(map: GlobMap, filename: string) {
  const { global, declare } = await getTypeDeclaration(map, filename)
  await writeFile(`${filename}.d.ts`, declare, 'utf-8')
  await writeFile(`${filename}-global.d.ts`, global, 'utf-8')
}
