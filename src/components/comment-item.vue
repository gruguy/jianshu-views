<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-12 15:21:56
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-12 01:18:06
-->
<template>
  <div class="comment-item">
    <a class="avatar-link" href="#">
      <img :src="data.avatar">
    </a>
    <div class="info">
      <div class="username">
        <a href="#">{{data.username}}</a>
      </div>
      <div class="floor_time">
        <span>{{data.floor}}楼 </span>
        <time :datetime="data.createTime">{{transfiormDateTime(data.createTime)}}</time>
      </div>
      <div class="cont">{{data.content}}</div>
      <!-- replay回复 -->
      <div class="replay">
        <!-- 判断是否是自己，在自己的回复下面显示 回复 删除 在别人的评论下面显示 点赞 回复 举报 -->
        <!-- 别人的 -->
        <div class="replay-btns">
          <div class="replay-left">
            <!--  -->
            <div v-if="!isSelf" class="btn-item" @click="toggleLike">
              <i class="iconfont icon-dianzan_kuai"></i> 赞 
            </div>
            <div class="btn-item" @click="toggleInput">
              <i class="iconfont icon-comment-filling"></i> 回复
            </div>
          </div>
          <div class="replay-right">
             <div v-if="!isSelf" class="btn-item" @click="toggleInput">
              <i class="iconfont icon-warning"></i> 举报
            </div>
             <div v-if="isSelf" class="btn-item" @click="delReplyComment">
              <i class="iconfont icon-warning"></i> 删除
            </div>
          </div>
        </div>
      </div>
      <template v-for="(item, index) in data.children">
        <second-comment-item :key="index" :data="item" @commentInput="commentInputCallback"></second-comment-item>
      </template>
      <!-- 评论框 -->
      <comment-input v-if="isInputShow" :isFocus="isFocus" :pid="data.id"></comment-input>
    </div>
  </div>
</template>
<script>
import commentInput from '@/components/commentInput'
import secondCommentItem from '@/components/second-comment-item'
export default {
  name: 'comment-item',
  components: {commentInput, secondCommentItem},
  data(){
    return {
      isSelf: false, //判断是否是自己对自己评论
      isInputShow: false,
      isFocus: false
    }
  },
  props: {
    data:{
      type: Object,
      default: () => {}
    }
  },
  created(){
    console.log(this.content)
    this.isSelf = this.username === this.$store.state.user.username
    
  },
  methods: {
    commentInputCallback(isInputShow, isFocus){
      this.isInputShow = isInputShow
      this.isFocus = isFocus
    },
    // 删除自己相关评论
    delReplyComment(){
      
    },
    // 给评论点赞
    toggleLike(){
      
    },
    // 显示评论列表中的输入框
    toggleInput(){
      this.isInputShow = true
      this.isFocus = true
    },
    pluszero(num){
      return num = num.toString().length === 1? ('0'+num):num;
    },
    transfiormDateTime(datetime){
      datetime = new Date(datetime)
      const year = datetime.getFullYear()
      const month = datetime.getMonth() + 1
      const date = datetime.getDate()
      const hour = datetime.getHours()
      const minutes = datetime.getMinutes()
      
      if(year === new Date().getFullYear()){
        return `${this.pluszero(month)}.${this.pluszero(date)}  ${this.pluszero(hour)}:${this.pluszero(minutes)}`
      }else{
        return `${year}.${this.pluszero(month)}.${this.pluszero(date)}  ${this.pluszero(hour)}:${this.pluszero(minutes)}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .comment-item{
    display: flex;
    justify-content: flex-start;
    &:not(:last-child){
      .info{
        border-bottom: solid 1px #f6f6f6;
      }
    }
    margin-top: 20px;
    .avatar-link{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      display: block;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info{
      flex: 1;
      padding-bottom: 15px;
      .username{
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        
        
      }
      .floor_time{
        margin-top: 2px;
        font-size: 12px;
        color: #969696;
        span{
          // margin-right: 15px;
        }
        
      }
      .cont{
        margin-top: 10px;
        font-size: 16px;
        line-height: 1.5;
        word-break: break-word;
      }
    }
  }
  .replay-btns{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    font-size: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .replay-left{
      display: flex;
      width: 120px;
      .btn-item{
        margin-right: 16px;
      }
    }
    .btn-item{
      cursor: pointer;
      color: #b0b0b0;
      
    }
    &:hover {
      .replay-right{
        opacity: 1;
      }
      .btn-item{
        color: #909090;
      }
    }
    .replay-right{
      opacity: 0;
      transition: opacity .3s ease;
    }
  }
</style>
