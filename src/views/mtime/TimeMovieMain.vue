<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="时光电影" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <waterfall @loadmore="loadMoreData" loadmoreoffset="200" column-count="3" column-gap="0">
      <!--下拉刷新控件-->
      <refresh class="refresh" @refresh="onPullRefresh" @pullingdown="onPullingDown"
               :display="showRefresh ? 'show' : 'hide'">
        <text class="refresh-text">{{refreshText}}</text>
        <loading-indicator class="refresh-indicator"></loading-indicator>
      </refresh>
      <!--图片瀑布流列表-->
      <cell v-for="item in imageList" :key="item.movieId">
        <div class="flex1 center cover-box" @click="onItemClick(item)">
          <bui-image :src="item.img" class="cover-img" @click="onItemClick(item)"></bui-image>
          <text class="h5 image-desc">{{item.titleCn + '('+item.rYear+')'}}</text>
        </div>
      </cell>
    </waterfall>
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "time-movie-main",
    components: {WxcLoading},
    data() {
      return {
        loadUrl: 'https://ticket-api-m.mtime.cn/search/movieFilter.api',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        showLoading: false,
        showRefresh: false,
        pageIndex: 1,
        imageList: [],
        refreshText: '下拉刷新',
      }
    },
    mounted() {
      this.showLoading = true;
      this.refreshPageData();
    },
    methods: {
      onItemClick(item) {
        if (item.movieId) {
          this.$push('time-movie-detail.js', {id: item.movieId})
        }
      },
      onPullingDown(event) {
        if (Math.abs(event.pullingDistance) >= 100) {
          this.refreshText = '释放立即刷新';
        }
      },
      onPullRefresh() {
        this.showRefresh = true;
        this.refreshPageData();
      },
      refreshPageData() {
        this.pageIndex = 1;
        this.loadMoreData();
      },
      loadMoreData() {
        let params = {
          onlineFree: 3,
          sortMethod: 1,
          searchType: 1,
          pageIndex: this.pageIndex,
        };
        this.$get({
          url: this.loadUrl,
          headers: {
            'user-agent': 'Android'
          },
          data: params,
        }).then(res => {
          let resData = res.data.movieModelList;
          if (resData && resData.length > 0) {
            if (this.pageIndex <= 1) {
              this.imageList = resData;
            } else {
              this.imageList = this.imageList.concat(resData);
            }
            this.pageIndex += 1;
          }
          this.showLoading = false;
          this.showRefresh = false;
        }).catch(() => {
          this.showLoading = false;
          this.showRefresh = false;
        })
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .image-desc {
    font-size: 24px;
    line-height: 26px;
    height: 52px;
    lines: 2;
    margin: 5px 8px 10px 8px;
  }

  .refresh {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 16px;
  }

  .refresh-text {
    color: #3399ff;
    font-size: 30px;
    margin-right: 20px;
  }

  .refresh-indicator {
    height: 40px;
    width: 40px;
    color: #238FFF;
  }

  .cover-box {
    margin: 5px;
    background-color: white;
  }

  .cover-img {
    background-color: #717171;
    width: 240px;
    height: 336px;
  }
</style>
