<template>
  <div>
    <bui-header title="首页"></bui-header>
    <scroller>
      <div class="flex-row flex-fluid row-apps">
        <div v-for="(item, idx) in iconApps" :key="idx" class="center app-item">
          <bui-icon :name="item.icon" size=96 class="icon-btn" color="white" @click="$push(item.link)"></bui-icon>
          <text class="h5 app-title">{{item.name}}</text>
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
          {name: '知乎日报', icon: 'ion-social-rss-outline', link: 'zhihu-main.js'},
          {name: '推酷', icon: 'ion-social-tumblr-outline', link: 'tuiku-main.js'},
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
    margin: 30px 15px;
  }

  .app-item {
    width: 180px;
    height: 180px;
  }

  .app-title {
    margin-top: 10px;
  }

  .icon-btn {
    border-radius: 6px;
    background-color: #00B4FF;
  }
</style>
