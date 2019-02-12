<template>
  <div style="background-color: #f1f1f1">
    <!--标题栏-->
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <!--内容区域-->
    <scroller>
      <div class="movie-content" v-if="movieBasic.movieId">
        <!--头部信息-->
        <div class="flex-row top-info">
          <image :src="movieBasic.img" class="left-image"></image>
          <div class="right-info">
            <text class="h4">{{movieBasic.name}}</text>
            <text class="h4">{{movieBasic.nameEn}}</text>
            <text class="h5" style="margin-top: 10px">{{movieBasic.mins}}</text>
            <text class="h5">{{movieBasic.releaseArea}} {{movieBasic.releaseDate}}</text>
          </div>
        </div>
        <!--详情介绍-->
        <text class="h4 story-info">{{movieBasic.story}}</text>
      </div>
    </scroller>
    <!--加载中-->
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "time-movie-detail",
    components: {WxcLoading},
    data() {
      return {
        URL_DETAIL: 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=0&movieId=',
        pageTitle: '时光电影',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        movieId: '',
        showLoading: false,
        movieBasic: {},
      };
    },
    mounted() {
      this.movieId = this.$getPageParams().id;
      this.showLoading = true;
      this.loadWithApi();
    },
    methods: {
      loadWithApi() {
        if (!this.movieId) {
          return
        }
        this.$get({
          url: this.URL_DETAIL + this.movieId,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          this.readItemFromRes(res);
          this.showLoading = false;
        }).catch(() => {
          this.showLoading = false;
        });
      },
      readItemFromRes(res) {
        if (res.data) {
          let data = res.data;
          if (data.basic) {
            this.movieBasic = data.basic;
            this.pageTitle = this.movieBasic.name;
          }
        }
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .movie-content {
    padding: 10px;
  }

  .top-info {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
  }

  .left-image {
    background-color: #717171;
    width: 240px;
    height: 336px;
  }

  .right-info {
    margin-left: 10px;
    width: 460px;
  }

  .story-info {
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
  }
</style>
