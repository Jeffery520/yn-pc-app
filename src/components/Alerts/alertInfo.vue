<template>
  <div class="yn-alert-info">info</div>
</template>

<script>
export default {
  name: "alertInfo"
};
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.yn-alert-info {
  @include table-bg;
  width: 770px;
  height: 400px;
  background-color: #fff;
  position: fixed;
  top: 200px;
  right: 400px;
  z-index: 8888;
}
</style>
