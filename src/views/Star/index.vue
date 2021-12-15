<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-03 10:42:08
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-09 16:09:22
-->
<template>
  <div>
    <el-table :data="stars">
      <el-table-column label="点赞管理">
        <template slot-scope="scope">
          <div class="star-list">
            <div>
            <el-tag type="info" size="small" effect="plain">点赞</el-tag>
            {{ scope.row.username }}点赞了你的文章【{{scope.row.articleTitle}}】
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
      stars: [],
      page: 1,
      count: 0,
      pageSize: 0,
    }
  },
  created(){
    this.getData()
  },
  methods: {
    getData(){
      this.$http({
        path: '/star/findAll',
        method: 'get',
        params: {
          page: this.page,
          author: this.$store.state.user.username
        }
      }).then(res => {
        this.stars = res.result
        this.page= res.page
        this.pageSize = res.pageSize
        this.count = res.count
      })
    },
    changePage(page){
      this.page = page
      this.getData()
    }
  }
};
</script>
<style scoped>
.star-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
