<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:40:40
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-26 22:29:48
-->
<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要">
        <el-input
          type="textarea"
          v-model="form.summary"
          placeholder="请输入文章摘要"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item label="文章来源">
        <el-col :span="6">
          <el-radio v-model="form.stemFrom" label="原创">原创</el-radio>
          <el-radio v-model="form.stemFrom" label="转载">转载</el-radio>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publicArticle">发 布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Editor from "wangeditor";
export default {
  data() {
    return {
      form: {
        title: "",
        summary: "",
        content: "",
        stemFrom: "",
        author: this.$store.state.user.username,
        authorId: this.$store.state.user._id,
        authorAvatar: this.$store.state.user.avatar
      },
      editor: null,
    };
  },
  mounted() {
    // 创建富文本
    this.editor = new Editor("#editor");

    // 创建上传图片的接口地址
    this.editor.config.uploadImgServer =
      "http://localhost:3000/upload/editor/img";
    this.editor.config.uploadFileName = "editorFile";
    this.editor.config.uploadImgHeaders = {
      authorization: "Bearer " + localStorage.getItem("token"),
    };
    // 编写富文本高度
    this.editor.config.height = 400;
    // 设置文字提醒
    this.editor.config.placeholder = "编辑文章内容";

    this.editor.create();
  },
  methods: {
    publicArticle() {
      //获取文章内容
      let content = this.editor.txt.html();
      this.form.content = content;
      let date = new Date();
      this.$http({
        method: "post",
        path: "/article/add",
        params: {
          id: Date.now(),
          ...this.form,
        },
      }).then((res) => {
        if (res.code === 200) {
          this.$notify.success({
            title: "成功",
            message: res.msg,
          });
        } else {
          this.$notify.error({
            title: "失败",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>
<style></style>
