<template>
  <div>
  <a-tabs type="card">
    <a-tab-pane tab="历史数据查询" key="1">
      <div style="border: 1px solid #d4d4d4;padding: 5px;margin-bottom: 10px">
        数采频率：<a-input-number :min="1" v-model="searchForm.rate" @change="ratechenge"
                             :formatter="value => `${value}秒`"
                             :parser="value => value.replace('秒', '')"
      ></a-input-number>
        <!--<a-select style="width: 120px" :value="searchForm.rate" @change="ratechenge">
       <a-select-option :value="5000">5秒</a-select-option>
       <a-select-option :value="10000">10秒</a-select-option>
       <a-select-option :value="30000">30秒</a-select-option>
       <a-select-option :value="60000">60秒</a-select-option>
      </a-select>-->
        始止时间： <a-range-picker
        :showTime="{ format: 'HH:mm:ss' }"
        :defaultValue="[moment(this.stime,'YYYY-MM-DD HH:mm:ss'),moment(this.etime,'YYYY-MM-DD HH:mm:ss')]"
        format="YYYY-MM-DD HH:mm:ss"
        :placeholder="['开始时间', '结束时间']"
        @ok="onOk"
      ><template slot="renderExtraFooter">
        请不要选择超过一个小时时间间隔，如有需要请调大刷新率！！！
      </template>
      </a-range-picker>
       <!-- 车间：<a-select v-model="chejian" style="width: 120px" disabled>
       <a-select-option :value="1">制丝车间</a-select-option>
       <a-select-option :value="2">卷包车间</a-select-option>
      </a-select>-->
        区域：
        <a-select style="width: 170px" v-model="searchForm.selectIndex" :dropdownMatchSelectWidth="false" @change="cloumnInit">
          <a-select-option :value="0">全部区域</a-select-option>
          <a-select-option :value="1">制丝ZK1</a-select-option>
         <a-select-option :value="2">制丝ZK2</a-select-option>
         <a-select-option :value="3">制丝ZK3</a-select-option>
         <a-select-option :value="4">真空回潮ZK4</a-select-option>
         <a-select-option :value="5">预车间ZK5</a-select-option>
         <a-select-option :value="6">一号贮梗丝间ZK6</a-select-option>
         <a-select-option :value="7">二号贮梗丝间ZK7</a-select-option>
         <a-select-option :value="8">贮梗丝间ZK8</a-select-option>
         <a-select-option :value="9">掺兑加香区ZK9</a-select-option>
         <a-select-option :value="10">膨胀丝处理ZK10</a-select-option>
        </a-select>
        <!-- 监测点：
        <a-select v-model="indexs" style="width: 120px">
         <a-select-option :value="1">1#</a-select-option>
         <a-select-option :value="2">2#</a-select-option>
         <a-select-option :value="3">3#</a-select-option>
         <a-select-option :value="4">4#</a-select-option>
         <a-select-option :value="5">5#</a-select-option>
         <a-select-option :value="6">6#</a-select-option>
         <a-select-option :value="7">7#</a-select-option>
        </a-select>-->
       数据项：
        <a-select mode="multiple" :disabled="sdisabled" v-model="dataIndex" style="width: 530px" :dropdownMatchSelectWidth="false" @change="Datachange">
         <a-select-option :value="0">加权平均温度</a-select-option>
         <a-select-option :value="1">监测点温度</a-select-option>
         <a-select-option :value="2">加权平均湿度</a-select-option>
         <a-select-option :value="3">监测点湿度</a-select-option>
        </a-select>
        <a-button type="primary" @click="init">查询</a-button>
        <a-button type="link" style="float: right" @click="output">导出</a-button>
      </div>
      <a-table ref="mytable" id="mytable" :pagination="false" :loading="loading"
        :columns="columns"
        :dataSource="data"
        bordered
        size="middle"
        :scroll="{ x: '100%', y: 540 }"
      />
     <!-- <DataGrid :data="data" id="mytable" style="height:250px">
        <GridColumnGroup>
          <GridHeaderRow>
            <GridColumn :rowspan="3" field="DATETIME" title="时间"></GridColumn>
            <GridColumn :colspan="4" title="制丝车间"></GridColumn>
          </GridHeaderRow>
          <GridHeaderRow>
            <GridColumn :colspan="2" title="1"  align="right"></GridColumn>
            <GridColumn :colspan="1" field="unitcost" title="2" align="right"></GridColumn>
            <GridColumn :colspan="1" field="unitcost" title="3" align="right"></GridColumn>
            </GridHeaderRow>
            <GridHeaderRow>
            <GridColumn :colspan="1" title="4" align="right"></GridColumn>
            <GridColumn :colspan="1" title="5" align="right"></GridColumn>
            <GridColumn :colspan="1" title="6" align="right"></GridColumn>
            <GridColumn :colspan="1" field="unitcost" title="7" align="right"></GridColumn>
          </GridHeaderRow>
        </GridColumnGroup>
      </DataGrid>-->
    </a-tab-pane>
    <!--<a-tab-pane tab="温湿度曲线图" key="2">Content of Tab Pane 2</a-tab-pane>-->
  </a-tabs>
  </div>
