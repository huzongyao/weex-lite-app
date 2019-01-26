<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="知乎日报" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="loadNextPage" @refresh="fetchLatest" class="drop-loader">
      <cell>
        <slider class="banner-slider" interval="5000" auto-play="true">
          <div v-for="item in bannerList" @click="onItemClick(item)">
            <image class="banner-img" resize="cover" :src="item.image"></image>
            <text class="h5 banner-title">{{item.title}}</text>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </cell>
      <cell v-for="item in storyList">
        <div class="flex-row list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="item.images[0]" @click="onItemClick(item)"></bui-image>
          <text class="h3 span1 list-title">{{item.title}}</text>
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
    name: "zhihu-main",
    components: {WxcLoading},
    data() {
      return {
        URL_GET_LATEST: 'https://news-at.zhihu.com/api/4/stories/latest',
        URL_GET_BEFORE: 'https://news-at.zhihu.com/api/4/stories/before/',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        bannerList: [],
        storyList: [],
        currentDate: '',
        showLoading: false,
      };
    },
    mounted() {
      this.showLoading = true;
      this.fetchLatest();
    },
    methods: {
      onItemClick(item) {
        this.$push('zhihu-detail.js', {id: item.id})
      },
      fetchLatest(next) {
        this.$get({
          url: this.URL_GET_LATEST,
        }).then(res => {
          this.bannerList = res.top_stories;
          this.currentDate = res.date;
          this.storyList = res.stories;
          next && next();
          this.showLoading = false;
        }).catch(() => {
          next && next();
          this.showLoading = false;
        });
      },
      loadNextPage(next) {
        this.$get({
          url: this.URL_GET_BEFORE + this.currentDate,
        }).then(res => {
          this.currentDate = res.date;
          this.storyList = this.storyList.concat(res.stories);
          next && next();
        }).catch(() => {
          next && next();
        });
      },
    },
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
    width: 160px;
    height: 160px;
    background-color: #dddddd;
  }

  .list-title {
    margin-left: 25px;
    font-size: 35px;
  }

  .banner-slider {
    height: 450px;
    margin-bottom: 20px;
  }

  .banner-img {
    height: 450px;
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
    item-color: #999;
    item-selected-color: #ffffff;
    item-size: 16px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>
