/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import { Glob } from './index.ts'

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.js
 * import Glob from 'unplugin-glob/farm'
 *
 * export default {
 *   plugins: [Glob()],
 * }
 * ```
 */
const farm = Glob.farm as typeof Glob.farm
export default farm
export { farm as 'module.exports' }
