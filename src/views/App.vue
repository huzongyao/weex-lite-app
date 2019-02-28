<template>
  <div class="center">
    <bui-image src="/image/logo.png" width="120px" height="120px"></bui-image>
    <text class="h2">Weex Lite App</text>
    <text class="h4">基于Weex, BUI-Weex</text>
    <bui-button type="primary" class="btn-start" value="快速体验" @click="jumpTo"></bui-button>
  </div>
</template>

<script>
  const globalEvent = weex.requireModule('globalEvent');
  import CommonMix from '../mixins/common'

  module.exports = {
    mixins: [CommonMix],
    data() {
      return {}
    },
    mounted() {
      this._registerBackListener();
    },
    methods: {
      jumpTo() {
        this.$push('splash-page.js', {actionbar: false});
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
  .btn-start {
    margin-top: 20px;
  }
</style>
