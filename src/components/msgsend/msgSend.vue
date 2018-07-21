<template>
  <div>
    <div style="height:30px;">
      <span style="line-hight:100vh">消息推送列表</span>
      <Button size="small" style="float:right">新增消息</Button>
    </div>
    <div>

      <Form ref="formInline" :model="formInline" inline :label-width="60">
        <FormItem label="筛选条件">
        </FormItem>
        <FormItem label="关键字">
          <Input type="text" v-model="formInline.user" placeholder="Username" size="small"></Input>
        </FormItem>
        <FormItem label="推送部门">
          <Select style="width:180px" size="small">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="推送时间">
          <DatePicker type="date" placeholder="Select date" v-model="formInline.date" size="small"
                      style="width:160px"></DatePicker>
          至
          <DatePicker type="date" placeholder="Select time" v-model="formInline.date" size="small"
                      style="width:160px"></DatePicker>
        </FormItem>
      </Form>
    </div>
    <Table stripe :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        formInline: {
          user: "",
          password: "",
          date: ""
        },
        columns1: [
          {
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "姓名",
            key: "rname"
          },
          {
            title: "账号",
            key: "uname"
          },
          {
            title: "密码",
            key: "passwd"
          },
          {
            title: "账号类型",
            key: "stype"
          },
          {
            title: "创建时间",
            key: "cdate"
          },
          {
            title: "登陆时间",
            key: "lst_date"
          },
          {
            title: "状态",
            key: "stat"
          },
          {
            title: "Action",
            key: "action",
            fixed: "right",
            width: 120,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    }
                  },
                  "View"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    }
                  },
                  "Edit"
                )
              ]);
            }
          }
        ],
        data1: [],
      };
    },
    created() {
      this.finit()
    },
    methods: {
      finit() {
        axios.get('data/user/userDataList')
          .then(response => this.data1 = response.data.data)
          .catch(error => console.log(error));
      }
    }
  };
</script>

<style>
</style>
