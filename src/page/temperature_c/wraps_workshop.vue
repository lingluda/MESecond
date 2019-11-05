<template>
    <a-spin :spinning="loading">
      <a-modal title="制丝车间温湿度明细" width="1000" v-model="visible" v-if="visible">
        <tablex  :selectIndex="selectIndex" :stime="stime" :etime="etime"></tablex>
      </a-modal>
      <div style="padding: 10px">
       <!-- <span style="color: #000;font-weight: bold;font-size: 15px">数采始止时间：</span>
        <a-range-picker
          :showTime="{ format: 'HH:mm:ss' }"
          :defaultValue="[moment().subtract(60, 'seconds'),moment()]"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['开始时间', '结束时间']"
          @ok="onOk"
        ><template slot="renderExtraFooter">
          请不要选择超过一个小时时间间隔，如有需要请调大刷新率！！！
        </template>
        </a-range-picker>-->
        <span style="color: #000;font-weight: bold;font-size: 15px">刷新频率：</span>
        <a-select defaultValue="60" style="width: 120px" @change="selectChange">
          <a-select-option value="5">5秒</a-select-option>
          <a-select-option value="10">10秒</a-select-option>
          <a-select-option value="30">30秒</a-select-option>
          <a-select-option value="60">60秒</a-select-option>
        </a-select>
        <a-button type="primary" @click="ttclick(0)">全部区域</a-button>
        <a-button type="primary" @click="init()">刷新</a-button>
      </div>
      <div style="display: flex;width: 100%" v-if="initDatas.length>0">
        <!--左侧-->
        <div style="width: 5%;border: 1px solid #d4d4d4;height: 80vh">
          <div style="margin:45vh 0 0 45%;font-weight: bold" class="tt">制<br>丝<br>办<br>公<br>辅<br>料<br>房</div>
        </div>
        <!--中上-->
        <div style="display: flex;width: 100%;flex-wrap: wrap">
          <!--中二-->
          <div style="flex-grow: 1;border: 1px solid #d4d4d4;width: 50%">
            <!--层-->
            <div style="display: flex;justify-content: space-between;padding: 5px;">
              <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS9WD" @clickItem="selectItem"  :index="91"></bwtt>
              <a class="tt" @click="ttclick(9)">掺兑加香区ZK9</a>
              <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS9SD" @clickItem="selectItem"  :index="92"></bwtt>
            </div>
            <div style="display: flex;justify-content: space-around;margin: 43px 0 40px 0">
              <list_components :tt="'1#'" :temperate="initData.ZK9WD1" :humidity="initData.ZK9SD1"></list_components>
              <list_components :tt="'2#'" :temperate="initData.ZK9WD2" :humidity="initData.ZK9SD2"></list_components>
              <list_components :tt="'3#'" :temperate="initData.ZK9WD3" :humidity="initData.ZK9SD3"></list_components>
              <list_components :tt="'4#'" :temperate="initData.ZK9WD4" :humidity="initData.ZK9SD4"></list_components>
            </div>
            <!--二层-->
            <div style="display: flex">
              <!--左一-->
              <div style="border: 1px solid #d4d4d4;width: 50%;">
                <div style="display: flex;justify-content: space-between;padding: 5px">
                  <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS8WD"></bwtt>
                  <a class="tt" @click="ttclick(8)">贮梗丝间ZK8</a>
                  <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS8SD"></bwtt>
                </div>
                <div style="display: flex;flex-wrap:wrap;justify-content: space-around;margin: 20px 0 ">
                  <wcontents style="margin-top: 10px" :tt="'1#'" :wd="initData.ZK8WD1" :sd="initData.ZK8SD1"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'2#'" :wd="initData.ZK8WD2" :sd="initData.ZK8SD2"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'3#'" :wd="initData.ZK8WD3" :sd="initData.ZK8SD3"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'4#'" :wd="initData.ZK8WD4" :sd="initData.ZK8SD4"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'5#'" :wd="initData.ZK8WD5" :sd="initData.ZK8SD5"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'6#'" :wd="initData.ZK8WD6" :sd="initData.ZK8SD6"></wcontents>
                </div>
              </div>
              <!--右-->
              <div style="border: 1px solid #d4d4d4;width: 50%">
                <!--1-->
                <div style="display: flex;justify-content: space-between;padding: 5px">
                  <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS6WD"></bwtt>
                  <a class="tt" @click="ttclick(6)">一号贮梗丝间ZK6</a>
                  <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS6SD"></bwtt>
                </div>
                <div style="display: flex;flex-wrap:wrap;justify-content: space-around;margin: 12px 0 22px 0">
                  <wcontents style="margin-top: 10px" :tt="'1#'" :wd="initData.ZK6WD1" :sd="initData.ZK6SD1"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'2#'" :wd="initData.ZK6WD2" :sd="initData.ZK6SD2"></wcontents>
                 <!-- <wcontents style="margin-top: 10px" :tt="'3#'" :wd="initData.ZK6WD3" :sd="initData.ZK6SD3"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'4#'" :wd="initData.ZK6WD4" :sd="initData.ZK6SD4"></wcontents>-->
                </div>
                <hr color=#d4d4d4>
                <!--2-->
                <div style="display: flex;justify-content: space-between;padding: 5px">
                  <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS7WD"></bwtt>
                  <a class="tt" @click="ttclick(7)">二号贮梗丝间ZK7</a>
                  <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS7SD"></bwtt>
                </div>
                <div style="display: flex;flex-wrap:wrap;justify-content: space-around;margin: 12px 0 22px 0">
                  <wcontents style="margin-top: 10px" :tt="'1#'" :wd="initData.ZK7WD1" :sd="initData.ZK7SD1"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'2#'" :wd="initData.ZK7WD2" :sd="initData.ZK7SD2"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'3#'" :wd="initData.ZK7WD3" :sd="initData.ZK7SD3"></wcontents>
                  <wcontents style="margin-top: 10px" :tt="'4#'" :wd="initData.ZK7WD4" :sd="initData.ZK7SD4"></wcontents>
                </div>
              </div>
            </div>
          </div>
          <!--中三-->
          <div style="flex-grow: 1;border: 1px solid #d4d4d4;width: 50%">
            <div style="text-align: center;border-bottom: 1px solid #d4d4d4;font-weight: bold;font-size: 22px;color: #000">香料厨房</div>
            <div style="display: flex;justify-content: space-between;padding: 5px">
              <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS10WD"></bwtt>
              <a class="tt" @click="ttclick(10)">膨胀丝处理ZK10</a>
              <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS10SD"></bwtt>
            </div>
            <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
              <list_components style="margin-top: 10px" :tt="'1#'" :temperate="initData.ZK10WD1" :humidity="initData.ZK10SD1"></list_components>
              <list_components style="margin-top: 10px" :tt="'2#'" :temperate="initData.ZK10WD2" :humidity="initData.ZK10SD2"></list_components>
              <!--<list_components style="margin-top: 10px" :tt="'3#'" :temperate="initData.ZK10WD3" :humidity="initData.ZK10SD3"></list_components>-->
            </div>
            <hr color=#d4d4d4>
            <div style="height: calc(20vh + 4px);">
              <div class="tt" style="padding-top: 6%;padding-left: 48%;">预留</div>
            </div>
            <div style="display: flex">
              <div style="display: flex;width: 50%">
                <div style="border: 1px solid #d4d4d4;flex-grow: 1">
                  <div style="display: flex;justify-content: space-between;padding: 5px;">
                    <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS5WD"></bwtt>
                    <a class="tt" @click="ttclick(5)">预车间ZK5</a>
                    <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS5SD"></bwtt>
                  </div>
                  <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
                    <wcontents style="margin-top: 10px" :tt="'1#'" :wd="initData.ZK5WD1" :sd="initData.ZK5SD1"></wcontents>
                    <wcontents style="margin-top: 10px" :tt="'2#'" :wd="initData.ZK5WD2" :sd="initData.ZK5SD2"></wcontents>
                    <wcontents style="margin-top: 10px" :tt="'3#'" :wd="initData.ZK5WD3" :sd="initData.ZK5SD3"></wcontents>
                    <wcontents style="margin-top: 10px" :tt="'4#'" :wd="initData.ZK5WD4" :sd="initData.ZK5SD4"></wcontents>
                  </div>
                </div>
              </div>
              <div style="display: flex;width: 50%">
                <div style="border: 1px solid #d4d4d4;flex-grow: 1">
                  <div style="display: flex;justify-content: space-between;padding: 5px;">
                    <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS4WD"></bwtt>
                    <a class="tt" @click="ttclick(4)">真空回潮ZK4</a>
                    <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS4SD"></bwtt>
                  </div>
                  <div style="display: flex;flex-wrap:wrap;justify-content: space-around;padding-bottom: 25px;">
                    <wcontents style="margin-top: 10px" :tt="'1#'" :wd="initData.ZK4WD1" :sd="initData.ZK4SD1"></wcontents>
                    <wcontents style="margin-top: 10px" :tt="'2#'" :wd="initData.ZK4WD2" :sd="initData.ZK4SD2"></wcontents>
                    <wcontents style="margin-top: 10px" :tt="'3#'" :wd="initData.ZK4WD3" :sd="initData.ZK4SD3"></wcontents>
                    <wcontents style="margin-top: 10px" :tt="'4#'" :wd="initData.ZK4WD4" :sd="initData.ZK4SD4"></wcontents>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--中下-->
          <div style="display: flex;width: 100%;">
            <div style="border: 1px solid #d4d4d4;flex-grow: 1;padding-bottom: 20px">
              <div style="display: flex;justify-content: space-between;padding: 5px">
                <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS1WD"></bwtt>
                <a class="tt" @click="ttclick(1)">制丝ZK1</a>
                <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS1SD"></bwtt>
              </div>
              <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
                <list_components style="margin-top: 10px" :tt="'1#'" :temperate="initData.ZK1WD1" :humidity="initData.ZK1SD1"></list_components>
                <list_components style="margin-top: 10px" :tt="'2#'" :temperate="initData.ZK1WD2" :humidity="initData.ZK1SD2"></list_components>
                <list_components style="margin-top: 10px" :tt="'3#'" :temperate="initData.ZK1WD3" :humidity="initData.ZK1SD3"></list_components>
                <list_components style="margin-top: 10px" :tt="'4#'" :temperate="initData.ZK1WD4" :humidity="initData.ZK1SD4"></list_components>
              </div>
                <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
                <list_components style="margin-top: 10px" :tt="'5#'" :temperate="initData.ZK1WD5" :humidity="initData.ZK1SD5"></list_components>
                <list_components style="margin-top: 10px" :tt="'6#'" :temperate="initData.ZK1WD6" :humidity="initData.ZK1SD6"></list_components>
                <list_components style="margin-top: 10px" :tt="'7#'" :temperate="initData.ZK1WD7" :humidity="initData.ZK1SD7"></list_components>
              </div>
            </div>
            <div style="border: 1px solid #d4d4d4;flex-grow: 1">
              <div style="display: flex;justify-content: space-between;padding: 5px">
                <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS2WD"></bwtt>
                <a class="tt" @click="ttclick(2)">制丝ZK2</a>
                <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS2SD"></bwtt>
              </div>
              <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
                <list_components style="margin-top: 10px" :tt="'1#'" :temperate="initData.ZK2WD1" :humidity="initData.ZK2SD1"></list_components>
                <list_components style="margin-top: 10px" :tt="'2#'" :temperate="initData.ZK2WD2" :humidity="initData.ZK2SD2"></list_components>
                <list_components style="margin-top: 10px" :tt="'3#'" :temperate="initData.ZK2WD3" :humidity="initData.ZK2SD3"></list_components>
                <list_components style="margin-top: 10px" :tt="'4#'" :temperate="initData.ZK2WD4" :humidity="initData.ZK2SD4"></list_components>
              </div>
            <!--  <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
                <list_components style="margin-top: 10px" :tt="'5#'" :temperate="initData.ZK2WD5" :humidity="initData.ZK2SD5"></list_components>
                <list_components style="margin-top: 10px" :tt="'6#'" :temperate="initData.ZK2WD6" :humidity="initData.ZK2SD6"></list_components>
              </div>-->
            </div>
            <div style="border: 1px solid #d4d4d4;flex-grow: 1">
              <div style="display: flex;justify-content: space-between;padding: 5px">
                <bwtt :tt="'加权平均温度'" :type="1" :num="initData.ZS3WD"></bwtt>
                <a class="tt" @click="ttclick(3)">制丝ZK3</a>
                <bwtt :tt="'加权平均湿度'" :type="2" :num="initData.ZS3SD"></bwtt>
              </div>
              <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
                <list_components style="margin-top: 10px" :tt="'1#'" :temperate="initData.ZK3WD1" :humidity="initData.ZK3SD1"></list_components>
                <list_components style="margin-top: 10px" :tt="'2#'" :temperate="initData.ZK3WD2" :humidity="initData.ZK3SD2"></list_components>
                <list_components style="margin-top: 10px" :tt="'3#'" :temperate="initData.ZK3WD3" :humidity="initData.ZK3SD3"></list_components>
                <list_components style="margin-top: 10px" :tt="'4#'" :temperate="initData.ZK3WD4" :humidity="initData.ZK3SD4"></list_components>
              </div>
              <div style="display: flex;flex-wrap:wrap;justify-content: space-around">
                <list_components style="margin-top: 10px" :tt="'5#'" :temperate="initData.ZK3WD5" :humidity="initData.ZK3SD5"></list_components>
                <list_components style="margin-top: 10px" :tt="'6#'" :temperate="initData.ZK9WD1" :humidity="initData.ZK9SD1"></list_components>
              </div>
            </div>
          </div>
        </div>
        <!--右侧-->
        <div style="width: 5%;border: 1px solid #d4d4d4">
          <div style="margin:45vh 0 0 45%;font-weight: bold" class="tt">高<br>架<br>库</div>
        </div>
      </div>
        </a-spin>
