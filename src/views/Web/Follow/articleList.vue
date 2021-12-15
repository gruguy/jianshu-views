<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-22 23:09:33
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-12 00:07:07
-->
<template>
  <div class="panel-box-section">
    <!-- 作者用户信息 -->
    <author-info-head :authorInfo="authorInfo"></author-info-head>
    <!-- 文章列表 -->
    <template v-if="isloading">
      <placeholder-list-item></placeholder-list-item>
    </template>
    <template v-else>
      <article-list :datalist="datalist" :showAuthor="false"></article-list>
    </template>
  </div>
</template>
<script>
import authorInfoHead from '@/components/author-info-head'
import articleList from '@/components/article-list'
import placeholderListItem from '@/components/placeholder-list-item'
export default {
  components: {
    articleList,
    authorInfoHead,
    placeholderListItem
  },
  data(){
    return {
      isloading: true,
      page: 1,
      datalist: [],
      authorInfo: {},
      authorId: this.$route.params.id
    }
  },
  created(){
    this.getDataList()
    this.getUserInfo(this.$route.params.id)
  },
  watch:{
    $route:{
      handler(val,oldval){
        this.getDataList()
        this.getUserInfo(this.$route.params.id)
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    async getDataList(){
      const res = await this.$http({
        path: '/article/findAll',
        method: 'get',
        params: {
          page: this.page,
          authorId: this.$route.params.id
        }
      })
      this.datalist = res.result
      this.isloading = false
    },
     async getUserInfo(id) {
      const res = await this.$http({
        path: "/users/info/personal",
        method: "get",
        params: {
          id,
        },
      });
      this.authorInfo = res.data
    },
  }
}
</script>
<style lang="scss" scoped>
  
</style>
