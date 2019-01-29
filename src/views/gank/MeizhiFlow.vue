<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="Gank 妹纸" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <waterfall @loadmore="loadMoreData" loadmoreoffset="20" column-count="2" column-gap="0">
      <refresh class="refresh center" @refresh="onPullRefresh" :display="showRefresh ? 'show' : 'hide'">
        <loading-indicator class="indicator"></loading-indicator>
        <text class="refreshText">Loading...</text>
      </refresh>
      <cell v-for="(item, idx) in imageList" :key="idx">
        <div class="flex1 center cover-box">
          <image :ref='idx' :src="item.url" class="cover-img" @load="onImageLoad(item, $event)"
                 :style="{height:item.height + 'px'}"></image>
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
      }
    },
    mounted() {
      this.refreshPageData();
    },
    methods: {
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
    width: 750px;
    height: 180px;
  }

  .indicator {
    margin-top: 16px;
    height: 60px;
    width: 60px;
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
