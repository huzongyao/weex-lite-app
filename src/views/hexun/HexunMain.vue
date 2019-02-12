<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="河汛热点" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
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
    name: "hexun-main",
    components: {WxcLoading},
    data() {
      return {
        urls: {
          listFirst: 'http://wapi.hexun.com/AppPopUp_getHotPointNews.cc?pn=0',
          listFollow: 'http://wapi.hexun.com/AppPopUp_getHotPointNews.cc?pn=2&newstime='
        },
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        articleList: [],
        newTime: null,
        showLoading: false,
      }
    },
    mounted() {
      this.showLoading = true;
      this.refreshArticles()
    },
    methods: {
      // 接着上一次加载
      fetchHotArticles(next) {
        let url = this.newTime ? this.urls.listFollow + this.newTime : this.urls.listFirst;
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let articles = res.datas;
          if (articles && articles.length > 0) {
            if (!this.newTime) {
              this.articleList = articles;
            } else {
              this.articleList = this.articleList.concat(articles);
            }
            let params = this.parseParams(res.param);
            this.newTime = params.timestamp1;
          }
          next && next();
          this.showLoading = false;
        }).catch(() => {
          next && next();
          this.showLoading = false;
        });
      },
      parseParams(str) {
        let strs = str.split("&");
        let ret = {};
        for (let i in strs) {
          let ps = strs[i].split("=");
          ret[ps[0]] = ps[1];
        }
        return ret;
      },
      // 从头加载
      refreshArticles(next) {
        this.newTime = null;
        this.fetchHotArticles(next);
      },
      onItemClick(item) {
        if (item.id) {
          this.$push('hexun-detail.js', {id: item.id})
        }
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
