<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-12 13:30:33
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-15 13:40:32
-->
<template>
  <div>
    <comment-item
      v-for="(item, index) in dataList"
      :key="index"
      :data="item"
    ></comment-item>
  </div>
</template>
<script>
import commentItem from "./comment-item.vue";
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    commentItem,
  },
  created(){
    console.log(this.dataList)
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped></style>
