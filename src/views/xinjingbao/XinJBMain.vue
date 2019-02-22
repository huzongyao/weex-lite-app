<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="薪京报" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="loadNextPage" @refresh="refreshPage" class="drop-loader">
      <cell>
        <!--Banner 列表-->
        <slider class="banner-slider" interval="5000" auto-play="true">
          <div v-for="item in bannerList" @click="onBannerClick(item)">
            <image class="banner-img" resize="cover" :src="item.focus_cover"></image>
            <text class="h5 banner-title">{{item.focus_title}}</text>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </cell>
      <!--文章列表-->
      <cell v-for="(item, idx) in articleList" :key="idx">
        <div class="flex-row list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="getImageUrl(item)" @click="onItemClick(item)"></bui-image>
          <text class="h4 span1 list-title">{{getItemTitle(item)}}</text>
        </div>
      </cell>
      <wxc-loading :show="showLoading"></wxc-loading>
    </bui-dropload>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "xinjingbao-main",
    components: {WxcLoading},
    data() {
      return {
        urls: {
          banner: 'http://api.bjnews.com.cn/api/v101/news/carousel.php',
          listUrl: 'http://api.bjnews.com.cn/api/v101/news/news_list.php?channel_id=1&page=',
        },
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        bannerList: [],
        articleList: [],
        showLoading: false,
        currentPage: 1,
      };
    },
    computed: {
      getImageUrl() {
        return (item) => {
          if (item.row && item.row.cover) {
            return item.row.cover;
          }
          return '';
        }
      },
      getItemTitle() {
        return (item) => {
          if (item.row && item.row.title) {
            return item.row.title;
          }
          return '';
        }
      }
    },
    mounted() {
      this.showLoading = true;
      this.refreshPage()
    },
    methods: {
      loadNextPage(next) {
        let url = this.urls.listUrl + this.currentPage;
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let articles = res.data;
          if (articles && articles.length > 0) {
            if (this.currentPage <= 1) {
              this.articleList = articles;
            } else {
              this.articleList = this.articleList.concat(articles);
            }
            this.currentPage += 1;
          }
          next && next();
          this.showLoading = false;
        }).catch(() => {
          next && next();
          this.showLoading = false;
        });
      },
      refreshPage(next) {
        this.currentPage = 1;
        this.loadNextPage(next);
        this.$get({
          url: this.urls.banner,
        }).then(res => {
          this.bannerList = res.data;
        }).catch(() => {
        });
      },
      onBannerClick(item) {

      },
      onItemClick(item) {

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
    height: 422px;
    margin-bottom: 20px;
    background-color: #cccccc;
  }

  .banner-img {
    height: 422px;
  }

  .banner-title {
    position: absolute;
    bottom: 28px;
    left: 20px;
    max-width: 450px;
    padding: 3px 20px;
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
