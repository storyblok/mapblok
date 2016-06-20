<template>
  <div>
    <div class="map"></div>
    <div style="display:none;">
      <info-window :location="activeLocation" v-ref:info-window></info-window>
    </div>
  </div>
</template>

<script>
import EventBus from '../libs/EventBus'
import google from '../shims/Google'
import Ajax from '@fdaciuk/ajax'
import Config from '../Config'
import InfoWindow from './InfoWindow.vue'
import InfoBox from '../libs/InfoBox'
import MarkerClusterer from 'node-js-marker-clusterer'

export default {
  data () {
    return {
      center: { lat: 48.2, lng: 16.3667 },
      activeLocation: {}
    }
  },

  props: ['locations'],

  ready () {
    EventBus.$on('app:settings-loaded', this.initMap.bind(this))
    EventBus.$on('search-address', this.searchAddress)
    EventBus.$on('show-location', this.showLocation)
  },

  events: {
    'search-address' () {
      console.log('search')
    }
  },

  components: {
    InfoWindow
  },

  methods: {

    showLocation (location) {
      let marker = this.markers[location.index]

      this.activeLocation = location
      this.map.setZoom(14)
      this.$nextTick(() => {
        this.openInfoBox(marker)
      })
    },

    searchAddress (term) {
      Ajax().get('//maps.googleapis.com/maps/api/geocode/json?address=' + term + '&sensor=false').then(function (xhr) {
        let res = xhr.body

        if (xhr.status === 200 && res.results.length > 0) {
          let geo = res.results[0].geometry
          let lat = geo.location.lat
          let lng = geo.location.lng

          this.map.setCenter(new google.maps.LatLng(lat, lng))

          var resultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(geo.viewport.southwest.lat, geo.viewport.southwest.lng),
            new google.maps.LatLng(geo.viewport.northeast.lat, geo.viewport.northeast.lng)
          )

          this.map.fitBounds(resultBounds)
        }
      }.bind(this))
    },

    initMap () {
      this.$watch('locations', () => {
        if (this.locations.length > 0) {
          this.initMarkers()
        }
      })

      // init Google Maps itself
      this.map = new google.maps.Map(this.$el.getElementsByClassName('map')[0], {
        center: this.center,
        scrollwheel: false,
        styles: this.$root.config.style,
        zoom: 9,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      })

      // set to current Location according to IP
      this.initCurrentLocation()
      this.initInfoBox()
      this.initMarkers()
    },

    initCurrentLocation () {
      Ajax().get('//freegeoip.net/json/').then(function (res) {
        this.currentLocation = res
        this.map.setCenter(new google.maps.LatLng(this.currentLocation.latitude, this.currentLocation.longitude))
      }.bind(this))
    },

    initMarkers () {
      let icon = {
        url: Config.asset('static/images/icon.png'),
        size: new google.maps.Size(35, 30),
        scaledSize: new google.maps.Size(35, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17.5, 30)
      }

      this.markers = this.markers || []

      if (typeof this.markerClusterer !== 'undefined') {
        this.markerClusterer.clearMarkers()
      }

      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }

      this.markers = []

      for (let i = 0, max = this.locations.length; i < max; i++) {
        let currentMarkerData = this.locations[i]

        // Set index for easy access of markers later
        currentMarkerData.index = i

        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(currentMarkerData.latitude), parseFloat(currentMarkerData.longitude)),
          icon: icon
        })

        marker.addListener('click', () => {
          this.activeLocation = currentMarkerData
          this.$nextTick(() => {
            this.openInfoBox(marker)
          })
        })

        this.markers.push(marker)
      }

      this.markerClusterer = new MarkerClusterer(this.map, this.markers, {
        maxZoom: 13,
        styles: [{
          url: Config.asset('static/images/m1.png'),
          height: 52,
          width: 53,
          anchor: [22, 0],
          textColor: '#FFFFFF',
          textSize: 10
        }, {
          url: Config.asset('static/images/m2.png'),
          height: 55,
          width: 56,
          anchor: [23, 0],
          textColor: '#FFFFFF',
          textSize: 11
        }, {
          url: Config.asset('static/images/m3.png'),
          height: 65,
          width: 66,
          anchor: [28, 0],
          textColor: '#FFFFFF',
          textSize: 12
        }]
      })

      google.maps.event.trigger(this.map, 'resize')
    },

    openInfoBox (marker) {
      let html = this.$refs.infoWindow.$el.outerHTML
      this.infoBox.setContent(html)
      this.infoBox.open(this.map, marker)
    },

    initInfoBox () {
      this.infoBox = new InfoBox({
        disableAutoPan: false,
        maxWidth: 'auto',
        pixelOffset: new google.maps.Size(-120, 0),
        infoBoxClearance: new google.maps.Size(1, 1)
      })
    }
  }
}
</script>

<style lang="scss">
.mapblok {
  .map {
    height: 600px;
    line-height: 1;
  }
}
</style>
