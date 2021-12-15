<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-12-06 12:10:16
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-14 15:59:07
-->
<template>
  <div class="wrappers">
    <div class="list-header">
      <div class="list-header-text">{{isSelf?'我': authorname}} 的文章</div>
      <div class="sorts">
        <el-popover ref="sortBy" placement="bottom" trigger="click">
          <div class="popover-list" @click="selectSortType">
            <div class="popover-list-item">按时间排序</div>
            <div class="popover-list-item">赞同数排序</div>
          </div>
          <el-link slot="reference"
            >{{ sortType }} <i class="iconfont icon-updown"></i
          ></el-link>
        </el-popover>
      </div>
    </div>
    <div class="list" v-if="datalist && datalist.length">
      <div class="list-item" v-for="item in datalist" :key="item.id">
        <h2 class="list-item-title">
          <a :href="`/authorArticleDetail/${item.id}}`" target="_blank"> {{ item.title }}</a>
        </h2>
        <user-avatar class="margin-top" :userInfo="item.user[0]" avatarSize="avatar-small"></user-avatar>
        <!-- content -->
        <div class="content">
          <!-- 简短展示内容，去掉标签 -->
          <span v-if="!item.showAll"
            >{{ despiteTag(item.contentMeta) }}...
            <el-button type="text" @click="showAll(item)">阅读全文</el-button>
          </span>
          <template v-if="item.showAll">
            <div v-html="item.content"></div>
            <el-button type="text" @click="showShort(item)">收起</el-button>
          </template>
          <!-- 点击阅读全文，展示所有内容 以及收起按钮 -->
        </div>
      </div>
    </div>
    <div v-else>
      <empty></empty>
    </div>
  </div>
</template>
<script>
import Empty from "@/components/empty.vue";
import userAvatar from "@/components/user-avatar.vue"
export default {
  components: {
    Empty,
    userAvatar
  },
  data() {
    return {
      isSelf: false,
      authorname: '',
      sortType: "按时间排序",
      datalist: [],
    };
  },
  created() {
    const username = this.$route.params.username;
    console.log(username, this.$store.state.user.username)
    this.isSelf = username === this.$store.state.user.username
    this.authorname = username
    this.getArticleList(username);
  },
  methods: {
    despiteTag(content) {
      // 先截取字符串，再删除标签
      let cont = content + "...";
      return (cont = cont.replace(/<[^>]+>/g, " "));
    },
    showAll(data) {
      data.showAll = true;
      console.log(data);
    },
    showShort(data) {
      data.showAll = false;
    },
    selectSortType(e) {
      this.sortType = e.target.outerText;
      this.$refs.sortBy.doClose();
    },
    getArticleList(username) {
      this.$http({
        path: "/article/findAll",
        method: "get",
        params: {
          author: username,
        },
      }).then((res) => {
        res.result.forEach((item) => {
          item.showAll = false;
        });
        console.log(this.datalist);
        this.datalist = res.result;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin: 0 20px;
  border-bottom: 1px solid #f6f6f6;
  height: 50px;
  .list-header-text {
    font-weight: 600;
    font-synthesis: style;
    font-size: 15px;
  }
}
.wrappers {
  .list {
    .list-item {
      padding: 15px 0;
      border-bottom: 1px solid #f6f6f6;
      .list-item-title {
        margin-top: -4px;
        margin-bottom: -4px;
      }
    }
  }
}
>>> .el-popover {
  padding: 0;
}
.popover-list {
  .popover-list-item {
    cursor: pointer;
    line-height: 40px;
    &:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>
