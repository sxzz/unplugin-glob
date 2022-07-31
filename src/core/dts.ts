import path from 'node:path'
import { getExportsStatic } from 'pkg-exports'

export async function getTypeDeclaration(
  map: Record<string, string[]>,
  root: string
) {
  function relatePath(filepath: string) {
    return path.relative(path.dirname(root), filepath)
  }

  const globalPath = relatePath(`${root}-global.d.ts`)

  let global = `declare global {
  namespace GlobExport {\n`

  let declare = `/* eslint-disable */
/// <reference path="${globalPath}" />\n`

  const sortedEntries = Object.entries(map).sort(([a], [b]) =>
    a.localeCompare(b)
  )

  for (const [idx, [id, files]] of sortedEntries.entries()) {
    const globalName = `Exports${idx}`

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

    declare += `declare module 'glob/${id}' {\n`
    for (const exportName of exports) {
      declare += `  export const ${exportName}: GlobExport.${globalName}['${exportName}']\n`
    }
    declare += `}\n`
  }

  global += `  }\n}\n\nexport {}`

  return { global, declare }
}
