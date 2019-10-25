<template>
    <div>
      <a-row style="width:200px;margin-bottom:10px">
        <a-input-search placeholder="请输入搜索内容" enter-button v-on:search="search"/>
      </a-row>
      <a-table :columns="columns" :data-source="data" bordered style="width:80%" size="small" :loading="loading">
        <template v-for="col in ['address']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <a-input-number v-if="record.editable" :default-value="text" :min="0" :max="10" :step="0.01" size="small" v-on:change="onChange"></a-input-number>
            <template v-else>{{text}}</template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class='editable-row-operations'>
        <span v-if="record.editable">
          <a v-on:click="() => save(record.key)">取消</a>
          <a v-on:click="() => cancel(record)">保存</a>
          <!-- <a-popconfirm title='确定编辑吗?' v-on:confirm="() => cancel(record)">
            <a>保存</a>
          </a-popconfirm> -->
        </span>
            <span v-else>
          <a v-on:click="() => edit(record.key)">编辑</a>
        </span>
          </div>
        </template>
      </a-table>
    </div>
</template>

<script>
    export default {
        name: "ratiobox",
      data(){
          return{
            loading:false,
            changeNum:'',
            columns:[
              {
                title: '材料类别编码',
                dataIndex: 'namecd',className:'column-money',
                width: '15%',
                scopedSlots: { customRender: 'namecd' },
              },{
                title: '材料类别',
                dataIndex: 'name',className:'column-money',
                width: '15%',
                scopedSlots: { customRender: 'name' },
              }, {
                title: '材料编码',
                dataIndex: 'age',className:'column-money',
                width: '15%',
                scopedSlots: { customRender: 'age' },
              }, {
                title: '材料名称',
                dataIndex: 'sex',className:'column-money',
                width: '25%',
                scopedSlots: { customRender: 'sex' },
              },{
                title: '转大箱数',
                dataIndex: 'address',className:'column-money',
                width: '10%',
                align:'right',
                scopedSlots: { customRender: 'address' },
              },  {
                title: '计量单位',
                dataIndex: 'unit',className:'column-money',
                width: '10%',
                scopedSlots: { customRender: 'unit' },
              },{
                title: '操作',
                width: '15%',
                dataIndex: 'operation',className:'column-money',
                scopedSlots: { customRender: 'operation' },
              }],
            data:[]
          }
      },
      mounted(){
        this.init()
      },
      methods: {
        init(){
          this.loading=true
          this.ajax.post('NNTSMesKB/BoxKeep/init',{},res=>{
              this.$message.success('基础数据初始化成功！',2)
              this.todoList()
              this.loading=false
          })
        },
        todoList(){
          this.loading=true
          //this.ajax.post("NNTSMesKB/BoxKeep/GetList
          this.ajax.post("NNTSMesKB/BoxKeep/GetList",{},res=>{
              this.data = res.data.Data.map(item=>({unit:item.UNIT,key:item.MATID,name:item.MATTYPENAME,age:item.MATCD,sex:item.MATNAME,address:item.RATIO,namecd:item.MATTYPECD}));
              this.loading=false
          })
        },

        edit (key) {
          const newData = [...this.data]
          const target = newData.filter(item => key === item.key)[0]
          if (target) {
            target.editable = true
            this.data = newData
          }
        },
        save (key) {
          const newData = [...this.data]
          const target = newData.filter(item => key === item.key)[0]
          if (target) {
            delete target.editable
            this.data = newData
            this.cacheData = newData.map(item => ({ ...item }))
          }
        },
        cancel (key) {
          console.log(key)
          const newData = [...this.data]
          const target = newData.filter(item => key === item.key)[0]
          //editBoxRatio(string MATID, string RATIO)
          var cm = this.changeNum||key.address
          var url = 'NNTSMesKB/BoxKeep/editBoxRatio?MATID='+key.key+'&RATIO='+cm
          this.ajax.post('NNTSMesKB/BoxKeep/editBoxRatio',{MATID:key.key,RATIO:cm},res=>{
              this.$message.success('编辑成功！',2)
              this.todoList()
              delete target.editable
          })
        },
        onChange(v){
          console.log(v)
          this.changeNum = v
        },
        search(v){
          this.loading=true
          var url = 'NNTSMesKB/BoxKeep/GetLists?keyword='+v
          this.ajax.post('NNTSMesKB/BoxKeep/GetLists',{keyword:v},res=>{
            this.data=res.data.Data.map(item=>({unit:item.UNIT,key:item.MATID,name:item.MATTYPENAME,age:item.MATCD,sex:item.MATNAME,address:item.RATIO,namecd:item.MATTYPECD}));
            this.loading=false
          })
        }
      },
    }
</script>

<style scoped>

</style>
