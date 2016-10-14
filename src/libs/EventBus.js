import Vue from 'vue'

let EventBus = new Vue({
  data () {
    return {
      settings: {},
      componentSettings: {}
    }
  },
  events: {
    'app:settings-loaded': function (value) {
      this.settings = value
    },
    'app:html-settings-set': function (value) {
      this.componentSettings = value
    }
  },
  methods: {
    emit (event, args) {
      console.log(event)
      this.$emit(event, args)
    }
  }
})
export default EventBus
