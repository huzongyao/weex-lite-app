<template>
  <div>
    <text>123</text>
  </div>
</template>

<script>
  const geoLocation = weex.requireModule('location');

  export default {
    name: "weather-main",
    data() {
      return {
        urls: {
          getCity: 'http://zhwnlapi.etouch.cn/Ecalender/api/city',
          getWeather: 'http://zhwnlapi.etouch.cn/Ecalender/api/v2/weather?citykey=101280605',
        },
      }
    },
    mounted() {
      if (geoLocation) {
        geoLocation.getLocation({}, res => {
          this.getCityInfo(res);
        });
      } else {
        this.getCityInfo(null);
      }
    },
    methods: {
      getCityInfo(location) {
        let la = '';
        let lo = '';
        if (location) {
          la = location.latitude;
          lo = location.longitude;
        }
        this.$get({
          url: this.urls.getCity,
          headers: {'user-agent': 'Android'},
          data: {lon: lo, lat: la, type: 'gps'},
        }).then(res => {
          this.$alert(res)
        }).catch(() => {
          this.$alert('456')
        })
      }
    }
  }
</script>

<style scoped>

</style>
