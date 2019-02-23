<template>
  <div>
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <web class="span1" :source="webSource"></web>
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "xinjingbao-detail",
    components: {WxcLoading},
    data() {
      return {
        pageTitle: '薪京报',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        URL_DETAIL: 'http://api.bjnews.com.cn/api/v101/news/manuscript_detail.php?uuid=',
        articleId: '',
        webSource: '',
        showLoading: false,
      };
    },
    mounted() {
      this.articleId = this.$getPageParams().id;
      if (!this.articleId) {
        this.$pop()
      } else {
        this.showLoading = true;
        this.fetchWebContent();
      }
    },
    methods: {
      fetchWebContent() {
        let url = this.URL_DETAIL + this.articleId;
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let data = res.data;
          if (data) {
            this.pageTitle = data.title;
            this.webSource = '<!DOCTYPE html>'
              + '<html><head>'
              + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
              + '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">'
              + '<meta name="apple-mobile-web-app-capable" content="yes">'
              + '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'
              + '<style>img{max-width: 100%;height:auto}</style>'
              + '</head><body>'
              + '<h2>' + data.title + '</h2>'
              + data.content
              + '</body></html>';
          }
          this.showLoading = false;
        }).catch(() => {
          this.showLoading = false;
        })
      }
    }
  }
</script>
<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
