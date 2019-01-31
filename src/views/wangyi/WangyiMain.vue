<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="网亦新闻" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="fetchHotArticles" @refresh="refreshArticles">
      <cell v-for="item in articleList">
        <div class="flex-row list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="item.img" resize="cover" @click="onItemClick(item)"></bui-image>
          <text class="h4 span1 list-title">{{item.title}}</text>
        </div>
      </cell>
    </bui-dropload>
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  const globalEvent = weex.requireModule('globalEvent');
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "wangyi-main",
    components: {WxcLoading},
    data() {
      return {
        urls: {
          newsList: 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&size=30&offset='
        },
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        articleList: [],
        showLoading: false,
        pageIndex: 0,
      }
    },
    mounted() {
      this.showLoading = true;
      this.refreshArticles()
    },
    methods: {
      // 接着上一次加载
      fetchHotArticles(next) {
        let url = this.urls.newsList + (this.pageIndex * 30);
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let articles = res.tid;
          if (articles && articles.length > 0) {
            if (this.pageIndex <= 0) {
              this.articleList = articles;
            } else {
              this.articleList = this.articleList.concat(articles);
            }
            this.pageIndex += 1;
          }
          next && next();
          this.showLoading = false;
        }).catch(() => {
          next && next();
          this.showLoading = false;
        });
      },
      // 从头加载
      refreshArticles(next) {
        this.pageIndex = 0;
        this.fetchHotArticles(next);
      },
      onItemClick(item) {
        if (!item.id) {
          this.$toast('暂时无法跳转！');
          return;
        }
        this.$push('wangyi-detail.js', {id: item.id})
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .list-item {
    margin: 10px 20px;
    padding: 16px;
    border-radius: 5px;
    background-color: #ffffff;
  }

  .list-item:active {
    background-color: #f6f6f6;
  }

  .list-img {
    width: 200px;
    height: 140px;
    background-color: #dddddd;
    border-radius: 4px;
  }

  .list-title {
    margin-left: 25px;
    font-size: 32px;
  }
</style>
