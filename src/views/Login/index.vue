<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:36:43
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-13 15:04:53
-->
<template>
  <div class="login-wrapper">
    <el-card>
       <div class="login-title">简书后台管理系统</div> 
       <el-form>
         <el-form-item>
           <el-input type="text" v-model="user.username" placeholder="请输入用户名"></el-input>
         </el-form-item>
         <el-form-item>
           <el-input type="password" v-model="user.pwd" placeholder="请输入密码"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="login">登录</el-button>
           <el-button type="text" @click="toReg">没有账号？马上注册！</el-button>
         </el-form-item>
       </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        user: {
          username: '',
          pwd: '',
          _id: ''
        }
      }
    },
    methods: {
      login(){
        if(!this.user.username){
          this.$notify({
              title: '警告',
              message: '请输入用户名',
              type: 'waring'
            });
            return
        }
         if(!this.user.pwd){
          this.$notify({
              title: '警告',
              message: '请输入用户密码',
              type: 'waring'
            });
            return
        }
        this.$http({
          method: 'post',
          path: '/users/login', 
          params: this.user
        }).then(res => {
          console.log(res)
          console.log(res.code)
          if(res.code === 200){
            this.$notify({
              title: '登录成功',
              message: res.msg,
              type: 'success'
            });
            this.user._id = res.userId
            this.$store.commit('setUserName', this.user)
            // 跳转到admin
            localStorage.setItem('token', res.token)
            const redirect = decodeURIComponent(this.$route.query.redirect || '/admin')
            this.$router.push({path: redirect})
          }else{
            this.$notify({
              title: '登录失败',
              message: res.msg,
              type: 'error'
            });
          }
          
        })
      }, 
      getUserInfo(){
        this.$http({
          method: 'get',
          path: '/users/personal',
        })
      },
      toReg(){
        // 跳转注册
        this.$router.push({
          name: 'Reg'
        })
      }
    }
  }
</script>
<style scoped>
  .login-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(-45deg, #4a195b 20%, #b52986 0, #b52986 40%, #fd648d 0, #fd648d 60%, #faa776 0, #faa776 80%, #ead388 0);
  }
  .login-title{
    text-align: center;
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 20px;
  }
  .el-card{
    width: 350px;
  }
</style>

