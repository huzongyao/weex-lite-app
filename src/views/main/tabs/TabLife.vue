<template>
  <div>
    <bui-header title="生活"></bui-header>
    <scroller>
      <div class="flex-row flex-fluid row-apps">
        <div v-for="(item, idx) in iconApps" :key="idx" class="center app-item">
          <bui-icon :name="item.icon" size=96 class="icon-btn" color="white" @click="$push(item.link)"></bui-icon>
          <text class="app-title">{{item.name}}</text>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: "tab-life",
    data() {
      return {
        iconApps: []
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
  }

  .app-item {
    margin-top: 30px;
    width: 187.5px;
  }

  .app-title {
    font-size: 26px;
    margin-top: 4px;
    line-height: 40px;
    color: #464c5b;
  }

  .icon-btn {
    border-radius: 6px;
    background-color: #00B4FF;
  }
</style>
