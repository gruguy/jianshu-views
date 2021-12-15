<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:37:39
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-26 14:57:46
-->
<template>
  <el-container class="">
    <el-header>
      <div class="sys-title">后台管理系统</div>
      <div class="header-right">
        <span><router-link to="/" target="_blank">网站首页</router-link></span>
        <span><router-link to="/admin/">个人首页</router-link></span>
        <span>
          <el-avatar size="small" :src="user.avatar" @error="errorAvatar">
            <img :src="errorImg">
          </el-avatar>
        </span>
        <span>{{user.username}}</span>
        <span @click="logout">退出</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu 
          default-active="/admin/users/personal"
          @open="handleOpen"
          @close="handleClose"
          @select="selectMenu"
          router
        >
          <el-submenu index="/admin/users">
              <template #title>
                <span><i class="el-icon-user"></i>个人中心</span>
              </template>
              <el-menu-item index="/admin/users/personal">个人资料</el-menu-item>
              <el-menu-item index="/admin/users/password">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="/admin/article">
            <template #title>
              <span><i class="el-icon-reading"></i>文章管理</span>
            </template>
            <el-menu-item index="/admin/article/add">发布文章</el-menu-item>
            <el-menu-item index="/admin/article">文章列表</el-menu-item></el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/subject">
            <template #title>
              <span><i class="el-icon-guide"></i>专题管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/comment">
            <template #title>
              <span><i class="el-icon-chat-dot-square"></i>评论管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/fans">
            <template #title>
              <span><i class="el-icon-magic-stick"></i>粉丝管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/star">
            <template #title>
              <span><i class="el-icon-thumb"></i>点赞管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data(){
      return {
        user: {
          avatar: '',
          sex: '男'
        },
        errorImg: this.$store.state.user.sex === '男'? this.$store.state.defaultAvatar.man: this.$store.state.defaultAvatar.woman
        
      }
    },
    created(){
      if(!this.$store.state.user){
        // 跳转登录
        this.$router.push({
          name: 'Login'
        })
      }else{
        this.getUserInfo()
      }
    },
    methods: {
      errorAvatar(e){
        return true
      },
      selectMenu(key){
        console.log(key)
      },
      handleOpen(key, keyPath){
        console.log(key)
      },
      handleClose(key, keyPath){
        
      },
      getUserInfo(){
        this.$http({
          path: '/users/info/personal',
          method: 'get',
          params: {
            id: this.$store.state.user._id
          }
        }).then(res => {
          this.user = res.data
          this.$store.commit('setUserName', this.user)
        })
      },
      logout(){
         this.$confirm('确认退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除token，跳转登录，然后http response 拦截路由到登录页
          localStorage.removeItem('token')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          this.$router.replace({
            name: 'Login'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .el-container{
    height: 100%;
  }
  .el-header{
    color: #fff;
    background-color: #545d63;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-header .sys-title{
    font-weight: bold;
    line-height: 60px;
    font-size: 22px;
  }
  .el-header .header-right{
    float: right;
    display: flex;
    align-items: center;
  }
  .el-header .header-right span{
    font-size: 14px;
    margin: 0 10px;
    cursor: pointer;
  }
  .el-header .header-right span a, .el-header .header-right span a:visited{
    font-size: 14px;
    color: #fff;
    text-decoration: none;
  }
  .el-aside{
    color: #fff;
    background-color: #545d63;
    overflow: hidden;
  }
  .el-menu{
    color: #fff;
    background-color: #545d63
  }
  /deep/  .el-menu .el-submenu__title, .el-menu-item{
    color: #fff;
    background-color:#545d63;
  }
  .el-menu-item:hover,.el-menu-item.is-active{
    background-color: #3c4144;
  }
  .el-main{
    background-color:#fff;
  }
</style>
