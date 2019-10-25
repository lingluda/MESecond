<template>
  <a-spin :spinning="spinning">
    <!-- 撤销车间导入模板 -->
    <a-modal v-on:cancel="destroyData" title="导入数据撤销" v-model="delVisible" v-if="delVisible" v-on:ok="delhandleOk"
             ok-text="确认"
             cancel-text="取消">
      <a-month-picker placeholder="请选择月份" format="YYYY-MM" v-on:change="deldatechange" style="width:150px"/>
      <template slot="footer">
        <a-button type="primary" @click="">确定</a-button>
        <a-button @click="">取消</a-button>
      </template>
    </a-modal>
    <!-- 撤销高架库导入模板 -->
    <a-modal v-on:cancel="destroyData" title="导入数据撤销" v-model="gdelVisible" v-if="gdelVisible">
      <a-month-picker placeholder="请选择月份" format="YYYY-MM" v-on:change="gdeldatechange" style="width:150px"/>
      <template slot="footer">
        <a-button type="primary" @click="">确定</a-button>
        <a-button @click="">取消</a-button>
      </template>
    </a-modal>
    <a-modal style="top: 20px;" :mask-closable="false" v-on:cancel="destroyData" :width="950"
             title="高架库导入" v-model="gimpVisible"
             v-if="gimpVisible">
      <a-table bordered :columns="gcolumns" :pagination="false" :scroll="{ y: 240 }" :data-source="gdataSource"
               size="small"/>
      <template slot="footer">
        <div style="margin-left:69%">
          <label for="gimFile">
            <a-button type="primary">选择Excel文件
              <input type="file" id="gimFile" v-on:change="gsendfile(this)"/>
            </a-button>
          </label>
          <a-button key="back" v-on:click="gdelhandleCC">取消</a-button>
          <a-button type="primary" key="submit" v-on:click="gimphandleOk">确认</a-button>
        </div>
      </template>
    </a-modal>
    <!-- 年底减数结存导入 -->
    <a-modal style="top: 20px;" :mask-closable="false" v-on:cancel="destroyData" :width="950"
             title="年底减数导入" v-model="jimpVisible"
             v-if="jimpVisible" v-on:ok="jimphandleOk" ok-text="确认" cancel-text="取消">
      <a-table bordered :columns="jcolumns" :pagination="false" :scroll="{ y: 240 }" :data-source="jdataSource"
               size="small"/>
      <template slot="footer">
        <div style="margin-left:69%">
          <label for="jimFile">
            <a-button type="primary">选择Excel文件
              <input type="file" id="jimFile" v-on:change="jsendfile(this)"/>
            </a-button>
          </label>
          <a-button key="back" v-on:click="jdelhandleCC">取消</a-button>
          <a-button type="primary" key="submit" v-on:click="jimphandleOk">确认</a-button>
        </div>
      </template>
    </a-modal>
    <!-- 车间上期结存导入 -->
    <a-modal style="top: 20px;" :mask-closable="false" v-on:cancel="destroyData" :width="950"
             title="车间导入" v-model="impVisible"
             v-if="impVisible" v-on:ok="imphandleOk" ok-text="确认" cancel-text="取消">
      <!-- {{dataSource}} -->

      <a-table bordered :columns="columns" :pagination="false" :scroll="{ y: 240 }" :data-source="dataSource"
               size="small"/>
      <template slot="footer">
        <div style="margin-left:69%">
          <!-- 导入Excel：<span class="file">
   <input type="file" v-on:change="sendfile(this)" value="导入Excel" id="imFile"/>
