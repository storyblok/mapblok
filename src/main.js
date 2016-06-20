import Vue from 'vue'
import Mapblok from './App.vue'

Vue.filter('t', function (str) {
  return this.$root.translations[str]
})

Vue.filter('displayIfTrue', function (check, str) {
  if (check === 'Y' || check === true || check === 1) {
    return this.$root.translations[str] + '<br>'
  }
  return ''
})

/* eslint-disable no-new */
new Vue({
  data () {
    return {
      translations: {},
      config: {}
    }
  },
  el: 'body',
  components: { Mapblok }
})
