<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-12-13 23:19:10
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-13 23:32:34
-->
<template>
  <el-dialog
    title="添加收藏"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <!-- 收藏列表和创建收藏按钮 -->
    <div class="collect-wrapper">
      <div class="collect-list"></div>
      <div class="new-collection">
        <el-button type="info">创建收藏夹</el-button>
      </div>
    </div>
    <!-- 创建收藏form -->
    <div class="add-collection-form">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="收藏标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" resize="none" v-model="form.desc" placeholder="收藏描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="form.isPrivate">
            <el-radio label="私密"><span class="tips">只有你自己可以查看这个收藏夹</span></el-radio>
            <el-radio label="公开"><span class="tips">有其他人关注此收藏夹时不可设置为私密</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        desc: '',
        isPrivate: false
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
