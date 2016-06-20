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
import Ajax from '@fdaciuk/ajax'
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
    Ajax().get(this.settings.markers).then((res) => {
      this.locations = Util.map(res)
      this.runFilter()
    })

    Ajax().get(this.settings.settings).then((res) => {
      this.$root.config = res
      this.$root.translations = res.translations[this.settings.language]
      this.filters = res.filters
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
