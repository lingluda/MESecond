<template>
  <div class="main">
    <div class="main_list1">
        <list_components style="float: right"></list_components>
    </div>
    <div style="margin-left: 14ch;border: 1px solid yellow;width: 48ch">1</div>
    <div style="margin-left: 1ch;border: 1px solid yellow;width: 40ch">1</div>
    <div style="margin-left: 1ch;border: 2px solid yellow;width: 47ch">1</div>
  </div>
</template>

<script>
  export default {
    components:{
      list_components:resolve => require(["@/page/temperature_c/temperature/index.vue"], resolve),
    }
  }
</script>

<style lang="less" scoped>
  .main {
    display: flex;
    background-image: url('http://10.162.80.8:90/Upload/UploadModel/images/%E5%8C%BA%E5%9F%9F%E6%B8%A9%E6%B9%BF%E5%BA%A6%E6%98%8E%E7%BB%86%E7%BA%AF%E5%9B%BE%E6%A0%87/u423.png');
    height: 100vh;
    background-size: 100% 100%;
    &_list1{
      margin-left: 10ch;border: 1px solid yellow;width: 52ch;

    }
  }
</style>
