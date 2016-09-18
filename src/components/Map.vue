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
import Debounce from '../libs/Debounce'
import MarkerClusterer from 'node-js-marker-clusterer'

export default {
  data () {
    return {
      center: { lat: 48.2, lng: 16.3667 },
      centerLatLng: null,
      activeLocation: {}
    }
  },

  props: ['locations'],

  ready () {
    EventBus.$on('app:settings-loaded', this.initMap.bind(this))
    EventBus.$on('search-address', this.searchAddress)
    EventBus.$on('show-location', this.showLocation)
  },

  components: {
    InfoWindow
  },

  methods: {

    showLocation (location) {
      let marker = this.markers[location.index]

      this.activeLocation = location
      this.map.setZoom(12)
      this.$nextTick(() => {
        this.openInfoBox(marker)
      })
    },

    searchAddress (term) {
      Ajax().get('//maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(term) + '&sensor=false').then(function (res, xhr) {
        if (xhr.status === 200 && res.results.length > 0) {
          let geo = res.results[0].geometry
          let lat = geo.location.lat
          let lng = geo.location.lng
          this.centerLatLng = new google.maps.LatLng(lat, lng)

          this.map.setCenter(this.centerLatLng)

          var resultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(geo.viewport.southwest.lat, geo.viewport.southwest.lng),
            new google.maps.LatLng(geo.viewport.northeast.lat, geo.viewport.northeast.lng)
          )

          this.map.fitBounds(resultBounds)
          this.getMarkesInBound()
          EventBus.$emit('map:search-completed')
        }
      }.bind(this))
    },

    calcDistance (from, to, unit) {
      var lat1 = from.lat()
      var lon1 = from.lng()
      var lat2 = to.lat()
      var lon2 = to.lng()
      var radlat1 = Math.PI * lat1 / 180
      var radlat2 = Math.PI * lat2 / 180
      var theta = lon1 - lon2
      var radtheta = Math.PI * theta / 180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      dist = Math.acos(dist)
      dist = dist * 180 / Math.PI
      dist = dist * 60 * 1.1515
      if (unit === 'K') { dist = dist * 1.609344 }
      if (unit === 'N') { dist = dist * 0.8684 }
      return dist
    },

    calcDistances () {
      for (var i = 0; i < this.markers.length; i++) {
        let distance = this.calcDistance(this.markers[i].position, this.centerLatLng)
        this.locations[this.markers[i].markerIndex].distance = distance
      }
    },

    getMarkesInBound () {
      Debounce('map:markers', () => {
        for (var i = 0; i < this.markers.length; i++) {
          let markerIndex = this.markers[i].markerIndex

          if (this.map.getBounds().contains(this.markers[i].getPosition())) {
            this.locations[markerIndex].visible = true
          } else {
            this.locations[markerIndex].visible = false
          }
        }
        this.centerLatLng = this.map.getCenter()
        this.calcDistances()
      }, 500)
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

      google.maps.event.addListener(this.map, 'bounds_changed', this.getMarkesInBound)
    },

    initCurrentLocation () {
      Ajax().post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD4ZfhoBtF5b3uGP0GvEmGX96finxbSxkc').then(function (res) {
        this.currentLocation = res.location
        this.centerLatLng = new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng)
        this.map.setCenter(this.centerLatLng)
        this.calcDistances()
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
          icon: icon,
          markerIndex: i
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
