<template>
  <div style="background-color: #87CEFF">
    <bui-header title="天气信息" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <div class="flex1">
      <!--背景图层-->
      <bui-image class="flex1 back-image" :src="getBackImage" resize="cover"></bui-image>
      <div class="content-layer">
        <!--头部布局-->
        <div class="center top-con">
          <text class="h3 white-txt city-txt">{{metaData.city}}</text>
          <text class="white-txt temp-txt">{{observeData.temp}} ℃</text>
          <text class="h4 white-txt">{{observeData.wthr}}</text>
          <text class="h4 white-txt">{{envData.pm10}}{{envData.quality}}</text>
        </div>
        <!--中间布局-->
        <div class="flex-row con-block" @click="gotoWeatherWeb">
          <div class="flex1 center">
            <text class="middle-txt">湿度{{observeData.shidu}}</text>
          </div>
          <div class="flex1 center">
            <text class="middle-txt">{{observeData.wd}}{{observeData.wp}}</text>
          </div>
          <div class="flex1 center">
            <text class="middle-txt">{{observeData.up_time}}更新</text>
          </div>
        </div>
        <!--生活指数布局-->
        <div class="life-block">
          <text class="h4 life-title">生活指数</text>
          <div class="flex-row flex-fluid">
            <div v-for="(item, i) in indexesData" :key="i"
                 class="center life-item" v-if="item.ext.icon">
              <bui-image class="life-img" :src="item.ext.icon"></bui-image>
              <text class="life-txt">{{item.valueV2}}</text>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--加载弹出层-->
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  const geoLocation = weex.requireModule('location');
  import {WxcLoading} from 'weex-ui';

  export default {
    name: "weather-main",
    components: {WxcLoading},
    computed: {
      getBackImage() {
        try {
          return this.observeData.day.bgPic;
        } catch (e) {
        }
        return '';
      }
    },
    data() {
      return {
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        urls: {
          getCity: 'http://zhwnlapi.etouch.cn/Ecalender/api/city',
          getWeather: 'http://zhwnlapi.etouch.cn/Ecalender/api/v2/weather?app_key=99817749&citykey=',
        },
        showLoading: false,
        weatherData: {},
        metaData: {},
        observeData: {},
        envData: {},
        indexesData: [],
      }
    },
    mounted() {
      this.showLoading = true;
      if (geoLocation) {
        geoLocation.getLocation({}, res => {
          this.getCityInfo(res);
        });
      } else {
        this.getCityInfo(null);
      }
    },
    methods: {
      // 跳转到网页版
      gotoWeatherWeb() {
        if (this.weatherData.weatherUrls) {
          let url = this.weatherData.weatherUrls.w_forecast_90;
          this.$push('simple-browser.js', {url: url});
        }
      },
      // 获取当前城市
      getCityInfo(location) {
        let la = '';
        let lo = '';
        if (location) {
          la = location.latitude;
          lo = location.longitude;
        }
        this.$get({
          url: this.urls.getCity,
          headers: {'user-agent': 'Android'},
          data: {lon: lo, lat: la, type: 'gps'},
        }).then(res => {
          this.getCurrentWeather(res);
        }).catch(() => {
          this.showLoading = false;
        })
      },
      // 获取当前天气
      getCurrentWeather(res) {
        if (res && res.data && res.data.length > 0) {
          let cityInfo = res.data[0];
          if (cityInfo && cityInfo.cityid) {
            this.$get({
              url: this.urls.getWeather + cityInfo.cityid,
              headers: {'user-agent': 'Android'},
            }).then(res => {
              this.showLoading = false;
              this.weatherData = res;
              this.metaData = res.meta;
              this.observeData = res.observe;
              this.envData = res.evn;
              this.indexesData = res.indexes;
            }).catch(() => {
              this.showLoading = false;
            });
            return;
          }
        }
        this.showLoading = false;
      },
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .content-layer {
    padding: 25px;
  }

  .life-txt {
    color: white;
    font-size: 26px;
  }

  .life-item {
    width: 175px;
    margin: 20px 0;
  }

  .life-title {
    padding: 0 25px;
    color: white;
  }

  .life-img {
    width: 100px;
    height: 100px;
  }

  .life-block {
    margin-top: 20px;
    padding: 25px 0;
    background-color: rgba(60, 60, 60, 0.2);
  }

  .con-block {
    padding: 15px;
    margin-top: 10px;
    background-color: rgba(60, 60, 60, 0.2);
  }

  .top-con {
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #f7f7f7;
  }

  .back-image {
    position: fixed;
  }

  .white-txt {
    color: white;
  }

  .city-txt {
    margin: 20px;
  }

  .temp-txt {
    font-size: 140px;
  }

  .middle-txt {
    color: white;
    font-size: 30px;
  }
</style>
