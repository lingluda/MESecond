<template>
  <a-table bordered :pagination="false" :data-source="dataSource" size="small" :columns="columns" :scroll="{ y: 463 }" style="width:50%">
      <span slot="operation" slot-scope="text, record">
           <a-switch :checked="record.ISUSED===1" v-on:change="checkedChange(record)"/>
      </span>
  </a-table>
</template>

<script>
    export default {
      data:function(){
        return{
          dataSource: [],
          columns: [{
            title: '材料类别编码',
            width: 100,
            dataIndex: 'MATTYPECD',className:'column-money',
          },
            {
              title: '材料类别',
              width: 100,
              dataIndex: 'MATTYPENAME',className:'column-money',
            }, {
              title: '是否参与测算',
              width: 100,
              dataIndex: 'ISUSED',className:'column-money',
              scopedSlots: { customRender: 'operation' },
            }],
        }
      },
      mounted(){
        this.todoList()
      },
      methods: {
        todoList(){
          this.ajax.post('NNTSMesKB/IsMpm/GetList',{},res=>{
            this.dataSource = res.data.Data
          })
        },
        checkedChange(v){
          console.log(v.MATTYPEID,v.ISUSED)
          if(v.ISUSED===1){
            var url = 'NNTSMesKB/IsMpm/editBoxRatio?isused=0&id='+v.MATTYPEID
          }else{
            var url = 'NNTSMesKB/IsMpm/editBoxRatio?isused=1&id='+v.MATTYPEID
          }
          this.ajax.post(url,{},res=>{
            if(res.data.Data>=1){
              this.$message.success('编辑成功！',2)
              this.todoList()
            }
          })
        }
      },
    }
</script>

<style scoped>

</style>
