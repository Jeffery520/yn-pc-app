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
html,
body {
  min-width: 1080px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
