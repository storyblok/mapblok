let queue = []
let timeout

export default function (id, func, wait, immediate) {
  if (queue.indexOf(id) > -1) {
    return
  }
  queue.push(id)

  var context = this
  var args = arguments
  var later = function () {
    timeout = null
    if (!immediate) func.apply(context, args)
    queue.splice(queue.indexOf(id), 1)
  }
  var callNow = immediate && !timeout
  clearTimeout(timeout)
  timeout = setTimeout(later, wait)
  if (callNow) func.apply(context, args)
}
