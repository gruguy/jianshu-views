/*
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-02 13:21:56
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-07 15:18:59
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultAvatar: {
      man: 'https://static01.imgkr.com/temp/c933a9c8e0294d22a1f71d8a882c4ce3.png',
      woman: 'https://static01.imgkr.com/temp/4f8b747fc8fa400bac0630180e1e713d.png'
    },
    user:{
      username: ''
    },
    currentMenuIndex: 0
  },
  mutations: {
    setUserName(state, user){
      state.user = user
    },
    setCurrentMenuIndex(state, index){
      state.currentMenuIndex = index
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
