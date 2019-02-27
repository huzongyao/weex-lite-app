<template>
  <div>
    <text>123</text>
  </div>
</template>

<script>
  const geoLocation = weex.requireModule('location');

  export default {
    name: "weather-main",
    mounted() {
      if (geoLocation) {
        geoLocation.getLocation({}, res => {
          this.$alert(res);
        });
      } else {

      }
    }
  }
</script>

<style scoped>

</style>
