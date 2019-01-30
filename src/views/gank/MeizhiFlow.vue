<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="Gank 妹纸" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <waterfall @loadmore="loadMoreData" loadmoreoffset="200" column-count="2" column-gap="0">
      <!--下拉刷新控件-->
      <refresh class="refresh" @refresh="onPullRefresh" @pullingdown="onPullingDown"
               :display="showRefresh ? 'show' : 'hide'">
        <text class="refresh-text">{{refreshText}}</text>
        <loading-indicator class="refresh-indicator"></loading-indicator>
      </refresh>
      <!--图片瀑布流列表-->
      <cell v-for="(item, idx) in imageList" :key="idx">
        <div class="flex1 center cover-box">
          <image :ref='idx' :src="item.url" class="cover-img" @load="onImageLoad(item, $event)"
                 :style="{height:item.height+'px'}"></image>
          <text class="h5">{{item.desc}}</text>
        </div>
      </cell>
    </waterfall>
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "meizhi-flow",
    components: {WxcLoading},
    data() {
      return {
        loadUrl: 'http://gank.io/api/data/福利/20/',
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
        this.$get({
          url: this.loadUrl + this.pageIndex,
        }).then(res => {
          let resData = res.results;
          if (resData && resData.length > 0) {
            for (let idx = 0; idx < resData.length; idx++) {
              resData[idx].height = 460;
            }
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
      onImageLoad(item, event) {
        if (event.success) {
          let s = event.size;
          if (s.naturalWidth > 0 && s.naturalHeight > 0) {
            item.height = Math.round(s.naturalHeight * 345 / s.naturalWidth);
          }
        }
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
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
    border-radius: 5px;
  }

  .cover-img {
    background-color: #717171;
    width: 345px;
    margin: 10px;
  }
</style>
