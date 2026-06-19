/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { Glob } from './index.ts'

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import Glob from 'unplugin-glob/rollup'
 *
 * export default {
 *   plugins: [Glob()],
 * }
 * ```
 */
const rollup = Glob.rollup as typeof Glob.rollup
export default rollup
export { rollup as 'module.exports' }
