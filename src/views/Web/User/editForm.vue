<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-30 12:41:04
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-30 15:47:41
-->
<template>
  <div>
    <div class="userInfo-head">
      <div class="form-item">
        <h1 v-if="!nameEdit">
          <span class="username">{{ form.username }}</span>
          <el-button class="edit-btn" type="text" @click="nameEdit = true"
            ><i class="iconfont icon-pen"></i> 修改</el-button
          >
        </h1>
        <el-form
          v-if="nameEdit"
          class="el-form"
          ref="form"
          :model="form"
          label-width="140px"
          size="mini"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editSubmit('username')"
              >保存</el-button
            >
            <el-button @click="nameEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- shortDesc -->
      <div class="form-item hover-edit">
        <template v-if="!shortDescEdit">
          <h3 class="field-label">一句话介绍</h3>
          <div class="field-content">
            <span class="label-text">{{ form.shortDesc }}</span>
            <el-button
              class="edit-btn"
              type="text"
              @click="shortDescEdit = true"
              ><i class="iconfont icon-pen"></i> 修改</el-button
            >
          </div>
        </template>
        <el-form
          v-if="shortDescEdit"
          class="el-form"
          ref="form"
          :model="form"
          label-width="140px"
          size="mini"
        >
          <el-form-item label="一句话介绍">
            <el-input
              :max="15"
              v-model="form.shortDesc"
              placeholder="请输入一句话介绍"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="form.shortDesc && form.shortDesc.length > 15"
              @click="editSubmit('shortDesc')"
              >保存</el-button
            >
            <el-button @click="shortDescEdit = false">取消</el-button>

            <el-button type="text"
              ><span :class="{'danger':form.shortDesc && form.shortDesc.length>15}">{{ (form.shortDesc && form.shortDesc.length) || 0 }}</span>/15</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="form-item hover-edit">
        <template v-if="!sexEdit">
          <h3 class="field-label">性别</h3>
          <div class="field-content">
            <span class="label-text">{{ form.sex }}</span>
            <el-button class="edit-btn" type="text" @click="sexEdit = true"
              ><i class="iconfont icon-pen"></i> 修改</el-button
            >
          </div>
        </template>
        <el-form
          v-if="sexEdit"
          class="el-form"
          ref="form"
          :model="form"
          label-width="140px"
          size="mini"
        >
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
              <el-radio label="不确定">不确定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editSubmit('sex')"
              >保存</el-button
            >
            <el-button @click="sexEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- phone -->
      <div class="form-item hover-edit">
        <template v-if="!phoneEdit">
          <h3 class="field-label">手机号</h3>
          <div class="field-content">
            <span class="label-text">{{ form.phone }}</span>
            <el-button class="edit-btn" type="text" @click="phoneEdit = true"
              ><i class="iconfont icon-pen"></i> 修改</el-button
            >
          </div>
        </template>
        <el-form
          v-if="phoneEdit"
          class="el-form"
          ref="form"
          :model="form"
          label-width="140px"
          size="mini"
        >
          <el-form-item label="手机号">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editSubmit('phone')"
              >保存</el-button
            >
            <el-button @click="phoneEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- email -->
      <div class="form-item hover-edit">
        <template v-if="!emailEdit">
          <h3 class="field-label">邮箱</h3>
          <div class="field-content">
            <span class="label-text">{{ form.email }}</span>
            <el-button class="edit-btn" type="text" @click="emailEdit = true"
              ><i class="iconfont icon-pen"></i> 修改</el-button
            >
          </div>
        </template>
        <el-form
          v-if="emailEdit"
          class="el-form"
          ref="form"
          :model="form"
          label-width="140px"
          size="mini"
        >
          <el-form-item label="邮箱">
            <el-input v-model="form.desc" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editSubmit('email')"
              >保存</el-button
            >
            <el-button @click="emailEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- desc -->
      <div class="form-item hover-edit">
        <template v-if="!descEdit">
          <h3 class="field-label">个人简介</h3>
          <div class="field-content">
            <span class="label-text">{{ form.desc }}</span>
            <el-button class="edit-btn" type="text" @click="descEdit = true"
              ><i class="iconfont icon-pen"></i> 修改</el-button
            >
          </div>
        </template>
        <el-form
          v-if="descEdit"
          class="el-form"
          ref="form"
          :model="form"
          label-width="140px"
          size="mini"
        >
          <el-form-item label="个人简介">
            <el-input
              type="textarea"
              :resize="false"
              v-model="form.desc"
              placeholder="请输入个人简介"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editSubmit('desc')"
              >保存</el-button
            >
            <el-button @click="descEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameEdit: false,
      sexEdit: false,
      phoneEdit: false,
      emailEdit: false,
      descEdit: false,
      shortDescEdit: false,
      form: {},
    };
  },
  created() {
    const userInfo = this.$store.state.user;
    this.form = {
      username: userInfo.username,
      shortDesc: userInfo.shortDesc,
      sex: userInfo.sex,
      phone: userInfo.phone,
      email: userInfo.email,
      desc: userInfo.desc,
    };
    console.log(this.$store.state.user);
  },
  methods: {
    editSubmit(key) {
      if (!this.form[key]) {
        this.$message.error("请输入要改的内容");
        return;
      }
      this.$http({
        path: '/users/update/personal',
        method: 'post',
        params: {
          _id: this.$store.state.user._id,
          [key]:this.form[key]
        }
      }).then(res => {
        let type = res.code === 200?'success':'error'
        this.$message[type](res.msg)
        if(type ==='success'){
          this[`${key}Edit`] = false;
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.userInfo-head {
  padding-bottom: 100px;
  h1 {
    margin: 0 0 20px;
    font-size: 24px;
    span.headline {
      margin-left: 30px;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
.edit-btn {
  font-size: 15px;
  margin-left: 15px;
  color: #175199;
  padding: 0;
  .iconfont {
    font-size: 18px;
  }
}
.form-item {
  // width: 420px;
  padding: 30px 0;
  border-bottom: 1px solid #ebebeb;
  transition: opacity 0.4s step-end;
  &.hover-edit {
    .edit-btn {
      opacity: 0;
    }
    &:hover {
      .edit-btn {
        opacity: 1;
      }
    }
  }
  .el-input {
    width: 280px;
  }
  .field-label {
    position: absolute;
    width: 140px;
    font-size: 15px;
    margin-top: 0;
    color: #606266;
  }
  .field-content {
    padding-left: 140px;
  }
}

.el-form {
  ::v-deep .el-form-item__label {
    text-align: left;
    font-weight: bold;
  }
}
.danger{
  color: #f00;
}
</style>
