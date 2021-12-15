<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-10 11:25:20
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-13 16:07:01
-->
<template>
  <div>
    <!-- header -->
    <nav class="navbar navbar-default navbar-fixed-top box-shadow">
      <div class="width-limit">
        <!-- logo -->
        <router-link class="logo" to="/">
          <img src="../../../assets/logo.png" />
        </router-link>
        <!-- nav-list -->
        <div class="container">
          <div class="nav-list">
            <a v-for="(item, index) in menuList"
            :key="index" 
            :href="item.path" 
            :class="{'active': currentMenuIndex === index}"
            @click="changeCurrent(index)"
              ><i class="iconfont" :class="item.icon"></i>{{item.name}}</a
            >
            <!-- <a href="/subject"><i class="iconfont icon-topic"></i>专题</a>
            <a href="/follow"><i class="iconfont icon-attention"></i>关注</a>
            <a href="/msg"><i class="iconfont icon-messages"></i>消息</a> -->
          </div>
          <!-- search-box -->
          <div class="search-box">
            <input type="text" class="search-input" placeholder="搜索" />
            <span class="btn">
              <i class="iconfont icon-search"></i>
            </span>
          </div>
        </div>

        <div class="right-btns">
          <!-- 主题切换 -->
          <el-button class="mode" type="text"
            ><i class="iconfont icon-font"></i
          ></el-button>
          <!-- 头像 -->
          <el-avatar
            class="user"
            :src="avatar"
          >
          <!-- @error="errorAvatarhandler" -->
            <img :src="errorImg" alt="" />
          </el-avatar>
          <!-- 右侧写文章按钮 -->
          <el-button type="primary" round
            ><i class="iconfont icon-yongyan"></i> 写文章</el-button
          >
        </div>
      </div>
    </nav>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      currentMenuIndex:this.$store.state.currentMenuIndex,
      menuList: [
        {
          name: '发现',
          icon: 'icon-discover',
          path: '/'
        },
        {
          name: '专题',
          icon: 'icon-topic',
          path: '/subject'
        },
        {
          name: '关注',
          icon: 'icon-attention',
          path: '/follow'
        },
        {
          name: '消息',
          icon: 'icon-messages',
          path: '/msg'
        },
      ],
      errorImg: this.$store.state.user.sex === '男'? this.$store.state.defaultAvatar.man: this.$store.state.defaultAvatar.woman,
      avatar: ''
    }
  },
  created(){
    this.avatar = this.$store.state.user.avatar
    console.log(this.$store.state.user)
  },
  methods: {
    changeCurrent(index){
      this.currentMenuIndex = index
      this.$store.commit('setCurrentMenuIndex', index)
    },
    errorAvatarhandler(){
      return true
    }
  }
}
</script>
<style lang="scss">
.flex {
  display: flex;
  width: 100%;
}
.wrapper{
  padding-top: 75px;
}

.navbar.navbar-default.navbar-fixed-top {
  position: fixed;
  width: 100%;
  height: 55px;
  border-bottom: solid 1px #f0f0f0;
  z-index: 9999;
  background-color: #fff;
  .width-limit {
    position: relative;
    width: 1156px;
    // min-width: 960px;
    margin: 0 auto;
    display: flex;
    .container {
      width: 960px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .nav-list {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 350px !important;
        a {
          flex: 1;
          font-family: -apple-system, SF UI Text, Arial, PingFang SC,
            Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
          height: 56px;
          line-height: 56px;
          color: #333;
          font-size: 17px;
          text-decoration: none;
          text-align: center;
          &:hover {
            background-color: #f0f0f0;
          }
          i {
            font-size: 22px;
            margin-right: 10px;
          }
          &.active {
            color: #409eff;
          }
        }
      }

      .search-box {
        margin-left: 40px;
        position: relative;
        height: 38px;
        border-radius: 50%;
        .search-input {
          width: 160px;
          transition: all 0.5s ease;
          background-color: #eee;
          border: solid 1px #eee;
          height: 36px;
          border-radius: 19px;
          text-indent: 15px;
          outline: none;
          &:focus {
            // border: solid ;
            width: 240px;
          }
        }
        .search-input:focus + .btn {
          background-color: rgb(129, 127, 127);
          color: #fff;
        }
        .btn {
          cursor: pointer;
          position: absolute;
          top: 5px;
          right: 5px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: transparent;
        }
      }
    }
    .right-btns {
      position: absolute;
      top: 4px;
      right: 0;
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .mode {
        cursor: pointer;
        .iconfont {
          font-size: 24px !important;
        }
      }
      .user {
        cursor: pointer;
      }
    }
  }
}
.logo{
  width: 80px;
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  img{
    width: 100%;
  }
}
</style>
