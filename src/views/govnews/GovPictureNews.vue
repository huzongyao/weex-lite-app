<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="图片新闻" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @loading="fetchHotArticles" @refresh="refreshArticles">
      <cell v-for="(item, idx) in articleList" :key="idx">
        <div class="list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="getCoverImg(item)"
                     @click="onItemClick(item)" :style="getHeightStyle(item)"></bui-image>
          <text class="h5 span1 list-title">{{item.title}}</text>
        </div>
      </cell>
    </bui-dropload>
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "gov-picture-news",
    components: {WxcLoading},
    computed: {
      // 计算图片高度
      getHeightStyle() {
        return (item) => {
          let thumb = item.thumbnails[2];
          if (thumb) {
            let height = thumb.height * 710 / thumb.width;
            return {height: height + 'px'}
          }
          return '';
        }
      },
      // 获取封面图
      getCoverImg() {
        return (item) => {
          if (item.thumbnails[2]) {
            return 'https://app.www.gov.cn/govdata/gov/' + item.thumbnails[2].file;
          }
          return '';
        }
      }
    },
    data() {
      return {
        newsList: 'https://appdyn.www.gov.cn/gov/column.shtml?columnId=480&page=',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        articleList: [],
        showLoading: false,
        pageIndex: 0,
      }
    },
    mounted() {
      this.showLoading = true;
      this.refreshArticles()
    },
    methods: {
      // 接着上一次加载
      fetchHotArticles(next) {
        let url = this.newsList + this.pageIndex;
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          let articles = [];
          for (let idx in res.articles) {
            articles.push(res.articles[idx]);
          }
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
        this.fetchHotArticles(next);
      },
      onItemClick(item) {
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

  .list-img {
    width: 710px;
    background-color: #dddddd;
    border-radius: 4px;
  }

  .list-title {
    font-size: 24px;
    line-height: 26px;
    margin: 10px 0;
  }
</style>
