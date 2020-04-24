<template>
  <div class="span1">
    <slider class="span1" @change="onSliderChange" :index="currentTab" infinite="false" scrollable="false">
      <component :is="item.view" class="slider-item" v-for="(item, idx) in tabItems" :key="idx"/>
    </slider>
    <div class="tab-divider"></div>
    <bui-tabbar :tabItems="tabItems" @change="onItemChange" v-model="currentTab"
                background="#f9f9f9" selectedBackground="#f9f9f9"></bui-tabbar>
  </div>
</template>

<script>
  import TabMine from './tabs/TabMine'
  import TabHome from './tabs/TabHome'
  import TabExplore from './tabs/TabExplore'

  export default {
    name: "main-page",
    components: {TabMine, TabHome, TabExplore},
    data() {
      return {
        currentTab: 0,
        tabItems: [
          {icon: "ion-home", title: "首页", view: 'tab-home'},
          {icon: "ion-planet", title: "探索", view: 'tab-explore'},
          {icon: "ion-android-person", title: "我的", view: 'tab-mine'}
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
    mounted() {
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .tab-divider {
    height: 1px;
    background-color: #eeeeee;
  }

  .slider-item {
    width: 750px;
    background-color: #f1f1f1;
  }
</style>
