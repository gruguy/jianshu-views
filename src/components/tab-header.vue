<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-12-11 23:26:51
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-14 16:17:24
-->
<template>
  <div class="tab-header-wrapper">
    <div class="tab-header" :class="`${tabSize}`">
        <!-- 动态 -->
        <span
          v-for="(item, index) in typelist"
          :key="index"
          :class="{ active: currentTypeIndex === index }"
          @click="changeTabs(index)"
          >{{ item.name }}</span
        >
    </div>
  </div>
</template>
<script>
export default {
  props: ['typelist', 'tabSize'],
  data(){
    return {
      currentTypeIndex: 0
    }
  },
  methods: {
    changeTabs(index){
      this.currentTypeIndex = index
      this.$emit('changePage', index)
    }
  }
}
</script>
<style lang="scss" scoped>
  
  .tab-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #f6f6f6;
    margin: 0 -10px;
    height: 50px;
    font-size: 16px;
    span{
      padding: 14px 0;
      margin: 0 12px;
      cursor: pointer;
      &.active{
        position: relative;
        font-weight: 600;
        font-synthesis: style;
        color: #121212;
        &::after{
          content: '';
          position: absolute;
          right: 0;
          bottom: -1px;
          left: 0;
          height: 3px;
          background: #06f;
          content: "";
        }
      }
    }
    &.large{
      height: 60px;
      font-size: 18px;
    }
    &.small{
      height: 40px;
      font-size: 14px;
    }
  }
</style>
