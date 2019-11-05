<template>
  <div style="width: 20ch;background: #169bd5;padding: 5px;border-radius: 5px">
    <div>
      <span style="color: #fff;font-size: 18px">{{tt}}</span>
    </div>
    <div>
      <img style="margin: 5px 12px 5px 18px" src="http://10.162.80.8:90/Upload/UploadModel/images/%E5%8D%B7%E5%8C%85%E8%BD%A6%E9%97%B4%E6%B8%A9%E6%B9%BF%E5%BA%A6/u21.png" height="22" width="22"/>
      <span style="color: #fff" v-if="temperate">{{temperate}}°C</span>
      <span style="color: #fff" v-if="!temperate">--°C</span>
    </div>
    <div>
      <img style="margin: 0 12px 0 18px" src="http://10.162.80.8:90/Upload/UploadModel/images/%E5%8D%B7%E5%8C%85%E8%BD%A6%E9%97%B4%E6%B8%A9%E6%B9%BF%E5%BA%A6/u23.png" height="22" width="22"/>
      <span style="color: #fff" v-if="humidity">{{humidity}}%</span>
      <span style="color: #fff" v-if="!humidity">--%</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      props:{
        tt:String,
        temperate:String,
        humidity:String
      }
    }
</script>

<style scoped>

</style>
