<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 17:12:41
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-11 23:50:36
-->
<template>
  <div class="index">
    <!-- 聚合首页 -->
    <div class="main panel-box">
      <template v-if="isloading">
        <placeholder-list-item></placeholder-list-item>
      </template>
      <template v-else>
        <div class="tabs padding-left">
          <tab-header :typelist="typelist"></tab-header>
        </div>
        <article-list :datalist="datalist" :showAuthor="true"></article-list>
      </template>
    </div>
    <div class="aside panel-box">
      <!-- 专栏 -->

      <!-- 热门作者 -->
    </div>
  </div>
</template>
<script>
import ArticleList from '@/components/article-list'
import placeholderListItem from '@/components/placeholder-list-item'
import TabHeader from '@/components/tab-header.vue';
export default {
  components: {
    ArticleList,
    placeholderListItem,
    TabHeader
  },
  data() {
    return {
      page: 1,
      datalist: [],
      isloading: true,
      typelist: [
        {
          name: "推荐",
        },
        {
          name: "关注",
        },
        {
          name: "热门",
        },
        {
          name: "最新",
        }
      ],
  }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        path: "/article/findAll",
        method: "get",
        params: {
          page: this.page 
        },
      }).then((res) => {
        this.isloading = false
        this.datalist = res.result;
      });
    },
    htmlToText(html) {
      let reg = /<\/?.+?\/?>/g;
      return html.replace(reg, "");
    },
  },
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  display: flex;
}
.main {
  flex: 1;
}

.aside {
  width: 280px;
}
</style>
