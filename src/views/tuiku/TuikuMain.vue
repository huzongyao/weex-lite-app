<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="推酷" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="fetchHotArticles" @refresh="refreshArticles">
      <cell v-for="item in articleList">
        <div class="flex-row list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="item.img" resize="contain" @click="onItemClick(item)"></bui-image>
          <text class="h3 span1 list-title">{{item.title}}</text>
        </div>
      </cell>
    </bui-dropload>
  </div>
</template>

<script>
  const globalEvent = weex.requireModule('globalEvent');

  export default {
    name: "tuiku-main",
    data() {
      return {
        URL_GET_HOT: 'http://api.tuicool.com/api/articles/hot.json',
        COMMON_HEADERS: {
          'user-agent': 'android/103/M9/23/4',
          'Authorization': 'Basic MC4wLjAuMDp0dWljb29s',
        },
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        articleList: [],
        listLastId: null,
      }
    },
    mounted() {
      this.refreshArticles()
    },
    methods: {
      // 接着上一次加载
      fetchHotArticles(next) {
        let params = {size: 30, lang: 1, cid: 0, is_pad: 1};
        if (this.listLastId) {
          params.last_id = this.listLastId;
        }
        this.$get({
          url: this.URL_GET_HOT,
          headers: this.COMMON_HEADERS,
          data: params,
        }).then(res => {
          let articles = res.articles;
          if (articles && articles.length > 0) {
            if (!this.listLastId) {
              this.articleList = articles;
            } else {
              this.articleList = this.articleList.concat(articles);
            }
            let lastItem = articles[articles.length - 1];
            this.listLastId = lastItem.id;
          }
          next && next();
        }).catch(() => {
          next && next();
        });
      },
      // 从头加载
      refreshArticles(next) {
        this.listLastId = null;
        this.fetchHotArticles(next);
      },
      onItemClick(item) {
        this.$push('tuiku-detail.js', {id: item.id})
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
    background-color: #fff;
  }

  .list-item:active {
    background-color: #f6f6f6;
  }

  .list-img {
    width: 190px;
    height: 120px;
    background-color: #dddddd;
    border-radius: 4px;
  }

  .list-title {
    margin-left: 25px;
    font-size: 35px;
  }
</style>
