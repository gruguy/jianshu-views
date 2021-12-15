<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-24 14:07:01
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-24 14:17:28
-->
<template>
  <div class="placeholder">
    <div class="img"></div>
    <div class="content">
      <div class="title"></div>
      <div class="text"></div>
      <div class="text animation-delay"></div>
      <div class="meta">
        <div class="read"></div>
        <i class="iconfont icon-read"></i>
        <div class="small"></div>
        <i class="iconfont icon-heart"></i>
        <div class="small"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.placeholder {
  position: relative;
  padding: 15px 2px 0 0;
  margin-bottom: 50px;
  .img {
    position: absolute;
    bottom: 2px;
    right: 0;
    width: 125px;
    height: 100px;
    border-radius: 4px;
    background-color: #eaeaea;
  }
  .content {
    padding-right: 160px;
    .title {
      float: none !important;
      width: 50%;
      height: 20px;
      margin: 0 0 15px !important;
      background-color: #eaeaea;
    }
    .text {
      width: 100%;
      height: 16px;
      margin: 0 0 10px;
      background-color: #eaeaea;
      animation: loading 1s ease-in-out infinite;
    }
  }
  .notes-placeholder .animation-delay {
    animation: loading 1s ease-in-out -0.5s infinite;
  }
  .meta {
    margin: 0;
    color: #eaeaea;
    font-size: 12px;
    div {
      display: inline-block;
      vertical-align: middle;
      background-color: #eaeaea;
    }
    .read {
      height: 16px;
      width: 50px;
    }
    i {
      margin: 0 5px;
      vertical-align: middle;
    }
    .small {
      height: 16px;
      width: 30px;
    }
  }
}
@keyframes loading {
  0% {
    width: 60%;
  }
  50% {
    width: 100%;
  }
  to {
    width: 60%;
  }
}
</style>
