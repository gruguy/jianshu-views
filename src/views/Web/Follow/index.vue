<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-22 23:08:45
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-13 13:14:51
-->
<template>
  <div class="container">
    <div class="sidebar panel-box">
        <div class="filter panel-box-section">
          <div class="filter-list">
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                全部关注<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">全部关注</el-dropdown-item>
                <el-dropdown-item command="b">只看作者</el-dropdown-item>
                <el-dropdown-item command="c">只看专题</el-dropdown-item>
                <el-dropdown-item command="d">只看文集</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <span>全部关注</span> -->
          </div>
          <div class="followUser"><i class="iconfont icon-user_add"></i>添加关注</div>
        </div>
      <div class="padding-0">
        <!-- 关注作者列表 -->
        <template v-if="authorList && authorList.length">
          <author-list :authorList="authorList"></author-list>
        </template>
        <template v-else>
          <el-empty></el-empty>
        </template>
      </div>
    </div>
    <div class="main panel-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AuthorList from "./authorList.vue";
// import ArticleList from './articleList.vue'
export default {
  components: {
    AuthorList,
  },
  data() {
    return {
      authorList: [],
      page: 1,
      // ArticleList: []
    };
  },
  created(){
    this.getFollowingList()
  },
  methods: {
    handleCommand(e){
      console.log(e)
    },
    getFollowingList(){
      console.log(this.$store.state.user)
      this.$http({
        path: '/fans/following',
        method: 'get',
        params: {
          page: this.page,
          userId: this.$store.state.user._id
        }
      }).then(res => {
        if(res.code === 200){
          this.authorList = res.result
          if(this.authorList.length){
            // 跳转到第一个用户
            this.$router.push(`/follow/${this.authorList[0].aid}`)
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.padding-0{
  padding: 0;
}
.container {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 75px);

  .sidebar {
    width: 220px;
    height: 100%;
    overflow-y:auto;
    position: fixed;
    .filter{
      margin-top: -10px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .filter-list{
        span{
          font-size: 14px;
          cursor: pointer;
          
        }
      }
      .followUser{
          cursor: pointer;
          .iconfont{
            margin-right: 10px;
            font-size: 14px;
          }
      }
    }
  }
  .main {
    margin-left: 240px;
    margin-right: 0;
  }
}
</style>
