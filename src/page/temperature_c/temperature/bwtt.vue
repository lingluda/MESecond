<template>
  <div style="width: 145px;background: #169bd5;padding: 5px;border-radius: 5px" @click="itemSelect(index)">

    <div style="display: flex" v-if="type==1">
      <div>
        <img src="http://10.162.80.8:90/Upload/UploadModel/images/%E5%8D%B7%E5%8C%85%E8%BD%A6%E9%97%B4%E6%B8%A9%E6%B9%BF%E5%BA%A6/u21.png" height="33" width="33"/>
      </div>
      <div>
        <span style="color: #fff">{{tt}}:</span>
        <div style="color: #fff" v-if="num">{{num}}°C</div>
        <div style="color: #fff" v-if="!num">--°C</div>
      </div>
    </div>
    <div style="display: flex" v-if="type==2">
      <div>
        <img src="http://10.162.80.8:90/Upload/UploadModel/images/%E5%8D%B7%E5%8C%85%E8%BD%A6%E9%97%B4%E6%B8%A9%E6%B9%BF%E5%BA%A6/u23.png" height="33" width="33"/>
      </div>
      <div>
        <span style="color: #fff">{{tt}}:</span>
        <div style="color: #fff" v-if="num">{{num}}%</div>
        <div style="color: #fff" v-if="!num">--%</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "bwtt",
      props:{
        index:Number,
          type:Number,
          tt:String,
        num:String,
      },
      methods:{
        itemSelect(v){
          console.log('z',v)
          this.$emit('clickItem',v)
        }
      }
    }
</script>

<style scoped>

</style>
