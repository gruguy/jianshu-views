<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-10 11:13:13
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-14 14:29:55
-->
<template>
  <div class="flex">
    <div class="main">
      <div class="panel-box">
        <!-- 文章详情 -->
        <h1 class="title">{{ detailData.title }}</h1>
        <div class="panel-box-section">
          <div class="meta">
            <a class="avatar" :href="'/u/' + detailData.user[0].username">
              <img :src="detailData.user[0].avatar" alt="" />
            </a>
            <div class="info">
              <div class="author">
                {{ detailData.user[0].username }}
                <el-button
                  v-if="userId !== detailData.user[0]._id"
                  size="mini"
                  type="warning"
                  plain
                  round
                  :loading="followLoading"
                  @click="toggleFollow"
                  @mouseenter.native="showUnfollowText"
                  @mouseleave.native="showFollowText"
                  :disabled="followLoading"
                  style="width: 100px"
                  >{{ followText }}</el-button
                >
              </div>
              <div class="datas">
                <span class="time">
                  {{ formatDateTime(detailData.createTime) }}
                </span>
                <span>阅读 {{ detailData.read }}</span>
                <span>字数 {{ detailData.read }}</span>
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="content" v-html="detailData.content"></div>
        </div>
      </div>
      <!-- 评论框 -->
      <div class="panel-box margin-top comment-box">
        <div class="inner-wrapper panel-box-section">
          <div class="avatar avatar-round avatar-small">
            <img :src="avatar" alt="" />
          </div>
          <div class="input-box padding-left">
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
                <el-button size="mini" round @click="inputUnFocus"
                  >取消</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论列表 -->
      <div class="panel-box margin-top comment-list">
        <!-- 精彩评论 -->
        <div class="panel-box-section">
          <template v-if="wonderfulComments && wonderfulComments.length">
            
          <h3>精彩评论</h3>
          <comment-list :dataList="wonderfulComments"></comment-list>
          </template>

          <template v-if="commentDataList && commentDataList.length">
          <!-- 所有评论 -->
          <h3>所有评论</h3>
          <comment-list :dataList="commentDataList"></comment-list>
          </template>
        </div>
      </div>
    </div>
    <div class="aside">
      <!-- 作者信息 -->
      <div class="panel-box">
        <div class="panel-box-header">
          <div class="panel-box-headerText">关于作者</div>
        </div>
        <div class="panel-box-section">
          <div class="overflow-hidden">
            <div class="meta">
              <user-avatar
                :userInfo="detailData.user[0]"
                avatarSize="avatar-large"
              ></user-avatar>
            </div>
          </div>
          <!-- calcution -->
          <div class="calcution">
            <div class="calcution-counts">
              <a href="#">
                <div class="calcution-itemInner">
                  <div class="calcution-itemName">文章</div>
                  <div class="calcution-itemValue">{{detailData.user[0].counts}}</div> 
                </div>
              </a>
              <a href="#">
                <div class="calcution-itemInner">
                  <div class="calcution-itemName">喜欢</div>
                  <div class="calcution-itemValue">{{detailData.user[0].stars}}</div>
                </div>
              </a>
              <a href="#">
                <div class="calcution-itemInner">
                  <div class="calcution-itemName">关注者</div>
                  <div class="calcution-itemValue">{{detailData.user[0].fans}}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="panel-box author-article-list"
        v-if="mostReadList && mostReadList.length"
      >
        <div class="panel-box-header">
          <div class="panel-box-headerText">热门文章</div>
        </div>
        <div class="panel-box-section">
          <div class="item" v-for="(item, index) in mostReadList" :key="index">
            <a
              :href="`/authorArticleDetail/${item.id}}`"
              target="_blank"
              :title="item.title"
              >{{ item.summary }}</a
            >
            <div class="read">阅读：{{ item.read }}</div>
          </div>
        </div>
      </div>
    </div>
    <fixed-handle-bar
      v-if="detailData._id"
      :star="detailData.star"
      :username="username"
      :articleId="articleId"
    ></fixed-handle-bar>
  </div>
