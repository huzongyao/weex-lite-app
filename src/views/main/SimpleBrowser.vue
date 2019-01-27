<template>
  <div>
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <web class="span1" :src="webUrl" @receivedtitle="onReceiveTitle"></web>
  </div>
</template>

<script>
  export default {
    name: "simple-browser",
    data() {
      return {
        pageTitle: '',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        webUrl: '',
      };
    },
    mounted() {
      let url = this.$getPageParams().url;
      if (!url) {
        this.$pop()
      } else {
        this.webUrl = url;
      }
    },
    methods: {
      onReceiveTitle(e) {
        if (e.title) {
          this.pageTitle = e.title;
        }
      }
    }
  }
</script>
<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
