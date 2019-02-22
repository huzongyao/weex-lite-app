<template>
  <div>
    <bui-header title="我的"></bui-header>
    <scroller>
      <bui-cell title="设置" :cellStyle="cellStyle" class="first-line">
        <bui-icon slot="label" class="left-ic" name="ion-ios-gear-outline"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="扫一扫" :cellStyle="cellStyle" @click="onQRScanClick">
        <bui-icon slot="label" class="left-ic" name="ion-android-expand"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="关于" :cellStyle="cellStyle" @click="$push('about-page.js')">
        <bui-icon slot="label" class="left-ic" name="ion-ios-information-outline"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
    </scroller>
  </div>
</template>

<script>
  const qrCode = weex.requireModule('qrCode');

  export default {
    name: "tab-mine",
    data() {
      return {
        cellStyle: {"background-color:active": "#f2f2f2"},
      }
    },
    methods: {
      // 扫一扫
      onQRScanClick() {
        if (qrCode) {
          qrCode.startScan({}, res => {
            if (res) {
              this.$toast(res);
            }
          });
        } else {
          this.$toast('没有qrCode模块，无法扫一扫！');
        }
      }
    },
  }
</script>

<style scoped>
  .first-line {
    margin-top: 20px;
  }

  .left-ic {
    margin-right: 10px;
  }
</style>