</span> -->

          <label for="imFile">
            <a-button type="primary">选择Excel文件
              <input type="file" id="imFile" v-on:change="sendfile(this)"/>
            </a-button>
          </label>
          <a-button key="back" v-on:click="delhandleCC">取消</a-button>
          <a-button type="primary" key="submit" v-on:click="imphandleOk">确认</a-button>
        </div>
      </template>
    </a-modal>
    <a-tabs type="card">
      <a-tab-pane tab="车间上期结存导入" key="1">
        <div style="display:flex;width:100%;justify-content:space-between;border:1px solid #d4d4d4;padding:5px">
          <div style="display:flex;">
            <div>
              年月：
              <a-month-picker placeholder="请选择月份" format="YYYY-MM" v-on:change="cjdatechange" style="width:150px"
                              size="small"/>
            </div>
            <div style="margin:0 10px 0 10px">
              <a v-on:click="importcj">导入</a>
            </div>
            <div>
              物料编码：
              <a-input v-model="cjcd" placeholder="请输入" style="width:150px" size="small"/>
            </div>
            <div style="margin:0 10px 0 10px">
              物料名称：
              <a-input v-model="cjname" placeholder="请输入" style="width:150px" size="small"/>
            </div>
            <div>
              <a-button type="primary" size="small" style="width:50px;border-radius:20px;" v-on:click="cjsearch">查询
              </a-button>
            </div>
          </div>
          <div>
            <!-- <a style="margin:0 10px 0 10px" v-on:click="delcjModel">撤销已导入数据</a> -->
            <a v-on:click="cjUptoDownload">导入模板下载</a>
          </div>
        </div>
        <a-table bordered :columns="column" :pagination="false" :scroll="{ y: 400 }" :data-source="cjdata" size="small"
                 style="margin-top:10px">
          <span slot="month" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="materialcd" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="materialname" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="factoryname" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="qty" slot-scope="text" style="float: right;">{{text}}</span>
          <span slot="realqty" slot-scope="text" style="float: right;">{{text}}</span>
          <span slot="measure" slot-scope="text" style="float: left;">{{text}}</span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="高架库上期结存导入" key="2">
        <div style="display:flex;width:100%;justify-content:space-between;border:1px solid #d4d4d4;padding:5px">
          <div style="display:flex;">
            <div>
              年月：
              <a-month-picker placeholder="请选择月份" format="YYYY-MM" v-on:change="gjkdatechange" style="width:150px"
                              size="small"/>
            </div>
            <div style="margin:0 10px 0 10px">
              <a v-on:click="importgjk">导入</a>
            </div>
            <div>
              物料编码：
              <a-input v-model="gjkcd" placeholder="请输入" style="width:150px" size="small"/>
            </div>
            <div style="margin:0 10px 0 10px">
              物料名称：
              <a-input v-model="gjkname" placeholder="请输入" style="width:150px" size="small"/>
            </div>
            <div>
              <a-button type="primary" size="small" style="width:50px;border-radius:20px;" v-on:click="gjksearch">查询
              </a-button>
            </div>
          </div>
          <div>
            <!-- <a style="margin:0 10px 0 10px" v-on:click="gdelcjModel">撤销已导入数据</a> -->
            <a v-on:click="gjkUptoDownload">导入模板下载</a>
          </div>
        </div>
        <a-table bordered :columns="gcolumn" :pagination="false" :scroll="{ y: 400 }" :data-source="gjkdata"
                 size="small" style="margin-top:10px">
          <span slot="month" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="materialcd" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="materialname" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="factoryname" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="qty" slot-scope="text" style="float: right;">{{text}}</span>
          <!-- <span slot="realqty" slot-scope="text" style="float: right;">{{text}}</span> -->
          <span slot="measure" slot-scope="text" style="float: left;">{{text}}</span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="年底减数结存导入" key="3">
        <div style="display:flex;width:100%;justify-content:space-between;border:1px solid #d4d4d4;padding:5px">
          <div style="display:flex;">
            <div>
              年份：
              <!--<a-month-picker placeholder="请选择年份" format="YYYY" v-on:change="jsdatechange" style="width:150px"
                              size="small"/>-->
              <a-select style="width: 120px" size="small" allowClear @change="jsdatechange">
                <a-select-option v-for="(item,index) in years" :key="index" :value="item">{{item}}年</a-select-option>
              </a-select>
            </div>
            <div style="margin:0 10px 0 10px">
              <a v-on:click="importjs">导入</a>
            </div>
            <div>
              物料编码：
              <a-input v-model="jscd" placeholder="请输入" style="width:150px" size="small"/>
            </div>
            <div style="margin:0 10px 0 10px">
              物料名称：
              <a-input v-model="jsname" placeholder="请输入" style="width:150px" size="small"/>
            </div>
            <div>
              <a-button type="primary" size="small" style="width:50px;border-radius:20px;" v-on:click="jssearch">查询
              </a-button>
            </div>
          </div>
          <div>
            <!-- <a style="margin:0 10px 0 10px" v-on:click="gdelcjModel">撤销已导入数据</a> -->
            <a v-on:click="jsUptoDownload">导入模板下载</a>
          </div>
        </div>
        <a-table bordered :columns="jcolumn" :pagination="false" :scroll="{ y: 400 }" :data-source="jsdata" size="small"
                 style="margin-top:10px">
          <span slot="month" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="materialcd" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="materialname" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="factoryname" slot-scope="text" style="float: left;">{{text}}</span>
          <span slot="qty" slot-scope="text" style="float: right;">{{text}}</span>
          <!-- <span slot="realqty" slot-scope="text" style="float: right;">{{text}}</span> -->
          <span slot="measure" slot-scope="text" style="float: left;">{{text}}</span>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script>
  import XLSX from 'xlsx';

  export default {
    data() {
      return {
        spinning: false,
        delmonth: '',
        gdelmonth: '',
        cjmonth: '',
        cjcd: '',
        cjname: '',
        currentmonth:'',
        gjkmonth: '',
        gjkcd: '',
        gjkname: '',
        jsmonth: '',
        jscd: '',
        jsname: '',
        gjkdata: [],
        jsdata: [],
        cjdata: [],
        impVisible: false,
        gimpVisible: false,
        jimpVisible: false,
        delVisible: false,
        gdelVisible: false,
        jdelVisible: false,
        workSheet1: '',
        imFile: "", // 导入文件el
        gimFile: "", // 导入文件el
        jimFile: "", // 导入文件el
        dataSource: [],
        gdataSource: [],
        jdataSource: [],
        column: [
          //代码+aS[i].名称+'&ft].生产厂家+'&mee[i].辅计量单位+'&qti].结存数量+'&r='h[i].真退数
          {
            title: '日期',
            align: 'center',
            width: 70,
            className: 'column-money',
            dataIndex: 'month',
            scopedSlots: {customRender: 'month'},
          },
          {
            title: '代码',
            align: 'center',
            width: 90,
            className: 'column-money',
            dataIndex: 'materialcd',
            scopedSlots: {customRender: 'materialcd'},
          },
          {
            title: '名称',
            align: 'center',
            width: 200,
            className: 'column-money',
            dataIndex: 'materialname',
            scopedSlots: {customRender: 'materialname'},
          },
          {
            title: '生产厂家',
            align: 'center',
            width: 200,
            className: 'column-money',
            dataIndex: 'factoryname',
            scopedSlots: {customRender: 'factoryname'},
          },
          {
            title: '结存数量',
            align: 'center',
            width: 100,
            className: 'column-money',
            dataIndex: 'qty',
            scopedSlots: {customRender: 'qty'},
          },
          {
            title: '真退数',
            align: 'center',
            width: 100,
            className: 'column-money',
            dataIndex: 'realqty',
            scopedSlots: {customRender: 'realqty'},
          },
          {
            title: '辅计量单位',
            align: 'center',
            width: 100,
            className: 'column-money',
            dataIndex: 'measure',
            scopedSlots: {customRender: 'measure'},
          },
          //{title: '生产厂家cd',align:'center',width: 150,className:'column-money',dataIndex: 'factorycd'},
        ],
        gcolumn: [
          {
            title: '日期',
            align: 'center',
            width: 70,
            className: 'column-money',
            dataIndex: 'month',
            scopedSlots: {customRender: 'month'},
          },
          {
            title: '物料代码',
            align: 'center',
            width: 90,
            className: 'column-money',
            dataIndex: 'materialcd',
            scopedSlots: {customRender: 'materialcd'},
          },
          {
            title: '物料名称',
            align: 'center',
            width: 200,
            className: 'column-money',
            dataIndex: 'materialname',
            scopedSlots: {customRender: 'materialname'},
          },
          {
            title: '供应商',
            align: 'center',
            width: 200,
            className: 'column-money',
            dataIndex: 'factoryname',
            scopedSlots: {customRender: 'factoryname'},
          },
          {
            title: '数量',
            align: 'center',
            width: 100,
            className: 'column-money',
            dataIndex: 'qty',
            scopedSlots: {customRender: 'qty'},
          },
          {
            title: '计量单位',
            align: 'center',
            width: 100,
            className: 'column-money',
            dataIndex: 'measure',
            scopedSlots: {customRender: 'measure'},
          },
        ],
        jcolumn: [
          {
            title: '年份',
            align: 'center',
            width: 70,
            className: 'column-money',
            dataIndex: 'month',
            scopedSlots: {customRender: 'month'},
          },
          {
            title: '代码',
            align: 'center',
            width: 90,
            className: 'column-money',
            dataIndex: 'materialcd',
            scopedSlots: {customRender: 'materialcd'},
          },
          {
            title: '名称',
            align: 'center',
            width: 200,
            className: 'column-money',
            dataIndex: 'materialname',
            scopedSlots: {customRender: 'materialname'},
          },
          {
            title: '生产厂家',
            align: 'center',
            width: 200,
            className: 'column-money',
            dataIndex: 'factoryname',
            scopedSlots: {customRender: 'factoryname'},
          },
          {
            title: '数量',
            align: 'center',
            width: 100,
            className: 'column-money',
            dataIndex: 'qty',
            scopedSlots: {customRender: 'qty'},
          },
          {
            title: '辅计量单位',
            align: 'center',
            width: 100,
            className: 'column-money',
            dataIndex: 'measure',
            scopedSlots: {customRender: 'measure'},
          },
        ],
        jcolumns: [
          //{title: '日期',align:'center',width: 150,className:'column-money',dataIndex: 'month'},
          {title: '代码', align: 'center', width: 150, className: 'column-money', dataIndex: '代码'},
          {title: '名称', align: 'center', width: 150, className: 'column-money', dataIndex: '名称'},
          {title: '生产厂家', align: 'center', width: 150, className: 'column-money', dataIndex: '生产厂家'},
          {title: '数量', align: 'center', width: 150, className: 'column-money', dataIndex: '数量'},
          //{title: '真退数量',align:'center',width: 150,className:'column-money',dataIndex: 'realqty'},
          {title: '辅计量单位', align: 'center', width: 150, className: 'column-money', dataIndex: '辅计量单位'},
          //{title: '生产厂家cd',align:'center',width: 150,className:'column-money',dataIndex: '生产厂家cd'},
        ],
        columns: [
          //代码+aS[i].名称+'&ft].生产厂家+'&mee[i].辅计量单位+'&qti].结存数量+'&r='h[i].真退数
          //{title: '日期',align:'center',width: 150,className:'column-money',dataIndex: 'month'},
          {title: '代码', align: 'center', width: 150, className: 'column-money', dataIndex: '代码'},
          {title: '名称', align: 'center', width: 150, className: 'column-money', dataIndex: '名称'},
          {title: '生产厂家', align: 'center', width: 150, className: 'column-money', dataIndex: '生产厂家'},
          {title: '结存数量', align: 'center', width: 150, className: 'column-money', dataIndex: '结存数量'},
          {title: '真退数', align: 'center', width: 150, className: 'column-money', dataIndex: '真退数'},
          {title: '辅计量单位', align: 'center', width: 150, className: 'column-money', dataIndex: '辅计量单位'},
          //{title: '生产厂家cd',align:'center',width: 150,className:'column-money',dataIndex: '生产厂家cd'},
        ],
        gcolumns: [
          //{title: '日期',align:'center',width: 150,className:'column-money',dataIndex: 'month'},
          {title: '物料代码', align: 'center', width: 150, className: 'column-money', dataIndex: '物料代码'},
          {title: '物料名称', align: 'center', width: 150, className: 'column-money', dataIndex: '物料名称'},
          {title: '供应商', align: 'center', width: 150, className: 'column-money', dataIndex: '供应商'},
          {title: '数量', align: 'center', width: 150, className: 'column-money', dataIndex: '数量'},
          //{title: '真退数量',align:'center',width: 150,className:'column-money',dataIndex: 'realqty'},
          {title: '计量单位', align: 'center', width: 150, className: 'column-money', dataIndex: '计量单位'},
          //{title: '生产厂家cd',align:'center',width: 150,className:'column-money',dataIndex: '生产厂家cd'},
        ],
        years: []
      }
    },
    mounted() {
      this.inityear()
      this.todoList()
      this.gtodoList()
      this.jtodoList()
    },
    methods: {
      //获取年份
      inityear() {
        var now = new Date()
        let num = now.getFullYear()
        for (var i = num; i > 2000; i--) {
          this.years.push(i)
        }
        this.currentmonth = now.getFullYear()+"-"+now.getMonth()
      },
      //撤销车间模态框
      delcjModel() {
        this.delVisible = true
      },
      //撤销高架库模态框
      gdelcjModel() {
        this.gdelVisible = true
      },
      //车间模板下载
      cjUptoDownload() {
        window.location.href = 'http://10.162.80.8:90/Upload/UploadModel/down/车间月结存导入模板.xlsx'
      },
      //高架库模板下载
      gjkUptoDownload() {
        window.location.href = 'http://10.162.80.8:90/Upload/UploadModel/down/高架库月结存导入模板.xlsx'
      },

      //高架库模板下载
      jsUptoDownload() {
        window.location.href = 'http://10.162.80.8:90/Upload/UploadModel/down/年底减数导入模板.xlsx'
      },
      //高架库查询日期 jsdatechange
      gjkdatechange(d, v) {
        this.gjkmonth = v
        this.gjksearch()
      },
      //高架库查询日期 jsdatechange
      jsdatechange(v) {
        console.log(v)
        this.jsmonth = v
        this.jssearch()
      },
      //撤销日期
      deldatechange(d, v) {
        this.delmonth = v
      },
      //撤销日期
      gdeldatechange(d, v) {
        this.gdelmonth = v

      },
      //车间查询日期
      cjdatechange(d, v) {
        this.cjmonth = v
        this.cjsearch()
      },
      //车间查询
      cjsearch() {
        //gjkLists(string month, string name, string cd)
        var url = 'NNTSMesKB/ImportErp/cjLists?month=' + this.cjmonth + '&name=' + this.cjname + '&cd=' + this.cjcd
        this.ajax.post('NNTSMesKB/ImportErp/cjLists', {month: this.cjmonth, name: this.cjname, cd: this.cjcd}, res => {
          this.cjdata = res.data.Data
        })
      },
      //高架库查询 jssearch
      gjksearch() {
        //gjkLists(string month, string name, string cd)
        var url = 'NNTSMesKB/ImportErp/gjkLists?month=' + this.gjkmonth + '&name=' + this.gjkname + '&cd=' + this.gjkcd
        this.ajax.post('NNTSMesKB/ImportErp/gjkLists', {
          month: this.gjkmonth,
          name: this.gjkname,
          cd: this.gjkcd
        }, res => {
          this.gjkdata = res.data.Data
        })
      },
      //高架库查询 jssearch
      jssearch() {
        //ylists(string month,string name,string cd)
        var url = 'NNTSMesKB/ImportErp/ylists?month=' + this.jsmonth + '&name=' + this.jsname + '&cd=' + this.jscd
        this.ajax.post('NNTSMesKB/ImportErp/ylists', {month: this.jsmonth, name: this.jsname, cd: this.jscd}, res => {
          this.jsdata = res.data.Data
        })
      },
      //初始化
      todoList() {
        this.ajax.post('NNTSMesKB/ImportErp/cjList', {month:this.currentmonth}, res => {
          this.cjdata = res.data.Data
        })
      },
      gtodoList() {
        this.ajax.post('NNTSMesKB/ImportErp/gjkList', {month:this.currentmonth}, res => {
          this.gjkdata = res.data.Data
        })
      },

      jtodoList() {
        this.ajax.post('NNTSMesKB/ImportErp/ylist', {month:this.years[0]}, res => {
          this.jsdata = res.data.Data
        })
      },

      //模态框销毁时数据销毁
      destroyData() {
        this.dataSource = []
        this.gdataSource = []
      },

      //导入车间模态框
      importcj() {
        if (this.cjmonth === '') {
          this.$error({
            okText: '确定',
            title: '请选择年月！',
          });
          return
        }
        if (this.cjdata.length != 0) {
          let self = this
          self.$confirm({
            okText: '确定',
            cancelText: '取消',
            title: '本月数据已经存在！',
            content: '如需重新导入请点击 [确定]！否则点击 [取消]！',
            onOk() {
              self.delOk()
              self.impVisible = true
            },
            onCancel() {
              console.log('Cancel');
              self.impVisible = false
            },
            class: 'test',
          });
        } else {
          this.impVisible = true
        }
      },
      //确定导入车间数据
      imphandleOk() {
        this.spinning = true
        var sql = 'insert all '

        for (var i = 0; i < this.dataSource.length; i++) {
          var cd = this.dataSource[i].代码 || '';
          var name = this.dataSource[i].名称 || '';
          var fac = this.dataSource[i].生产厂家 || '';
          var unit = this.dataSource[i].辅计量单位 || '';
          var real = 0 - Math.abs(this.dataSource[i].真退数) || 0
          var leval = this.dataSource[i].结存数量 || 0
          //车间导入insert all into aps.cjjc values('1','1','1','1','1','1','1','1')1','1','1','1','1','1','1','1') into aps.cjjc values('2','2','2','2','2','2','2','1')select * from dual;
          //t.month,t.materialcd,t.materialname,t.factoryname,t.measure,t.qty,t.factorycd
          sql += "into aps.cjjc values('" + this.cjmonth + "','" + cd + "','" + name + "','" + fac + "','" + unit + "','" + leval + "','" + real + "','')"
        }
        sql += 'select 1 from dual';
        this.ajax.post('NNTSMesKB/ImportErp/impgjk', {sql: sql}, res => {
          this.todoList()
          this.dataSource = []
          this.spinning = false
          this.impVisible = false
        })

      },
      //导入高架库模态框
      importgjk() {
        if (this.gjkmonth === '') {
          this.$error({
            okText: '确定',
            title: '请选择年月！',
          });
          return
        }
        if (this.gjkdata.length != 0) {
          let self = this
          self.$confirm({
            okText: '确定',
            cancelText: '取消',
            title: '本月数据已经存在！',
            content: '如需重新导入请点击 [确定]！否则点击 [取消]！',
            onOk() {
              self.gdelOk()
              self.gimpVisible = true
            },
            onCancel() {
              console.log('Cancel');
              self.gimpVisible = false
            },
            class: 'test',
          });
        } else {
          this.gimpVisible = true
        }
      },
      importjs() {
        if (this.jsmonth === '' || this.jsmonth === undefined) {
          this.$error({
            okText: '确定',
            title: '请选择年份！',
          });
          return
        }
        if (this.jsdata.length != 0) {
          let self = this
          self.$confirm({
            okText: '确定',
            cancelText: '取消',
            title: this.jsmonth + '年数据已经存在！',
            content: '如需重新导入请点击 [确定]！否则点击 [取消]！',
            onOk() {
              self.jdelOk()
              self.jimpVisible = true
            },
            onCancel() {
              console.log('Cancel');
              self.jimpVisible = false
            },
            class: 'test',
          });
        } else {
          this.jimpVisible = true
        }
      },
      delhandleOk() {
        let self = this
        self.$confirm({
          title: '确定删除' + self.delmonth + '月份的数据吗?',
          content: '删除后数据不可恢复！',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log('OK');
            self.delOk()
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      gdelhandleCC() {
        this.gimpVisible = false
        this.gdataSource = []
      },
      jdelhandleCC() {
        this.jimpVisible = false
        this.jdataSource = []
      },
      delhandleCC() {
        this.impVisible = false
        this.dataSource = []
      },
      gdelhandleOk() {
        let self = this
        self.$confirm({
          title: '确定删除' + self.gdelmonth + '月份的数据吗?',
          content: '删除后数据不可恢复！',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log('OK');
            self.gdelOk()
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      //确定导入数据撤销
      delOk() {
        var url = 'NNTSMesKB/ImportErp/delcj?month=' + this.cjmonth
        this.ajax.post('NNTSMesKB/ImportErp/delcj', {month: this.cjmonth}, res => {
          this.todoList()
          this.delVisible = false
        })
      },
      //确定导入数据撤销
      gdelOk() {
        var url = 'NNTSMesKB/ImportErp/delgjk?month=' + this.gjkmonth
        this.ajax.post('NNTSMesKB/ImportErp/delgjk', {month: this.gjkmonth}, res => {
          this.gtodoList()
          this.gdelVisible = false
        })
      },

      //确定导入数据撤销 deljs(string month)
      jdelOk() {
        var url = 'NNTSMesKB/ImportErp/deljs?month=' + this.jsmonth
        this.ajax.post('NNTSMesKB/ImportErp/deljs', {month: this.jsmonth}, res => {
          this.jtodoList()
          this.jdelVisible = false
        })
      },
      //确定导入高架库数据
      gimphandleOk() {
        this.spinning = true
        var sql = 'insert all '
        // impcj(string month, string materialcd, string materialname, string factoryname, string measure, string qty, string realqty, string factorycd) +'&factorycd='+this.gdataSource[i].生产厂家cd
        for (var i = 0; i < this.gdataSource.length; i++) {
          var materialcd = this.gdataSource[i].物料代码 || '';
          var materialname = this.gdataSource[i].物料名称 || '';
          var factoryname = this.gdataSource[i].供应商 || '';
          var measure = this.gdataSource[i].计量单位 || '';
          var num = this.gdataSource[i].数量 || 0;
          sql += "into aps.flgjkjc values('" + this.gjkmonth + "','" + materialcd + "','" + materialname + "','" + factoryname + "','" + measure + "','" + num + "','') "
        }
        sql += 'select 1 from dual';
        // this.ajax.post('NNTSMesKB/ImportErp/impgjk',{month:this.gjkmonth ,
        this.ajax.post('NNTSMesKB/ImportErp/impgjk', {sql: sql}, res => {
          this.gtodoList()
          this.gdataSource = []
          this.spinning = false
          this.gimpVisible = false
        })

      },
      //确定导入年底件数数据
      jimphandleOk() {
        this.spinning = true
        var sql = 'insert all '
        for (var i = 0; i < this.jdataSource.length; i++) {
          var cd = this.jdataSource[i].代码 || '';
          var name = this.jdataSource[i].名称 || '';
          var fcname = this.jdataSource[i].生产厂家 || '';
          var num = 0 - Math.abs(this.jdataSource[i].数量) || 0;
          var unit = this.jdataSource[i].辅计量单位 || '';
          //impyc(string month,string materialcd,string materialname,string factoryname,string measure,string qty)
          //insert into aps.yearcut values('1','1','1','1','1','1')
          sql += "into aps.yearcut values('" + this.jsmonth + "','" + cd + "','" + name + "','" + fcname + "','" + unit + "','" + num + "','') "
        }
        sql += 'select 1 from dual';
        this.ajax.post('NNTSMesKB/ImportErp/impyc', {sql: sql}, res => {
          this.jtodoList()
          this.jdataSource = []
          this.spinning = false
          this.jimpVisible = false
        })
      },
      //获取车间表格数据
      sendfile() {
        this.imFile = document.getElementById("imFile");
        let obj = this.imFile;
        if (!obj.files) {
          return;
        }
        var f = obj.files[0];
        var reader = new FileReader();
        /*reader.readAsBinaryString(f);
        let self = this;
        reader.onload = function (e) {
          var data = e.target.result;
          self.workSheet1 = XLSX.read(data, {
            type: 'binary'
          });
          self.dataSource = XLSX.utils.sheet_to_json(self.workSheet1.Sheets[self.workSheet1.SheetNames[0]])
        }
      },*/
        let $t = this
        reader.onload = function (data) {
          var data = data.target.result
          if (localStorage.getItem('isIE')) {
            $t.wb = XLSX.read(btoa($t.fixdata(data)), {  // 手动转化
              type: 'base64'
            })
          } else {
            $t.wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
          $t.dataSource = json
        }
        if (localStorage.getItem('isIE')) {
          reader.readAsArrayBuffer(f)
        } else {
          reader.readAsBinaryString(f)
        }
      },
      //获取高架库表格数据
      gsendfile() {
        this.imFile = document.getElementById("gimFile");
        let obj = this.imFile;
        if (!obj.files) {
          return;
        }
        var f = obj.files[0];
        var reader = new FileReader();
        /*reader.readAsBinaryString(f);
        let self = this;
        reader.onload = function (e) {
          var data = e.target.result;
          self.workSheet1 = XLSX.read(data, {
            type: 'binary'
          });
          self.gdataSource = XLSX.utils.sheet_to_json(self.workSheet1.Sheets[self.workSheet1.SheetNames[0]])
        }
      },*/
        let $t = this
        reader.onload = function (data) {
          var data = data.target.result
          if (localStorage.getItem('isIE')) {
            $t.wb = XLSX.read(btoa($t.fixdata(data)), {  // 手动转化
              type: 'base64'
            })
          } else {
            $t.wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
          $t.gdataSource = json
        }
        if (localStorage.getItem('isIE')) {
          reader.readAsArrayBuffer(f)
        } else {
          reader.readAsBinaryString(f)
        }
      },
      //获取js表格数据
      jsendfile() {
        this.jimFile = document.getElementById("jimFile");
        let obj = this.jimFile;
        if (!obj.files) {
          return;
        }
        var f = obj.files[0];
        var reader = new FileReader();
        //reader.readAsBinaryString(f);
        /* let self = this;
         reader.onload = function (e) {
           var data = e.target.result;
           self.workSheet1 = XLSX.read(data, {
             type: 'binary'
           });
           self.jdataSource = XLSX.utils.sheet_to_json(self.workSheet1.Sheets[self.workSheet1.SheetNames[0]])
         }*/
        let $t = this
        reader.onload = function (data) {
          var data = data.target.result
          if (localStorage.getItem('isIE')) {
            $t.wb = XLSX.read(btoa($t.fixdata(data)), {  // 手动转化
              type: 'base64'
            })
          } else {
            $t.wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
          $t.jdataSource = json
        }
        if (localStorage.getItem('isIE')) {
          reader.readAsArrayBuffer(f)
        } else {
          reader.readAsBinaryString(f)
        }
      },
      fixdata(data) {  // 文件流转BinaryString
        var o = ''
        var l = 0
        var w = 10240
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
    }
  }
</script>

<style scoped>
  .file {
    position: relative;
  / / display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 5px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  .tab1 {
    display: flex;
    width: 100%;
  }

  .ant-input {
    min-height: unset
  }

  .ant-input-affix-wrapper .ant-input {
    min-height: unset
  }

  label {
    position: relative;
  }

  #imFile {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  #gimFile {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  #jimFile {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  #btn {
    margin-right: 5px;
  }

  #text {
    color: red;
  }
</style>
