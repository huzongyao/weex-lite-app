<template>
  <div>
    <bui-header title="计算器" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <!--显示区域-->
    <div class="display-con">
      <text class="dis-text" v-cloak>{{ formula }}</text>
      <text class="dis-text" v-cloak>{{ result }}</text>
    </div>
    <!--键盘区域-->
    <div>
      <div class="flex-row button-row" v-for="(line,idx) in allKeyArray" :key="idx">
        <div class="flex1 center key-item" v-for="(it,lidx) in line" :key="lidx" @click="onKeyClick(it)">
          <text class="key-text">{{it}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "weex-calculator",
    data() {
      return {
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        formula: '',
        result: '0',
        allKeyArray: [
          ['AC', '±', '%', '/'],
          ['7', '8', '9', '*'],
          ['4', '5', '6', '-'],
          ['1', '2', '3', '+'],
          ['0', '00', '.', '='],
        ],
      };
    },
    methods: {
      onKeyClick(k) {
        if (k == '=') {
          try {
            this.result = eval(this.formula);
          } catch (e) {
          }
          this.formula = ' ';
        } else if (k == 'AC') {
          this.formula = ' ';
        } else {
          this.formula += k;
        }
      },
    },
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped lang="scss">
  [v-cloak] {
    display: none;
  }

  .button-row {
    border-bottom-width: 1px;
    border-bottom-color: #dddddd;
  }

  .key-item {
    padding: 54px 0;
    border-right-width: 1px;
    border-right-color: #dddddd;
  }

  .key-item:active {
    background-color: #cccccc;
  }

  .key-text {
    font-size: 48px;
  }

  .display-con {
    background-color: #717171;
    padding: 20px;
  }

  .dis-text {
    font-size: 60px;
    color: white;
    height: 70px;
    text-align: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
