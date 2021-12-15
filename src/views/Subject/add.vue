<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-25 14:42:32
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-25 17:37:49
-->
<template>
  <div>
    <el-dialog
      title="新增主题"
      :visible.sync="visible"
      width="40%"
      :before-close="closeDialog">
      
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="主题名称" prop="sname">
          <el-input v-model="form.sname"></el-input>
        </el-form-item>
        <el-form-item label="主题描述" prop="description">
          <el-input v-model="form.description" placeholder="请选择活动区域"></el-input>
        </el-form-item>
        <el-form-item label="主题图" required>
           <div class="avatar-div">
            <img v-show="form.bannerUrl" :src="form.bannerUrl" class="small-img">
            <el-upload 
            :action="uploadUrl"
            name="myfile"
            :headers="uploadHeader"
            :on-success="onSuccess"
            >
            <el-button type="">上传</el-button> 
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['visible'],
  data(){
    return {
      dialogVisible: false,
      uploadUrl: 'http://localhost:3000/upload/img',
      uploadHeader: {
        authorization: "Bearer " + localStorage.getItem('token')
      },
      form: {
        sname: '',
        description: '',
        bannerUrl:''
      },
      rules: {
         sname: [
            { required: true, message: '请输入主题名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入主题描述', trigger: 'blur' }
          ],
      }
    }
  },
  mounted(){
    // this.dialogVisible = this.visible
  },
  methods: {
    onSuccess(res) {
      this.form.bannerUrl = res.data
    },
    confirmAdd(){
      if(!this.form.bannerUrl){
        this.$notify.error({
          title: '提示',
          message: '请上传主题图片'
        })
        return
      }
       this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$http({
              path: '/subjects/add',
              method: 'post',
              params: this.form
            }).then(res => {
              this.$notify[res.code == 200 ?'success':'error']({
                title: '提示',
                message: res.msg
              })
              this.$emit('toggleDialog', false)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    closeDialog(){
      this.$emit('toggleDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
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
