<template>
  <div class="infobox">
    <strong>{{ location.name }}</strong><br>
    {{ location.address }}<br>
    {{ location.zip }}, {{ location.city }}<br>
    {{ location.country }}
    <div class="infobox__contact">
      <div v-if="location.phone_number">{{ location.phone_number }}</div>
      <div v-if="location.website"><a :href="location.website">{{ location.website }}</a></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['location']
}
</script>

<style lang="scss" scoped>
.infobox {
  background: #fff;
  height: auto;
  width: 210px;
  text-align: center;
  font-size: 17px;
  padding: 20px;
  font-size: 14px;
  -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow:    0px 0px 15px 0px rgba(0, 0, 0, 0.3);
  box-shadow:         0px 0px 15px 0px rgba(0, 0, 0, 0.3);
  line-height: 1.4;
}

.infobox__contact {
  margin-top: 10px;
}

.infobox__picture {
  max-width: 100%;
}

.infobox__company {
  font-weight: 300;
}
</style>
