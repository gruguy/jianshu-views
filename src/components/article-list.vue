<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-23 15:27:10
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-14 15:09:22
-->
<template>
  <ul class="note-list">
    <li
      class="padding-left padding-top padding-bottom padding-right"
      v-for="(item, index) in datalist"
      :key="index"
    >
      <div class="userInfo">
        <a :href="`/u/${item.user[0].username}`">
          <div class="avatar avatar-xs">
            <img :src="item.user[0].avatar" alt="" />
          </div>
          <div class="username">
            {{ item.user[0].username }}
          </div>
        </a>
        <div class="userInfo-content" v-if="item.user[0].shortDesc">
          ，{{ item.user[0].shortDesc }}
        </div>
      </div>
      <div class="articleInfo">
        <a
          class="title"
          @click="toArticleDetail(item.id)"
          href="javascript:;"
          >{{ item.title }}</a
        >
        <div>
          <span class="abstract">
            {{ despiteTag(item.contentMeta) }}
            <el-button type="text">阅读全文</el-button>
          </span>
        </div>
        <div class="meta">
          <!-- <a href="#" class="nickname" v-if="showAuthor">{{
            item.user[0].username
          }}</a> -->
          <el-button class="text-btn" type="text"
            ><i class="iconfont icon-comment-filling"></i>
            {{ item.comment }}条评论</el-button
          >
          <el-button class="text-btn" type="text"
            ><i class="iconfont icon-read"></i> {{ item.read }}次阅读</el-button
          >
          <el-button class="text-btn" type="text"
            ><i class="iconfont icon-heart"></i>
            {{ item.star }}个喜欢</el-button
          >
          <el-button class="text-btn" type="text"
            ><i class="iconfont icon-collection-fill"></i> 收藏</el-button
          >
          <el-button class="text-btn" type="text"
            ><i class="iconfont icon-warning"></i> 举报</el-button
          >
          <el-button
            class="text-btn"
            type="text"
            v-if="item.showAll"
            style="margin-left: auto"
            >收起
            <i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["datalist", "showAuthor"],
  data() {
    return {};
  },
  created() {
    this.datalist.forEach((item) => {
      item.showAll = false;
    });
  },
  methods: {
    despiteTag(content) {
      // 先截取字符串，再删除标签
      let cont = content + "...";
      return (cont = cont.replace(/<[^>]+>/g, " "));
    },
    /**
     * 设置一个列表摘要
     */
    toArticleDetail(id) {
      let routeUrl = this.$router.resolve({
        path: `/authorArticleDetail/${id}`,
      });
      window.open(routeUrl.location.path, "_blank");
    },
  },
};
</script>
<style lang="scss">
.note-list {
  list-style-type: none;
  padding-left: 0;
  li {
    padding-bottom: 12px;
    &:not(:last-child) {
      border-bottom: solid 1px #eee;
    }
    a {
      text-decoration: none;
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
    .title {
      font-family: -apple-system, SF UI Display, Arial, PingFang SC,
        Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      margin: -7px 0 4px;
      display: inherit;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
    .abstract {
      margin: 0 0 8px;
      font-size: 13px;
      line-height: 24px;
    }
    .meta {
      display: flex;
      padding-right: 0 !important;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      a {
        margin-right: 20px;
        color: #b4b4b4;
      }
      span {
        display: flex;
        align-items: center;
        margin-right: 20px;
        color: #8590a6;
        .iconfont {
          font-size: 20px;
          margin-right: 2px;
          vertical-align: middle;
        }
      }
    }
  }
}
.userInfo {
  margin-bottom: 10px;
  display: flex;
  a {
    display: flex;
    align-items: center;
    font-size: 12px;
    .username {
      margin-left: 14px;
      font-weight: 600;
    }
  }
  .userInfo-content {
    flex: 1;
    font-size: 12px;
    margin-left: 10px;
  }
}
.text-btn {
  padding: 0;
  margin-right: 15px;
  span {
    display: inline-block !important;
    margin-right: 0 !important;
  }
}
</style>
