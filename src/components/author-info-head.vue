<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-23 16:35:55
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-12 00:11:37
-->
<template>
  <div class="author-wrapper">
    <div class="left-info">
      <a :href="'/u/'+authorInfo.username" class="avatar">
        <img :src="authorInfo.avatar" alt="" />
      </a>
      <div class="info">
        <h3>{{ authorInfo.username }}
          <span class="gender">
            <i v-if="authorInfo.sex =='男'" class="iconfont icon-man line-blue"></i>
            <i v-else-if="authorInfo.sex =='女'" class="iconfont icon-woman line-pink"></i>
            <i v-else class="iconfont icon-waixingren line-blue"></i>
          </span>
        </h3>
        <small
          >写了{{ authorInfo.num }}篇文章，获得了{{
            authorInfo.star
          }}个喜欢</small
        >
      </div>
    </div>
    <div class="right-btns">
      <div class="btn send-msg">发私信</div>
      <a class="btn tocenter" target="_blank" :href="`/u/${authorInfo.username}`">
        个人中心 <i class="iconfont icon-arrow"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["authorInfo"],
  data() {
    return {
    };
  },
  mounted(){
    console.log(this.authorInfo);
    
  },
  methods: {
   
  },
};
</script>
<style lang="scss" scoped>
.author-wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  justify-content: space-between;
  .left-info {
    display: flex;
    align-items: flex-start;
    .avatar {
      display: block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      margin-left: 10px;
      h3 {
        padding-top: 10px;
        font-size: 22px;
        // line-height: 50px;
        margin: 0;
      }
      small {
        display: block;
        margin-top: 10px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .right-btns {
    display: flex;
    .btn {
      cursor: pointer;
      padding: 6px 15px;
      border: solid 1px #42c02e;
      color: #42c02e;
      border-radius: 18px;
      transition: all 0.4s ease;
      font-size: 14px;
      &:hover {
        background-color: rgba(59, 194, 29, 0.05);
        border-color: #42c02e;
      }
      &.send-msg {
        margin-right: 20px;
      }
      &.tocenter {
        margin-right: 40px;
      }
    }
  }
}
.gender{
  margin-left: 15px;
}
.line-blue{
  color: #3194d0;
  font-size: 20px!important;
}
.line-pink{
  color: #ea6f5a;
  font-size: 20px!important;
}
</style>
