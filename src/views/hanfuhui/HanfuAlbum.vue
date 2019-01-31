<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="汉服美图" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @refresh="refreshPageData" :hasLoading="false">
      <cell v-for="item in photoList">
        <div class="flex-row list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :style="{height:(item.Height*710/item.Width)+'px'}"
                     :src="item.ImgSrc+'_700x.jpg'" @click="onItemClick(item)"></bui-image>
        </div>
      </cell>
    </bui-dropload>
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "hanfu-album",
    components: {WxcLoading},
    data() {
      return {
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        albumUrl: 'https://api4.hanfugou.com/image/GetListForObject?objecttype=album&page=1&count=40&objectid=',
        albumId: '',
        photoList: [],
        showLoading: false,
      }
    },
    mounted() {
      this.albumId = this.$getPageParams().id;
      this.showLoading = true;
      this.refreshPageData();
    },
    methods: {
      onItemClick(item) {
      },
      refreshPageData(next) {
        if (!this.albumId) {
          this.$pop();
          return
        }
        let url = this.albumUrl + this.albumId;
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let photos = res.Data;
          if (photos && photos.length > 0) {
            this.photoList = photos;
          }
          next && next();
          this.showLoading = false;
        }).catch(() => {
          next && next();
          this.showLoading = false;
        });
      },
    },
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .list-item {
    margin: 5px 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #ffffff;
  }

  .list-img {
    width: 710px;
    height: 800px;
  }
</style>
