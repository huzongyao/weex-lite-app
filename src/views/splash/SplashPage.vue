<template>
  <div style="background-color: #f5f5f5">
    <bui-icon name="ion-ios-bell" size=0></bui-icon>
  </div>
</template>

<script>
  export default {
    name: "splash-page",
    mounted() {
      setTimeout(() => {
        this.$push('main-page.js');
        this.$pop();
      }, 500);
    }
  }
</script>
