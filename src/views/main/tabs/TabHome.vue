<template>
  <div>
    <bui-header title="首页"></bui-header>
    <scroller>
      <div class="flex-row flex-fluid row-apps">
        <div v-for="(item, idx) in iconApps" :key="idx" class="center app-item">
          <bui-icon :name="item.icon" size=96 class="icon-btn" color="white" @click="$push(item.link)"></bui-icon>
          <text class="app-title">{{item.name}}</text>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: "tab-home",
    data() {
      return {
        iconApps: [
          {name: '之乎日报', icon: 'ion-social-rss-outline', link: 'zhihu-main.js'},
          {name: '推库', icon: 'ion-social-tumblr-outline', link: 'tuiku-main.js'},
          {name: '裹壳精选', icon: 'ion-bonfire', link: 'guoke-main.js'},
          {name: '河汛热点', icon: 'ion-arrow-graph-up-right', link: 'hexun-main.js'},
          {name: '网亦新闻', icon: 'ion-planet', link: 'wangyi-main.js'},
          {name: '大图News', icon: 'ion-aperture', link: 'gov-picture-news.js'},
          {name: 'Gank妹纸', icon: 'ion-images', link: 'meizhi-flow.js'},
          {name: '佑佑妹纸', icon: 'ion-social-snapchat-outline', link: 'youyou-flow.js'},
          {name: '汉服美', icon: 'ion-bowtie', link: 'hanfu-main.js'},
          {name: '开演日报', icon: 'ion-eye', link: 'kaiyan-main.js'},
        ]
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .row-apps {
  }

  .app-item {
    margin-top: 30px;
    width: 187.5px;
  }

  .app-title {
    font-size: 26px;
    margin-top: 4px;
    line-height: 40px;
    color: #464c5b;
  }

  .icon-btn {
    border-radius: 6px;
    background-color: #00B4FF;
  }
</style>
