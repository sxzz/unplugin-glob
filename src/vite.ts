/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { Glob } from './index.ts'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Glob from 'unplugin-glob/vite'
 *
 * export default defineConfig({
 *   plugins: [Glob()],
 * })
 * ```
 */
const vite = Glob.vite as typeof Glob.vite
export default vite
export { vite as 'module.exports' }
