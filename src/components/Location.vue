<script>
import EventBus from '../libs/EventBus'
import Location from './Location.html'
import Util from '../libs/Util'

export default {
  template: Util.template('#mapblok-location', Location),

  props: ['location'],

  methods: {
    showLocation () {
      EventBus.$emit('show-location', this.location)
    }
  }
}
</script>

<style lang="scss">
.mapblok {
  .location {
    padding: 0 15px 15px 15px;
    border-bottom: 1px solid #CCC;
    margin-bottom: 15px;
    font-size: 14px;
  }

  .location__name {
    font-weight: bold;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .location__contact {
    margin: 10px 0;
  }
}
</style>
