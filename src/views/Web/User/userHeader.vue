<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-26 16:08:31
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-30 16:45:49
-->
<template>
  <div class="user-center">
    <div class="topInfo">
      <div class="userCover">
        <img :src="userInfo.banner" alt="" />
        <input
          v-if="isself"
          type="file"
          class="banner-uploader"
          style="position: absolute"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="selectImgBanner($event)"
        />
        <el-button
          v-if="isself"
          class="changeCover"
          type="primary"
          icon="cemera"
          @click="selectImgBanner($event)"
          >编辑封面图片</el-button
        >
      </div>
      <!-- 用户头像信息 -->
      <div class="userInfo-wrapper">
        <div class="userInfo-main">
          <div class="userInfo-avatar">
            <img :src="userInfo.avatar" alt="" />
            <div
              class="userAvatar-edit"
              :class="{ showModal: isEdit }"
              v-if="isself"
            >
              <div class="userAvatar-editor-mask"></div>
              <input
                type="file"
                id="uploads"
                class="avatar-uploader"
                style="position: absolute"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="selectImg($event)"
              />
              <div class="userAvatar-editor-content">
                <i class="iconfont icon-camera"></i>
                <span>修改我的头像</span>
              </div>
            </div>
          </div>
          <div v-if="!isEdit" class="userInfo-content">
            <div class="userInfo-head">
              <h1>
                <span class="username">{{ userInfo.username }}</span>
                <span class="headline">{{ userInfo.shortDesc }}</span>
              </h1>
            </div>
            <div class="userInfo-inner" :class="{ showMore: showMore }">
              <div v-if="!showMore" class="showdefault">
                <div class="inner-item">
                  <span
                    ><i class="iconfont icon-Smartphonephone"></i
                    >{{ userInfo.phone }}</span
                  >
                </div>
                <div class="inner-item">
                  <span
                    v-if="userInfo.sex == '男'"
                    class="iconfont icon-man"
                  ></span>
                  <span
                    v-else-if="userInfo.sex == '女'"
                    class="iconfont icon-woman"
                  ></span>
                  <span v-else class="iconfont icon-waixingren"></span>
                </div>
              </div>
              <div v-if="showMore" class="showmore">
                <div class="inner-item">
                  <span>手机号：{{ userInfo.phone }}</span>
                </div>
                <div class="inner-item">
                  <span>性别：{{ userInfo.sex }}</span>
                </div>
                <div class="inner-item">
                  <span>邮箱：{{ userInfo.email }}</span>
                </div>
                <div class="inner-item">
                  <span>个人简介：{{ userInfo.desc }}</span>
                </div>
              </div>
            </div>
            <div class="userInfo-footer">
              <div class="left" @click="toggleShowMore">
                <span
                  ><i
                    :class="
                      showMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    "
                  ></i>
                  {{ showMore ? "收起" : "展开" }}详细信息</span
                >
              </div>
              <div class="right">
                <template v-if="isself">
                  <el-button type="primary" plain @click="toEdit"
                    >编辑个人资料</el-button
                  >
                </template>
                <template v-else>
                  <el-button type="primary" icon="el-icon-plus"
                    >关注TA</el-button
                  >
                  <el-button type="default" icon="el-icon-s-comment"
                    >发私信</el-button
                  >
                </template>
              </div>
            </div>
          </div>
          <!-- isEdit -->
          <div class="userInfo-content isEdit" v-else>
            <!-- 返回我的主页 -->
            <div class="backtoIndex">
              <el-button type="text" @click="backToIndex"
                >返回我的主页 <i class="el-icon-arrow-right"></i
              ></el-button>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <!-- 头像选择 -->
    <edit-avatar
      :dialogVisible="showAvatarEdit"
      :imgUrl="imgUrl"
      @ok="editAvatarOk"
    ></edit-avatar>

    <!-- 封面图选择 -->
    <edit-banner
      :bannerVisible="showBannerEdit"
      :bannerUrl="bannerUrl"
      @ok="editBannerOk"
    ></edit-banner>
  </div>
</template>
<script>
import EditAvatar from "@/components/editAvatar";
import EditBanner from "@/components/editBanner";
export default {
  components: {
    EditAvatar,
    EditBanner,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uploadHeader: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      showAvatarEdit: false,
      showBannerEdit: false,
      showMore: false,
      userInfo: {},
      imgUrl: "",
      avatarUrl: "",
      bannerUrl: "",
      isself: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    backToIndex() {
      this.$router.push({
        path: "/u/" + this.$store.state.user.username,
      });
    },
    toEdit() {
      this.$router.push({
        path: "/user/edit",
      });
    },
    updateAvatar(url) {
      this.$http({
        path: "/users/update/avatarOrBanner",
        method: "post",
        params: {
          _id: this.$store.state.user._id,
          avatar: url,
        },
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success("头像更新成功！");
          this.userInfo.avatar = url;
        }
      });
    },
    updateBanner(url) {
      this.$http({
        path: "/users/update/avatarOrBanner",
        method: "post",
        params: {
          _id: this.$store.state.user._id,
          banner: url,
        },
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success("封面图更新成功！");
          this.userInfo.banner = url;
        }
      });
    },
    editAvatarOk(url) {
      this.updateAvatar(url);
      this.showAvatarEdit = false;
    },
    editBannerOk(url) {
      this.updateBanner(url);
      this.showBannerEdit = false;
    },
    //选择图片
    selectImg(e) {
      let file = e.target.files[0];
      console.log("file", file);

      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: "图片类型要求：jpeg、jpg、png",
          type: "error",
        });
        return false;
      }
      // 小于5MB
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      //转化为blob
      let reader = new FileReader();
      reader.onloadend = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.imgUrl = data;
        this.showAvatarEdit = true;
      };
      //转化为base64
      reader.readAsDataURL(file);
    },
    //选择图片
    selectImgBanner(e) {
      let file = e.target.files[0];
      console.log("file", file);

      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: "图片类型要求：jpeg、jpg、png",
          type: "error",
        });
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      //转化为blob
      let reader = new FileReader();
      reader.onloadend = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.bannerUrl = data;
        this.showBannerEdit = true;
      };
      //转化为base64
      reader.readAsDataURL(file);
    },
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    getUserInfo() {
      let username = "";
      console.log("jjj", this.isEdit);
      if (this.isEdit) {
        username = this.$store.state.user.username;
      } else {
        username = this.$route.params.username;
      }
      this.$http({
        path: "/users/info/personal",
        method: "get",
        params: {
          username: username,
        },
      }).then((res) => {
        this.userInfo = res.data;
        // 判断是自己的个人中心
        console.log(
          "11",
          this.userInfo.username,
          this.$store.state.user.username
        );

        this.isself =
          this.userInfo.username === this.$store.state.user.username
            ? true
            : false;
        console.log(this.isself);
        if (this.isself) {
          // 更新store
          this.$store.commit("setUserName", this.userInfo);
        }
      });
    },
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
          padding: 10px 0 20px 200px;
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
              height: auto;
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
          cursor: pointer;
          opacity: 0;
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: opacity ease-in 0.2s;
          &.showModal {
            opacity: 1;
          }
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
  cursor: pointer;
  position: absolute;
  z-index: 10;
  display: block;
  width: 160px;
  height: 160px;
  opacity: 0;
}

.banner-uploader {
  cursor: pointer;
  position: absolute;
  width: 132px;
  height: 42px;
  right: 0;
  top: 25px;
  z-index: 5;
  right: 20px;
  opacity: 0;
}
.backtoIndex {
  position: absolute;
  right: 0;
  button {
    color: #8590a6;
  }
}
</style>
