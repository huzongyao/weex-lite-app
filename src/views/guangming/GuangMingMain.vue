<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="光茗日报" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="loadNextPage" @refresh="refreshPage" class="drop-loader">
      <cell>
        <slider class="banner-slider" interval="5000" auto-play="true">
          <div v-for="item in bannerList" @click="onItemClick(item)">
            <image class="banner-img" resize="cover" :src="item.picLinks"></image>
            <text class="h5 banner-title">{{item.title}}</text>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </cell>
      <cell v-for="item in articleList">
        <div class="flex-row list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="item.picLinks" @click="onItemClick(item)"></bui-image>
          <text class="h4 span1 list-title">{{item.title}}</text>
        </div>
      </cell>
      <wxc-loading :show="showLoading"></wxc-loading>
    </bui-dropload>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "guang-ming-main",
    components: {WxcLoading},
    data() {
      return {
        urls: {
          listFirst: 'http://s.cloud.gmw.cn/2016/json/sxw/rd/',
          listFollow: 'http://s.cloud.gmw.cn/2016/json/sxw/rd/index_'
        },
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        bannerList: [],
        articleList: [],
        pageIndex: 1,
        showLoading: false,
      };
    },
    mounted() {
      this.showLoading = true;
      this.refreshPage()
    },
    methods: {
      loadNextPage(next) {
        let url = this.pageIndex > 1 ? this.urls.listFollow + this.pageIndex + '.json' : this.urls.listFirst;
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let articles = res.list;
          if (articles && articles.length > 0) {
            if (this.pageIndex > 1) {
              this.articleList = this.articleList.concat(articles);
            } else {
              this.articleList = articles;
              this.bannerList = res.bannerlist;
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
      refreshPage(next) {
        this.pageIndex = 1;
        this.loadNextPage(next);
      },
      onItemClick(item) {
        if (item.artUrl) {
          this.$push('simple-browser.js', {url: item.artUrl});
        }
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .drop-loader {
    margin-top: -1px;
  }

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
    width: 187px;
    height: 132px;
    background-color: #dddddd;
  }

  .list-title {
    margin-left: 25px;
    font-size: 35px;
  }

  .banner-slider {
    height: 406px;
    margin-bottom: 20px;
    background-color: #cccccc;
  }

  .banner-img {
    height: 406px;
  }

  .banner-title {
    position: absolute;
    bottom: 28px;
    left: 20px;
    max-width: 450px;
    padding: 4px 20px;
    color: #FFFFFF;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .indicator {
    width: 300px;
    height: 20px;
    item-color: #999999;
    item-selected-color: #ffffff;
    item-size: 16px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>
