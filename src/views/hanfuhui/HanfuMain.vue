<template>
  <div>
    <bui-header title="汉服美" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <bui-tabbar :tabItems="tabItems" @change="onItemChange" background="#f9f9f9" selectedBackground="#f9f9f9"
                v-model="currentTab" titleSize="30" height="90" showSelectedLine=true></bui-tabbar>
    <div class="tab-divider"></div>
    <slider @change="onSliderChange" :index="currentTab" infinite="false" class="span1">
      <hanfu-tab v-for="item in tabItems" :rank-type="item.type" :key="item.type" class="slider-item"></hanfu-tab>
    </slider>
  </div>
</template>

<script>
  import HanfuTab from './HanfuTab';

  export default {
    name: "hanfu-main",
    components: {HanfuTab},
    data() {
      return {
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        currentTab: 0,
        tabItems: [
          {title: "周榜单", type: '1'},
          {title: "月榜单", type: '2'},
          {title: "获奖作", type: '3'}
        ]
      }
    },
    methods: {
      onItemChange(index) {

      },
      onSliderChange(e) {
        this.currentTab = e.index;
      }
    },
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .tab-divider {
    height: 1px;
    background-color: #eeeeee;
  }

  .slider-item {
    background-color: #f1f1f1;
  }
</style>
