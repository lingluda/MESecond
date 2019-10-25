<template>
  <div>
    <!--双击模态框-->
    <a-modal
      title="辅料明细"
      v-model="visibles"
      :footer="null"
      :width="1600"
    >
      <table style="width: 100%">
        <tr>
          <th class="tsdf">材料类</th>
          <th class="tsdf">材料编码</th>
          <th class="tsdf">材料名称</th>
          <th class="tsdf">单耗</th>
          <th class="tsdf" style="width: 40px;">单位</th>
          <th class="tsdf">车间结存</th>
          <th class="tsdf">高架库结存</th>
          <th class="tsdf">仓库结存</th>
          <th class="tsdf">上期合计</th>

          <th class="tsdf">真退数</th>
          <th class="tsdf">年底减数</th>
          <th class="tsdf">月初可生产量
          </th>
          <th class="tsdf">待检</th>
          <th class="tsdf">入库</th>
          <th class="tsdf">可用量</th>
          <th class="tsdf">可生产量</th>
          <th class="tsdf">
            不含待检可生产量
          </th>
          <th class="tsdf">待检可生产量
          </th>
        </tr>
        <tr v-if="facname.length>0">
          <td class="tsdfl">{{this.facname[dbclickindex].MATTYPE}}</td>
          <td class="tsdfl">{{this.facname[dbclickindex].MATCD}}</td>
          <td class="tsdfl">{{this.facname[dbclickindex].MATNAME}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].RATIO}}</td>
          <td class="tsdfl" style="width: 40px;">{{this.facname[dbclickindex].MEASURE}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].QTY||0}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].GJKKC}}</td>
          <td class="tsdfs">
            {{(Number(this.facname[dbclickindex].CKJC)+Number(this.facname[dbclickindex].JT)-Number(this.facname[dbclickindex].YEARCUT)).toFixed(4)}}
          </td>
          <td class="tsdfs">
            {{(Number(this.facname[dbclickindex].GJKKC)+Number(this.facname[dbclickindex].QTY)+Number(this.facname[dbclickindex].CKJC)+Number(this.facname[dbclickindex].JT)-Number(this.facname[dbclickindex].YEARCUT)).toFixed(4)}}
          </td>
          <td class="tsdfs">{{this.facname[dbclickindex].REALQTY||0}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].YEARCUT||0}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].YCKSC}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].DJ}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].RK}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].KY}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].KSC}}</td>
          <td class="tsdfs">{{this.facname[dbclickindex].BHDJKSC}}</td>
          <td class="tsdfs" style="width: 89px;">{{this.facname[dbclickindex].DJKSC}}</td>
        </tr>
      </table>
    </a-modal>
    <!--物料明细-->
    <a-modal
      title="辅料明细"
      v-model="visible"
      :footer="null"
      :width="1600"
    >
      材料名称：
      <a-input style="width:120px;margin-bottom:10px" size="small" v-model="keywords" placeholder="请输入材料名称"></a-input>
      <!--<a-select
        showSearch style="width:200px;margin-bottom:10px" size="small" :defaultActiveFirstOption="false"
        :showArrow="false"
        placeholder="请输入材料名称"
        allowClear
        :dropdownMatchSelectWidth="false"
        @change="infosearch"
        :notFoundContent="null"
      >
        <a-select-option v-for="d in facname" :key="d.MATNAME">{{d.MATNAME}}</a-select-option>
      </a-select>-->
      <!--v-on:search="search"-->
      <div style="height: 500px;margin-top: 10px">
        <div class="table-head">
          <table>
            <colgroup>
              <col style="width: 60px;"/>
              <col/>
            </colgroup>
            <thead>
            <tr>
              <th class="tsdf">材料类</th>
              <th class="tsdf">材料编码</th>
              <th class="tsdf">材料名称</th>
              <th class="tsdf">单耗</th>
              <th class="tsdf" style="width: 40px;">单位</th>
              <th class="tsdf">车间结存</th>
              <th class="tsdf">高架库结存</th>
              <th class="tsdf">仓库结存</th>
              <th class="tsdf">上期合计</th>
              <th class="tsdf">真退数</th>
              <th class="tsdf">年底减数</th>
              <th class="tsdf">月初可生产量
              </th>
              <th class="tsdf">待检</th>
              <th class="tsdf">入库</th>
              <th class="tsdf">可用量</th>
              <th class="tsdf">可生产量</th>
              <th class="tsdf">
                不含待检可生产量
              </th>
              <th class="tsdf">待检可生产量
              </th>
            </tr>
            </thead>
          </table>
        </div>
        <div class="table-body" style="height: 450px">
          <table>
            <colgroup>
              <col style="width: 60px;"/>
              <col/>
            </colgroup>
            <tbody>

            <tr v-if="facname.length>0" v-for="(item,index) in facname" :key="index" @click="mtable(index)"
                :class="index===selectIndexs?'zz':''">
              <td class="tsdfl">{{item.MATTYPE}}</td>
              <td class="tsdfl">{{item.MATCD}}</td>
              <td class="tsdfl">{{item.MATNAME}}</td>
              <td class="tsdfs">{{item.RATIO}}</td>
              <td class="tsdfl" style="width: 40px;">{{item.MEASURE}}</td>
              <td class="tsdfs">{{item.QTY||0}}</td>
              <td class="tsdfs">{{item.GJKKC}}</td>
              <td class="tsdfs">{{(Number(item.CKJC)+Number(item.JT)-Number(item.YEARCUT)).toFixed(4)}}</td>
              <td class="tsdfs">
                {{(Number(item.GJKKC)+Number(item.QTY)+Number(item.CKJC)+Number(item.JT)-Number(item.YEARCUT)).toFixed(4)}}
              </td>
              <td class="tsdfs">{{item.REALQTY||0}}</td>
              <td class="tsdfs">{{item.YEARCUT||0}}</td>
              <td class="tsdfs">{{item.YCKSC}}</td>
              <td class="tsdfs">{{item.DJ}}</td>
              <td class="tsdfs">{{item.RK}}</td>
              <td class="tsdfs">{{item.KY}}</td>
              <td class="tsdfs">{{item.KSC}}</td>
              <td class="tsdfs">{{item.BHDJKSC}}</td>
              <td class="tsdfs" style="width: 89px;">{{item.DJKSC}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <template slot="footer">
        <a-button type="primary" @click="">确定</a-button>
        <a-button @click="">取消</a-button>
      </template>
    </a-modal>
    <!--搜索-->
    <div style="display:flex;justify-content:space-between;width:100%;">
      <div style="display:flex;">
        <div>
          <!--<a-input-search placeholder="请输入搜索内容" enter-button style="width:200px;margin-bottom:10px" size="small"
                          v-on:search="search"
          />-->
          材料名称：
          <a-input style="width:120px;margin-bottom:10px" size="small" v-model="keywordss"
                   placeholder="请输入材料名称"></a-input>
          <!-- <a-select
             showSearch style="width:200px;margin-bottom:10px" size="small" :defaultActiveFirstOption="false"
             :showArrow="false"
             placeholder="请输入材料名称"
             allowClear
             :dropdownMatchSelectWidth="false"
             @change="search"
             :notFoundContent="null"
           >
            <a-select-option v-for="d in resouceData" :key="d.MATNAME">{{d.MATNAME}}</a-select-option>
          </a-select>-->
        </div>
        <div style="margin:0 20px 0 10px">
          <a-select defaultValue="1" style="width: 110px" size="small" v-model="mctype"
                    :dropdownMatchSelectWidth="false">
            <a-select-option v-for ="(item,index) in materialUsedList" :key="index" :value="item.cd">{{item.name}}</a-select-option>
          </a-select>
          <a-button type="primary" size="small" v-on:click="pack">计算</a-button>
          <a-button type="primary" size="small" v-on:click="tableSelects">辅料明细</a-button>
        </div>
        <div><span style="font-weight: bold">最后测算时间：</span>{{modifytime}}</div>
      </div>
      <div style="display:flex;">
        <div>
          <span style="font-weight: bold">单位：</span>箱
        </div>
        <div>
          <span style="background:#00b0f0;padding:5px;margin:0 5px 0 10px">日生产量</span>
        </div>
        <div style="margin:0 10px 0 5px">
          <span style="background:#ffc000;padding:5px">待检量</span>
        </div>
      </div>
    </div>
    <!--主表-->
    <a-row style="margin:5px 0 40px 0">
      <a-spin :spinning="cspinning">
        <div style="height: 400px">
          <div class="table-head">
            <table>
              <colgroup>
                <col style="width: 270px;"/>
                <col/>
              </colgroup>
              <thead>
              <tr>
                <th style="background:#a8cee8;">材料名称</th>
                <th v-for="(item,index) in curmonday" :key="index" class="table-th-css"
                    style="border: 1px solid #d4d4d4;background:#a8cee8;text-align:center">{{item}}
                </th>
              </tr>
              </thead>
            </table>
          </div>
          <div class="table-body">
            <table>
              <colgroup>
                <col style="width: 270px;"/>
                <col/>
              </colgroup>
              <tbody>
              <tr v-for="(item,index) in resouceData" :key="index" v-on:click="tableSelect(index)"
                  @dblclick="dbclicktable(item.MATCD)">
                <td
                  style="border: 1px solid rgb(220, 222, 226) ;overflow: hidden; textOverflow: ellipsis;whiteSpace: nowrap"
                  :title="item.MATNAME">{{item.MATNAME}}
                </td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D1)&&Number(item.KSC) >= Number(item.D1)">
                  {{item.D1}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D1)&&Number(item.KSC) < Number(item.D1)">
                  {{item.D1}}
                </td>
                <td class="x_cell" v-else>{{item.D1}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D2)+Number(item.D1)">
                  {{item.D2}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D2)+Number(item.D1)">
                  {{item.D2}}
                </td>
                <td class="x_cell" v-else>{{item.D2}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D3}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D3}}
                </td>
                <td class="x_cell" v-else>{{item.D3}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D4}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D4}}
                </td>
                <td class="x_cell" v-else>{{item.D4}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D5}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D5}}
                </td>
                <td class="x_cell" v-else>{{item.D5}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D6}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D6}}
                </td>
                <td class="x_cell" v-else>{{item.D6}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D7}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D7}}
                </td>
                <td class="x_cell" v-else>{{item.D7}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D8}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D8}}
                </td>
                <td class="x_cell" v-else>{{item.D8}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D9}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D9}}
                </td>
                <td class="x_cell" v-else>{{item.D9}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D10}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D10}}
                </td>
                <td class="x_cell" v-else>{{item.D10}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D11}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D11}}
                </td>
                <td class="x_cell" v-else>{{item.D11}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D12}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D12}}
                </td>
                <td class="x_cell" v-else>{{item.D12}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D13}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D13}}
                </td>
                <td class="x_cell" v-else>{{item.D13}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D14}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D14}}
                </td>
                <td class="x_cell" v-else>{{item.D14}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D15}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D15}}
                </td>
                <td class="x_cell" v-else>{{item.D15}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D16}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D16}}
                </td>
                <td class="x_cell" v-else>{{item.D16}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D17}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D17}}
                </td>
                <td class="x_cell" v-else>{{item.D17}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D18}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D18}}
                </td>
                <td class="x_cell" v-else>{{item.D18}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D19}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D19}}
                </td>
                <td class="x_cell" v-else>{{item.D19}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D20}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D20}}
                </td>
                <td class="x_cell" v-else>{{item.D20}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D21}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D21}}
                </td>
                <td class="x_cell" v-else>{{item.D21}}</td>


                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D22}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D22}}
                </td>
                <td class="x_cell" v-else>{{item.D22}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D23}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D23}}
                </td>
                <td class="x_cell" v-else>{{item.D23}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D24}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D24}}
                </td>
                <td class="x_cell" v-else>{{item.D24}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D25}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D25}}
                </td>
                <td class="x_cell" v-else>{{item.D25}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D26}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D26}}
                </td>
                <td class="x_cell" v-else>{{item.D26}}</td>

                <td class="c_cell"
                    v-if="Number(item.DJKSC)+Number(item.KSC)>Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D27}}
                </td>
                <td class="s_cell"
                    v-else-if="Number(item.DJKSC)+Number(item.KSC)>=Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D27}}
                </td>
                <td class="x_cell" v-else>{{item.D27}}</td>

                <td class="c_cell"
                    v-if="curmonday>27&&Number(item.DJKSC)+Number(item.KSC)>Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D28}}
                </td>
                <td class="s_cell"
                    v-else-if="curmonday>27&&Number(item.DJKSC)+Number(item.KSC)>=Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D28}}
                </td>
                <td class="x_cell" v-else-if="curmonday>27">{{item.D28}}</td>

                <td class="c_cell"
                    v-if="curmonday>28&&Number(item.DJKSC)+Number(item.KSC)>Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D29}}
                </td>
                <td class="s_cell"
                    v-else-if="curmonday>28&&Number(item.DJKSC)+Number(item.KSC)>=Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D29}}
                </td>
                <td class="x_cell" v-else-if="curmonday>28">{{item.D29}}</td>

                <td class="c_cell"
                    v-if="curmonday>29&&Number(item.DJKSC)+Number(item.KSC)>Number(item.D30)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D30)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D30}}
                </td>
                <td class="s_cell"
                    v-else-if="curmonday>29&&Number(item.DJKSC)+Number(item.KSC)>=Number(item.D30)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D30)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D30}}
                </td>
                <td class="x_cell" v-else-if="curmonday>29">{{item.D30}}</td>

                <td class="c_cell"
                    v-if="curmonday>30&&Number(item.DJKSC)+Number(item.KSC)>Number(item.D31)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) >= Number(item.D31)+Number(item.D30)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D31}}
                </td>
                <td class="s_cell"
                    v-else-if="curmonday>30&&Number(item.DJKSC)+Number(item.KSC)>=Number(item.D31)+Number(item.D30)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)&&Number(item.KSC) < Number(item.D31)+Number(item.D30)+Number(item.D29)+Number(item.D28)+Number(item.D27)+Number(item.D26)+Number(item.D25)+Number(item.D24)+Number(item.D23)+Number(item.D22)+Number(item.D21)+Number(item.D20)+Number(item.D19)+Number(item.D18)+Number(item.D17)+Number(item.D16)+Number(item.D15)+Number(item.D14)+Number(item.D13)+Number(item.D12)+Number(item.D11)+Number(item.D10)+Number(item.D9)+Number(item.D8)+Number(item.D7)+Number(item.D6)+Number(item.D5)+Number(item.D4)+Number(item.D3)+Number(item.D2)+Number(item.D1)">
                  {{item.D31}}
                </td>
                <td class="x_cell" v-else-if="curmonday>30">{{item.D31}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </a-spin>
    </a-row>
    <!--下面2关联表-->
    <div style="display:flex;margin:20px 0 20px;justify-content:space-around">
      <div style="height: 234px">
        <span style="font-weight:700">生产计划</span>
        <div class="table-head" style="width:350px">
          <table>
            <colgroup>
              <col style="width: 200px;"/>
              <col/>
            </colgroup>
            <thead>
            <tr>
              <th style="border: 1px solid rgb(220, 222, 226);background:#a8cee8;text-align:center">牌号</th>
              <th style="border: 1px solid rgb(220, 222, 226);background:#a8cee8;text-align:center">计划量</th>
              <th style="border: 1px solid rgb(220, 222, 226);background:#a8cee8;text-align:center">计量单位</th>
            </tr>
            </thead>
          </table>
        </div>
        <div class="table-body" style="width:356px;">
          <table>
            <colgroup>
              <col style="width: 200px;"/>
              <col/>
            </colgroup>
            <tbody>
            <tr v-for="(item,index) in planList" :key="index" v-on:click="selectP(index)"
                :class="index===selectIndex?'zz':''">
              <td style="border: 1px solid rgb(220, 222, 226)">{{item.name}}</td>
              <td style="border: 1px solid rgb(220, 222, 226);text-align: right;">{{item.sum}}</td>
              <td style="border: 1px solid rgb(220, 222, 226)">箱</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="margin:0 20px 0 20px;">
        <span
          style="font-weight:700">BOM信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌号：</span><span>{{bn}}</span><span
        style="font-weight:700">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计划量：</span><span>{{bs}}</span>
        <a style="float: right;margin: 0 20px 0 0;" v-on:click="selectPq()" v-if="!isbom">测算材料</a>
        <a style="float: right;margin: 0 20px 0 0;" v-on:click="selectPs()" v-if="isbom">全部材料</a>
        <a-spin :spinning="spinning">
          <div class="table-head" style="width:550px">
            <table>
              <colgroup>
                <col style="width: 100px;"/>
                <col/>
              </colgroup>
              <thead>
              <tr>
                <th style="border: 1px solid rgb(220, 222, 226);background:#a8cee8;text-align:center">材料大类</th>
                <th style="border: 1px solid rgb(220, 222, 226);background:#a8cee8;text-align:center">材料名称</th>
                <th style="border: 1px solid rgb(220, 222, 226);background:#a8cee8;text-align:center;width:80px;">转大箱数
                </th>
                <th style="border: 1px solid rgb(220, 222, 226);background:#a8cee8;text-align:center;width:80px;">可生产量
                </th>
              </tr>
              </thead>
            </table>
          </div>
          <div class="table-body" style="width:556px;height: 234px !important;">
            <table>
              <colgroup>
                <col style="width: 100px;"/>
                <col/>
              </colgroup>
              <tbody>

              <tr v-for="(item,index) in boomList" :index="index">
                <td style="border: 1px solid rgb(220, 222, 226)">{{item.LNAME}}</td>
                <td
                  style="border: 1px solid rgb(220, 222, 226);overflow: hidden; textOverflow: ellipsis;whiteSpace: nowrap"
                  :title="item.NAME">{{item.NAME}}
                </td>
                <td style="border: 1px solid rgb(220, 222, 226);text-align: right;width:80px;">{{item.RATIO}}</td>
                <td style="border: 1px solid rgb(220, 222, 226);text-align: right;width:80px;">{{item.QTY}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </a-spin>
      </div>
      <div>
        <span style="font-weight:700">材料信息</span>
        <a-spin :spinning="lpinning">
          <table style="border: 1px solid rgb(220, 222, 226);width: 400px;text-align: left;border-collapse:collapse">
            <tr>
              <td style="border: 1px solid rgb(220, 222, 226)">材料名称：{{plan.MATNAME}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgb(220, 222, 226)">月初可生产量：{{plan.YCKSC}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgb(220, 222, 226)">生产牌号：{{plan.CANPRODUCTNM}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgb(220, 222, 226)">生产厂家：<span v-for="(i,index) in fac" :key="index">{{i.FACNAME}},</span>
              </td>
            </tr>
          </table>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mc",
    data() {
      return {
        mctype: '全部',
        keywords: '',
        keywordss: '',
        isbom: true,
        mstyle: {hight: '800px'},
        visible: false,
        visibles: false,
        datainfo: '',
        selectIndex: '',
        selectIndexs: '',
        dbclickindex: 0,
        modifytime: '',
        spinning: false,
        cspinning: false,
        lpinning: false,
        Scontent: '',
        bn: '',
        bs: '',
        curmonday: '',
        resouceData: [],
        planList: [],
        boomList: [],
        plan: '',
        facname: [],
        fac: [],
        facnames: {
          ckjc: '',
          gjkkc: '',
          cjjc: '',
          sqhj: '',
          GJKKC: '',
          YEARCUT: '',
          ZT: '',
          dj: '',
          rk: '',
          ljjh: '',
          jt: '',
          ky: '',
          ksc: '',
          bhdjksc: '',
          djksc: '',
          ycksc: '',
          MEASURE: '',
          CANPRODUCTNM: '',
          RATIO: '',

        },
        materialUsedList: [],
      }
    },
    mounted() {
      this.dateInit()
      this.todoList()
      this.materialIsUsed()
    },
    methods: {
      //
      materialIsUsed() {
        this.ajax.post('NNTSMesKB/IsMpm/getLists', {}, data => {
          console.log(data.data.Data)
          this.materialUsedList = data.data.Data.map(item => {
            return {cd: item.MATTYPECD, name: item.MATTYPENAME}
          })
          this.materialUsedList.unshift({cd: 2, name: '非专用材料'})
          this.materialUsedList.unshift({cd: 0, name: '专用材料'})
          this.materialUsedList.unshift({cd: 1, name: '全部'})
        })
      },
      //物料明细查询
      mtable(v) {
        this.selectIndexs = v
      },
      dateInit() {
        var now = new Date()
        //获取当月天数
        var da = new Date(now.getYear(), now.getMonth() + 1, 0)
        this.curmonday = da.getDate()
      },
      //初始化日期
      todoList() {
        this.ajax.post('NNTSMesKB/materialComputer/getCS', {}, data => {
          this.resouceData = data.data.Data
          this.modifytime = data.data.Data[0].MODIFYTIME
          this.boomList = []
        })
        this.ajax.post('NNTSMesKB/materialComputer/monthPlan', {}, data => {
          this.planList = data.data.Data
        })
        var url = 'NNTSMesKB/materialComputer/getmfrs'
        this.ajax.post(url, {}, data => {
          this.facname = data.data.Data
        })
      },
      //计算
      pack() {
        this.cspinning = true
        this.ajax.post('NNTSMesKB/materialComputer/pack', {}, res => {
          this.todoList()
          this.cspinning = false
        })
      },
      //查询
      search() {
        this.cspinning = true
        var url = 'NNTSMesKB/materialComputer/getSearch'
        this.ajax.post(url, {key: this.keywordss, type: this.mctype}, data => {
          this.resouceData = data.data.Data
          this.cspinning = false
        })
      },
      //物料明细查询
      infosearch() {
        var url = 'NNTSMesKB/materialComputer/getmfrs'
        this.ajax.post(url, {name: this.keywords}, data => {
          this.facname = data.data.Data
        })
      },
      //物料明细查询
      infosearchs(v) {
        console.log(v)
        var url = 'NNTSMesKB/materialComputer/getmfrs'
        this.ajax.post(url, {cd: v}, data => {
          this.facname = data.data.Data
        })
      },
      tableSelect(v) {
        this.plan = this.resouceData[v]
        this.lpinning = true
        this.fac = []
        var url = 'NNTSMesKB/materialComputer/getmfrss'
        this.ajax.post(url, {cd: this.resouceData[v].MATCD}, data => {
          for (var i = 0; i < data.data.Data.length; i++) {
            this.fac.push(data.data.Data[i])
            this.lpinning = false
          }
        })
      },
      //双击选中
      dbclicktable(v) {
        this.infosearchs(v)
        this.visibles = true
      },
      //表格选中
      tableSelects() {
        this.lpinning = true
        this.visible = true
        var url = 'NNTSMesKB/materialComputer/getmfrs'
        this.ajax.post(url, {}, data => {
          this.facname = data.data.Data
          this.lpinning = false
        })
      },
      selectP(v) {
        this.isbom = true
        this.selectIndex = v
        this.boominfo(this.planList[v].id)
        this.bn = this.planList[v].name
        this.bs = this.planList[v].sum
      },
      //测算
      selectPs() {
        this.isbom = false
        if (this.selectIndex === '') {
          return
        }
        this.boominfos(this.planList[this.selectIndex].id)
        this.bn = this.planList[this.selectIndex].name
        this.bs = this.planList[this.selectIndex].sum
      },

      //全部
      selectPq() {
        this.isbom = true
        if (this.selectIndex === '') {
          return
        }
        this.boominfo(this.planList[this.selectIndex].id)
        this.bn = this.planList[this.selectIndex].name
        this.bs = this.planList[this.selectIndex].sum
      },
      //bom信息
      boominfo(id) {
        this.spinning = true
        var url = 'NNTSMesKB/materialComputer/phs'
        this.ajax.post(url, {id: id}, data => {
          this.boomList = data.data.Data
          this.spinning = false
        })
      },
      boominfos(id) {
        this.spinning = true
        var url = 'NNTSMesKB/materialComputer/ph'
        this.ajax.post(url, {id: id}, data => {
          this.boomList = data.data.Data
          this.spinning = false
        })
      },
    },
    watch: {
      keywords: "infosearch",
      keywordss: "search",
      mctype: "search",
    }
  }
</script>

<style scoped>
  .zz {
    background: #00b0f0 !important;
  }

  .main-layout {
    overflow: auto;
  }

  .c_cell {
    width: 12%;
    border: 1px solid rgb(220, 222, 226);
    background: #00b0f0;
    text-align: right;
  }

  .x_cell {
    width: 12%;
    border: 1px solid rgb(220, 222, 226);
    text-align: right;
  }

  .s_cell {
    width: 12%;
    border: 1px solid rgb(220, 222, 226);
    background: #ffc000;
    text-align: right;
  }

  .table-head table,
  .table-body table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-head {
    padding-right: 15px;
  }

  .table-body {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .table-body table tr:nth-child(2n+1) {
    background-color: #f2f2f2;
  }

  .table-body table tr td {
    border: 1px solid #d4d4d4;
    /*text-align: center;*/
    word-wrap: break-word;
  }

  .table-head table tr th {
    border: 1px solid #d4d4d4;
    text-align: center;
  }

  .ant-input {
    min-height: unset
  }

  .ant-input {
    min-height: unset
  }

  .ant-input-affix-wrapper .ant-input {
    min-height: unset
  }

  table {
    table-layout: fixed;
    WORD-BREAK: break-all;
  }

  .tsdf {
    border: 1px solid #d4d4d4;
    background: #a8cee8;
    text-align: center;
  }

  .tsdfs {
    border: 1px solid #d4d4d4;
    text-align: right;
  }

  .tsdfl {
    border: 1px solid #d4d4d4;
    text-align: left;
  }

  .ant-modal-body {
    height: 500px !important;
  }
</style>
