/*
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-02 13:21:56
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-06 11:01:15
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import httpFormData from './http/formData'

Vue.prototype.$http = http
Vue.prototype.$httpFormData = httpFormData

// 处理跨域图片转换成base64字符串
Vue.prototype.getBase64Img = function(src, callback){
  // if(params && params.url){
    
    var that = this
    var image = new Image()
    image.src = src + '?v=' + Math.random()
    image.crossOrigin = '*'
    image.onload = function(){
      var canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0,0, image.width, image.height)
      var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase()
      var dataURL = canvas.toDataURL("image/" + ext)
      callback && callback(dataURL)
      // if(params.callback){
      //   if(params.data){
      //     that[params.callback](dataURL, params.data)
      //   }else{
      //   }
      // }
      return dataURL
    }
  // }
}

/** 引入iconfont */
import './assets/icons/iconfont.css'

/*引入app.css*/
import './assets/app.scss'


/* 引入element-ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
