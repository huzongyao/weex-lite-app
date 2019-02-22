<template>
  <div>
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <web class="span1" :src="webUrl" @receivedtitle="onReceiveTitle"></web>
  </div>
</template>

<script>
  export default {
    name: "xinjingbao-detail",
    data() {
      return {
        pageTitle: '薪京报',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        URL_DETAIL: 'http://jingxuan.guokr.com/pick/v2/',
        articleId: '',
        webUrl: '',
      };
    },
    mounted() {
      this.articleId = this.$getPageParams().id;
      if (!this.articleId) {
        this.$pop()
      } else {
        this.webUrl = this.URL_DETAIL + this.articleId + '/';
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
