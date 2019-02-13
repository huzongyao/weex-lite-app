<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="快递查询" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
  </div>
</template>

<script>
  export default {
    name: "kuai-di-main",
    data() {
      return {
        urlCheckType: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=',
        urlDetail: 'http://www.kuaidi100.com/query?type=youzhengguonei&postid=9894779374320',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
      };
    },
  }
</script>

<style scoped>

</style>
