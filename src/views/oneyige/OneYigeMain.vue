<template>
  <div style="background-color: #f1f1f1">
    <bui-header :title="pageTitle" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-dropload @refresh="getItemByDate" class="drop-loader" :hasLoading="false">
      <!--顶部天气-->
      <cell class="flex-row row-space-between top-row" v-if="weatherData.date&&currentDate==0">
        <text class="h4">{{weatherData.date}}</text>
        <text class="h4">{{weatherData.city_name+'·'+weatherData.climate+':'+weatherData.temperature}}℃</text>
      </cell>
      <!--列表内容-->
      <cell v-for="item in contentList" :key="item.id">
        <div class="list-item" @click="onItemClick(item)">
          <bui-image class="list-img" :src="item.img_url" resize="cover"
                     @click="onItemClick(item)"></bui-image>
          <text class="h5 span1 list-title">{{item.forward}}</text>
        </div>
      </cell>
      <!--底部按钮-->
      <cell class="flex-row row-space-between bottom-row" v-if="curDateString">
        <bui-button class="ex-btn" value="前一天" type="highlight" @click="onYesterdayClick">
          <bui-icon name="ion-ios-arrow-back" color="#EE9900"></bui-icon>
        </bui-button>
        <bui-button class="ex-btn" value="今天" type="highlight" @click="onTodayClick">
          <bui-icon name="ion-android-checkmark-circle" color="#EE9900"></bui-icon>
        </bui-button>
      </cell>
    </bui-dropload>
    <!--loading弹层-->
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';
  import moment from 'moment';

  export default {
    components: {WxcLoading,},
    name: "one-yige-main",
    data() {
      return {
        urls: {
          itemByDate: 'http://v3.wufazhuce.com:8000/api/channel/one/',
        },
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        pageTitle: '旺一个',
        currentDate: '0',
        curDateString: '',
        showLoading: false,
        weatherData: {},
        contentList: [],
      };
    },
    mounted() {
      this.showLoading = true;
      this.getItemByDate()
    },
    methods: {
      // 根据currentDate获取数据，获取今天数据传0
      getItemByDate(next) {
        let url = this.urls.itemByDate + this.currentDate + '/0';
        this.$get({
          url: url,
          headers: {'user-agent': 'Android'},
        }).then(res => {
          this.showLoading = false;
          this.showResData(res);
          next && next();
        }).catch(() => {
          this.showLoading = false;
          next && next();
        });
      },
      showResData(res) {
        try {
          this.weatherData = res.data.weather;
          this.contentList = res.data.content_list;
          this.curDateString = res.data.date;
          this.pageTitle = '旺一个(' + this.getTodayDate() + ')';
        } catch (e) {
        }
      },
      onYesterdayClick() {
        this.showLoading = true;
        this.currentDate = this.getBeforeDate();
        this.getItemByDate()
      },
      onTodayClick() {
        this.showLoading = true;
        this.currentDate = '0';
        this.getItemByDate()
      },
      getTodayDate() {
        if (this.curDateString) {
          try {
            return moment(this.curDateString).format('YYYY-MM-DD');
          } catch (e) {
            this.$alert(e)
          }
        }
        return '0';
      },
      getBeforeDate() {
        if (this.curDateString) {
          try {
            return moment(this.curDateString).subtract(1, 'days').format('YYYY-MM-DD');
          } catch (e) {
            this.$alert(e)
          }
        }
        return '0';
      },
      // 查看详情
      onItemClick(item) {
        if (item.category === '0') {
          this.$toast('这个没有内容，试试其他的!');
        } else if (item.content_id) {
          this.$push('one-yige-detail.js', {
            id: item.content_id,
            category: item.category
          })
        }
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>

  .list-img {
    width: 710px;
    height: 411px;
    background-color: #dddddd;
    border-radius: 4px;
  }

  .list-title {
    margin: 10px 0;
  }

  .list-item {
    margin: 5px 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
  }

  .list-item:active {
    background-color: #f6f6f6;
  }

  .top-row {
    padding: 10px 20px;
  }

  .bottom-row {
    padding: 40px;
  }

  .drop-loader {
    margin-top: -1px;
  }
</style>
