<template>
  <div class="location">
    <div @click="showLocation" class="location__name">{{ location.name }}</div>
    <div v-if="location.address">{{ location.address }}</div>
    <span v-if="location.zip">{{ location.zip }}, </span><span v-if="location.city">{{ location.city }}<br></span>
    <div v-if="location.country">{{ location.country }}</div>

    <div class="location__contact">
      <div v-if="location.phone_number">{{ location.phone_number }}</div>
      <div v-if="location.website">{{ location.website }}</div>
    </div>

    <div class="location__features">
      {{{ location.interior_designer|displayIfTrue 'interior_designer' }}}
      {{{ location.speciality_shop_for_bath|displayIfTrue 'speciality_shop_for_bath' }}}
      {{{ location.lifestyle_store|displayIfTrue 'lifestyle_store' }}}
      {{{ location.speciality_shop_for_textiles|displayIfTrue 'speciality_shop_for_textiles' }}}
      {{{ location.furniture_store|displayIfTrue 'furniture_store' }}}
    </div>
  </div>
</template>

<script>
import EventBus from '../libs/EventBus'

export default {
  props: ['location'],

  methods: {
    showLocation () {
      EventBus.$emit('show-location', this.location)
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
