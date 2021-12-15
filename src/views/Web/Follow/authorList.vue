<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-22 23:14:34
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-23 16:03:58
-->
<template>
  <div class="list-with-avatar">
    <div
      class="list-with-avatar-item"
      :class="{ active: currentIndex === index }"
      v-for="(item, index) in authorList"
      :key="index"
    >
      <a href="javascript:;" @click="showArticle(item.user[0]._id)">
        <div class="avatar">
          <img :src="item.user[0].avatar" alt="" />
        </div>
        <div class="name">{{ item.user[0].username }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["authorList"],
  data() {
    return {
      currentIndex: 0,
      // authorList: []
    };
  },
  watch: {
    authorList: {
      handler(newV, oldV){
        let newIndex = newV.findIndex(item => item.user[0]._id === this.$route.params.id)
        this.currentIndex = newIndex>-1?newIndex:0
        /**
         * 判断$route.params.id是否存在，
         * 不存在，就跳转默认第一个作者
         */ 
        
        if(newIndex == -1){//没找到，也就是没有params.id
          this.$router.push({
            path: `/follow/${this.authorList[0].user[0]._id}`
          })
        }
      },
      deep: true
    }
  },
  mounted(){
    // 默认显示第一个作者
    
    console.log(this.$route.params.id)
    console.log(this.currentIndex)
  },
  methods: {
    showArticle(id) {
      console.log(this.$route.params.id,id);
      if(this.$route.params.id !== id){
        this.$router.push({
          path: `/follow/${id}`
        }) 
        this.currentIndex = this.authorList.findIndex(item => item.user[0]._id === this.$route.params.id)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.list-with-avatar {
  .list-with-avatar-item {
    &.active{
      a{
        background-color: #dbdbdb;
      }
    }
    a {
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        flex: 1;
      }
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
