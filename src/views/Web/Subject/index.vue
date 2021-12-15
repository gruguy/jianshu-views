<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-24 15:09:22
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-26 14:57:08
-->
<template>
  <div class="subject-wrapper">
    <h2>最新专题</h2>
    <div class="subject-list">
      <div class="subject-item subject-item-card" v-for="(item, index) in datalist" :key="index">
        <a class="subject-banner" href="#">
          <img :src="item.bannerUrl" alt="" @error="this.src=''"/>
        </a>
        <div class="subject-item-header">
          <div class="subject-item-info">
            <a href="#"> {{item.sname}} </a>
            <div class="subject-item-counts">
              <span>{{item.updatedAt}} 更新</span>
              <span>{{item.viewAmount}} 浏览</span>
            </div>
          </div>
          <div class="subject-item-followBtn">
            <button class="subject-followBtn isfollowing">关注专题</button>
          </div>
        </div>
        <div class="subject-content-list">
          <div class="subject-content-item">
            <a href="#">【透过数据看世界】为什么说张桂梅拯救的不止女生？</a>
          </div>
          <div class="subject-content-item">
            <a href="#">【透过数据看世界】为什么说张桂梅拯救的不止女生？</a>
          </div>
          <div class="subject-content-item">
            <a href="#">【透过数据看世界】为什么说张桂梅拯救的不止女生？</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      datalist: []
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      this.$http({
        path: 'subjects/findAll',
        method: 'get',
        params: {
          page: 1
        }
      }).then(res => {
        this.datalist = res.result
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.subject-wrapper {
  width: 100%;
  h2 {
    margin-top: 0;
    font-size: 25px;
  }
  .subject-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .subject-item {
      width: 470px;
      height: 450px;
      flex-shrink: 0;
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 rgb(18 18 18 / 10%);
      .subject-banner {
        display: block;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .subject-item-header {
        display: flex;
        align-items: center;
        margin: 0 24px;
        padding: 30px 0;
        height: 110px;
        box-sizing: border-box;
        border-bottom: 1px solid #ebebeb;
        .subject-item-info {
          flex: 1 1;
          a {
            width: 300px;
            line-height: 28px;
            max-height: 56px;
            font-size: 20px;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-weight: 600;
            font-synthesis: style;
          }
          .subject-item-counts {
            margin-top: 4px;
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            color: #999;
          }
        }
        .subject-item-followBtn {
          flex-shrink: 0;
          margin-left: 20px;
          button {
            border: none;
            height: 34px;
            color: #06f;
            background-color: rgba(0, 102, 255, 0.08);
            width: 102px;
            border-radius: 3px;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .subject-content-list {
        margin: 20px 24px;
        .subject-content-item {
          display: flex;
          align-items: center;
          height: 24px;
          margin-top: 12px;
          a {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
