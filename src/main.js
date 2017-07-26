import Vue from 'vue'
import Mapblok from './App.vue'
import EventBus from './libs/EventBus'

Vue.filter('t', function (str) {
  return this.$root.translations[str]
})

Vue.filter('displayIfTrue', function (check, str) {
  if (check === 'Y' || check === true || check === 1 || check === '1') {
    return this.$root.translations[str] + '<br>'
  }
  return ''
})

/* eslint-disable no-new */
let Root = new Vue({
  data () {
    return {
      translations: {},
      config: {}
    }
  },
  el: 'body',
  components: { Mapblok }
})

window.Mapblok = {
  EventBus,
  Root
}