</template>
<script>
  import moment from 'moment';
  export default {
    props:{
      selectIndex:Number,
      stime:String,
      etime:String,
    },
    data() {
      return {
        sdisabled:false,
        chejian:1,
        dataIndex:[0,1,2,3],
        loading:false,

        baseData:[],
        searchForm:{
          rate:60,
          stime:this.stime,
          etime:this.etime,
          selectIndex:this.selectIndex,
        },
        data:[],
        columns:[
          {
            title: '时间',
            dataIndex: 'DATETIME',
            key: 'DATETIME',
            className:'column-money',
            width:180,
            fixed: 'left'
          },
          {
            title: '制丝车间',
            className:'column-money',
            children: [
              {
                title: '',
                className:'column-money',
                children: [
                  {
                    title: '温度',
                    className:'column-money',
                    children: [],
                  },
                  {
                    title: '湿度',
                    className:'column-money',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
        // 10 2
        cw10:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS10WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK10WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK10WD2'}],
        cs10:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS10SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK10SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK10SD2'}],
        // 9 4
        cw9:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS9WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK9WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK9WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK9WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK9WD4'}],
        cs9:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS9SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK9SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK9SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK9SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK9SD4'}],
        // 8 6
        cw8:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS8WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK8WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK8WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK8WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK8WD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK8WD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK8WD6'}],
        cs8:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS8SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK8SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK8SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK8SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK8SD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK8SD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK8SD6'}],
        // 7 4
        cw7:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS7WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK7WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK7WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK7WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK7WD4'}],
        cs7:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS7SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK7SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK7SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK7SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK7SD4'}],
        // 6 2
        cw6:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS6WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK6WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK6WD2'}],
        cs6:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS6SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK6SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK6SD2'}],
        // 5 4
        cw5:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS5WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK5WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK5WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK5WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK5WD4'}],
        cs5:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS5SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK5SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK5SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK5SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK5SD4'}],
         // 4 4
        cw4:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS4WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK4WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK4WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK4WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK4WD4'}],
        cs4:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS4SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK4SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK4SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK4SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK4SD4'}],
        // 3 6
        cw3:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS3WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK3WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK3WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK3WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK3WD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK3WD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK3WD6'}],
        cs3:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS3SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK3SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK3SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK3SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK3SD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK3SD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK3SD6'}],
        // 2 4
        cw2:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS2WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK2WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK2WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK2WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK2WD4'}],
        cs2:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS2SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK2SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK2SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK2SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK2SD4'}],
        // 1
        cw1:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS1WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK1WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK1WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK1WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK1WD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK1WD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK1WD6'},{align:'right',className:'column-money',width:100,title: '7#',dataIndex: 'ZK1WD7'}],
        cs1:[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS1SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK1SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK1SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK1SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK1SD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK1SD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK1SD6'},{align:'right',className:'column-money',width:100,title: '7#',dataIndex: 'ZK1SD7'}],

        cnmb:[{align:'right',className:'column-money',width:100, title: '',dataIndex: ''}],

      }
    },
    mounted(){
      this.init()
      this.cloumnInit()
    },
    methods:{
      moment,
      cloumnInit(){
        this.columns = [
          {
            title: '时间',
            dataIndex: 'DATETIME',
            key: 'DATETIME',
            className:'column-money',
            width:180,
          },
          {
            title: '制丝车间',
            className:'column-money',
            children: [
              {
                title: '',
                className:'column-money',
                children: [
                  {
                    title: '温度',
                    className:'column-money',
                    children: [],
                  },
                  {
                    title: '湿度',
                    className:'column-money',
                    children: [],
                  },
                ],
              },
            ],
          },
        ]
        this.sdisabled = false
        if (this.searchForm.selectIndex ==0){
          this.columns = [
            {
              title: '时间',
              dataIndex: 'DATETIME',
              key: 'DATETIME',
              className:'column-money',
              width:180,
            },
            {
              title: '制丝车间',
              className:'column-money',
              children: [
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
                {title: '', className:'column-money', children: [ { title: '温度', className:'column-money', children: [], }, { title: '湿度', className:'column-money', children: [], },],},
              ],
            },
          ]
          this.sdisabled = true
          this.columns[1].children[0].title='制丝ZK1'
          this.columns[1].children[0].children[0].children=this.cw1
          this.columns[1].children[0].children[1].children=this.cs1

          this.columns[1].children[1].title='制丝ZK2'
          this.columns[1].children[1].children[0].children=this.cw2
          this.columns[1].children[1].children[1].children=this.cs2

          this.columns[1].children[2].title='制丝ZK3'
          this.columns[1].children[2].children[0].children=this.cw3
          this.columns[1].children[2].children[1].children=this.cs3

          this.columns[1].children[3].title='真空回潮ZK4'
          this.columns[1].children[3].children[0].children=this.cw4
          this.columns[1].children[4].children[1].children=this.cs4

          this.columns[1].children[4].title='预车间ZK5'
          this.columns[1].children[4].children[0].children=this.cw5
          this.columns[1].children[4].children[1].children=this.cs5

          this.columns[1].children[5].title='一号贮梗丝间ZK6'
          this.columns[1].children[5].children[0].children=this.cw6
          this.columns[1].children[5].children[1].children=this.cs6

          this.columns[1].children[6].title='二号贮梗丝间ZK7'
          this.columns[1].children[6].children[0].children=this.cw7
          this.columns[1].children[6].children[1].children=this.cs7

          this.columns[1].children[7].title='贮梗丝间ZK8'
          this.columns[1].children[7].children[0].children=this.cw8
          this.columns[1].children[7].children[1].children=this.cs8

          this.columns[1].children[8].title='掺兑加香区ZK9'
          this.columns[1].children[8].children[0].children=this.cw9
          this.columns[1].children[8].children[1].children=this.cs9

          this.columns[1].children[9].title='膨胀丝处理ZK10'
          this.columns[1].children[9].children[0].children=this.cw10
          this.columns[1].children[9].children[1].children=this.cs10

        }
        if (this.searchForm.selectIndex ==1){
          this.columns[1].children[0].title='制丝ZK1'
          this.columns[1].children[0].children[0].children=this.cw1
          this.columns[1].children[0].children[1].children=this.cs1
        }

        if (this.searchForm.selectIndex ==2){
          this.columns[1].children[0].title='制丝ZK2'
          this.columns[1].children[0].children[0].children=this.cw2
          this.columns[1].children[0].children[1].children=this.cs2
        }

        if (this.searchForm.selectIndex ==3){
          this.columns[1].children[0].title='制丝ZK3'
          this.columns[1].children[0].children[0].children=this.cw3
          this.columns[1].children[0].children[1].children=this.cs3
        }
        if (this.searchForm.selectIndex ==4){
          this.columns[1].children[0].title='真空回潮ZK4'
          this.columns[1].children[0].children[0].children=this.cw4
          this.columns[1].children[0].children[1].children=this.cs4
        }
        if (this.searchForm.selectIndex ==5){
          this.columns[1].children[0].title='预车间ZK5'
          this.columns[1].children[0].children[0].children=this.cw5
          this.columns[1].children[0].children[1].children=this.cs5
        }
        if (this.searchForm.selectIndex ==6){
          this.columns[1].children[0].title='一号贮梗丝间ZK6'
          this.columns[1].children[0].children[0].children=this.cw6
          this.columns[1].children[0].children[1].children=this.cs6
        }
        if (this.searchForm.selectIndex ==7){
          this.columns[1].children[0].title='二号贮梗丝间ZK7'
          this.columns[1].children[0].children[0].children=this.cw7
          this.columns[1].children[0].children[1].children=this.cs7
        }

        if (this.searchForm.selectIndex ==8){
          this.columns[1].children[0].title='贮梗丝间ZK8'
          this.columns[1].children[0].children[0].children=this.cw8
          this.columns[1].children[0].children[1].children=this.cs8
        }

        if (this.searchForm.selectIndex ==9){
          this.columns[1].children[0].title='掺兑加香区ZK9'
          this.columns[1].children[0].children[0].children=this.cw9
          this.columns[1].children[0].children[1].children=this.cs9
        }

        if (this.searchForm.selectIndex ==10){
          this.columns[1].children[0].title='膨胀丝处理ZK10'
          this.columns[1].children[0].children[0].children=this.cw10
          this.columns[1].children[0].children[1].children=this.cs10
        }
        console.log(this.columns)
      },
      onOk(value) {
        this.searchForm.stime = this.ajax.gmt2strs(value[0]._d)
        this.searchForm.etime = this.ajax.gmt2strs(value[1]._d)
      },
      ratechenge(v){
        this.searchForm.rate = v
      },
      init(){
        this.loading=true
        this.ajax.post('NNTSMesKB/BoxKeep/nowData',{rate:this.searchForm.rate*1000,stime:this.searchForm.stime,etime:this.searchForm.etime},data=>{
          this.data = data.data.Data
          this.ajax.post('NNTSMesKB/BoxKeep/nowMin',{rate:this.searchForm.rate*1000,stime:this.searchForm.stime,etime:this.searchForm.etime},data=>{
            this.data.unshift(data.data.Data[0])
            this.ajax.post('NNTSMesKB/BoxKeep/nowMax',{rate:this.searchForm.rate*1000,stime:this.searchForm.stime,etime:this.searchForm.etime},data=>{
              this.data.unshift(data.data.Data[0])
              this.ajax.post('NNTSMesKB/BoxKeep/nowAvg',{rate:this.searchForm.rate*1000,stime:this.searchForm.stime,etime:this.searchForm.etime},data=>{
                this.data.unshift(data.data.Data[0])
                this.loading=false
              })
            })
          })
        })
      },
      Datachange(v){
        this.cw10=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS10WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK10WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK10WD2'}],
          this.cs10=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS10SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK10SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK10SD2'}],
            this.cw9=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS9WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK9WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK9WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK9WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK9WD4'}],
          this.cs9=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS9SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK9SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK9SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK9SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK9SD4'}],
            this.cw8=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS8WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK8WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK8WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK8WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK8WD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK8WD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK8WD6'}],
          this.cs8=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS8SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK8SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK8SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK8SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK8SD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK8SD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK8SD6'}],
            this.cw7=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS7WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK7WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK7WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK7WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK7WD4'}],
          this.cs7=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS7SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK7SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK7SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK7SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK7SD4'}],
            this.cw6=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS6WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK6WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK6WD2'}],
          this.cs6=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS6SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK6SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK6SD2'}],
            this.cw5=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS5WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK5WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK5WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK5WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK5WD4'}],
          this.cs5=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS5SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK5SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK5SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK5SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK5SD4'}],
            this.cw4=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS4WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK4WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK4WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK4WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK4WD4'}],
          this.cs4=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS4SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK4SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK4SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK4SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK4SD4'}],
            this.cw3=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS3WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK3WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK3WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK3WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK3WD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK3WD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK3WD6'}],
          this.cs3=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS3SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK3SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK3SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK3SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK3SD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK3SD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK3SD6'}],
            this.cw2=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS2WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK2WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK2WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK2WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK2WD4'}],
          this.cs2=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS2SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK2SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK2SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK2SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK2SD4'}],
            this.cw1=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS1WD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK1WD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK1WD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK1WD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK1WD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK1WD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK1WD6'},{align:'right',className:'column-money',width:100,title: '7#',dataIndex: 'ZK1WD7'}],
          this.cs1=[{align:'right',className:'column-money',width:100, title: '加权平均',dataIndex: 'ZS1SD'},{align:'right',className:'column-money',width:100,title: '1#',dataIndex: 'ZK1SD1'},{align:'right',className:'column-money',width:100,title: '2#',dataIndex: 'ZK1SD2'},{align:'right',className:'column-money',width:100,title: '3#',dataIndex: 'ZK1SD3'},{align:'right',className:'column-money',width:100,title: '4#',dataIndex: 'ZK1SD4'},{align:'right',className:'column-money',width:100,title: '5#',dataIndex: 'ZK1SD5'},{align:'right',className:'column-money',width:100,title: '6#',dataIndex: 'ZK1SD6'},{align:'right',className:'column-money',width:100,title: '7#',dataIndex: 'ZK1SD7'}]
        if(v.toString()==[].toString()){
          this.cs1 =[]
          this.cw1 =[]
          this.cs2 =[]
          this.cw2 =[]
          this.cs3 =[]
          this.cw3 =[]
          this.cs4 =[]
          this.cw4 =[]
          this.cs5 =[]
          this.cw5 =[]
          this.cs6 =[]
          this.cw6 =[]
          this.cs7 =[]
          this.cw7 =[]
          this.cs8 =[]
          this.cw8 =[]
          this.cs9 =[]
          this.cw9 =[]
          this.cs10 =[]
          this.cw10 =[]
          this.cloumnInit()
        }
        if(v.sort().toString()==[0,1,2].sort().toString()){
          this.cs1.splice(1,7)
          this.cs2.splice(1,4)
          this.cs3.splice(1,6)
          this.cs4.splice(1,4)
          this.cs5.splice(1,7)
          this.cs6.splice(1,4)
          this.cs7.splice(1,4)
          this.cs8.splice(1,6)
          this.cs9.splice(1,4)
          this.cs10.splice(1,2)
          this.cloumnInit()
        }
        if(v.sort().toString()==[0,1,3].sort().toString()){
          this.cs1.shift()
          this.cs2.shift()
          this.cs3.shift()
          this.cs4.shift()
          this.cs5.shift()
          this.cs6.shift()
          this.cs7.shift()
          this.cs8.shift()
          this.cs9.shift()
          this.cs10.shift()
          this.cloumnInit()
        }
        if(v.sort().toString()==[0,2,3].sort().toString()){
          this.cw1.splice(1,7)
          this.cw2.splice(1,4)
          this.cw3.splice(1,6)
          this.cw4.splice(1,4)
          this.cw5.splice(1,7)
          this.cw6.splice(1,4)
          this.cw7.splice(1,4)
          this.cw8.splice(1,6)
          this.cw9.splice(1,4)
          this.cw10.splice(1,2)
          this.cloumnInit()
        }
        if(v.sort().toString()==[1,2,3].sort().toString()){
          this.cw1.shift()
          this.cw2.shift()
          this.cw3.shift()
          this.cw4.shift()
          this.cw5.shift()
          this.cw6.shift()
          this.cw7.shift()
          this.cw8.shift()
          this.cw9.shift()
          this.cw10.shift()
          this.cloumnInit()
        }
        if(v.sort().toString()==[0,1].sort().toString()){
          this.cs1 = this.cnmb
          this.cs2 = this.cnmb
          this.cs3 = this.cnmb
          this.cs4 = this.cnmb
          this.cs5 = this.cnmb
          this.cs6 =  this.cnmb
          this.cs7 =  this.cnmb
          this.cs8 =  this.cnmb
          this.cs9 =  this.cnmb
          this.cs10 =  this.cnmb
          this.cloumnInit()
        }
        if(v.sort().toString()==[1,2].sort().toString()){
          console.log('12')
          this.cw1.shift()
          this.cw2.shift()
          this.cw3.shift()
          this.cw4.shift()
          this.cw5.shift()
          this.cw6.shift()
          this.cw7.shift()
          this.cw8.shift()
          this.cw9.shift()
          this.cw10.shift()
          this.cs1.splice(1,7)
          this.cs2.splice(1,4)
          this.cs3.splice(1,6)
          this.cs4.splice(1,4)
          this.cs5.splice(1,7)
          this.cs6.splice(1,4)
          this.cs7.splice(1,4)
          this.cs8.splice(1,6)
          this.cs9.splice(1,4)
          this.cs10.splice(1,2)
          this.cloumnInit()

        }
        if(v.sort().toString()==[0,3].sort().toString()){
          this.cw1.splice(1,7)
          this.cw2.splice(1,4)
          this.cw3.splice(1,6)
          this.cw4.splice(1,4)
          this.cw5.splice(1,7)
          this.cw6.splice(1,4)
          this.cw7.splice(1,4)
          this.cw8.splice(1,6)
          this.cw9.splice(1,4)
          this.cs1.shift()
          this.cs2.shift()
          this.cs3.shift()
          this.cs4.shift()
          this.cs5.shift()
          this.cs6.shift()
          this.cs7.shift()
          this.cs8.shift()
          this.cs9.shift()
          this.cs10.shift()
          this.cw10.splice(1,2)
          this.cloumnInit()
        }
        if(v.sort().toString()==[0,2].sort().toString()){
          this.cw1.splice(1,7)
          this.cw2.splice(1,4)
          this.cw3.splice(1,6)
          this.cw4.splice(1,4)
          this.cw5.splice(1,7)
          this.cw6.splice(1,4)
          this.cw7.splice(1,4)
          this.cw8.splice(1,6)
          this.cw9.splice(1,4)
          this.cw10.splice(1,2)
          this.cs1.splice(1,7)
          this.cs2.splice(1,4)
          this.cs3.splice(1,6)
          this.cs4.splice(1,4)
          this.cs5.splice(1,7)
          this.cs6.splice(1,4)
          this.cs7.splice(1,4)
          this.cs8.splice(1,6)
          this.cs9.splice(1,4)
          this.cs10.splice(1,2)
          this.cloumnInit()
        }
        if(v.sort().toString()==[1,3].sort().toString()){
          this.cw1.shift()
          this.cw2.shift()
          this.cw3.shift()
          this.cw4.shift()
          this.cw5.shift()
          this.cw6.shift()
          this.cw7.shift()
          this.cw8.shift()
          this.cw9.shift()
          this.cw10.shift()

          this.cs1.shift()
          this.cs2.shift()
          this.cs3.shift()
          this.cs4.shift()
          this.cs5.shift()
          this.cs6.shift()
          this.cs7.shift()
          this.cs8.shift()
          this.cs9.shift()
          this.cs10.shift()
          this.cloumnInit()
        }
        if(v.sort().toString()==[2,3].sort().toString()){
          this.cw1 = this.cnmb
          this.cw2 = this.cnmb
          this.cw3 = this.cnmb
          this.cw4 = this.cnmb
          this.cw5 = this.cnmb
          this.cw6 =  this.cnmb
          this.cw7 =  this.cnmb
          this.cw8 =  this.cnmb
          this.cw9 =  this.cnmb
          this.cw10 =  this.cnmb
          this.cloumnInit()
        }
        if(v.sort().toString()==[0].sort().toString()){
          this.cw1.splice(1,7)
          this.cw2.splice(1,4)
          this.cw3.splice(1,6)
          this.cw4.splice(1,4)
          this.cw5.splice(1,7)
          this.cw6.splice(1,4)
          this.cw7.splice(1,4)
          this.cw8.splice(1,6)
          this.cw9.splice(1,4)
          this.cw10.splice(1,2)
          this.cs1 = this.cnmb
          this.cs2 = this.cnmb
          this.cs3 = this.cnmb
          this.cs4 = this.cnmb
          this.cs5 = this.cnmb
          this.cs6 =  this.cnmb
          this.cs7 =  this.cnmb
          this.cs8 =  this.cnmb
          this.cs9 =  this.cnmb
          this.cs10 =  this.cnmb
          this.cloumnInit()
        }
        if(v.sort().toString()==[1].sort().toString()){
          this.cw1.shift()
          this.cw2.shift()
          this.cw3.shift()
          this.cw4.shift()
          this.cw5.shift()
          this.cw6.shift()
          this.cw7.shift()
          this.cw8.shift()
          this.cw9.shift()
          this.cw10.shift()
          this.cs1 = this.cnmb
          this.cs2 = this.cnmb
          this.cs3 = this.cnmb
          this.cs4 = this.cnmb
          this.cs5 = this.cnmb
          this.cs6 =  this.cnmb
          this.cs7 =  this.cnmb
          this.cs8 =  this.cnmb
          this.cs9 =  this.cnmb
          this.cs10 =  this.cnmb
          this.cloumnInit()
        }
        if(v.sort().toString()==[2].sort().toString()){

          this.cs1.splice(1,7)
          this.cs2.splice(1,4)
          this.cs3.splice(1,6)
          this.cs4.splice(1,4)
          this.cs5.splice(1,7)
          this.cs6.splice(1,4)
          this.cs7.splice(1,4)
          this.cs8.splice(1,6)
          this.cs9.splice(1,4)
          this.cs10.splice(1,2)
          this.cw1 = this.cnmb
          this.cw2 = this.cnmb
          this.cw3 = this.cnmb
          this.cw4 = this.cnmb
          this.cw5 = this.cnmb
          this.cw6 =  this.cnmb
          this.cw7 =  this.cnmb
          this.cw8 =  this.cnmb
          this.cw9 =  this.cnmb
          this.cw10 =  this.cnmb
          this.cloumnInit()
        }
        if(v.sort().toString()==[3].sort().toString()){
          this.cs1.shift()
          this.cs2.shift()
          this.cs3.shift()
          this.cs4.shift()
          this.cs5.shift()
          this.cs6.shift()
          this.cs7.shift()
          this.cs8.shift()
          this.cs9.shift()
          this.cs10.shift()
          this.cw1 = this.cnmb
          this.cw2 = this.cnmb
          this.cw3 = this.cnmb
          this.cw4 = this.cnmb
          this.cw5 = this.cnmb
          this.cw6 =  this.cnmb
          this.cw7 =  this.cnmb
          this.cw8 =  this.cnmb
          this.cw9 =  this.cnmb
          this.cw10 =  this.cnmb
          this.cloumnInit()
        }
        if(v.sort().toString()==[0,1,2,3].sort().toString()){
          this.cloumnInit()
        }
        //this.sdisabled=true
        /*this.cloumnInit()
        if (v==0){

        }
        if (v==1){
          this.columns[1].children[0].children[0].children.splice(1,this.columns[1].children[0].children[0].children.length);
          this.columns[1].children[0].children.pop()
        }
        if (v==2){
          this.columns[1].children[0].children[0].children.shift();
          this.columns[1].children[0].children.pop()
        }
        if (v==3){
          this.columns[1].children[0].children[1].children.splice(1,this.columns[1].children[0].children[1].children.length);
          this.columns[1].children[0].children.shift()
        }
        if (v==4){
          this.columns[1].children[0].children.shift()
          this.columns[1].children[0].children[0].children.shift();
        }*/
      },
      output(){
        // let table = this.$refs.mytable._vnode.data.props
        let sheet = this.$xlsx.utils.table_to_sheet(document.getElementById("mytable"))
        let wb = {
          SheetNames: ['mySheet'],
          Sheets: {
            mySheet: sheet
          }
        };
        this.$xlsx.writeFile(wb, 'output_test1.xlsx');
      }
    },
  };
</script>