</template>

<script>
  import moment from 'moment';
    export default {
      components:{
        list_components:resolve => require(["@/page/temperature_c/temperature/wcontent.vue"], resolve),
        wcontents:resolve => require(["@/page/temperature_c/temperature/wcontents.vue"], resolve),
        bwtt:resolve => require(["@/page/temperature_c/temperature/bwtt.vue"], resolve),
        tablex:resolve => require(["@/page/temperature_c/temperature/table.vue"], resolve),
      },
      data(){
        return{
          loading:false,
          selectIndex:'',
          visible:false,
          distanceTime:0,
          distanceTimes:0,
          dateFormat: 'YYYY-MM-DD HH:mm:ss',
          initData:[],
          initDatas:[],
          stime:moment().subtract(15*60, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
        //  stime:'2019-10-15 09:50:00',
          etime:moment().format('YYYY-MM-DD HH:mm:ss'),
         // etime:'2019-10-15 09:52:59',
          rate:60*1000,
        }
      },
      mounted(){
        this.init();
        var timer
        var ini = () => {
          this.distanceTime++
          this.initData = this.initDatas[this.distanceTime]
          timer = setTimeout(() => {
            ini()
          },this.rate)
        }
        ini()
      },
      methods:{
        moment,
        init(){
          this.loading=true
          this.distanceTime=0
          //string rate, string stime, string etime
          this.ajax.post('NNTSMesKB/BoxKeep/nowData',{rate:this.rate,stime:this.stime,etime:this.etime},data=>{
            this.initData = data.data.Data[0]
            this.initDatas = data.data.Data
            this.distanceTimes = data.data.Data.length
            this.loading=false
          })
        },
        onOk(value) {
          console.log('onOk: ', this.ajax.gmt2strs(value[0]._d),this.ajax.gmt2strs(value[1]._d));
          this.stime = this.ajax.gmt2strs(value[0]._d)
          this.etime = this.ajax.gmt2strs(value[1]._d)
          this.init()
        },
        selectChange(v){
          this.rate = v*1000
          this.init()
        },
        ttclick(v){
          this.selectIndex = v
          this.visible = true
        },
        selectItem(v){
          console.log('f',v)
        }
      }
    }
</script>

<style lang="less" scoped>
  .tt{
    font-weight: bold;font-size: 22px;color: #000;
  }
</style>
