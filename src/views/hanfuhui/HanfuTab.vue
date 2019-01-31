<template>
  <waterfall @loadmore="loadMoreData" loadmoreoffset="200" column-count="2" column-gap="0">
    <!--下拉刷新控件-->
    <refresh class="refresh" @refresh="onPullRefresh" @pullingdown="onPullingDown"
             :display="showRefresh ? 'show' : 'hide'">
      <text class="refresh-text">{{refreshText}}</text>
      <loading-indicator class="refresh-indicator"></loading-indicator>
    </refresh>
    <!--图片瀑布流列表-->
    <cell v-for="(item, idx) in imageList" :key="idx">
      <div class="flex1 center cover-box" @click="onImageClick(item)">
        <image :src="item.FaceSrc+'_300x300.jpg'" class="cover-img"></image>
        <text class="h5 image-desc">{{item.Name}}</text>
      </div>
    </cell>
    <cell>
      <wxc-loading :show="showLoading"></wxc-loading>
    </cell>
  </waterfall>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "hanfu-tab",
    components: {WxcLoading},
    props: {
      rankType: {type: String, default: '1'}
    },
    data() {
      return {
        loadUrl: 'https://api4.hanfugou.com/album/GetListForRank?count=20&ranktype=',
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
      onImageClick(item) {
        this.$push('hanfu-album.js', {id: item.ID})
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
        this.$get({
          url: this.loadUrl + this.rankType + '&page=' + this.pageIndex,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let resData = res.Data;
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
    margin: 0 10px 10px 10px;
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
    border-radius: 5px;
  }

  .cover-img {
    background-color: #717171;
    width: 345px;
    height: 345px;
    margin: 10px;
  }
</style>
