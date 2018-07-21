<template>
  <div class="layout">
    <div style="width:200px;height:64px;color:#fff;text-align:center;line-height:64px;background:#009688;font-size: 23px;">
      城市OS
    </div>
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="changeMenu">
        <Submenu v-for="item in menu" :key="item.id" :name="item.id">
          <template slot="title">
            <Icon :type="item.type"></Icon>
            {{item.name}}
          </template>
          <MenuItem v-for="childen in item.childen" :key="childen.id" :name="childen.path">{{childen.name}}</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme3: "dark",
      navbarIndex: "1",
      menu: []
    };
  },
  created() {
    var self = this;
    this.bus.$on("toChangeTitle", function(id) {
      if (id === "1") {
        self.menu = [
          {
            id: 1,
            name: "消息推送1",
            path: "",
            type: "ios-home",
            childen: [
              {
                id: 5,
                name: "用户管理1",
                path: "/tobaccobase",
                type: ""
              }
            ]
          },
          {
            id: 3,
            name: "数据模型",
            path: "/userManage",
            type: "ios-keypad",
            childen: [
              {
                id: 6,
                name: "数据模型列表",
                path: "/dataModelList",
                type: ""
              }
            ]
          }
        ];
      }
      if (id === "2") {
        self.menu = [
          {
            id: 2,
            name: "消息推送2",
            path: "",
            type: "ios-home",
            childen: [
              {
                id: 6,
                name: "用户管理2",
                path: "/msgsend",
                type: ""
              }
            ]
          }
        ];
      }
      if (id === "4") {
        self.menu = [
          {
            id: 5,
            name: "用户管理3",
            path: "/userManage",
            type: "ios-gear-outline",
            childen: [
              {
                id: 8,
                name: "用户管理7",
                path: "/login",
                type: ""
              }
            ]
          }
        ];
      }
    });
  },
  mounted() {
    this.menu = [
      {
        id: 1,
        name: "速度杠杠的",
        path: "",
        type: "ios-home",
        childen: [
          {
            id: 5,
            name: "速度杠杠的",
            path: "/msgsend",
            type: ""
          }
        ]
      }
    ];
  },
  methods: {
    changeMenu(active) {
      this.$router.push({ path: active });
    }
  },
  watch: {}
};
</script>

<style scoped>
</style>
