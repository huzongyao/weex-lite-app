<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="裹壳精选" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="loadNextPage" @refresh="refreshPage" class="drop-loader">
      <cell>
        <slider class="banner-slider" interval="5000" auto-play="true">
          <div v-for="item in bannerList" @click="onItemClick(item.article_id)">
            <image class="banner-img" resize="cover" :src="item.picture"></image>
            <text class="h5 banner-title">{{item.custom_title}}</text>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </cell>
      <cell v-for="item in articleList">
        <div class="flex-row list-item" @click="onItemClick(item.id)">
          <bui-image class="list-img" :src="item.headline_img_tb" @click="onItemClick(item.id)"></bui-image>
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
    name: "guoke-main",
    components: {WxcLoading},
    data() {
      return {
        urls: {
          banner: 'http://apis.guokr.com/flowingboard/item/handpick_carousel.json',
          listFirst: 'http://apis.guokr.com/handpick/v2/article.json?retrieve_type=by_offset&limit=20&ad=0',
          listFollow: 'http://apis.guokr.com/handpick/v2/article.json?retrieve_type=by_touch_move&move_type=up&ad=0&refresh_pick_id='
        },
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        bannerList: [],
        articleList: [],
        listLastId: null,
        showLoading: false,
      };
    },
    mounted() {
      this.showLoading = true;
      this.refreshPage()
    },
    methods: {
      loadNextPage(next) {
        let url = this.listLastId ? this.urls.listFollow + this.listLastId : this.urls.listFirst;
        this.$get({
          url: url,
        }).then(res => {
          let articles = res.result;
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
          this.showLoading = false;
        }).catch(() => {
          next && next();
          this.showLoading = false;
        });
      },
      refreshPage(next) {
        this.listLastId = null;
        this.loadNextPage(next);
        this.$get({
          url: this.urls.banner,
        }).then(res => {
          this.bannerList = res.result;
        }).catch(() => {
        });
      },
      onItemClick(articleId) {
        this.$push('guoke-detail.js', {id: articleId})
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
    height: 395px;
    margin-bottom: 20px;
    background-color: #cccccc;
  }

  .banner-img {
    height: 395px;
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
