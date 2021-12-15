<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-12-06 10:38:44
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-14 16:18:23
-->
<template>
  <div class="dynamics wrapper">
    <div class="main panel-box padding-left padding-right">
      <tab-header :typelist="dynamicTypes" @changePage="changePage"></tab-header>
      <!-- <div class="tabs">
        <span
          v-for="(item, index) in dynamicTypes"
          :key="index"
          :class="{ active: currentTypeIndex === index }"
          @click="changeTabs(index)"
          >{{ item.name }}</span
        >
      </div> -->
      <component :is="currentView"></component>
    </div>
    <div class="aside panel-box"></div>
  </div>
</template>
<script>
import articleList from './articleList.vue'
import collection from './collection.vue'
import tabHeader from '@/components/tab-header'
export default {
  components: {
    tabHeader,
    articleList,
    collection,
  },
  data() {
    return {
      currentView: 'articleList',
      currentTypeIndex: 0,
      dynamicTypes: [
        {
          name: "动态",
          comp: 'dynamics'
        },
        {
          name: "文章",
          comp: 'articleList'
        },
        {
          name: "评论",
          comp: ''
        },
        {
          name: "关注",
          comp: ''
        },
        {
          name: "收藏",
          comp: 'collection'
        },
        {
          name: "专题",
          comp: 'subject'
        },
      ],
    };
  },
  methods: {
    changePage(index){
      this.currentView = this.dynamicTypes[index].comp
    }
  }
};
</script>
<style lang="scss" scoped>
.dynamics {
  .main{
    padding-top: 0;
  }
  &.wrapper{
    padding-top: 0;
  }
}
</style>
