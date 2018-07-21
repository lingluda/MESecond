<template>
  <div>
    <div id="container" style="width:750px; height:300px"></div>
  </div>
</template>
<script>
import AMap from "AMap";
var map;
export default {
  mounted: function() {
    this.init();
  },
  methods: {
    init: function() {
      map = new AMap.Map("container", {
        center: [112.979517, 28.241905],
        resizeEnable: true,
        zoom: 12
      });
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function() {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
      });
      var marker = new AMap.Marker({
        position: map.getCenter()
      });
      marker.setMap(map);
      // 设置label标签
      marker.setLabel({
        //label默认蓝框白底左上角显示，样式className为：amap-marker-label
        offset: new AMap.Pixel(-22, -29), //修改label相对于maker的位置
        content: "长沙滨江文化园"
      });
    }
  }
};
</script>
<style scoped>
.amap-marker-label {
  top: -22px;
  left: -29px;
  background-color: rgb(219, 219, 62);
}
</style>