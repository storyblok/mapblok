<script>
import EventBus from '../libs/EventBus'
import Filters from './Filters.html'

let template = Filters
if (document.querySelectorAll('#mapblok-filter').length > 0) {
  template = '#mapblok-filter'
}

export default {
  template: template,
  data () {
    return {
      searchTerm: ''
    }
  },

  props: ['locations', 'filters', 'checkedFilters'],

  methods: {
    doSearch () {
      EventBus.$emit('search-address', this.searchTerm)
    }
  }
}
</script>

<style lang="scss">
.mapblok {
  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

  .icon-search {
    width: 0.9501953125em;
  }

  .filters {
    padding: 20px;
  }

  .filters__cboxes {
    border-top: 1px solid #CCC;
    padding: 20px 0;
  }

  .filters__cbox,
  .filters__label {
    display: inline-block;
    margin-right: 20px;
  }

  .filters__search {
    display: flex;

    label {
      display: none;
    }

  }

  .filters__prefix {
    flex: 0 0 2.5em;
    border-radius: 2px 0 0 2px;
    background: #CCC;
    color: #FFF;

    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .filters__search-input,
  .filters__search-btn,
  .filters__search:before {
    padding: .35em .75em;
    border: none;
    font-size: 1.1rem;
    text-decoration: none;
  }

  .filters__search-input {
    flex: 1 0 8em;
    background: #e9e9e9;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:focus {
      background: #e9e9e9;
    }
  }

  .filters__search-btn {
    flex: 0 0 auto;

    border-radius: 0 2px 2px 0;
    background: #797979;
    font-weight: 300;
    text-transform: uppercase;
    color: #EDFFEC;
  }

  .filters__label {
    font-weight: bold;
  }

  .filters__search {
    padding: 20px 0;
  }
}
</style>
