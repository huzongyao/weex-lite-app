<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="开演日报" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="fetchHotArticles" @refresh="refreshArticles">
      <cell v-for="(item, idx) in articleList" :key="idx">
        <div v-if="item.type==='textCard'">
          <text class="h3 divider-text">{{item.data.text}}</text>
        </div>
        <div v-else-if="item.type==='followCard'" class="list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="getCoverImg(item)"
                     @click="onItemClick(item)"></bui-image>
          <text class="h5 span1 list-title">{{getCoverTitle(item)}}</text>
        </div>
      </cell>
    </bui-dropload>
    <!--加载弹出层-->
    <wxc-loading :show="showLoading"></wxc-loading>
    <!--视频播放弹窗-->
    <bui-popup v-model="showVideoPopup" pos="top" backgroundColor="#000000" height="510">
      <video class="video-player" :src="curVideoUrl" auto-play="true" @finish="onVideoClose"
             @fail="onVideoClose"></video>
      <text class="h5 span1 video-title">{{curVideoTitle}}</text>
    </bui-popup>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "kaiyan-main",
    components: {WxcLoading},
    computed: {
      getCoverImg() {
        return (item) => {
          try {
            return item.data.content.data.cover.feed;
          } catch (err) {
          }
          return '';
        }
      },
      getCoverTitle() {
        return this.getValidTitle;
      }
    },
    data() {
      return {
        firstUrl: 'http://baobab.kaiyanapp.com/api/v5/index/tab/feed',
        newsUrl: '',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        articleList: [],
        showVideoPopup: false,
        showLoading: false,
        pageIndex: 0,
        curVideoUrl: '',
        curVideoTitle: '',
      }
    },
    mounted() {
      this.showLoading = true;
      this.refreshArticles()
    },
    methods: {
      // 接着上一次加载
      fetchHotArticles(next) {
        this.$get({
          url: this.newsUrl,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let articles = res.itemList;
          this.newsUrl = res.nextPageUrl;
          if (articles && articles.length > 0) {
            if (this.pageIndex <= 0) {
              this.articleList = articles;
            } else {
              this.articleList = this.articleList.concat(articles);
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
      // 从头加载
      refreshArticles(next) {
        this.pageIndex = 0;
        this.newsUrl = this.firstUrl;
        this.fetchHotArticles(next);
      },
      onItemClick(item) {
        this.curVideoUrl = this.getValidVideoUrl(item);
        if (this.curVideoUrl) {
          this.curVideoTitle = this.getValidTitle(item);
          this.showVideoPopup = true;
        }
      },
      //获取视频地址
      getValidVideoUrl(item) {
        try {
          return item.data.content.data.playUrl;
        } catch (err) {
        }
        return '';
      },
      //获取视频标题
      getValidTitle(item) {
        try {
          return item.data.content.data.title;
        } catch (err) {
        }
        return '';
      },
      onVideoClose() {
        this.showVideoPopup = false;
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .list-item {
    margin: 5px 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
  }

  .list-item:active {
    background-color: #f6f6f6;
  }

  .divider-text {
    margin: 20px 30px 0 30px;
    color: #238FFF;
  }

  .list-img {
    width: 710px;
    height: 411px;
    background-color: #dddddd;
    border-radius: 4px;
  }

  .list-title {
    font-size: 24px;
    line-height: 26px;
    margin: 10px 0;
  }

  .video-title {
    font-size: 24px;
    line-height: 26px;
    margin: 10px 10px;
    color: #cccccc;
    lines: 2;
  }

  .video-player {
    width: 750px;
    height: 430px;
  }
</style>
