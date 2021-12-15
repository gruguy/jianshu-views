<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-26 23:51:11
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-29 17:02:26
-->
<template>
  <div class="eidt-banner">
    <el-dialog
      title="修改封面图片"
      :visible.sync="bannerVisible"
      width="1440"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="content">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :fixedBox="option.fixedBox"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :centerBox="option.centerBox"
          :height="option.height"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @realTime="realTime"
        ></vueCropper>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadImg('blob')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      option: {
        img: "",
        size: 1,
        info: true,
        enlarge: 2,
        outputType: "jpeg",
        canScale: true,
        // 是否默认生成截图框
        autoCrop: true,
        // 默认生成截图框宽度
        autoCropWidth: 960,
        // 默认生成截图框高度
        autoCropHeight: 240,
        fixedNumber: [960, 240],
        fixed: true,
        fixedBox: true,
        full: true,
        canMoveBox: false,
      },
    };
  },
  props: ["bannerVisible", "bannerUrl"],
  watch: {
    bannerUrl(newV, oldV) {
      let _this = this;
      this.option.img = newV;
    },
  },
  methods: {
    realTime(data) {
      this.previews = data;
      console.log("data", data);
    },
    confirmAvatar() {
      this.$emit("ok");
    },
    handleClose() {
      this.$emit("ok");
    },

    //上传图片
    uploadImg(type) {
      let _this = this;
      if (type === "blob") {
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          let formData = new FormData();
          formData.append("myfile", data, "banner.jpg");
          console.log(formData);
          console.log(data);
          //调用axios上传
          let res = await _this.$httpFormData({
            method: "post",
            path: "/upload/img",
            params: formData,
          });
          if (res.code === 200) {
            // _this.$message({
            //   message: '上传成功！',
            //   type: "success"
            // });
            // 获取图片链接
            _this.$emit("ok", res.data);
          } else {
            _this.$message({
              message: "文件服务异常，请联系管理员！",
              type: "error",
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 240px;
}
</style>
