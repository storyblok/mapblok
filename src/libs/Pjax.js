/* eslint-disable */

let pjax = {
    currentScript: null,
    getJSON: function(url, data, callback) {
      var src = url + (url.indexOf("?")+1 ? "&" : "?")
      var head = document.getElementsByTagName("head")[0]
      var newScript = document.createElement("script")
      var params = []
      var param_name = ""

      this.success = callback

      data["callback"] = "Mapblok.Pjax.success"
      for(param_name in data){
          params.push(param_name + "=" + encodeURIComponent(data[param_name]))
      }
      src += params.join("&")

      newScript.type = "text/javascript"
      newScript.src = src

      if(this.currentScript) head.removeChild(currentScript)
      head.appendChild(newScript)
    },
    success: null
}

window.Mapblok.Pjax = pjax
export default pjax
