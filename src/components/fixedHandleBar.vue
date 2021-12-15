<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-13 16:47:28
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-14 01:32:57
-->
<template>
  <div class="fixedHandleBar">
    <div class="item-wrapper">
      <div class="item" @click="toggleStar(username,articleId)"  :class="{ active: isStar }">
        <i class="iconfont icon-heart"></i>
      </div>
      <div class="item-words">{{ starNum }} 喜欢</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isStar: false,
      starNum:0,
    };
  },
  props: {
    star: {
      type: Number,
      default: 0,
    },
    username:{
      type: String,
      default: ''
    },
    articleId: {
      type: Number,
      default: 0
    }
  },
  mounted(){
   this.getLikeStatus(this.username,this.articleId) 
   console.log(this.star)
   this.$nextTick(() => {
     console.log(this.star)
    this.starNum = this.star
   })
  },
  methods: {
    getLikeStatus(){
      this.$http({
        path: '/star/isliked',
        method: 'get',
        params: {
          username: this.username,
          articleId: this.articleId
        }
      }).then(res => {
        if(res.code === 200){
          this.isStar = res.isStar
        }
      })
    },
    toggleStar(username,articleId) {
      let url = "";
      if (!this.isStar) {
        url = "/star/add";
      } else {
        url = "/star/unstar";
      }
      this.$http({
        path: url,
        method: "post",
        params: {
          id: Date.now(),
          username,
          articleId
        },
      }).then(res => {
        if(res.code ==200){
          this.isStar = !this.isStar
        }
        if(this.isStar){
          this.starNum += 1
        }else{
          this.starNum -= 1
        }
        this.$notify({
          title: '通知',
          type: 'success',
          message: res.msg
        })
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.fixedHandleBar {
  width: 50px;
  height: 200px;
  position: fixed;
  top: 216px;
  left: calc((100vw - 1000px) / 2 - 65px);
  display: flex;
  flex-direction: column;
  .item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #969696;
    .item {
      background-color: #fff;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 30px;
      }
      &.active {
        color: #fff;
        background-color: #ec7259;
      }
    }
    .item-words {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
