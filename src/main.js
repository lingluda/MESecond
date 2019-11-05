// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ajax from './utils/ajax'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
//easyUI框架
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';
import locale from 'vx-easyui/dist/locale/easyui-lang-zh_CN'
Vue.use(EasyUI, {
  locale: locale
});
//iviewUI框架
/*import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
Vue.use(iView);*/
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import 'babel-polyfill';
Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts
Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
let bus = new Vue()
Vue.prototype.bus = bus
Vue.prototype.ajax = ajax
import XLSX from 'xlsx'
/**
 * 导出数据报表xlsx文件
 * 已注入所有Vue实例，
 * template模板里调用 $$outputXlsxFile
 * 组件方法里调用 this.$outputXlsxFile
 * 例：this.$outputXlsxFile([['字段1', '字段2'], [1, 2]], [{wch: 10}, {wch: 50}], '测试导出') 得到 测试导出.xlsx 文件
 * 第一个参数是导出的数组对象，第二个参数是设置字段宽度，第三个参数是文件名
 */
const outputXlsxFile = (data, wscols, xlsxName) => {
  /* convert state to workbook */
  const ws = XLSX.utils.aoa_to_sheet(data)
  ws['!cols'] = wscols
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, xlsxName)
  /* generate file and send to client */
  XLSX.writeFile(wb, xlsxName + ".xlsx")
}

Vue.prototype.$outputXlsxFile = outputXlsxFile
Vue.prototype.$xlsx = XLSX

