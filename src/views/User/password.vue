<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:39:57
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-09 17:36:50
-->
<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="旧密码">
        <el-col :span="6">
          <el-input
            type="password"
            placeholder="请输入旧密码"
            v-model="form.oldPwd"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="新密码">
        <el-col :span="6">
          <el-input
            type="password"
            placeholder="请输入新密码"
            v-model="form.newPwd"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-col :span="6">
          <el-input
            type="password"
            placeholder="再次输入密码"
            v-model="form.newComparePwd"
          ></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round @click="updateInfo">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        newComparePwd: "",
      },
    };
  },
  methods: {
    async updateInfo() {
      if (!this.form.oldPwd || !this.form.newPwd || !this.form.newComparePwd) {
        this.$notify({
          title: "提示",
          message: "密码不能为空",
          type: "warning",
        });
        return;
      }
      if (this.form.newPwd !== this.form.newComparePwd) {
        this.$notify({
          title: "提示",
          message: "两次密码不一致",
          type: "warning",
        });
        return;
      }
      // 验证旧密码是否正确
      const isPass = await this.isPwdRight();
      console.log(isPass);
      if (isPass) {
        // 去修改密码
        this.$http({
          path: "/users/update/pwd",
          method: "post",
          params: {
            username: this.$store.state.user.username,
            pwd: this.form.newPwd,
          },
        }).then((res) => {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: res.code === 200 ? "success" : "error",
          });
        });
      }
    },
    async isPwdRight() {
      this.$http({
        path: "/users/validate/pwd",
        method: "post",
        params: {
          username: this.$store.state.user.username,
          pwd: this.form.oldPwd,
        },
      }).then((res) => {
        let hasPass = false;
        if (res.data) {
          // 验证成功
          hasPass = true;
        } else {
          // 验证失败
          this.$notify({
            title: "提示",
            message: "旧密码不正确，请输入正确的密码",
            type: "error",
          });
          hasPass = false;
        }
        return hasPass;
      });
    },
  },
};
</script>
<style></style>
