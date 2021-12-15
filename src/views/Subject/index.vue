<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-25 13:43:40
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-25 17:40:27
-->
<template>
  <div>
    <!-- 新增按钮 刷新按钮 -->
    <div class="handleBtns">
      <el-button  icon="el-icon-plus" type="primary" @click="showAdd">新增</el-button>
      <el-button  icon="el-icon-refresh" type="primary" plain @click="refresh">刷新</el-button>
    </div>
    <el-table v-loading="loading" :data="articles" style="width: 100%">
      <el-table-column label="专题标题" prop="sname"></el-table-column>
      <el-table-column label="专题描述" prop="description"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="收录数量" prop="collectionAmount"></el-table-column>
      <el-table-column label="关注量" prop="likeAmount"></el-table-column>
      <el-table-column label="浏览量" prop="viewAmount"></el-table-column>
      <el-table-column label="操作" prop="action">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="primary" size="mini"
            >编辑</el-button
          >
          <el-button @click="del(scope.row)" type="danger" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :total="count"
      :current-page="page"
      :page-size="pageSize"
      @current-change="changePage"
      layout="prev,pager,next"
      style="margin-top: 20px"
      background
    ></el-pagination>
    <subject-add :visible="addVisible" @toggleDialog="toggleDialog"></subject-add>
  </div>
</template>
<script>
import SubjectAdd from './add.vue'
export default {
  components: {
    SubjectAdd
  },
  data() {
    return {
      loading: false,
      addVisible: false,
      articles: [],
      page: 1,
      pageSize: 10,
      count: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    showAdd(){
      this.addVisible = true
    },
    refresh(){
      this.getData()
    },
    toggleDialog(flag){
      this.addVisible = flag
      this.getData()
    },
    getData() {
      this.loading = true
      this.$http({
        path: "/subjects/findAll", 
        method: "get",
        params: {
          page: this.page,
          author: this.$store.state.user.username,
        },
      }).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.articles = res.result;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.count = res.count;
        }
      });
    },
    update(row) {
      this.$router.push({
        path: "/admin/article/update",
        query: {
          id: row.id,
        },
      });
    },
    del(row) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "删除",
        ccancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        this.$http({
          path: "/article/del",
          method: "post",
          params: {
            id: row.id,
          },
        }).then((res) => {
          this.$message({
            message: res.msg,
            type: res.code === 200 ? "success" : "error",
          });

          if (res.code === 200) {
            this.getData();
          }
        });
      });
    },
    changePage(page) {
      console.log(page);
      this.page = page;
      this.getData();
    },
  },
};
</script>
<style></style>

