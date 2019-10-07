<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  components: {}
};
</script>
<style lang="scss">
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
</style>
