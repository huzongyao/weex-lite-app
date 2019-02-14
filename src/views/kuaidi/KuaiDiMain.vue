<template>
  <div style="background-color: #f1f1f1">
    <bui-header title="快递查询" :leftItem="leftItem" @leftClick="$pop()"></bui-header>
    <!--搜索框-->
    <bui-searchbar-left @search="onSearch" :autofocus=true placeholder="请输入快递单号" value="73107853468716">
    </bui-searchbar-left>
    <!--内容区-->
    <scroller>
      <div>
        <bui-cell :cellStyle="cellStyle" v-for="item in autoCompanies" :key="item.id" :title="item.name">
          <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
        </bui-cell>
      </div>
    </scroller>
    <!--加载弹出层-->
    <wxc-loading :show="showLoading"></wxc-loading>
  </div>
</template>

<script>
  import {WxcLoading} from 'weex-ui';
  import companyList from './companies';

  export default {
    name: "kuai-di-main",
    components: {WxcLoading},
    data() {
      return {
        urlCheckType: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=',
        urlDetail: 'http://www.kuaidi100.com/query?type=youzhengguonei&postid=9894779374320',
        leftItem: {
          icon: 'ion-android-arrow-back'
        },
        cellStyle: {"background-color:active": "#f2f2f2"},
        showLoading: false,
        autoCompanies: [],
      };
    },
    methods: {
      //查询快递公司
      onSearch(value) {
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
              this.autoCompanies = autoNew;
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

<style scoped>

</style>
