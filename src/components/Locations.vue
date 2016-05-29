<template>
  <div class="locations" :class="{'locations--closed': closed}">
    <button v-on:click="closed = !closed" class="locations__close"></button>
    <div class="locations__panel">
      <h1>{{ 'locations'|t }} ({{ locations.length }})</h1>
      <div v-for="location in locations">
        <location :location="location"></location>
      </div>
    </div>
  </div>
</template>

<script>
import Location from './Location.vue'

export default {
  data () {
    return {
      closed: false
    }
  },

  props: ['locations'],

  components: {
    Location
  }
}
</script>

<style lang="scss">
.mapblok {
  .locations {
    -webkit-box-shadow: 5px 0px 8px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow:    5px 0px 8px 0px rgba(0, 0, 0, 0.3);
    box-shadow:         5px 0px 8px 0px rgba(0, 0, 0, 0.3);
    opacity: 0.9;
    position: absolute;
    left: 0;
    width: 300px;
    z-index: 100;
    background-color: #FFF;
    height: 100%;
    transition: left 0.4s;

    h1 {
      font-size: 18px;
      padding: 10px 15px;
    }
  }

  .locations--closed.locations {
    left: -300px;

    .locations__close {
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
    }
  }

  .locations__panel {
    overflow: auto;
    height: 100%;
  }

  .locations__close {
    background: rgba(255, 255, 255, 1) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAQAAAAXDMSnAAAAi0lEQVR4AX3JQcqBURQG4O/+9WNG30D3vOfSDTuQsgcZyBakZANSzMVMBme3zsBI5/VMn4ZKLP5ki1E4tYejWpilxVUtzOEUD68odYmXR5BJNp/4zllXD2phllYvamHmirsayUkfJ5ruHzueTldC08kcT5YOY9xYujqQM03XKXuaLmEtNF1e1Nz89gbL+0do6OEwRwAAAABJRU5ErkJggg==) 7px center/7px 10px no-repeat;
    width: 23px;
    height: 48px;
    cursor: pointer;
    border-left: 1px solid #D4D4D4;
    box-shadow: 3px 1px 4px rgba(0, 0, 0, 0.3);
    position: absolute;
    right: -23px;
    top: 15px;
    z-index: 99;
  }
}
</style>
