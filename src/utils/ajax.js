import axios from 'axios';
import qs from 'qs'
import '../utils/dateformat.js'
// import $ from 'jquery'
// axios.defaults.timeout = 6000;
// axios.defaults.baseURL = 'http://10.162.80.8:90/'
//
let ajax = {};
ajax.post = function (url,params,callback){
  axios.post(url, qs.stringify(params)).then(res=>{
    if (res.data.IsSucceed) {
    callback(res)
    }else {
      alert(res.data.Error)
    }
  })
}
ajax.get = function (url, data, callback) {
  if (JSON.stringify(data) == '{}') {
    data = {1: 1}
  }
  axios.get(url + '?' + encodeUrl(data)).then(res => {
    if (res.data.IsSucceed) {
      callback(res.data.Data)
    }else {
      alert(res.data.Error)
    }
  })
}
//时间转换
ajax.gmt2strs=function(time){
  let date = new Date(time)
  return date.format('yyyy-MM-dd hh:mm:ss')
}
//时间转换
ajax.gmt2str=function(time){
  let date = new Date(time)
  return date.format('yyyy-MM-dd')
}

function encodeUrl(obj) {

  let url = '';
  (function (obj) {

    let kvArr = Object.entries(obj);
    kvArr.forEach(v => {
      if (Object.prototype.toString.call(v[1]) == '[object Object]') {

        arguments.callee(v[1]);
      } else {
        url += v.join('=') + '&'
      }
    })

  })(obj)
  return url.substring(0, url.length - 1);
}

export default ajax;
