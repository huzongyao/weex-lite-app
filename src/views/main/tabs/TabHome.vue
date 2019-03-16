<template>
  <div>
    <bui-header title="首页"></bui-header>
    <scroller show-scrollbar="false">
      <div class="app-container">
        <bui-panel :title="cat.title" v-for="(cat, idx) in iconApps" paddingBody="0"
                   :key="idx" border="1" class="app-panel">
          <div class="flex-row flex-fluid">
            <div v-for="(item, i) in cat.apps" :key="i" class="center app-item">
              <bui-icon :name="item.icon" size=96 class="icon-btn" color="white" @click="$push(item.link)"></bui-icon>
              <text class="app-title">{{item.name}}</text>
            </div>
          </div>
        </bui-panel>
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
          {
            title: '新闻日报', apps: [
              {name: '之乎日报', icon: 'ion-social-rss-outline', link: 'zhihu-main.js'},
              {name: '河汛热点', icon: 'ion-arrow-graph-up-right', link: 'hexun-main.js'},
              {name: '大图News', icon: 'ion-aperture', link: 'gov-picture-news.js'},
              {name: '薪京报', icon: 'ion-android-list', link: 'xinjingbao-main.js'},
              {name: '光茗日报', icon: 'ion-ios-world', link: 'guangming-main.js'},
            ]
          }, {
            title: '技术资讯', apps:
              [
                {name: '推库', icon: 'ion-social-tumblr-outline', link: 'tuiku-main.js'},
                {name: '裹壳精选', icon: 'ion-bonfire', link: 'guoke-main.js'},
              ]
          }, {
            title: '休闲娱乐', apps: [
              {name: 'Gank妹纸', icon: 'ion-images', link: 'meizhi-flow.js'},
              {name: '佑佑妹纸', icon: 'ion-social-snapchat-outline', link: 'youyou-flow.js'},
              {name: '汉服美', icon: 'ion-bowtie', link: 'hanfu-main.js'},
              {name: '开演日报', icon: 'ion-eye', link: 'kaiyan-main.js'},
              {name: '时光电影', icon: 'ion-android-film', link: 'time-movie-main.js'},
              {name: '旺一个', icon: 'ion-social-pinterest-outline', link: 'one-yige-main.js'},
            ]
          }, {
            title: '实用工具', apps: [
              {name: '快递查询', icon: 'ion-android-archive', link: 'kuai-di-main.js'},
              {name: '天气预报', icon: 'ion-android-cloud-circle', link: 'weather-main.js'},
            ]
          }
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
  .app-container {
    padding: 20px 10px;
  }

  .app-item {
    width: 181.5px;
    padding-top: 30px;
    padding-bottom: 20px;
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
