<template>
  <Tabs>
    <TabPanel :key="1" title="烟叶与糖香料库存" >
      <div style="padding:10px">
        <DateBox v-model="date" format="yyyy-MM-dd" style="margin-bottom: 10px"></DateBox>
        <a-date-picker />
        <DataGrid :data="data" :multiSort="true" style="height:calc(100vh - 166px)">
          <GridColumn field="bdate" title="业务时间" width="130" col.title_align="true"></GridColumn>
          <GridColumn field="id" title="牌号ID" width="130"></GridColumn>
          <GridColumn field="name" title="牌号名称" width="15%"></GridColumn>
          <GridColumn field="StockNum" title="高架库烟叶库存满足批数" width="166" align="right"></GridColumn>
          <!--LEVELNAME-->
          <!--<GridColumn field="levelname" title="库存预警级别" ></GridColumn>-->
          <GridColumn field="OperateUserName" title="操作人" width="100"></GridColumn>
          <GridColumn field="StockNumb" title="周转仓烟叶库存满足批数" width="166" align="right"></GridColumn>
          <!--<GridColumn field="levelnameb" title="库存预警级别" ></GridColumn>-->
          <GridColumn field="OperateUserNameb" title="操作人" width="100"></GridColumn>
          <GridColumn field="StockNumc" title="糖料库存可满足批数" width="137" align="right"></GridColumn>
          <GridColumn field="StockNumcs" title="香精香料库存可满足批数" width="166" align="right"></GridColumn>
          <GridColumn field="OperateUserNamec" title="操作人" width="100"></GridColumn>
        </DataGrid>
      </div>
    </TabPanel>
    <TabPanel :key="2" title="二氧化碳库存" >
      <div style="padding:10px;height:calc(100vh - 120px)">
        <iframe width="100%" height="100%" frameborder="no" src="http://10.162.80.8:90/NNTSMesKB/NewCarbondioxIdesTock/NewCarbondioxIdesTockView"></iframe>
      </div>
    </TabPanel>
  </Tabs>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date(),
        data:[]
      }
    },

    mounted() {
      this.init()
    },
    methods:{
      init(){
        this.ajax.post('NNTSMesKB/ToBaccosTock/sugarbacc', {date:this.ajax.gmt2str(this.date)}, res => {
          this.data = res.data.Data
        })
      }
    },
    watch:{
      date:"init"
    }
  }
</script>

