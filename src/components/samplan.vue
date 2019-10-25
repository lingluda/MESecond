<template>
  <div>
    <!-- 删除 -->
    <a-modal title="系统提示" v-model="delvisible" v-if="delvisible" v-on:ok="delhandleOk" ok-text="确认" cancel-text="取消">
      <p>确定删除  吗？</p>
      <!--<p>确定删除 {{delname}} 吗？</p>-->
      <template slot="footer">
        <a-button type="primary" @click="delhandleOk">确定</a-button>
        <a-button @click="delhandleCC">取消</a-button>
      </template>
    </a-modal>

    <a-modal title="新增" v-model="addVisible" v-if="addVisible" @ok="addhandleOk" @cancel="destroy" okText="确认"
             cancelText="取消">
      <a-form :form="addform">
        <a-form-item label="日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <!--<a-month-picker format="YYYYMM" @change="changeDate" placeholder="请选择日期" style="width: 100%"
                          v-decorator="[ 'note', {rules: [{ required: true, message: 'Please input your note!' }]}]"
          />-->
          <a-input :value="sForm.month" disabled></a-input>
        </a-form-item>
        <a-form-item label="牌号名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select showSearch optionFilterProp="children" @change="selectChange" :filterOption="filterOption"
                    labelInValue
                    v-decorator="[ 'mat',{rules: [{ required: true, message: '请选中' }]}]">
            <a-select-option v-for="(item,index) in materSource" :key="index" :value="item.CD">{{item.NAME}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="牌号编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="matcd"></a-input>
        </a-form-item>
        <a-form-item label="数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input-number style="width: 100%" v-decorator="[ 'num',{rules: [{ required: true, message: '请输入数字' }]}]"/>
        </a-form-item>
        <a-form-item label="单位" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input value="箱"></a-input>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button type="primary" @click="addhandleOk">确定</a-button>
        <a-button @click="addhandle">取消</a-button>
      </template>
    </a-modal>
    <a-modal title="编辑" v-model="editVisible" v-if="editVisible" @ok="edithandleOk" okText="确认" cancelText="取消">
      <a-form>
        <a-form-item label="日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="editDate" disabled></a-input>
        </a-form-item>
        <a-form-item label="牌号名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select :value="editCD" disabled>
            <a-select-option v-for="(item,index) in materSource" :key="index" :value="item.CD">{{item.NAME}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="牌号编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input :value="editCD" disabled></a-input>
        </a-form-item>
        <a-form-item label="数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input-number :defaultValue="editNum" style="width: 100%;" @change="numChange"></a-input-number>
        </a-form-item>
        <a-form-item label="单位" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input value="箱" disabled></a-input>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button type="primary" @click="edithandleOk">保存</a-button>
        <a-button @click="edithandle">取消</a-button>
      </template>
    </a-modal>
    年月：
    <a-month-picker format="YYYYMM" :defaultValue="moment()" @change="changeDate" style="width: 95px"
                    placeholder="选择日期"></a-month-picker>
    编码：
    <a-input v-model="sForm.cd" placeholder="请输入编码" style="width: 120px;"/>
    名称：
    <a-input v-model="sForm.name" placeholder="请输入牌号" style="width: 120px;"/>
    <a-button @click="topSearch" type="primary">搜索</a-button>
    <a-button style="margin-left: 22%" type="primary" @click="addModel">新增</a-button>
    <a-table bordered :columns="columns" :dataSource="dataSource" size="small"
             style="margin: 10px 0 0 0;width: 70%">
      <span slot="QTY" slot-scope="text" style="float: right">{{text}}</span>
      <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="editModel(record)">编辑</a>
            <a-divider type="vertical"/>
            <a href="javascript:;" @click="del(record.MATERIALID)">删除</a>
    </span>
    </a-table>
  </div>
</template>

<script>
  import moment from 'moment';

  const columns = [{
    title: '年月',
    dataIndex: 'MONTH', className: 'column-money',
  }, {
    title: '牌号编码', className: 'column-money',
    dataIndex: 'MATERIALID',
  }, {
    title: '牌号名称', className: 'column-money',
    dataIndex: 'MATERIALNAME',
  }, {
    title: '数量', className: 'column-money',
    dataIndex: 'QTY',
    scopedSlots: {customRender: 'QTY'},
  }, {
    title: '单位', className: 'column-money',
    dataIndex: 'MEASURE',
  },
    {
      title: '操作', className: 'column-money',
      key: 'action',
      scopedSlots: {customRender: 'action'},
    }
  ];
  export default {
    name: "naotait",

    data() {
      return {
        sForm: {
          cd: '',
          name: '',
          num: '',
          month: moment().format('YYYYMM'),
        },
        addform: this.$form.createForm(this),
        addDate: '',
        editDate: '',
        editName: '',
        editCD: '',
        editNum: '',
        matcd: '',
        columns,
        dataSource: [],
        materSource: [],
        addVisible: false,
        editVisible: false,
        delvisible:false,
        delid:'',
      }
    },
    mounted() {
      this.todoList()
      this.todoMlist()
    },
    methods: {
      moment,
      destroy() {
        this.matcd = ''
      },
      //search(string cd,string name,string month,string num)
      search() {
        this.ajax.post('NNTSMesKB/Samplan/search', {
          cd: this.sForm.cd,
          name: this.sForm.name,
          num: this.sForm.num,
          month: this.sForm.month
        }, res => {
          this.dataSource = res.data.Data
        })
      },

      del(v) {
        this.delvisible = true
        this.delid=v
      },
      topSearch() {
        this.search()
      },
      todoList() {
        this.search()
      },
      todoMlist() {
        this.ajax.post('NNTSMesKB/Samplan/materlist', {}, res => {
          console.log(res)
          this.materSource = res.data.Data
        })
      },
      addModel() {
        if (this.sForm.month === '') {
          this.$error({
            okText: '确定',
            title: '请选择年月！',
          });
          return
        }
        this.addVisible = true
      },
      addhandleOk() {
        this.addSubmit()

        this.addVisible = false
      },
      delhandleOk(){
        this.ajax.post('NNTSMesKB/Samplan/del', {cd: this.delid}, res => {
          this.todoList()
          this.$message.success('删除成功！', 2)
        })
      },
      editModel(v) {
        console.log(v)
        this.editVisible = true
        this.editCD = v.MATERIALID
        this.editDate = v.MONTH,
          this.editNum = v.QTY
      },
      numChange(v) {
        console.log(v)
        this.editNum = v
      },
      edithandleOk() {
        //edit(string cd,string num)
        this.ajax.post('NNTSMesKB/Samplan/edit', {cd: this.editCD, num: this.editNum}, res => {
          this.todoList()
          this.$message.success('编辑成功！', 2)
          this.editVisible = false
        })
      },
      changeDate(date, dateString) {
        this.sForm.month = dateString
        this.search()
      },
      selectChange(v) {
        this.matcd = v.key
      },
      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      addhandleOk(e) {
        e.preventDefault();
        this.addform.validateFields((err, v) => {
          if (!err) {
            //add(string m,string cd,string name,string unit,string num)
            this.ajax.post('NNTSMesKB/Samplan/add', {
              m: this.sForm.month,
              cd: v.mat.key,
              name: v.mat.label,
              unit: '箱',
              num: v.num
            }, res => {
              this.addVisible = false
              this.todoList()
              this.$message.success('新增成功！', 2)
              this.matcd = ''
            })
          }
        });
      },
      delhandleCC(){
        this.delvisible=false
      },
      addhandle(){
        this.addVisible = false
      },
      edithandle(){
        this.editVisible = false
      }
    }
  }
</script>

<style tpye="less" scoped>

</style>
