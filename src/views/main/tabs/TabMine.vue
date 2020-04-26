<template>
  <div>
    <bui-header title="我的"></bui-header>
    <!--选项列表-->
    <scroller>
      <bui-cell title="设置" :cellStyle="cellStyle" class="first-line" @click="onSettingsClick">
        <bui-icon slot="label" class="left-ic" name="ion-ios-gear-outline"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="扫一扫" :cellStyle="cellStyle" @click="onQRScanClick">
        <bui-icon slot="label" class="left-ic" name="ion-android-expand"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="工厂测试" :cellStyle="cellStyle" @click="$push('factory-page.js')">
        <bui-icon slot="label" class="left-ic" name="ion-bug"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="关于" :cellStyle="cellStyle" @click="$push('about-page.js')">
        <bui-icon slot="label" class="left-ic" name="ion-ios-information-outline"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
    </scroller>
    <!--上拉菜单,选择扫码打开方式-->
    <bui-actionsheet
      :title="qrSelectTitle"
      :items="qrOptions"
      v-model="showQrSelection"
      @itemClick="qrItemClick"
      @btnClick="showQrSelection = false">
    </bui-actionsheet>
  </div>
</template>

<script>
  const qrCode = weex.requireModule('qrCode');
  const clipboard = weex.requireModule('clipboard');

  export default {
    name: "tab-mine",
    data() {
      return {
        cellStyle: {"background-color:active": "#f2f2f2"},
        showQrSelection: false,
        qrOptions: ['WeexApp打开', 'WebView打开', '复制内容'],
        qrSelectTitle: '',
        qrContent: '',
      }
    },
    methods: {
      onSettingsClick() {
        this.$toast('暂时还未实现!');
      },
      // 扫码打开方式选择框
      qrItemClick(item, index) {
        this.showQrSelection = false;
        if (index === 0) {
          this.$push(this.qrContent)
        } else if (index === 1) {
          this.$push('simple-browser.js', {url: this.qrContent})
        } else if (index === 2) {
          clipboard.setString(this.qrContent);
          this.$toast('已复制到剪贴板!');
        }
      },
      // 扫一扫
      onQRScanClick() {
        if (qrCode) {
          qrCode.startScan({}, res => {
            if (res && res.content) {
              this.qrContent = res.content;
              this.qrSelectTitle = '选择打开方式:\n' + res.content;
              this.showQrSelection = true;
            }
          });
        } else {
          // 不支持扫码
          this.$confirm('目前所使用的Weex框架并不支持该功能，去更新最新的WeexApp框架么?', res => {
            if (res === '确定') {
              this.$push('simple-browser.js', {
                url: 'https://github.com/huzongyao/WeexAppFrame/releases'
              })
            }
          });
        }
      }
    },
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .first-line {
    margin-top: 20px;
  }

  .left-ic {
    margin-right: 10px;
  }
</style>
