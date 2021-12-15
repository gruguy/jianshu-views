<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-14 14:15:08
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-14 19:39:29
-->
<template>
  <!-- 评论框 -->
  <div class="input-box">
    <textarea
      placeholder="写下你的评论"
      @focus="inputFocus"
      v-model="commentContent"
      @keydown="toPublish"
    ></textarea>
    <div class="publish" v-show="isfocus">
      <div class="left emoji">
        <!-- <i class="iconfont icon-smile"></i> -->
        <emoji @getEmo="getEmo"></emoji>
        <span class="">Ctrl + Enter 发表</span>
      </div>
      <div class="right btns">
        <el-button
          type="danger"
          size="mini"
          round
          :disabled="commentContent.length == 0"
          @click="publishComment"
          >发布</el-button
        >
        <el-button size="mini" round @click="inputUnFocus">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Emoji from "@/components/emoji";
export default {
  components: {
    Emoji,
  },
  props: ["isFocus", "pid"],
  watch: {
    isFocus(val) {
      console.log(val);
      this.isfocus = true;
    },
  },
  data() {
    return {
      isfocus: true,
      commentContent: "",
      detailData: {},
    };
  },
  methods: {
    /**
     * 发布回复评论
     */
    publishComment() {
      if (this.commentContent) {
        const params = {
          pid: this.pid, // 评论id
          id: Date.now(),
          avatar: this.$store.state.user.avatar,
          username: this.$store.state.user.username,
          userId: this.$store.state.user._id,
          content: this.commentContent,
        };
        this.$http({
          path: "/replyComment/add",
          method: "post",
          params,
        }).then((res) => {
          this.$notify({
            type: res.code === 200 ? "success" : "error",
            title: "提示",
            message: res.msg,
          });
          // 更新数据
          this.getCommentList(this.articleId);
          // 清空输入内容
          this.commentContent = "";
        });
      } else {
        this.$notify({
          type: "warning",
          title: "提示",
          message: "请输入评论内容",
        });
      }
    },
    // ctrl + enter 提交
    toPublish(ev) {
      let oEvent = ev || event;
      console.log(oEvent);
      if (oEvent.ctrlKey && oEvent.keyCode == 13) {
        this.publishComment();
      }
    },
    getEmo(emo) {
      this.commentContent += emo;
    },
    inputFocus() {
      this.isfocus = true;
    },
    inputUnFocus() {
      this.isfocus = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.input-box {
  flex: 1;
  margin-top: 16px;
  textarea {
    border: 1px solid #eee;
    padding: 12px 16px;
    width: 100%;
    height: 90px;
    font-size: 13px;
    border-radius: 4px;
    background-color: #fafafa;
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
    box-sizing: border-box;
  }
  .publish {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left.emoji {
      font-size: 15px;
      color: #969696;
      display: flex;
      align-items: center;
      i {
        font-size: 18px;
        margin-right: 12px;
      }
    }
    .right {
    }
  }
}
</style>
