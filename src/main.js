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
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import 'babel-polyfill';
Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts
Vue.use(Antd);
Vue.use(iView);
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

