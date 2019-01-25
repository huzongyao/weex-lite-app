<template>
  <div>
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <web class="span1" :source="webSource"></web>
  </div>
</template>

<script>
  const globalEvent = weex.requireModule('globalEvent');

  export default {
    name: "tuiku-detail",
    data() {
      return {
        URL_ARTICLE_DETAIL: 'http://api.tuicool.com/api/articles/',
        COMMON_HEADERS: {
          'user-agent': 'android/103/M9/23/4',
          'Authorization': 'Basic MC4wLjAuMDp0dWljb29s',
        },
        pageTitle: '推酷',
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
          url: this.URL_ARTICLE_DETAIL + this.articleId + '.json?need_image_meta=1&type=1',
          headers: this.COMMON_HEADERS,
        }).then(res => {
          let article = res.article;
          this.pageTitle = article.title;
          this.webSource = '<!DOCTYPE html>'
            + '<html><head><meta charset="utf-8">'
            + '<meta name="weex-viewport" content="750">'
            + '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">'
            + '<meta name="format-detection" content="telephone=no, email=no" /><head>'
            + '<style>.alignCenter{width: 100%}</style>'
            + '</head><body>'
            + article.content
            + '</body></html>';
        }).catch(() => {
        });
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
