<template>
  <div>
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <web class="span1" :source="webSource"></web>
  </div>
</template>

<script>
  export default {
    name: "one-yige-detail",
    data() {
      return {
        urls: [
          '',
          'http://v3.wufazhuce.com:8000/api/essay/htmlcontent/',
          'http://v3.wufazhuce.com:8000/api/serialcontent/htmlcontent/',
          'http://v3.wufazhuce.com:8000/api/question/htmlcontent/',
          'http://v3.wufazhuce.com:8000/api/music/htmlcontent/',
          'http://v3.wufazhuce.com:8000/api/movie/htmlcontent/',
        ],
        pageTitle: '旺一个',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        articleId: '',
        category: '',
        webSource: '',
      };
    },
    mounted() {
      this.articleId = this.$getPageParams().id;
      this.category = this.$getPageParams().category;
      this.loadWithApi();
    },
    methods: {
      loadWithApi() {
        if (!this.articleId) {
          return
        }
        this.$get({
          url: this.urls[this.category] + this.articleId,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let article = res.data;
          this.pageTitle = article.title;
          this.webSource = '<!DOCTYPE html>'
            + '<html><head>'
            + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
            + '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">'
            + '<meta name="apple-mobile-web-app-capable" content="yes">'
            + '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'
            + '<style>img{width: 100%}</style>'
            + '</head><body>'
            + article.html_content
            + '</body></html>';
        }).catch(() => {
        });
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
