<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="快递查询" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <!--搜索框-->
    <bui-searchbar-left @search="onSearch" :autofocus=true placeholder="请输入快递单号">
    </bui-searchbar-left>
    <!--内容区-->
    <scroller>
      <div>
        <bui-cell :cellStyle="cellStyle" v-for="item in autoCompanies" :key="item.id"
                  :title="item.name" @click="onCompanyClick(item)">
          <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
        </bui-cell>
        <kuai-flow :items="flowData" v-if="flowData&&flowData.length>0"></kuai-flow>
      </div>
    </scroller>
    <!--加载弹出层-->
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';
  import companyList from './companies';
  import KuaiFlow from './KuaiFlow'

  export default {
    name: "kuai-di-main",
    components: {WxcLoading, KuaiFlow},
    data() {
      return {
        urlCheckType: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=',
        urlDetail: 'http://www.kuaidi100.com/query',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        cellStyle: {"background-color:active": "#f2f2f2"},
        showLoading: false,
        autoCompanies: [],
        autoNumber: '',
        flowData: [],
      };
    },
    methods: {
      // 查询快递详情
      onCompanyClick(item) {
        this.showLoading = true;
        this.flowData = [];
        this.$get({
          url: this.urlDetail,
          headers: {'user-agent': 'Android'},
          data: {type: item.number, postid: this.autoNumber}
        }).then(res => {
          if (res.status === '200') {
            let dat = res.data;
            if (dat && dat.length > 0) {
              let highlight = true;
              for (let idx in dat) {
                let datItem = dat[idx];
                let flowObj = {
                  date: datItem.time,
                  title: datItem.context.trim(),
                  highlight: highlight,
                };
                this.flowData.push(flowObj);
                highlight = false;
              }
            }
          } else {
            this.$alert(res.message)
          }
          this.showLoading = false;
        }).catch(() => {
          this.showLoading = false;
        });
      },
      //查询快递公司
      onSearch(value) {
        this.autoCompanies = [];
        this.flowData = [];
        if (value) {
          this.showLoading = true;
          this.$get({
            url: this.urlCheckType + value,
            headers: {'user-agent': 'Android'},
          }).then(res => {
            let auto = res.auto;
            if (auto && auto.length > 0) {
              let autoNew = [];
              for (let i in auto) {
                for (let j in companyList) {
                  let selCom = companyList[j];
                  if (auto[i].comCode === selCom.number) {
                    autoNew.push(selCom);
                    break;
                  }
                }
              }
              this.autoNumber = res.num;
              this.autoCompanies = autoNew;
            } else {
              this.$toast('没有匹配的快递公司')
            }
            this.showLoading = false;
          }).catch(() => {
            this.showLoading = false;
          });
        } else {
          this.$toast('请输入快递单号');
        }
      }
    },
  }
</script>

<style lang="scss" src="bui-weex/src/css/buiweex.scss"></style>
<style scoped>
</style>
