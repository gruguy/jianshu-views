<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:41:42
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-25 14:23:09
-->
<template>
  <div>
    <el-table :data="fans" style="width: 100%">
      <el-table-column label="粉丝管理">
        <template slot-scope="scope">
          <div class="fans-list">
            <div>
              <el-tag type="danger" size="small" effect="plain">粉丝</el-tag>
              {{ scope.row.username }} 关注了你
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
      background
      :total="count"
      :current-page="page"
      :page-size="pageSize"
      @current-change="changePage"
      layout="prev,pager,next"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fans: [],
      page: 1,
      count: 0,
      pageSize: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        path: "/fans/followed",
        method: "get",
        params: {
          page: this.page,
          author: this.$store.state.user.username,
        },
      }).then((res) => {
        this.fans = res.result;
        this.page = res.page;
        this.count = res.count;
        this.pageSize = res.pageSize;
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
.fans-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
