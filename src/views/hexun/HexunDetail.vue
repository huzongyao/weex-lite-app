<template>
  <div>
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <web class="span1" :source="webSource"></web>
  </div>
</template>

<script>
  const globalEvent = weex.requireModule('globalEvent');

  export default {
    name: "hexun-detail",
    data() {
      return {
        URL_ARTICLE_DETAIL: 'http://wapi.hexun.com/AppV5_commonNewsDetail.cc?newsId=',
        pageTitle: '河汛热点',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        articleId: '',
        webSource: '',
      };
    },
    mounted() {
      this.articleId = this.$getPageParams().id;
      this.loadWithApi();
    },
    methods: {
      loadWithApi() {
        if (!this.articleId) {
          return
        }
        this.$get({
          url: this.URL_ARTICLE_DETAIL + this.articleId,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let article = res.datas.news;
          this.pageTitle = article.title;
          this.webSource = '<!DOCTYPE html>'
            + '<html><head>'
            + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
            + '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">'
            + '<meta name="apple-mobile-web-app-capable" content="yes">'
            + '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'
            + '<style>img{width: 100%}</style>'
            + '</head><body>'
            + '<h2>' + article.title + '</h2>'
            + article.content
            + '</body></html>';
        }).catch(() => {
        });
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
