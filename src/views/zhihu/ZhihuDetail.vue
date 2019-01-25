<template>
  <div>
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <web class="span1" :source="webSource"></web>
  </div>
</template>

<script>
  const globalEvent = weex.requireModule('globalEvent');

  export default {
    name: "zhihu-detail",
    data() {
      return {
        URL_STORY_DETAIL: 'https://news-at.zhihu.com/api/4/story/',
        pageTitle: '知乎日报',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        storyId: '',
        webSource: '',
      }
    },
    mounted() {
      this.storyId = this.$getPageParams().id;
      this.loadWithApi();
    },
    methods: {
      // 通过接口加载
      loadWithApi() {
        if (!this.storyId) {
          return
        }
        this.webSource = '';
        this.$get({
          url: this.URL_STORY_DETAIL + this.storyId,
        }).then(res => {
          this.pageTitle = res.title;
          this.webSource = '<!DOCTYPE html>'
            + '<html><head><meta charset="utf-8">'
            + '<meta name="weex-viewport" content="750">'
            + '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">'
            + '<meta name="format-detection" content="telephone=no, email=no" />'
            + '<style>.img-place-holder{background-image: url(' + res.image + ');background-size: 100%}</style>'
            + '<link rel="stylesheet" type="text/css" href="' + res.css[0] + '" />'
            + '</head><body>'
            + res.body
            + '</body></html>';
        }).catch(() => {
        });
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
