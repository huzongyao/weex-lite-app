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
        URL_ARTICLE_DETAIL: 'http://c.m.163.com/nc/article/',
        pageTitle: '网亦新闻',
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
          url: this.URL_ARTICLE_DETAIL + this.articleId + '/full.html',
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let article = res[this.articleId];
          this.pageTitle = article.title;
          this.replaceMedia(article);
          this.webSource = '<!DOCTYPE html>'
            + '<html><head><meta charset="utf-8">'
            + '<meta name="weex-viewport" content="750">'
            + '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">'
            + '<meta name="format-detection" content="telephone=no, email=no" /><head>'
            + '</head><body>'
            + '<h2>' + article.title + '</h2>'
            + article.body
            + '</body></html>';
        }).catch(() => {
        });
      },
      replaceMedia(article) {
        if (article.img) {
          for (let i in article.img) {
            let rep = article.img[i];
            article.body = article.body.replace(rep.ref, '<img style="width:100%" src="' + rep.src + '"/>')
          }
        }
        if (article.video) {
          for (let i in article.video) {
            let rep = article.video[i];
            article.body = article.body.replace(rep.ref, '<video style="width:100%" src="'
              + rep.mp4_url + '" controls="controls"/>')
          }
        }
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
