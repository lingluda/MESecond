<template>
  <div>
    <div>数据模块列表</div>
    <div style="margin-top:20px">默认分类
      <Icon type="plus" style="margin-left:20px;margin-bottom:20px" @click="modal1=true"></Icon>
    </div>
    <Row>
      <Col span="7">
      <Card @click="modal2=true">
        <p slot="title" style="text-align:center;">2018年7月12日</p>
        <a href="#" slot="extra" @click="detail">
          详情
        </a>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
      <Col span="7" offset="1">
      <Card dis-hover>
        <p slot="title" style="text-align:center;">2018年7月12日</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
      <Col span="7" offset="1">
      <Card dis-hover>
        <p slot="title" style="text-align:center;">2018年7月12日</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
    </Row>
    <div style="margin-top:20px">资源能源
      <Icon type="plus" style="margin-left:20px;margin-bottom:20px"></Icon>
    </div>
    <Row>
      <Col span="7">
      <Card>
        <p slot="title">The standard card</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
      <Col span="7" offset="1">
      <Card dis-hover>
        <p slot="title" style="text-align:center;">2018年7月12日</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
      <Col span="7" offset="1">
      <Card dis-hover>
        <p slot="title" style="text-align:center;">2018年7月12日</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
    </Row>
    <div style="margin-top:20px">工业农业
      <Icon type="plus" style="margin-left:20px;margin-bottom:20px"></Icon>
    </div>
    <Row>
      <Col span="7">
      <Card>
        <p slot="title">The standard card</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
      <Col span="7" offset="1">
      <Card dis-hover>
        <p slot="title" style="text-align:center;">2018年7月12日</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
      <Col span="7" offset="1">
      <Card dis-hover>
        <p slot="title" style="text-align:center;">2018年7月12日</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
      </Col>
    </Row>
    <div style="margin-top:20px">交通运输
      <Icon type="plus" style="margin-left:20px;margin-bottom:20px"></Icon>
    </div>
    <!-- 添加对话框 -->
    <Modal v-model="modal1" title="添加对话框" okText="下一步" @on-ok="ok" @on-cancel="cancel" width="920px">
      <Tabs>
        <TabPane label="填写信息" name="name1">
          <Form :model="formItem" :label-width="80">
            <FormItem label="模型名称">
              <Input v-model="formItem.input" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="模型关键字">
              <Input v-model="formItem.input" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="Text">
              <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 5,maxRows: 9}" placeholder="Enter something..."></Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="填写参数" name=":v-model=currentIndex">
          <div style="padding:10px">
            <span>参数配置</span>
            <button style="float:right">添加参数</button>
          </div>
          <Table :columns="columns1" :data="data1"></Table>
        </TabPane>
        <TabPane label="选择数据来源" name="name3">
          <div style="padding:10px">
            <span>参数配置</span>
            <button style="float:right">添加参数</button>
          </div>
          <Table :columns="columns1" :data="data1"></Table>
        </TabPane>
        <TabPane label="数据转换" name="name4">
          <Row>

            <Col span="12" style="padding:10px">
            <p style="margin-bottom:10px">数据转换</p>
            <ButtonGroup>
              <Button>快速搭建</Button>
              <Button type="primary">脚本代码</Button>
            </ButtonGroup>
            <Row style="margin-top:20px;margin-bottom:10px">
              <span>选择数据类型</span>
              <Select size="small" style="width:200px;margin-left:50px">
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Row>
            <Input type="textarea" :rows="4" placeholder="Enter something..."></Input>
            <div>
              <span>映射字段</span>
              <span>X</span>
              <Input style="width:200px" size="small"></Input>
            </div>
            <div>
              <span>映射字段</span>
              <CheckboxGroup>
                <Checkbox label="香蕉"></Checkbox>
                <Checkbox label="苹果"></Checkbox>
                <Checkbox label="西瓜"></Checkbox>
              </CheckboxGroup>
            </div>
            </Col>
            <Col span="12" style="padding:10px">
            <Input type="textarea" :rows="14" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="数据预览" name="name5">
          <Form :label-width="80" inline>
            <FormItem label="参数1">
              <Input style="width:200px"></Input>
            </FormItem>
            <FormItem label="参数2">
              <Input style="width:200px"></Input>
            </FormItem>
            <FormItem>
              <Button>查询</Button>
            </FormItem>
          </Form>
          <div style="margin-left:20px;margin-bottom:20px">
            <span>结果集类型</span>
            <Tag checkable color="blue">标签一</Tag>
            <Tag checkable color="green">标签二</Tag>
            <Tag checkable color="red">标签三</Tag>
            <Tag checkable color="yellow">标签四</Tag>
          </div>
          <Table :columns="columns1" :data="data1"></Table>
        </TabPane>
        <TabPane label="访问权限" name="name6">
          <div style="margin-left:40px">
            <Row>
              <Col span="4">
              <p>开发权限</p>
              </Col>
              <Col span="20">
              <Tag checkable color="blue">标签一</Tag>
              <Tag checkable color="green">标签二</Tag>
              <Tag checkable color="red">标签三</Tag>
              <Tag checkable color="yellow">标签四</Tag>
              </Col>
            </Row>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>访问权限</p>
              </Col>
              <Col span="20">

              </Col>
            </Row>
            <hr>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>是否开启接口访问</p>
              </Col>
              <Col span="20">
              <Tag checkable color="blue">标签一</Tag>
              <Tag checkable color="green">标签二</Tag>
              </Col>
            </Row>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>访问限制</p>
              </Col>
              <Col span="20">
              <Tag checkable color="blue">标签一</Tag>
              <Tag checkable color="green">标签二</Tag>
              <Tag checkable color="green">标签二</Tag>
              </Col>
            </Row>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>有效期</p>
              </Col>
              <Col span="20">
              <Tag checkable color="green">标签二</Tag>
              <Tag checkable color="green">标签二</Tag>
              </Col>
            </Row>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>访问频率</p>
              </Col>
              <Col span="20">
              <InputNumber size="small"></InputNumber>
              <span> /S</span>
              </Col>
            </Row>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>缓存设置</p>
              </Col>
              <Col span="20">

              </Col>
            </Row>
            <hr>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>是否开启缓存</p>
              </Col>
              <Col span="20">
              <Tag checkable color="green">是</Tag>
              <Tag checkable color="green">否</Tag>
              </Col>
            </Row>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>缓存设置时间</p>
              </Col>
              <Col span="20">
              <InputNumber size="small"></InputNumber>
              <span>秒</span>
              </Col>
            </Row>

          </div>
        </TabPane>
        <TabPane label="生效时间以及老板版停用时间" name="name7">
          <div>
            <Row style="margin-top:20px">
              <Col span="4">
              <p>当前版本号</p>
              </Col>
              <Col span="20">
              <p>V4</p>
              </Col>
            </Row>

            <Row style="margin-top:20px">
              <Col span="4">
              <p>当前状态</p>
              </Col>
              <Col span="2">
              <p>草稿</p>
              </Col>
              <Col span="18">
              <Button size="small">删除</Button>
              </Col>
            </Row>

            <Row style="margin-top:20px">
              <Col span="4">
              <p>生效时间设置</p>
              </Col>
              <Col span="20">
              <DatePicker type="datetime" style="width: 200px"></DatePicker>
              </Col>
            </Row>
            <hr>

            <Row style="margin-top:20px">
              <Col span="4">
              <p>上一版本号</p>
              </Col>
              <Col span="20">
              <p>V5</p>
              </Col>
            </Row>

            <Row style="margin-top:20px">
              <Col span="4">
              <p>上一版本停用时间</p>
              </Col>
              <Col span="20">
              <Tag checkable color="green">立即停用</Tag>
              <Tag checkable color="yellow">定时停用</Tag>
              <Tag checkable color="red">永久停用</Tag>
              <br>
              <DatePicker type="datetime" style="width: 200px"></DatePicker>
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
    <!-- 详情对话框 -->
    <Modal v-model="modal2" title="详情对话框" @on-ok="ok" @on-cancel="cancel">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      currentIndex: 1,
      modal1: false,
      modal2: false,
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
      }
    };
  },
  methods: {
    clickNext() {
      console.log(this.currentIndex);
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    detail() {
      this.$router.push({ path: "/dataModelDetail" });
    }
  }
};
</script>
<style>
</style>


