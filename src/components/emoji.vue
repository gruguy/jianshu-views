<!--
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-11 22:21:19
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-13 15:33:01
-->
<template>
  <div>
    <el-popover placement="bottom" width="400" trigger="click">
      <!-- 切换小圆点 -->
      <div class="tabIndex">
        <span
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="changeType(index)"
          v-for="(item, index) in emojiList"
          :key="index"
        ></span>
      </div>
      <div class="emo-list" @click="getEmojiItem">
        <span
          v-for="(item, index) in emoList"
          :key="index"
          @click="getEmojiItem(item)"
          >{{ item }}</span>
      </div>
      <i class="iconfont icon-smile" slot="reference" style="font-size: 18px; margin-right: 12px;"></i>
      <!-- <el-button slot="reference">click 激活</el-button> -->
    </el-popover>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      emoList: [],
      emojiList: [
        {
          emo: '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😡 😠',
        },
        {
          emo: `👦 👧 👨 👩 👴 👵 👶 👱 👮 👲 👳 👷 👸 💂 🎅 👰 👼 💆 💇 🙍 🙎 🙅 🙆 💁 🙋 🙇 🙌 🙏 👤 👥 🚶 🏃 👯 💃 👫 👬 👭 💏 💑 👪`,
        },
        {
          emo: `🌹 🍀 🍎 💰 📱 🌙 🍁 🍂 🍃 🌷 💎 🔪 🔫 🏀 ⚽ ⚡ 👄 👍 🔥 🌋 🗻 🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🏩 🏪 🏫 🏬 🏭 🏯 🏰 💒 🗼 🌌 🎠`,
        },
        {
          emo: `🙈 🙉 🙊 🐵 🐒 🐶 🐕 🐩 🐺 🐱 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🐈 🐯 🐅 🐆 🐴 🐎 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🐘 🐭`,
        },
      ],
    };
  },
  created() {
    this.emoList = this.emojiList[0].emo.split(/\s/);
  },
  methods: {
    changeType(index) {
      this.currentIndex = index;
      console.log(this.emojiList[0].emo.split(""));
      console.log(this.currentIndex);
      this.emoList = this.emojiList[this.currentIndex].emo.split(/\s/);
    },
    getEmojiItem(e) {
      console.log(e.target.innerText)
      const emo = e.target.innerText
      this.$emit("getEmo", emo);
    },
  },
};
</script>
<style lang="scss" scoped>
.tabIndex {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  .dot {
    width: 10px;
    height: 10px;
    cursor: pointer;
    background-color: #999;
    border-radius: 50%;
    margin: 0 10px;
    &.active{
      background-color: #333;
    }
  }
}
.emo-list {
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    font-size: 24px;
    color: #404040;
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    &:hover{
      background-color: #f0f0f0;
    }
  }
}
</style>
