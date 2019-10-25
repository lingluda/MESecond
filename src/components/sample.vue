<template>

  <div>
    <!-- 删除 -->
    <a-modal title="系统提示" v-model="delvisible" v-if="delvisible" v-on:ok="delhandleOk" ok-text="确认" cancel-text="取消">
      <p>确定删除 {{delname}} 吗？</p>
      <template slot="footer">
        <a-button type="primary" @click="delhandleOk">确定</a-button>
        <a-button @click="delhandle">取消</a-button>
      </template>
    </a-modal>
    <a-modal title="新增" v-model="addvisible" v-if="addvisible" v-on:ok="addhandleOk" ok-text="确认" cancel-text="取消">
      <a-form :form="addform">
        <a-form-item label="卷烟牌号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-decorator="[ 'name',{rules: [{ required: true, message: '请选中' }]}]"
                    show-search placeholder="请选择" optionFilterProp="children" :filter-option="false"
                    v-on:search="fetchM1" label-in-value :value="materialId" v-on:change="selected"
          >
            <a-select-option v-for="(item,index) in materialList1" :key="index" :value="item.CD">{{item.NAME}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="小盒材料" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-decorator="[ 'little',{rules: [{ required: true, message: '请选中' }]}]"
                    show-search placeholder="请选择" optionFilterProp="children" :filter-option="false"
                    v-on:search="fetchM2" label-in-value :value="materialId" v-on:change="selected"
          >
            <a-select-option v-for="(item,index) in materialList2" :value="item.CD">{{item.NAME}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="条盒材料" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-decorator="[ 'slip',{rules: [{ required: true, message: '请选中' }]}]"
                    show-search placeholder="请选择" optionFilterProp="children" :filter-option="false"
                    v-on:search="fetchM3" label-in-value :value="rematerialId" v-on:change="reselected"
          >
            <a-select-option v-for="(item,index) in materialList3" :key="index" :value="item.CD">{{item.NAME}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button type="primary" @click="addhandleOk">确定</a-button>
        <a-button @click="addhandle">取消</a-button>
      </template>
    </a-modal>
    <!--@*编辑模态框*@-->
    <a-modal title="编辑" v-model="editvisible" v-if="editvisible" v-on:ok="edithandleOk" ok-text="确认" cancel-text="取消">
      <a-form :form="editform">
        <a-form-item label="卷烟牌号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select disabled
                    show-search
                    placeholder="请选择"
                    optionFilterProp="children"

                    v-on:change="editHandleChange"
                    :filter-option="filterOption"
                    :default-value="editform.cd"
          >
            <a-select-option v-for="(item,index) in materialList1" :value="item.CD">{{item.NAME}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="小盒材料" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select
            show-search
            placeholder="请选择"
            optionFilterProp="children"

            v-on:change="editHandleChange2"
            :filter-option="filterOption"
            :default-value="editform.lcd"
          >
            <a-select-option v-for="(item,index) in materialList2" :value="item.CD">{{item.NAME}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="条盒材料" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select
            show-search
            placeholder="请选择"
            optionFilterProp="children"

            v-on:change="editHandleChange3"
            :filter-option="filterOption"
            :default-value="editform.scd"
          >
            <a-select-option v-for="(item,index) in materialList3" :value="item.CD">{{item.NAME}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button type="primary" @click="edithandleOk">保存</a-button>
        <a-button @click="edithandle">取消</a-button>
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
    <a-table :columns="columns" size="small" :data-source="data" bordered style="width:80%;margin-top:10px">
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
        materialList1: [],
        materialList2: [],
        materialList3: [],

        addform: this.$form.createForm(this),
        editform: this.$form.createForm(this),
        current: 1,
        columns: [
          {title: '卷烟牌号编码', dataIndex: 'cd', className: 'column-money'},
          {title: '卷烟牌号', dataIndex: 'name', className: 'column-money'},
          {title: '小盒材料编码', dataIndex: 'lcd', className: 'column-money'},
          {title: '小盒材料', dataIndex: 'little', className: 'column-money'},
          {title: '条盒材料编码', dataIndex: 'scd', className: 'column-money'},
          {title: '条盒材料', dataIndex: 'slip', className: 'column-money'},
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
        this.ajax.post('NNTSMesKB/sample/GetList', {}, res => {
          this.data = res.data.Data
        })
      },
      //新增牌号查询
      fetchM1(v) {
        this.materialList1 = []
        var url = 'NNTSMesKB/sample/samplesmoke'
        this.ajax.post(url, {keyword: v}, res => {
          this.materialList1 = res.data.Data
        })
      },
      //新增小盒查询
      fetchM2(v) {
        this.materialList2 = []
        var url = 'NNTSMesKB/sample/littlelist'
        this.ajax.post(url, {keyword: v}, res => {
          if (res.status === 200) {
            this.materialList2 = res.data.Data
          }
        })
      },
      //新增条盒查询
      fetchM3(v) {
        this.materialList3 = []
        var url = 'NNTSMesKB/sample/sliplist'
        this.ajax.post(url, {keyword: v}, res => {
          this.materialList3 = res.data.Data
        })
      },
      //材料选中
      selected(v) {
        this.matcd = v.key
      },
      //重复材料选中
      reselected(v) {
        this.rematcd = v.key
      },
      //编辑模态框
      editModel(v) {
        this.fetchM1('')
        this.fetchM2('')
        this.fetchM3('')
        this.editform = v
        this.editvisible = true
        console.log(this.editform)
      },
      //删除模态框
      delModel(v) {
        console.log(v.cd)
        this.delid = v.cd
        this.delname = v.name
        this.delvisible = true
      },
      //确定删除
      delhandleOk() {
        //delBoxRatio(string id)
        var url = 'NNTSMesKB/sample/delBoxRatio'
        this.ajax.post(url, {id: this.delid}, res => {
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
            //addBoxRatio(string MATCD, string MATNAME, string REPLACEMATNAME, string REPLACEMATCD, string REPLACEMATID)
            var url = 'NNTSMesKB/sample/addBoxRatio?cd=' + values.name.key + '&name=' + values.name.label + '&lcd=' + values.little.key + '&little=' + values.little.label + '&scd=' + values.slip.key + '&slip=' + values.slip.label
            this.ajax.post('NNTSMesKB/sample/addBoxRatio', {
              cd: values.name.key,
              name: values.name.label,
              lcd: values.little.key,
              little: values.little.label,
              scd: values.slip.key,
              slip: values.slip.label
            }, res => {
              if (res.data.Data >= 1) {
                this.addvisible = false
                this.$message.success('新增成功！', 2)
                this.rematcd = ''
                this.matcd = ''
                this.todoList()
              }
            })
          }
        });
      },
      //搜索查询
      search(v) {
        console.log(v)
        var url = 'NNTSMesKB/sample/GetLists'
        this.ajax.post(url, {keyword: v}, res => {
          if (res.data.IsSucceed) {
            this.data = res.data.Data
          }
        })
      },
      //确定编辑
      edithandleOk() {
        console.log(this.editform)
        //editBoxRatio(string cd, string scd, string lcd)
        var url = 'NNTSMesKB/sample/editBoxRatio?cd=' + this.editform.cd + '&scd=' + this.editform.scd + '&lcd=' + this.editform.lcd
        this.ajax.post('NNTSMesKB/sample/editBoxRatio', {
          cd: this.editform.cd,
          scd: this.editform.scd,
          lcd: this.editform.lcd
        }, res => {
          this.todoList()
          this.editvisible = false
          this.$message.success('编辑成功！', 2)
        })
      },
      editHandleChange(v) {
        console.log(v)
      },
      editHandleChange2(v) {
        console.log(v)
        this.editform.lcd = v
      },
      editHandleChange3(v) {
        console.log(v)
        this.editform.scd = v
      },

      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      edithandle(){
        this.editvisible=false
      },
      addhandle(){
        this.addvisible=false
      },
      delhandle(){
        this.delvisible=false
      },
    }
  }
</script>

<style scoped>

</style>
