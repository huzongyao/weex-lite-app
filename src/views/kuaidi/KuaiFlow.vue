<template>
  <div class="bui-flow-box">
    <div class="bui-flow" v-for="(item, index) in newItems" @click="_click(index)">
      <div class="bui-flow-list">
        <div class="bui-flow-line"
             :style="Object.assign({'top': (index===0 ? '20px': '0px'),'bottom': (index===newItems.length-1 ? '20px': '0px')}, item.lineStyle)"></div>
        <div class="bui-flow-header-point" :class="[item.highlight ? 'highlight-point':'']"
             :style="item.pointStyle"></div>
        <text v-if="item.title" class="bui-flow-text bui-flow-header-title" style="padding-bottom: -30px"
              :class="[item.highlight ? 'text-highlight-title':'']" :style="item.titleStyle">{{item.title}}
        </text>
      </div>
      <div class="bui-flow-main bui-flow-list">
        <div class="bui-flow-line"
             :style="Object.assign({'width': (index===newItems.length-1 ? '0px':'2px')}, item.lineStyle)"></div>
        <div class="bui-flow-text bui-flow-main-desc">
          <text v-if="item.desc" class="desc-text">{{item.desc}}</text>
          <text v-if="item.date" class="desc-date">{{item.date}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kuai-flow",
    props: {
      //数据
      items: {
        type: Array
      },
      //自定义
      customStyles: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {},
    computed: {
      newItems() {
        return this.initItems(this.items);
      }
    },
    methods: {
      _click(index) {
        this.$emit('click', index);
      },
      initItems(items) {
        const {
          lineColor,
          pointInnerColor,
          pointBorderColor,
          highlightTitleColor,
          highlightPointInnerColor,
          highlightPointBorderColor
        } = this.customStyles;
        const pre = Date.now();
        return items.map((item, index) => {
          item.key = `${pre}_${index}`;
          item.pointStyle = {};
          item.lineStyle = {};
          item.titleStyle = {};
          if (lineColor) item.lineStyle.backgroundColor = lineColor;
          if (pointInnerColor) item.pointStyle.backgroundColor = pointInnerColor;
          if (pointBorderColor) item.pointStyle.borderColor = pointBorderColor;
          if (item.highlight) {
            if (highlightTitleColor) item.titleStyle.color = highlightTitleColor;
            if (highlightPointInnerColor) item.pointStyle.backgroundColor = highlightPointInnerColor;
            if (highlightPointBorderColor) item.pointStyle.borderColor = highlightPointBorderColor;
          }
          return item;
        });
      }
    }
  }
</script>

<style lang="scss" src="bui-weex/src/css/flow.scss"></style>
<style scoped>
  .bui-flow-text {
    width: 660px;
  }
</style>
