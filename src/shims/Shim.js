/**
 * Loads variable from window according to
 * the name parameter.
 *
 * @export
 * @param {string} name
 * @returns {*} window[name]
 */
export default function (name) {
  let global = window
  return global[name]
}
