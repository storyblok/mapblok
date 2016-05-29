<template>
  <div class="mapblok">
    <filters :checked-filters.sync="checkedFilters" :filters="filters" :locations.sync="locations"></filters>
    <div class="mapblok__map">
      <locations :locations="filteredLocations"></locations>
      <maps :locations="filteredLocations"></maps>
    </div>
  </div>
</template>

<script>
import Locations from './components/Locations.vue'
import Filters from './components/Filters.vue'
import Maps from './components/Map.vue'
import Ajax from 'fajax'
import Util from './libs/Util'

export default {
  data () {
    return {
      locations: [],
      filteredLocations: [],
      filters: [],
      checkedFilters: []
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
    Ajax.get(this.settings.markers).then((xhr) => {
      this.locations = Util.map(xhr.body)
      this.runFilter()
    })

    Ajax.get(this.settings.filters).then((xhr) => {
      this.filters = xhr.body
    })

    Ajax.get(this.settings.settings).then((xhr) => {
      let settings = xhr.body

      this.$root.translations = settings.translations[this.settings.language]
    })
  },

  methods: {
    runFilter () {
      this.filteredLocations = this.locations.filter(loc => {
        if (this.checkedFilters.length === 0) {
          return true
        }

        for (var i = 0; i < this.checkedFilters.length; i++) {
          if (loc[this.checkedFilters[i]] === 'Y' || loc[this.checkedFilters[i]] === true) {
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
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

.mapblok {
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

.mapblok__map {
  height: 600px;
  overflow: hidden;
  position: relative;
}
</style>
