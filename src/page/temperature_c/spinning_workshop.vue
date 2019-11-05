<template>
  <div class="main">
    <list_components style="position: absolute;top: 14%;left: 8%"></list_components>
    <list_components style="position: absolute;top: 41%;left: 6%"></list_components>
    <list_components style="position: absolute;top: 55%;left: 6%"></list_components>
    <list_components style="position: absolute;top: 69%;left: 6%"></list_components>
    <list_components style="position: absolute;top: 83%;left: 6%"></list_components>

    <list_components style="position: absolute;top: 5%;left: 36%"></list_components>
    <list_components style="position: absolute;top: 22%;left: 34%"></list_components>
    <list_components style="position: absolute;top: 37%;left: 34%"></list_components>
    <list_components style="position: absolute;top: 55%;left: 36%"></list_components>
    <list_components style="position: absolute;top: 71%;left: 36%"></list_components>
    <list_components style="position: absolute;top: 87%;left: 36%"></list_components>

    <list_components style="position: absolute;top: 21%;left: 60%"></list_components>
    <list_components style="position: absolute;top: 35%;left: 60%"></list_components>
    <list_components style="position: absolute;top: 55%;left: 57%"></list_components>
    <list_components style="position: absolute;top: 78%;left: 57%"></list_components>

    <list_components style="position: absolute;top: 31%;left: 76%"></list_components>
    <list_components style="position: absolute;top: 62%;left: 78%"></list_components>
    <list_components style="position: absolute;top: 78%;left: 78%"></list_components>
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
    position: relative;
    background-image: url('http://10.162.80.8:90/Upload/UploadModel/images/%E5%8D%B7%E5%8C%85%E8%BD%A6%E9%97%B4%E6%B8%A9%E6%B9%BF%E5%BA%A6/u0.png');
    height: 100vh;
    background-size: 100% 100%;
  /*  &_list1{
      margin-left: 10ch;border: 1px solid yellow;width: 52ch;

    }*/
  }
</style>