</template>
<script>
import Emoji from "@/components/emoji";
import commentList from "@/components/comment-list";
import FixedHandleBar from "@/components/fixedHandleBar";
import UserAvatar from "../../../components/user-avatar.vue";
export default {
  components: { Emoji, commentList, FixedHandleBar, UserAvatar },
  data() {
    return {
      isfocus: false,
      commentContent: "",
      userId: this.$store.state.user._id,
      username: this.$store.state.user.username,
      detailData: {},
      followLoading: false,
      isFollowing: false,
      followText: "关注",
      followingList: [],
      avatar: "",
      articleId: 0,
      wonderfulComments: [],
      commentDataList: [],
      mostReadList: [],
    };
  },
  async created() {
    this.articleId = parseInt(this.$route.params.id);
    await this.getDetailData(this.articleId);
    this.avatar = this.$store.state.user.avatar;
    this.getCommentList(this.articleId);
  },
  methods: {
    formatDateTime(str){
      const datetime = new Date(str)
      const year = datetime.getFullYear(),
            month = datetime.getMonth() + 1,
            date = datetime.getDate(),
            hour = datetime.getHours(),
            minute = datetime.getMinutes()
            
      return `${year}-${month}-${date} ${hour}:${minute}`
        
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
    /**
     * 关注与取消关注
     */
    toggleFollow() {
      if (!this.isFollowing) {
        // 去关注
        this.followLoading = true;
        this.followText = "";
        this.$http({
          path: "/fans/follow",
          method: "post",
          params: {
            authorId: this.detailData.user[0]._id,
            author: this.detailData.user[0].username,
            username: this.$store.state.user.username,
            userId: this.$store.state.user._id,
          },
        }).then((res) => {
          if (res.code === 200) {
            this.isFollowing = true;
            this.$notify.success({
              message: "关注成功",
            });
            this.followText = "已关注";
          } else {
            this.$notify.success({
              message: "关注失败",
            });
            this.followText = "关注";
          }
          this.followLoading = false;
        });
      } else {
        // 取消关注
        this.followLoading = true;
        this.followText = "";
        this.$http({
          path: "/fans/unfollow",
          method: "post",
          params: {
            authorId: this.detailData.user[0]._id,
            author: this.detailData.user[0].username,
            username: this.$store.state.user.username,
            userId: this.$store.state.user._id,
          },
        }).then((res) => {
          this.followLoading = false;
          if (res.code === 200) {
            this.isFollowing = false;
            this.$notify.success({
              message: "取消关注成功",
            });
            this.followText = "关注";
          } else {
            this.$notify.success({
              message: "取消关注失败",
            });
            this.followText = "已关注";
          }
        });
      }
    },
    /**
     * 获取用户信息
     */
    async getAuthorInfo(authorId) {
      this.$http({
        path: "/users/info/personal",
        method: "get",
        params: {
          id: authorId,
        },
      }).then((res) => {
        //
        this.authorInfo = res.data;
      });
    },
    async getMostRead(author, articleId, num) {
      this.$http({
        path: "/article/findMostRead",
        method: "get",
        params: {
          author,
          articleId,
          num,
        },
      }).then((res) => {
        if (res.code === 200) {
          this.mostReadList = res.result;
        }
      });
    },
    /**
     * 获取文章详情
     */
    async getDetailData(id) {
      this.$http({
        path: "/article/findOne",
        method: "get",
        params: {
          id,
        },
      }).then(async (res) => {
        this.detailData = res.result[0];
        this.getAuthorInfo(this.detailData.user[0]._id);
        this.getFollowingList();

        // 获取作者最热文章
        console.log(this.detailData);
        await this.getMostRead(
          this.detailData.user[0].username,
          this.detailData.id,
          5
        );
      });
    },
    // 获取关注列表
    getFollowingList() {
      this.$http({
        path: "/fans/following",
        method: "get",
        params: {
          page: 1,
          userId: this.$store.state.user._id,
        },
      }).then((res) => {
        this.followingList = res.result;
        if (!this.followingList.length) {
          this.isFollowing = false;
        } else {
          this.followingList.forEach((item) => {
            console.log(item.aid);
            console.log(this.detailData.authorId);
            if (item.aid === this.detailData.user[0]._id) {
              this.isFollowing = true;
            }
          });
        }
        if (this.isFollowing) {
          this.followText = "已关注";
        } else {
          this.followText = "关注";
        }
      });
    },
    showUnfollowText() {
      if (this.isFollowing) {
        this.followText = "取消关注";
      }
    },
    showFollowText() {
      if (this.isFollowing) {
        this.followText = "已关注";
      } else {
        this.followText = "关注";
      }
    },
    /**
     * 发布评论
     */
    publishComment() {
      if (this.commentContent) {
        const params = {
          id: Date.now(),
          authorId: this.detailData.user[0]._id,
          author: this.detailData.user[0].username,
          avatar: this.$store.state.user.avatar,
          username: this.$store.state.user.username,
          userId: this.$store.state.user._id,
          articleId: this.detailData.id,
          articleTitle: this.detailData.title,
          content: this.commentContent,
        };
        this.$http({
          path: "/comment/add",
          method: "post",
          params,
        })
          .then((res) => {
            console.log(res);
            this.$notify({
              type: res.code === 200 ? "success" : "error",
              title: "提示",
              message: res.msg,
            });
            // 更新数据
            this.getCommentList(this.articleId);
            // 清空输入内容
            this.commentContent = "";
          })
          .catch((err) => {
            ctx.body = {
              code: 500,
              err,
            };
          });
      } else {
        this.$notify({
          type: "warning",
          title: "提示",
          message: "请输入评论内容",
        });
      }
    },
    // 获取评论列表
    getCommentList(id) {
      this.$http({
        path: "/comment/web/find",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        this.commentDataList = res.result;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  background-color: #f0f0f0;
}
.meta {
  display: flex;
  .info {
    flex: 1;
    margin-left: 10px;
    .author {
      font-size: 16px;
      font-weight: 500;
      margin-right: 8px;
    }

    .datas {
      display: flex;
      & > :not(:last-child) {
        margin-right: 10px;
      }
      span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #969696;
      }
    }
  }
}
.content {
  padding: 10px;
}
.comment-box {
  .inner-wrapper {
    display: flex;
    // .avatar {
    //   width: 40px;
    //   height: 40px;
    //   border-radius: 50%;
    //   margin-right: 10px;
    // }
    .input-box {
      flex: 1;
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
      }
    }
  }
}
.margin-top {
  margin-top: 20px;
}
.author-article-list {
  .item {
    &:not(:first-child) {
      margin-top: 16px;
    }
    a {
      color: #4e5969;
      display: block;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      &:hover {
        text-decoration: underline;
        color: #2d2d2d;
      }
    }
    .read {
      font-size: 12px;
      color: #969696;
    }
  }
}

.calcution {
  padding: 36px 0 16px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 20px;
    border-top: solid 1px #f6f6f6;
    width: 100%;
  }
  .calcution-counts {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
      .calcution-itemInner {
        text-align: center;
        line-height: 1.6;
        .calcution-itemName {
          font-size: 14px;
          color: #8590a6;
        }
        .calcution-itemValue {
          font-size: 18px;
          color: #121212;
          font-weight: 600;
          font-synthesis: style;
        }
      }
    }
  }
}
</style>
