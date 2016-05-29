import shim from '../shims/Shim'

/**
 * Loads variable from window with the
 * name 'google'
 *
 * @export
 * @returns {*} window['google']
 */
let google = shim('google')
export default google
