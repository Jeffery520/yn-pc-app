<template>
  <div class="screenfull">
    <svg-icon
      class-name="screenfull-svg"
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'full-screen'"
      @click="click"
    />
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      console.log(screenfull);
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.screenfull {
  display: flex;
  align-items: center;
}
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #ffffff;
  width: 26px !important;
  height: 26px !important;
  vertical-align: 10px;
}
</style>
