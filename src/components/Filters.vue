<template>
  <div class="filters">
    <div class="filters__search">
      <label>{{ 'search_placeholder'|t }}</label>
      <input placeholder="{{ 'search_placeholder'|t }}" class="filters__search-input" type="text" v-on:keyup.enter="doSearch" v-model="searchTerm">
      <button class="filters__search-btn" v-on:click="doSearch">{{ 'search'|t }}</button>
    </div>
    <div class="filters__cboxes">
      <div class="filters__label">{{ 'filter_by'|t }}</div>
      <div class="filters__cbox" v-for="filter in filters">
        <label><input type="checkbox" :value="filter.value" v-model="checkedFilters"> {{ filter.value|t }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../libs/EventBus'

export default {
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

    &:before {
      // Don't shrink or grow and use a default size
      flex: 0 0 2.75em;

      // Use flexbox to center the icon
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border-radius: 2px 0 0 2px;
      background: #ccc;
      font-family: 'FontAwesome';
      font-weight: normal;
      font-style: normal;
      color: #797979;
      content: "\f002";
    }
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
