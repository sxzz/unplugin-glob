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
  namespace GlobExport {
`
  let declare = `/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="${globalPath}" />\n`

  for (const [idx, [id, files]] of Object.entries(map).entries()) {
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

    declare += `declare module 'export-glob/${id}' {\n`
    for (const exportName of exports) {
      declare += `  export const ${exportName}: GlobExport.${globalName}['${exportName}']\n`
    }
    declare += `}\n`
  }

  global += `  }\n}\n\nexport {}`

  return { global, declare }
}
