<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:41:26
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-08 01:10:34
-->
<template>
  <div>
    <el-table :data="comments" style="width: 100%">
      <el-table-column label="评论管理">
        <template slot-scope="scope">
          <div class="comment-list">
            <div>
              <el-tag type="info" size="small" effect="plain">会员</el-tag>
              {{ scope.row.username }} 评论了你的文章 【{{
                scope.row.articleTitle
              }}】
            </div>
            <div>
              {{ scope.row.createTime }}
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :total="count"
      :current-page="page"
      :page-size="pageSize"
      @current-change="changePage"
      layout="prev,pager,next"
      background
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments: [],
      page: 1,
      pageSize: 0,
      count: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        path: "/comment/admin/find",
        method: "get",
        params: {
          page: this.page,
          author: this.$store.state.user.username,
        },
      }).then((res) => {
        this.comments = res.result;
        this.page = res.page;
        this.pageSize = res.pageSize;
        this.count = res.count;
      });
    },
    changePage(page) {
      this.page = page;
      this.getData();
    },
  },
};
</script>
<style scoped>
.comment-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
