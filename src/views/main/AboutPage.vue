<template>
  <div class="container">
    <bui-header title="关于" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <scroller>
      <!--应用信息-->
      <text class="h4 info-title">应用信息</text>
      <bui-cell :title="idx" :desc="info" v-for="(info, idx) in appInfo" :key="idx" :cellStyle="cellStyle"
                @click.stop="onItemClick(info)">
        <bui-icon slot="action" name="ion-ios-arrow-right" v-if="info.startsWith('http')"></bui-icon>
      </bui-cell>
      <!--UI 示例-->
      <text class="h4 info-title">UI 示例</text>
      <bui-cell :title="info.name" :desc="info.desc" v-for="(info, idx) in samplesInfo" :key="idx"
                :cellStyle="cellStyle" @click.stop="onSampleClick(info)">
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <!--系统信息-->
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
          'Source Code': 'https://github.com/huzongyao/weex-lite-app',
          'Framework Github': 'https://github.com/huzongyao/WeexAppFrame',
          'My GitHub': 'https://github.com/huzongyao',
          'My Blog': 'https://huzongyao.github.io/',
          'GMail': 'hzy3774@gmail.com',
          'QQ': '377406997',
          'Wechat': 'hzy3774',
        },
        samplesInfo: [
          {
            name: 'BUI Samples', desc: 'BUI-Weex 示例',
            link: 'http://dev.bingocc.com/buiweex-demo/app.js?actionbar=true'
          },
          {
            name: 'Weex-UI Samples', desc: 'weex-ui 组件库示例',
            link: 'https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=' +
            'https%3a%2f%2fh5.m.taobao.com%2ftrip%2fweex-ui%2fdemo%2findex.native-min.js&actionbar=true'
          },
          {
            name: 'Weex-AM-UI', desc: 'Weex-AMUI',
            link: 'https://hminghe.github.io/weex-amui/release/native/index.js'
          }
        ],
        cellStyle: {"background-color:active": "#f2f2f2"},
      };
    },
    mounted() {
      this.sysInfo = WXEnvironment;
    },
    methods: {
      onSampleClick(item) {
        this.$push(item.link);
      },
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
    border-bottom-width: 1px;
    border-bottom-color: #e2e2e2;
  }
</style>
