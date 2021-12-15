<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:39:40
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-13 15:04:50
-->
<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="头像">
        <div class="avatar-div">
          <img v-show="form.avatar" :src="form.avatar" class="small-img">
          <el-upload 
          action="http://localhost:3000/upload/img"
          name="myfile"
          :headers="uploadHeader"
          :on-success="onSuccess"
          >
          <el-button type="">上传</el-button> 
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="用户名">
        <el-col :span="6">
          <el-input placeholder="请输入用户名" v-model="form.username" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-col :span="6">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="保密">保密</el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-col :span="6">
          <el-input type="textarea" rows="3"  placeholder="请输入个人简介" v-model="form.desc"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号">
        <el-col :span="6">
          <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-col :span="6">
          <el-input placeholder="请输入电子邮件" v-model="form.email"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="updateInfo">更 新</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
  export default {
    data(){
      return {
        uploadHeader: {
          authorization: "Bearer " + localStorage.getItem('token')
        },
        form: {
          _id: '',
          sex: '',
          avatar: '',
          desc: '',
          phone: '',
          email: ''
        }
      }
    },
    created(){
      console.log(this.$store.state)
      this.form = this.$store.state.user
    },
    methods: {
      onSuccess(res) {
        console.log(res)
        this.form.avatar = res.data
      },
      getUserInfo(id){
        this.$http({
          method: 'get', 
          path: '/users/info/personal',
          params: {
            id: this.form._id
          }
        }).then(res => {
          if(res.code === 200){
            this.form = res.data
          }
        })
      },
      updateInfo(){
        this.$http({
          method: 'post',
          path: '/users/update/personal',
          params: this.form
        }).then(res => {
          if(res.code === 200){
            this.$notify.success({
              title: '成功',
              message: res.msg
            })
          }
          if(res.code === 300){
             this.$notify.error({
              title: '失败',
              message: res.msg
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .small-img{
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .avatar-div{
    display: flex;
    align-items: center;
  }
  
</style>
