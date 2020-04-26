<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="工厂测试" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <!--选项列表-->
    <scroller>
      <bui-cell title="定位测试" :cellStyle="cellStyle" class="first-line" @click="onLocateClick">
        <bui-icon slot="label" class="left-ic" name="ion-android-locate"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="扫一扫" :cellStyle="cellStyle" @click="onQRScanClick">
        <bui-icon slot="label" class="left-ic" name="ion-android-expand"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="系统信息" :cellStyle="cellStyle" @click="onEnvInfoClick">
        <bui-icon slot="label" class="left-ic" name="ion-social-android"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="Wifi信息" :cellStyle="cellStyle" @click="onWifiInfoClick">
        <bui-icon slot="label" class="left-ic" name="ion-wifi"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="Cell信息" :cellStyle="cellStyle" @click="onCellInfoClick">
        <bui-icon slot="label" class="left-ic" name="ion-connection-bars"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="传感器信息" :cellStyle="cellStyle" @click="onSensorsInfoClick">
        <bui-icon slot="label" class="left-ic" name="ion-android-compass"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
      <bui-cell title="输入法信息" :cellStyle="cellStyle" @click="onInputMethodsInfoClick">
        <bui-icon slot="label" class="left-ic" name="ion-ios-calculator"></bui-icon>
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
    </scroller>
  </div>
</template>

<script>
  const geoLocation = weex.requireModule('location');
  const qrCode = weex.requireModule('qrCode');
  const deviceInfo = weex.requireModule('deviceInfo');

  export default {
    name: "factory-main",
    data() {
      return {
        cellStyle: {"background-color:active": "#f2f2f2"},
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        wxEnvInfo: WXEnvironment,
      }
    },
    methods: {
      // 输入法信息
      onInputMethodsInfoClick() {
        deviceInfo.getInputMethodInfo(res => {
          if (res) {
            this.$alert(JSON.stringify(res, null, '\t'));
          } else {
            this.$toast('结果为空!');
          }
        });
      },
      //基站信息
      onSensorsInfoClick() {
        deviceInfo.getSensorsInfo(res => {
          if (res) {
            this.$alert(JSON.stringify(res, null, '\t'));
          } else {
            this.$toast('结果为空!');
          }
        });
      },
      //基站信息
      onCellInfoClick() {
        deviceInfo.getCellInfo(res => {
          if (res) {
            this.$alert(JSON.stringify(res, null, '\t'));
          } else {
            this.$toast('结果为空!');
          }
        });
      },
      //Wifi信息
      onWifiInfoClick() {
        deviceInfo.getWifiInfo(res => {
          if (res) {
            this.$alert(JSON.stringify(res, null, '\t'));
          } else {
            this.$toast('结果为空!');
          }
        });
      },
      // 系统信息
      onEnvInfoClick() {
        if (this.wxEnvInfo) {
          this.$alert(JSON.stringify(this.wxEnvInfo, null, '\t'));
        }
      },
      //扫码
      onQRScanClick() {
        if (qrCode) {
          qrCode.startScan({}, res => {
            if (res) {
              this.$alert(JSON.stringify(res, null, '\t'));
            } else {
              this.$toast('结果为空!');
            }
          });
        } else {
          this.$toast('模块不可用!');
        }
      },
      // 测试定位
      onLocateClick() {
        if (geoLocation) {
          geoLocation.getLocation({}, res => {
            if (res) {
              this.$alert(JSON.stringify(res, null, '\t'));
            } else {
              this.$toast('结果为空!');
            }
          });
        } else {
          this.$toast('定位不可用!');
        }
      }
    },
  }
</script>

<style scoped>
  .left-ic {
    margin-right: 10px;
  }

  .first-line {
    margin-top: 20px;
  }
</style>
