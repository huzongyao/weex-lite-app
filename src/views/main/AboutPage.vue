<template>
  <div class="container">
    <bui-header title="关于" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <scroller>
      <text class="h4 info-title">应用信息</text>
      <bui-cell :title="idx" :desc="info" v-for="(info, idx) in appInfo" :key="idx" :cellStyle="cellStyle"
                @click.stop="onItemClick(info)">
        <bui-icon slot="action" name="ion-ios-arrow-right" v-if="info.startsWith('http')"></bui-icon>
      </bui-cell>
      <text class="h4 info-title">系统信息</text>
      <text class="h5 text-info" v-for="(info, idx) in sysInfo" :key="idx">{{idx + ': [' + info + ']'}}</text>
      <div style="height: 20px"></div>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: "about-page",
    data() {
      return {
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        sysInfo: {},
        appInfo: {
          'Project repository': 'https://github.com/huzongyao/weex-lite-app',
          'My GitHub': 'https://github.com/huzongyao',
          'My Blog': 'https://huzongyao.github.io/',
          'ITEye Blog': 'https://hzy3774.iteye.com/',
          'Sina Weibo': 'https://weibo.com/hzy3774',
          'GMail': 'hzy3774@gmail.com',
          'QQ': '377406997',
          'Wechat': 'hzy3774',
        },
        cellStyle: {"background-color:active": "#f2f2f2"},
      };
    },
    mounted() {
      this.sysInfo = WXEnvironment;
    },
    methods: {
      onItemClick(info) {
        if (info.startsWith('http')) {
          this.$push('simple-browser.js', {url: info})
        }
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .container {
    background-color: #f1f1f1
  }

  .info-title {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #5f9ea0;
    color: #ffffff;
  }

  .text-info {
    background-color: white;
    padding: 10px 20px;
    margin-bottom: 1px;
  }
</style>
