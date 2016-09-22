<script>
import Locations from './components/Locations.vue'
import Filters from './components/Filters.vue'
import Maps from './components/Map.vue'
import Ajax from '@fdaciuk/ajax'
import Util from './libs/Util'
import EventBus from './libs/EventBus'
import App from './App.html'

export default {
  template: Util.template('#mapblok-app', App),

  data () {
    return {
      locations: [],
      filteredLocations: [],
      filters: [],
      checkedFilters: [],
      loading: true
    }
  },

  props: ['settings'],

  components: {
    Locations,
    Maps,
    Filters
  },

  watch: {
    'checkedFilters' () {
      this.runFilter()
    }
  },

  ready () {
    Ajax().get(this.settings.markers).then((res) => {
      this.locations = Util.map(res)
      this.runFilter()
      EventBus.$emit('app:markers-loaded')
    })

    Ajax().get(this.settings.settings).then((res) => {
      this.$root.config = res
      this.$root.translations = res.translations[this.settings.language]
      this.filters = res.filters
      this.loading = false
      EventBus.$emit('app:settings-loaded')
    })

    EventBus.$on('map:search-completed', this.runFilter)
  },

  methods: {
    runFilter () {
      this.filteredLocations = this.locations.filter(loc => {
        if (this.checkedFilters.length === 0) {
          return true
        }

        for (var i = 0; i < this.checkedFilters.length; i++) {
          if (loc[this.checkedFilters[i]] === 'Y' || loc[this.checkedFilters[i]] === true || loc[this.checkedFilters[i]] === '1' || loc[this.checkedFilters[i]] === 1) {
            return true
          }
        }

        return false
      })
    }
  }
}
</script>

<style lang="scss">

.mapblok {
  position: relative;

  button, input {
    // Reset button styles
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font: inherit;
    vertical-align: baseline;
    list-style: none;
  }
}

.mapblok__loading {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  position: absolute;
  background: #FFF;

  > div {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    > div {
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.3);
      margin: 0 auto;
      -webkit-animation: rotateplane 1.2s infinite ease-in-out;
      animation: rotateplane 1.2s infinite ease-in-out;
    }
  }
}

.mapblok__map {
  height: 600px;
  overflow: hidden;
  position: relative;
}

@-webkit-keyframes rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

</style>
