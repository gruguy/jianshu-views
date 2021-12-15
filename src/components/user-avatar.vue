<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-12-11 23:07:43
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-12 00:43:40
-->
<template>
<div class="authorInfo-wrapper">
  <div class="authorInfo">
    <div class="avatar" :class="`${avatarSize} ${avatarRound}`">
      <a :href="`/u/${userInfo.username}`">
        <img :src="userInfo.avatar" alt="" />
      </a>
    </div>
    <div class="info">
      <a class="username" :href="`/u/${userInfo.username}`">
        {{ userInfo.username }}
      </a>
      <div class="shortDesc" :title="userInfo.shortDesc">
        {{ userInfo.shortDesc }}
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ["userInfo", 'avatarSize', 'avatarRound'],
};
</script>
<style lang="scss" scoped>
.authorInfo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .info {
    margin-left: 10px;
    a {
      font-weight: 600;
      font-size: 20px;
    }
    .shortDesc{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 10px);
    }
  }
}
</style>
