/*
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-02 16:44:18
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-29 14:59:14
 */
import axios from 'axios'
import $router from '../router'
import {Message, MessageBox} from 'element-ui'

let instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(config => {
  console.log('config', config)
  // 请求拦截配置
  // 设置请求头Authorization
  const token = localStorage.getItem('token')
  config.headers.Authorization = 'Bearer ' + token
  // if(config.isFormData){
  //   config.headers.ContentType = 'application/x-www-form-urlencoded'
  //   axios.defaults.transformRequest = [function (data) {
  //     let ret = ''
  //     for (let it in data) {
  //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //     }
  //     return ret
  // }]
  // }
  return config 
  
}, (err) => {
  console.error('请求失败', err);
})

// 响应拦截
instance.interceptors.response.use(res => {
  // 响应拦截配置
  return res
}, err => {
  console.log(err);
  
  if(err.response.status === 401){
    // 没有权限或登录过期
    console.log(localStorage.getItem('isLogout'));
    
    if(!localStorage.getItem('isLogout')){
      localStorage.setItem('isLogout', true)
      MessageBox.confirm('登录已过期，请重新登录', '提示', {
        confirmButtonText: '确定',
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        localStorage.clear();//清除所有缓存
        $router.push({path: '/login'})
      })
    }
  }
  console.error('响应失败', err);
})

/**
 *  封装http请求方法
 * @params {*} option 配置对象，属性包括：
 * method 请求方式
 * path 请求接口地址
 * params 请求参数
 */
async function http(option = {}){
  let result = null
  // 判断form提交
  if(option.isFormData){
    
  }
  if(option.method === 'get' || option.method === 'delete'){
    await instance[option.method](
      option.path,
      {
        params: option.params
      }
    ).then(res => {
      result = res.data
    }).catch(err => {
      result = err
    })
  }else if(option.method === 'post' || option.method === 'put'){
    await instance[option.method](
      option.path,
      option.params
    ).then(res => {
      result = res.data
    }).catch(err => {
      result = err
    })
  }
  return result
}



export default http
