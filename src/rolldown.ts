/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { Glob } from './index.ts'

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import Glob from 'unplugin-glob/rolldown'
 *
 * export default {
 *   plugins: [Glob()],
 * }
 * ```
 */
const rolldown = Glob.rolldown as typeof Glob.rolldown
export default rolldown
export { rolldown as 'module.exports' }
