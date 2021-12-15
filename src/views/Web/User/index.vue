<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-26 16:08:31
 * @LastEditors: gruguy
 * @LastEditTime: 2021-12-06 12:09:11
-->
<template>
  <div class="user-center">
    <!-- 个人信息 -->
    <user-header></user-header>
    <!-- dynamics -->
    <dynamics></dynamics>
  </div>
</template>
<script>
import userHeader from "./userHeader.vue";
import dynamics from '@/views/Web/User/dynamics/index.vue'
export default {
  components: {
    userHeader,
    dynamics
  },
  data() {
    return {
      // uploadHeader: {
      //   authorization: "Bearer " + localStorage.getItem("token"),
      // },
      // showAvatarEdit: false,
      // showBannerEdit: false,
      // showMore: false,
      // userInfo: {},
      // imgUrl: "",
      // avatarUrl: "",
      // bannerUrl: "",
      // isself: false
    };
  },
  created() {
    // this.getUserInfo();
  },
  methods: {
    
  },
};
</script>
<style lang="scss" scoped>
.user-center {
  width: 100%;
  .topInfo {
    background: #fff;
    .userCover {
      position: relative;
      height: 240px;
      overflow: hidden;
      background: #f6f6f6;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .changeCover {
        position: absolute;
        top: 24px;
        right: 24px;
        z-index: 2;
      }
    }
    .userInfo-wrapper {
      position: relative;
      width: 100%;
      background: #fff;
      .userInfo-main {
        position: relative;
        margin: 0 20px 24px;
        min-height: 200px;
        .userInfo-avatar {
          position: absolute;
          top: -25px;
          left: 0;
          z-index: 1;
          border-radius: 8px;
          border: 4px solid #fff;
          height: 160px;
          img {
            border-radius: 8px;
            width: 160px;
            height: 160px;
            object-fit: cover;
            aspect-ratio: auto 160 / 160;
            background-color: #eee;
          }
        }
        .userInfo-content {
          padding: 30px 0 20px 200px;
          .userInfo-head {
            h1 {
              margin: 0 0 20px;
              font-size: 24px;
              span.headline {
                margin-left: 30px;
                font-size: 14px;
                line-height: 20px;
              }
            }
          }
          .userInfo-inner {
            height: 60px;
            transition: height 0.3s ease-out 0s;
            &.showMore {
              height: 140px;
            }
            .inner-item {
              margin-bottom: 18px;
              font-size: 14px;
            }
            .showdefault {
              .iconfont {
                color: #8590a6;
                font-size: 14px;
              }
            }
          }
        }
        .userAvatar-edit {
          opacity: 0;
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: opacity ease-in 0.2s;
          &:hover {
            opacity: 1;
          }

          .avatarChange {
            position: absolute;
            z-index: 5;
          }
          .userAvatar-editor-mask {
            border-radius: 8px;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            position: absolute;
            box-sizing: border-box;
          }
          .userAvatar-editor-content {
            position: absolute;
            color: #fff;
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .icon-camera {
              font-size: 34px;
            }
          }
        }
        .userInfo-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            color: #a5a1a1;
            cursor: pointer;
            font-size: 14px;
          }
          .right {
            cursor: pointer;
          }
        }
      }
    }
  }
}
.avatar-uploader {
  position: absolute;
  z-index: 10;
  display: block;
  width: 160px;
  height: 160px;
  opacity: 0;
}

.banner-uploader{
  position: absolute;
  width: 132px;
  height: 42px;
  right: 0;
  top: 25px;
  z-index: 5;
  right: 20px;
  opacity: 0;
  
}
</style>
