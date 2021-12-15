<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:36:43
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-09 14:29:36
-->
<template>
  <div class="login-wrapper">
    <el-card>
       <div class="login-title">后台管理系统-注册</div> 
       <el-form>
         <el-form-item>
           <el-input type="text" v-model="user.username" placeholder="请输入用户名"></el-input>
         </el-form-item>
         <el-form-item>
           <el-input type="password" v-model="user.pwd" placeholder="请输入密码"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="reg">注册</el-button>
           <el-button type="text" @click="toLoginPage">已有帐号？去登录</el-button>
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
      reg(){
        if(!this.user.username){
          this.$notify({
              title: '警告',
              message: '用户名不能为空',
              type: 'warning'
            });
            return 
        }
         if(!this.user.pwd){
          this.$notify({
              title: '警告',
              message: '密码不能为空',
              type: 'warning'
            });
            return 
        }
        this.$http({
          method: 'post',
          path: '/users/reg', 
          params: this.user
        }).then(res => {
          console.log(res)
          console.log(res.code)
          if(res.code === 200){
            this.$notify({
              title: '注册成功',
              message: res.msg,
              type: 'success'
            });
            // 跳转登录
            this.$router.push({
              name: 'Login'
            })
          }
           if(res.code === 300){
            this.$notify({
              title: '注册失败',
              message: res.msg,
              type: 'error'
            });
          }
        })
      }, 
      toLoginPage(){
        this.$router.push({
          name: 'Login'
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
    background-image: linear-gradient(45deg, #4a195b 20%, #b52986 0, #b52986 40%, #fd648d 0, #fd648d 60%, #faa776 0, #faa776 80%, #ead388 0);
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

