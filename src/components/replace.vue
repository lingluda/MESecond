<template>
  <div>
    <!-- 删除 -->
    <a-modal title="系统提示" v-model="delvisible" v-if="delvisible" v-on:ok="delhandleOk" ok-text="确认" cancel-text="取消">
      <p>确定删除 {{delname}} 吗？</p>
      <template slot="footer">
        <a-button type="primary" @click="delhandleOk">确定</a-button>
        <a-button @click="delhandleCC">取消</a-button>
      </template>
    </a-modal>
    <!--@*新增模态框*@-->
    <a-modal title="新增" v-model="addvisible" v-if="addvisible" v-on:ok="addhandleOk" ok-text="确认" cancel-text="取消">
      <a-form :form="addform">
        <a-form-item label="材料名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-decorator="[ 'mat',{rules: [{ required: true, message: '请选中' }]}]"
                    show-search placeholder="请选择" optionFilterProp="children" :filter-option="false"
                    v-on:search="fetchM" label-in-value :value="materialId" v-on:change="selected"
          >
            <a-select-option v-for="(item,index) in materialList" :value="item.CD">{{item.NAME}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="材料编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="matcd"/>
        </a-form-item>
        <a-form-item label="代替材料名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-decorator="[ 'remat',{rules: [{ required: true, message: '请选中' }]}]"
                    show-search placeholder="请选择" optionFilterProp="children" :filter-option="false"
                    v-on:search="fetchM" label-in-value :value="rematerialId" v-on:change="reselected"
          >
            <a-select-option v-for="(item,index) in materialList" :value="item.CD">{{item.NAME}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="代替材料编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="rematcd"/>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button type="primary" @click="addhandleOk">保存</a-button>
        <a-button @click="addhandleCC">取消</a-button>
      </template>
    </a-modal>
    <!--@*编辑模态框*@-->
    <a-modal title="编辑" v-model="editvisible" v-if="editvisible" v-on:ok="edithandleOk" ok-text="确认" cancel-text="取消">
      <a-form :form="editform">
        <a-form-item label="材料编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="editform.MATCD" disabled/>
        </a-form-item>

        <a-form-item label="材料编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="editform.MATNAME" disabled/>
        </a-form-item>
        <a-form-item label="代替材料名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select :default-value="editform.REPLACEMATCD" v-on:search="fetchM" label-in-value show-search
                    :filter-option="false" v-on:change="reselected">
            <a-select-option v-for="(item,index) in materialList" :value="item.CD">{{item.NAME}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="代替材料编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="rematcd"/>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button type="primary" @click="edithandleOk">保存</a-button>
        <a-button @click="edithandleCC">取消</a-button>
      </template>
    </a-modal>
    <!--@*搜索头部*@-->
    <a-row>
      <a-col span="12">
        <a-input-search placeholder="请输入搜索内容" enter-button style="width:200px" v-on:search="search"/>
      </a-col>
      <a-col span="12">
        <a-button type="primary" style="border-radius:20px" v-on:click="addModal">新增</a-button>
      </a-col>
    </a-row>
    <!--@*表格*@-->
    <a-table :columns="columns" size="small" :data-source="data" bordered
             style="width:60%;margin-top:10px">
    <span slot="action" slot-scope="text, record">
        <a href="javascript:;" v-on:click="() => editModel(record)">编辑</a>
        <a href="javascript:;" v-on:click="() => delModel(record)">删除</a>
    </span>
    </a-table>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        matcd: '',
        materialId: '',
        rematcd: '',
        rematerialId: '',
        materialList: [],
        addform: this.$form.createForm(this),
        editform: this.$form.createForm(this),
        current: 1,
        columns: [
          {title: '材料代码', dataIndex: 'MATCD', className: 'column-money',},
          {title: '材料名称', dataIndex: 'MATNAME', className: 'column-money',},
          {title: '替代材料代码', dataIndex: 'REPLACEMATCD', className: 'column-money',},
          {title: '替代材料名称', dataIndex: 'REPLACEMATNAME', className: 'column-money',},
          {title: '操作', dataIndex: '', className: 'column-money', key: 'x', scopedSlots: {customRender: 'action'}}],
        data: [],
        addvisible: false,
        editvisible: false,
        delvisible: false,
        delid: '',
        delname: '',
      }
    },
    mounted() {
      this.todoList()
    },
    methods: {
      //初始化列表
      todoList() {
        this.ajax.post('NNTSMesKB/Replace/GetList',{},res => {
            this.data = res.data.Data
        })
      },
      //材料查询
      fetchM(v) {
        this.materialList = []
        var url = 'NNTSMesKB/Replace/material'
        this.ajax.post(url,{name:v},res => {
            this.materialList = res.data.Data
        })
      },
      //材料选中
      selected(v) {
        this.matcd = v.key
      },
      //重复材料选中
      reselected(v) {
        console.log(v)
        this.rematcd = v.key
        this.editform.REPLACEMATCD = v.key
        this.editform.REPLACEMATNAME = v.label
      },
      //编辑模态框
      editModel(v) {
        this.editform = v
        this.editvisible = true
        console.log(this.editform)
      },
      //删除模态框
      delModel(v) {
        console.log(v.MATCD)
        this.delid = v.MATCD
        this.delname = v.MATNAME
        this.delvisible = true
      },
      //确定删除
      delhandleOk() {
        //delBoxRatio(string id)
        var url = 'NNTSMesKB/Replace/delBoxRatio'
        this.ajax.post(url,{id:this.delid},res => {
            this.delvisible = false
            this.todoList()
            this.$message.success('删除成功！', 2)
        })

      },
      addModal() {
        this.addvisible = true
      },
      //新增提交校验
      addhandleOk(e) {
        e.preventDefault();
        this.addform.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            //addBoxRatio(string MATCD, string MATNAME, string REPLACEMATNAME, string REPLACEMATCD, string REPLACEMATID)
            var url = 'NNTSMesKB/Replace/addBoxRatio?MATCD=' + values.mat.key + '&MATNAME=' + values.mat.label + '&REPLACEMATCD=' + values.remat.key + '&REPLACEMATNAME=' + values.remat.label
            this.ajax.post('NNTSMesKB/Replace/addBoxRatio',{MATCD:values.mat.key,MATNAME:values.mat.label,REPLACEMATCD:values.remat.key,REPLACEMATNAME:values.remat.label},res => {
                this.addvisible = false
                this.$message.success('新增成功！', 2)
                this.rematcd = ''
                this.matcd = ''
                this.todoList()
            })
          }
        });
      },
      //搜索查询
      search(v) {
        console.log(v)
        var url = 'NNTSMesKB/Replace/GetLists'
        this.ajax.post(url,{keyword:v},res => {
            this.data = res.data.Data
        })
      },
      edithandleOk() {
        console.log(this.editform)
        //editBoxRatio(string MATCD, string MATNAME, string REPLACEMATCD, string REPLACEMATNAME)
        var url = 'NNTSMesKB/Replace/editBoxRatio?MATCD=' + this.editform.MATCD + '&MATNAME=' + this.editform.MATNAME + '&REPLACEMATCD=' + this.editform.REPLACEMATCD + '&REPLACEMATNAME=' + this.editform.REPLACEMATNAME
        this.ajax.post('NNTSMesKB/Replace/editBoxRatio',{MATCD:this.editform.MATCD,MATNAME:this.editform.MATNAME,REPLACEMATCD:this.editform.REPLACEMATCD,REPLACEMATNAME:this.editform.REPLACEMATNAME},res => {
            this.$message.success('编辑成功！', 2)
            this.todoList()
            this.editvisible = false
            this.rematcd = ''
        })
      },
      delhandleCC(){
        this.delvisible = false
      },
      addhandleCC(){
        this.addvisible = false
      },
      edithandleCC(){
        this.editvisible = false
      }
    }
  }
</script>

<style scoped>

</style>
