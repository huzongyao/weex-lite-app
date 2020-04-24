<template>
  <div>
    <bui-header title="首页"></bui-header>
    <scroller show-scrollbar="false">
      <div class="app-container">
        <bui-panel :title="cat.title" v-for="(cat, idx) in iconApps" paddingBody="0" :key="idx"
                   border="1" class="app-panel">
          <!--循环所有行-->
          <div v-for="ir in Math.ceil(cat.apps.length/rowAppCount)" :key="ir" class="flex-row">
            <!--取出每行该显示的-->
            <div v-for="(item, i) in cat.apps.slice((ir-1)*rowAppCount,ir*rowAppCount)"
                 :key="i" class="center app-item flex1">
              <bui-icon :name="item.icon" size=96 class="icon-btn" color="white" @click="$push(item.link)"></bui-icon>
              <text class="app-title">{{item.name}}</text>
            </div>
            <!--空白补齐-->
            <div class="flex1" v-for="idx in (rowAppCount-cat.apps.length%rowAppCount)" :key="idx"
                 v-if="ir>cat.apps.length/rowAppCount"></div>
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
        rowAppCount: 4,
        iconApps: [
          {
            title: '新闻日报', apps: [
              {name: '之乎日报', icon: 'ion-social-rss-outline', link: 'zhihu-main.js'},
              {name: '河汛热点', icon: 'ion-arrow-graph-up-right', link: 'hexun-main.js'},
              {name: '大图News', icon: 'ion-aperture', link: 'gov-picture-news.js'},
              {name: '光茗日报', icon: 'ion-ios-world', link: 'guangming-main.js'},
              {name: '裹壳精选', icon: 'ion-bonfire', link: 'guoke-main.js'},
            ]
          }, {
            title: '技术资讯', apps:
              [
                {name: '推库', icon: 'ion-social-tumblr-outline', link: 'tuiku-main.js'},
              ]
          }, {
            title: '休闲娱乐', apps: [
              {name: '开演日报', icon: 'ion-eye', link: 'kaiyan-main.js'},
              {name: '时光电影', icon: 'ion-android-film', link: 'time-movie-main.js'},
              {name: '旺一个', icon: 'ion-social-pinterest-outline', link: 'one-yige-main.js'},
            ]
          }, {
            title: '实用工具', apps: [
              {name: '快递查询', icon: 'ion-android-archive', link: 'kuai-di-main.js'},
              {name: '天气预报', icon: 'ion-android-cloud-circle', link: 'weather-main.js'},
              {name: '计算器', icon: 'ion-calculator', link: 'calculator-main.js'},
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
<style scoped lang="less">
  .app-container {
    padding: 20px 10px;
  }

  .app-item {
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
