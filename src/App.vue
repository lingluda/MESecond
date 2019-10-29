<template>
  <a-locale-provider :locale="locale">
    <router-view/>
  </a-locale-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  export default {
    data() {
      return {
        locale: zhCN,
      }
    },
    mounted() {
      let loading = document.getElementById('Loading')
      if (loading != null) {
        document.body.removeChild(loading)
      }
      // 直接在某一事件下面直接判断
      //如果是在刚进入页面就判断，写在mounted里面

      if (!!window.ActiveXObject || "ActiveXObject" in window)
      {
        localStorage.setItem('isIE',true)
      }
      else {
        localStorage.setItem('isIE',false)
      }
    },
  }
</script>
<style lang="less">
  th.column-money {
    background-color: #a8cee8 !important;
    text-align: center !important;
    font-weight: 550 !important;
  }

  .ant-table-small > .ant-table-content > .ant-table-body {
    margin: 0 !important;
  }
</style>

