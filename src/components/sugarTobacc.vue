<template>
  <a-spin :spinning="cspinning">
  <a-tabs type="card">
    <a-tab-pane tab="烟叶与糖香料库存" key="1">
      <div style="margin-bottom: 10px">
      业务时间：<a-date-picker style="width: 120px"  placeholder="请选择时间" :allowClear="false" format="YYYY-MM-DD" :defaultValue="moment()" @change="dateSelect"></a-date-picker>
        成品牌号：<a-select style="width: 120px" :dropdownMatchSelectWidth="false"
                allowClear showSearch optionFilterProp="children" @change="selectChange"
                       placeholder="请选择牌号"
      >
        <a-select-option v-for="(item,index) in dataSource" :key="index" :value="item.id">{{item.name}}</a-select-option>
      </a-select>
      </div>
      <a-table :pagination="false" bordered :columns="columns" :dataSource="dataSource" size="middle" :scroll="{ y: 540 }">
        <!--<span slot="BusinessDate" slot-scope="text" style="float: left;">{{text.substr(0,4)+'-0'+text.substr(5,1)+'-'+text.substr(7,2)}}</span>-->
        <span slot="BusinessDate" slot-scope="text" style="float: left;">{{text}}</span>
        <span slot="StockNumb" slot-scope="text" style="float: right;">{{text}}</span>
        <span slot="StockNum" slot-scope="text" style="float: right;">{{text}}</span>
        <span slot="StockNums" slot-scope="text" style="float: right;">{{text}}</span>
      </a-table>
    </a-tab-pane>
    <a-tab-pane tab="二氧化碳库存" key="2">
      <a-button type="primary" style="margin-bottom: 10px" @click="inits">刷新</a-button>
      <a-table :pagination="false" bordered :columns="columnss" :dataSource="dataSources" size="middle" :scroll="{ y: 540 }">
        <span slot="Time" slot-scope="text" style="float: left;">{{text.substr(0,10)+' '+text.substr(11,8)}}</span>
        <span slot="EP1_C_WIT_1804" slot-scope="text" style="float: right;">{{text.toFixed(3)}}</span>
        <span slot="EP1_C_WIT_2017" slot-scope="text" style="float: right;">{{text.toFixed(3)}}</span>
        <span slot="StockNum" slot-scope="text" style="float: right;">{{text.toFixed(3)}}</span>
        <span slot="EP1_C_PT_1006" slot-scope="text" style="float: right;">{{text.toFixed(3)}}</span>
        <span slot="EP1_C_PT_0807" slot-scope="text" style="float: right;">{{text.toFixed(3)}}</span>
        <span slot="EP1_C_PT_1818" slot-scope="text" style="float: right;">{{text.toFixed(3)}}</span>
        <span slot="EP1_C_PT_2003" slot-scope="text" style="float: right;">{{text.toFixed(3)}}</span>
      </a-table>
    </a-tab-pane>
  </a-tabs>
  </a-spin>
</template>
<script>
  import moment from 'moment';
  export default {
    data() {
      return {
        search:{
          date:moment().format('YYYY-MM-DD'),
          cd:''
        },
        columns: [
          {title: '业务时间', width: 150,className: 'column-money', dataIndex: 'bdate',scopedSlots: {customRender: 'BusinessDate'},},
          {title: '牌号ID', width: 150,className: 'column-money', dataIndex: 'id'},
          {title: '牌号名称', width: 150,className: 'column-money', dataIndex: 'name'},
          {title: '高架库烟叶库存满足批数', width: 150,className: 'column-money', dataIndex: 'StockNum',scopedSlots: {customRender: 'StockNumb'},},
          {title: '操作人', width: 150,className: 'column-money', dataIndex: 'OperateUserName'},

          {title: '周转仓烟叶库存满足批数', width: 150,className: 'column-money', dataIndex: 'StockNumb',scopedSlots: {customRender: 'StockNumb'},},
          {title: '操作人', width: 150,className: 'column-money', dataIndex: 'OperateUserNameb'},

          {title: '糖料库存可满足批数', width: 150,className: 'column-money', dataIndex: 'StockNumc',scopedSlots: {customRender: 'StockNum'},},
          {title: '香精香料库存可满足批数', width: 150,className: 'column-money', dataIndex: 'StockNumcs',scopedSlots: {customRender: 'StockNums'},},
          {title: '操作人', width: 150,className: 'column-money', dataIndex: 'OperateUserNamec'},
        ],
        columnss: [
          {title: '时间', width: 150,className: 'column-money', dataIndex: 'Time',scopedSlots: {customRender: 'Time'},},
          {title: '储存罐重量(吨)', width: 150,className: 'column-money', dataIndex: 'EP1_C_WIT_1804',scopedSlots: {customRender: 'EP1_C_WIT_1804'},},
          {title: '工艺罐重量(吨)', width: 150,className: 'column-money', dataIndex: 'EP1_C_WIT_2017',scopedSlots: {customRender: 'EP1_C_WIT_2017'},},
          {title: '库存满足批数(8000kg/批)', width: 150,className: 'column-money', dataIndex: 'StockNum',scopedSlots: {customRender: 'StockNum'},},
          {title: '高压罐压力', width: 150,className: 'column-money', dataIndex: 'EP1_C_PT_1006',scopedSlots: {customRender: 'EP1_C_PT_1006'},},
          {title: '低压罐压力', width: 150,className: 'column-money', dataIndex: 'EP1_C_PT_0807',scopedSlots: {customRender: 'EP1_C_PT_0807'},},
          {title: '储存罐压力', width: 150,className: 'column-money', dataIndex: 'EP1_C_PT_1818',scopedSlots: {customRender: 'EP1_C_PT_1818'},},
          {title: '工艺罐压力', width: 150,className: 'column-money', dataIndex: 'EP1_C_PT_2003',scopedSlots: {customRender: 'EP1_C_PT_2003'},},
        ],
        dataSource: [],
        dataSources: [],
        cspinning:false,
      }
    },
    mounted() {
      this.init()
      this.inits()
    },
    methods: {
      moment,
      init() {
        this.sugar2bacco()
      },
      inits() {
        this.cspinning = true
        this.ajax.post('NNTSMesKB/NewCarbondioxIdesTock/GetNewCarbondioxIdesTockList', {}, res => {
          this.dataSources = res.data.Data.Data
          this.cspinning = false
        })
      },
      dateSelect(d,s){
        this.search.date=s
        this.sugar2bacco()
      },
      selectChange(c){
        this.search.cd=c
        this.sugar2bacco()
      },
      //烟叶与糖香料库存
      sugar2bacco(){
        this.cspinning = true
        this.ajax.post('NNTSMesKB/ToBaccosTock/sugarbacc', {date: this.search.date,cd:this.search.cd}, res => {
          this.dataSource = res.data.Data
          this.cspinning = false
        })
      }
    },
  }
</script>

<style scoped>

</style>
