<template>
  <Menu mode="horizontal" theme="dark" active-name="1" style="hight:100vh;float:right" @on-select="changeMenu">
    <MenuItem name="1">
    <Icon type="ios-paper"></Icon>
    内容管理
    </MenuItem>
    <MenuItem name="2">
    <Icon type="ios-people"></Icon>
    用户管理
    </MenuItem>
    <MenuItem name="4">
    <Icon type="settings"></Icon>
    综合设置
    </MenuItem>
    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-person"></Icon>
        基本信息
      </template>
      <MenuGroup>
        <MenuItem name="3-1">个人信息</MenuItem>
        <MenuItem name="3-2">退出登陆</MenuItem>
      </MenuGroup>
    </Submenu>
  </Menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeMenu(active) {
      this.bus.$emit("toChangeTitle", active);
    }
  }
};
</script>

<style scoped>
</style>
