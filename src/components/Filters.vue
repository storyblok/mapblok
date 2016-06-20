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
      background: #CCC url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ3NS4wODQgNDc1LjA4NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc1LjA4NCA0NzUuMDg0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQ2NC41MjQsNDEyLjg0NmwtOTcuOTI5LTk3LjkyNWMyMy42LTM0LjA2OCwzNS40MDYtNzIuMDQ3LDM1LjQwNi0xMTMuOTE3YzAtMjcuMjE4LTUuMjg0LTUzLjI0OS0xNS44NTItNzguMDg3ICAgYy0xMC41NjEtMjQuODQyLTI0LjgzOC00Ni4yNTQtNDIuODI1LTY0LjI0MWMtMTcuOTg3LTE3Ljk4Ny0zOS4zOTYtMzIuMjY0LTY0LjIzMy00Mi44MjYgICBDMjU0LjI0Niw1LjI4NSwyMjguMjE3LDAuMDAzLDIwMC45OTksMC4wMDNjLTI3LjIxNiwwLTUzLjI0Nyw1LjI4Mi03OC4wODUsMTUuODQ3Qzk4LjA3MiwyNi40MTIsNzYuNjYsNDAuNjg5LDU4LjY3Myw1OC42NzYgICBjLTE3Ljk4OSwxNy45ODctMzIuMjY0LDM5LjQwMy00Mi44MjcsNjQuMjQxQzUuMjgyLDE0Ny43NTgsMCwxNzMuNzg2LDAsMjAxLjAwNGMwLDI3LjIxNiw1LjI4Miw1My4yMzgsMTUuODQ2LDc4LjA4MyAgIGMxMC41NjIsMjQuODM4LDI0LjgzOCw0Ni4yNDcsNDIuODI3LDY0LjIzNGMxNy45ODcsMTcuOTkzLDM5LjQwMywzMi4yNjQsNjQuMjQxLDQyLjgzMmMyNC44NDEsMTAuNTYzLDUwLjg2OSwxNS44NDQsNzguMDg1LDE1Ljg0NCAgIGM0MS44NzksMCw3OS44NTItMTEuODA3LDExMy45MjItMzUuNDA1bDk3LjkyOSw5Ny42NDFjNi44NTIsNy4yMzEsMTUuNDA2LDEwLjg0OSwyNS42OTMsMTAuODQ5ICAgYzkuODk3LDAsMTguNDY3LTMuNjE3LDI1LjY5NC0xMC44NDljNy4yMy03LjIzLDEwLjg0OC0xNS43OTYsMTAuODQ4LTI1LjY5M0M0NzUuMDg4LDQyOC40NTgsNDcxLjU2Nyw0MTkuODg5LDQ2NC41MjQsNDEyLjg0NnogICAgTTI5MS4zNjMsMjkxLjM1OGMtMjUuMDI5LDI1LjAzMy01NS4xNDgsMzcuNTQ5LTkwLjM2NCwzNy41NDljLTM1LjIxLDAtNjUuMzI5LTEyLjUxOS05MC4zNi0zNy41NDkgICBjLTI1LjAzMS0yNS4wMjktMzcuNTQ2LTU1LjE0NC0zNy41NDYtOTAuMzZjMC0zNS4yMSwxMi41MTgtNjUuMzM0LDM3LjU0Ni05MC4zNmMyNS4wMjYtMjUuMDMyLDU1LjE1LTM3LjU0Niw5MC4zNi0zNy41NDYgICBjMzUuMjEyLDAsNjUuMzMxLDEyLjUxOSw5MC4zNjQsMzcuNTQ2YzI1LjAzMywyNS4wMjYsMzcuNTQ4LDU1LjE1LDM3LjU0OCw5MC4zNkMzMjguOTExLDIzNi4yMTQsMzE2LjM5MiwyNjYuMzI5LDI5MS4zNjMsMjkxLjM1OHogICAiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K) 50% center/15px 15px no-repeat;
      content: "";
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
